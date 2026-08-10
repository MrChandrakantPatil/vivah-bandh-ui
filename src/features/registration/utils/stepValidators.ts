import { validators } from './fieldsValidators';
import type { RegisterStateTypes } from '@/reducers/registerInitialState';

type FormField = RegisterStateTypes['formData'];

export type RegistrationStepType = 1 | 2 | 3 | 4 | 5;

export const stepValidators: Record<
  RegistrationStepType,
  (FormData: FormField) => boolean
> = {
  1: (formData) => {
    const requiresGender = ['myself', 'relative', 'friend'].includes(
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
