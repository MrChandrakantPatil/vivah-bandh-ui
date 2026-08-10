import { useContext } from 'react';
import RegisterContext from '../context/RegisterContext';
import { validators } from '../features/registration/utils/fieldsValidators';
import type { RegisterStateTypes } from '@/reducers/registerInitialState';

type FormField =
  | keyof RegisterStateTypes['formData']
  | keyof RegisterStateTypes['formData']['dob'];

type ValidatedField = keyof typeof validators;

export function useRegister() {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error('useRegister must be used inside RegisterProvider');
  }

  const { state, dispatch } = context;

  const handleChange = (field: FormField, value: string) => {
    dispatch({
      type: 'UPDATE_FORM',
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
    field: ValidatedField,
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

  const handleFocus = (field: ValidatedField) => {
    dispatch({
      type: 'SET_ERRORS',
      payload: { [field]: '' },
    });
  };

  return {
    state,
    dispatch,
    handleBlur,
    handleFocus,
    handleChange,
  };
}
