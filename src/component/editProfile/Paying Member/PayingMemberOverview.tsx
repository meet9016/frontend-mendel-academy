"use client";

import { useRouter } from "next/navigation";
import {
    FiClock,
    FiMail,
    FiSettings,
    FiBell,
    FiCreditCard,
    FiChevronRight,
    FiEdit2,
    FiShield,
    FiActivity,
    FiPlay,
    FiTarget,
    FiRefreshCw,
    FiLock,
    FiEdit3
} from "react-icons/fi";
const PayingMemberOverview = () => {
    const router = useRouter();
    const products = [
        { title: "Step 1 — Immunology", progress: 68, info: "68% complete", subInfo: "142 questions remaining", status: "ACTIVE", icon: <FiTarget size={20} /> },
        { title: "Step 1 — Microbiology", progress: 42, info: "42% complete", subInfo: "218 questions remaining", status: "ACTIVE", icon: <FiShield size={20} /> },
        { title: "Step 2 — Internal medicine", progress: 0, info: "Starts May 1, 2026", subInfo: "0 of 460 questions", status: "UPCOMING", icon: <FiActivity size={20} /> },
    ];

    const links = [
        { icon: <FiRefreshCw size={18} />, label: "Change plan", sub: "Switch tier or billing cycle" },
        { icon: <FiLock size={18} />, label: "Update password", sub: "Last changed 3 months ago" },
        { icon: <FiCreditCard size={18} />, label: "Billing & receipts", sub: "View payment history" },
        { icon: <FiBell size={18} />, label: "Notifications & preferences", sub: "Email digests, reminders, language" },
    ];
    return (
        <>
            <div className="space-y-6">
                {/* ================= TOP TRIAL BAR ================= */}
                <div className="w-full bg-black  border-t-4 border-primary text-white rounded-xl p-6 md:px-8 md:py-6 flex flex-col md:flex-row justify-between items-center gap-6 ">

                    {/* Left side: Icon + Content */}
                    <div className="flex items-start md:items-center gap-5 w-full md:w-auto">
                        {/* Yellow Box Icon */}
                        <div className="bg-primary text-black p-3.5 rounded-lg flex-shrink-0 shadow-[0_0_15px_rgba(255,202,0,0.2)]">
                            <FiPlay size={24} />
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col space-y-1">
                            {/* Badge with Dot */}
                            <div className="flex items-center gap-2">

                                <span className="text-[10px] font-bold text-[#FFCA00] tracking-[0.15em] uppercase">
                                    Pick up where you left off
                                </span>
                            </div>

                            {/* Heading */}
                            <h2 className="text-white text-[19px] md:text-2xl font-bold tracking-tight">
                                Continue Step 1 — Immunology
                            </h2>

                            {/* Subtext */}
                            <p className="text-gray-400 text-sm md:text-base font-medium">
                                You're on a 12-day streak. Last studied: hypersensitivity reactions, 47 minutes ago.
                            </p>
                        </div>
                    </div>

                    {/* Right side: Buttons */}
                    <div className="flex gap-3 w-full md:w-auto shrink-0">
                        <button
                        onClick={() => router.push('/flash-card')}
                        className="flex-1 md:flex-none cursor-pointer flex ff-font items-center justify-center gap-2 px-6 py-2.5 border border-gray-600 rounded-lg text-sm  hover:bg-white/5 transition-all">
                            <FiPlay size={14} className="fill-current" /> Go to app
                        </button>

                    </div>
                </div>

                {/* ================= HEADER ================= */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 pb-8 border-b border-gray-200">
                    <div>
                        <p className="text-[12px] font-bold text-[#6b6b66] uppercase ff-font-bold  mb-2">
                            Account
                        </p>
                        <h1 className="text-[34px] font-bold ff-font-bold tracking-tight text-[#1a1a1a]">
                            Welcome back, Gargi.
                        </h1>
                        <p className="text-[14px] ff-font text-[#6b6b66]">
                            Here's what's happening with your studies today.
                        </p>
                    </div>

                    <button className="flex cursor-pointer items-center gap-2 border border-gray-300  ff-font-bold px-4 py-2 rounded-lg text-sm font-medium w-fit sm:w-auto">
                        <FiEdit2 size={14} />
                        Edit profile
                    </button>
                </div>

                {/* ================= MEMBERSHIP DETAILS ================= */}
                <section className="ff-font">
                    {/* Header with Line */}
                    <div className="flex items-center gap-4 mb-4">
                        <p className="text-[11px] font-medium text-[#6b6b66] uppercase tracking-widest whitespace-nowrap">
                            Membership Details
                        </p>
                        <div className="h-[1px] bg-gray-200 w-full"></div>
                    </div>


                    {/* Card */}
                    <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center border border-gray-200 relative overflow-hidden">

                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"></div>

                        <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#FFF9E5] rounded-full opacity-60 z-0"></div>

                        <div className="relative z-10 space-y-1">
                            <div className="inline-flex items-center gap-2 bg-black text-primary text-[10px] font-semibold px-3 py-1.5 rounded uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full "></span>
                                Member since April 2024
                            </div>

                            <h2 className="text-[22px] font-semibold ff-font-bold text-[#1a1a1a]">
                                USMLE Step 1 + Step 2 — Annual
                            </h2>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
                                <span>Active subscription</span>
                                <span className="text-gray-300">•</span>
                                <span>Renews April 12, 2026</span>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-500 underline decoration-dotted underline-offset-4">Auto-renew on</span>
                            </div>
                        </div>

                        {/* Right Content */}
                        <div className="relative z-10 text-center md:text-right mt-8 md:mt-0 flex flex-col items-center md:items-end">
                            <div className="flex flex-col items-center md:items-end">
                                <div className="flex items-start">

                                    <span className="text-[20px] font-bold  text-[#1a1a1a]">
                                        $249
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium mt-1 tracking-wide">
                                    per year
                                </p>
                            </div>

                            <button className="flex items-center cursor-pointer gap-2 bg-white border border-gray-200 px-4 py-2 mt-5 rounded-lg text-sm  ff-font-bold ">
                                Manage membership
                                <span>→</span>
                            </button>
                        </div>
                    </div>
                </section>






                {/* ================= BOTTOM GRID ================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-0">

                    {/* QUICK LINKS SECTION */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <p className="text-[11px] font-bold text-[#6b6b66] uppercase tracking-widest whitespace-nowrap">
                                Quick Link
                            </p>
                            <div className="h-[1px] bg-gray-200 w-full"></div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            {links.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-[#FFF8E7] text-gray-700 p-3 rounded-xl shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <p className="text-[14px] ff-font-bold text-gray-900">{item.label}</p>
                                            <p className="text-[12px] ff-font-bold text-gray-400 font-medium">{item.sub}</p>
                                        </div>
                                    </div>
                                    <FiChevronRight size={18} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* STUDENT PROFILE SECTION */}
                    <section>
                        <div className="flex items-center gap-4 mb-4">
                            <p className="text-[11px] font-bold text-[#6b6b66] uppercase tracking-widest whitespace-nowrap">
                                Student Profile
                            </p>
                            <div className="h-[1px] bg-gray-200 w-full"></div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[356px]">
                            {/* Profile Header */}
                            <div className="p-6 pb-4">
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="bg-[#FFCA00] w-16 h-16 flex items-center justify-center rounded-full text-2xl font-bold text-gray-900 ff-font-bold">
                                        G
                                    </div>
                                    <div>
                                        <p className="text-[18px] ff-font-bold font-bold text-gray-900">Gargi P.</p>
                                        <p className="text-[13px] ff-font-bold text-gray-400 font-medium">
                                            USMLE candidate • MS3
                                        </p>
                                    </div>
                                </div>

                                {/* Info Table */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <p className="text-[13px] ff-font-bold text-gray-400 font-medium">Email</p>
                                        <p className="text-[13px] font-bold ff-font text-gray-800 tracking-tight">gargi.p@example.com</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[13px] ff-font-bold  text-gray-400 font-medium">Target exam date</p>
                                        <p className="text-[13px] font-bold ff-font text-gray-800">June 14, 2026</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[13px] ff-font-bold  text-gray-400 font-medium">Time zone</p>
                                        <p className="text-[13px] font-bold ff-font text-gray-800">PST (UTC-8)</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-[13px] ff-font-bold  text-gray-400 font-medium">Member since</p>
                                        <p className="text-[13px] font-bold ff-font text-gray-800">April 2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Button Footer */}
                            <div className="mt-auto bg-[#F9F9F7] px-6 py-4 border-t border-gray-50">
                                <button className="flex items-center gap-2 text-[13px] font-bold text-gray-700 hover:text-black transition-colors group">
                                    <FiEdit3 size={16} className="text-gray-500 ff-font-bold  group-hover:text-black" />
                                    Edit profile details
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

                {/* ================= CONTACT SECTION ================= */}
                <div className="bg-black text-white border-t-4 border-primary rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center shadow-xl ">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] font-bold ff-font-bold  text-primary uppercase tracking-[0.2em] mb-2">Contact us</p>
                        <h3 className="text-xl ff-font font-bold mb-2">
                            Questions about your studies or account?
                        </h3>
                        <p className="text-sm text-gray-400 ff-font max-w-md">
                            Our support team is here to help — whether it's a question about a course, a billing issue, or feedback. Email us at <span className="text-primary underline cursor-pointer">info@mendelacademy.com</span> and we'll typically reply within one business day.
                        </p>
                    </div>

                    <button className="mt-6 cursor-pointer md:mt-0 flex ff-font-bold  items-center gap-2 bg-primary text-black px-8 py-3 rounded-md text-sm font-bold ">
                        <FiMail size={18} />
                        Email support
                    </button>
                </div>
            </div>
        </>
    )
}
export default PayingMemberOverview;