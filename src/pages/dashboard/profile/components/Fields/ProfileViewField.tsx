import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { isProfileValueEmpty } from '../../utils';

interface ProfileViewFieldProps {
  label: string;
  value: unknown;
  formattedValue: ReactNode;
  icon: LucideIcon;
}

export function ProfileViewField({
  label,
  value,
  formattedValue,
  icon: Icon,
}: ProfileViewFieldProps) {
  const isEmpty = isProfileValueEmpty(value);

  return (
    <div
      className="
        relative
        flex items-center gap-3
        w-full min-w-0 px-3.5 py-3.5
        bg-slate-50/70 rounded-2xl border border-slate-100
        text-left
        transition-all duration-200
        group
      "
    >
      <div
        className="
          flex items-center justify-center shrink-0
          w-10 h-10
          bg-white shadow-sm rounded-xl
          text-slate-600
          ring-1 ring-slate-100
        "
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="tracking-wide font-normal text-[11px] text-gray-500">
          {label}
        </div>

        <div
          className={`
            mt-0.5
            font-medium text-[15px]
            wrap-break-words
            ${isEmpty ? 'text-slate-500' : 'text-slate-700'}
          `}
        >
          {formattedValue}
        </div>
      </div>
    </div>
  );
}
