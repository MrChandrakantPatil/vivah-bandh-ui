import { Mail, Phone, Lock } from 'lucide-react';
import { FormInput } from './FormFields/FormInput';
import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export type AccountDetailsProps = {
  emailInputRef: React.RefObject<HTMLInputElement | null>;
  mobileInputRef: React.RefObject<HTMLInputElement | null>;
};

export function AccountDetails({
  emailInputRef,
  mobileInputRef,
}: AccountDetailsProps) {
  const { state, dispatch } = useRegistration();
  const { handleBlur, handleChange } = useRegistrationValidation();

  function handleEmailChange(value: string) {
    dispatch({
      type: 'CLEAR_ERROR',
      payload: 'email',
    });

    handleChange('email', value);
  }

  function handleMobileChange(value: string) {
    dispatch({
      type: 'CLEAR_ERROR',
      payload: 'mobile',
    });

    handleChange('mobile', value.replace(/\D/g, ''));
  }

  return (
    <>
      <h2 className="font-semibold text-white text-2xl">Account Details</h2>

      <p className="mt-0.5 text-sm text-white/80">
        Set up your account details securely and safely.
      </p>

      <FormInput
        ref={emailInputRef}
        id="email"
        label="Email"
        value={state.formData.email}
        error={state.errors.email}
        icon={Mail}
        onChange={(value: string) => handleEmailChange(value)}
        onBlur={(value: string) => handleBlur('email', value)}
        className="mt-6"
      />

      <FormInput
        ref={mobileInputRef}
        id="mobile"
        label="Mobile"
        value={state.formData.mobile}
        error={state.errors.mobile}
        icon={Phone}
        onChange={(value: string) => handleMobileChange(value)}
        onBlur={(value: string) => handleBlur('mobile', value)}
        className="mt-6"
      />

      <FormInput
        id="password"
        label="Password"
        value={state.formData.password}
        error={state.errors.password}
        icon={Lock}
        isPassword
        onChange={(value: string) => handleChange('password', value)}
        onBlur={(value: string) => handleBlur('password', value)}
        className="mt-6"
      />

      <FormInput
        id="confirmPassword"
        label="Confirm Password"
        value={state.formData.confirmPassword}
        error={state.errors.confirmPassword}
        icon={Lock}
        isPassword
        onChange={(value: string) => handleChange('confirmPassword', value)}
        onBlur={(value: string) =>
          handleBlur('confirmPassword', value, state.formData.password)
        }
        className="mt-6"
      />
    </>
  );
}
