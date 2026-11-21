import { useState } from 'react';
import {
  UserRound,
  Users,
  CalendarDays,
  Heart,
  MoveVertical,
  PersonStanding,
  HeartPulse,
  Droplets,
  Palette,
  Apple,
  type LucideIcon,
} from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import {
  profileForOptions,
  genderOptions,
  maritalStatusOptions,
  heightOptions,
  dietOptions,
  disabilityOptions,
  healthInformationOptions,
  bloodGroupOptions,
  complexionOptions,
} from '@/constants';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { SelectOptionType } from '@/types/common.types';

type BasicDetailsKey =
  | 'profileFor'
  | 'gender'
  | 'dob'
  | 'maritalStatus'
  | 'height'
  | 'diet'
  | 'disability'
  | 'healthInformation'
  | 'bloodGroup'
  | 'complexion';

interface BasicDetailsConfig {
  key: BasicDetailsKey;
  label: string;
  type: 'select' | 'multiSelect' | 'date';
  icon: LucideIcon;
  options?: SelectOptionType[];
  exclusiveOptionValue?: string;
  required?: boolean;
}

const basicDetails: BasicDetailsConfig[] = [
  {
    label: 'Profile Created For',
    key: 'profileFor',
    type: 'select',
    icon: Users,
    options: profileForOptions,
    required: true,
  },
  {
    label: 'Gender',
    key: 'gender',
    type: 'select',
    icon: UserRound,
    options: genderOptions,
  },
  {
    label: 'Date of Birth',
    key: 'dob',
    type: 'date',
    icon: CalendarDays,
    required: true,
  },
  {
    label: 'Marital Status',
    key: 'maritalStatus',
    type: 'select',
    icon: Heart,
    options: maritalStatusOptions,
    required: true,
  },
  {
    label: 'Height (cm)',
    key: 'height',
    type: 'select',
    icon: MoveVertical,
    options: heightOptions,
    required: true,
  },
  {
    label: 'Diet',
    key: 'diet',
    type: 'select',
    icon: Apple,
    options: dietOptions,
    required: true,
  },
  {
    label: 'Disability',
    key: 'disability',
    type: 'select',
    icon: PersonStanding,
    options: disabilityOptions,
    required: true,
  },
  {
    label: 'Health Information',
    key: 'healthInformation',
    type: 'multiSelect',
    icon: HeartPulse,
    options: healthInformationOptions,
    exclusiveOptionValue: 'noHealthProblem',
  },
  {
    label: 'Blood Group',
    key: 'bloodGroup',
    type: 'select',
    icon: Droplets,
    options: bloodGroupOptions,
  },
  {
    label: 'Skin Tone',
    key: 'complexion',
    type: 'select',
    icon: Palette,
    options: complexionOptions,
  },
];

const SECTION_TITLE = 'Basic Details';

export function BasicDetails() {
  const { profile } = useProfile();

  const {
    isEditing,
    hasChanges,
    isSaving,
    saveError,
    handleSave,
    isOptionsOpen,
    setIsOptionsOpen,
    editValues,
    handleEdit,
    handleClose,
    handleValueChange,
  } = useProfileEditor(profile, {
    fields: basicDetails,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] =
    useState<BasicDetailsKey | null>(null);

  const selectedField = basicDetails.find(
    (field) => field.key === selectedFieldKey,
  );

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={UserRound}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  const values: Partial<Record<BasicDetailsKey, unknown>> = profile;

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={UserRound}
        fields={basicDetails}
        values={values}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={UserRound}
        title={SECTION_TITLE}
        isSaving={isSaving}
        error={saveError}
        onClose={handleClose}
        onCancel={handleClose}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        fields={basicDetails}
        values={editValues}
        onFieldClick={(field) => {
          setSelectedFieldKey(field.key);
          setIsOptionsOpen(true);
        }}
      />

      <ProfileOptionsDrawer
        isSaving={isSaving}
        isOpen={isOptionsOpen}
        onValueChange={handleValueChange}
        values={editValues}
        selectedField={selectedField}
        onBack={() => setIsOptionsOpen(false)}
      />
    </>
  );
}
