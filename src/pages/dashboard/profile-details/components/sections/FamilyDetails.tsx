import { BriefcaseBusiness, House, UsersRound, Wallet } from 'lucide-react';

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
      icon: House,
    },
    {
      label: 'Family Status',
      value: getOptionLabel(profile.familyStatus, familyStatusOptions),
      icon: Wallet,
    },
    {
      label: "Father's Occupation",
      value: getOptionLabel(profile.fatherOccupation, occupationOptions),
      icon: BriefcaseBusiness,
    },
    {
      label: "Mother's Occupation",
      value: getOptionLabel(profile.motherOccupation, occupationOptions),
      icon: BriefcaseBusiness,
    },
    {
      label: 'Siblings',
      value: `${profile.brothers ?? 0} brother(s), ${profile.sisters ?? 0} sister(s)`,
      icon: UsersRound,
    },
  ];

  return (
    <SectionCard title="Family Details" icon={UsersRound}>
      <DetailRows items={familyInfo} />
    </SectionCard>
  );
}
