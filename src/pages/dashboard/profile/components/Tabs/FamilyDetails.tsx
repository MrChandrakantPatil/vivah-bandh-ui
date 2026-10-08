import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { Home, Pencil, Save, X } from 'lucide-react';
import { Select } from '@/components/ui/Select';
import { useAuth } from '@/features/auth';
import type { SelectOption } from '@/data/types';

const familyTypeOptions = [
  { value: 'Nuclear Family', label: 'Nuclear Family' },
  { value: 'Joint Family', label: 'Joint Family' },
  { value: 'Extended Family', label: 'Extended Family' },
];

const familyStatusOptions = [
  { value: 'Middle Class', label: 'Middle Class' },
  { value: 'Upper Middle Class', label: 'Upper Middle Class' },
  { value: 'Affluent', label: 'Affluent' },
  { value: 'Rich', label: 'Rich' },
];

const occupationOptions = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'Mobile App Developer', label: 'Mobile App Developer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'Data Engineer', label: 'Data Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Cybersecurity Specialist', label: 'Cybersecurity Specialist' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },

  { value: 'Doctor', label: 'Doctor' },
  { value: 'Dentist', label: 'Dentist' },
  { value: 'Pharmacist', label: 'Pharmacist' },
  { value: 'Nurse', label: 'Nurse' },
  { value: 'Physiotherapist', label: 'Physiotherapist' },
  { value: 'Medical Researcher', label: 'Medical Researcher' },

  { value: 'Teacher', label: 'Teacher' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'Education Professional', label: 'Education Professional' },

  { value: 'Chartered Accountant', label: 'Chartered Accountant' },
  { value: 'Accountant', label: 'Accountant' },
  { value: 'Financial Analyst', label: 'Financial Analyst' },
  { value: 'Investment Banker', label: 'Investment Banker' },
  { value: 'Banker', label: 'Banker' },
  { value: 'Insurance Professional', label: 'Insurance Professional' },

  { value: 'Lawyer', label: 'Lawyer' },
  { value: 'Legal Consultant', label: 'Legal Consultant' },
  { value: 'Judge', label: 'Judge' },

  { value: 'Business Owner', label: 'Business Owner' },
  { value: 'Entrepreneur', label: 'Entrepreneur' },
  { value: 'Self Employed', label: 'Self Employed' },

  { value: 'Government Employee', label: 'Government Employee' },
  { value: 'Civil Servant', label: 'Civil Servant' },
  { value: 'Police Officer', label: 'Police Officer' },
  { value: 'Defence Personnel', label: 'Defence Personnel' },

  { value: 'Mechanical Engineer', label: 'Mechanical Engineer' },
  { value: 'Civil Engineer', label: 'Civil Engineer' },
  { value: 'Electrical Engineer', label: 'Electrical Engineer' },
  { value: 'Electronics Engineer', label: 'Electronics Engineer' },
  { value: 'Chemical Engineer', label: 'Chemical Engineer' },
  { value: 'Architect', label: 'Architect' },

  { value: 'Marketing Manager', label: 'Marketing Manager' },
  { value: 'Sales Professional', label: 'Sales Professional' },
  { value: 'HR Professional', label: 'HR Professional' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Operations Manager', label: 'Operations Manager' },
  { value: 'Business Analyst', label: 'Business Analyst' },

  { value: 'Journalist', label: 'Journalist' },
  { value: 'Content Writer', label: 'Content Writer' },
  { value: 'Graphic Designer', label: 'Graphic Designer' },
  { value: 'Photographer', label: 'Photographer' },
  { value: 'Interior Designer', label: 'Interior Designer' },
  { value: 'Fashion Designer', label: 'Fashion Designer' },

  { value: 'Scientist', label: 'Scientist' },
  { value: 'Researcher', label: 'Researcher' },

  { value: 'Hotel Professional', label: 'Hotel Professional' },
  { value: 'Chef', label: 'Chef' },
  { value: 'Aviation Professional', label: 'Aviation Professional' },
  { value: 'Pilot', label: 'Pilot' },

  { value: 'Agriculturist', label: 'Agriculturist' },
  { value: 'Farmer', label: 'Farmer' },

  { value: 'Artist', label: 'Artist' },
  { value: 'Musician', label: 'Musician' },
  { value: 'Actor', label: 'Actor' },

  { value: 'Student', label: 'Student' },
  { value: 'Retired', label: 'Retired' },
  { value: 'Other', label: 'Other' },
];

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
  options?: SelectOption[];
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

export function FamilyDetails() {
  const { profile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    familyType: '',
    familyStatus: '',
    fatherOccupation: '',
    motherOccupation: '',
    brothers: '',
    sisters: '',
  });

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  const handleEdit = () => {
    setFormData({
      familyType: profile.familyType || '',
      familyStatus: profile.familyStatus || '',
      fatherOccupation: profile.fatherOccupation || '',
      motherOccupation: profile.motherOccupation || '',
      brothers: profile.brothers ? String(profile.brothers) : '',
      sisters: profile.sisters ? String(profile.sisters) : '',
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      familyType: '',
      familyStatus: '',
      fatherOccupation: '',
      motherOccupation: '',
      brothers: '',
      sisters: '',
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

  const handleSelectChange = (name: FamilyDetailKey, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatValue = (
    detail: FamilyDetail,
    value: string | number | null | undefined,
  ) => {
    if (value === null || value === undefined || value === '') {
      return '-';
    }

    if (detail.type === 'select') {
      return (
        detail.options?.find((option) => option.value === String(value))
          ?.label || value
      );
    }

    return value;
  };

  const handleSave = () => {
    const updatedFamilyDetails = {
      familyType: formData.familyType,
      familyStatus: formData.familyStatus,
      fatherOccupation: formData.fatherOccupation,
      motherOccupation: formData.motherOccupation,
      brothers: Number(formData.brothers),
      sisters: Number(formData.sisters),
    };

    console.log('Updated family details:', updatedFamilyDetails);

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
            <Home size={24} />
          </div>

          <div>
            <h2 className="font-bold text-[#172554] text-xl lg:text-2xl">
              Family Details
            </h2>

            <p className="mt-1 text-gray-500 text-sm">
              Keep your family information up to date
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
        {familyDetails.map((detail) => {
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
                    type="number"
                    name={detail.key}
                    value={value || ''}
                    min={0}
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
