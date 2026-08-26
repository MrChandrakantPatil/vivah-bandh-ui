import { type Dispatch } from 'react';

type RegistrationField = {
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

type RegistrationErrors = {
  firstName: string;
  lastName: string;
  day: string;
  month: string;
  year: string;
  religion: string;
  community: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

export interface RegistrationState {
  currentStep: number;
  direction: number;
  formData: RegistrationField;
  errors: RegistrationErrors;
}

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

export type RegistrationErrorKey = Extract<
  RegistrationFieldKey,
  keyof RegistrationState['errors']
>;

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
      payload: Partial<RegistrationState['errors']>;
    }
  | {
      type: 'CLEAR_ERROR';
      payload: RegistrationErrorKey;
    }
  | {
      type: 'RESET_FORM';
    };

export interface RegistrationContextValue {
  state: RegistrationState;
  dispatch: Dispatch<RegistrationAction>;
}
