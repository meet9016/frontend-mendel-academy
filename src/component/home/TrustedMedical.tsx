'use client';
import React from "react";
import { FaUserMd, FaCheckCircle, FaBookOpen, FaHeadset } from "react-icons/fa";

const TrustedMedical = () => {
    const stats = [
        {
            icon: <FaUserMd className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
            value: "10,000+",
            label: "MEDICAL STUDENTS",
        },
        {
            icon: <FaCheckCircle className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
            value: "95%",
            label: "SUCCESS RATE",
        },
        {
            icon: <FaBookOpen className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
            value: "50+",
            label: "EXPERT FACULTY",
        },
        {
            icon: <FaHeadset className="text-3xl text-black transition-transform duration-300 group-hover:scale-110" />,
            value: "24/7",
            label: "SUPPORT AVAILABLE",
        },
    ];

    return (
        <section className="bg-[#252525] text-white py-16 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Trusted by Medical
                </h2>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">
                    Professionals Worldwide
                </h2>
                <p className="text-gray-300 text-base md:text-lg mb-10">
                    Thousands of students and professionals advance their careers with our
                    comprehensive pathology education.
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                    {stats.map((item, index) => (
                        <div
                            key={index}
                            className="group flex flex-col items-center text-center cursor-pointer"
                        >
                            <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-yellow-500/40">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-yellow-400">
                                {item.value}
                            </h3>
                            <p className="text-gray-400 text-sm mt-1 tracking-wide transition-colors duration-300 group-hover:text-gray-200">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedMedical;
