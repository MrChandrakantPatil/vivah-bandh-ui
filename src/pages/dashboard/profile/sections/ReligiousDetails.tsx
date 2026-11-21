import { useMemo, useState } from 'react';
import {
  BookOpen,
  Church,
  Users,
  UserRound,
  Languages,
  GitBranch,
} from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import {
  religionOptions,
  communityOptions,
  motherTongueOptions,
  gotraOptions,
} from '@/constants';
import { getProfileValue } from '../utils';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { ProfileViewFieldConfig, ProfileFieldDraftValue } from '../types';

type ReligiousDetailsKey =
  | 'religiousBackground.religion'
  | 'religiousBackground.community'
  | 'religiousBackground.subCommunity'
  | 'religiousBackground.motherTongue'
  | 'religiousBackground.gothra';

interface ReligiousDetailsConfig extends ProfileViewFieldConfig {
  key: ReligiousDetailsKey;
  type: 'select' | 'text';
}

const religiousFields: ReligiousDetailsConfig[] = [
  {
    label: 'Religion',
    key: 'religiousBackground.religion',
    type: 'select',
    icon: Church,
    options: religionOptions,
    required: true,
  },
  {
    label: 'Community',
    key: 'religiousBackground.community',
    type: 'select',
    icon: Users,
    options: Object.values(communityOptions).flat(),
    required: true,
  },
  {
    label: 'Mother Tongue',
    key: 'religiousBackground.motherTongue',
    type: 'select',
    icon: Languages,
    options: motherTongueOptions,
    required: true,
  },
  {
    label: 'Sub-community',
    key: 'religiousBackground.subCommunity',
    type: 'text',
    icon: UserRound,
  },
  {
    label: 'Gothra',
    key: 'religiousBackground.gothra',
    type: 'select',
    options: gotraOptions,
    icon: GitBranch,
  },
];

const SECTION_TITLE = 'Religious Details';

export function ReligiousDetails() {
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
    setDraftValues,
  } = useProfileEditor(profile, {
    fields: religiousFields,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] =
    useState<ReligiousDetailsKey | null>(null);

  const selectedReligion = String(
    getProfileValue(editValues, 'religiousBackground.religion') ?? '',
  );

  const editFields = useMemo(
    () =>
      religiousFields.map((field) =>
        field.key === 'religiousBackground.community'
          ? { ...field, options: communityOptions[selectedReligion] ?? [] }
          : field,
      ),
    [selectedReligion],
  );

  const selectedField = editFields.find(
    (field) => field.key === selectedFieldKey,
  );

  const handleValueChange = (key: string, value: ProfileFieldDraftValue) => {
    setDraftValues((previous) => {
      const next = { ...previous, [key]: value };
      const currentValues = { ...profile, ...previous };

      if (value !== getProfileValue(currentValues, key)) {
        if (key === 'religiousBackground.religion') {
          next['religiousBackground.community'] = '';
          next['religiousBackground.subCommunity'] = '';
          next['religiousBackground.motherTongue'] = '';
          next['religiousBackground.gothra'] = '';
        } else if (key === 'religiousBackground.community') {
          next['religiousBackground.subCommunity'] = '';
          next['religiousBackground.gothra'] = '';
        }
      }

      return next;
    });
  };

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={BookOpen}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={BookOpen}
        fields={religiousFields}
        values={profile}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={BookOpen}
        title={SECTION_TITLE}
        isSaving={isSaving}
        error={saveError}
        onClose={handleClose}
        onCancel={handleClose}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        fields={editFields}
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
