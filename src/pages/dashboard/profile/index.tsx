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
    <div className="flex flex-col w-full h-full">
      <div className="flex items-center gap-4">
        <div
          className="
            flex items-center justify-center
            w-16 h-16
            bg-pink-50 rounded-full
            text-pink-500
          "
        >
          <User size={24} />
        </div>

        <div>
          <h1 className="font-semibold text-xl sm:text-2xl lg:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-gray-500 text-sm sm:text-base">
            Manage and update your profile information.
          </p>
        </div>
      </div>

      <div className="w-full h-px mt-8 bg-gray-200"></div>

      <div className="flex-1 flex w-full pt-8">
        <div className="border-r border-gray-200">
          <ProfileSidebar />
        </div>

        <main className="flex-1 min-w-0 pb-6 pl-10">
          <ProfileNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <div className="mt-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
}
