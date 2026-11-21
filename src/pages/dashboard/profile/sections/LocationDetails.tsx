import { useState } from 'react';
import { MapPin, Earth, Crosshair, Target, Pin } from 'lucide-react';
import { useProfileEditor } from '../useProfileEditor';
import { getProfileValue } from '../utils';
import { countryOptions, stateOptions, cityOptions } from '@/constants';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type { ProfileFieldDraftValue, ProfileViewFieldConfig } from '../types';

type LocationKey =
  'location.country' | 'location.state' | 'location.city' | 'location.zip';

interface LocationDetailsConfig extends ProfileViewFieldConfig {
  key: LocationKey;
  type: 'select' | 'text';
}

const locationFields: LocationDetailsConfig[] = [
  {
    label: 'Country',
    key: 'location.country',
    type: 'select',
    icon: Earth,
    options: countryOptions,
    required: true,
  },
  {
    label: 'State',
    key: 'location.state',
    type: 'select',
    icon: Crosshair,
    options: stateOptions,
    required: true,
  },
  {
    label: 'City',
    key: 'location.city',
    type: 'select',
    icon: Target,
    options: Object.values(cityOptions).flat(),
    required: true,
  },
  {
    label: 'Zip Code',
    key: 'location.zip',
    type: 'text',
    icon: Pin,
    placeholder: 'Enter Zip Code',
    required: true,
  },
];

const SECTION_TITLE = 'Location Details';

export function LocationDetails() {
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
    fields: locationFields,
    sectionTitle: SECTION_TITLE,
  });

  const [selectedFieldKey, setSelectedFieldKey] = useState<LocationKey | null>(
    null,
  );

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={MapPin}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  const selectedState = String(
    getProfileValue(editValues, 'location.state') ?? '',
  );

  const editFields = locationFields.map((field) =>
    field.key === 'location.city'
      ? { ...field, options: cityOptions[selectedState] ?? [] }
      : field,
  );

  const selectedField = editFields.find(
    (field) => field.key === selectedFieldKey,
  );

  const handleValueChange = (key: string, value: ProfileFieldDraftValue) => {
    setDraftValues((previous) => {
      const next = { ...previous, [key]: value };

      if (value !== getProfileValue(editValues, key)) {
        if (
          key === 'location.country' ||
          key === 'location.state' ||
          key === 'location.city'
        )
          next['location.zip'] = '';

        if (key === 'location.state') next['location.city'] = '';

        if (key === 'location.country') {
          next['location.state'] = '';
          next['location.city'] = '';
        }
      }
      
      return next;
    });
  };

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={MapPin}
        fields={locationFields}
        values={profile}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={MapPin}
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
