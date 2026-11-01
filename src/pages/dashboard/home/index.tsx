import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  HeartHandshake,
  HelpCircle,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from 'lucide-react';
import { CompleteProfile } from './components/CompleteProfile';
import { MatchesSection } from './components/MatchesSection';
import { useProfile } from '@/features/profile';

export function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useProfile();

  const handleCompleteProfile = () => {
    navigate('/profile');
  };

  const profileCompletionPercentage = Math.min(
    100,
    Math.max(0, profile?.profilePercentage ?? 0),
  );

  const isProfileComplete = profileCompletionPercentage === 100;

  if (!isProfileComplete) {
    return <CompleteProfile onCompleteProfile={handleCompleteProfile} />;
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl lg:text-3xl">
            Welcome back!
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Your journey toward finding the right life partner starts here.
          </p>
        </div>

        {/* Partner preferences */}
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="
            inline-flex w-fit items-center gap-2
            rounded-lg border border-gray-200 bg-white
            px-4 py-2.5 text-sm font-semibold text-slate-700
            transition hover:border-pink-200 hover:bg-pink-50
          "
        >
          <SlidersHorizontal size={17} className="text-[#e63b66]" />
          Partner Preferences
        </button>
      </div>

      {/* Recommended matches */}
      <MatchesSection />

      {/* Trust and safety banner */}
      <section className="overflow-hidden rounded-2xl border border-pink-100 bg-linear-to-r from-pink-50 to-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <ShieldCheck size={26} className="text-[#e63b66]" />
            </div>

            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-slate-900">
                Your Safety Matters
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-600">
                Take your time getting to know potential partners. Protect
                your personal information, never send money to someone you
                have only met online, and report suspicious behaviour.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/help')}
            className="
              inline-flex shrink-0 items-center gap-2
              self-start rounded-lg bg-[#e63b66] px-4 py-2.5
              text-sm font-semibold text-white transition
              hover:bg-[#cf2855]
              sm:self-center
            "
          >
            Safety Tips
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Trust-focused information cards */}
      <section>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-900">
            Your Journey with VivahBandh
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Helpful guidance for a confident matrimonial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Profile verification */}
          <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <BadgeCheck size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Understanding Verification
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
              Learn what profile verification means, which details may be
              checked, and how to understand verification badges.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#e63b66] hover:underline"
            >
              Learn More
              <ArrowRight size={16} />
            </button>
          </article>

          {/* Family guide */}
          <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <Users size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              A Guide for Families
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
              Explore helpful questions to discuss, ways to communicate
              expectations, and tips for making informed decisions together.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#e63b66] hover:underline"
            >
              Read Guide
              <ArrowRight size={16} />
            </button>
          </article>

          {/* Matrimonial journey guide */}
          <article className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
              <HeartHandshake size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              How VivahBandh Works
            </h3>

            <p className="mt-2 flex-1 text-sm leading-6 text-gray-500">
              Understand how to discover compatible profiles, express
              interest, and take the next steps at your own pace.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-[#e63b66] hover:underline"
            >
              Explore Guide
              <ArrowRight size={16} />
            </button>
          </article>
        </div>
      </section>

      {/* Help and support */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">
              <HelpCircle size={24} className="text-[#e63b66]" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Need Help?
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Find answers about your account, privacy, and using VivahBandh.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/help')}
            className="
              inline-flex shrink-0 items-center gap-2
              self-start rounded-lg border border-gray-200
              px-4 py-2.5 text-sm font-semibold text-slate-700
              transition hover:bg-gray-50
              sm:self-center
            "
          >
            <BookOpen size={17} />
            Help Center
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}