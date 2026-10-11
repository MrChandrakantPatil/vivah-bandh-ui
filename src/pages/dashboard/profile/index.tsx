import { useState } from 'react';
import { User } from 'lucide-react';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ProfileNavigation } from './components/ProfileNavigation';
import {
  AboutMe,
  BasicDetails,
  EducationCareer,
  FamilyDetails,
  LocationDetails,
  Photos,
  PartnerPreferences,
} from './components/Tabs';

import type { ProfileSection } from './types';

export function Profile() {
  const [activeSection, setActiveSection] = useState<ProfileSection>('about');

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <AboutMe />;
      case 'personal':
        return <BasicDetails />;
      case 'education':
        return <EducationCareer />;
      case 'family':
        return <FamilyDetails />;
      case 'location':
        return <LocationDetails />;
      case 'photos':
        return <Photos />;
      case 'partner':
        return <PartnerPreferences />;
      default:
        return <AboutMe />;
    }
  };

  return (
    <div className="flex flex-col w-full h-auto lg:h-full lg:min-h-0">
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
          <User size={24} className="sm:hidden" />
          <User size={28} className="sm:block hidden" />
        </div>

        <div className="min-w-0">
          <h1 className="tracking-tight font-bold text-[#172554] text-2xl sm:text-3xl lg:text-4xl">
            My Profile
          </h1>

          <p className="mt-1.5 text-gray-600 text-xs sm:text-sm lg:text-base">
            Manage and update your profile information.
          </p>
        </div>
      </div>

      <div
        className="
          flex flex-col flex-1 gap-4
          w-full min-h-0 mt-6
          border-t border-gray-200
          lg:flex-row sm:gap-6 sm:mt-8
        "
      >
        <div className="w-full min-w-0 pt-6 lg:shrink-0 lg:w-auto">
          <ProfileSidebar />
        </div>

        <main
          className="
            flex flex-col flex-1
            w-full min-w-0 min-h-0 pb-6
            lg:pl-8 lg:border-l lg:border-gray-200
          "
        >
          <ProfileNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <div className="flex-1 min-w-0 min-h-0 mt-6 sm:mt-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
