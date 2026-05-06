"use client";

import React from 'react';
import { BsDot } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';

const Membership = () => {
    const billingHistory = [
        { date: "Apr 12, 2025", label: "Step 1 + Step 2 — Annual renewal", amount: "$249.00" },
        { date: "Apr 12, 2024", label: "Promotional discount applied", amount: "-$50.00", isDiscount: true },
        { date: "Apr 12, 2024", label: "Step 1 + Step 2 — Annual subscription", amount: "$249.00" },
    ];

    return (
        <div className="min-h-screen  ff-font text-[#1a1a1a] ">
            <div className="mx-auto px-0 ">

                {/* --- HEADER --- */}
               

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pb-10 border-b border-gray-200">
                    <div>
                        <p className="text-[12px] font-bold text-[#6b6b66] uppercase ff-font-bold  mb-2">
                            Account
                        </p>
                        <h1 className="text-[34px] font-bold ff-font-bold tracking-tight text-[#1a1a1a]">
                           Membership
                        </h1>
                        <p className="text-[14px] ff-font text-[#6b6b66]">
                            Your plan, payment method, and billing history.
                        </p>
                    </div>

                   
                </div>

                <hr className="border-gray-200 mb-10" />

                <div className="space-y-6">
                    {/* --- ACCOUNT HOLDER --- */}
                    <div className="border border-gray-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white">
                        <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-xl font-extrabold ff-font-bold">
                                G
                            </div>
                            <div>
                                <p className="text-[11px] ff-font uppercase tracking-widest text-[#6b6b66] font-bold mb-1">
                                    ACCOUNT HOLDER
                                </p>
                                <h3 className="font-bold text-[17px] ff-font-bold">Gargi P.</h3>
                                <p className="text-[13px] text-[#6b6b66] mt-0.5 ff-font">
                                    gargi.p@example.com · Member since April 2024
                                </p>
                            </div>
                        </div>
                        <button className="text-[13px] cursor-pointer font-bold ff-font text-gray-700 hover:text-primary transition-colors">
                            Edit account →
                        </button>
                    </div>

                    {/* --- CURRENT ACTIVE PLAN CARD --- */}
                    <div className="relative border-l-[6px] border-primary border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white exam-card-shadow">

                        {/* LEFT */}
                        <div className="flex items-start gap-3 sm:gap-5 w-full">

                            {/* Icon */}
                            <div className="p-2.5 sm:p-3.5 bg-black rounded-xl flex items-center justify-center shrink-0">
                                <FaRegStar className="text-primary fill-primary" size={20} />
                            </div>

                            {/* Content */}
                            <div className="pt-1 min-w-0">

                                <h3 className="font-bold text-base sm:text-[20px] mb-1 ">
                                    USMLE Step 1 + Step 2 — Annual
                                </h3>

                                <p className="text-[12px] sm:text-[14px] text-gray-500 flex flex-wrap items-center gap-x-1">

                                    <span className="font-bold text-black whitespace-nowrap">
                                        $249.00 / year
                                    </span>

                                    <BsDot className="text-gray-400 hidden sm:block" size={20} />

                                    <span className="whitespace-nowrap">
                                        Renews April 12, 2026
                                    </span>

                                    <BsDot className="text-gray-400 hidden sm:block" size={20} />

                                    <span className="whitespace-nowrap">
                                        Auto-renew on
                                    </span>

                                </p>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button className="text-[12px] cursor-pointer sm:text-[11px] font-bold underline underline-offset-4 decoration-black hover:text-primary transition-all w-full  text-left sm:text-right">
                            Change plan
                        </button>

                    </div>
                    {/* --- STATUS TABLE --- */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                        {/* Status Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 p-6 border-b border-gray-100 items-start">
                            <div className="md:col-span-3 text-[13px] text-[#6b6b66] py-1 ff-font-bold">Status</div>
                            <div className="md:col-span-9">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-2 h-2 bg-[#22c55e] rounded-full"></div>
                                    <span className="ff-font font-bold text-[12px] uppercase tracking-wider">Active</span>
                                </div>
                                <p className="text-[13px] ff-font text-gray-500">Your subscription is in good standing.</p>
                            </div>
                        </div>

                        {/* Billing Date Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 p-6 border-b border-gray-100 items-start">
                            <div className="md:col-span-3 text-[13px] text-[#6b6b66] py-1 ff-font-bold">Next billing date</div>
                            <div className="md:col-span-6">
                                <p className="font-bold text-[14px] mb-1 ff-font">April 12, 2026</p>
                                <p className="text-[13px] text-gray-500 ff-font">You'll be charged $249.00 on this date.</p>
                            </div>
                            <div className="md:col-span-3 md:text-right mt-4 md:mt-0">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer">Manage renewal</button>
                            </div>
                        </div>

                        {/* Payment Method Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 p-6 border-b border-gray-100 items-start">
                            <div className="md:col-span-3 text-[13px] text-[#6b6b66] py-1 ff-font-bold">Payment method</div>
                            <div className="md:col-span-6 flex items-center gap-4">
                                <div className="bg-[#1a1f71] p-1.5 rounded-md">
                                    <div className="text-white text-[10px] font-black italic leading-none">VISA</div>
                                </div>
                                <div>
                                    <p className="font-bold text-[15px] ff-font">Visa ending in 4242</p>
                                    <p className="text-[13px] text-gray-500 ff-font">Expires 08 / 2027</p>
                                </div>
                            </div>
                            <div className="md:col-span-3 md:text-right mt-4 md:mt-0">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer">Update</button>
                            </div>
                        </div>

                        {/* Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-12 p-6 items-start">
                            <div className="md:col-span-3 text-[13px] text-[#6b6b66] py-1 ff-font-bold">Billing email</div>
                            <div className="md:col-span-6">
                                <p className="font-bold text-[14px] mb-1 ff-font">gargi.p@example.com</p>
                                <p className="text-[13px] text-gray-500 ff-font">Receipts and renewal notices are sent here.</p>
                            </div>
                            <div className="md:col-span-3 md:text-right mt-4 md:mt-0">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer">Change</button>
                            </div>
                        </div>
                    </div>

                    {/* --- CHANGE PLAN SECTION --- */}
                    <div className="pt-5">

                        {/* Header */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-6">
                            <p className="text-[10px] sm:text-[11px] uppercase  text-gray-500 font-bold whitespace-nowrap">
                                CHANGE PLAN
                            </p>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                        </div>

                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

                            {/* Plan 1 */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group gap-4">

                                <div className="flex items-start gap-3 sm:gap-5 w-full">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full mt-1 shrink-0"></div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[14px] sm:text-[15px]">Step 1 only</h4>
                                        <p className="text-[12px] sm:text-[13px] text-gray-500">
                                            All Step 1 subjects · 2,400+ practice questions · Visual flashcards
                                        </p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right">
                                    <p className="font-bold text-base sm:text-lg">$149</p>
                                    <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase font-bold">
                                        per year
                                    </p>
                                </div>
                            </div>

                            {/* Plan 2 */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-[#fffcf0] gap-4">

                                <div className="flex items-start gap-3 sm:gap-5 w-full">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-[5px] border-primary bg-black rounded-full mt-1 shrink-0"></div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[14px] sm:text-[15px]">Step 1 + Step 2</h4>
                                        <p className="text-[12px] sm:text-[13px] text-gray-500">
                                            Everything in Step 1 · All Step 2 CK subjects · 5,000+ questions · Mock exams
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center sm:items-start justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                    <div className="text-left sm:text-right">
                                        <p className="font-bold">$249</p>
                                        <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase font-bold mt-1">
                                            per year
                                        </p>
                                    </div>

                                    <span className="bg-primary px-2 py-1 text-[9px] font-black rounded-md whitespace-nowrap">
                                        CURRENT
                                    </span>
                                </div>
                            </div>

                            {/* Plan 3 */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer group gap-4">

                                <div className="flex items-start gap-3 sm:gap-5 w-full">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full mt-1 shrink-0"></div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[14px] sm:text-[15px]">1:1 Mentorship</h4>
                                        <p className="text-[12px] sm:text-[13px] text-gray-500">
                                            Everything in Step 1 + 2 · Monthly 1:1 with physician · Personalized study plan
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center sm:items-start justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                    <div className="text-left sm:text-right">
                                        <p className="font-bold">$899</p>
                                        <p className="text-[10px] sm:text-[11px] text-gray-400 uppercase font-bold mt-1">
                                            per year
                                        </p>
                                    </div>

                                    <span className="bg-gray-200 px-2 py-1 text-[10px]  rounded-md whitespace-nowrap">
                                        UPGRADE
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-4 text-[11px] sm:text-[12px] text-gray-400">
                            Upgrades take effect immediately and are prorated. Downgrades apply at your next renewal date.
                        </p>
                    </div>






                    {/* --- BILLING HISTORY SECTION --- */}
                    <div className="pt-5">

                        {/* Header */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-6">
                            <p className="text-[10px] sm:text-[11px] uppercase  text-gray-500 font-bold whitespace-nowrap">
                                BILLING HISTORY
                            </p>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                        </div>

                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

                            {billingHistory.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 gap-3 ${idx !== billingHistory.length - 1
                                        ? "border-b border-gray-100"
                                        : ""
                                        }`}
                                >

                                    {/* LEFT */}
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-12 text-[13px] sm:text-[14px]">

                                        <span className="text-[#6b6b66] font-bold min-w-[100px] text-[13px] ">
                                            {item.date}
                                        </span>

                                        <span
                                            className={`font-medium ${item.isDiscount ? "" : "text-[#1a1a1a]"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto">

                                        <span
                                            className={`font-bold text-[13px] sm:text-[14px] ${item.isDiscount ? "text-[#22c55e]" : ""
                                                }`}
                                        >
                                            {item.amount}
                                        </span>

                                        <button className="text-[12px] cursor-pointer sm:text-[13px] font-bold underline text-gray-400 hover:text-black transition-colors whitespace-nowrap">
                                            {item.isDiscount ? "—" : "View receipt"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-6 cursor-pointer text-primary font-bold text-sm underline underline-offset-4 decoration-primary">
                            View all billing history →
                        </button>
                    </div>
                    <div className=" h-[1px] w-full bg-gray-200"></div>

                    {/* --- FOOTER ACTIONS --- */}
                    <footer className="pt-1 flex gap-8">
                        <button className="text-[13px] font-bold underline underline-offset-4 text-gray-500 hover:text-black ff-font-bold cursor-pointer">Pause subscription</button>
                        <button className="text-[13px] font-bold underline underline-offset-4 text-gray-500 hover:text-black ff-font-bold cursor-pointer">Cancel membership</button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Membership;