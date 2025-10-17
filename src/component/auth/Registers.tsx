"use client";
import { CiLock, CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEyeOff } from "react-icons/fi";
import { GoPerson } from "react-icons/go";

export default function Registers() {
    return (
        <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-br from-yellow-50 to-white">
            {/* ------------------- LEFT PANEL: ONLY IMAGE ------------------- */}
            <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-8 md:p-16">
                <img
                    src="https://media.istockphoto.com/id/1492383467/vector/web-banner-template-of-speech-bubble-with-register-now-phrase.jpg?s=612x612&w=0&k=20&c=G1PEIxAAeM5KvKK3z_rxsHeNTlNiN6cb8APiUuC-dSg="
                    alt="Register Now"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* ------------------- RIGHT PANEL: SIGN-UP FORM ------------------- */}
            <div className="w-full lg:w-1/2 bg-[#f5b73d] relative flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md relative z-10">
                    {/* header */}
                    <div className="text-center mb-6 md:mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Create an account
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base">
                            Please enter your details to sign up
                        </p>
                    </div>

                    {/* form */}
                    <div className="space-y-4 md:space-y-5">
                        {/* First name */}
                        <div className="relative">
                            <GoPerson className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="First name*"
                                required
                                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Last name */}
                        <div className="relative">
                            <GoPerson className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Last name*"
                                required
                                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <CiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email*"
                                required
                                className="w-full pl-12 pr-4 py-3 md:py-4 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <CiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Create Password*"
                                required
                                className="w-full pl-12 pr-12 py-3 md:py-4 rounded-lg bg-white border border-gray-200 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                <FiEyeOff className="w-5 h-5" />
                            </button>
                        </div>

                        {/* T&C checkbox */}
                        <div className="flex items-start space-x-2 text-sm">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 rounded border-gray-300 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-gray-700 cursor-pointer select-none leading-tight">
                                I agree to Mendel Academy&apos;s{" "}
                                <a href="#" className="underline hover:text-gray-900">Terms of Service</a> &{" "}
                                <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 md:py-4 rounded-lg cursor-pointer bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-300 active:scale-95"
                        >
                            Create account
                        </button>

                        {/* Social row */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-3 py-3 md:py-4 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <FcGoogle className="w-7 h-7" />
                                <span>Google</span>
                            </button>

                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-3 py-3 md:py-4 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <FaApple className="w-7 h-7" />
                                <span>Apple</span>
                            </button>

                            <button
                                type="button"
                                className="flex-1 flex items-center justify-center gap-3 py-3 md:py-4 cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                <CiMail className="w-7 h-7 text-gray-700" />
                                <span>Email</span>
                            </button>
                        </div>

                        {/* footer link */}
                        <p className="text-center text-sm text-gray-600 pt-2">
                            Already have an account?{" "}
                            <a href="/login" className="text-gray-900 font-semibold hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
