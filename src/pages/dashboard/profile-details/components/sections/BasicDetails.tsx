import {
  CalendarDays,
  Heart,
  MoveVertical,
  UserRound,
  Users,
} from 'lucide-react';
import {
  maritalStatusOptions,
  profileForOptions,
  cityOptions,
  stateOptions,
  countryOptions,
  religionOptions,
  communityOptions,
} from '@/data';
import { getOptionLabel, formatDate, formatHeight } from '@/utils';
import { SectionCard } from '../SectionCard';
import { DetailRows } from '../DetailRows';
import type { ProfileDetailsData } from '../../types';

interface BasicDetailsProps {
  profile: ProfileDetailsData;
}

const getProfileLocation = (profile: ProfileDetailsData): string => {
  return [
    getOptionLabel(profile.location?.city, cityOptions),
    getOptionLabel(profile.location?.state, stateOptions),
    getOptionLabel(profile.location?.country, countryOptions),
  ]
    .filter(Boolean)
    .join(', ');
};

export function BasicDetails({ profile }: BasicDetailsProps) {
  const items = [
    {
      label: 'Profile Created For',
      value: getOptionLabel(profile.profileFor, profileForOptions),
      icon: Users,
    },
    {
      label: 'Age',
      value: profile.age != null ? `${profile.age} years` : 'Not specified',
      icon: UserRound,
    },
    {
      label: 'Height',
      value: formatHeight(profile.height),
      icon: MoveVertical,
    },
    {
      label: 'Date of Birth',
      value: formatDate(profile.dob),
      icon: CalendarDays,
    },
    {
      label: 'Marital Status',
      value: getOptionLabel(profile.maritalStatus, maritalStatusOptions),
      icon: Heart,
    },
    {
      label: 'Lives In',
      value: getProfileLocation(profile),
      icon: Heart,
    },
    {
      label: 'Religion',
      value: getOptionLabel(profile.religion, religionOptions),
      icon: Heart,
    },
    {
      label: 'Community',
      value: getOptionLabel(profile.community, communityOptions),
      icon: Heart,
    },
  ];

  return (
    <SectionCard title="Basic Details" icon={UserRound}>
      <DetailRows items={items} />
    </SectionCard>
  );
}
