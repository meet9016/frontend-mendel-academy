"use client";
import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

const ContactUs = () => {
    const [selectedTab, setSelectedTab] = useState("Account");

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
            <div className="mx-auto px-6 ">
                {/* Header Section */}
                <div className="mb-10">
                    <p className="text-gray-500 uppercase tracking-widest text-xs font-bold mb-2">
                        Support
                    </p>
                    <h1 className="text-4xl ff-font-bold mb-3 font-bold tracking-tight">Get in touch</h1>

                    {/* Email Badge */}
                    <div className="inline-flex items-center bg-[#fff4d6] border border-[#f1e9c5] rounded-full px-4 py-2 text-sm">
                        <div className="flex items-center gap-2 border-r border-[#e0d9b0] pr-4 mr-4">
                            <HiOutlineMail className="text-lg" />
                            <span className="font-bold ff-font">info@mendelacademy.com</span>
                        </div>
                        <span className="text-gray-500 ff-font">Replies within 1 business day</span>
                    </div>
                </div>

                <hr className="border-gray-200 mb-10" />

                {/* Form Content */}
                <form className="space-y-8">
                    {/* Grid for Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="block font-bold text-sm">Your name</label>
                            <input
                                type="text"
                                placeholder="Gargi Patel"
                                className="w-full bg-white border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-bold text-sm">Email</label>
                            <input
                                type="email"
                                placeholder="gargi.p@example.com"
                                className="w-full bg-white border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Category Tabs */}
                    <div className="space-y-4">
                        <label className="block font-bold text-sm">What is this about?</label>
                        <div className="flex flex-wrap gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setSelectedTab(tab)}
                                    className={`px-6 py-2.5 rounded-full border text-sm ff-font font-medium transition-all ${selectedTab === tab
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
                    <div className="space-y-2 3">
                        <label className="block font-bold ff-font text-sm">Message</label>
                        <textarea
                            rows={6}
                            placeholder="Tell us what's on your mind. The more context, the faster we can help."
                            className="w-[680px] bg-white border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-yellow-400 outline-none resize-none transition-all"
                        ></textarea>
                    </div>

                    {/* Form Footer */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                        <p className="text-gray-400 text-sm ff-font">
                            We read every message personally.
                        </p>
                        <button
                            type="submit"
                            className="bg-black text-primary ff-font px-10 py-4 rounded-xl flex items-center gap-3 hover:opacity-90 transition-opacity"
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