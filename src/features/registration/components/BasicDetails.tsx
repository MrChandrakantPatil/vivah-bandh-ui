import { useRegistration } from '@/context/registration/useRegistration';
import { useRegistrationValidation } from '../hooks/useRegistrationValidation';

export function BasicDetails() {
  const { state, dispatch } = useRegistration();
  const { handleBlur, handleFocus, handleChange } = useRegistrationValidation();

  const dobError = state.errors.day || state.errors.month || state.errors.year;

  return (
    <>
      <h2 className="font-semibold text-gray-800 text-2xl">Basic Details</h2>

      <div className="mt-4">
        <label className="block font-semibold text-slate-800 text-m">
          Your Name
        </label>

        <div className="grid grid-cols-2 gap-6 mt-3">
          <div className="relative">
            <input
              id="firstName"
              type="text"
              placeholder=" "
              value={state.formData.firstName}
              onChange={(e) =>
                handleChange(
                  'firstName',
                  e.target.value.replace(/[^a-zA-Z\s]/g, ''),
                )
              }
              onBlur={(e) => handleBlur('firstName', e.target.value)}
              onFocus={() => handleFocus('firstName')}
              className={`
                w-full px-4 py-3
                rounded-md border
                outline-none peer
                ${
                  state.errors.firstName
                    ? 'border-[rgb(var(--color-primary-500))]'
                    : 'border-gray-300 focus:border-gray-700'
                }
              `}
            />

            <label
              htmlFor="firstName"
              className="
                absolute top-3 left-4 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:px-1
                peer-not-placeholder-shown:bg-white
                text-gray-500 peer-not-placeholder-shown:text-xs
                transition-all duration-200
                peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-gray-700 peer-focus:text-xs peer-focus:-top-2
              "
            >
              First Name
            </label>

            {state.errors.firstName && (
              <p className="mt-1 ml-1 text-[rgb(var(--color-primary-500))] text-sm">
                {state.errors.firstName}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              id="lastName"
              type="text"
              placeholder=" "
              value={state.formData.lastName}
              onChange={(e) =>
                handleChange(
                  'lastName',
                  e.target.value.replace(/[^a-zA-Z\s]/g, ''),
                )
              }
              onBlur={(e) => handleBlur('lastName', e.target.value)}
              onFocus={() => handleFocus('lastName')}
              className={`
                w-full px-4 py-3
                rounded-md border
                outline-none peer
                ${
                  state.errors.lastName
                    ? 'border-[rgb(var(--color-primary-500))]'
                    : 'border-gray-300 focus:border-gray-700'
                }
              `}
            />

            <label
              htmlFor="lastName"
              className="
                absolute top-3 left-4 peer-not-placeholder-shown:left-3 peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:px-1
                peer-not-placeholder-shown:bg-white
                text-gray-500 peer-not-placeholder-shown:text-xs
                transition-all duration-200
                peer-focus:left-3 peer-focus:px-1 peer-focus:bg-white peer-focus:text-gray-700 peer-focus:text-xs peer-focus:-top-2
              "
            >
              Last Name
            </label>

            {state.errors.lastName && (
              <p className="mt-1 ml-1 text-[rgb(var(--color-primary-500))] text-sm">
                {state.errors.lastName}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <label className="block font-semibold text-slate-800 text-m">
          Date of Birth
        </label>

        <div className="grid grid-cols-3 gap-6 mt-3">
          <div className="relative">
            <input
              id="day"
              type="text"
              placeholder="DD"
              value={state.formData.dob.day}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DOB',
                  payload: { day: e.target.value.replace(/\D/g, '') },
                })
              }
              onBlur={(e) => handleBlur('day', e.target.value)}
              onFocus={() => handleFocus('day')}
              className={`
                w-full px-4 py-3
                rounded-md border
                outline-none peer
                ${
                  state.errors.day
                    ? 'border-[rgb(var(--color-primary-500))]'
                    : 'border-gray-300 focus:border-gray-700'
                }
              `}
            />

            <label
              htmlFor="day"
              className="
                absolute left-3 -top-2
                px-1
                bg-white
                text-gray-500 text-xs
                transition-all duration-200
                peer-focus:text-gray-700
              "
            >
              Day
            </label>
          </div>

          <div className="relative">
            <input
              id="month"
              type="text"
              placeholder="MM"
              value={state.formData.dob.month}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DOB',
                  payload: { month: e.target.value.replace(/\D/g, '') },
                })
              }
              onBlur={(e) => handleBlur('month', e.target.value)}
              onFocus={() => handleFocus('month')}
              className={`
                w-full px-4 py-3
                rounded-md border
                outline-none peer
                ${
                  state.errors.month
                    ? 'border-[rgb(var(--color-primary-500))]'
                    : 'border-gray-300 focus:border-gray-700'
                }
              `}
            />

            <label
              htmlFor="month"
              className="
                absolute left-3 -top-2
                px-1
                bg-white
                text-gray-500 text-xs
                transition-all duration-200
                peer-focus:text-gray-700
              "
            >
              Month
            </label>
          </div>

          <div className="relative">
            <input
              id="year"
              type="text"
              placeholder="YYYY"
              value={state.formData.dob.year}
              onChange={(e) =>
                dispatch({
                  type: 'UPDATE_DOB',
                  payload: { year: e.target.value.replace(/\D/g, '') },
                })
              }
              onBlur={(e) => handleBlur('year', e.target.value)}
              onFocus={() => handleFocus('year')}
              className={`
                w-full px-4 py-3
                rounded-md border
                outline-none peer
                ${
                  state.errors.year
                    ? 'border-[rgb(var(--color-primary-500))]'
                    : 'border-gray-300 focus:border-gray-700'
                }
              `}
            />

            <label
              htmlFor="year"
              className="
                absolute left-3 -top-2
                px-1
                bg-white
                text-gray-500 text-xs
                transition-all duration-200
                peer-focus:text-gray-700
              "
            >
              Year
            </label>
          </div>
        </div>

        {dobError && (
          <p className="mt-1 ml-1 text-[rgb(var(--color-primary-500))] text-sm">
            {dobError}
          </p>
        )}
      </div>
    </>
  );
}
