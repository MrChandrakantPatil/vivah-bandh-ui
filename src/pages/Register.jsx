import {
    ShieldCheck, LockKeyhole, Users,
    User,
    Mail,
    Lock,
    Eye,
    Calendar,
    ChevronDown,
    Phone
} from "lucide-react";

export function Register() {
    return (
        <div className="w-full bg-[rgb(var(--color-primary-700))]">
            <div className="container h-screen mx-auto px-4 flex items-center">
                <div>
                    <h1 className="font-bold text-5xl">
                        Find your life Paetner
                    </h1>

                    <p className="text-xl">
                        Join millions of happy members who found their perfect match.
                    </p>

                    <div className="flex flex-col gap-8 mt-6">
                        <div className="flex gap-3 items-center">
                            <div className="p-4 bg-white shadow-sm rounded-[50%]">
                                <ShieldCheck className="w-10 h-10 text-[rgb(var(--color-primary-700))]" />
                            </div>

                            <div>
                                <h4 className="font-bold text-2xl">
                                    100% Verified Profiles
                                </h4>

                                <p className="text-lg">
                                    Every profile is manually verified for your safety.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="p-4 bg-white shadow-sm rounded-[50%]">
                                <LockKeyhole className="w-10 h-10 text-[rgb(var(--color-primary-700))]" />
                            </div>

                            <div>
                                <h4 className="font-bold text-2xl">
                                    Privacy & Security
                                </h4>

                                <p className="text-lg">
                                    Your privacy is our priority. We never share your data.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="p-4 bg-white shadow-sm rounded-[50%]">
                                <Users className="w-10 h-10 text-[rgb(var(--color-primary-700))]" />
                            </div>

                            <div>
                                <h4 className="font-bold text-2xl">
                                    Trusted by Millions
                                </h4>

                                <p className="text-lg">
                                    Join Millions of happy members who found their perfect match.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto p-4">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Create Your Account
                        </h1>

                        <p className="mt-3 text-lg text-gray-500">
                            It's free and takes less than a minute
                        </p>

                        <div className="mt-6">
                            <lable className="block mb-2 font-semibold text-slate-800 text-m">
                                Full Name
                            </lable>

                            <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                <User size={20} className="text-gray-400 mr-3" />

                                <input type="text" placeholder="Enter your full name" className="flex-1 text-gray-600 outline-none" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <div>
                                <lable className="block mb-2 font-semibold text-slate-800 text-m">
                                    Gender
                                </lable>

                                <div className="relative flex items-center w-full h-12 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                    <select className="w-full px-4 text-gray-500 outline-none appearance-none">
                                        <option>Select Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </select>

                                    <ChevronDown
                                        size={20}
                                        className="absolute right-2 text-gray-400"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 font-semibold text-slate-800 text-m">
                                    Date of Birth
                                </label>

                                <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                    <input type="text" placeholder="DD / MM / YYYY" className="flex-1 text-gray-600 outline-none" />

                                    <User size={20} className="text-gray-400 ml-3" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 font-semibold text-slate-800 text-m">
                                Mobile Number
                            </label>

                            <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                <Phone size={20} className="text-gray-400 mr-3" />

                                <input type="text" placeholder="Enter mobile number" className="flex-1 text-gray-600 outline-none" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 font-semibold text-slate-800 text-m">
                                Email Address
                            </label>

                            <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                <Mail size={20} className="text-gray-400 mr-3" />

                                <input type="text" placeholder="Enter your email" className="flex-1 text-gray-600 outline-none" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 font-semibold text-slate-800 text-m">
                                Password
                            </label>

                            <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                <Lock size={20} className="text-gray-400 mr-3" />

                                <input type="text" placeholder="Create password" className="flex-1 text-gray-600 outline-none" />

                                <Eye size={20} className="text-gray-400 ml-3" />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block mb-2 font-semibold text-slate-800 text-m">
                                Confirm Password
                            </label>

                            <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl focus-within:border-pink-500">
                                <Lock size={20} className="text-gray-400 mr-3" />

                                <input type="text" placeholder="Confirm password" className="flex-1 text-gray-600 outline-none" />

                                <Eye size={20} className="text-gray-400 ml-3" />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300"
                            />

                            <p className="text-gray-600 text-sm">
                                I accept the{" "}
                                <span className="text-pink-500 font-medium"> Terms & Conditions </span>{" "}
                                and{" "}
                                <span className="text-pink-500 font-medium"> Privacy Policy </span>
                            </p>
                        </div>

                        <button className="w-full h-16 mt-8 rounded-xl bg-gradient-to-r from-pink-600 to-pink-500 text-white text-xl font-semibold hover:opacity-95">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}