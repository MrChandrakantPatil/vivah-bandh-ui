import { useState } from 'react';
import { Camera, Circle, CircleCheck } from 'lucide-react';
import { useProfile } from '@/features/profile';
import type { Profile } from '@/types/profile.types';
import { getCdnUrl } from '@/utils/cdn';

const DEFAULT_MALE_PHOTO = '/images/profile/male.png';
const DEFAULT_FEMALE_PHOTO = '/images/profile/female.png';

const getDefaultProfilePhoto = (gender?: string | null): string => {
  return gender?.toLowerCase() === 'female'
    ? DEFAULT_FEMALE_PHOTO
    : DEFAULT_MALE_PHOTO;
};

function isValueFilled(value: unknown): boolean {
  if (value == null) return false;

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0 && value.every(isValueFilled);
  }

  if (typeof value === 'object') {
    const values = Object.values(value as Record<string, unknown>);

    return values.length > 0 && values.every(isValueFilled);
  }

  return true;
}

function isPartnerPreferenceComplete(partnerPreference: unknown): boolean {
  if (
    !partnerPreference ||
    typeof partnerPreference !== 'object' ||
    Array.isArray(partnerPreference)
  ) {
    return false;
  }

  const preferences = Object.values(
    partnerPreference as Record<string, unknown>,
  );

  return preferences.length > 0 && preferences.every(isValueFilled);
}

function getProfileSectionStatus(profile: Profile) {
  return [
    {
      label: 'About Me',
      completed: Boolean(profile.aboutMe?.trim()),
    },
    {
      label: 'Personal Details',
      completed: Boolean(
        profile.dob &&
        profile.religion &&
        profile.community &&
        profile.height &&
        profile.color &&
        profile.maritalStatus &&
        profile.motherTongue,
      ),
    },
    {
      label: 'Education & Career',
      completed: Boolean(
        profile.education && profile.occupation && profile.annualIncome,
      ),
    },
    {
      label: 'Family Details',
      completed: Boolean(
        profile.familyType &&
        profile.familyStatus &&
        profile.fatherOccupation &&
        profile.motherOccupation &&
        profile.brothers != null &&
        profile.sisters != null,
      ),
    },
    {
      label: 'Location',
      completed: Boolean(
        profile.location?.city?.trim() &&
        profile.location?.state?.trim() &&
        profile.location?.country?.trim()
      ),
    },
    {
      label: 'Photos',
      completed: Boolean(profile.profilePhotos?.length),
    },
    {
      label: 'Partner Preferences',
      completed: isPartnerPreferenceComplete(profile.partnerPreference),
    },
  ];
}

const getProfileStrength = (profile: Profile) => {
  const sections = getProfileSectionStatus(profile);
  const completedSections = sections.filter(
    (section) => section.completed,
  ).length;

  return Math.round((completedSections / sections.length) * 100);
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

type ProfileSidebarProps = {
  navigateToPhotosSection: () => void;
};

export function ProfileSidebar({
  navigateToPhotosSection,
}: ProfileSidebarProps) {
  const { profile } = useProfile();
  const [imageError, setImageError] = useState(false);

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

  const initials = getInitials(profile.name);
  const sectionStatuses = getProfileSectionStatus(profile);
  const completedCount = sectionStatuses.filter(
    (section) => section.completed,
  ).length;

  const profileStrength = getProfileStrength(profile);
  const allSectionsCompleted = completedCount === sectionStatuses.length;

  return (
    <aside className="shrink-0 w-full lg:w-75">
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
            key={profilePhoto}
            src={profilePhoto}
            alt={`${profile.name ?? 'Profile'} profile`}
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
            aria-label={`${initials} initials`}
          >
            {initials}
          </div>
        )}

        <button
          type="button"
          aria-label="Change profile photo"
          title="Manage profile photos"
          onClick={navigateToPhotosSection}
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

      <div className="pb-4 mt-4 border-b border-gray-200 text-left">
        <h2 className="font-bold text-[#172554] text-lg">{profile.name}</h2>

        <p className="mt-1 text-gray-500 text-sm">{profile.userId}</p>
      </div>

      <div className="flex flex-col w-full py-5 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#172554] text-sm">
            Profile Strength
          </h3>

          <span className="font-bold text-pink-600 text-lg tabular-nums">
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
            className="h-full bg-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${profileStrength}%` }}
          />
        </div>

        <p className="mt-3 leading-5 text-gray-500 text-xs">
          {allSectionsCompleted
            ? 'Your profile is complete!'
            : 'Complete your profile to get better matches.'}
        </p>
      </div>

      <div className="py-5 border-b border-gray-200">
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="font-semibold text-[#172554] text-sm">
            Profile Details
          </h3>

          <span className="font-medium text-gray-500 text-xs">
            {completedCount} of {sectionStatuses.length} completed
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {sectionStatuses.map((section) => (
            <div
              key={section.label}
              className="flex items-center justify-between gap-3"
            >
              <span
                className={`
                  text-sm
                  ${section.completed ? 'text-gray-700' : 'text-gray-500'}
                `}
              >
                {section.label}
              </span>

              {section.completed ? (
                <CircleCheck
                  size={17}
                  strokeWidth={2}
                  className="shrink-0 text-green-500"
                  aria-label="Completed"
                />
              ) : (
                <Circle
                  size={17}
                  strokeWidth={1.8}
                  className="shrink-0 text-gray-400"
                  aria-label="Incomplete"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        {allSectionsCompleted ? (
          <p className="leading-5 text-green-600 text-sm">
            Great job! Your profile is complete. Keep your information updated
            to get better matches.
          </p>
        ) : (
          <p className="leading-5 text-gray-500 text-sm">
            Complete all profile sections to improve your profile and help
            potential matches get to know you better.
          </p>
        )}
      </div>
    </aside>
  );
}
