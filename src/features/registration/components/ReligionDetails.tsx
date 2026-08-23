import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export function ReligionDetails() {
  const { state } = useRegistration();
  const { handleBlur, handleFocus, handleChange } = useRegistrationValidation();

  return (
    <>
      <h2 className="font-semibold text-gray-800 text-2xl">Religion Details</h2>

      <div className="relative mt-4">
        <input
          id="religion"
          type="text"
          placeholder=" "
          value={state.formData.religion}
          onChange={(e) =>
            handleChange('religion', e.target.value.replace(/[^a-zA-Z\s]/g, ''))
          }
          onBlur={(e) => handleBlur('religion', e.target.value)}
          onFocus={() => handleFocus('religion')}
          className={`
            w-full px-4 py-3 pr-12
            rounded-md
            outline-none peer
            ${
              state.errors.religion
                ? 'border border-red-500'
                : 'border border-gray-300 focus:border-pink-500'
            }
          `}
        />

        <label
          htmlFor="religion"
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
          Religion
        </label>

        {state.errors.religion && (
          <p className="mt-1 ml-1 text-red-500 text-sm">
            {state.errors.religion}
          </p>
        )}
      </div>

      <div className="relative mt-6">
        <input
          id="community"
          type="text"
          placeholder=" "
          value={state.formData.community}
          onChange={(e) =>
            handleChange(
              'community',
              e.target.value.replace(/[^a-zA-Z\s]/g, ''),
            )
          }
          onBlur={(e) => handleBlur('community', e.target.value)}
          onFocus={() => handleFocus('community')}
          className={`
            w-full px-4 py-3 pr-12
            rounded-md
            outline-none peer
            ${
              state.errors.community
                ? 'border border-red-500'
                : 'border border-gray-300 focus:border-pink-500'
            }
          `}
        />

        <label
          htmlFor="community"
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
          Community
        </label>

        {state.errors.community && (
          <p className="mt-1 ml-1 text-red-500 text-sm">
            {state.errors.community}
          </p>
        )}
      </div>
    </>
  );
}
