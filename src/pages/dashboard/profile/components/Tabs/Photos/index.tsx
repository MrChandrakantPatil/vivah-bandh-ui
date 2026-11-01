import { useEffect, useRef, useState } from 'react';
import { Images, LoaderCircle } from 'lucide-react';
import { useProfile } from '@/features/profile';
import { deleteProfilePhotoApi, updateProfileApi, uploadProfilePhotos } from '../../../api';
import { SectionCard } from '../../SectionCard';
import { PhotoGallery } from './PhotoGallery';
import { PhotoUploadModal } from './PhotoUploadModal';
import { getCdnUrl } from '@/utils/cdn';
import type { PhotoItem } from '../../../types';

type SavedPhoto = {
  id: string;
  file: File;
  key: string;
  previewUrl: string;
};

const MAX_PHOTOS = 5;

export function Photos() {
  const { profile, updateProfileData } = useProfile();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);
  const [deletingPhotoKey, setDeletingPhotoKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const savedPhotosRef = useRef<SavedPhoto[]>([]);

  useEffect(() => {
    savedPhotosRef.current = savedPhotos;
  }, [savedPhotos]);

  useEffect(() => {
    return () => {
      savedPhotosRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, []);

  if (!profile) {
    return (
      <SectionCard title="Profile Photos" icon={Images}>
        <div>Loading profile...</div>
      </SectionCard>
    );
  }

  const profilePhotos = profile.profilePhotos ?? [];
  const primaryPhoto = profile.primaryPhoto ?? profilePhotos[0] ?? null;

  const allPhotoKeys = [
    ...new Set([...profilePhotos, ...savedPhotos.map((photo) => photo.key)]),
  ];

  const remainingSlots = Math.max(0, MAX_PHOTOS - allPhotoKeys.length);

  const isBusy = isSaving || isSettingPrimary || deletingPhotoKey !== null;

  const handleAddPhoto = () => {
    if (remainingSlots <= 0 || isBusy) return;

    setError(null);
    setIsUploadModalOpen(true);
  };

  const handleSavePhotos = async (files: File[]) => {
    if (isBusy || files.length === 0) return;

    if (files.length > remainingSlots) {
      throw new Error(`You can add only ${remainingSlots} more photo(s).`);
    }

    setIsSaving(true);
    setError(null);

    const createdPreviewUrls: string[] = [];

    try {
      const uploadedPhotos = await uploadProfilePhotos(files);

      const newKeys = uploadedPhotos.map(({ key }) => key);
      const updatedKeys = [...new Set([...allPhotoKeys, ...newKeys])];

      await updateProfileApi({
        profilePhotos: updatedKeys,
      });

      const newPhotos: SavedPhoto[] = uploadedPhotos.map(({ file, key }) => {
        const previewUrl = URL.createObjectURL(file);
        createdPreviewUrls.push(previewUrl);

        return {
          id: crypto.randomUUID(),
          file,
          key,
          previewUrl,
        };
      });

      setSavedPhotos((previous) => [...previous, ...newPhotos]);

      const nextPrimary = primaryPhoto ?? updatedKeys[0] ?? null;

      if (!primaryPhoto && nextPrimary) {
        await updateProfileApi({
          primaryPhoto: nextPrimary,
        });
      }

      updateProfileData({
        profilePhotos: updatedKeys,
        primaryPhoto: nextPrimary,
      });

      setIsUploadModalOpen(false);
    } catch (err) {
      createdPreviewUrls.forEach((url) => URL.revokeObjectURL(url));

      const message =
        err instanceof Error
          ? err.message
          : 'Failed to upload and save photos.';

      setError(message);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetPrimary = async (photoKey: string) => {
    if (photoKey === primaryPhoto || isBusy) return;

    setIsSettingPrimary(true);
    setError(null);

    try {
      await updateProfileApi({
        primaryPhoto: photoKey,
      });

      updateProfileData({
        primaryPhoto: photoKey,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to set primary photo. Please try again.',
      );
    } finally {
      setIsSettingPrimary(false);
    }
  };

  const handleDeletePhoto = async (photoKey: string) => {
    if (isBusy) return;

    setDeletingPhotoKey(photoKey);
    setError(null);

    try {
      const response = await deleteProfilePhotoApi(photoKey);

      const { profilePhotos: updatedPhotos, primaryPhoto: updatedPrimary } =
        response.data;

      updateProfileData({
        profilePhotos: updatedPhotos,
        primaryPhoto: updatedPrimary,
      });

      const localPhoto = savedPhotos.find((photo) => photo.key === photoKey);

      if (localPhoto) {
        URL.revokeObjectURL(localPhoto.previewUrl);

        setSavedPhotos((previous) =>
          previous.filter((photo) => photo.key !== photoKey),
        );
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete photo. Please try again.',
      );
    } finally {
      setDeletingPhotoKey(null);
    }
  };

  const displayedPhotos: PhotoItem[] = [
    ...profilePhotos.map((key, index) => ({
      id: `existing-${index}-${key}`,
      key,
      src: getCdnUrl(key),
      name: `Profile photo ${index + 1}`,
    })),

    ...savedPhotos
      .filter((photo) => !profilePhotos.includes(photo.key))
      .map((photo) => ({
        id: photo.id,
        key: photo.key,
        src: photo.previewUrl,
        name: photo.file.name,
      })),
  ];

  return (
    <SectionCard title="Profile Photos" icon={Images}>
      <div className="relative h-full">
        <PhotoGallery
          photos={displayedPhotos}
          primaryPhoto={primaryPhoto}
          remainingSlots={remainingSlots}
          isSaving={isSaving}
          isSettingPrimary={isSettingPrimary}
          deletingPhotoKey={deletingPhotoKey}
          onAddPhoto={handleAddPhoto}
          onSetPrimary={handleSetPrimary}
          onDelete={handleDeletePhoto}
        />

        {error && (
          <div
            role="alert"
            className="
              px-4 py-3 mt-4
              bg-red-50 rounded-lg
              text-red-600 text-sm
            "
          >
            {error}
          </div>
        )}

        {(isSaving || isSettingPrimary) && (
          <div role="status" aria-live="polite" className="mt-4 sr-only">
            {isSaving ? 'Saving photos...' : 'Updating primary photo...'}
          </div>
        )}

        <PhotoUploadModal
          isOpen={isUploadModalOpen}
          remainingSlots={remainingSlots}
          isSaving={isSaving}
          onClose={() => {
            if (!isSaving) {
              setIsUploadModalOpen(false);
            }
          }}
          onSave={handleSavePhotos}
        />

        {isBusy && (
          <div className="sr-only" role="status" aria-live="polite">
            <LoaderCircle className="animate-spin" />
            Please wait while your photo operation completes.
          </div>
        )}
      </div>
    </SectionCard>
  );
}
