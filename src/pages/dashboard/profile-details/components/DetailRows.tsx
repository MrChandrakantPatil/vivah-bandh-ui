import { useEffect, useRef, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import type { LucideProps } from 'lucide-react';

import { MoreModal } from '@/components/MoreModal';
import type { MoreModalData } from '@/components/MoreModal';

export interface DetailRowItem {
  label: string;
  value: ReactNode;
  icon?: ComponentType<LucideProps>;
}

interface DetailRowsProps {
  items: DetailRowItem[];
  className?: string;
}

const isStringArray = (value: ReactNode): value is string[] => {
  return (
    Array.isArray(value) && value.every((item) => typeof item === 'string')
  );
};

export function DetailRows({ items, className = '' }: DetailRowsProps) {
  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const [selectedDetail, setSelectedDetail] = useState<MoreModalData | null>(
    null,
  );

  const valueRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const arrayItemsKey = JSON.stringify(
    items
      .filter(({ value }) => isStringArray(value))
      .map(({ label, value }) => [label, value]),
  );

  useEffect(() => {
    const checkOverflow = () => {
      const isMobile = window.matchMedia('(max-width: 639px)').matches;

      const overflow: Record<string, boolean> = {};

      Object.entries(valueRefs.current).forEach(([label, element]) => {
        if (!element) return;

        overflow[label] = isMobile
          ? element.scrollHeight > element.clientHeight + 1
          : element.scrollWidth > element.clientWidth + 1;
      });

      setShowMore((previous) => {
        const previousKeys = Object.keys(previous);
        const nextKeys = Object.keys(overflow);

        const hasChanged =
          previousKeys.length !== nextKeys.length ||
          nextKeys.some((key) => previous[key] !== overflow[key]);

        return hasChanged ? overflow : previous;
      });
    };

    const observer = new ResizeObserver(checkOverflow);

    Object.values(valueRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    const animationFrame = requestAnimationFrame(checkOverflow);

    window.addEventListener('resize', checkOverflow);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [arrayItemsKey]);

  return (
    <>
      <div
        className={`
          divide-y divide-slate-100
          ${className}
        `}
      >
        {items.map(({ label, value, icon: Icon }) => {
          const isArrayValue = isStringArray(value);
          const values = isArrayValue
            ? value.length > 0
              ? value
              : ['--']
            : [];

          return (
            <div
              key={label}
              className="
                grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 gap-y-1
                px-3 py-3 first:pt-0 last:pb-0
                sm:grid-cols-[20px_minmax(100px,0.8fr)_minmax(0,1.2fr)] sm:items-center
              "
            >
              <div className="text-gray-600">
                {Icon && <Icon size={17} strokeWidth={1.7} />}
              </div>

              <span className="text-slate-500 text-sm">{label}</span>

              <div className="min-w-0 sm:col-start-auto sm:text-right col-start-2">
                {isArrayValue ? (
                  <div
                    className="
                      flex flex-col items-start gap-1
                      min-w-0
                      sm:flex-row sm:items-center sm:justify-end sm:gap-2
                    "
                  >
                    <p
                      ref={(element) => {
                        if (element) {
                          valueRefs.current[label] = element;
                        } else {
                          delete valueRefs.current[label];
                        }
                      }}
                      className="
                        max-w-full min-w-0
                        font-medium text-slate-800 text-sm
                        overflow-hidden
                        sm:flex-1 sm:whitespace-nowrap sm:break-normal sm:text-right sm:line-clamp-1 sm:text-ellipsis
                        wrap-break-words line-clamp-2
                      "
                    >
                      {values.join(', ')}
                    </p>

                    {showMore[label] && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDetail({
                            title: label,
                            values,
                          })
                        }
                        className="shrink-0 whitespace-nowrap font-semibold text-pink-600 text-xs hover:text-pink-700"
                      >
                        More
                      </button>
                    )}
                  </div>
                ) : typeof value === 'string' || typeof value === 'number' ? (
                  <span className="font-medium text-slate-800 text-sm wrap-break-words">
                    {value}
                  </span>
                ) : (
                  value
                )}
              </div>
            </div>
          );
        })}
      </div>

      <MoreModal
        isOpen={Boolean(selectedDetail)}
        data={selectedDetail}
        onClose={() => setSelectedDetail(null)}
      />
    </>
  );
}
