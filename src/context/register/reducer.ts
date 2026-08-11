import { initialState } from './initialState';
import { type RegisterState, type RegisterAction } from './types';

export function registerReducer(
  state: RegisterState,
  action: RegisterAction,
): RegisterState {
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
