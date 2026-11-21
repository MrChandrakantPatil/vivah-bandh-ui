import type { ReactNode } from 'react';
import { ChevronRight, type LucideIcon } from 'lucide-react';
import { isProfileValueEmpty } from '../../utils';

interface ProfileEditFieldProps {
  label: string;
  value: unknown;
  formattedValue: ReactNode;
  icon: LucideIcon;
  required?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export function ProfileEditField({
  label,
  value,
  formattedValue,
  icon: Icon,
  required = false,
  disabled = false,
  onClick,
}: ProfileEditFieldProps) {
  const isEmpty = isProfileValueEmpty(value);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="
        flex items-center gap-3
        w-full px-1 py-3
        text-left
        transition-colors duration-200
        hover:bg-slate-50/80 disabled:opacity-60 disabled:cursor-not-allowed
        group
      "
    >
      <div
        className="
          flex items-center justify-center shrink-0
          w-8 h-8
          bg-transparent rounded-xl
          text-teal-600
        "
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="tracking-wide font-normal text-[11px] text-gray-500">
          {label}

          {required && <span className="ml-0.5 text-red-500 text-xs">*</span>}
        </div>

        <div
          className={`
            mt-0.5
            font-medium text-[15px]
            wrap-break-words
            ${isEmpty ? 'text-gray-300' : 'text-slate-700'}
          `}
        >
          {formattedValue}
        </div>
      </div>

      <ChevronRight
        size={19}
        strokeWidth={1.8}
        className="shrink-0 text-gray-300 transition-colors"
      />
    </button>
  );
}
