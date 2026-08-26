import { initialState } from './initialState';
import type { RegistrationState, RegistrationAction } from './types';

const TOTAL_STEPS = 5;

export function registrationReducer(
  state: RegistrationState,
  action: RegistrationAction,
): RegistrationState {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(
          state.currentStep + 1,
          TOTAL_STEPS,
        ) as RegistrationState['currentStep'],
        direction: 1,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(
          state.currentStep - 1,
          1,
        ) as RegistrationState['currentStep'],
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

    case 'CLEAR_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload]: '',
        },
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}
