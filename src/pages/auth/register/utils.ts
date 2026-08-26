type RegistrationStep = 1 | 2 | 3 | 4 | 5;

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

export const validators = {
  firstName: (value: string) => {
    if (!value.trim()) {
      return 'First name is required';
    }

    return '';
  },

  lastName: (value: string) => {
    if (!value.trim()) {
      return 'Last name is required';
    }

    return '';
  },

  day: (value: string) => {
    if (!value.trim()) {
      return 'Day is required';
    }

    if (Number(value) > 31) {
      return 'Day cannot be greater than 31';
    }

    return '';
  },

  month: (value: string) => {
    if (!value.trim()) {
      return 'Month is required';
    }

    if (Number(value) > 12) {
      return 'Month cannot be greater than 12';
    }

    return '';
  },

  year: (value: string) => {
    if (!value.trim()) {
      return 'Year is required';
    }

    const currentYear = new Date().getFullYear();
    const age = currentYear - Number(value);

    if (age < 21) {
      return 'The minimum registration age is 21 years';
    }

    if (age > 60) {
      return 'The maximum registration age is 60 years';
    }

    return '';
  },

  religion: (value: string) => {
    if (!value.trim()) {
      return 'Religion is required';
    }

    return '';
  },

  community: (value: string) => {
    if (!value.trim()) {
      return 'Community is required';
    }

    return '';
  },

  email: (value: string) => {
    if (!value.trim()) {
      return 'Email address is required';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }

    return '';
  },

  mobile: (value: string) => {
    if (!value.trim()) {
      return 'Mobile number is required';
    }

    if (!/^[6-9]\d{9}$/.test(value)) {
      return 'Please enter a valid 10-digit mobile number';
    }

    return '';
  },

  password: (value: string) => {
    if (!value.trim()) {
      return 'Password is required';
    }

    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }

    if (!/[A-Z]/.test(value)) {
      return 'Password must contain at least one uppercase letter';
    }

    if (!/[a-z]/.test(value)) {
      return 'Password must contain at least one lowercase letter';
    }

    if (!/\d/.test(value)) {
      return 'Password must contain at least one number';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'Password must contain at least one special character';
    }

    return '';
  },

  confirmPassword: (value: string, password: string) => {
    if (!value.trim()) {
      return 'Confirm password is required';
    }

    if (value !== password) {
      return 'Passwords do not match';
    }

    return '';
  },
};

export const stepValidators: Record<
  RegistrationStep,
  (FormData: RegistrationField) => boolean
> = {
  1: (formData) => {
    const requiresGender = ['self', 'relative', 'friend'].includes(
      formData.profileFor,
    );

    return Boolean(formData.profileFor && (!requiresGender || formData.gender));
  },

  2: (formData) => {
    return Boolean(
      !validators.firstName(formData.firstName) &&
      !validators.lastName(formData.lastName) &&
      !validators.day(formData.dob.day) &&
      !validators.month(formData.dob.month) &&
      !validators.year(formData.dob.year),
    );
  },

  3: (formData) => {
    return Boolean(
      !validators.religion(formData.religion) &&
      !validators.community(formData.community),
    );
  },

  4: (formData) => {
    return Boolean(
      !validators.email(formData.email) &&
      !validators.mobile(formData.mobile) &&
      !validators.password(formData.password) &&
      !validators.confirmPassword(formData.confirmPassword, formData.password),
    );
  },

  5: () => true,
};
