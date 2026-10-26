"use client";
import InputField from "@/comman/InputField";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

const ContactUs = ({ onOpenSidebar }: { onOpenSidebar?: () => void }) => {
    const [selectedTab, setSelectedTab] = useState("Account");

    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const tabs = [
        "Account",
        "Course content",
        "Billing",
        "Technical issue",
        "Feedback",
        "Other",
    ];

    return (
        <div className="min-h-screen  ff-font text-[#1a1a1a] ">
            <div className="mx-auto px-0 ">
                {/* Header Section */}
                <div className="mb-8 sm:mb-10">
                    <p className="text-gray-500 uppercase tracking-widest text-[12px] font-bold mb-2">
                        Support
                    </p>

                    <h1 className="text-2xl sm:text-3xl lg:text-[34px] ff-font-bold mb-3 font-bold tracking-tight">
                        Get in touch
                    </h1>

                    {/* Email Badge */}
                    <div className="inline-flex flex-col sm:flex-row sm:items-center bg-[#fff4d6] border border-[#f1e9c5] rounded-xl sm:rounded-full px-3.5 sm:px-4 py-2.5 sm:py-2 text-sm gap-1.5 sm:gap-0">

                        {/* Left Section */}
                        <div className="flex items-center gap-2 sm:border-r sm:border-[#e0d9b0] sm:pr-4 sm:mr-4">
                            <HiOutlineMail className="text-lg shrink-0" />

                            <span className="font-bold ff-font break-all text-xs sm:text-sm">
                                info@mendelacademy.com
                            </span>
                        </div>

                        {/* Right Text */}
                        <span className="text-gray-500 ff-font text-[11px] sm:text-sm">
                            Replies within 1 business day
                        </span>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8 sm:mb-10" />

                {/* Form Content */}
                <form className="space-y-6 sm:space-y-8">
                    {/* Grid for Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="block font-bold text-[13px]">Your name</label>

                            <InputField
                                name="name"
                                placeholder="Gargi Patel"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="block font-bold text-[13px]">Email</label>

                            <InputField
                                type="email"
                                name="email"
                                placeholder="gargi.p@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    {/* Category Tabs */}
                    <div className="space-y-3 sm:space-y-4">
                        <label className="block font-bold text-[13px] ">What is this about?</label>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setSelectedTab(tab)}
                                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border text-xs sm:text-sm ff-font font-medium transition-all cursor-pointer ${selectedTab === tab
                                        ? "bg-black text-primary border-black"
                                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                        <label className="block font-bold ff-font text-[13px]">
                            Message
                        </label>

                        <textarea
                            rows={6}
                            placeholder="Tell us what's on your mind. The more context, the faster we can help."
                            className="w-full max-w-[680px] bg-white border border-gray-300 rounded-xl p-3.5 sm:p-4 text-sm sm:text-base focus:ring-2 focus:ring-yellow-400 outline-none resize-none transition-all"
                        ></textarea>
                    </div>
                    {/* Form Footer */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-4">
                        <p className="text-gray-400 text-xs sm:text-sm ff-font text-center sm:text-left">
                            We read every message personally.
                        </p>
                        <button
                            type="submit"
                            className="w-full sm:w-auto justify-center bg-black cursor-pointer text-primary ff-font px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl flex items-center gap-3 hover:opacity-90 transition-opacity"
                        >
                            Send message <IoSendSharp className="-rotate-12" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;