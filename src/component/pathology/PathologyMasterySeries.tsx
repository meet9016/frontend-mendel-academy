'use client';
import React from 'react'
import { FaAward, FaBookOpen, FaChevronDown, FaClock, FaMoneyBillWave, FaRegStar, FaUsers, FaVideo } from 'react-icons/fa';

const PathologyMasterySeries = () => {
    return (
        <>
            <section className="relative py-5 overflow-hidden bg-[#f9fafb]">
                <div
                    className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#f0b100]/10 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-6 animate-fade-in-up">
                        <div className="inline-block text-center">
                            <h2 className="text-5xl md:text-5xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-[#f0b100] to-yellow-600 bg-clip-text text-transparent">
                                    Pathology Mendel
                                </span>{' '}
                                <span className="text-foreground">Mastery Series™</span>
                            </h2>
                            <div className="h-1 bg-gradient-to-r from-transparent via-[#f0b100] to-transparent rounded-full mx-auto w-3/4" />
                        </div>


                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                            Watch & Learn Anytime
                        </p>

                        <p className="text-base text-gray-500 max-w-2xl mx-auto">
                            Your all-in-one, deep-dive into each pathology subject—covering everything you need to master topics like Lymphomas, case by case.
                        </p>

                        {/* Features Bar */}
                        <div className="flex flex-wrap justify-center gap-4 pt-6">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#f0b100]/10 rounded-full border border-[#f0b100]/20">
                                <FaVideo className="w-4 h-4 text-[#f0b100]" />
                                <span className="text-sm font-medium text-[#333]">HD Video Lectures</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100/30 rounded-full border border-yellow-300/50">
                                <FaClock className="w-4 h-4 text-yellow-600" />
                                <span className="text-sm font-medium text-[#333]">23+ Hours Content</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-orange-100/30 rounded-full border border-orange-300/50">
                                <FaAward className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-[#333]">CME Certified</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Cards */}
                    <div className="relative mb-16">
                        {/* Left Arrow */}
                        <button
                            onClick={() =>
                                document.getElementById("courseScroll")?.scrollBy({ left: -350, behavior: "smooth" })
                            }
                            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-[#f0b100]/40 text-[#f0b100] p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
                        >
                            <FaChevronDown className="rotate-90 w-5 h-5" />
                        </button>

                        {/* Scrollable Container */}
                        <div
                            id="courseScroll"
                            className="flex gap-8 overflow-x-hidden scroll-smooth no-scrollbar px-12"
                            style={{ scrollSnapType: "x mandatory" }}
                        >
                            {Array(8) // you can have more, but 4 show at once
                                .fill({
                                    id: 1,
                                    category: "HEMATOPATHOLOGY",
                                    title: "MENDEL MASTERY SERIES™: LYMPHOMAS",
                                    desc: "Curriculum aligned with WHO 5th Ed. Blue Book",
                                    rating: 4.3,
                                    learners: "50+ learners",
                                    duration: "6 months access",
                                    price: "59.99",
                                    color: "from-[#f0b100] to-[#ffcc33]",
                                    icon: "https://www.snexplores.org/wp-content/uploads/2020/05/1030_SS_amoeba-1028x579.png",
                                    features: [
                                        { name: "E-certificate included", icon: "🎓" },
                                        { name: "CV + CME friendly", icon: "🎥" },
                                        { name: "One-time payment", icon: "💳" },
                                    ],
                                })
                                .map((course, i) => (
                                    <div
                                        key={i}
                                        className="w-[320px] flex-shrink-0 scroll-snap-align-start group relative bg-white rounded-2xl overflow-hidden border border-[#f0b100]/20 shadow-[0_4px_10px_rgba(240,177,0,0.08)] hover:shadow-[0_6px_18px_rgba(240,177,0,0.15)] transition-all duration-500"
                                    >
                                        {/* Glow Border on Hover */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#f0b100]/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity" />

                                        <div className="relative z-10 flex flex-col h-full">
                                            {/* Image Section */}
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <img
                                                    src={course.icon}
                                                    alt={course.title}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-transparent"></div>
                                                <div className="absolute top-4 left-4 bg-white/80 text-[#b8860b] text-xs font-semibold px-3 py-1 border border-[#f0b100]/30 rounded-full backdrop-blur-sm">
                                                    {course.category}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col justify-between flex-1 bg-gray-100">
                                                <div>
                                                    <h3 className="text-lg font-bold leading-tight text-gray-800 min-h-[48px] mb-2">
                                                        {course.title}
                                                    </h3>

                                                    <div className="mb-3">
                                                        <p className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                                                            <FaBookOpen className="w-4 h-4 text-[#f0b100]" />
                                                            {course.desc}
                                                        </p>
                                                        <div className="border-b border-[#f0b100]/20"></div>
                                                    </div>

                                                    {/* Rating & Learners */}
                                                    <div className="mb-3">
                                                        <div className="flex items-center justify-between text-sm text-gray-700 whitespace-nowrap">
                                                            <div className="flex items-center gap-2 text-[#f0b100]">
                                                                <FaRegStar className="w-4 h-4" />
                                                                <span className="font-medium text-gray-800">{course.rating}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FaUsers className="w-4 h-4 text-[#f0b100]" />
                                                                <span className="text-gray-700">{course.learners}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 border-b border-[#f0b100]/20"></div>
                                                    </div>

                                                    {/* Duration & Price */}
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-sm text-gray-500">{course.duration}</p>
                                                        <p className="text-2xl font-bold text-black">{`$${course.price}`}</p>
                                                    </div>

                                                    {/* Features */}
                                                    <div className="flex items-center justify-center text-xs text-gray-600 mt-3 gap-5">
                                                        {course.features.map((f: any) => (
                                                            <div key={f.name} className="flex flex-col items-center text-center my-1">
                                                                <span className="py-1">{f.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex flex-col gap-3 mt-4">
                                                    <button className="flex items-center justify-between w-full border border-[#f0b100]/40 rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-[#fff9e6] transition-all">
                                                        What You'll Learn <FaChevronDown className="w-4 h-4 text-[#f0b100]" />
                                                    </button>

                                                    <button
                                                        disabled
                                                        className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[#f0b100] to-[#ffcc33] text-white font-semibold shadow hover:opacity-90 transition-all"
                                                    >
                                                        Coming Soon
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() =>
                                document.getElementById("courseScroll")?.scrollBy({ left: 350, behavior: "smooth" })
                            }
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-[#f0b100]/40 text-[#f0b100] p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
                        >
                            <FaChevronDown className="-rotate-90 w-5 h-5" />
                        </button>
                    </div>


                    {/* Bundle Offer */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-20" />
                        <div className="relative bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-300 p-8 md:p-12 shadow-md">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                                    <FaMoneyBillWave className="w-8 h-8" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
                                        Bundle more. Save more.
                                    </h3>
                                    <p className="text-lg text-gray-600 mb-4">
                                        Add one more Mendel Mastery course and get{" "}
                                        <span className="font-bold text-gray-900">10% OFF</span>. Bundle all 3
                                        and save up to <span className="font-bold text-gray-900">20%</span>.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <span className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-medium">
                                            1 course = regular price
                                        </span>
                                        <span className="px-4 py-2 rounded-full bg-yellow-100 border border-yellow-400 text-sm font-bold">
                                            2 courses = 10% off
                                        </span>
                                        <span className="px-4 py-2 rounded-full bg-orange-100 border border-orange-400 text-sm font-bold">
                                            3 courses = 20% off
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-4 italic">
                                        Discount applied automatically at checkout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PathologyMasterySeries