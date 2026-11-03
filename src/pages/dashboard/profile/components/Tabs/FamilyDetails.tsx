import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { UsersRound } from 'lucide-react';
import {
  familyTypeOptions,
  familyStatusOptions,
  occupationOptions,
} from '@/data';
import { SelectOption } from '@/components';
import { getOptionLabel } from '@/utils';
import { updateProfileApi } from '../../api';
import { ProfileEditActions } from '../ProfileEditActions';
import { SectionCard } from '../SectionCard';
import { useProfile } from '@/features/profile';
import type { SelectOptionType } from '@/types/common.types';
import type { UpdateProfilePayload } from '../../types';

type FamilyDetailKey =
  | 'familyType'
  | 'familyStatus'
  | 'fatherOccupation'
  | 'motherOccupation'
  | 'brothers'
  | 'sisters';

interface FamilyDetail {
  label: string;
  key: FamilyDetailKey;
  type: 'select' | 'number';
  options?: SelectOptionType[];
}

interface FormData {
  familyType: string;
  familyStatus: string;
  fatherOccupation: string;
  motherOccupation: string;
  brothers: string;
  sisters: string;
}

const familyDetails: FamilyDetail[] = [
  {
    label: 'Family Type',
    key: 'familyType',
    type: 'select',
    options: familyTypeOptions,
  },
  {
    label: 'Family Status',
    key: 'familyStatus',
    type: 'select',
    options: familyStatusOptions,
  },
  {
    label: "Father's Occupation",
    key: 'fatherOccupation',
    type: 'select',
    options: occupationOptions,
  },
  {
    label: "Mother's Occupation",
    key: 'motherOccupation',
    type: 'select',
    options: occupationOptions,
  },
  {
    label: 'Brothers',
    key: 'brothers',
    type: 'number',
  },
  {
    label: 'Sisters',
    key: 'sisters',
    type: 'number',
  },
];

const initialFormData: FormData = {
  familyType: '',
  familyStatus: '',
  fatherOccupation: '',
  motherOccupation: '',
  brothers: '',
  sisters: '',
};

export function FamilyDetails() {
  const { profile, updateProfileData } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleEdit = () => {
    if (!profile) return;

    setFormData({
      familyType: profile.familyType || '',
      familyStatus: profile.familyStatus || '',
      fatherOccupation: profile.fatherOccupation || '',
      motherOccupation: profile.motherOccupation || '',
      brothers: profile.brothers != null ? String(profile.brothers) : '',
      sisters: profile.sisters != null ? String(profile.sisters) : '',
    });

    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: FamilyDetailKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatValue = (
    detail: FamilyDetail,
    value: string | number | null | undefined,
  ): string | number => {
    if (detail.type === 'select') {
      return getOptionLabel(value, detail.options ?? [], '--');
    }

    return value ?? '--';
  };

  const handleSave = async () => {
    const updatedProfile: UpdateProfilePayload = {
      familyType: formData.familyType,
      familyStatus: formData.familyStatus,
      fatherOccupation: formData.fatherOccupation,
      motherOccupation: formData.motherOccupation,
      brothers: formData.brothers === '' ? 0 : Number(formData.brothers),
      sisters: formData.sisters === '' ? 0 : Number(formData.sisters),
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
      <SectionCard title="Family Details" icon={UsersRound}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Family Details"
      icon={UsersRound}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {familyDetails.map((detail) => {
            const value = isEditing
              ? formData[detail.key]
              : profile[detail.key];

            return (
              <div
                key={detail.key}
                className="
                  px-4 py-3.5
                  bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-xl border border-slate-200/80
                  transition
                  hover:shadow-[0_4px_12px_rgba(15,23,42,0.05)] hover:border-pink-100
                "
              >
                <p className="font-medium text-gray-500 text-xs sm:text-sm">
                  {detail.label}
                </p>

                {isEditing ? (
                  detail.type === 'select' ? (
                    <div className="mt-2">
                      <SelectOption
                        value={String(value ?? '')}
                        onChange={(selectedValue) =>
                          handleSelectChange(detail.key, selectedValue)
                        }
                        placeholder={`Select ${detail.label}`}
                        options={detail.options}
                      />
                    </div>
                  ) : (
                    <input
                      type="number"
                      name={detail.key}
                      value={String(value ?? '')}
                      min={0}
                      step={1}
                      onChange={handleInputChange}
                      className="
                        w-full px-3 py-2 mt-2
                        bg-white rounded-lg border border-gray-200
                        font-medium text-[#172554] text-sm
                        transition
                        focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                        outline-none
                      "
                    />
                  )
                ) : (
                  <p
                    className={`
                      mt-2
                      font-semibold text-sm
                      sm:text-[15px]
                      ${!value ? 'text-gray-400' : 'text-[#172554]'}
                    `}
                  >
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
          <p className="mt-2 text-gray-500 text-sm" role="status">
            Saving changes...
          </p>
        )}
      </div>
    </SectionCard>
  );
}
