import { useRegistration } from '@/context/registration';
import { validators } from '../utils';

export type RegistrationFieldKey =
  | 'profileFor'
  | 'gender'
  | 'firstName'
  | 'lastName'
  | 'religion'
  | 'community'
  | 'email'
  | 'mobile'
  | 'password'
  | 'confirmPassword'
  | 'day'
  | 'month'
  | 'year';

export type ValidatableFieldKey =
  | 'firstName'
  | 'lastName'
  | 'day'
  | 'month'
  | 'year'
  | 'religion'
  | 'community'
  | 'email'
  | 'mobile'
  | 'password'
  | 'confirmPassword';

export function useRegistrationValidation() {
  const { dispatch } = useRegistration();

  const handleChange = (field: RegistrationFieldKey, value: string) => {
    if (field === 'day' || field === 'month' || field === 'year') {
      dispatch({
        type: 'UPDATE_DOB',
        payload: { [field]: value },
      });
    } else {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: { [field]: value },
      });
    }

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
