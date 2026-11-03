import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart } from 'lucide-react';

import { getMatchProfileDetailsApi } from './api';
import type { ProfileDetailsData } from './types';

import { ProfileDetailsSidebar } from './components/ProfileDetailsSidebar';

import { AboutUs } from './components/sections/AboutUs';
import { BasicDetails } from './components/sections/BasicDetails';
import { ContactDetails } from './components/sections/ContactDetails';
import { EducationCareer } from './components/sections/EducationCareer';
import { FamilyDetails } from './components/sections/FamilyDetails';
import { PartnerPreferences } from './components/sections/PartnerPreferences';

interface ProfileDetailsProps {
  userId?: string;
}

export function ProfileDetails({ userId: propUserId }: ProfileDetailsProps) {
  const params = useParams<{ userId: string }>();
  const navigate = useNavigate();

  const userId = propUserId ?? params.userId;

  const [profile, setProfile] = useState<ProfileDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      if (!userId) {
        setProfile(null);
        setError('Profile user ID is required.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await getMatchProfileDetailsApi(userId);

        if (!response.success) {
          throw new Error(response.message || 'Failed to fetch profile.');
        }

        if (!cancelled) {
          setProfile(response.data ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setProfile(null);

          setError(
            err instanceof Error
              ? err.message
              : 'Unable to fetch profile details.',
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-80 bg-[#faf8fb]">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <span
            className="
              w-5 h-5
              rounded-full border-2 border-pink-100 border-t-[#e91e63]
              animate-spin
            "
            aria-hidden="true"
          />
          Loading profile...
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-6 bg-white rounded-2xl border border-slate-200">
        <p className="text-red-600 text-sm">
          {error || 'Profile details could not be found.'}
        </p>

        <button
          type="button"
          onClick={() => navigate('/matches')}
          className="
            px-4 py-2.5 mt-4
            bg-[#e91e63] rounded-xl
            font-semibold text-white text-sm
            transition
            hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
          "
        >
          Back to Matches
        </button>
      </div>
    );
  }

  const photos = [
    ...(profile.primaryPhoto ? [profile.primaryPhoto] : []),
    ...(profile.profilePhotos ?? []).filter(
      (photo) => photo !== profile.primaryPhoto,
    ),
  ];

  const matchPercentage = profile.matchPercentage ?? 0;

  return (
    <div className="max-w-7xl min-w-0 pb-10 mx-auto bg-white text-slate-900">
      <div className="pb-5">
        <button
          type="button"
          onClick={() => navigate('/matches')}
          className="
            inline-flex items-center gap-1.5
            py-2
            rounded-lg
            font-medium text-slate-500 text-sm
            transition
            hover:text-[#e91e63] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
          "
        >
          <ChevronLeft size={18} />
          Back to Matches
        </button>
      </div>

      <div
        className="
          grid grid-cols-1 items-start gap-5
          min-w-0
          xl:grid-cols-[minmax(400px,460px)_minmax(0,1fr)] xl:gap-6
        "
      >
        <div className="xl:sticky xl:top-0 xl:self-start">
          <ProfileDetailsSidebar
            profile={profile}
            photos={photos}
            profileName={profile.name}
            matchPercentage={matchPercentage}
          />
        </div>

        <main className="min-w-0">
          <div className="space-y-5">
            <AboutUs profile={profile} />

            <BasicDetails profile={profile} />

            <ContactDetails />

            <EducationCareer profile={profile} />

            <FamilyDetails profile={profile} />

            <PartnerPreferences profile={profile} />

            <div
              className="
                flex items-start gap-4
                p-5
                bg-linear-to-br rounded-2xl border border-pink-100
                sm:p-6
                from-pink-50 via-white to-white
              "
            >
              <div
                className="
                  flex items-center justify-center shrink-0
                  w-11 h-11
                  bg-white shadow-sm rounded-xl
                  text-[#e91e63]
                "
                aria-hidden="true"
              >
                <Heart size={21} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  A meaningful connection starts here
                </h2>

                <p className="mt-2 leading-6 text-slate-600 text-sm">
                  If this profile matches what you are looking for, take the
                  next step and start a conversation.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
