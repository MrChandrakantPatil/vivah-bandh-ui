import { Camera, Check, ImagePlus, Star, Trash2 } from 'lucide-react';

import { useAuth } from '@/features/auth';

import {
  male1,
  male2,
  male3,
  male4,
  male5,
  female1,
  female2,
  female3,
  female4,
  female5,
} from '@/assets/images';

export function Photos() {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const profileImages = {
    male1,
    male2,
    male3,
    male4,
    male5,
    female1,
    female2,
    female3,
    female4,
    female5,
  };

  const photos = (profile.profilePhotos || [])
    .map((photo) => {
      const image = profileImages[photo as keyof typeof profileImages];

      return image;
    })
    .filter(Boolean);

  const handleAddPhoto = () => {
    console.log('Add photo');
    // Upload API will go here.
  };

  const handleDeletePhoto = (index: number) => {
    console.log('Delete photo:', index);
    // Delete API will go here.
  };

  const handleSetPrimary = (index: number) => {
    console.log('Set primary photo:', index);
    // Set primary photo API will go here.
  };

  return (
    <>
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              bg-pink-50 rounded-full
              text-pink-500
            "
          >
            <Camera size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#172554] text-xl lg:text-2xl">
              Photos
            </h2>

            <p className="mt-1 text-gray-500 text-sm">
              Add and manage your profile photos
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddPhoto}
          className="
            flex items-center gap-2
            px-4 py-2
            bg-pink-500 rounded-lg
            font-medium text-white text-sm
            transition
            hover:bg-pink-600
          "
        >
          <ImagePlus size={16} />
          Add Photo
        </button>
      </div>

      {photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 mt-8 md:grid-cols-3">
          {photos.map((photo, index) => (
            <div
              key={`${photo}-${index}`}
              className="
                relative
                bg-gray-50 shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-2xl border border-gray-100
                overflow-hidden
                group aspect-square
              "
            >
              <img
                src={photo}
                alt={`Profile photo ${index + 1}`}
                className="w-full h-full transition duration-300 group-hover:scale-105 object-cover"
              />

              {index === 0 && (
                <div
                  className="
                    absolute top-3 left-3
                    flex items-center gap-1.5
                    px-3 py-1.5
                    bg-white/95 shadow-sm rounded-full
                    font-medium text-pink-500 text-xs
                  "
                >
                  <Star size={13} fill="currentColor" />
                  Primary
                </div>
              )}

              <div
                className="
                  absolute inset-x-0 bottom-0
                  flex items-center justify-between
                  px-3 pt-10 pb-3
                  bg-linear-to-t opacity-0
                  transition
                  group-hover:opacity-100
                  from-black/60 to-transparent
                "
              >
                {index !== 0 ? (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(index)}
                    className="
                      flex items-center gap-1.5
                      px-3 py-2
                      bg-white/95 rounded-lg
                      font-medium text-[#172554] text-xs
                      transition
                      hover:bg-white
                    "
                  >
                    <Check size={14} />
                    Set Primary
                  </button>
                ) : (
                  <span />
                )}

                <button
                  type="button"
                  onClick={() => handleDeletePhoto(index)}
                  className="
                    flex items-center justify-center
                    w-9 h-9
                    bg-white/95 rounded-lg
                    text-red-500
                    transition
                    hover:bg-white
                  "
                  aria-label="Delete photo"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddPhoto}
            className="
              flex flex-col items-center justify-center gap-3
              bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200
              text-gray-400
              transition
              hover:bg-pink-50 hover:border-pink-300 hover:text-pink-500
              aspect-square
            "
          >
            <div
              className="
                flex items-center justify-center
                w-12 h-12
                bg-white shadow-sm rounded-full
              "
            >
              <ImagePlus size={22} />
            </div>

            <span className="font-medium text-sm">Add Photo</span>
          </button>
        </div>
      ) : (
        <div
          className="
            flex flex-col items-center justify-center
            min-h-80 px-6 mt-8
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
            onClick={handleAddPhoto}
            className="
              flex items-center gap-2
              px-5 py-2.5 mt-5
              bg-pink-500 rounded-lg
              font-medium text-white text-sm
              transition
              hover:bg-pink-600
            "
          >
            <ImagePlus size={16} />
            Add Photo
          </button>
        </div>
      )}
    </>
  );
}
