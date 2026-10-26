"use client";

import React from 'react';
import { BsDot } from 'react-icons/bs';
import { FaRegStar } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';

interface MembershipProps {
    onOpenSidebar?: () => void;
}

const Membership: React.FC<MembershipProps> = ({ onOpenSidebar }) => {
    const billingHistory = [
        { date: "Apr 12, 2025", label: "Step 1 + Step 2 — Annual renewal", amount: "$249.00" },
        { date: "Apr 12, 2024", label: "Promotional discount applied", amount: "-$50.00", isDiscount: true },
        { date: "Apr 12, 2024", label: "Step 1 + Step 2 — Annual subscription", amount: "$249.00" },
    ];

    return (
        <div className="min-h-screen ff-font text-[#1a1a1a]">
            <div className="mx-auto px-0">


                {/* --- HEADER --- */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1 sm:gap-4 pb-2 md:pb-10 border-b-0 md:border-b border-gray-200">
                    <div>
                        <p className="text-[10px] sm:text-[12px] font-bold text-[#6b6b66] uppercase ff-font-bold mb-0.5 sm:mb-2 tracking-wider">
                            Account
                        </p>
                        <h1 className="text-[24px] sm:text-[34px] font-bold ff-font-bold tracking-tight text-[#1a1a1a] leading-tight mb-0.5 sm:mb-2">
                            Membership
                        </h1>
                        <p className="text-[12px] sm:text-[14px] ff-font text-[#6b6b66]">
                            Your plan, payment method, and billing history.
                        </p>
                    </div>
                </div>

                <hr className="hidden md:block border-gray-200 mb-10" />

                <div className="space-y-3.5 sm:space-y-6 mt-3 md:mt-0">
                    {/* --- ACCOUNT HOLDER --- */}
                    <div className="border border-gray-200 rounded-2xl p-3 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 bg-white">
                        <div className="flex items-center gap-2.5 sm:gap-5 min-w-0 flex-1">
                            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-primary flex items-center justify-center text-base sm:text-xl font-extrabold ff-font-bold shrink-0 text-black">
                                G
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[9px] sm:text-[11px] ff-font uppercase tracking-widest text-[#6b6b66] font-bold mb-0.5 sm:mb-1">
                                    ACCOUNT HOLDER
                                </p>
                                <div className="flex items-baseline justify-between gap-1">
                                    <h3 className="font-bold text-[14px] sm:text-[17px] ff-font-bold text-[#1a1a1a] leading-tight sm:leading-snug">
                                        Gargi P.
                                    </h3>
                                    {/* Mobile Edit account on top right */}
                                    <button className="sm:hidden text-[11px] cursor-pointer font-bold ff-font text-gray-700 hover:text-primary transition-colors flex items-center gap-0.5 whitespace-nowrap shrink-0">
                                        Edit account <span>→</span>
                                    </button>
                                </div>
                                <p className="text-[10.5px] sm:text-[13px] text-[#6b6b66] mt-0.5 ff-font flex flex-wrap items-center gap-x-1 leading-tight">
                                    <span className="truncate max-w-[150px] sm:max-w-none">gargi.p@example.com</span>
                                    <span className="text-gray-400">·</span>
                                    <span className="whitespace-nowrap">Member since April 2024</span>
                                </p>
                            </div>
                        </div>
                        {/* Desktop Edit account */}
                        <div className="hidden sm:flex shrink-0 items-center">
                            <button className="text-[13px] cursor-pointer font-bold ff-font text-gray-700 hover:text-primary transition-colors flex items-center gap-1 group whitespace-nowrap">
                                Edit account <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* --- CURRENT ACTIVE PLAN CARD --- */}
                    <div className="relative border border-[#ffca00] md:border-l-[6px] md:border-l-primary md:border-gray-200 rounded-xl p-3 sm:p-6 bg-white exam-card-shadow">

                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                            {/* Left */}
                            <div className="flex items-start gap-2.5 sm:gap-5 min-w-0 flex-1">

                                {/* Icon */}
                                <div className="w-8 h-8 sm:w-auto sm:h-auto p-1.5 sm:p-3.5 bg-black rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                                    <FaRegStar className="text-primary fill-primary w-4 h-4 sm:w-5 sm:h-5" />
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-bold text-[13px] sm:text-[20px] text-[#1a1a1a] leading-snug">
                                        USMLE Step 1 + Step 2 — Annual
                                    </h3>

                                    <div className="text-[10px] sm:text-[14px] text-gray-500 mt-0.5 sm:mt-1">
                                        <div className="flex flex-wrap items-center gap-x-1 leading-tight">
                                            <span className="font-bold text-black whitespace-nowrap">
                                                $249.00 / year
                                            </span>

                                            <BsDot className="text-gray-400" size={16} />

                                            <span className="whitespace-nowrap">
                                                Renews April 12, 2026
                                            </span>

                                            <BsDot className="text-gray-400 hidden sm:inline-block" size={20} />

                                            <span className="whitespace-nowrap hidden sm:inline">
                                                Auto-renew on
                                            </span>
                                        </div>
                                        <div className="text-[#64748b] text-[10px] mt-0.5 sm:hidden font-normal">
                                            Auto-renews on
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Button */}
                            <div className="shrink-0 pt-0.5 sm:pt-0">
                                <button className="text-[11px] sm:text-[11px] font-bold underline underline-offset-4 decoration-black hover:text-primary transition-all whitespace-nowrap cursor-pointer">
                                    Change plan
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* --- STATUS TABLE --- */}
                    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                        {/* Status Row */}
                        <div className="flex items-start justify-between sm:grid sm:grid-cols-12 p-3 sm:p-6 border-b border-gray-100 gap-2 sm:gap-0">
                            <div className="w-[82px] sm:w-auto sm:col-span-3 text-[11px] sm:text-[13px] text-[#6b6b66] py-0.5 sm:py-1 ff-font-bold shrink-0">
                                Status
                            </div>
                            <div className="flex-1 min-w-0 sm:col-span-9">
                                <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22c55e] rounded-full shrink-0"></div>
                                    <span className="ff-font font-bold text-[10.5px] sm:text-[12px] uppercase tracking-wider text-[#22c55e]">
                                        ACTIVE
                                    </span>
                                </div>
                                <p className="text-[10px] sm:text-[13px] ff-font text-gray-500 leading-tight">
                                    Your subscription is in good standing.
                                </p>
                            </div>
                        </div>

                        {/* Billing Date Row */}
                        <div className="flex items-start justify-between sm:grid sm:grid-cols-12 p-3 sm:p-6 border-b border-gray-100 gap-2 sm:gap-0">
                            <div className="w-[82px] sm:w-auto sm:col-span-3 text-[11px] sm:text-[13px] text-[#6b6b66] py-0.5 sm:py-1 ff-font-bold shrink-0 leading-tight">
                                Next billing date
                            </div>
                            <div className="flex-1 min-w-0 sm:col-span-6">
                                <div className="flex items-baseline justify-between gap-1">
                                    <p className="font-bold text-[12px] sm:text-[14px] mb-0.5 sm:mb-1 ff-font text-[#1a1a1a]">
                                        April 12, 2026
                                    </p>
                                    <button className="sm:hidden text-[11px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap shrink-0">
                                        Manage renewal
                                    </button>
                                </div>
                                <p className="text-[10px] sm:text-[13px] text-gray-500 ff-font leading-tight">
                                    You'll be charged $249.00 on this date.
                                </p>
                            </div>
                            <div className="hidden sm:block sm:col-span-3 sm:text-right">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap">
                                    Manage renewal
                                </button>
                            </div>
                        </div>

                        {/* Payment Method Row */}
                        <div className="flex items-start justify-between sm:grid sm:grid-cols-12 p-3 sm:p-6 border-b border-gray-100 gap-2 sm:gap-0">
                            <div className="w-[82px] sm:w-auto sm:col-span-3 text-[11px] sm:text-[13px] text-[#6b6b66] py-0.5 sm:py-1 ff-font-bold shrink-0 leading-tight">
                                Payment method
                            </div>
                            <div className="flex-1 min-w-0 sm:col-span-6">
                                <div className="flex items-center justify-between gap-1">
                                    <div className="flex items-center gap-1.5 sm:gap-4 min-w-0">
                                        <div className="bg-[#1a1f71] px-1 sm:px-1.5 py-0.5 rounded shrink-0">
                                            <div className="text-white text-[8px] sm:text-[10px] font-black italic leading-none">VISA</div>
                                        </div>
                                        <p className="font-bold text-[12px] sm:text-[15px] ff-font text-[#1a1a1a] leading-tight truncate">
                                            Visa ending in 4242
                                        </p>
                                    </div>
                                    <button className="sm:hidden text-[11px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap shrink-0">
                                        Update
                                    </button>
                                </div>
                                <p className="text-[10px] sm:text-[13px] text-gray-500 ff-font mt-0.5 sm:mt-1 leading-tight">
                                    Expires 08 / 2027
                                </p>
                            </div>
                            <div className="hidden sm:block sm:col-span-3 sm:text-right">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap">
                                    Update
                                </button>
                            </div>
                        </div>

                        {/* Email Row */}
                        <div className="flex items-start justify-between sm:grid sm:grid-cols-12 p-3 sm:p-6 gap-2 sm:gap-0">
                            <div className="w-[82px] sm:w-auto sm:col-span-3 text-[11px] sm:text-[13px] text-[#6b6b66] py-0.5 sm:py-1 ff-font-bold shrink-0 leading-tight">
                                Billing email
                            </div>
                            <div className="flex-1 min-w-0 sm:col-span-6">
                                <div className="flex items-baseline justify-between gap-1">
                                    <p className="font-bold text-[12px] sm:text-[14px] mb-0.5 sm:mb-1 ff-font text-[#1a1a1a] truncate">
                                        gargi.p@example.com
                                    </p>
                                    <button className="sm:hidden text-[11px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap shrink-0">
                                        Change
                                    </button>
                                </div>
                                <p className="text-[10px] sm:text-[13px] text-gray-500 ff-font leading-tight">
                                    Receipts and renewal notices are sent here.
                                </p>
                            </div>
                            <div className="hidden sm:block sm:col-span-3 sm:text-right">
                                <button className="text-[13px] font-bold underline underline-offset-4 ff-font cursor-pointer text-[#1a1a1a] hover:text-primary whitespace-nowrap">
                                    Change
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- CHANGE PLAN SECTION --- */}
                    <div className="pt-2 sm:pt-5">

                        {/* Header */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3.5 sm:mb-6">
                            <p className="text-[10px] sm:text-[11px] uppercase text-gray-500 font-bold whitespace-nowrap">
                                CHANGE PLAN
                            </p>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                        </div>

                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

                            {/* Plan 1 */}
                            <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group gap-2 sm:gap-4">

                                <div className="flex items-start gap-2 sm:gap-5 flex-1 min-w-0">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full mt-0.5 shrink-0"></div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[12.5px] sm:text-[15px] text-[#1a1a1a]">Step 1 only</h4>
                                        <p className="text-[10px] sm:text-[13px] text-gray-500 leading-tight sm:leading-normal">
                                            All Step 1 subjects · 2,400+ practice questions · Visual flashcards
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="font-bold text-[12.5px] sm:text-lg text-[#1a1a1a]">$149</p>
                                    <p className="text-[8px] sm:text-[11px] text-gray-400 uppercase font-bold leading-tight mt-0.5 whitespace-nowrap">
                                        PER YEAR
                                    </p>
                                </div>
                            </div>

                            {/* Plan 2 */}
                            <div className="flex items-center justify-between p-3 sm:p-6 border-b border-gray-100 bg-[#fffcf0] gap-2 sm:gap-4">

                                <div className="flex items-start gap-2 sm:gap-5 flex-1 min-w-0">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary bg-primary rounded-full mt-0.5 shrink-0 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></div>
                                    </div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[12.5px] sm:text-[15px] text-[#1a1a1a]">Step 1 + Step 2</h4>
                                        <p className="text-[10px] sm:text-[13px] text-gray-500 leading-tight sm:leading-normal">
                                            Everything in Step 1 · All Step 2 CK subjects · 5,000+ questions · Mock exams
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1 sm:gap-3 shrink-0">
                                    <div className="text-right">
                                        <p className="font-bold text-[12.5px] sm:text-base text-[#1a1a1a]">$249</p>
                                        <p className="text-[8px] sm:text-[11px] text-gray-400 uppercase font-bold leading-tight mt-0.5 whitespace-nowrap">
                                            PER YEAR
                                        </p>
                                    </div>

                                    <span className="bg-primary px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[9px] font-black rounded text-black whitespace-nowrap">
                                        CURRENT
                                    </span>
                                </div>
                            </div>

                            {/* Plan 3 */}
                            <div className="flex items-center justify-between p-3 sm:p-6 hover:bg-gray-50 transition-colors cursor-pointer group gap-2 sm:gap-4">

                                <div className="flex items-start gap-2 sm:gap-5 flex-1 min-w-0">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full mt-0.5 shrink-0"></div>

                                    <div className="min-w-0">
                                        <h4 className="font-bold text-[12.5px] sm:text-[15px] text-[#1a1a1a]">1:1 Mentorship</h4>
                                        <p className="text-[10px] sm:text-[13px] text-gray-500 leading-tight sm:leading-normal">
                                            Everything in Step 1 + 2 · Monthly 1:1 with physician · Personalized study plan
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-1 sm:gap-3 shrink-0">
                                    <div className="text-right">
                                        <p className="font-bold text-[12.5px] sm:text-base text-[#1a1a1a]">$899</p>
                                        <p className="text-[8px] sm:text-[11px] text-gray-400 uppercase font-bold leading-tight mt-0.5 whitespace-nowrap">
                                            PER YEAR
                                        </p>
                                    </div>

                                    <span className="bg-[#e9edf5] text-[#475569] px-1.5 py-0.5 sm:px-2 sm:py-1 text-[8px] sm:text-[10px] font-bold rounded whitespace-nowrap">
                                        UPGRADE
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="mt-2.5 sm:mt-4 text-[10px] sm:text-[12px] text-gray-400 leading-normal">
                            Upgrades take effect immediately and are prorated. Downgrades apply at your next renewal date.
                        </p>
                    </div>

                    {/* --- BILLING HISTORY SECTION --- */}
                    <div className="pt-2 sm:pt-5">

                        {/* Header */}
                        <div className="flex items-center gap-3 sm:gap-4 mb-3.5 sm:mb-6">
                            <p className="text-[10px] sm:text-[11px] uppercase text-gray-500 font-bold whitespace-nowrap">
                                BILLING HISTORY
                            </p>
                            <div className="h-[1px] w-full bg-gray-200"></div>
                        </div>

                        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

                            {billingHistory.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`p-2.5 sm:p-5 ${idx !== billingHistory.length - 1 ? "border-b border-gray-100" : ""
                                        }`}
                                >
                                    {/* Desktop Row View */}
                                    <div className="hidden sm:flex sm:items-center justify-between gap-4 text-[14px]">
                                        <div className="flex items-center gap-12 text-[14px]">
                                            <span className="text-[#6b6b66] font-bold min-w-[100px] text-[13px]">
                                                {item.date}
                                            </span>
                                            <span className={`font-medium ${item.isDiscount ? "text-gray-500" : "text-[#1a1a1a]"}`}>
                                                {item.label}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-end gap-6 shrink-0">
                                            <span className={`font-bold text-[14px] ${item.isDiscount ? "text-[#22c55e]" : "text-[#1a1a1a]"}`}>
                                                {item.amount}
                                            </span>
                                            <div className="min-w-[80px] text-right">
                                                {item.isDiscount ? (
                                                    <span className="text-[14px] text-gray-400 font-bold inline-block text-right">=</span>
                                                ) : (
                                                    <button className="text-[13px] font-bold underline text-gray-400 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                                                        View receipt
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile Row View (320px to 639px) */}
                                    <div className="sm:hidden flex items-center justify-between gap-1.5 text-[10.5px]">
                                        <span className="text-[#6b6b66] font-semibold text-[10px] shrink-0 w-[58px]">
                                            {item.date}
                                        </span>
                                        <span className={`font-medium min-w-0 flex-1 truncate pr-1 leading-tight ${item.isDiscount ? "text-gray-500" : "text-[#1a1a1a]"}`}>
                                            {item.label}
                                        </span>
                                        <div className="flex items-center justify-end gap-1.5 shrink-0">
                                            <span className={`font-bold text-[10.5px] whitespace-nowrap ${item.isDiscount ? "text-[#22c55e]" : "text-[#1a1a1a]"}`}>
                                                {item.amount}
                                            </span>
                                            <div className="w-[52px] text-right shrink-0">
                                                {item.isDiscount ? (
                                                    <span className="text-[12px] text-gray-400 font-bold inline-block text-right pr-2">=</span>
                                                ) : (
                                                    <button className="text-[9.5px] font-bold underline text-gray-400 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                                                        View receipt
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-3.5 sm:mt-6 cursor-pointer text-primary font-bold text-[12px] sm:text-sm underline underline-offset-4 decoration-primary flex items-center gap-1">
                            View all billing history →
                        </button>
                    </div>

                    <div className="hidden sm:block h-[1px] w-full bg-gray-200"></div>

                    {/* --- FOOTER ACTIONS --- */}
                    <footer className="pt-2 sm:pt-1 flex gap-5 sm:gap-8 pb-8 sm:pb-0">
                        <button className="text-[11.5px] sm:text-[13px] font-bold underline underline-offset-4 text-gray-500 hover:text-black ff-font-bold cursor-pointer">
                            Pause subscription
                        </button>
                        <button className="text-[11.5px] sm:text-[13px] font-bold underline underline-offset-4 text-gray-500 hover:text-black ff-font-bold cursor-pointer">
                            Cancel membership
                        </button>
                    </footer>
                </div>
            </div>
        </div>
    );
};

export default Membership;