import { useRegister } from '@/hooks/useRegister';

export function ReligionDetails() {
  const { state, handleBlur, handleFocus, handleChange } = useRegister();

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
            peer w-full rounded-md px-4 py-3 pr-12 outline-none
            ${state.errors.religion ? 'border border-red-500' : 'border border-gray-300 focus:border-pink-500'}
          `}
        />

        <label
          htmlFor="religion"
          className="
            absolute left-4 top-3 text-gray-500 transition-all duration-200
            peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
            peer-not-placeholder-shown:-top-2
            peer-not-placeholder-shown:left-3
            peer-not-placeholder-shown:text-xs
            peer-not-placeholder-shown:bg-white
            peer-not-placeholder-shown:px-1
          "
        >
          Religion
        </label>

        {state.errors.religion && (
          <p className="text-red-500 text-sm mt-1 ml-1">
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
            peer w-full rounded-md px-4 py-3 pr-12 outline-none
            ${state.errors.community ? 'border border-red-500' : 'border border-gray-300 focus:border-pink-500'}
          `}
        />

        <label
          htmlFor="community"
          className="
            absolute left-4 top-3 text-gray-500 transition-all duration-200
            peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
            peer-not-placeholder-shown:-top-2
            peer-not-placeholder-shown:left-3
            peer-not-placeholder-shown:text-xs
            peer-not-placeholder-shown:bg-white
            peer-not-placeholder-shown:px-1
          "
        >
          Community
        </label>

        {state.errors.community && (
          <p className="text-red-500 text-sm mt-1 ml-1">
            {state.errors.community}
          </p>
        )}
      </div>
    </>
  );
}
