// @ts-nocheck
'use client';

import InputField from '@/comman/InputField';
import { useState } from 'react';
import { FaCamera, FaFire } from 'react-icons/fa';
import { FiCamera, FiMenu } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

const Profile = ({ onOpenSidebar }) => {

    const timezones = [
        "Pacific Time (UTC−8)",
        "Eastern Time (UTC−5)",
        "India Standard Time (UTC+5:30)",
        "Central European Time (UTC+1)",
        "Japan Standard Time (UTC+9)",
    ];

    const [selectedTZ, setSelectedTZ] = useState("Pacific Time (UTC−8)");
    const [openTZ, setOpenTZ] = useState(false);

    const languages = [
        "English (US)",
        "English (UK)",
        "Hindi",
        "Gujarati",
        "Spanish",
        "French",
    ];

    const [selectedLang, setSelectedLang] = useState("English (US)");
    const [openLang, setOpenLang] = useState(false);
    return (
        <div className="min-h-screen  ff-font text-[#1a1a1a] ">
            <div className="mx-auto px-0 ">
                {/* ================= STUDENT PROFILE ================= */}

                <div className="ff-font">
                    {/* --- MOBILE VIEW PROFILE HEADER (< 640px) --- */}
                    <div className="sm:hidden bg-white rounded-2xl border border-gray-200 p-4 shadow-xs">
                        {/* Avatar + Main Info Row */}
                        <div className="flex items-center gap-3.5">
                            {/* Avatar */}
                            <div className="relative shrink-0">
                                <div className="w-16 h-16 rounded-full border-[3px] border-gray-100 flex items-center justify-center relative bg-white">
                                    {/* Yellow Progress Border */}
                                    <div className="absolute inset-0 rounded-full border-[3px] border-primary border-b-transparent border-l-transparent rotate-[45deg]"></div>

                                    {/* Initial Letter */}
                                    <div className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-[#1a1a1a]">
                                        G
                                    </div>

                                    {/* Camera upload button */}
                                    <label className="absolute -bottom-0.5 -right-0.5 bg-black text-primary p-1.5 rounded-full border-2 border-white cursor-pointer shadow-sm flex items-center justify-center active:scale-95 transition-transform">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    console.log(file);
                                                }
                                            }}
                                        />
                                        <FaCamera size={10} />
                                    </label>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="min-w-0 flex-1">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">
                                    Student Profile
                                </span>
                                <h1 className="text-[20px] font-bold text-[#1a1a1a] leading-tight truncate">
                                    Gargi Patel
                                </h1>
                                <p className="text-[11.5px] text-gray-500 font-medium mt-0.5">
                                    USMLE Candidate
                                </p>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="mt-3.5 pt-3 border-t border-gray-100 grid grid-cols-3 gap-1 bg-[#fafaf8] rounded-xl p-2.5">
                            <div className="text-center border-r border-gray-200/70 pr-1">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                    Member since
                                </p>
                                <p className="text-[12px] font-bold text-[#1a1a1a] mt-0.5 whitespace-nowrap">
                                    April 2024
                                </p>
                            </div>

                            <div className="text-center border-r border-gray-200/70 px-1">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                    Target exam
                                </p>
                                <p className="text-[12px] font-bold text-[#1a1a1a] mt-0.5 whitespace-nowrap">
                                    June 14, 2026
                                </p>
                            </div>

                            <div className="text-center pl-1">
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                    Study streak
                                </p>
                                <p className="text-[12px] font-bold text-[#1a1a1a] mt-0.5 flex items-center justify-center gap-1 whitespace-nowrap">
                                    <FaFire size={12} className="text-amber-500" /> 12 days
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- DESKTOP VIEW PROFILE HEADER (sm: and up) --- */}
                    <div className="hidden sm:block">
                        <div className="py-0 flex flex-row items-center gap-8">
                            {/* 1. Avatar Section */}
                            <div className="relative shrink-0">
                                <div className="w-24 h-24 rounded-full border-[3.5px] border-gray-100 flex items-center justify-center relative">
                                    {/* Progress Yellow Border (Top & Right) */}
                                    <div className="absolute inset-0 rounded-full border-[3.5px] border-primary border-b-transparent border-l-transparent rotate-[45deg]"></div>

                                    {/* Initial Letter */}
                                    <div className="w-full h-full rounded-full flex items-center justify-center text-3xl font-bold text-[#1a1a1a]">
                                        G
                                    </div>

                                    <label className="absolute bottom-1 right-1 bg-black text-primary p-1.5 rounded-full border-2 border-white cursor-pointer shadow-sm flex items-center justify-center">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    console.log(file);
                                                }
                                            }}
                                        />
                                        <FaCamera size={12} />
                                    </label>
                                </div>
                            </div>

                            {/* 2. Info Section */}
                            <div className="flex-1">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                                    Student Profile
                                </span>
                                <h1 className="text-[32px] ff-font-bold font-bold text-[#1a1a1a] mb-4">
                                    Gargi Patel
                                </h1>

                                <div className="flex flex-wrap gap-12">
                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Member since
                                        </p>
                                        <p className="text-[15px] font-bold text-[#1a1a1a]">
                                            April 2024
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Target exam
                                        </p>
                                        <p className="text-[15px] font-bold text-[#1a1a1a]">
                                            June 14, 2026
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                            Study streak
                                        </p>
                                        <p className="text-[15px] font-bold text-primary flex items-center gap-1.5">
                                            <FaFire size={14} /> 12 days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full border-b border-gray-200 mt-8"></div>
                    </div>
                </div>

                {/* ================= PERSONAL INFO SECTION ================= */}
                <section className="max-w-5xl mb-10">
                    {/* Header Area */}
                    <div className="mt-4 sm:mt-8 mb-4 sm:mb-8">
                        <div className="flex items-center gap-3 sm:gap-4 mb-2">
                            <p className="text-[10px] sm:text-[11px] tracking-wider text-gray-500 uppercase font-bold whitespace-nowrap">
                                About You
                            </p>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                        </div>
                        <h2 className="text-[18px] sm:text-[22px] font-bold ff-font-bold text-[#1a1a1a]">
                            Personal information
                        </h2>
                        <p className="text-[12px] sm:text-[13px] text-gray-500 mt-0.5 sm:mt-1 font-medium">
                            How we identify you and stay in touch.
                        </p>
                    </div>

                    <div className="border-t border-gray-200">

                        {/* Full Name */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Full name</label>
                                <p className="text-[12px] text-[#6b6b66] mt-1">
                                    Shown on your certificates and profile.
                                </p>
                            </div>

                            <div className="md:col-span-4 [&>div>input]:py-2.5 [&>div>input]:rounded-lg [&>div>input]:border-gray-300 [&>div>input]:text-sm">
                                <InputField
                                    name="fullName"
                                    value="Gargi Patel"
                                    onChange={() => { }}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">

                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">
                                    Email address
                                </label>
                                <p className="text-[12px] text-[#6b6b66] mt-1">
                                    For login, receipts, and important account notices.
                                </p>
                            </div>

                            <div className="md:col-span-9 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">

                                {/* Input */}
                                <div className="w-full md:w-[44.5%] [&>div>input]:py-2.5 [&>div>input]:rounded-lg [&>div>input]:border-gray-300">
                                    <InputField
                                        type="email"
                                        name="email"
                                        value="gargi.p@example.com"
                                        onChange={() => { }}
                                    />
                                </div>

                                {/* Button */}
                                <button className="text-[12px] cursor-pointer font-bold border-b border-black hover:text-primary hover:border-primary transition-all w-fit pb-0.5 md:ml-auto">
                                    Verify email
                                </button>

                            </div>
                        </div>

                        {/* Bio (same, no change needed) */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Bio</label>
                                <p className="text-[12px] text-[#6b6b66] mt-1">
                                    A short description shown on your study profile.
                                </p>
                            </div>

                            <div className="md:col-span-4">
                                <textarea
                                    rows={2}
                                    defaultValue="USMLE candidate preparing for Step 1 in June 2026."
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary text-[#1a1a1a] resize-none leading-relaxed"
                                />
                            </div>
                        </div>

                        {/* Time Zone */}
                        {/* Time Zone */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">

                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">
                                    Time zone
                                </label>
                            </div>

                            <div className="md:col-span-4 relative">

                                {/* Selected */}
                                <div
                                    onClick={() => setOpenTZ(!openTZ)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm 
      text-[#1a1a1a] bg-white cursor-pointer flex justify-between items-center"
                                >
                                    <span>{selectedTZ}</span>
                                    <span className="text-gray-400 text-xs">▼</span>
                                </div>

                                {/* Dropdown */}
                                {openTZ && (
                                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50 max-h-52 overflow-y-auto">
                                        {timezones.map((tz) => (
                                            <div
                                                key={tz}
                                                onClick={() => {
                                                    setSelectedTZ(tz);
                                                    setOpenTZ(false);
                                                }}
                                                className="px-3 py-2 text-sm cursor-pointer hover:bg-[#fff4d6]"
                                            >
                                                {tz}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>








                        {/* Language */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">

                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">
                                    Display language
                                </label>
                            </div>

                            <div className="md:col-span-4 relative">

                                {/* Selected */}
                                <div
                                    onClick={() => setOpenLang(!openLang)}
                                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm 
      text-[#1a1a1a] bg-white cursor-pointer flex justify-between items-center"
                                >
                                    <span>{selectedLang}</span>
                                    <span className="text-gray-400 text-xs">▼</span>
                                </div>

                                {/* Dropdown */}
                                {openLang && (
                                    <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50 max-h-52 overflow-y-auto">
                                        {languages.map((lang) => (
                                            <div
                                                key={lang}
                                                onClick={() => {
                                                    setSelectedLang(lang);
                                                    setOpenLang(false);
                                                }}
                                                className="px-3 py-2 text-sm cursor-pointer hover:bg-[#fff4d6]"
                                            >
                                                {lang}
                                            </div>
                                        ))}
                                    </div>
                                )}

                            </div>
                        </div>

                    </div>
                </section>








                {/* ================= ACCOUNT SECURITY SECTION ================= */}
                <section className="mb-10  mx-auto">
                    {/* Header Area */}
                    <div className="mb-10">
                        <p className="text-[11px]  text-primary uppercase font-bold mb-1 ff-font">Account security</p>
                        <h2 className="text-[22px] font-bold ff-font-bold text-[#1a1a1a] ff-font">Password & access</h2>
                        <p className="text-[13px] text-gray-500 mt-1 font-medium ff-font">Keep your account safe.</p>
                    </div>

                    <div className="border-t border-gray-200">

                        {/* Password Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a] ff-font">Password</label>
                                <p className="text-[13px] text-gray-400 mt-1 ff-font">Last changed 3 months ago.</p>
                            </div>
                            <div className="md:col-span-9 flex justify-between items-center">
                                <span className="text-sm tracking-widest font-bold text-[#1a1a1a]">••••••••••••</span>
                                <button className="text-[13px] cursor-pointer ff-font font-bold border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all pb-0.5">
                                    Change password
                                </button>
                            </div>
                        </div>

                        {/* Two-factor authentication Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a] ff-font">Two-factor authentication</label>
                                <p className="text-[13px] text-gray-400 mt-1 leading-relaxed ff-font">
                                    Add an extra layer of security at sign-in.
                                </p>
                            </div>
                            <div className="md:col-span-9 flex justify-between items-center">
                                <span className="text-sm ff-font text-[#1a1a1a]">Not enabled</span>
                                <button className="text-[13px] cursor-pointer ff-font font-bold text-primary border-b border-primary hover:opacity-80 transition-all pb-0.5">
                                    Enable 2FA
                                </button>
                            </div>
                        </div>

                        {/* Active sessions Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold ff-font text-[#1a1a1a]">Active sessions</label>
                                <p className="text-[12px] text-[#6b6b66] ff-font mt-1 leading-relaxed">
                                    Devices currently signed in to your account.
                                </p>
                            </div>
                            <div className="md:col-span-9 flex justify-between items-center">
                                <span className="text-sm  ff-font text-[#1a1a1a]">2 devices</span>
                                <button className="text-[13px] cursor-pointer ff-font font-bold border-b border-black hover:text-gray-600 hover:border-gray-600 transition-all pb-0.5">
                                    Review & sign out
                                </button>
                            </div>
                        </div>

                        {/* Account ID Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Account ID</label>
                                <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">
                                    Reference this when contacting support.
                                </p>
                            </div>
                            <div className="md:col-span-9">
                                <span className="text-sm text-[#1a1a1a]">MA-48291</span>
                            </div>
                        </div>

                    </div>

                    {/* Form Actions (Buttons) */}
                    <div className="flex justify-end gap-3 mt-10">
                        <button className="px-6 cursor-pointer py-2.5 text-sm  ff-fontfont-bold border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-[#1a1a1a]">
                            Cancel
                        </button>
                        <button className="px-6 py-2.5 cursor-pointer text-sm font-bold bg-black ff-font text-primary rounded-lg hover:bg-black transition-colors shadow-sm">
                            Save changes
                        </button>
                    </div>
                </section>


                {/* ================= DANGER ZONE / LEAVING SECTION ================= */}
                <section className=" max-w-5xl mx-auto">
                    <div className="border-t border-gray-200 pt-10">
                        <h2 className="text-[16px] ff-font font-bold text-[#1a1a1a]">Leaving Mendel?</h2>
                        <p className="text-[14px] ff-font text-gray-500 mt-1 font-medium">
                            You can export your data, sign out everywhere, or delete your account at any time.
                        </p>

                        <div className="flex flex-wrap gap-6 mt-6">
                            <button className="text-[13px] cursor-pointer ff-font font-bold text-gray-500 border-b border-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all pb-0.5">
                                Export my data
                            </button>

                            <button className="text-[13px] cursor-pointer ff-font font-bold text-gray-500 border-b border-gray-400 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all pb-0.5">
                                Sign out of all devices
                            </button>

                            <button className="text-[13px] cursor-pointer ff-font font-bold text-gray-500 border-b border-gray-400 hover:text-red-600 hover:border-red-600 transition-all pb-0.5">
                                Delete account
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Profile;


/* ================= COMPONENTS ================= */

const Toggle = ({ label, sub, defaultActive }) => {
    const [active, setActive] = useState(defaultActive);

    return (

        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-center transition-all">
            <div className="md:col-span-10">
                <p className="text-[14px] font-bold ff-font">{label}</p>
                <p className="text-[13px] text-[#6b6b66] ff-font mt-1">{sub}</p>
            </div>
            <div className="md:col-span-2 flex justify-end">
                <div
                    onClick={() => setActive(!active)}
                    className={`w-[40px] h-[22px] flex items-center rounded-full px-1 cursor-pointer transition-colors duration-200 ${active ? 'bg-primary' : 'bg-gray-300'
                        }`}
                >
                    <div
                        className={`bg-white w-3.5 h-3.5 rounded-full shadow-sm transform transition-transform duration-200 ${active ? 'translate-x-[18px]' : 'translate-x-0'
                            }`}
                    />
                </div>
            </div>
        </div>
    );
};

