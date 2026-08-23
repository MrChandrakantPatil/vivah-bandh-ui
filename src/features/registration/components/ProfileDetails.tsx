import { Check } from 'lucide-react';
import { useRegistration } from '@/context/registration/useRegistration';
import { profileOptions, gender } from '../data';
import type { ProfileOptionValue, GenderOptionValue } from '../types';

export function ProfileDetails() {
  const { state, dispatch } = useRegistration();

  const selectedProfileOption = state.formData.profileFor;
  const selectedGender = state.formData.gender;
  const selectedOption = profileOptions.find(
    (option) => option.value === selectedProfileOption,
  );

  function handleProfileOptionChange(value: ProfileOptionValue) {
    const selectedOption = profileOptions.find(
      (option) => option.value === value,
    );

    if (!selectedOption) return;

    dispatch({
      type: 'UPDATE_FIELD',
      payload: { profileFor: value, gender: selectedOption.gender ?? '' },
    });
  }

  function handleGenderOptionChange(value: GenderOptionValue) {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { gender: value },
    });
  }

  return (
    <>
      <h2 className="font-semibold text-gray-800 text-2xl">
        This Profile is for
      </h2>

      <div className="flex flex-wrap gap-4 mt-4">
        {profileOptions.map((option, index) => (
          <div
            key={index}
            className="
              flex items-center
              py-1.5 pr-1.5 pl-4
              rounded-full border border-gray-300
            "
            onClick={() => handleProfileOptionChange(option.value)}
          >
            <div className="flex-1 text-gray-700 text-md">{option.label}</div>
            <div
              className={`
                flex items-center justify-center
                w-6 h-6 ml-4
                rounded-full border
                ${
                  selectedProfileOption === option.value
                    ? 'bg-[rgb(var(--color-primary-500))] border-[rgb(var(--color-primary-500))]'
                    : 'bg-gray-100 border-gray-200'
                }
              `}
            >
              {selectedProfileOption === option.value && (
                <Check size={16} className="text-white" />
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedOption?.gender === null && (
        <>
          <h2 className="mt-8 font-semibold text-gray-800 text-2xl">Gender</h2>

          <div className="flex flex-wrap gap-4 mt-4">
            {gender.map((gender, index) => (
              <div
                key={index}
                className="
                  flex items-center
                  py-1.5 pr-1.5 pl-4
                  rounded-full border border-gray-300
                "
                onClick={() => handleGenderOptionChange(gender.value)}
              >
                <div className="flex-1 text-gray-700 text-md">
                  {gender.label}
                </div>

                <div
                  className={`
                    flex items-center justify-center
                    w-6 h-6 ml-4
                    rounded-full border
                    ${
                      selectedGender === gender.value
                        ? 'bg-[rgb(var(--color-primary-500))] border-[rgb(var(--color-primary-500))]'
                        : 'bg-gray-100 border-gray-200'
                    }
                  `}
                >
                  {selectedGender === gender.value && (
                    <Check size={16} className="text-white" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
