import { ImagePlus, LoaderCircle, Star, Trash2 } from 'lucide-react';

export type PhotoItem = {
  id: string;
  key: string;
  src: string;
  name: string;
};

type PhotoGalleryProps = {
  photos: PhotoItem[];
  primaryPhoto: string | null;
  remainingSlots: number;
  isSaving: boolean;
  isSettingPrimary: boolean;
  deletingPhotoKey: string | null;
  onAddPhoto: () => void;
  onSetPrimary: (photoKey: string) => void;
  onDelete: (photoKey: string) => void;
};

export function PhotoGallery({
  photos,
  primaryPhoto,
  remainingSlots,
  isSaving,
  isSettingPrimary,
  deletingPhotoKey,
  onAddPhoto,
  onSetPrimary,
  onDelete,
}: PhotoGalleryProps) {
  const isBusy = isSaving || isSettingPrimary;
  const isAnyPhotoDeleting = deletingPhotoKey !== null;

  return (
    <>
      {photos.length === 0 ? (
        <div
          className="
            flex flex-col items-center justify-center
            min-h-80 px-6
            bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200
            text-center
          "
        >
          <div
            className="
              flex items-center justify-center
              w-16 h-16
              bg-pink-50 rounded-full
              text-pink-500
            "
          >
            <ImagePlus size={28} />
          </div>

          <h3 className="mt-5 font-semibold text-[#172554] text-lg">
            Add your profile photos
          </h3>

          <p className="max-w-md mt-2 text-gray-500 text-sm">
            Upload photos to help potential matches get to know you better.
          </p>

          <button
            type="button"
            onClick={onAddPhoto}
            disabled={isBusy || isAnyPhotoDeleting || remainingSlots <= 0}
            className="
              flex items-center gap-2
              px-5 py-2.5 mt-5
              bg-pink-500 rounded-lg
              font-medium text-white text-sm
              transition
              hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <ImagePlus size={16} />
            Add Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {photos.map((photo) => {
            const isPrimary = primaryPhoto === photo.key;
            const isDeleting = deletingPhotoKey === photo.key;

            return (
              <div
                key={photo.id}
                className="
                  relative
                  bg-gray-50 shadow-sm rounded-2xl border border-gray-100
                  overflow-hidden
                  group aspect-square
                "
              >
                {/* Photo */}
                <img
                  src={photo.src}
                  alt={photo.name}
                  loading="lazy"
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover"
                />

                {isDeleting ? (
                  <div
                    className="
                      absolute inset-0 z-20
                      flex flex-col items-center justify-center gap-2
                      bg-black/50
                    "
                    role="status"
                    aria-live="polite"
                  >
                    <LoaderCircle
                      size={30}
                      className="text-white animate-spin"
                    />

                    <span className="font-medium text-white text-sm">
                      Deleting...
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Bottom gradient */}
                    <div
                      className="
                        absolute inset-x-0 bottom-0
                        h-24
                        bg-linear-to-t
                        pointer-events-none
                        from-black/60 to-transparent
                      "
                    />

                    <div className="absolute bottom-3 left-3 z-10">
                      {isPrimary ? (
                        <div
                          title="Primary Photo"
                          aria-label="Primary Photo"
                          className="
                            flex items-center justify-center
                            w-7 h-7
                            bg-white shadow-md rounded-full
                            text-pink-500
                            md:w-9 md:h-9
                          "
                        >
                          <Star
                            size={15}
                            className="md:hidden"
                            fill="currentColor"
                          />
                          <Star
                            size={18}
                            className="md:block hidden"
                            fill="currentColor"
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onSetPrimary(photo.key)}
                          disabled={isBusy || isAnyPhotoDeleting}
                          title="Set as Primary"
                          aria-label={`Set ${photo.name} as primary photo`}
                          className="
                            flex items-center justify-center
                            w-7 h-7
                            bg-white/95 shadow-md rounded-full
                            text-gray-700
                            transition-all duration-200
                            hover:bg-pink-500 disabled:opacity-50 hover:text-white disabled:cursor-not-allowed
                            md:w-9 md:h-9 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 sm:focus-visible:translate-y-0
                          "
                        >
                          {isSettingPrimary ? (
                            <>
                              <LoaderCircle
                                size={15}
                                className="animate-spin md:hidden"
                              />
                              <LoaderCircle
                                size={18}
                                className="animate-spin md:block hidden"
                              />
                            </>
                          ) : (
                            <>
                              <Star size={15} className="md:hidden" />
                              <Star size={18} className="md:block hidden" />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {/* Delete — bottom right */}
                    <button
                      type="button"
                      onClick={() => onDelete(photo.key)}
                      disabled={isBusy || isAnyPhotoDeleting}
                      aria-label={`Delete ${photo.name}`}
                      title="Delete photo"
                      className="
                        absolute right-3 bottom-3 z-10
                        flex items-center justify-center
                        w-7 h-7
                        bg-white/95 shadow-md rounded-full
                        text-red-500
                        transition-all duration-200
                        hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed
                        md:w-9 md:h-9 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0 sm:focus-visible:translate-y-0
                      "
                    >
                      <Trash2 size={15} className="md:hidden" />
                      <Trash2 size={18} className="md:block hidden" />
                    </button>
                  </>
                )}
              </div>
            );
          })}

          {/* Add Photo card */}
          {remainingSlots > 0 && (
            <button
              type="button"
              onClick={onAddPhoto}
              disabled={isBusy || isAnyPhotoDeleting}
              className="
                flex flex-col items-center justify-center gap-3
                bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200
                text-gray-400
                transition
                hover:bg-pink-50 disabled:opacity-50 hover:border-pink-300 hover:text-pink-500 disabled:cursor-not-allowed
                aspect-square
              "
            >
              <span
                className="
                  flex items-center justify-center
                  w-12 h-12
                  bg-white shadow-sm rounded-full
                "
              >
                <ImagePlus size={22} />
              </span>

              <span className="font-medium text-sm">Add Photo</span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
