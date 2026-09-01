import { UserRound, CalendarDays } from 'lucide-react';
import { FormInput } from '../../component/FormFields/FormInput';
import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export function BasicDetails() {
  const { state } = useRegistration();
  const { handleBlur, handleChange } = useRegistrationValidation();

  const dobError = state.errors.day || state.errors.month || state.errors.year;

  return (
    <>
      <h2 className="font-semibold text-white text-2xl">Basic Details</h2>

      <p className="mt-0.5 text-sm text-white/75">
        Tell us about yourself and your basic details.
      </p>

      <div className="mt-4">
        <label className="block font-semibold text-white text-md">
          Your Name
        </label>

        <div className="grid grid-cols-2 gap-6 mt-2.5">
          <FormInput
            id="firstName"
            label="First Name"
            value={state.formData.firstName}
            error={state.errors.firstName}
            icon={UserRound}
            floatingLabel
            onChange={(value: string) =>
              handleChange('firstName', value.replace(/[^a-zA-Z\s]/g, ''))
            }
            onBlur={(value: string) => handleBlur('firstName', value)}
          />

          <FormInput
            id="lastName"
            label="Last Name"
            value={state.formData.lastName}
            error={state.errors.lastName}
            icon={UserRound}
            floatingLabel
            onChange={(value: string) =>
              handleChange('lastName', value.replace(/[^a-zA-Z\s]/g, ''))
            }
            onBlur={(value: string) => handleBlur('lastName', value)}
          />
        </div>
      </div>

      <div className="relative mt-4">
        <label className="block font-semibold text-white text-md">
          Date of Birth
        </label>

        <div className="grid grid-cols-3 gap-6 mt-2.5">
          <FormInput
            id="day"
            label="Day"
            value={state.formData.dob.day}
            placeholder="DD"
            error={state.errors.day}
            icon={CalendarDays}
            floatingLabel
            alwaysFloatingLabel
            showError={false}
            onChange={(value: string) =>
              handleChange('day', value.replace(/\D/g, ''))
            }
            onBlur={(value: string) => handleBlur('day', value)}
          />

          <FormInput
            id="month"
            label="Month"
            value={state.formData.dob.month}
            placeholder="MM"
            error={state.errors.month}
            icon={CalendarDays}
            floatingLabel
            alwaysFloatingLabel
            showError={false}
            onChange={(value: string) =>
              handleChange('month', value.replace(/\D/g, ''))
            }
            onBlur={(value: string) => handleBlur('month', value)}
          />

          <FormInput
            id="year"
            label="Year"
            value={state.formData.dob.year}
            placeholder="YYYY"
            error={state.errors.year}
            icon={CalendarDays}
            floatingLabel
            alwaysFloatingLabel
            showError={false}
            onChange={(value: string) =>
              handleChange('year', value.replace(/\D/g, ''))
            }
            onBlur={(value: string) => handleBlur('year', value)}
          />
        </div>

        {dobError && (
          <p className="z-20 mt-1 whitespace-nowrap text-[#FF8A00] text-sm">
            {dobError}
          </p>
        )}
      </div>
    </>
  );
}
