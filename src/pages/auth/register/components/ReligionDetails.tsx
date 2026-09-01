import { Landmark, UsersRound } from 'lucide-react';
import { FormDropdown } from '../../component/FormFields/FormDropdown';
import { religionOptions } from '../data';

import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export function ReligionDetails() {
  const { state } = useRegistration();
  const { handleBlur, handleChange } = useRegistrationValidation();

  const selectedReligion = religionOptions.find(
    (religion) => religion.value === state.formData.religion,
  );

  const communityOptions = selectedReligion?.communities ?? [];

  return (
    <>
      <h2 className="font-semibold text-white text-2xl">Religion Details</h2>

      <p className="mt-0.5 text-sm text-white/80">
        Share your religion and community details with us.
      </p>

      <FormDropdown
        id="religion"
        label="Religion"
        value={state.formData.religion}
        options={religionOptions}
        error={state.errors.religion}
        icon={Landmark}
        onChange={(value) => handleChange('religion', value)}
        onBlur={(value) => handleBlur('religion', value)}
        className="mt-8"
      />

      {selectedReligion && (
        <FormDropdown
          id="community"
          label="Community"
          value={state.formData.community}
          options={communityOptions}
          error={state.errors.community}
          icon={UsersRound}
          onChange={(value) => handleChange('community', value)}
          onBlur={(value) => handleBlur('community', value)}
          className="mt-8"
        />
      )}
    </>
  );
}
