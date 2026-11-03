import { useState } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { educationOptions, occupationOptions, incomeOptions } from '@/data';
import { getOptionLabel } from '@/utils';
import { ProfileEditActions } from '../ProfileEditActions';
import { SectionCard } from '../SectionCard';
import { SelectOption } from '@/components';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../../api';
import type { SelectOptionType } from '@/types/common.types';
import type { UpdateProfilePayload } from '../../types';

type EducationCareerKey = 'education' | 'occupation' | 'annualIncome';

interface EducationCareerDetail {
  label: string;
  key: EducationCareerKey;
  options: SelectOptionType[];
}

interface FormData {
  education: string;
  occupation: string;
  annualIncome: string;
}

const educationCareerDetails: EducationCareerDetail[] = [
  {
    label: 'Education',
    key: 'education',
    options: educationOptions,
  },
  {
    label: 'Occupation',
    key: 'occupation',
    options: occupationOptions,
  },
  {
    label: 'Annual Income',
    key: 'annualIncome',
    options: incomeOptions,
  },
];

const initialFormData: FormData = {
  education: '',
  occupation: '',
  annualIncome: '',
};

export function EducationCareer() {
  const { profile, updateProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleEdit = () => {
    if (!profile) return;

    setFormData({
      education: profile.education || '',
      occupation: profile.occupation || '',
      annualIncome: profile.annualIncome || '',
    });

    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSelectChange = (name: EducationCareerKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const updatedProfile: UpdateProfilePayload = {
      education: formData.education,
      occupation: formData.occupation,
      annualIncome: formData.annualIncome,
    };

    try {
      setIsSaving(true);
      setSaveError(null);

      const response = await updateProfileApi(updatedProfile);

      if (!response.success) {
        throw new Error(response.message || 'Failed to update profile');
      }

      updateProfileData(response.data);

      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to update profile',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return (
      <SectionCard title="Education & Career" icon={BriefcaseBusiness}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Education & Career"
      icon={BriefcaseBusiness}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {educationCareerDetails.map((detail) => {
            const value = isEditing
              ? formData[detail.key]
              : profile[detail.key];

            return (
              <div
                key={detail.key}
                className="
                  px-4 py-3.5
                  bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-xl border border-gray-100
                  transition
                  hover:shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:border-pink-100
                "
              >
                <p className="font-medium text-gray-500 text-xs sm:text-sm">
                  {detail.label}
                </p>

                {isEditing ? (
                  <SelectOption
                    value={String(value || '')}
                    onChange={(selectedValue) =>
                      handleSelectChange(detail.key, selectedValue)
                    }
                    placeholder={`Select ${detail.label}`}
                    options={detail.options}
                  />
                ) : (
                  <p
                    className={`
                      mt-2
                      font-semibold text-sm
                      sm:text-[15px]
                      ${!value ? 'text-gray-400' : 'text-[#172554]'}
                    `}
                  >
                    {getOptionLabel(value, detail.options, '--')}
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
          <p className="mt-2 text-gray-500 text-sm" role="status">
            Saving changes...
          </p>
        )}
      </div>
    </SectionCard>
  );
}
