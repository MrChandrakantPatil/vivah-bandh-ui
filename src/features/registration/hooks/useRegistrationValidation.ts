import { useRegistration } from '@/context/registration';
import { validators } from '../utils';
import type { RegistrationFieldKey, ValidatableFieldKey } from '@/context/registration';

export function useRegistrationValidation() {
  const { dispatch } = useRegistration();

  const handleChange = (field: RegistrationFieldKey, value: string) => {
    dispatch({
      type: 'UPDATE_FIELD',
      payload: { [field]: value },
    });

    if (value.trim()) {
      dispatch({
        type: 'SET_ERRORS',
        payload: { [field]: '' },
      });
    }
  };

  const handleBlur = (
    field: ValidatableFieldKey,
    value: string,
    compareValue?: string,
  ) => {
    dispatch({
      type: 'SET_ERRORS',
      payload: {
        [field]:
          field === 'confirmPassword'
            ? validators.confirmPassword(value, compareValue ?? '')
            : validators[field](value),
      },
    });
  };

  const handleFocus = (field: ValidatableFieldKey) => {
    dispatch({
      type: 'SET_ERRORS',
      payload: { [field]: '' },
    });
  };

  return {
    handleChange,
    handleBlur,
    handleFocus,
  };
}
