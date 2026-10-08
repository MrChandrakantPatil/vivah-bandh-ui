import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { FileText, Pencil, Save, X } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/features/auth';
import {
  complexionOptions,
  genderOptions,
  maritalStatusOptions,
  profileForOptions,
} from '@/data';
import type { SelectOption } from '@/data/types';

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
  gender: string;
  dob: string;
  height: string;
  color: string;
  maritalStatus: string;
}

const personalDetails: PersonalDetail[] = [
  {
    label: 'Full Name',
    key: 'name',
    type: 'text',
  },
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
  {
    label: 'Date of Birth',
    key: 'dob',
    type: 'date',
  },
  {
    label: 'Height',
    key: 'height',
    type: 'number',
  },
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

function formatDateForInput(value: string | null | undefined) {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function formatValue(
  detail: PersonalDetail,
  value: string | number | null | undefined,
) {
  if (!value) {
    return '-';
  }

  if (detail.type === 'select') {
    return (
      detail.options?.find((option) => option.value === String(value))?.label ||
      value
    );
  }

  if (detail.key === 'dob') {
    return new Date(value).toLocaleDateString('en-IN', {
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
  const { profile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: '',
    profileFor: '',
    gender: '',
    dob: '',
    height: '',
    color: '',
    maritalStatus: '',
  });

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const handleEdit = () => {
    setFormData({
      name: profile.name || '',
      profileFor: profile.profileFor || '',
      gender: profile.gender || '',
      dob: formatDateForInput(profile.dob),
      height: profile.height ? String(profile.height) : '',
      color: profile.color || '',
      maritalStatus: profile.maritalStatus || '',
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      profileFor: '',
      gender: '',
      dob: '',
      height: '',
      color: '',
      maritalStatus: '',
    });

    setIsEditing(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: PersonalDetailKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    const updatedProfile = {
      ...formData,
      height: formData.height ? Number(formData.height) : null,
    };

    console.log('Updated profile:', updatedProfile);

    // API call will go here.

    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              bg-pink-50 rounded-full
              text-pink-500
            "
          >
            <FileText size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#172554] text-xl lg:text-2xl">
              Personal Information
            </h2>

            <p className="mt-1 text-gray-500 text-sm">
              Keep your personal information up to date
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="
              flex items-center gap-2
              px-4 py-2
              rounded-lg border border-pink-300
              font-medium text-pink-500 text-sm
              transition
              hover:bg-pink-50
            "
          >
            <Pencil size={16} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-lg border border-gray-300
                font-medium text-gray-600 text-sm
                transition
                hover:bg-gray-50
              "
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="
                flex items-center gap-2
                px-4 py-2
                bg-pink-500 rounded-lg
                font-medium text-white text-sm
                transition
                hover:bg-pink-600
              "
            >
              <Save size={16} />
              Save
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2 xl:grid-cols-3">
        {personalDetails.map((detail) => {
          const value = isEditing ? formData[detail.key] : profile[detail.key];

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
                    value={String(value || '')}
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
                    value={value || ''}
                    onChange={handleInputChange}
                    className="
                      w-full px-3 py-2.5 mt-3
                      bg-white rounded-lg border border-gray-200
                      font-medium text-[#172554] text-base
                      transition
                      focus:border-pink-400 focus:ring-2 focus:ring-pink-100
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
    </>
  );
}
