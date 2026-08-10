import { Check } from 'lucide-react';
import { useRegister } from '@/hooks/useRegister';
import { profileOptions } from '../data/profileOptions';
import { gender } from '../data/gender';

type ProfileOptionValueType = (typeof profileOptions)[number]['value'];
type GenderOptionValueType = (typeof gender)[number]['value'];

export function ProfileDetails() {
  const { state, dispatch } = useRegister();

  const selectedProfileOption = state.formData.profileFor;
  const selectedGender = state.formData.gender;
  const selectedOption = profileOptions.find(
    (option) => option.value === selectedProfileOption,
  );

  function handleProfileOptionChange(value: ProfileOptionValueType) {
    const selectedOption = profileOptions.find(
      (option) => option.value === value,
    );

    if (!selectedOption) return;

    dispatch({
      type: 'UPDATE_FORM',
      payload: { profileFor: value, gender: selectedOption.gender ?? '' },
    });
  }

  function handleGenderOptionChange(value: GenderOptionValueType) {
    dispatch({
      type: 'UPDATE_FORM',
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
            className="flex items-center pl-4 py-1.5 pr-1.5 border border-gray-300 rounded-full"
            onClick={() => handleProfileOptionChange(option.value)}
          >
            <div className="flex-1 text-gray-700 text-md">{option.label}</div>
            <div
              className={`
                flex items-center justify-center w-6 h-6 ml-4 rounded-full border
                ${selectedProfileOption === option.value ? 'bg-pink-500 border-pink-500' : 'bg-gray-100 border-gray-200'}
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
                className="flex items-center pl-4 py-1.5 pr-1.5 border border-gray-300 rounded-full"
                onClick={() => handleGenderOptionChange(gender.value)}
              >
                <div className="flex-1 text-gray-700 text-md">
                  {gender.label}
                </div>

                <div
                  className={`
                  flex items-center justify-center w-6 h-6 ml-4 rounded-full border
                  ${selectedGender === gender.value ? 'bg-pink-500 border-pink-500' : 'bg-gray-100 border-gray-200'}
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
