import { type Dispatch } from 'react';
import { validators } from '@/features/registration/utils';

export interface RegistrationState {
  currentStep: number;
  direction: number;

  formData: {
    profileFor: string;
    gender: string;
    firstName: string;
    lastName: string;

    dob: {
      day: string;
      month: string;
      year: string;
    };

    religion: string;
    community: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
  };

  errors: Record<string, string>;
}

export type RegistrationAction =
  | {
      type: 'NEXT_STEP';
    }
  | {
      type: 'PREV_STEP';
    }
  | {
      type: 'UPDATE_FIELD';
      payload: Partial<RegistrationState['formData']>;
    }
  | {
      type: 'UPDATE_DOB';
      payload: Partial<RegistrationState['formData']['dob']>;
    }
  | {
      type: 'SET_ERRORS';
      payload: Record<string, string>;
    }
  | {
      type: 'RESET_FORM';
    };

export interface RegistrationContextValue {
  state: RegistrationState;
  dispatch: Dispatch<RegistrationAction>;
}

export type RegistrationFieldKey =
  | keyof RegistrationState['formData']
  | keyof RegistrationState['formData']['dob'];

export type ValidatableFieldKey = keyof typeof validators;
