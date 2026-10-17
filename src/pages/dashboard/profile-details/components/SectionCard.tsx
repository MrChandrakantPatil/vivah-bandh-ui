import type { ReactNode, ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

type SectionCardProps = {
  title: string;
  icon: ComponentType<LucideProps>;
  children: ReactNode;
  className?: string;
};

export function SectionCard({
  title,
  icon: Icon,
  children,
  className = '',
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
          flex items-center gap-3
          px-5 py-4
          bg-linear-to-r border-b border-slate-100
          sm:px-6
          from-pink-50/80 to-white
        "
      >
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

        <h2 className="tracking-tight font-bold text-slate-900 text-base">
          {title}
        </h2>
      </div>

      <div className="px-8 py-5 sm:px-9.5 sm:py-6">{children}</div>
    </section>
  );
}
