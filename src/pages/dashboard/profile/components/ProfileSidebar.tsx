import { useState } from 'react';
import { Camera } from 'lucide-react';
import { useAuth } from '@/features/auth';

import type { Profile } from '../../../../features/auth/types';

const getProfileStrength = (profile: Profile) => {
  const sections = [
    Boolean(profile.aboutMe?.trim()),

    Boolean(
      profile.dob &&
      profile.religion &&
      profile.community &&
      profile.height &&
      profile.color &&
      profile.maritalStatus &&
      profile.motherTongue,
    ),

    Boolean(profile.education && profile.occupation && profile.annualIncome),

    Boolean(
      profile.familyType &&
      profile.familyStatus &&
      profile.fatherOccupation &&
      profile.motherOccupation &&
      profile.brothers &&
      profile.sisters,
    ),

    Boolean(profile.location),

    Boolean(profile.profilePhotos?.length),

    Boolean(profile.partnerPreference),
  ];

  const completedSections = sections.filter(Boolean).length;

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

export function ProfileSidebar() {
  const { profile } = useAuth();
  const [imageError, setImageError] = useState(false);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const profilePhoto = profile.profilePhotos?.[0];
  const profileStrength = getProfileStrength(profile);
  const initials = getInitials(profile.name);
  const showImage = Boolean(profilePhoto) && !imageError;

  return (
    <aside className="shrink-0 w-full lg:w-75">
      <div className="relative">
        {showImage ? (
          <img
            src={profilePhoto}
            alt={profile.name}
            onError={() => setImageError(true)}
            className="w-full h-65 rounded-t-xl object-cover"
          />
        ) : (
          <div
            className="
              flex items-center justify-center
              w-full h-65
              bg-pink-50 rounded-t-lg
              font-semibold text-pink-600 text-7xl
            "
            aria-label={`${profile.name} initials`}
          >
            {initials}
          </div>
        )}

        <button
          type="button"
          aria-label="Change profile photo"
          className="
            absolute right-3 bottom-3
            flex items-center justify-center
            w-10 h-10
            bg-white shadow-md rounded-full
            text-pink-500
            hover:bg-pink-50
          "
        >
          <Camera size={19} />
        </button>
      </div>

      <div className="pb-4 mt-4 border-b border-gray-200 text-left">
        <h2 className="font-bold text-[#172554] text-lg">{profile.name}</h2>

        <p className="mt-1 text-gray-500 text-sm">{profile.userId}</p>
      </div>

      <div className="flex flex-col w-full py-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#172554] text-base">
            Profile Strength
          </h3>

          <span className="font-bold text-pink-600 text-lg">
            {profileStrength}%
          </span>
        </div>

        <div
          className="w-full h-3 bg-gray-100 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Profile Strength"
          aria-valuenow={profileStrength}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-pink-500 rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${Math.min(100, Math.max(0, profileStrength))}%`,
            }}
          />
        </div>

        <p className="mt-3 leading-5 text-gray-500 text-xs">
          {profileStrength === 100
            ? 'Your profile is complete!'
            : 'Complete your profile to get better matches.'}
        </p>
      </div>
    </aside>
  );
}
