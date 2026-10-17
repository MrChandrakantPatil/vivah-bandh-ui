import {
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Flower2,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  MoveVertical,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';

import type { ProfileDetailsData } from './types';

export type ProfileDetailItem = {
  label: string;
  value: string;
  icon?: typeof UserRound;
};

export type ProfileHeroItem = {
  label: string;
  value: string;
  icon: typeof UserRound;
};

export const formatValue = (
  value: unknown,
  fallback = 'Not specified',
): string => {
  if (value === null || value === undefined || value === '') {
    return fallback;
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : fallback;
  }

  if (typeof value === 'object') {
    return fallback;
  }

  return String(value);
};

export const formatHeight = (value: unknown): string => {
  if (value === null || value === undefined || value === '') {
    return 'Not specified';
  }

  return typeof value === 'number' ? `${value} cm` : String(value);
};

export const formatDate = (value?: string): string => {
  if (!value) return 'Not specified';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export const getProfileLocation = (profile: ProfileDetailsData): string => {
  return [
    profile.location?.city,
    profile.location?.state,
    profile.location?.country,
  ]
    .filter(Boolean)
    .join(', ');
};

export const getProfileHeroItems = (
  profile: ProfileDetailsData,
): ProfileHeroItem[] => {
  const location = getProfileLocation(profile);

  return [
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
      label: 'Location',
      value: location || 'Not specified',
      icon: MapPin,
    },
    {
      label: 'Religion & Community',
      value: `${formatValue(profile.religion)} · ${formatValue(profile.community)}`,
      icon: Flower2,
    },
    {
      label: 'Education',
      value: formatValue(profile.education),
      icon: GraduationCap,
    },
    {
      label: 'Profession',
      value: formatValue(profile.occupation),
      icon: BriefcaseBusiness,
    },
  ];
};

export const getProfileDetailSections = (profile: ProfileDetailsData) => {
  const partner = profile.partnerPreference;

  const personalInfo: ProfileDetailItem[] = [
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
      label: 'Date of birth',
      value: formatDate(profile.dob),
      icon: CalendarDays,
    },
    {
      label: 'Marital status',
      value: formatValue(profile.maritalStatus),
      icon: Heart,
    },
    {
      label: 'Mother tongue',
      value: formatValue(profile.motherTongue),
      icon: MessageCircle,
    },
    {
      label: 'Profile created for',
      value: formatValue(profile.profileFor),
      icon: Users,
    },
  ];

  const careerInfo: ProfileDetailItem[] = [
    {
      label: 'Education',
      value: formatValue(profile.education),
      icon: GraduationCap,
    },
    {
      label: 'Occupation',
      value: formatValue(profile.occupation),
      icon: BriefcaseBusiness,
    },
    {
      label: 'Annual income',
      value: formatValue(profile.annualIncome),
      icon: Wallet,
    },
    {
      label: 'Location',
      value: getProfileLocation(profile) || 'Not specified',
      icon: MapPin,
    },
  ];

  const familyInfo: ProfileDetailItem[] = [
    {
      label: 'Family status',
      value: formatValue(profile.familyStatus),
      icon: Users,
    },
    {
      label: 'Family type',
      value: formatValue(profile.familyType),
      icon: Users,
    },
    {
      label: "Father's occupation",
      value: formatValue(profile.fatherOccupation),
      icon: UserRound,
    },
    {
      label: "Mother's occupation",
      value: formatValue(profile.motherOccupation),
      icon: UserRound,
    },
    {
      label: 'Siblings',
      value: `${profile.brothers ?? 0} brother(s), ${profile.sisters ?? 0} sister(s)`,
      icon: Users,
    },
  ];

  const religionInfo: ProfileDetailItem[] = [
    {
      label: 'Religion',
      value: formatValue(profile.religion),
      icon: Flower2,
    },
    {
      label: 'Community',
      value: formatValue(profile.community),
      icon: Users,
    },
  ];

  const partnerInfo: ProfileDetailItem[] = [
    {
      label: 'Age range',
      value:
        partner?.minAge != null || partner?.maxAge != null
          ? `${partner.minAge ?? 'Any'} – ${partner.maxAge ?? 'Any'} years`
          : 'Not specified',
      icon: Clock3,
    },
    {
      label: 'Height',
      value:
        partner?.minHeight != null || partner?.maxHeight != null
          ? `${partner.minHeight ?? 'Any'} – ${partner.maxHeight ?? 'Any'}`
          : 'Not specified',
      icon: MoveVertical,
    },
    {
      label: 'Marital status',
      value: formatValue(partner?.maritalStatus),
      icon: Heart,
    },
    {
      label: 'Education',
      value: formatValue(partner?.education),
      icon: GraduationCap,
    },
    {
      label: 'Location',
      value: formatValue(partner?.location),
      icon: MapPin,
    },
  ];

  const profileSummary: ProfileDetailItem[] = [
    {
      label: 'Profile for',
      value: formatValue(profile.profileFor),
      icon: Users,
    },
    {
      label: 'Mother tongue',
      value: formatValue(profile.motherTongue),
      icon: MessageCircle,
    },
    {
      label: 'Family status',
      value: formatValue(profile.familyStatus),
      icon: Users,
    },
    {
      label: 'Family type',
      value: formatValue(profile.familyType),
      icon: Users,
    },
    {
      label: 'Annual income',
      value: formatValue(profile.annualIncome),
      icon: Wallet,
    },
  ];

  return {
    personalInfo,
    careerInfo,
    familyInfo,
    religionInfo,
    partnerInfo,
    profileSummary,
  };
};
