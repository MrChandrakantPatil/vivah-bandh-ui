import { useState } from 'react';
import {
  GraduationCap,
  Building,
  University,
  BriefcaseBusiness,
  School,
  Building2,
  IndianRupee,
} from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import {
  qualificationOptions,
  workingSectorOptions,
  professionOptions,
  incomeOptions,
} from '@/constants';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { ProfileViewFieldConfig } from '../types';

type EducationCareerKey =
  | 'education.highestQualification'
  | 'education.collegeName'
  | 'career.workingSector'
  | 'career.profession'
  | 'career.employer'
  | 'career.annualIncome';

interface EducationCareerField extends ProfileViewFieldConfig {
  key: EducationCareerKey;
  type: 'select' | 'text';
}

const educationCareerFields: EducationCareerField[] = [
  {
    label: 'Highest Qualification',
    key: 'education.highestQualification',
    type: 'select',
    icon: Building,
    options: qualificationOptions,
    required: true,
  },
  {
    label: 'College / University',
    key: 'education.collegeName',
    type: 'text',
    icon: University,
    required: true,
  },
  {
    label: 'Working Sector',
    key: 'career.workingSector',
    type: 'select',
    icon: School,
    options: workingSectorOptions,
    required: true,
  },
  {
    label: 'Profession',
    key: 'career.profession',
    type: 'select',
    icon: BriefcaseBusiness,
    options: professionOptions,
    required: true,
  },
  {
    label: 'Employer',
    key: 'career.employer',
    type: 'text',
    icon: Building2,
    required: true,
  },
  {
    label: 'Annual Income',
    key: 'career.annualIncome',
    type: 'select',
    icon: IndianRupee,
    options: incomeOptions,
    required: true,
  },
];

const SECTION_TITLE = 'Education & Career';

export function EducationCareerDetails() {
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
    fields: educationCareerFields,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] =
    useState<EducationCareerKey | null>(null);
    
  const selectedField = educationCareerFields.find(
    (field) => field.key === selectedFieldKey,
  );

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={GraduationCap}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={GraduationCap}
        fields={educationCareerFields}
        values={profile}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={GraduationCap}
        title={SECTION_TITLE}
        isSaving={isSaving}
        error={saveError}
        onClose={handleClose}
        onCancel={handleClose}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        fields={educationCareerFields}
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
