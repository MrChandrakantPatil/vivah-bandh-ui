import { useEffect, useRef, useState } from 'react';
import { HeartHandshake } from 'lucide-react';
import {
  religionOptions,
  communityOptions,
  educationOptions,
  occupationOptions,
} from '@/data';
import { MultiSelectOption, MoreModal } from '@/components';
import { getOptionLabel } from '@/utils';
import { ProfileEditActions } from '../ProfileEditActions';
import { SectionCard } from '../SectionCard';
import { useProfile } from '@/features/profile';
import { updateProfileApi } from '../../api';
import type { MoreModalData } from '@/components/MoreModal';
import type { SelectOptionType } from '@/types/common.types';
import type { UpdateProfilePayload } from '../../types';

type PartnerPreferenceKey =
  'religion' | 'community' | 'education' | 'occupation';

interface PartnerPreferenceDetail {
  label: string;
  key: PartnerPreferenceKey;
  options: SelectOptionType[];
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

  const [selectedPreference, setSelectedPreference] =
    useState<MoreModalData | null>(null);

  const [showMore, setShowMore] = useState<Record<string, boolean>>({});

  const valueRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const preferences = profile?.partnerPreference;
  const hasProfile = Boolean(profile);

  const preferenceValuesKey = JSON.stringify(
    partnerPreferenceDetails.map(({ key }) => [key, preferences?.[key] ?? []]),
  );

  const handleEdit = () => {
    if (!profile) return;

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
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleMultiSelectChange = (
    key: PartnerPreferenceKey,
    values: string[],
  ) => {
    setFormData((previous) => ({
      ...previous,
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

  useEffect(() => {
    if (isEditing || !hasProfile) return;

    const checkOverflow = () => {
      const isMobile = window.matchMedia('(max-width: 639px)').matches;

      const overflow: Record<string, boolean> = {};

      Object.entries(valueRefs.current).forEach(([key, element]) => {
        if (!element) return;

        overflow[key] = isMobile
          ? element.scrollHeight > element.clientHeight + 1
          : element.scrollWidth > element.clientWidth + 1;
      });

      setShowMore((previous) => {
        const previousKeys = Object.keys(previous);
        const nextKeys = Object.keys(overflow);

        const hasChanged =
          previousKeys.length !== nextKeys.length ||
          nextKeys.some((key) => previous[key] !== overflow[key]);

        return hasChanged ? overflow : previous;
      });
    };

    const observer = new ResizeObserver(checkOverflow);

    Object.values(valueRefs.current).forEach((element) => {
      if (element) {
        observer.observe(element);
      }
    });

    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkOverflow);
    };
  }, [isEditing, hasProfile, preferenceValuesKey]);

  if (!profile) {
    return (
      <SectionCard title="Partner Preferences" icon={HeartHandshake}>
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </SectionCard>
    );
  }

  return (
    <>
      <SectionCard
        title="Partner Preferences"
        icon={HeartHandshake}
        onEdit={handleEdit}
        isEditing={isEditing}
      >
        <div className="relative">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                label: 'Minimum Age',
                key: 'minAge' as const,
                value: preferences?.minAge,
              },
              {
                label: 'Maximum Age',
                key: 'maxAge' as const,
                value: preferences?.maxAge,
              },
            ].map((item) => (
              <div
                key={item.key}
                className="
                  px-5 py-5
                  bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)] rounded-2xl border border-gray-100
                "
              >
                <p className="font-medium text-gray-500 text-sm">
                  {item.label}
                </p>

                {isEditing ? (
                  <input
                    type="number"
                    value={formData[item.key]}
                    min={18}
                    max={100}
                    onChange={(event) =>
                      handleAgeChange(item.key, event.target.value)
                    }
                    className="
                      w-full px-3 py-2.5 mt-3
                      bg-white rounded-lg border border-gray-200
                      font-semibold text-[#172554] text-base
                      transition
                      focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                      outline-none
                    "
                  />
                ) : (
                  <p className="mt-3 font-semibold text-[#172554] text-base">
                    {item.value != null ? `${item.value} years` : '--'}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2">
            {partnerPreferenceDetails.map((detail) => {
              const values = isEditing
                ? formData[detail.key]
                : (preferences?.[detail.key] ?? []);

              const displayValues = values.map(
                (value) => getOptionLabel(value, detail.options) ?? value,
              );

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
                    <MultiSelectOption
                      value={values}
                      onChange={(selectedValues) =>
                        handleMultiSelectChange(detail.key, selectedValues)
                      }
                      options={detail.options}
                      placeholder={`Select ${detail.label}`}
                    />
                  ) : (
                    <div className="min-w-0">
                      <div
                        className="
                          flex flex-col items-start gap-1
                          min-w-0
                          sm:flex-row sm:items-center sm:gap-2
                        "
                      >
                        <p
                          ref={(element) => {
                            valueRefs.current[detail.key] = element;
                          }}
                          className="
                            max-w-full min-w-0
                            font-semibold text-[#172554] text-base
                            overflow-hidden
                            sm:block sm:flex-1 sm:whitespace-nowrap sm:break-normal sm:text-ellipsis
                            wrap-break-words [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]
                          "
                        >
                          {displayValues.length > 0
                            ? displayValues.join(', ')
                            : '--'}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedPreference({
                              title: detail.label,
                              values: displayValues,
                            })
                          }
                          className={`
                            shrink-0
                            whitespace-nowrap font-semibold text-pink-600 text-xs
                            hover:text-pink-700
                            ${
                              showMore[detail.key]
                                ? 'inline-flex'
                                : 'hidden sm:invisible sm:inline-flex'
                            }
                          `}
                        >
                          More
                        </button>
                      </div>
                    </div>
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

      <MoreModal
        isOpen={Boolean(selectedPreference)}
        data={selectedPreference}
        onClose={() => setSelectedPreference(null)}
      />
    </>
  );
}
