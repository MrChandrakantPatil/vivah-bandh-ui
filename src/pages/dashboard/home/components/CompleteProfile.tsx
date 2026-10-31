import {
  ArrowRight,
  Camera,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';

const profileSteps = [
  {
    title: 'Personal Details',
    description: 'Tell us about yourself and your background.',
    icon: UserRound,
  },
  {
    title: 'Education & Career',
    description: 'Share your qualifications and profession.',
    icon: GraduationCap,
  },
  {
    title: 'Profile Photos',
    description: 'Add photos to make your profile more personal.',
    icon: Camera,
  },
  {
    title: 'Partner Preferences',
    description: 'Tell us what you are looking for in a partner.',
    icon: SlidersHorizontal,
  },
];

export function CompleteProfile({
  onCompleteProfile,
}: {
  onCompleteProfile: () => void;
}) {
  return (
    <div className="space-y-8 pb-10">
      <section
        className="
          relative
          p-6
          bg-linear-to-br rounded-2xl border border-pink-100
          overflow-hidden
          sm:p-8 lg:p-10
          from-pink-50 via-white to-rose-50
        "
      >
        <div
          className="
            absolute -right-12 -top-12
            w-48 h-48
            bg-pink-200/40 rounded-full
            pointer-events-none
            blur-3xl
          "
        />

        <div
          className="
            relative
            flex flex-col items-start gap-8
            lg:flex-row lg:items-center lg:justify-between
          "
        >
          <div className="max-w-2xl">
            <div
              className="
                inline-flex items-center gap-2
                px-3 py-1.5 mb-4
                bg-white rounded-full border border-pink-200
                font-semibold text-pink-700 text-xs
              "
            >
              <HeartHandshake size={15} />
              YOUR JOURNEY STARTS HERE
            </div>

            <h1 className="tracking-tight font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl">
              Welcome to VivahBandh!
            </h1>

            <h2 className="mt-4 font-semibold text-slate-800 text-lg sm:text-xl">
              Complete your profile to discover better matches.
            </h2>

            <p
              className="
                max-w-xl mt-3
                leading-6 text-slate-600 text-sm
                sm:leading-7 sm:text-base
              "
            >
              You're one step closer to finding your life partner. Add your
              personal details, education, career, family information and photos
              to help potential matches get to know you better.
            </p>

            <button
              type="button"
              onClick={onCompleteProfile}
              className="
                inline-flex items-center justify-center gap-2
                px-5 py-3 mt-6
                bg-[#e91e63] shadow-sm rounded-xl
                font-semibold text-white text-sm
                transition
                hover:bg-[#d81b60] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2
              "
            >
              Complete My Profile
              <ArrowRight size={18} />
            </button>

            <div className="flex items-center gap-2 mt-4 text-slate-500 text-xs">
              <ShieldCheck size={16} className="text-pink-600" />
              Your information is handled securely.
            </div>
          </div>

          <div
            className="
              items-center justify-center shrink-0
              w-40 h-40
              bg-white/80 shadow-sm rounded-full border border-pink-100
              sm:flex lg:w-48 lg:h-48 lg:mr-6
              hidden
            "
          >
            <div
              className="
                flex items-center justify-center
                w-28 h-28
                bg-pink-50 rounded-full
                lg:w-36 lg:h-36
              "
            >
              <HeartHandshake
                size={76}
                strokeWidth={1.25}
                className="text-[#e91e63]"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="font-bold text-slate-900 text-lg sm:text-xl">
            Build a meaningful profile
          </h2>

          <p className="mt-1 text-slate-500 text-sm">
            Add these important details to help us find compatible matches.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {profileSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="
                  p-5
                  bg-white rounded-2xl border border-slate-200
                  transition
                  hover:shadow-sm hover:border-pink-200
                "
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="
                      flex items-center justify-center
                      w-11 h-11
                      bg-pink-50 rounded-xl
                      text-[#e91e63]
                    "
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <span className="font-semibold text-slate-400 text-xs">
                    STEP 0{index + 1}
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900">{step.title}</h3>

                <p className="mt-2 leading-6 text-slate-500 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
