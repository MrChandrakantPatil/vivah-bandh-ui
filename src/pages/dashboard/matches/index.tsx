import { useEffect, useRef, useState } from 'react';
import { tabs } from './data';
import type { TabId } from './types';
import { NotificationBadge } from '@/layouts/dashboard/components/NotificationBadge';
import { InterestedProfiles } from './components/InterestedProfiles';
import { NewMatches } from './components/NewMatches';
import { RecommendedMatches } from './components/RecommendedMatches';
import { ShortlistedProfiles } from './components/ShortlistedProfiles';
import { ViewedProfiles } from './components/ViewedProfiles';

const tabContent = {
  recommended: <RecommendedMatches />,
  newMatches: <NewMatches />,
  shortlisted: <ShortlistedProfiles />,
  interested: <InterestedProfiles />,
  viewed: <ViewedProfiles />,
};

export function Matches() {
  const [activeTab, setActiveTab] = useState<TabId>('recommended');

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
      <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">Matches</h1>

      <p className="mt-1 text-gray-500 text-sm sm:text-base">
        Find people who could be a great match for you.
      </p>

      <div className="w-full mt-8">
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
          className="py-5"
        >
          {tabContent[activeTab]}
        </div>
      </div>
    </div>
  );
}
