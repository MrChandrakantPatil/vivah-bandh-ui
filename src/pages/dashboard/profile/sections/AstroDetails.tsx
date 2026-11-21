import { useMemo, useState } from 'react';
import { Sparkles, Earth, Crosshair, MapPin, Clock } from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import { countryOptions, stateOptions, cityOptions } from '@/constants';
import { getProfileValue } from '../utils';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { ProfileViewFieldConfig, ProfileFieldDraftValue } from '../types';

type AstroDetailsKey =
  | 'astroDetails.countryOfBirth'
  | 'astroDetails.stateOfBirth'
  | 'astroDetails.cityOfBirth'
  | 'astroDetails.timeOfBirth';

interface AstroDetailsConfig extends ProfileViewFieldConfig {
  key: AstroDetailsKey;
  type: 'select' | 'time';
}

const astroFields: AstroDetailsConfig[] = [
  {
    label: 'Country of Birth',
    key: 'astroDetails.countryOfBirth',
    type: 'select',
    icon: Earth,
    options: countryOptions,
    required: true,
  },
  {
    label: 'State of Birth',
    key: 'astroDetails.stateOfBirth',
    type: 'select',
    icon: Crosshair,
    options: stateOptions,
    required: true,
  },
  {
    label: 'City of Birth',
    key: 'astroDetails.cityOfBirth',
    type: 'select',
    icon: MapPin,
    options: Object.values(cityOptions).flat(),
    required: true,
  },
  {
    label: 'Time of Birth',
    key: 'astroDetails.timeOfBirth',
    type: 'time',
    icon: Clock,
    required: true,
  },
];

const SECTION_TITLE = 'Astro Details';

export function AstroDetails() {
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
    fields: astroFields,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] =
    useState<AstroDetailsKey | null>(null);

  const selectedCountry = String(
    getProfileValue(editValues, 'astroDetails.countryOfBirth') ?? '',
  );

  const selectedState = String(
    getProfileValue(editValues, 'astroDetails.stateOfBirth') ?? '',
  );

  const editFields = useMemo(
    () =>
      astroFields.map((field) => {
        if (field.key === 'astroDetails.stateOfBirth')
          return {
            ...field,
            options: selectedCountry === 'india' ? stateOptions : [],
          };

        if (field.key === 'astroDetails.cityOfBirth')
          return {
            ...field,
            options:
              selectedCountry === 'india'
                ? (cityOptions[selectedState] ?? [])
                : [],
          };
          
        return field;
      }),
    [selectedCountry, selectedState],
  );

  const selectedField = editFields.find(
    (field) => field.key === selectedFieldKey,
  );

  const handleValueChange = (key: string, value: ProfileFieldDraftValue) => {
    setDraftValues((previous) => {
      const next = { ...previous, [key]: value };
      const currentValues = { ...profile, ...previous };

      if (value !== getProfileValue(currentValues, key)) {
        if (key === 'astroDetails.countryOfBirth') {
          next['astroDetails.stateOfBirth'] = '';
          next['astroDetails.cityOfBirth'] = '';
        } else if (key === 'astroDetails.stateOfBirth') {
          next['astroDetails.cityOfBirth'] = '';
        }
      }

      return next;
    });
  };

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={Sparkles}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={Sparkles}
        fields={astroFields}
        values={profile}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={Sparkles}
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
