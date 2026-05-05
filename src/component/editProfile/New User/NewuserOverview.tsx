"use client";

import { FaStar } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

const NewuserOverview = () => {
    return (
        <div className="space-y-6">

            {/* ================= TOP TRIAL BANNER ================= */}
            <div className="bg-[#f6e7b5] border border-[#e8c96a] rounded-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                <div className="flex items-start gap-3 sm:gap-4">

                    {/* Icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                        <FaStar className="text-primary text-base sm:text-lg" />
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-[10px] sm:text-[11px] tracking-widest text-gray-600 ff-font mb-1">
                            WELCOME TO MENDEL ACADEMY
                        </p>

                        <h2 className="text-lg sm:text-xl ff-font-bold mb-1">
                            Start your 5-day free trial
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-700 ff-font max-w-xl">
                            Full access to every Step 1 and Step 2 subject. Card required — cancel anytime before day 5 and you won't be charged.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    <button className="px-4 py-2 border border-[#d6b95c] rounded-lg text-sm ff-font w-full sm:w-auto">
                        See plans
                    </button>

                    <button className="px-5 py-2 bg-primary text-black rounded-lg text-sm ff-font-bold flex items-center justify-center gap-2 w-full sm:w-auto">
                        Start 5-day free trial →
                    </button>
                </div>
            </div>

            {/* ================= HEADER ================= */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">

                <div>
                    <p className="text-[10px] sm:text-[11px] tracking-widest text-gray-500 ff-font mb-1">
                        ACCOUNT
                    </p>

                    <h1 className="text-2xl sm:text-3xl ff-font-bold mb-1">
                        Welcome back, Gargi.
                    </h1>

                    <p className="text-sm text-gray-500 ff-font">
                        Here's what's happening with your studies today.
                    </p>
                </div>

                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm ff-font flex items-center justify-center gap-2 w-full sm:w-auto">
                    <FiEdit2 className="text-[14px]" />
                    Edit profile
                </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* ================= CONTACT CARD ================= */}
            <div className="bg-black rounded-2xl border-t-4 border-primary p-4 sm:p-6 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                <div>
                    <p className="text-[10px] sm:text-[11px] text-primary ff-font mb-2 tracking-widest">
                        CONTACT US
                    </p>

                    <h2 className="text-white text-lg sm:text-xl ff-font-bold mb-2">
                        Questions about your studies or account?
                    </h2>

                    <p className="text-gray-300 text-sm ff-font max-w-xl">
                        Our support team is here to help — whether it's a question about a course, a billing issue, or feedback on the platform.
                        Email us at{" "}
                        <span className="text-primary underline">
                            info@mendelacademy.com
                        </span>{" "}
                        and we'll typically reply within one business day.
                    </p>
                </div>

                {/* Button */}
                <button className="bg-primary text-black px-5 py-2 rounded-lg ff-font-bold flex items-center justify-center gap-2 w-full sm:w-auto">
                    <MdEmail />
                    Email support
                </button>
            </div>

        </div>
    );
};

export default NewuserOverview;