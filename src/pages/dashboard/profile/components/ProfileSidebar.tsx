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

export function ProfileSidebar() {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const profilePhoto = profile.profilePhotos?.[0];

  const profileStrength = getProfileStrength(profile);

  return (
    <aside className="shrink-0 w-68">
      <div className="bg-white rounded-xl">
        <div className="pr-5 pb-0 pl-0">
          <div className="relative">
            <img
              src={profilePhoto}
              alt={profile.name}
              className="w-full h-49.5 rounded-lg object-cover"
            />

            <button
              type="button"
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

          <div className="flex flex-col items-center py-6 border-b border-gray-200">
            <div className="relative flex items-center justify-center w-40 h-40">
              <svg className="w-40 h-40 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="7"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 42}
                  strokeDashoffset={
                    2 * Math.PI * 42 -
                    (profileStrength / 100) * (2 * Math.PI * 42)
                  }
                  className="transition-all duration-700"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-[#172554] text-2xl">
                  {profileStrength}%
                </span>
              </div>
            </div>

            <div className="mt-5 text-center">
              <h3 className="font-semibold text-[#172554] text-base">
                Profile Strength
              </h3>

              <p className="max-w-52 mt-1.5 leading-5 text-gray-500 text-xs">
                {profileStrength === 100
                  ? 'Your profile is complete!'
                  : 'Complete your profile to get better matches.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
