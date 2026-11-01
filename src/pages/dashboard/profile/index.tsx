import { User } from 'lucide-react';
import { ProfileSidebar } from './components/ProfileSidebar';
import { AboutMe, BasicDetails, EducationCareer, FamilyDetails, LocationDetails, Photos, PartnerPreferences, } from './components/Tabs';

export function Profile() {
  const scrollToPhotos = () => {
    document
      .getElementById('profile-photos')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-w-0 pb-10 mx-auto text-slate-900">
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
          <User size={28} />
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
          grid grid-cols-1 items-start gap-5
          min-w-0 pt-8 mt-6
          border-t border-gray-200
          xl:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] xl:gap-8
        "
      >
        <ProfileSidebar navigateToPhotosSection={scrollToPhotos} />

        <main className="space-y-8 min-w-0">
          <AboutMe />

          <BasicDetails />

          <EducationCareer />

          <FamilyDetails />

          <LocationDetails />

          <div id="profile-photos" className="scroll-mt-13">
            <Photos />
          </div>

          <PartnerPreferences />
        </main>
      </div>
    </div>
  );
}
