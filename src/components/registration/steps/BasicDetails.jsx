import { useRegister } from "../../../hooks/useRegister";

export function BasicDetails() {
    const { state, dispatch, handleBlur, handleFocus, handleChange } = useRegister();

    const dobError = state.errors.day || state.errors.month || state.errors.year;

    return (
        <>
            <h2 className="font-semibold text-gray-800 text-2xl">
                Basic Details
            </h2>

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
                            onChange={(e) => handleChange("firstName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                            onBlur={(e) => handleBlur("firstName", e.target.value)}
                            onFocus={() => handleFocus("firstName")}
                            className={`peer w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-pink-500
                                ${state.errors.firstName ? "border border-red-500" : "border border-gray-300 focus:border-pink-500"}`}
                        />

                        <label
                            htmlFor="firstName"
                            className="
                                absolute left-4 top-3 text-gray-500 transition-all duration-200
                                peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                                peer-[:not(:placeholder-shown)]:-top-2
                                peer-[:not(:placeholder-shown)]:left-3
                                peer-[:not(:placeholder-shown)]:text-xs
                                peer-[:not(:placeholder-shown)]:bg-white
                                peer-[:not(:placeholder-shown)]:px-1
                            "
                        >
                            First Name
                        </label>

                        {state.errors.firstName && (
                            <p className="text-red-500 text-sm mt-1 ml-1">
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
                            onChange={(e) => handleChange("lastName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                            onBlur={(e) => handleBlur("lastName", e.target.value)}
                            onFocus={() => handleFocus("lastName")}
                            className={`peer w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-pink-500
                                ${state.errors.lastName ? "border border-red-500" : "border border-gray-300 focus:border-pink-500"}`}
                        />

                        <label
                            htmlFor="lastName"
                            className="
                                absolute left-4 top-3 text-gray-500 transition-all duration-200
                                peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                                peer-[:not(:placeholder-shown)]:-top-2
                                peer-[:not(:placeholder-shown)]:left-3
                                peer-[:not(:placeholder-shown)]:text-xs
                                peer-[:not(:placeholder-shown)]:bg-white
                                peer-[:not(:placeholder-shown)]:px-1
                            "
                        >
                            Last Name
                        </label>

                        {state.errors.lastName && (
                            <p className="text-red-500 text-sm mt-1 ml-1">
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
                                    type: "UPDATE_DOB",
                                    payload: {
                                        day: e.target.value.replace(/\D/g, "")
                                    }
                                })
                            }
                            onBlur={(e) => handleBlur("day", e.target.value)}
                            onFocus={() => handleFocus("day")}
                            className={`peer w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-pink-500
                            ${state.errors.day ? "border border-red-500" : "border border-gray-300 focus:border-pink-500"}`}
                        />

                        <label
                            htmlFor="day"
                            className="absolute left-3 -top-2 text-gray-500 transition-all duration-200 bg-white px-1 text-xs peer-focus:text-pink-500"
                        >Day</label>
                    </div>

                    <div className="relative">
                        <input
                            id="month"
                            type="text"
                            placeholder="MM"
                            value={state.formData.dob.month}
                            onChange={(e) =>
                                dispatch({
                                    type: "UPDATE_DOB",
                                    payload: {
                                        month: e.target.value.replace(/\D/g, "")
                                    }
                                })
                            }
                            onBlur={(e) => handleBlur("month", e.target.value)}
                            onFocus={() => handleFocus("month")}
                            className={`peer w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-pink-500
                                ${state.errors.month ? "border border-red-500" : "border border-gray-300 focus:border-pink-500"}`}
                        />

                        <label
                            htmlFor="month"
                            className="absolute left-3 -top-2 text-gray-500 transition-all duration-200 bg-white px-1 text-xs  peer-focus:text-pink-500"
                        >Month</label>
                    </div>

                    <div className="relative">
                        <input
                            id="year"
                            type="text"
                            placeholder="YYYY"
                            value={state.formData.dob.year}
                            onChange={(e) =>
                                dispatch({
                                    type: "UPDATE_DOB",
                                    payload: {
                                        year: e.target.value.replace(/\D/g, "")
                                    }
                                })
                            }
                            onBlur={(e) => handleBlur("year", e.target.value)}
                            onFocus={() => handleFocus("year")}
                            className={`peer w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-pink-500
                                ${state.errors.year ? "border border-red-500" : "border border-gray-300 focus:border-pink-500"}`}
                        />

                        <label
                            htmlFor="year"
                            className="absolute left-3 -top-2 text-gray-500 transition-all duration-200 bg-white px-1 text-xs peer-focus:text-pink-500"
                        >Year</label>
                    </div>
                </div>

                {dobError && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                        {dobError}
                    </p>
                )}
            </div>
        </>
    );
}