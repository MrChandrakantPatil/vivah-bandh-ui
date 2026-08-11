import { type RegisterState } from './types';

export const initialState: RegisterState = {
  currentStep: 1,
  direction: 1,
  formData: {
    profileFor: '',
    gender: '',
    firstName: '',
    lastName: '',
    dob: {
      day: '',
      month: '',
      year: '',
    },
    religion: '',
    community: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  },
  errors: {},
};
