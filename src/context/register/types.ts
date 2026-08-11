import { type Dispatch } from 'react';
import { validators } from '@/features/registration/utils';

export interface RegisterState {
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

export type RegisterAction =
  | {
      type: 'NEXT_STEP';
    }
  | {
      type: 'PREV_STEP';
    }
  | {
      type: 'UPDATE_FIELD';
      payload: Partial<RegisterState['formData']>;
    }
  | {
      type: 'UPDATE_DOB';
      payload: Partial<RegisterState['formData']['dob']>;
    }
  | {
      type: 'SET_ERRORS';
      payload: Record<string, string>;
    }
  | {
      type: 'RESET_FORM';
    };

export interface RegisterContextValue {
  state: RegisterState;
  dispatch: Dispatch<RegisterAction>;
}

export type RegisterFieldKey =
  keyof RegisterState['formData'] | keyof RegisterState['formData']['dob'];

export type ValidatableFieldKey = keyof typeof validators;
