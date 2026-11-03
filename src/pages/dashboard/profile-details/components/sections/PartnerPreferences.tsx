import { useEffect, useRef, useState } from 'react';

import {
  Heart,
  Clock3,
  Flower2,
  Users,
  GraduationCap,
  BriefcaseBusiness,
} from 'lucide-react';
import {
  religionOptions,
  communityOptions,
  educationOptions,
  occupationOptions,
} from '@/data';
import { MoreModal } from '@/components';
import { getOptionLabel } from '@/utils';
import { SectionCard } from '../SectionCard';
import type { MoreModalData } from '@/components/MoreModal';
import type { ProfileDetailsData } from '../../types';

interface PartnerPreferencesProps {
  profile: ProfileDetailsData;
}

interface PartnerInfoItem {
  label: string;
  values: string[];
  icon: typeof Clock3;
}

export function PartnerPreferences({ profile }: PartnerPreferencesProps) {
  const [selectedPreference, setSelectedPreference] =
    useState<MoreModalData | null>(null);

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const valueRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const partner = profile.partnerPreference;

  const normalizeValues = (value?: string | string[] | null): string[] => {
    if (!value) return [];

    return Array.isArray(value) ? value : [value];
  };

  const getDisplayValues = (
    value: string | string[] | undefined | null,
    options: typeof religionOptions,
  ): string[] => {
    return normalizeValues(value).map(
      (item) => getOptionLabel(item, options) ?? item,
    );
  };

  const ageRange =
    partner?.minAge != null || partner?.maxAge != null
      ? `${partner.minAge ?? 'Any'} – ${partner.maxAge ?? 'Any'} years`
      : 'Not specified';

  const partnerInfo: PartnerInfoItem[] = [
    {
      label: 'Age Range',
      values: [ageRange],
      icon: Clock3,
    },
    {
      label: 'Religion',
      values: getDisplayValues(partner?.religion, religionOptions),
      icon: Flower2,
    },
    {
      label: 'Community',
      values: getDisplayValues(partner?.community, communityOptions),
      icon: Users,
    },
    {
      label: 'Education',
      values: getDisplayValues(partner?.education, educationOptions),
      icon: GraduationCap,
    },
    {
      label: 'Occupation',
      values: getDisplayValues(partner?.occupation, occupationOptions),
      icon: BriefcaseBusiness,
    },
  ];

  const partnerInfoKey = JSON.stringify(
    partnerInfo.map(({ label, values }) => [label, values]),
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

    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [partnerInfoKey]);

  return (
    <>
      <SectionCard title="Partner Preferences" icon={Heart}>
        <div className="divide-y divide-slate-100">
          {partnerInfo.map((item) => {
            const Icon = item.icon;
            const values = item.values.length > 0 ? item.values : ['--'];

            return (
              <div
                key={item.label}
                className="
                  grid grid-cols-[20px_minmax(0,1fr)] gap-x-3 gap-y-2
                  py-4 first:pt-0 last:pb-0
                  sm:grid-cols-[20px_minmax(0,1fr)_minmax(0,1fr)] sm:items-center
                "
              >
                <div className="text-[#e91e63]/80">
                  <Icon size={17} strokeWidth={1.7} />
                </div>

                <span className="text-slate-500 text-sm">{item.label}</span>

                <div className="min-w-0 sm:col-start-3 col-start-2">
                  <div
                    className="
                      flex flex-col items-start gap-1
                      min-w-0
                      sm:flex-row sm:items-center sm:justify-end sm:gap-2
                    "
                  >
                    <p
                      ref={(element) => {
                        valueRefs.current[item.label] = element;
                      }}
                      className="
                        max-w-full min-w-0
                        text-slate-700 text-sm
                        overflow-hidden
                        sm:flex-1 sm:whitespace-nowrap sm:break-normal sm:text-right sm:line-clamp-1 sm:text-ellipsis
                        wrap-break-words line-clamp-2
                      "
                    >
                      {values.join(', ')}
                    </p>

                    {showMore[item.label] && (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPreference({
                            title: item.label,
                            values,
                          })
                        }
                        className="shrink-0 whitespace-nowrap font-semibold text-pink-600 text-xs hover:text-pink-700"
                      >
                        More
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      <MoreModal
        isOpen={Boolean(selectedPreference)}
        data={selectedPreference}
        onClose={() => setSelectedPreference(null)}
      />
    </>
  );
}
