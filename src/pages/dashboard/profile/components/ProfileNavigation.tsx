import { useRef } from 'react';
import {
  FileText,
  GraduationCap,
  Heart,
  Home,
  Image,
  MapPin,
  UserRound,
} from 'lucide-react';

import type { ProfileSection } from '../types';

interface ProfileNavigationProps {
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

export function ProfileNavigation({
  activeSection,
  onSectionChange,
}: ProfileNavigationProps) {
  const itemRefs = useRef<Record<ProfileSection, HTMLButtonElement | null>>(
    {} as Record<ProfileSection, HTMLButtonElement | null>,
  );

  const handleSectionChange = (section: ProfileSection) => {
    onSectionChange(section);

    itemRefs.current[section]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  return (
    <nav className="w-full border-b border-gray-200 overflow-x-auto profile-navigation">
      <div className="flex items-center gap-2 min-w-max">
        {profileNavigation.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              ref={(element) => {
                itemRefs.current[id] = element;
              }}
              type="button"
              onClick={() => handleSectionChange(id)}
              className={`
                relative
                flex items-center gap-2
                px-4 pb-3
                whitespace-nowrap font-medium text-sm
                transition-colors
                ${
                  isActive
                    ? 'text-pink-500'
                    : 'text-[#172554] hover:text-pink-500'
                }
              `}
            >
              <Icon size={18} strokeWidth={1.8} />

              <span>{label}</span>

              {isActive && (
                <span
                  className="
                    absolute right-0 bottom-0 left-0
                    h-0.5
                    bg-pink-500 rounded-full
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
