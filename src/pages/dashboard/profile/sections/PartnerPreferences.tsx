import { useState } from 'react';
import {
  CalendarDays,
  MoveVertical,
  Users,
  Baby,
  Mosque,
  Globe,
  BookOpen,
  Church,
  GraduationCap,
  HeartHandshake,
  MapPin,
  Earth,
  Crosshair,
  Target,
  Building,
  School,
  BriefcaseBusiness,
  IndianRupee,
  SlidersHorizontal,
  UserRound,
  Apple,
} from 'lucide-react';
import {
  getDependentOptions,
  getVisiblePreferenceSections,
  getProfileValue as getByPath,
} from '../utils';
import { useProfileEditor } from '../useProfileEditor';
import {
  preferenceMaritalStatusOptions,
  profileWithChildrenOptions,
  preferenceReligionOptions,
  preferenceCommunityOptions,
  preferenceMotherTongueOptions,
  preferenceCountryOptions,
  preferenceStateOptions,
  preferenceCityOptions,
  preferenceQualificationOptions,
  preferenceWorkingSectorOptions,
  preferenceProfessionOptions,
  preferenceProfileOptions,
  preferenceDietOptions,
} from '@/constants';
import { useProfile } from '@/features/profile';
import {
  ProfileViewSection,
  ProfileSectionCard,
  ProfileEditDrawer,
  ProfileOptionsDrawer,
} from '../components';
import type {
  ProfileViewFieldConfig,
  ProfileSectionGroup,
  ProfileFieldDraftValue,
} from '../types';

type PreferenceField = ProfileViewFieldConfig & {
  type: 'select' | 'multiSelect' | 'range' | 'annualIncome';
};

const partnerPreferenceSections: ProfileSectionGroup<PreferenceField>[] = [
  {
    key: 'basicDetails',
    title: 'Basic Details',
    icon: UserRound,
    fields: [
      {
        label: 'Age Range',
        key: 'basicDetails.ageRange',
        minKey: 'basicDetails.minAge',
        maxKey: 'basicDetails.maxAge',
        type: 'range',
        icon: CalendarDays,
        suffix: 'years',
        min: 18,
        max: 47,
        step: 1,
      },
      {
        label: 'Height Range',
        key: 'basicDetails.heightRange',
        minKey: 'basicDetails.minHeight',
        maxKey: 'basicDetails.maxHeight',
        type: 'range',
        icon: MoveVertical,
        suffix: 'inches',
        storedUnit: 'cm',
        min: 53,
        max: 84,
        step: 1,
      },
      {
        label: 'Marital Status',
        key: 'basicDetails.maritalStatus',
        type: 'multiSelect',
        icon: Users,
        options: preferenceMaritalStatusOptions,
      },
      {
        label: 'Profile with Children',
        key: 'basicDetails.profileWithChildren',
        type: 'select',
        icon: Baby,
        options: profileWithChildrenOptions,
      },
    ],
  },
  {
    key: 'religion',
    title: 'Religion & Community',
    icon: BookOpen,
    fields: [
      {
        label: 'Religion',
        key: 'religion.religion',
        type: 'multiSelect',
        icon: Church,
        options: preferenceReligionOptions,
      },
      {
        label: 'Community',
        key: 'religion.community',
        type: 'multiSelect',
        icon: Mosque,
        options: preferenceCommunityOptions,
      },
      {
        label: 'Mother Tongue',
        key: 'religion.motherTongue',
        type: 'multiSelect',
        icon: Globe,
        options: preferenceMotherTongueOptions,
      },
    ],
  },
  {
    key: 'location',
    title: 'Location',
    icon: MapPin,
    fields: [
      {
        label: 'Country',
        key: 'location.country',
        type: 'multiSelect',
        icon: Earth,
        options: preferenceCountryOptions,
      },
      {
        label: 'State',
        key: 'location.state',
        type: 'multiSelect',
        icon: Crosshair,
        options: preferenceStateOptions,
      },
      {
        label: 'City',
        key: 'location.city',
        type: 'multiSelect',
        icon: Target,
        options: preferenceCityOptions,
      },
    ],
  },
  {
    key: 'educationAndCareer',
    title: 'Education & Career',
    icon: GraduationCap,
    fields: [
      {
        label: 'Qualification',
        key: 'educationAndCareer.qualification',
        type: 'multiSelect',
        icon: Building,
        options: preferenceQualificationOptions,
      },
      {
        label: 'Working Sector',
        key: 'educationAndCareer.workingSector',
        type: 'multiSelect',
        icon: School,
        options: preferenceWorkingSectorOptions,
      },
      {
        label: 'Profession',
        key: 'educationAndCareer.profession',
        type: 'multiSelect',
        icon: BriefcaseBusiness,
        options: preferenceProfessionOptions,
      },
      {
        label: 'Annual Income',
        key: 'educationAndCareer.annualIncome',
        type: 'annualIncome',
        icon: IndianRupee,
      },
    ],
  },
  {
    key: 'other',
    title: 'Other Preferences',
    icon: SlidersHorizontal,
    fields: [
      {
        label: 'Profile Managed By',
        key: 'other.profileManagedBy',
        type: 'multiSelect',
        icon: UserRound,
        options: preferenceProfileOptions,
      },
      {
        label: 'Diet',
        key: 'other.diet',
        type: 'multiSelect',
        icon: Apple,
        options: preferenceDietOptions,
      },
    ],
  },
];

const partnerPreferenceFields = partnerPreferenceSections.flatMap(
  (section) => section.fields,
);

const SECTION_TITLE = 'Partner Preferences';

export function PartnerPreferences() {
  const { profile } = useProfile();
  
  const values = getByPath(profile, 'partnerPreferences');

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
  } = useProfileEditor(values, {
    fields: partnerPreferenceFields,
    sectionTitle: SECTION_TITLE,
    rootKey: 'partnerPreferences',
  });

  const [selectedField, setSelectedField] = useState<PreferenceField | null>(
    null,
  );

  if (!profile) {
    return (
      <ProfileSectionCard title={SECTION_TITLE} icon={HeartHandshake}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </ProfileSectionCard>
    );
  }

  const filteredSections = getVisiblePreferenceSections(
    partnerPreferenceSections,
    values,
  );

  const editSections = getVisiblePreferenceSections(
    partnerPreferenceSections,
    editValues,
  );

  const handleValueChange = (key: string, value: ProfileFieldDraftValue) => {
    setDraftValues((previous) => {
      const next = { ...previous, [key]: value };

      if (
        key === 'basicDetails.maritalStatus' &&
        Array.isArray(value) &&
        value.length === 1 &&
        value[0] === 'neverMarried'
      ) {
        next['basicDetails.profileWithChildren'] = 'openToAll';
      }

      if (key === 'religion.religion' && Array.isArray(value)) {
        const currentValues = {
          ...(values && typeof values === 'object' ? values : {}),
          ...previous,
        };

        const currentReligions = getByPath(currentValues, key);
        
        const unchanged =
          Array.isArray(currentReligions) &&
          currentReligions.length === value.length &&
          currentReligions.every((religion) =>
            value.includes(String(religion)),
          );
        
        if (!unchanged) next['religion.community'] = ['openToAll'];
      }

      const dependency =
        key === 'location.state'
          ? { key: 'location.city', options: preferenceCityOptions }
          : null;

      if (dependency) {
        const nextValues = {
          ...(values && typeof values === 'object' ? values : {}),
          ...next,
        };

        const allowedValues = new Set(
          getDependentOptions(nextValues, key, dependency.options).flatMap(
            (option) =>
              option.options
                ? option.options.map((item) => item.value)
                : [option.value],
          ),
        );

        const current = getByPath(nextValues, dependency.key);

        if (Array.isArray(current)) {
          const retained = current.filter((item) =>
            allowedValues.has(String(item)),
          );

          if (retained.length !== current.length)
            next[dependency.key] = retained.length ? retained : ['openToAll'];
        }
      }

      return next;
    });
  };

  const handleFieldClick = (field: PreferenceField) => {
    setIsOptionsOpen(true);
    
    setSelectedField(
      field.key === 'religion.community'
        ? {
            ...field,
            options: getDependentOptions(
              editValues,
              'religion.religion',
              preferenceCommunityOptions,
            ),
          }
        : field.key === 'location.city'
          ? {
              ...field,
              options: getDependentOptions(
                editValues,
                'location.state',
                preferenceCityOptions,
              ),
            }
          : field,
    );
  };

  return (
    <>
      <ProfileViewSection
        title={SECTION_TITLE}
        icon={HeartHandshake}
        sections={filteredSections}
        values={values}
        onEdit={handleEdit}
      />

      <ProfileEditDrawer
        isOpen={isEditing}
        icon={HeartHandshake}
        title={SECTION_TITLE}
        isSaving={isSaving}
        error={saveError}
        onClose={handleClose}
        onCancel={handleClose}
        onSave={handleSave}
        saveDisabled={!hasChanges}
        sections={editSections}
        values={editValues}
        onFieldClick={handleFieldClick}
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
