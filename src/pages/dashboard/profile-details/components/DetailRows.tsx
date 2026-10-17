import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

export interface DetailRowItem {
  label: string;
  value: string;
  icon?: ComponentType<LucideProps>;
}

interface DetailRowsProps {
  items: DetailRowItem[];
  className?: string;
}

export function DetailRows({ items, className = '' }: DetailRowsProps) {
  return (
    <div
      className={`
        divide-y divide-slate-100
        ${className}
      `}
    >
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="
            grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 gap-y-1
            py-3 first:pt-0 last:pb-0
            sm:grid-cols-[20px_minmax(100px,0.8fr)_minmax(0,1.2fr)] sm:items-center
          "
        >
          <div className="text-[#e91e63]/80">
            {Icon && <Icon size={17} strokeWidth={1.7} />}
          </div>

          <span className="text-slate-500 text-sm">{label}</span>

          <span
            className="
              font-medium text-slate-800 text-sm
              sm:col-start-auto sm:text-right
              col-start-2 wrap-break-words
            "
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
