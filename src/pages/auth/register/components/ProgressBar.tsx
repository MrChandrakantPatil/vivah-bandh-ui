import {
  Check,
  UserRound,
  BadgeInfo,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}

const stepIcons = [
  UserRound,
  BadgeInfo,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
];

export function ProgressBar({ currentStep, totalSteps = 5 }: ProgressBarProps) {
  return (
    <div className="border-t border-b border-white/20">
      <div className="max-w-sm px-6 mx-auto my-5">
        <div className="flex items-center">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const step = index + 1;

            const isActive = step === currentStep;
            const isCompleted = step < currentStep;

            const Icon = stepIcons[index];

            return (
              <div
                key={step}
                className={`
                  flex items-center
                  ${step !== totalSteps ? 'flex-1' : ''}
                `}
              >
                <div
                  className={`
                    relative
                    flex items-center justify-center shrink-0
                    w-8 h-8
                    rounded-full border-2
                    transition-all duration-300
                    ${
                      isCompleted
                        ? `border-white bg-white text-[rgb(var(--color-primary-500))]`
                        : isActive
                          ? `border-white bg-[rgb(var(--color-primary-500))] text-white shadow-[0_0_0_3px_rgba(255,255,255,0.12)]`
                          : `border-white/40 bg-white/5 text-white/50`
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={2.7} />
                  ) : (
                    <Icon size={16} strokeWidth={1.9} />
                  )}
                </div>

                {step !== totalSteps && (
                  <div className="flex-1 mx-2">
                    <div className="w-full h-0.5 bg-white/25 rounded-full overflow-hidden">
                      <div
                        className={`
                          h-full
                          rounded-full
                          transition-all duration-500
                          ${isCompleted ? 'w-full bg-white' : 'w-0 bg-white'}
                        `}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
