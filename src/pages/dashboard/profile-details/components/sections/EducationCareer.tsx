import { GraduationCap, BriefcaseBusiness, Wallet, MapPin } from 'lucide-react';
import {
  educationOptions,
  occupationOptions,
  incomeOptions,
  cityOptions,
  stateOptions,
  countryOptions,
} from '@/data';
import { getOptionLabel } from '@/utils';
import { SectionCard } from '../SectionCard';
import { DetailRows } from '../DetailRows';
import type { ProfileDetailsData } from '../../types';

interface EducationCareerProps {
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

export function EducationCareer({ profile }: EducationCareerProps) {
  const items = [
    {
      label: 'Education',
      value: getOptionLabel(profile.education, educationOptions),
      icon: GraduationCap,
    },
    {
      label: 'Occupation',
      value: getOptionLabel(profile.occupation, occupationOptions),
      icon: BriefcaseBusiness,
    },
    {
      label: 'Annual Income',
      value: getOptionLabel(profile.annualIncome, incomeOptions),
      icon: Wallet,
    },
    {
      label: 'Location',
      value: getProfileLocation(profile) || 'Not specified',
      icon: MapPin,
    },
  ];

  return (
    <SectionCard title="Education & Career" icon={GraduationCap}>
      <DetailRows items={items} />
    </SectionCard>
  );
}
