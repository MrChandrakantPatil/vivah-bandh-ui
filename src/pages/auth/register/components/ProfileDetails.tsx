import { Check } from 'lucide-react';
import { useRegistration } from '@/context/registration/useRegistration';
import { profileOptions, gender } from '@/pages/auth/register/data';

type ProfileOptionValue =
  'self' | 'son' | 'daughter' | 'brother' | 'sister' | 'relative' | 'friend';
type GenderOptionValue = 'male' | 'female';

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
      <h2 className="font-semibold text-white text-2xl">Profile Details</h2>

      <p className="mt-0.5 text-sm text-white/80">
        Tell us who this profile is being created for.
      </p>

      <h3 className="mt-4 mb-3 font-semibold text-white text-lg">
        This Profile is for
      </h3>

      <div className="flex-wrap grid grid-cols-2 gap-2">
        {profileOptions.map((option, index) => {
          const isSelected = selectedProfileOption === option.value;

          return (
            <div
              key={index}
              onClick={() => handleProfileOptionChange(option.value)}
              className={`
                flex items-center
                py-2 pr-3 pl-4
                rounded-md border
                transition-all duration-200
                cursor-pointer
                ${
                  isSelected
                    ? `border-white/30 bg-white/20`
                    : `border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10`
                }
              `}
            >
              <div
                className={`
                  flex-1
                  font-medium text-sm
                  ${isSelected ? 'text-white' : 'text-white/90'}
                `}
              >
                {option.label}
              </div>

              {isSelected && (
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className="shrink-0 ml-2 text-white"
                />
              )}
            </div>
          );
        })}
      </div>

      {selectedOption?.gender === null && (
        <>
          <h3 className="mt-6 mb-3 font-semibold text-white text-lg">Gender</h3>

          <div className="grid grid-cols-3 gap-3 mt-2">
            {gender.map((gender, index) => {
              const isSelected = selectedGender === gender.value;

              return (
                <div
                  key={index}
                  onClick={() => handleGenderOptionChange(gender.value)}
                  className={`
                    flex items-center
                    py-2 pr-3 pl-4
                    rounded-md border
                    transition-all duration-200
                    cursor-pointer
                    ${
                      isSelected
                        ? `border-white/30 bg-white/20`
                        : `border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10`
                    }
                  `}
                >
                  <div
                    className={`
                      flex-1
                      text-sm
                      ${isSelected ? 'text-white' : 'text-white/90'}
                    `}
                  >
                    {gender.label}
                  </div>

                  {isSelected && (
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className="shrink-0 ml-2 text-white"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
