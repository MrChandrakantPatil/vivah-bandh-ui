import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { ImagePlus, LoaderCircle, X } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type SelectedPhoto = {
  id: string;
  file: File;
  previewUrl: string;
};

type PhotoUploadModalProps = {
  isOpen: boolean;
  remainingSlots: number;
  onClose: () => void;
  onSave: (files: File[]) => Promise<void> | void;
  isSaving: boolean;
};

export function PhotoUploadModal({
  isOpen,
  remainingSlots,
  onClose,
  onSave,
  isSaving,
}: PhotoUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedPhotosRef = useRef<SelectedPhoto[]>([]);

  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    selectedPhotosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    return () => {
      selectedPhotosRef.current.forEach((photo) => {
        URL.revokeObjectURL(photo.previewUrl);
      });
    };
  }, []);

  const releasePreviews = (photos: SelectedPhoto[]) => {
    photos.forEach((photo) => {
      URL.revokeObjectURL(photo.previewUrl);
    });
  };

  const handleChooseFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    event.target.value = '';

    if (!files.length || isSaving) return;

    setError('');

    const availableSlots = Math.max(0, remainingSlots - selectedPhotos.length);

    if (availableSlots === 0) {
      setError('No more photo slots are available.');
      return;
    }

    const validPhotos: SelectedPhoto[] = [];
    const errors: string[] = [];

    for (const file of files) {
      if (validPhotos.length >= availableSlots) {
        errors.push(`You can add up to ${availableSlots} more photo(s).`);
        break;
      }

      if (!ALLOWED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: Use JPEG, PNG or WebP.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: Maximum size is 5 MB.`);
        continue;
      }

      const isAlreadySelected = selectedPhotos.some(
        (photo) =>
          photo.file.name === file.name &&
          photo.file.size === file.size &&
          photo.file.lastModified === file.lastModified,
      );

      const isDuplicateInBatch = validPhotos.some(
        (photo) =>
          photo.file.name === file.name &&
          photo.file.size === file.size &&
          photo.file.lastModified === file.lastModified,
      );

      if (isAlreadySelected || isDuplicateInBatch) {
        continue;
      }

      validPhotos.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }

    setSelectedPhotos((previous) => [...previous, ...validPhotos]);

    if (errors.length > 0) {
      setError(errors.join(' '));
    }
  };

  const handleRemovePhoto = (id: string) => {
    if (isSaving) return;

    const removedPhoto = selectedPhotos.find((photo) => photo.id === id);

    if (removedPhoto) {
      URL.revokeObjectURL(removedPhoto.previewUrl);
    }

    setSelectedPhotos((previous) =>
      previous.filter((photo) => photo.id !== id),
    );

    setError('');
  };

  const handleClose = () => {
    if (isSaving) return;

    releasePreviews(selectedPhotos);
    setSelectedPhotos([]);
    setError('');

    onClose();
  };

  const handleSave = async () => {
    if (isSaving) return;

    if (selectedPhotos.length === 0) {
      setError('Please select at least one photo.');
      return;
    }

    setError('');

    try {
      await onSave(selectedPhotos.map((photo) => photo.file));

      releasePreviews(selectedPhotos);
      setSelectedPhotos([]);
      setError('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to upload photos. Please try again.',
      );
    }
  };

  if (!isOpen) return null;

  const canChooseMore = selectedPhotos.length < remainingSlots;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-4
        bg-black/50
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
        className="
          flex flex-col
          w-full max-w-4xl h-150 max-h-[85vh] min-h-0 px-6 py-4
          bg-white shadow-xl rounded-2xl
          overflow-hidden
          sm:px-8 sm:py-6
        "
      >
        <div
          className="
            flex items-center justify-between gap-3 shrink-0
            pb-4
            border-b border-gray-200
            sm:pb-6
          "
        >
          <h2
            id="photo-modal-title"
            className="font-semibold text-[#172554] text-2xl"
          >
            Add Profile Photos
          </h2>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            aria-label="Close popup"
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative flex-1 min-h-0 py-5 overflow-y-auto overscroll-contain">
          <p className="text-gray-500 text-sm">
            Select up to {remainingSlots} more photo(s). Maximum 5 MB each.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            hidden
            disabled={isSaving || !canChooseMore}
            onChange={handleChooseFiles}
          />

          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-5">
            {selectedPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative rounded-xl border border-gray-200 overflow-hidden aspect-square"
              >
                <img
                  src={photo.previewUrl}
                  alt={photo.file.name}
                  className="w-full h-full object-cover"
                />

                {!isSaving && (
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(photo.id)}
                    aria-label={`Remove ${photo.file.name}`}
                    className="
                      absolute top-2 right-2
                      p-1.5
                      bg-white/95 shadow-sm rounded-full
                      text-red-500
                    "
                  >
                    <X size={14} />
                  </button>
                )}

                <div
                  className="
                    absolute inset-x-0 bottom-0
                    px-2 py-1.5
                    bg-black/50
                    text-white text-xs truncate
                  "
                >
                  {photo.file.name}
                </div>
              </div>
            ))}

            {canChooseMore && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isSaving}
                className="
                  flex flex-col items-center justify-center gap-3
                  rounded-xl border-2 border-dashed border-gray-300
                  text-gray-400
                  transition
                  hover:bg-pink-50 disabled:opacity-50 hover:border-pink-300 hover:text-pink-500 disabled:cursor-not-allowed
                  aspect-square
                "
              >
                <ImagePlus size={28} />
                <span className="font-medium text-sm">Choose files</span>
              </button>
            )}
          </div>

          {isSaving && (
            <div
              role="status"
              aria-live="polite"
              className="
                absolute inset-0 z-20
                flex flex-col items-center justify-center
                px-4
                bg-white/60 rounded-xl
                text-center
                backdrop-blur-[2px]
              "
            >
              <div
                className="
                  flex items-center justify-center
                  w-16 h-16
                  bg-white/80 shadow-sm rounded-full
                "
              >
                <LoaderCircle
                  size={36}
                  className="text-pink-500 animate-spin"
                />
              </div>

              <h3 className="mt-5 font-semibold text-[#172554] text-lg">
                Uploading your photos...
              </h3>

              <p className="mt-2 leading-6 text-gray-600 text-sm">
                Please wait while we upload your photos and save them to your
                profile.
              </p>

              <p className="mt-3 text-gray-500 text-xs">
                Please don't close this window.
              </p>
            </div>
          )}

          {error && (
            <p role="alert" className="mt-5 text-red-600 text-sm">
              {error}
            </p>
          )}
        </div>

        <div
          className="
            flex flex-wrap items-center justify-end gap-3 shrink-0
            pt-4
            border-t border-gray-100
            sm:pt-6
          "
        >
          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            className="
              px-5 py-2.5
              rounded-lg border border-gray-200
              font-medium text-gray-600 text-sm
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={selectedPhotos.length === 0 || isSaving}
            className="
              inline-flex items-center justify-center gap-2
              px-5 py-2.5
              bg-pink-500 rounded-lg
              font-medium text-white text-sm
              transition
              hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isSaving ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              `Save Photos (${selectedPhotos.length})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
