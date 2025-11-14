'use client';
import CommonButton from '@/comman/Button';
import React from 'react'
import { FaAward, FaBookOpen, FaChevronDown, FaClock, FaMoneyBillWave, FaRegStar, FaUsers, FaVideo } from 'react-icons/fa';

const PathologyMasterySeries = () => {
    return (
        <>
            <section className="relative py-15 overflow-hidden bg-[#f9fafb]">
                <div
                    className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#f0b100]/10 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "1s" }}
                />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-6 animate-fade-in-up">
                        <div className="inline-block text-center">
                            <h2 className="text-5xl md:text-5xl font-bold mb-4">
                                <span className="ff-font-bold ">
                                    Pathology Mendel
                                </span>{' '}
                                <span className="text-foreground">Mastery Series™</span>
                            </h2>
                            <div className="h-1 bg-gradient-to-r from-transparent via-[#FFCA00] to-transparent rounded-full mx-auto w-3/4" />

                        </div>


                        <p className="text-xl md:text-2xl text-black ff-font max-w-3xl mx-auto">
                            Watch & Learn Anytime
                        </p>

                        <p className="text-base text-black ff-font max-w-2xl mx-auto">
                            Your all-in-one, deep-dive into each pathology subject—covering everything you need to master topics like Lymphomas, case by case.
                        </p>

                        {/* Features Bar */}
                        <div className="flex flex-wrap justify-center gap-4 pt-6">
                            <div className="flex items-center gap-2 px-4 py-2  rounded-full border border-primary">
                                <FaVideo className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium ">HD Video Lectures</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2  rounded-full border border-primary">
                                <FaClock className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium ">23+ Hours Content</span>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2  rounded-full border border-primary">
                                <FaAward className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium ">CME Certified</span>
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
                            className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
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
                                                <div className="absolute top-4 left-4 bg-white/80 text-black ff-font-bold  text-xs font-semibold px-3 py-1 border border-[#f0b100]/30 rounded-full backdrop-blur-sm">
                                                    {course.category}
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="p-6 flex flex-col justify-between flex-1 bg-gray-100">
                                                <div>
                                                    <h3 className="text-lg  leading-tight ff-font-bold  min-h-[48px] mb-2">
                                                        {course.title}
                                                    </h3>

                                                    <div className="mb-3">
                                                        <p className="text-sm text-black ff-font flex items-center gap-2 mb-2">
                                                            <FaBookOpen className="w-4 h-4 text-primary" />
                                                            {course.desc}
                                                        </p>
                                                        <div className="border-b border-[#f0b100]/20"></div>
                                                    </div>

                                                    {/* Rating & Learners */}
                                                    <div className="mb-3">
                                                        <div className="flex items-center justify-between text-sm text-black whitespace-nowrap">
                                                            <div className="flex items-center gap-2 text-primary">
                                                                <FaRegStar className="w-4 h-4" />
                                                                <span className="font-medium ff-font text-black">{course.rating}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <FaUsers className="w-4 h-4 text-primary" />
                                                                <span className="text-black ff-font" >{course.learners}</span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 border-b border-[#f0b100]/20"></div>
                                                    </div>

                                                    {/* Duration & Price */}
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-sm text-black ff-font">{course.duration}</p>
                                                        <p className="text-2xl font-bold ff-font-bold  text-black">{`$${course.price}`}</p>
                                                    </div>

                                                    {/* Features */}
                                                    <div className="flex items-center justify-center text-xs text-black mt-3 gap-5">
                                                        {course.features.map((f: any) => (
                                                            <div key={f.name} className="flex flex-col items-center text-center my-1">
                                                                <span className="py-1 ff-font">{f.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Buttons */}
                                                <div className="flex flex-col gap-3 mt-4">
                                                    <button className="flex items-center justify-between w-full border border-[#f0b100]/40 rounded-md px-4 py-2 text-sm text-black ff-font hover:bg-[#fff9e6] transition-all">
                                                        What You'll Learn <FaChevronDown className="w-4 h-4 text-primary" />
                                                    </button>

                                                    {/* <button
                                                        disabled
                                                        className="text-sm px-4 py-2 rounded-md bg-gradient-to-r from-[#f0b100] to-[#ffcc33] text-white font-semibold shadow hover:opacity-90 transition-all"
                                                    >
                                                        Coming Soon
                                                    </button> */}
                                                    <CommonButton pyClass="py-3" pxClass="px-22" fontWeight={700} fontSize={15}>
                                                        Enroll Now
                                                    </CommonButton>
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
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/90 border border-[#f0b100]/40 text-primary p-3 rounded-full shadow-md hover:bg-[#fff7db] transition"
                        >
                            <FaChevronDown className="-rotate-90 w-5 h-5" />
                        </button>
                    </div>


                    {/* Bundle Offer */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                        {/* <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl blur-lg opacity-20" /> */}
                        <div className="relative bg-white rounded-2xl border border-primary p-8 md:p-12 shadow-md">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                                    <FaMoneyBillWave className="w-8 h-8" />
                                </div> */}
                                <div className="mt-1 p-3 w-16 h-16 rounded-xl flex items-center justify-center border-primary group-hover:scale-110 transition-transform duration-300">
                                    <FaMoneyBillWave className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2 ff-font-bold ">
                                        Bundle more. Save more.
                                    </h3>
                                    <p className="text-lg ff-font mb-4">
                                        Add one more Mendel Mastery course and get{" "}
                                        <span className="font-bold ff-font-bold ">10% OFF</span>. Bundle all 3
                                        and save up to <span className="font-bold ff-font-bold ">20%</span>.
                                    </p>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                        <span className="px-4 py-2 ff-font rounded-full border-primary text-sm font-medium">
                                            1 course = regular price
                                        </span>
                                        <span className="px-4 py-2 ff-font-bold  rounded-full border-primary text-sm font-bold">
                                            2 courses = 10% off
                                        </span>
                                        <span className="px-4 py-2 ff-font rounded-full border-primary text-sm font-bold">
                                            3 courses = 20% off
                                        </span>
                                    </div>
                                    <p className="text-sm ff-font mt-4">
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