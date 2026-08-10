export interface RegisterStateTypes {
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

export const registerInitialState: RegisterStateTypes = {
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
