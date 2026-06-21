import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../../../hooks/useRegister";

export function AccountDetails() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { state, handleBlur, handleFocus, handleChange } = useRegister();

    return (
        <>
            <h2 className="font-semibold text-gray-800 text-2xl">
                Account Details
            </h2>

            <div className="relative mt-4">
                <input
                    id="email"
                    type="text"
                    placeholder=" "
                    value={state.formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={(e) => handleBlur("email", e.target.value)}
                    onFocus={() => handleFocus("email")}
                    className={`peer w-full rounded-md pl-4 pr-10 py-3 outline-none
                        ${state.errors.email ? "border border-red-500" : "border border-gray-300 focus:border-pink-500" }`}
                />

                <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-500 transition-all duration-200
                        peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                        peer-[:not(:placeholder-shown)]:-top-2
                        peer-[:not(:placeholder-shown)]:left-3
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:bg-white
                        peer-[:not(:placeholder-shown)]:px-1"
                >
                    Email
                </label>

                {state.errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                        {state.errors.email}
                    </p>
                )}
            </div>

            <div className="relative mt-6">
                <input
                    id="mobileNumber"
                    type="text"
                    placeholder=" "
                    value={state.formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value.replace(/\D/g, ""))}
                    onBlur={(e) => handleBlur("mobile", e.target.value)}
                    onFocus={() => handleFocus("mobile")}
                    className={`peer w-full rounded-md pl-4 pr-10 py-3 outline-none
                        ${state.errors.mobile ? "border border-red-500" : "border border-gray-300 focus:border-pink-500" }`}
                />

                <label
                    htmlFor="mobileNumber"
                    className="absolute left-4 top-3 text-gray-500 transition-all duration-200
                        peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                        peer-[:not(:placeholder-shown)]:-top-2
                        peer-[:not(:placeholder-shown)]:left-3
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:bg-white
                        peer-[:not(:placeholder-shown)]:px-1"
                >
                    Mobile Number
                </label>

                {state.errors.mobile && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                        {state.errors.mobile}
                    </p>
                )}
            </div>

            <div className="mt-6">
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder=" "
                        value={state.formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                        onBlur={(e) => handleBlur("password", e.target.value)}
                        onFocus={() => handleFocus("password")}
                        className={`peer w-full rounded-md pl-4 pr-10 py-3 outline-none
                            ${state.errors.password ? "border border-red-500" : "border border-gray-300 focus:border-pink-500" }`}
                    />

                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {!showPassword ? (
                            <Eye className="w-5 h-5" />
                        ) : (
                            <EyeOff className="w-5 h-5" />
                        )}    
                    </button>

                    <label
                        htmlFor="password"
                        className="absolute left-4 top-3 text-gray-500 transition-all duration-200
                            peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                            peer-[:not(:placeholder-shown)]:-top-2
                            peer-[:not(:placeholder-shown)]:left-3
                            peer-[:not(:placeholder-shown)]:text-xs
                            peer-[:not(:placeholder-shown)]:bg-white
                            peer-[:not(:placeholder-shown)]:px-1"
                    >
                        Password
                    </label>
                </div>

                {state.errors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                        {state.errors.password}
                    </p>
                )}
            </div>

            <div className="mt-6">
                <div className="relative">
                    <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder=" "
                        value={state.formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                        onBlur={(e) => handleBlur("confirmPassword", e.target.value, state.formData.password)}
                        onFocus={() => handleFocus("confirmPassword")}
                        className={`peer w-full rounded-md px-4 py-3 pr-12 outline-none
                            ${state.errors.confirmPassword ? "border border-red-500" : "border border-gray-300 focus:border-pink-500" }`}
                    />

                    <button
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() => setShowConfirmPassword(prev => !prev)}
                    >
                        {!showConfirmPassword ? (
                            <Eye className="w-5 h-5" />
                        ) : (
                            <EyeOff className="w-5 h-5" />
                        )}    
                    </button>

                    <label
                        htmlFor="confirmPassword"
                        className="absolute left-4 top-3 text-gray-500 transition-all duration-200
                            peer-focus:-top-2 peer-focus:left-3 peer-focus:text-xs peer-focus:bg-white peer-focus:px-1 peer-focus:text-pink-500
                            peer-[:not(:placeholder-shown)]:-top-2
                            peer-[:not(:placeholder-shown)]:left-3
                            peer-[:not(:placeholder-shown)]:text-xs
                            peer-[:not(:placeholder-shown)]:bg-white
                            peer-[:not(:placeholder-shown)]:px-1"
                    >
                        Confirm Password
                    </label>
                </div>

                {state.errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                        {state.errors.confirmPassword}
                    </p>
                )}
            </div>
        </>
    );
}