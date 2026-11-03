import { Users, UserRound } from 'lucide-react';
import {
  familyStatusOptions,
  familyTypeOptions,
  occupationOptions,
} from '@/data';
import { getOptionLabel } from '@/utils';
import type { ProfileDetailsData } from '../../types';
import { SectionCard } from '../SectionCard';
import { DetailRows } from '../DetailRows';

interface FamilyDetailsProps {
  profile: ProfileDetailsData;
}

export function FamilyDetails({ profile }: FamilyDetailsProps) {
  const familyInfo = [
    {
      label: 'Family Type',
      value: getOptionLabel(profile.familyType, familyTypeOptions),
      icon: Users,
    },
    {
      label: 'Family Status',
      value: getOptionLabel(profile.familyStatus, familyStatusOptions),
      icon: Users,
    },
    {
      label: "Father's Occupation",
      value: getOptionLabel(profile.fatherOccupation, occupationOptions),
      icon: UserRound,
    },
    {
      label: "Mother's Occupation",
      value: getOptionLabel(profile.motherOccupation, occupationOptions),
      icon: UserRound,
    },
    {
      label: 'Siblings',
      value: `${profile.brothers ?? 0} brother(s), ${profile.sisters ?? 0} sister(s)`,
      icon: Users,
    },
  ];

  return (
    <SectionCard title="Family Details" icon={Users}>
      <DetailRows items={familyInfo} />
    </SectionCard>
  );
}
