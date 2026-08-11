import { initialState } from './initialState';
import { type RegistrationState, type RegistrationAction } from './types';

export function registrationReducer(
  state: RegistrationState,
  action: RegistrationAction,
): RegistrationState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: state.currentStep + 1,
        direction: 1,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: state.currentStep - 1,
        direction: -1,
      };

    case 'UPDATE_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          ...action.payload,
        },
      };

    case 'UPDATE_DOB':
      return {
        ...state,
        formData: {
          ...state.formData,
          dob: {
            ...state.formData.dob,
            ...action.payload,
          },
        },
      };

    case 'SET_ERRORS':
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}
