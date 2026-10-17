import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BadgeCheck,
  ChevronLeft,
  Flower2,
  GraduationCap,
  Heart,
  MessageCircle,
  Sparkles,
  UserRound,
  Users,
  BriefcaseBusiness,
} from 'lucide-react';

import { getMatchProfileDetailsApi } from './api';
import type { ProfileDetailsData } from './types';
import { ProfilePhotoSection } from './components/PhotoSection';
import { getProfileDetailSections } from './data';
import { SectionCard } from './components/SectionCard';
import { DetailRows } from './components/DetailRows';
import MatchPercentage from './components/MatchPercentage';

const accent = '#e91e63';

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
          setProfile(response.data);
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

  const {
    personalInfo,
    careerInfo,
    familyInfo,
    religionInfo,
    partnerInfo,
    profileSummary,
  } = getProfileDetailSections(profile);

  const matchPercentage = profile.matchPercentage ?? 0;

  return (
    <div className="max-w-6xl min-w-0 pb-10 mx-auto text-slate-900">
      <div className="mb-5">
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
        <aside className="space-y-5 min-w-0">
          <section
            className="
              p-3
              bg-white shadow-[0_4px_24px_rgba(15,23,42,0.04)] rounded-2xl border border-slate-200/80
              overflow-hidden
              sm:p-4
            "
          >
            <ProfilePhotoSection
              photos={photos}
              profileName={profile.name}
              matchPercentage={matchPercentage}
            />
          </section>

          <MatchPercentage percentage={matchPercentage} />

          <section
            className="
              space-y-4
              p-4
              bg-linear-to-br rounded-2xl border border-pink-100
              from-pink-50/80 via-white to-white
            "
          >
            <button
              type="button"
              className="
                inline-flex items-center justify-center gap-2
                w-full min-h-12 px-4 py-3
                bg-[#e91e63] shadow-sm shadow-pink-200 rounded-xl
                font-semibold text-white text-sm
                transition
                hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
              "
            >
              <Heart size={18} />
              Express Interest
            </button>

            <button
              type="button"
              className="
                inline-flex items-center justify-center gap-2
                w-full min-h-12 px-4 py-3
                bg-white rounded-xl border border-slate-200
                font-semibold text-slate-700 text-sm
                transition
                hover:bg-pink-50 hover:border-pink-300 hover:text-[#c2185b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
              "
            >
              <MessageCircle size={18} />
              Send Message
            </button>
          </section>
        </aside>

        <main className="space-y-5 min-w-0">
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
                    <span className="wrap-break-words">
                      {profile.occupation || 'Profession not specified'}
                    </span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 min-w-0">
                    <Flower2 size={15} className="shrink-0 text-[#e91e63]" />
                    <span className="wrap-break-words">
                      {[profile.religion, profile.community]
                        .filter(Boolean)
                        .join(', ') || 'Religion/community not specified'}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {profile.aboutMe && (
            <SectionCard title="About Us" icon={Heart}>
              <p className="whitespace-pre-line leading-7 text-slate-600 text-sm">
                {profile.aboutMe}
              </p>
            </SectionCard>
          )}

          <SectionCard title="Personal Information" icon={UserRound}>
            <DetailRows items={personalInfo} />
          </SectionCard>

          <SectionCard title="Education & Career" icon={GraduationCap}>
            <DetailRows items={careerInfo} />
          </SectionCard>

          <SectionCard title="Family Information" icon={Users}>
            <DetailRows items={familyInfo} />
          </SectionCard>

          <SectionCard title="Religion & Community" icon={Flower2}>
            <DetailRows items={religionInfo} />
          </SectionCard>

          <SectionCard title="Looking For" icon={Heart}>
            <DetailRows items={partnerInfo} />
          </SectionCard>

          <SectionCard title="Profile Summary" icon={Sparkles}>
            <DetailRows items={profileSummary} />
          </SectionCard>

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
                If this profile matches what you are looking for, take the next
                step and start a conversation.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
