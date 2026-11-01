import { useState, type ChangeEvent } from 'react';
import { UserRound } from 'lucide-react';
import { SectionCard } from '../SectionCard';
import { ProfileEditActions } from '../ProfileEditActions';
import { Select } from '@/components/ui/Select';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../../api';
import { complexionOptions, genderOptions, maritalStatusOptions, profileForOptions, } from '@/data';
import type { SelectOption } from '@/data/types';
import type { Gender } from '@/types/profile.types';
import type { UpdateProfilePayload } from '../../types';

type PersonalDetailKey =
  | 'name'
  | 'profileFor'
  | 'gender'
  | 'dob'
  | 'height'
  | 'color'
  | 'maritalStatus';

interface PersonalDetail {
  label: string;
  key: PersonalDetailKey;
  type: 'text' | 'select' | 'date' | 'number';
  options?: SelectOption[];
}

interface FormData {
  name: string;
  profileFor: string;
  gender: Gender | '';
  dob: string;
  height: string;
  color: string;
  maritalStatus: string;
}

const personalDetails: PersonalDetail[] = [
  { label: 'Full Name', key: 'name', type: 'text' },
  {
    label: 'Profile Created For',
    key: 'profileFor',
    type: 'select',
    options: profileForOptions,
  },
  {
    label: 'Gender',
    key: 'gender',
    type: 'select',
    options: genderOptions,
  },
  { label: 'Date of Birth', key: 'dob', type: 'date' },
  { label: 'Height', key: 'height', type: 'number' },
  {
    label: 'Complexion',
    key: 'color',
    type: 'select',
    options: complexionOptions,
  },
  {
    label: 'Marital Status',
    key: 'maritalStatus',
    type: 'select',
    options: maritalStatusOptions,
  },
];

const initialFormData: FormData = {
  name: '',
  profileFor: '',
  gender: '',
  dob: '',
  height: '',
  color: '',
  maritalStatus: '',
};

function getFormData(
  profile: NonNullable<ReturnType<typeof useProfile>['profile']>,
): FormData {
  return {
    name: profile.name || '',
    profileFor: profile.profileFor || '',
    gender: profile.gender || '',
    dob: formatDateForInput(profile.dob),
    height: profile.height != null ? String(profile.height) : '',
    color: profile.color || '',
    maritalStatus: profile.maritalStatus || '',
  };
}

function formatDateForInput(value: string | null | undefined): string {
  if (!value) return '';

  // Handle date-only values without timezone shifting.
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);

  if (dateOnlyMatch) {
    return `${dateOnlyMatch[1]}-${dateOnlyMatch[2]}-${dateOnlyMatch[3]}`;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function formatValue(
  detail: PersonalDetail,
  value: string | number | null | undefined,
): string | number {
  if (value == null || value === '') {
    return '-';
  }

  if (detail.type === 'select') {
    return (
      detail.options?.find((option) => option.value === String(value))?.label ??
      value
    );
  }

  if (detail.key === 'dob') {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return '-';

    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  if (detail.key === 'height') {
    return `${value} cm`;
  }

  return value;
}

export function BasicDetails() {
  const { profile, updateProfileData } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleEdit = () => {
    if (!profile) return;

    setFormData(getFormData(profile));
    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (profile) {
      setFormData(getFormData(profile));
    } else {
      setFormData(initialFormData);
    }

    setSaveError(null);
    setIsEditing(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: PersonalDetailKey, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setSaveError('Please enter your full name.');
      return;
    }

    if (formData.gender !== 'male' && formData.gender !== 'female') {
      setSaveError('Please select a valid gender.');
      return;
    }

    if (!formData.dob) {
      setSaveError('Please select your date of birth.');
      return;
    }

    const selectedDate = new Date(`${formData.dob}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime()) || selectedDate > today) {
      setSaveError('Please select a valid date of birth.');
      return;
    }

    if (
      formData.height &&
      (!Number.isFinite(Number(formData.height)) ||
        Number(formData.height) <= 0)
    ) {
      setSaveError('Please enter a valid height.');
      return;
    }

    const updatedProfile: UpdateProfilePayload = {
      name: formData.name.trim(),
      profileFor: formData.profileFor,
      gender: formData.gender,
      dob: formData.dob,
      height: formData.height ? Number(formData.height) : null,
      color: formData.color || undefined,
      maritalStatus: formData.maritalStatus || undefined,
    };

    try {
      setIsSaving(true);
      setSaveError(null);

      const response = await updateProfileApi(updatedProfile);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update profile.');
      }

      updateProfileData({
        name: response.data?.name ?? updatedProfile.name,
        profileFor: response.data?.profileFor ?? updatedProfile.profileFor,
        gender: response.data?.gender ?? updatedProfile.gender,
        dob: response.data?.dob ?? updatedProfile.dob,
        height: response.data?.height ?? updatedProfile.height,
        color: response.data?.color ?? updatedProfile.color,
        maritalStatus:
          response.data?.maritalStatus ?? updatedProfile.maritalStatus,
      });

      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to update profile.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <SectionCard title="Personal Information" icon={UserRound}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Personal Information"
      icon={UserRound}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {personalDetails.map((detail) => {
            const value = isEditing
              ? formData[detail.key]
              : profile[detail.key];

            return (
              <div
                key={detail.key}
                className="
                  px-5 py-5
                  bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-2xl border border-gray-100
                  transition
                  hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:border-pink-100
                "
              >
                <p className="font-medium text-gray-500 text-sm">
                  {detail.label}
                </p>

                {isEditing ? (
                  detail.type === 'select' ? (
                    <Select
                      value={String(value ?? '')}
                      onChange={(selectedValue) =>
                        handleSelectChange(detail.key, selectedValue)
                      }
                      placeholder={`Select ${detail.label}`}
                      options={detail.options}
                    />
                  ) : (
                    <input
                      type={detail.type}
                      name={detail.key}
                      value={value == null ? '' : String(value)}
                      onChange={handleInputChange}
                      disabled={isSaving}
                      min={
                        detail.key === 'height'
                          ? 1
                          : detail.key === 'dob'
                            ? undefined
                            : undefined
                      }
                      max={
                        detail.key === 'dob'
                          ? formatDateForInput(new Date().toISOString())
                          : undefined
                      }
                      className="
                        w-full px-3 py-2.5 mt-3
                        bg-white rounded-lg border border-gray-200
                        font-medium text-[#172554] text-base
                        transition
                        disabled:opacity-60 focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                        outline-none
                      "
                    />
                  )
                ) : (
                  <p className="mt-3 font-semibold text-[#172554] text-base">
                    {formatValue(detail, value)}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {saveError && (
          <p className="mt-3 text-red-600 text-sm" role="alert">
            {saveError}
          </p>
        )}

        <ProfileEditActions
          isEditing={isEditing}
          onCancel={handleCancel}
          onSave={handleSave}
        />

        {isSaving && (
          <p className="mt-2 text-gray-500 text-sm">Saving changes...</p>
        )}
      </div>
    </SectionCard>
  );
}
