import type { ReactNode, ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
import { Pencil } from 'lucide-react';

type SectionCardProps = {
  title: string;
  icon: ComponentType<LucideProps>;
  children: ReactNode;
  className?: string;
  onEdit?: () => void;
  isEditing?: boolean;
};

export function SectionCard({
  title,
  icon: Icon,
  children,
  className = '',
  onEdit,
  isEditing = false,
}: SectionCardProps) {
  return (
    <section
      className={`
        min-w-0
        bg-white shadow-[0_3px_18px_rgba(15,23,42,0.035)] rounded-2xl border border-slate-200/80
        overflow-hidden
        ${className}
      `}
    >
      <div
        className="
          flex items-center justify-between gap-3
          px-5 py-4
          bg-linear-to-r border-b border-slate-100
          sm:px-6
          from-pink-50/80 to-white
        "
      >
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="
              flex items-center justify-center shrink-0
              w-10 h-10
              bg-pink-100/80 rounded-xl
              text-[#e91e63]
            "
          >
            <Icon size={19} strokeWidth={1.8} />
          </div>

          <h2 className="tracking-tight font-bold text-slate-900 text-base truncate">
            {title}
          </h2>
        </div>

        {onEdit && !isEditing && (
          <button
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${title}`}
            className="
              inline-flex items-center justify-center gap-1.5 shrink-0
              px-3 py-2
              rounded-lg
              font-semibold text-[#e91e63] text-sm
              transition
              hover:bg-pink-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
            "
          >
            <Pencil size={15} />
            Edit
          </button>
        )}
      </div>

      <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>
    </section>
  );
}
