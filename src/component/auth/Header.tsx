'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiShoppingCart, FiX } from "react-icons/fi";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isExamDropdownOpen, setIsExamDropdownOpen] = useState<boolean>(false);

    const router = useRouter();

    const examCategories = {
        "USMLE Program": [
            { name: "USMLE Step 1", link: "/exams/usmle-step-1" },
            { name: "USMLE Step 2", link: "/exams/usmle-step-2" },
            { name: "USMLE Step 3", link: "/exams/usmle-step-3" },
        ],
        "International Exams": [
            { name: "PLAB (UK)", link: "/exams/plab" },
            { name: "NExT (India)", link: "/exams/next" },
            { name: "FMGE (India)", link: "/exams/fmge" },
            { name: "INI-CET (India)", link: "/exams/ini-cet" },
            { name: "AMC (Australia)", link: "/exams/amc" },
        ],
    };



    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* ✅ Logo */}
                    <div
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 cursor-pointer"
                    >
                        <img
                            src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
                            alt="Mendel Academy Logo"
                            className="w-10 h-10 object-contain"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-bold text-lg text-gray-900">MENDEL</span>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">
                                ACADEMY
                            </span>
                        </div>
                    </div>

                    {/* ✅ Links (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-12">
                        <button
                            onClick={() => router.push("/")}
                            className="relative text-gray-700 font-medium text-sm hover:text-yellow-500 group cursor-pointer"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button  className="relative text-gray-700 font-medium text-sm hover:text-yellow-500 group cursor-pointer">
                            Pathology
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button
                            onClick={() => router.push("/blog")}
                            className="relative text-gray-700 font-medium text-sm hover:text-yellow-500 cursor-pointer group"
                        >
                            Blog
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>
                        <button className="relative text-gray-700 font-medium text-sm hover:text-yellow-500 group cursor-pointer">
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                        </button>

                        {/* ✅ Dropdown Menu */}
                        <div className="relative">
                            <button
                                id="exam-button"
                                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                                className="relative text-gray-700 font-medium text-sm hover:text-yellow-500 group cursor-pointer"
                            >
                                PG Medical Entrance Exams
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                            </button>

                            {isExamDropdownOpen && (
                                <div
                                    id="exam-dropdown"
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl p-6 animate-fadeIn"
                                >
                                    <div className="grid grid-cols-2 gap-6">
                                        {Object.entries(examCategories).map(([category, exams]) => (
                                            <div key={category}>
                                                <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                                    {category}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {exams.map((exam) => (
                                                        <li key={exam.name}>
                                                            <button

                                                                className="w-full text-left text-sm text-gray-800 hover:text-yellow-500 hover:bg-gray-50 px-3 py-2 rounded-md transition-all"
                                                            >
                                                                {exam.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-200 mt-4 pt-3 text-right">
                                        <button
                                            onClick={() => {
                                                setIsExamDropdownOpen(false);
                                            }}
                                            className="text-yellow-600 font-medium text-sm hover:underline"
                                        >
                                            View All Exam Services →
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* ✅ Buttons (Desktop) */}
                    <div className="hidden lg:flex items-center gap-4">
                        <button className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg">
                            <FiShoppingCart className="w-5 h-5 text-gray-700" />
                        </button>
                        <button onClick={() => router.push('/auth/login')} className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                            Login
                        </button>
                        <button onClick={() => router.push('/auth/register')} className="px-4 py-2 cursor-pointer rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600">
                            Sign Up
                        </button>
                    </div>

                    {/* ✅ Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <FiX className="w-6 h-6 text-gray-800" />
                        ) : (
                            <FiMenu className="w-6 h-6 text-gray-800" />
                        )}
                    </button>
                </div>

                {/* ✅ Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-gray-200">
                        <nav className="flex flex-col gap-4">
                            {["Home", "Pathology", "Blog", "About Us"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        if (item === "Home") router.push("/");
                                        if (item === "Blog") router.push("/blog");
                                    }}
                                    className="text-gray-800 hover:text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-left"
                                >
                                    {item}
                                </button>
                            ))}

                            {/* ✅ Mobile Exam Dropdown */}
                            <div className="px-4">
                                <button
                                    onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                                    className="text-gray-800 font-medium py-2 w-full text-left hover:text-yellow-500"
                                >
                                    PG Medical Entrance Exams
                                </button>
                                {isExamDropdownOpen && (
                                    <div className="mt-2 pl-4 space-y-3">
                                        {Object.entries(examCategories).map(([category, exams]) => (
                                            <div key={category}>
                                                <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase">
                                                    {category}
                                                </h4>
                                                <ul className="space-y-1">
                                                    {exams.map((exam) => (
                                                        <li key={exam.name}>
                                                            <button
                                                                className="text-gray-700 hover:text-yellow-500 text-sm py-1 w-full text-left"
                                                            >
                                                                {exam.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <hr className="border-gray-200 my-2" />

                            {/* Buttons (Mobile) */}
                            <div className="flex flex-col gap-3 px-4">
                                <button className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                                    Login
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600">
                                    Sign Up
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                                    <FiShoppingCart className="w-5 h-5" />
                                    Cart
                                </button>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
