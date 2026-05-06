'use client';

import InputField from '@/comman/InputField';
import { useState } from 'react';
import { FaCamera, FaFire } from 'react-icons/fa';
import { FiCamera } from 'react-icons/fi';
import { HiOutlineFire } from 'react-icons/hi';

const Profile = () => {

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
                    {/* Main Header Container */}
                    <div className="py-5 flex flex-col md:flex-row items-start md:items-center gap-8">

                        {/* 1. Avatar Section */}
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-[3.5px] border-gray-100 flex items-center justify-center relative">
                                {/* Progress Yellow Border (Top & Right) */}
                                <div className="absolute inset-0 rounded-full border-[3.5px] border-primary border-b-transparent border-l-transparent rotate-[45deg]"></div>

                                {/* Initial Letter */}
                                <div className="w-full h-full rounded-full flex items-center justify-center text-3xl font-bold text-[#1a1a1a]">
                                    G
                                </div>

                                <label className="absolute bottom-1 right-1 bg-black text-primary p-1.5 rounded-full border-2 border-white cursor-pointer shadow-sm flex items-center justify-center">

                                    {/* Hidden Input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                console.log(file); // handle image here
                                            }
                                        }}
                                    />

                                    {/* Camera Icon */}
                                    <FaCamera size={12} />
                                </label>
                            </div>
                        </div>

                        {/* 2. Info Section */}
                        <div className="flex-1">
                            <span className="text-[11px] font-bold text-primary uppercase block mb-1">
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


                    <div className="w-full border-b border-gray-200"></div>
                </div>



                {/* STUDY JOURNEY SECTION */}
                <section className="py-10">
                    {/* Header */}
                    <div className="mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase block mb-1">
                            Your Path
                        </span>
                        <h2 className="text-2xl sm:text-[22px] font-bold ff-font-bold text-[#1a1a1a]">
                            Study journey
                        </h2>
                        <p className="text-[13px] text-gray-500 mt-1">
                            Where you've been, and where you're going.
                        </p>
                    </div>

                    {/* Timeline Wrapper (SCROLL FIX) */}
                    <div className="relative pt-8 pb-8 overflow-x-auto">
                        <div className="min-w-[600px] mx-auto">

                            {/* Track */}
                            <div className="absolute top-[41px] left-0 w-[94%] h-[1.5px] bg-gray-200"></div>
                            <div className="absolute top-[41px] left-0 w-[65%] h-[1.5px] bg-primary"></div>

                            {/* Steps */}
                            <div className="relative flex justify-between px-2">

                                {/* Step 1 */}
                                <div className="relative flex flex-col items-center min-w-[120px]">
                                    <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-white ring-1 ring-primary z-10"></div>
                                    <div className="mt-4 text-center">
                                        <p className="text-[13px] font-bold text-gray-400 uppercase mb-1">
                                            Apr 2024
                                        </p>
                                        <p className="text-xs font-bold text-[#1a1a1a]">
                                            Joined Mendel
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="relative flex flex-col items-center min-w-[120px]">
                                    <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-white ring-1 ring-primary z-10"></div>
                                    <div className="mt-4 text-center">
                                        <p className="text-[13px] font-bold text-gray-400 uppercase mb-1">
                                            Dec 2025
                                        </p>
                                        <p className="text-xs font-bold text-[#1a1a1a]">
                                            Biochem completed
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 (Today) */}
                                <div className="relative flex flex-col items-center min-w-[120px]">
                                    <div className="w-4 h-4 rounded-full bg-black border-[3px] border-[#fcf3d7] ring-1 ring-black z-10"></div>
                                    <div className="mt-4 text-center">
                                        <p className="text-[13px] font-bold text-gray-400 uppercase mb-1">
                                            Today
                                        </p>
                                        <p className="text-xs font-bold text-[#1a1a1a]">
                                            Immunology & Micro
                                        </p>
                                    </div>
                                </div>

                                {/* Step 4 */}
                                <div className="relative flex flex-col items-center min-w-[120px]">
                                    <div className="w-3.5 h-3.5 rounded-full bg-white border-2 border-gray-200 z-10"></div>
                                    <div className="mt-4 text-center">
                                        <p className="text-[13px] font-bold text-gray-400 uppercase mb-1">
                                            Jun 14, 2026
                                        </p>
                                        <p className="text-xs font-bold text-gray-400">
                                            Step 1 exam day
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* Bottom border */}
                    <div className="w-full border-b border-gray-200"></div>
                </section>




                {/* ================= PERSONAL INFO SECTION ================= */}
                <section className=" max-w-5xl mb-10">
                    {/* Header Area */}
                    <div className="mb-10">
                        <p className="text-[11px] tracking-[0.2em] text-primary uppercase font-bold mb-1">About You</p>
                        <h2 className="text-[22px] font-bold ff-font-bold text-[#1a1a1a]">Personal information</h2>
                        <p className="text-[13px] text-gray-500 mt-1 font-medium">How we identify you and stay in touch.</p>
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





                {/* ================= STUDY PREF ================= */}
                <section className="mb-10 max-w-5xl">
                    {/* Header Area */}
                    <div className="mb-10">
                        <p className="text-[11px] tracking-[0.2em] text-primary uppercase font-bold mb-1">How you study</p>
                        <h2 className="text-[22px] font-bold ff-font-bold text-[#1a1a1a]">Study preferences</h2>
                        <p className="text-[13px] text-gray-500 mt-1 font-medium">Tune Mendel to fit your prep schedule.</p>
                    </div>

                    <div className="border-t border-gray-200">

                        {/* Target Exam */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Target exam</label>
                                <p className="text-[12px] text-[#6b6b66] mt-1 leading-relaxed">
                                    We'll tailor question difficulty and pacing to this.
                                </p>
                            </div>
                            <div className="md:col-span-4">
                                <div className="relative">
                                    <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary text-[#1a1a1a] bg-white appearance-none cursor-pointer">
                                        <option>USMLE Step 1 & Step 2 CK</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Target Exam Date */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">

                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">
                                    Target exam date
                                </label>
                            </div>

                            <div className="md:col-span-9 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">

                                {/* Native Date Input */}
                                <div className="w-full md:w-[44.5%]">
                                    <input
                                        type="date"
                                        defaultValue="2026-06-14"
                                        className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary text-[#1a1a1a]"
                                    />
                                </div>

                                {/* Right Text */}
                                <span className="text-[13px] font-medium text-gray-400 md:ml-auto">
                                    408 days away
                                </span>

                            </div>
                        </div>

                        {/* Daily Study Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Daily study goal</label>
                                <p className="text-[11px] text-gray-400 mt-1">Used for streaks and reminders.</p>
                            </div>
                            <div className="md:col-span-4">
                                <div className="relative">
                                    <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary text-[#1a1a1a] bg-white appearance-none cursor-pointer">
                                        <option>1 hour</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Study Schedule */}
                        <div className="grid grid-cols-1 md:grid-cols-12 py-4 border-b border-gray-200 items-start">
                            <div className="md:col-span-3 pb-4 md:pb-0">
                                <label className="text-[14px] font-bold text-[#1a1a1a]">Study schedule</label>
                            </div>
                            <div className="md:col-span-4">
                                <div className="relative">
                                    <select className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-primary text-[#1a1a1a] bg-white appearance-none cursor-pointer">
                                        <option>Every day</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ================= NOTIFICATIONS ================= */}
                <section className="mb-10  mx-auto px-0">
                    {/* Header Area */}
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <p className="text-[11px] ff-font text-primary uppercase font-bold mb-1">Stay in touch</p>
                            <h2 className="text-[22px] font-bold ff-font ff-font-bold text-[#1a1a1a]">Notifications</h2>
                            <p className="text-[13px] text-gray-500 ff-font mt-1 font-medium">Choose what you hear from us, and when.</p>
                        </div>
                        <button className="text-[13px] font-bold text-gray-400 hover:text-[#1a1a1a] transition-colors">
                            Pause all notifications
                        </button>
                    </div>

                    {/* Content Area with border-gray-200 */}
                    <div className="border-t border-gray-200">
                        <Toggle
                            label="Daily study reminder"
                            sub="Sent at 8:00 AM in your time zone."
                            defaultActive={true}
                        />
                        <Toggle
                            label="Weekly progress digest"
                            sub="Every Sunday evening — what you studied, accuracy trends, streaks."
                            defaultActive={true}
                        />
                        <Toggle
                            label="New course launches"
                            sub="When we add new subjects or content to your library."
                            defaultActive={true}
                        />
                        <Toggle
                            label="Promotional emails"
                            sub="Special offers, seasonal discounts, and announcements."
                            defaultActive={false}
                        />
                    </div>
                </section>

                {/* ================= SECURITY ================= */}
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

