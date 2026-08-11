import { useRegister } from '@/context/register';
import { validators } from '../utils';
import type { RegisterFieldKey, ValidatableFieldKey } from '@/context/register';

export function useRegisterValidation() {
  const { dispatch } = useRegister();

  const handleChange = (field: RegisterFieldKey, value: string) => {
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
