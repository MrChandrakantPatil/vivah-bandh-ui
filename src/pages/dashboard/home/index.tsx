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
          <h1 className="font-semibold text-slate-900 text-xl sm:text-2xl lg:text-3xl">
            Welcome back!
          </h1>

          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Your journey toward finding the right life partner starts here.
          </p>
        </div>

        {/* Partner preferences */}
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="
            inline-flex items-center gap-2
            w-fit px-4 py-2.5
            bg-white rounded-lg border border-gray-200
            font-semibold text-slate-700 text-sm
            transition
            hover:bg-pink-50 hover:border-pink-200
          "
        >
          <SlidersHorizontal size={17} className="text-[#e63b66]" />
          Partner Preferences
        </button>
      </div>

      {/* Recommended matches */}
      <MatchesSection />

      {/* Trust and safety banner */}
      <section
        className="
          p-5
          bg-linear-to-r rounded-2xl border border-pink-100
          overflow-hidden
          sm:p-6
          from-pink-50 to-white
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className="
                flex items-center justify-center shrink-0
                w-12 h-12
                bg-white shadow-sm rounded-xl
              "
            >
              <ShieldCheck size={26} className="text-[#e63b66]" />
            </div>

            <div className="max-w-xl">
              <h2 className="font-bold text-slate-900 text-lg">
                Your Safety Matters
              </h2>

              <p className="mt-1 leading-6 text-gray-600 text-sm">
                Take your time getting to know potential partners. Protect your
                personal information, never send money to someone you have only
                met online, and report suspicious behaviour.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/help')}
            className="
              inline-flex items-center self-start gap-2 shrink-0
              px-4 py-2.5
              bg-[#e63b66] rounded-lg
              font-semibold text-white text-sm
              transition
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
          <h2 className="font-bold text-slate-900 text-lg">
            Your Journey with VivahBandh
          </h2>

          <p className="mt-1 text-gray-500 text-sm">
            Helpful guidance for a confident matrimonial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Profile verification */}
          <article
            className="
              flex flex-col
              p-5
              bg-white shadow-sm rounded-2xl border border-gray-200
              transition
              hover:shadow-md
            "
          >
            <div
              className="
                flex items-center justify-center
                w-11 h-11
                bg-pink-50 rounded-xl
              "
            >
              <BadgeCheck size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              Understanding Verification
            </h3>

            <p className="flex-1 mt-2 leading-6 text-gray-500 text-sm">
              Learn what profile verification means, which details may be
              checked, and how to understand verification badges.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="
                inline-flex items-center self-start gap-2
                mt-4
                font-semibold text-[#e63b66] text-sm
                hover:underline
              "
            >
              Learn More
              <ArrowRight size={16} />
            </button>
          </article>

          {/* Family guide */}
          <article
            className="
              flex flex-col
              p-5
              bg-white shadow-sm rounded-2xl border border-gray-200
              transition
              hover:shadow-md
            "
          >
            <div
              className="
                flex items-center justify-center
                w-11 h-11
                bg-pink-50 rounded-xl
              "
            >
              <Users size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              A Guide for Families
            </h3>

            <p className="flex-1 mt-2 leading-6 text-gray-500 text-sm">
              Explore helpful questions to discuss, ways to communicate
              expectations, and tips for making informed decisions together.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="
                inline-flex items-center self-start gap-2
                mt-4
                font-semibold text-[#e63b66] text-sm
                hover:underline
              "
            >
              Read Guide
              <ArrowRight size={16} />
            </button>
          </article>

          {/* Matrimonial journey guide */}
          <article
            className="
              flex flex-col
              p-5
              bg-white shadow-sm rounded-2xl border border-gray-200
              transition
              hover:shadow-md
            "
          >
            <div
              className="
                flex items-center justify-center
                w-11 h-11
                bg-pink-50 rounded-xl
              "
            >
              <HeartHandshake size={24} className="text-[#e63b66]" />
            </div>

            <h3 className="mt-4 font-bold text-slate-900">
              How VivahBandh Works
            </h3>

            <p className="flex-1 mt-2 leading-6 text-gray-500 text-sm">
              Understand how to discover compatible profiles, express interest,
              and take the next steps at your own pace.
            </p>

            <button
              type="button"
              onClick={() => navigate('/help')}
              className="
                inline-flex items-center self-start gap-2
                mt-4
                font-semibold text-[#e63b66] text-sm
                hover:underline
              "
            >
              Explore Guide
              <ArrowRight size={16} />
            </button>
          </article>
        </div>
      </section>

      {/* Help and support */}
      <section
        className="
          p-5
          bg-white shadow-sm rounded-2xl border border-gray-200
          sm:p-6
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div
              className="
                flex items-center justify-center shrink-0
                w-11 h-11
                bg-pink-50 rounded-xl
              "
            >
              <HelpCircle size={24} className="text-[#e63b66]" />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Need Help?</h2>

              <p className="mt-1 leading-6 text-gray-500 text-sm">
                Find answers about your account, privacy, and using VivahBandh.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/help')}
            className="
              inline-flex items-center self-start gap-2 shrink-0
              px-4 py-2.5
              rounded-lg border border-gray-200
              font-semibold text-slate-700 text-sm
              transition
              hover:bg-gray-50
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
