import { useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { ChipCarousel } from '@/components/ui/ChipCarousel';
import { ProfileEditActions } from '../ProfileEditActions';
import { SectionCard } from '../SectionCard';
import { useProfile } from '@/features/profile';
import type { SelectOption } from '@/data/types';
import type { UpdateProfilePayload } from '../../types';
import { updateProfileApi } from '../../api';

const religionOptions: SelectOption[] = [
  { value: 'Hindu', label: 'Hindu' },
  { value: 'Muslim', label: 'Muslim' },
  { value: 'Buddhist', label: 'Buddhist' },
  { value: 'Christian', label: 'Christian' },
  { value: 'Jain', label: 'Jain' },
  { value: 'Sikh', label: 'Sikh' },
  { value: 'Parsi', label: 'Parsi' },
  { value: 'Jewish', label: 'Jewish' },
  { value: 'Other', label: 'Other' },
];

const communityOptions: SelectOption[] = [
  { value: 'Brahmin', label: 'Brahmin' },
  { value: 'Rajput', label: 'Rajput' },
  { value: 'Maratha', label: 'Maratha' },
  { value: 'Jat', label: 'Jat' },
  { value: 'Gujjar', label: 'Gujjar' },
  { value: 'Yadav', label: 'Yadav' },
  { value: 'Patel', label: 'Patel' },
  { value: 'Bania', label: 'Bania' },
  { value: 'Kayastha', label: 'Kayastha' },
  { value: 'Kshatriya', label: 'Kshatriya' },
  { value: 'Vaishya', label: 'Vaishya' },
  { value: 'Lingayat', label: 'Lingayat' },
  { value: 'Vokkaliga', label: 'Vokkaliga' },
  { value: 'Reddy', label: 'Reddy' },
  { value: 'Kamma', label: 'Kamma' },
  { value: 'Nair', label: 'Nair' },
  { value: 'Ezhava', label: 'Ezhava' },
  { value: 'Chettiar', label: 'Chettiar' },
  { value: 'Other', label: 'Other' },
];

const educationOptions: SelectOption[] = [
  { value: '10th', label: '10th' },
  { value: '12th', label: '12th' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'ITI', label: 'ITI' },
  { value: 'BA', label: 'BA' },
  { value: 'BSc', label: 'B.Sc' },
  { value: 'BCom', label: 'B.Com' },
  { value: 'BBA', label: 'BBA' },
  { value: 'BCA', label: 'BCA' },
  { value: 'BE', label: 'B.E.' },
  { value: 'BTech', label: 'B.Tech' },
  { value: 'MBBS', label: 'MBBS' },
  { value: 'BDS', label: 'BDS' },
  { value: 'LLB', label: 'LLB' },
  { value: 'BPharm', label: 'B.Pharm' },
  { value: 'BEd', label: 'B.Ed' },
  { value: 'BArch', label: 'B.Arch' },
  { value: 'BFA', label: 'BFA' },
  { value: 'MA', label: 'M.A.' },
  { value: 'MSc', label: 'M.Sc' },
  { value: 'MCom', label: 'M.Com' },
  { value: 'MBA', label: 'MBA' },
  { value: 'MCA', label: 'MCA' },
  { value: 'ME', label: 'M.E.' },
  { value: 'MTech', label: 'M.Tech' },
  { value: 'MD', label: 'MD' },
  { value: 'MS', label: 'MS' },
  { value: 'LLM', label: 'LLM' },
  { value: 'MPharm', label: 'M.Pharm' },
  { value: 'MEd', label: 'M.Ed' },
  { value: 'MArch', label: 'M.Arch' },
  { value: 'PhD', label: 'PhD' },
  { value: 'Other', label: 'Other' },
];

const occupationOptions: SelectOption[] = [
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

type PartnerPreferenceKey =
  'religion' | 'community' | 'education' | 'occupation';

interface PartnerPreferenceDetail {
  label: string;
  key: PartnerPreferenceKey;
  options: SelectOption[];
}

interface FormData {
  minAge: string;
  maxAge: string;
  religion: string[];
  community: string[];
  education: string[];
  occupation: string[];
}

const partnerPreferenceDetails: PartnerPreferenceDetail[] = [
  {
    label: 'Religion',
    key: 'religion',
    options: religionOptions,
  },
  {
    label: 'Community',
    key: 'community',
    options: communityOptions,
  },
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
];

const initialFormData: FormData = {
  minAge: '',
  maxAge: '',
  religion: [],
  community: [],
  education: [],
  occupation: [],
};

const parseAge = (value: string): number | null => {
  if (value.trim() === '') return null;

  const age = Number(value);
  return Number.isFinite(age) ? age : null;
};

export function PartnerPreferences() {
  const { profile, updateProfileData } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleEdit = () => {
    if (!profile) return;

    const preferences = profile.partnerPreference;

    setFormData({
      minAge: preferences?.minAge != null ? String(preferences.minAge) : '',
      maxAge: preferences?.maxAge != null ? String(preferences.maxAge) : '',
      religion: preferences?.religion ?? [],
      community: preferences?.community ?? [],
      education: preferences?.education ?? [],
      occupation: preferences?.occupation ?? [],
    });

    setSaveError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    setSaveError(null);
    setIsEditing(false);
  };

  const handleAgeChange = (field: 'minAge' | 'maxAge', value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (
    key: PartnerPreferenceKey,
    values: string[],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: values,
    }));
  };

  const handleSave = async () => {
    const minAge = parseAge(formData.minAge);
    const maxAge = parseAge(formData.maxAge);

    if (minAge !== null && (minAge < 18 || minAge > 100)) {
      setSaveError('Minimum age must be between 18 and 100.');
      return;
    }

    if (maxAge !== null && (maxAge < 18 || maxAge > 100)) {
      setSaveError('Maximum age must be between 18 and 100.');
      return;
    }

    if (minAge !== null && maxAge !== null && minAge > maxAge) {
      setSaveError('Minimum age cannot be greater than maximum age.');
      return;
    }

    const updatedProfile: UpdateProfilePayload = {
      partnerPreference: {
        minAge,
        maxAge,
        religion: formData.religion,
        community: formData.community,
        education: formData.education,
        occupation: formData.occupation,
      },
    };

    try {
      setIsSaving(true);
      setSaveError(null);

      const response = await updateProfileApi(updatedProfile);
      const savedPreferences = response.data?.partnerPreference;

      updateProfileData({
        partnerPreference: {
          minAge: savedPreferences?.minAge ?? minAge,
          maxAge: savedPreferences?.maxAge ?? maxAge,
          religion: savedPreferences?.religion ?? formData.religion,
          community: savedPreferences?.community ?? formData.community,
          education: savedPreferences?.education ?? formData.education,
          occupation: savedPreferences?.occupation ?? formData.occupation,
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
      <SectionCard title="Partner Preferences" icon={HeartHandshake}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  const preferences = profile.partnerPreference;

  return (
    <SectionCard
      title="Partner Preferences"
      icon={HeartHandshake}
      onEdit={handleEdit}
      isEditing={isEditing}
    >
      <div className="relative">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div
            className="
              px-5 py-5
              bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-2xl border border-gray-100
            "
          >
            <p className="font-medium text-gray-500 text-sm">Minimum Age</p>

            {isEditing ? (
              <input
                type="number"
                value={formData.minAge}
                min={18}
                max={100}
                onChange={(event) =>
                  handleAgeChange('minAge', event.target.value)
                }
                className="
                  w-full px-3 py-2.5 mt-3
                  bg-white rounded-lg border border-gray-200
                  font-medium text-[#172554] text-base
                  transition
                  focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                  outline-none
                "
              />
            ) : (
              <p className="mt-3 font-semibold text-[#172554] text-base">
                {preferences?.minAge ?? '-'}
                {preferences?.minAge != null && ' years'}
              </p>
            )}
          </div>

          <div
            className="
              px-5 py-5
              bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-2xl border border-gray-100
            "
          >
            <p className="font-medium text-gray-500 text-sm">Maximum Age</p>

            {isEditing ? (
              <input
                type="number"
                value={formData.maxAge}
                min={18}
                max={100}
                onChange={(event) =>
                  handleAgeChange('maxAge', event.target.value)
                }
                className="
                  w-full px-3 py-2.5 mt-3
                  bg-white rounded-lg border border-gray-200
                  font-medium text-[#172554] text-base
                  transition
                  focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                  outline-none
                "
              />
            ) : (
              <p className="mt-3 font-semibold text-[#172554] text-base">
                {preferences?.maxAge ?? '-'}
                {preferences?.maxAge != null && ' years'}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
          {partnerPreferenceDetails.map((detail) => {
            const values = isEditing
              ? formData[detail.key]
              : (preferences?.[detail.key] ?? []);

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
                <p className="mb-4 font-medium text-gray-500 text-sm">
                  {detail.label}
                </p>

                {isEditing ? (
                  <MultiSelect
                    value={values}
                    onChange={(selectedValues) =>
                      handleMultiSelectChange(detail.key, selectedValues)
                    }
                    options={detail.options}
                    placeholder={`Select ${detail.label}`}
                  />
                ) : (
                  <ChipCarousel
                    values={values.map((value) => {
                      const option = detail.options.find(
                        (item) => item.value === value,
                      );

                      return option?.label || value;
                    })}
                  />
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
