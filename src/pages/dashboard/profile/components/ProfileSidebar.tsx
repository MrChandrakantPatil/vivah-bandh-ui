import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useProfile } from '@/features/profile';
import { getCdnUrl } from '@/utils/getCdnUrl';

const DEFAULT_MALE_PHOTO = '/images/profile/male.png';
const DEFAULT_FEMALE_PHOTO = '/images/profile/female.png';

const getDefaultProfilePhoto = (gender?: string | null): string => {
  return gender?.toLowerCase() === 'female'
    ? DEFAULT_FEMALE_PHOTO
    : DEFAULT_MALE_PHOTO;
};

const getInitials = (name?: string | null): string => {
  if (!name?.trim()) return 'NA';

  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};

type ProfilePhotoProps = {
  profilePhoto: string;
  isDefaultPhoto: boolean;
  name?: string | null;
  onManagePhotos: () => void;
};

function ProfilePhoto({
  profilePhoto,
  isDefaultPhoto,
  name,
  onManagePhotos,
}: ProfilePhotoProps) {
  const [imageError, setImageError] = useState(false);

  const initials = getInitials(name);

  return (
    <div
      className={`
        relative
        rounded-xl
        overflow-hidden
        ${
          isDefaultPhoto
            ? 'bg-linear-to-br from-pink-50 via-pink-100 to-rose-200'
            : 'bg-gray-100'
        }
      `}
    >
      {!imageError ? (
        <img
          src={profilePhoto}
          alt={`${name ?? 'Profile'} profile`}
          onError={() => setImageError(true)}
          className={`
            w-full h-65
            ${isDefaultPhoto ? 'object-contain' : 'object-cover'}
          `}
        />
      ) : (
        <div
          className="
            flex items-center justify-center
            w-full h-65
            bg-linear-to-br rounded-xl
            font-semibold text-pink-600 text-7xl
            from-pink-50 to-rose-200
          "
          role="img"
          aria-label={`${initials} initials`}
        >
          {initials}
        </div>
      )}

      <button
        type="button"
        aria-label="Change profile photo"
        title="Manage profile photos"
        onClick={onManagePhotos}
        className="
          absolute right-3 bottom-3
          flex items-center justify-center
          w-10 h-10
          bg-white/95 shadow-md rounded-full
          text-pink-600
          transition
          hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500
        "
      >
        <Camera size={19} />
      </button>
    </div>
  );
}

type ProfileSidebarProps = {
  navigateToPhotosSection: () => void;
};

export function ProfileSidebar({
  navigateToPhotosSection,
}: ProfileSidebarProps) {
  const { profile } = useProfile();

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const profilePhotos = profile.profilePhotos ?? [];
  const primaryPhoto = profile.primaryPhoto ?? profilePhotos[0] ?? null;

  const profilePhoto = primaryPhoto
    ? getCdnUrl(primaryPhoto)
    : getDefaultProfilePhoto(profile.gender);

  const isDefaultPhoto =
    profilePhoto === DEFAULT_MALE_PHOTO ||
    profilePhoto === DEFAULT_FEMALE_PHOTO;

  const profileStrength = Math.min(
    100,
    Math.max(0, profile.profilePercentage ?? 0),
  );

  const allSectionsCompleted = profileStrength === 100;

  return (
    <aside
      className="
        min-w-0 p-6
        bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] rounded-2xl border border-slate-200/80
        overflow-hidden
        xl:sticky xl:top-2 xl:self-start
      "
    >
      <ProfilePhoto
        key={profilePhoto}
        profilePhoto={profilePhoto}
        isDefaultPhoto={isDefaultPhoto}
        name={profile.name}
        onManagePhotos={navigateToPhotosSection}
      />

      <div className="pb-4 mt-4 border-b border-gray-200 text-left">
        <h2 className="font-bold text-[#172554] text-lg">{profile.name}</h2>

        <p className="mt-1 text-gray-500 text-sm">{profile.userId || '--'}</p>
      </div>

      <div className="flex flex-col w-full py-5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#172554] text-sm">
            Profile Strength
          </h3>

          <span
            key={profileStrength}
            className="font-bold text-pink-600 text-lg animate-content-enter tabular-nums"
          >
            {profileStrength}%
          </span>
        </div>

        <div
          className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Profile Strength"
          aria-valuenow={profileStrength}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-pink-500 rounded-full transition-[width] duration-1000 ease-in-out"
            style={{ width: `${profileStrength}%` }}
          />
        </div>

        <div className="min-h-5 mt-3">
          <p
            key={allSectionsCompleted ? 'complete' : 'incomplete'}
            className={`
              leading-5 text-xs
              animate-content-enter
              ${allSectionsCompleted ? 'text-green-600' : 'text-gray-500'}
            `}
          >
            {allSectionsCompleted
              ? 'Your profile is complete!'
              : 'Complete your profile to get better matches.'}
          </p>
        </div>
      </div>

      <div className="min-h-16 pt-4">
        <p
          key={allSectionsCompleted ? 'complete-message' : 'incomplete-message'}
          className={`
            leading-5 text-sm
            animate-content-enter
            ${allSectionsCompleted ? 'text-green-600' : 'text-gray-500'}
          `}
        >
          {allSectionsCompleted
            ? 'Great job! Your profile is complete. Keep your information updated to get better matches.'
            : 'Complete all profile sections to improve your profile and help potential matches get to know you better.'}
        </p>
      </div>
    </aside>
  );
}
