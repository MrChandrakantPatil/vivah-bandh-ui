import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import { tabs } from './data';
import type { TabId } from './types';
import { NotificationBadge } from '@/layouts/dashboard/components/NotificationBadge';
import {
  RecommendedMatches,
  NewMatches,
  ShortlistedMatches,
} from './components/Tabs';

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
    <div>
      <div className="flex items-center gap-4">
        <div
          className="
            flex items-center justify-center
            w-16 h-16
            bg-pink-50 rounded-full
            text-pink-500
          "
        >
          <Heart size={24} />
        </div>

        <div>
          <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">
            Matches
          </h1>

          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Find people who could be a great match for you.
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-8 bg-gray-200"></div>

      <div className="w-full mt-4 sm:mt-6 lg:mt-8">
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
                    px-5 pb-3
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
