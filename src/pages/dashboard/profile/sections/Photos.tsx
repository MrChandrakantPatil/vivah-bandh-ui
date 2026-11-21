import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Images, ImagePlus, LoaderCircle } from 'lucide-react';
import {
  getProfileSectionSuccessMessage,
  releasePhotoPreviews,
} from '../utils';
import { useProfile } from '@/features/profile';
import {
  deleteProfilePhotoApi,
  updateProfileApi,
  uploadProfilePhotos,
} from '../api';
import { getCdnUrl } from '@/utils/getCdnUrl';
import {
  ProfileSectionCard,
  ProfileEditDrawer,
  PhotoGallery,
  UploadPhotos,
  type UploadPhotosHandle,
} from '../components';
import type { PhotoItem } from '../types';

type SavedPhoto = {
  id: string;
  file: File;
  key: string;
  previewUrl: string;
};

const MAX_PHOTOS = 5;

const SECTION_TITLE = 'Profile Photos';

export function Photos() {
  const { profile, updateProfileData } = useProfile();
  const [hasSelectedPhotos, setHasSelectedPhotos] = useState(false);
  const [isUploadDrawerOpen, setIsUploadDrawerOpen] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState<SavedPhoto[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSettingPrimary, setIsSettingPrimary] = useState(false);
  const [deletingPhotoKey, setDeletingPhotoKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadRef = useRef<UploadPhotosHandle>(null);
  const savedPhotosRef = useRef<SavedPhoto[]>([]);

  useEffect(() => {
    savedPhotosRef.current = savedPhotos;
  }, [savedPhotos]);

  useEffect(() => {
    return () => {
      releasePhotoPreviews(savedPhotosRef.current);
    };
  }, []);

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={Images}>
        <div>Loading profile...</div>
      </ProfileSectionCard>
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
    setHasSelectedPhotos(false);
    setIsUploadDrawerOpen(true);
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

      setIsUploadDrawerOpen(false);
      
      toast.success(getProfileSectionSuccessMessage(SECTION_TITLE));
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

      toast.success('Primary photo updated successfully');
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

      toast.success('Photo deleted successfully');
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
    <div id="profile-photos" className="scroll-mt-8">
      <ProfileSectionCard title={SECTION_TITLE} icon={Images}>
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

          {isBusy && (
            <div className="sr-only" role="status" aria-live="polite">
              <LoaderCircle className="animate-spin" />
              Please wait while your photo operation completes.
            </div>
          )}
        </div>
      </ProfileSectionCard>

      <ProfileEditDrawer
        isOpen={isUploadDrawerOpen}
        icon={ImagePlus}
        title="Add Profile Photos"
        saveLabel="Save Photos"
        description="Choose photos to upload to your profile."
        isSaving={isSaving}
        onClose={() => {
          if (!isSaving) setIsUploadDrawerOpen(false);
        }}
        onCancel={() => {
          if (!isSaving) setIsUploadDrawerOpen(false);
        }}
        saveDisabled={!hasSelectedPhotos}
        onSave={() => {
          void uploadRef.current?.save();
        }}
        contentClassName="px-6 sm:px-8"
      >
        {isUploadDrawerOpen && (
          <UploadPhotos
            ref={uploadRef}
            remainingSlots={remainingSlots}
            isSaving={isSaving}
            onSave={handleSavePhotos}
            onSelectionChange={setHasSelectedPhotos}
          />
        )}
      </ProfileEditDrawer>
    </div>
  );
}
