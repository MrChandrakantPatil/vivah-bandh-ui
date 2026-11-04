import {
  Heart,
  Clock3,
  Flower2,
  Users,
  GraduationCap,
  BriefcaseBusiness,
} from 'lucide-react';

import {
  religionOptions,
  communityOptions,
  educationOptions,
  occupationOptions,
} from '@/data';

import { getOptionLabel } from '@/utils';
import { SectionCard } from '../SectionCard';
import { DetailRows } from '../DetailRows';

import type { DetailRowItem } from '../DetailRows';
import type { ProfileDetailsData } from '../../types';

interface PartnerPreferencesProps {
  profile: ProfileDetailsData;
}

export function PartnerPreferences({ profile }: PartnerPreferencesProps) {
  const partner = profile.partnerPreference;

  const normalizeValues = (value?: string | string[] | null): string[] => {
    if (!value) return [];

    return Array.isArray(value) ? value : [value];
  };

  const getDisplayValues = (
    value: string | string[] | undefined | null,
    options: typeof religionOptions,
  ): string[] => {
    return normalizeValues(value).map(
      (item) => getOptionLabel(item, options) ?? item,
    );
  };

  const ageRange =
    partner?.minAge != null || partner?.maxAge != null
      ? `${partner.minAge ?? 'Any'} – ${partner.maxAge ?? 'Any'} years`
      : 'Not specified';

  const partnerInfo: DetailRowItem[] = [
    {
      label: 'Age Range',
      value: ageRange,
      icon: Clock3,
    },
    {
      label: 'Religion',
      value: getDisplayValues(partner?.religion, religionOptions),
      icon: Flower2,
    },
    {
      label: 'Community',
      value: getDisplayValues(partner?.community, communityOptions),
      icon: Users,
    },
    {
      label: 'Education',
      value: getDisplayValues(partner?.education, educationOptions),
      icon: GraduationCap,
    },
    {
      label: 'Occupation',
      value: getDisplayValues(partner?.occupation, occupationOptions),
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <SectionCard title="Partner Preferences" icon={Heart}>
      <DetailRows items={partnerInfo} />
    </SectionCard>
  );
}
