import { useState } from 'react';
import { UsersRound, UserRound, Wallet } from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import { familyStatusOptions, parentDetailsOptions } from '@/constants';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { ProfileViewFieldConfig } from '../types';

type FamilyKey =
  | 'familyDetails.financialStatus'
  | 'familyDetails.fatherDetails'
  | 'familyDetails.motherDetails'
  | 'familyDetails.brothers'
  | 'familyDetails.sisters';

interface FamilyDetailsConfig extends ProfileViewFieldConfig {
  key: FamilyKey;
  type: 'select' | 'number';
}

const familyFields: FamilyDetailsConfig[] = [
  {
    label: 'Financial Status',
    key: 'familyDetails.financialStatus',
    type: 'select',
    icon: Wallet,
    options: familyStatusOptions,
  },
  {
    label: "Father's Details",
    key: 'familyDetails.fatherDetails',
    type: 'select',
    icon: UsersRound,
    options: parentDetailsOptions,
  },
  {
    label: "Mother's Details",
    key: 'familyDetails.motherDetails',
    type: 'select',
    icon: UsersRound,
    options: parentDetailsOptions,
  },
  {
    label: 'Brothers',
    key: 'familyDetails.brothers',
    type: 'number',
    icon: UserRound,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    label: 'Sisters',
    key: 'familyDetails.sisters',
    type: 'number',
    icon: UserRound,
    min: 0,
    max: 10,
    step: 1,
  },
];

const SECTION_TITLE = 'Family Details';

export function FamilyDetails() {
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
    fields: familyFields,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] = useState<FamilyKey | null>(
    null,
  );
  
  const selectedField = familyFields.find(
    (field) => field.key === selectedFieldKey,
  );

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={UsersRound}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={UsersRound}
        fields={familyFields}
        values={profile}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={UsersRound}
        title={SECTION_TITLE}
        isSaving={isSaving}
        error={saveError}
        onClose={handleClose}
        onCancel={handleClose}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        fields={familyFields}
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
