import {
  registerInitialState,
  type RegisterStateTypes,
} from './registerInitialState';

export type RegisterActionTypes =
  | {
      type: 'NEXT_STEP';
    }
  | {
      type: 'PREV_STEP';
    }
  | {
      type: 'UPDATE_FORM';
      payload: Partial<RegisterStateTypes['formData']>;
    }
  | {
      type: 'UPDATE_DOB';
      payload: Partial<RegisterStateTypes['formData']['dob']>;
    }
  | {
      type: 'SET_ERRORS';
      payload: Record<string, string>;
    }
  | {
      type: 'RESET_FORM';
    };

export function registerReducer(
  state: RegisterStateTypes,
  action: RegisterActionTypes,
) {
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

    case 'UPDATE_FORM':
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
      return registerInitialState;

    default:
      return state;
  }
}
