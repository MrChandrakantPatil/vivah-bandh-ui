import { useState } from 'react';
import { ProfileEditActions } from '../ProfileEditActions';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/features/auth';
import type { SelectOption } from '@/data/types';

const countryOptions = [{ value: 'India', label: 'India' }];

const stateOptions = [{ value: 'Maharashtra', label: 'Maharashtra' }];

const cityOptions = [
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Pune', label: 'Pune' },
  { value: 'Nagpur', label: 'Nagpur' },
  { value: 'Nashik', label: 'Nashik' },
  { value: 'Thane', label: 'Thane' },
  { value: 'Navi Mumbai', label: 'Navi Mumbai' },
  {
    value: 'Chhatrapati Sambhajinagar',
    label: 'Chhatrapati Sambhajinagar',
  },
  { value: 'Kalyan-Dombivli', label: 'Kalyan-Dombivli' },
  { value: 'Vasai-Virar', label: 'Vasai-Virar' },
  { value: 'Mira-Bhayandar', label: 'Mira-Bhayandar' },
  { value: 'Bhiwandi', label: 'Bhiwandi' },
  { value: 'Panvel', label: 'Panvel' },
  { value: 'Solapur', label: 'Solapur' },
  { value: 'Kolhapur', label: 'Kolhapur' },
  { value: 'Amravati', label: 'Amravati' },
  { value: 'Sangli', label: 'Sangli' },
  { value: 'Satara', label: 'Satara' },
  { value: 'Jalgaon', label: 'Jalgaon' },
  { value: 'Akola', label: 'Akola' },
  { value: 'Latur', label: 'Latur' },
  { value: 'Nanded', label: 'Nanded' },
  { value: 'Dhule', label: 'Dhule' },
  { value: 'Ahmednagar', label: 'Ahmednagar' },
  { value: 'Chandrapur', label: 'Chandrapur' },
  { value: 'Parbhani', label: 'Parbhani' },
  { value: 'Beed', label: 'Beed' },
  { value: 'Ratnagiri', label: 'Ratnagiri' },
  { value: 'Wardha', label: 'Wardha' },
  { value: 'Yavatmal', label: 'Yavatmal' },
  { value: 'Buldhana', label: 'Buldhana' },
  { value: 'Jalna', label: 'Jalna' },
  { value: 'Gondia', label: 'Gondia' },
  { value: 'Bhandara', label: 'Bhandara' },
  { value: 'Washim', label: 'Washim' },
  { value: 'Osmanabad', label: 'Osmanabad' },
  { value: 'Hingoli', label: 'Hingoli' },
  { value: 'Sindhudurg', label: 'Sindhudurg' },
  { value: 'Palghar', label: 'Palghar' },
];

type LocationDetailKey = 'country' | 'state' | 'city';

interface LocationDetail {
  label: string;
  key: LocationDetailKey;
  options?: SelectOption[];
}

interface FormData {
  country: string;
  state: string;
  city: string;
}

const locationDetails: LocationDetail[] = [
  {
    label: 'Country',
    key: 'country',
    options: countryOptions,
  },
  {
    label: 'State',
    key: 'state',
    options: stateOptions,
  },
  {
    label: 'City',
    key: 'city',
    options: cityOptions,
  },
];

export function LocationDetails() {
  const { profile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    country: '',
    state: '',
    city: '',
  });

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const handleEdit = () => {
    setFormData({
      country: profile.location?.country || '',
      state: profile.location?.state || '',
      city: profile.location?.city || '',
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      country: '',
      state: '',
      city: '',
    });

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
  ) => {
    if (!value) {
      return '-';
    }

    return (
      detail.options?.find((option) => option.value === value)?.label || value
    );
  };

  const handleSave = () => {
    const updatedLocation = {
      country: formData.country,
      state: formData.state,
      city: formData.city,
    };

    console.log('Updated location:', updatedLocation);

    // API call will go here.

    setIsEditing(false);
  };

  return (
    <div className="relative h-full">
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
                <Select
                  value={String(value || '')}
                  onChange={(selectedValue) =>
                    handleSelectChange(detail.key, selectedValue)
                  }
                  placeholder={`Select ${detail.label}`}
                  options={detail.options}
                />
              ) : (
                <p className="mt-3 font-semibold text-[#172554] text-base">
                  {formatValue(detail, value)}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <ProfileEditActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </div>
  );
}
