import {
  Check,
  UserRound,
  BadgeInfo,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import type { ProgressBarProps } from '../types';

const stepIcons = [
  UserRound,
  BadgeInfo,
  HeartHandshake,
  ShieldCheck,
  CheckCircle,
];

export function ProgressBar({ currentStep, totalSteps = 5 }: ProgressBarProps) {
  return (
    <div className="max-w-xs mx-auto mt-6">
      <div className="flex items-center">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          const Icon = stepIcons[index];

          return (
            <div
              key={step}
              className={`flex items-center ${step !== totalSteps ? 'flex-1' : ''}`}
            >
              <div
                className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                  ${
                    isCompleted
                      ? 'bg-pink-500 border-pink-500 text-white'
                      : isActive
                        ? 'bg-pink-50 border-pink-500 text-pink-500 shadow-md scale-110'
                        : 'bg-white border-gray-300 text-gray-400'
                  }
                `}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={16} />}
              </div>

              {step !== totalSteps && (
                <div className="flex-1 mx-1">
                  <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`
                        h-full rounded-full transition-all duration-500
                        ${isCompleted ? 'w-full bg-pink-500' : 'w-0'}
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
  );
}
