import {
  BadgeCheck,
  BriefcaseBusiness,
  Flower2,
  UserRound,
} from 'lucide-react';
import { ProfilePhotoSection } from './PhotoSection';
import { occupationOptions, religionOptions, communityOptions } from '@/data';
import { getOptionLabel } from '@/utils';
import type { ProfileDetailsData } from '../types';

const accent = '#e91e63';

interface ProfileDetailsSidebarProps {
  profile: ProfileDetailsData;
  photos: string[];
  profileName: string;
  matchPercentage: number;
}

export function ProfileDetailsSidebar({
  profile,
  photos,
  profileName,
  matchPercentage,
}: ProfileDetailsSidebarProps) {
  const occupation = getOptionLabel(profile.occupation, occupationOptions);
  const religion = getOptionLabel(profile.religion, religionOptions);
  const community = getOptionLabel(profile.community, communityOptions);
  const religionAndCommunity = [religion, community].filter(Boolean).join(', ');

  return (
    <aside className="space-y-5 min-w-0">
      <section
        className="
          p-3
          bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] rounded-2xl border border-pink-100
          overflow-hidden
          sm:p-4
        "
      >
        <ProfilePhotoSection
          photos={photos}
          profileName={profileName}
          matchPercentage={matchPercentage}
        />
      </section>

      <section
        className="
          relative
          p-5
          bg-linear-to-br shadow-[0_4px_24px_rgba(15,23,42,0.035)] rounded-2xl border border-pink-100
          overflow-hidden
          sm:p-7
          from-white via-white to-pink-50/70
        "
      >
        <div
          className="
            absolute -right-10 -top-12
            w-40 h-40
            bg-pink-100/40 rounded-full
            pointer-events-none
            blur-3xl
          "
          aria-hidden="true"
        />

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="tracking-tight font-bold text-slate-950 text-2xl sm:text-3xl wrap-break-words">
                {profile.name}
              </h1>

              <BadgeCheck
                size={24}
                fill={accent}
                className="shrink-0 text-white"
                aria-label="Verified profile"
              />
            </div>

            <div
              className="
                flex flex-wrap items-center gap-x-3 gap-y-2
                mt-4
                text-slate-600 text-sm
              "
            >
              <span className="inline-flex items-center gap-1.5">
                <UserRound size={15} className="shrink-0 text-[#e91e63]" />

                {profile.age != null
                  ? `${profile.age} years`
                  : 'Age not specified'}
              </span>

              <span className="inline-flex items-center gap-1.5 min-w-0">
                <BriefcaseBusiness
                  size={15}
                  className="shrink-0 text-[#e91e63]"
                />

                <span className="wrap-break-words">{occupation}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 min-w-0">
                <Flower2 size={15} className="shrink-0 text-[#e91e63]" />

                <span className="wrap-break-words">
                  {religionAndCommunity || 'Religion/community not specified'}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </aside>
  );
}
