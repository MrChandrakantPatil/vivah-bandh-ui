import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export function AccountDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { state } = useRegistration();
  const { handleBlur, handleFocus, handleChange } = useRegistrationValidation();

  return (
    <>
      <h2 className="font-semibold text-gray-800 text-2xl">Account Details</h2>

      <div className="relative mt-4">
        <input
          id="email"
          type="text"
          placeholder=" "
          value={state.formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={(e) => handleBlur('email', e.target.value)}
          onFocus={() => handleFocus('email')}
          className={`
            w-full py-3 pr-10 pl-4
            rounded-md
            outline-none peer
            ${
              state.errors.email
                ? 'border border-red-500'
                : 'border border-gray-300 focus:border-pink-500'
            }
          `}
        />

        <label
          htmlFor="email"
          className="
            absolute top-3 left-4 peer-not-placeholder-shown:left-3
            peer-not-placeholder-shown:px-1
            peer-not-placeholder-shown:bg-white
            text-gray-500 peer-not-placeholder-shown:text-xs
            transition-all duration-200
            peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-pink-500 peer-focus:text-xs peer-focus:-top-2
            peer-not-placeholder-shown:-top-2
          "
        >
          Email
        </label>

        {state.errors.email && (
          <p className="mt-1 ml-1 text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="relative mt-6">
        <input
          id="mobileNumber"
          type="text"
          placeholder=" "
          value={state.formData.mobile}
          onChange={(e) =>
            handleChange('mobile', e.target.value.replace(/\D/g, ''))
          }
          onBlur={(e) => handleBlur('mobile', e.target.value)}
          onFocus={() => handleFocus('mobile')}
          className={`
            w-full py-3 pr-10 pl-4
            rounded-md
            outline-none peer
            ${
              state.errors.mobile
                ? 'border border-red-500'
                : 'border border-gray-300 focus:border-pink-500'
            }
          `}
        />

        <label
          htmlFor="mobileNumber"
          className="
            absolute top-3 left-4 peer-not-placeholder-shown:left-3
            peer-not-placeholder-shown:px-1
            peer-not-placeholder-shown:bg-white
            text-gray-500 peer-not-placeholder-shown:text-xs
            transition-all duration-200
            peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-pink-500 peer-focus:text-xs peer-focus:-top-2
            peer-not-placeholder-shown:-top-2
          "
        >
          Mobile Number
        </label>

        {state.errors.mobile && (
          <p className="mt-1 ml-1 text-red-500 text-sm">
            {state.errors.mobile}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder=" "
            value={state.formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={(e) => handleBlur('password', e.target.value)}
            onFocus={() => handleFocus('password')}
            className={`
              w-full py-3 pr-10 pl-4
              rounded-md
              outline-none peer
              ${
                state.errors.password
                  ? 'border border-red-500'
                  : 'border border-gray-300 focus:border-pink-500'
              }
            `}
          />

          <button
            className="absolute top-1/2 right-3 text-gray-500 cursor-pointer -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {!showPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>

          <label
            htmlFor="password"
            className="
              absolute top-3 left-4 peer-not-placeholder-shown:left-3
              peer-not-placeholder-shown:px-1
              peer-not-placeholder-shown:bg-white
              text-gray-500 peer-not-placeholder-shown:text-xs
              transition-all duration-200
              peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-pink-500 peer-focus:text-xs peer-focus:-top-2
              peer-not-placeholder-shown:-top-2
            "
          >
            Password
          </label>
        </div>

        {state.errors.password && (
          <p className="mt-1 ml-1 text-red-500 text-sm">
            {state.errors.password}
          </p>
        )}
      </div>

      <div className="mt-6">
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder=" "
            value={state.formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onBlur={(e) =>
              handleBlur(
                'confirmPassword',
                e.target.value,
                state.formData.password,
              )
            }
            onFocus={() => handleFocus('confirmPassword')}
            className={`
              w-full px-4 py-3 pr-12
              rounded-md
              outline-none peer
              ${
                state.errors.confirmPassword
                  ? 'border border-red-500'
                  : 'border border-gray-300 focus:border-pink-500'
              }
            `}
          />

          <button
            className="absolute top-1/2 right-3 text-gray-500 cursor-pointer -translate-y-1/2"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {!showConfirmPassword ? (
              <Eye className="w-5 h-5" />
            ) : (
              <EyeOff className="w-5 h-5" />
            )}
          </button>

          <label
            htmlFor="confirmPassword"
            className="
              absolute top-3 left-4 peer-not-placeholder-shown:left-3
              peer-not-placeholder-shown:px-1
              peer-not-placeholder-shown:bg-white
              text-gray-500 peer-not-placeholder-shown:text-xs
              transition-all duration-200
              peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-pink-500 peer-focus:text-xs peer-focus:-top-2
              peer-not-placeholder-shown:-top-2
            "
          >
            Confirm Password
          </label>
        </div>

        {state.errors.confirmPassword && (
          <p className="mt-1 ml-1 text-red-500 text-sm">
            {state.errors.confirmPassword}
          </p>
        )}
      </div>
    </>
  );
}
