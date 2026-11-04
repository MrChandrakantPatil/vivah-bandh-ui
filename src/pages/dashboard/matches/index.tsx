import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { tabs } from './data';
import { NotificationBadge } from '@/layouts/dashboard/components/NotificationBadge';
import {
  RecommendedMatches,
  NewMatches,
  ShortlistedMatches,
} from './components/Tabs';
import type { TabId } from './types';

const tabContent = {
  recommendedMatches: <RecommendedMatches />,
  newMatches: <NewMatches />,
  shortlistedMatches: <ShortlistedMatches />,
};

export function Matches() {
  const [activeTab, setActiveTab] = useState<TabId>('recommendedMatches');

  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>(
    {} as Record<TabId, HTMLButtonElement | null>,
  );

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto text-slate-900">
      <div className="flex items-center gap-3 shrink-0 sm:gap-4">
        <div
          className="
            flex items-center justify-center shrink-0
            w-12 h-12
            bg-pink-100 shadow-sm rounded-2xl border border-pink-200
            text-pink-600
            sm:w-16 sm:h-16
          "
        >
          <Heart size={28} />
        </div>

        <div className="min-w-0">
          <h1 className="tracking-tight font-semibold text-[#172554] text-xl sm:text-2xl lg:text-3xl">
            Matches
          </h1>

          <p className="mt-1.5 text-gray-600 text-xs sm:text-sm lg:text-base">
            Find people who could be a great match for you.
          </p>
        </div>
      </div>

      <div
        className="
          w-full pt-6 mt-4
          border-t border-gray-200
          sm:mt-6 lg:mt-8
        "
      >
        <div className="overflow-x-auto hide-scrollbar" role="presentation">
          <div
            role="tablist"
            aria-label="Profile Sections"
            className="flex min-w-max border-b border-gray-300"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  ref={(element) => {
                    tabRefs.current[tab.id] = element;
                  }}
                  type="button"
                  key={tab.id}
                  role="tab"
                  id={`${tab.id}-tab`}
                  aria-selected={isActive}
                  aria-controls={`${tab.id}-panel`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center
                    px-5 pb-4
                    border-b-2
                    font-semibold
                    transition-colors
                    ${
                      isActive
                        ? 'border-[#e21c56] text-[#e21c56]'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  {tab.label}
                  <NotificationBadge count={tab.count} className="ml-4" />
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={`${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${activeTab}-tab`}
        >
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}
