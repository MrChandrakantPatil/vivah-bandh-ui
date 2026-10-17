import { Heart, Sparkles } from 'lucide-react';

interface MatchPercentageProps {
  percentage: number;
}

export default function MatchPercentage({ percentage }: MatchPercentageProps) {
  const score = Math.max(0, Math.min(100, percentage));

  const message =
    score >= 80
      ? 'Great match! Your preferences align well with this profile.'
      : score >= 60
        ? 'A promising match. Explore the profile to learn more.'
        : 'Explore the profile to see whether you could be a good match.';

  return (
    <div
      className="
        p-5
        bg-linear-to-br rounded-2xl border border-pink-100
        from-pink-50 via-white to-pink-50/60
      "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 text-[#e91e63]">
          <Heart size={18} fill="currentColor" />

          <h3 className="font-bold text-slate-900 text-sm">
            Your compatibility
          </h3>
        </div>

        <span className="shrink-0 font-bold text-[#e91e63] text-xl">
          {score}%
        </span>
      </div>

      <div
        className="w-full h-3 mt-4 bg-pink-100 rounded-full overflow-hidden"
        role="progressbar"
        aria-label="Profile match percentage"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="
            h-full
            bg-linear-to-r rounded-full
            transition-[width] duration-500 ease-out
            from-pink-400 to-[#e91e63]
          "
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-start gap-2 mt-3">
        <Sparkles size={16} className="shrink-0 mt-0.5 text-[#e91e63]" />

        <p className="leading-5 text-slate-600 text-sm">{message}</p>
      </div>
    </div>
  );
}
