import {
  CalendarDays,
  Cake,
  Flower2,
  Heart,
  MapPin,
  Ruler,
  UserRound,
  Users,
  UsersRound,
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
      icon: UsersRound,
    },
    {
      label: 'Age',
      value: profile.age != null ? `${profile.age} years` : 'Not specified',
      icon: Cake,
    },
    {
      label: 'Height',
      value: formatHeight(profile.height),
      icon: Ruler,
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
      icon: MapPin,
    },
    {
      label: 'Religion',
      value: getOptionLabel(profile.religion, religionOptions),
      icon: Flower2,
    },
    {
      label: 'Community',
      value: getOptionLabel(profile.community, communityOptions),
      icon: Users,
    },
  ];

  return (
    <SectionCard title="Basic Details" icon={UserRound}>
      <DetailRows items={items} />
    </SectionCard>
  );
}
