import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { countryOptions, stateOptions, cityOptions } from '@/data';
import { updateProfileApi } from '../../api';
import { getOptionLabel } from '@/utils';
import { SelectOption } from '@/components';
import { ProfileEditActions } from '../ProfileEditActions';
import { SectionCard } from '../SectionCard';
import { useProfile } from '@/features/profile';
import type { SelectOptionType } from '@/types/common.types';
import type { UpdateProfilePayload } from '../../types';

type LocationDetailKey = 'country' | 'state' | 'city';

interface LocationDetail {
  label: string;
  key: LocationDetailKey;
  options: SelectOptionType[];
}

interface FormData {
  country: string;
  state: string;
  city: string;
}

const locationDetails: LocationDetail[] = [
  {
    label: 'City',
    key: 'city',
    options: cityOptions,
  },
  {
    label: 'State',
    key: 'state',
    options: stateOptions,
  },
  {
    label: 'Country',
    key: 'country',
    options: countryOptions,
  },
];

const initialFormData: FormData = {
  country: '',
  state: '',
  city: '',
};

export function LocationDetails() {
  const { profile, updateProfileData } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleEdit = () => {
    if (!profile) return;

    setFormData({
      country: profile.location?.country || '',
      state: profile.location?.state || '',
      city: profile.location?.city || '',
    });

    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleSelectChange = (name: LocationDetailKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatValue = (
    detail: LocationDetail,
    value: string | null | undefined,
  ): string => {
    return getOptionLabel(value, detail.options, '--');
  };

  const handleSave = async () => {
    const updatedProfile: UpdateProfilePayload = {
      location: {
        country: formData.country || null,
        state: formData.state || null,
        city: formData.city || null,
      },
    };

    try {
      setIsSaving(true);
      setSaveError(null);

      const response = await updateProfileApi(updatedProfile);

      updateProfileData({
        location: {
          country:
            response.data?.location?.country ??
            updatedProfile.location?.country ??
            null,
          state:
            response.data?.location?.state ??
            updatedProfile.location?.state ??
            null,
          city:
            response.data?.location?.city ??
            updatedProfile.location?.city ??
            null,
        },
      });

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
      <SectionCard title="Location Details" icon={MapPin}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Location Details"
      icon={MapPin}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {locationDetails.map((detail) => {
            const value = isEditing
              ? formData[detail.key]
              : profile.location?.[detail.key];

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
                  <SelectOption
                    value={String(value ?? '')}
                    onChange={(selectedValue) =>
                      handleSelectChange(detail.key, selectedValue)
                    }
                    placeholder={`Select ${detail.label}`}
                    options={detail.options}
                  />
                ) : (
                  <p
                    className={`
                      mt-3
                      font-semibold text-base
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
