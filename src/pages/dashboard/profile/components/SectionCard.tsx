import type { ReactNode, ComponentType } from 'react';
import { Pencil, type LucideProps } from 'lucide-react';

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
        bg-white shadow-[0_2px_12px_rgba(15,23,42,0.035)] rounded-xl border border-pink-100
        ${className}
      `}
    >
      <div
        className="
          flex items-center justify-between gap-3
          px-4 py-3
          bg-linear-to-r rounded-t-xl border-b border-pink-100
          sm:px-5
          from-pink-50/80 to-white
        "
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="
              flex items-center justify-center shrink-0
              w-9 h-9
              bg-pink-100/80 rounded-lg
              text-[#e91e63]
            "
          >
            <Icon size={18} strokeWidth={1.8} />
          </div>

          <h2 className="tracking-tight font-semibold text-slate-900 text-sm truncate sm:text-base">
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
              px-2.5 py-1.5
              rounded-lg
              font-semibold text-[#e91e63] text-xs
              transition
              hover:bg-pink-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2
              sm:text-sm
            "
          >
            <Pencil size={14} />
            Edit
          </button>
        )}
      </div>

      <div className="px-4 py-4 sm:px-5 sm:py-5">{children}</div>
    </section>
  );
}
