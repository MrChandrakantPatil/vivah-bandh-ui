import {
  Camera,
  FileText,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  UserRound,
  Image,
} from 'lucide-react';

import { useAuth } from '@/features/auth';

import type { ProfileSection } from '../types';

import {
  male1,
  male2,
  male3,
  male4,
  male5,
  female1,
  female2,
  female3,
  female4,
  female5,
} from '@/assets/images';

interface ProfileSidebarProps {
  activeSection: ProfileSection;
  onSectionChange: (section: ProfileSection) => void;
}

const profileNavigation: {
  id: ProfileSection;
  label: string;
  icon: typeof UserRound;
}[] = [
  {
    id: 'about',
    label: 'About Me',
    icon: UserRound,
  },
  {
    id: 'personal',
    label: 'Personal Details',
    icon: FileText,
  },
  {
    id: 'education',
    label: 'Education & Career',
    icon: GraduationCap,
  },
  {
    id: 'family',
    label: 'Family Details',
    icon: Home,
  },
  {
    id: 'location',
    label: 'Location',
    icon: MapPin,
  },
  {
    id: 'photos',
    label: 'Photos',
    icon: Image,
  },
  {
    id: 'partner',
    label: 'Partner Preferences',
    icon: Heart,
  },
];

export function ProfileSidebar({
  activeSection,
  onSectionChange,
}: ProfileSidebarProps) {
  const { profile } = useAuth();

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const profileImages = {
    male1,
    male2,
    male3,
    male4,
    male5,
    female1,
    female2,
    female3,
    female4,
    female5,
  };

  const profilePhoto = profile.profilePhotos?.[0];

  const image = profilePhoto
    ? profileImages[profilePhoto as keyof typeof profileImages]
    : male1;

  return (
    <aside className="shrink-0 w-68">
      <div className="bg-white rounded-xl">
        <div className="pt-5 pr-5 pb-0 pl-0">
          <div className="relative">
            <img
              src={image}
              alt={profile.name}
              className="w-full h-49.5 rounded-lg object-cover"
            />

            <button
              type="button"
              className="
                absolute right-3 bottom-3
                flex items-center justify-center
                w-10 h-10
                bg-white shadow-md rounded-full
                text-pink-500
                hover:bg-pink-50
              "
            >
              <Camera size={19} />
            </button>
          </div>

          <div className="pb-4 mt-4 border-b border-gray-200 text-left">
            <h2 className="font-bold text-[#172554] text-lg">{profile.name}</h2>

            <p className="mt-1 text-gray-500 text-sm">{profile.userId}</p>
          </div>
        </div>

        <nav className="pt-2 pr-5 pb-3">
          {profileNavigation.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSectionChange(id)}
                className={`
                  flex items-center gap-4
                  w-full px-4 py-3.5 pl-0
                  rounded-lg
                  font-medium text-sm text-left
                  transition-colors
                  ${
                    isActive
                      ? 'text-pink-500'
                      : 'text-[#172554] hover:text-pink-500'
                  }
                `}
              >
                <Icon size={20} strokeWidth={1.8} />

                <span className="flex-1">{label}</span>

                {isActive && (
                  <span className="w-2.5 h-2.5 bg-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
