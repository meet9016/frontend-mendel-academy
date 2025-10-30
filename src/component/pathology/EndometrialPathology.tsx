'use client';
import React from 'react'
import { FaArrowRight, FaAward, FaBookOpen, FaCalendarAlt, FaChartLine, FaCheckCircle, FaClock, FaComments, FaFileAlt, FaMagic, FaStar, FaUser, FaUserGraduate, FaVideo } from 'react-icons/fa';
import { FaSprayCanSparkles } from 'react-icons/fa6';

const EndometrialPathology = () => {
    const masterFeatures = [
        { icon: FaCheckCircle, text: 'Diagnose complex endometrial pathologies' },
        { icon: FaCheckCircle, text: 'Navigate challenging cases with confidence' },
        { icon: FaCheckCircle, text: 'Apply latest diagnostic criteria' },
        { icon: FaCheckCircle, text: 'Build systematic approach to evaluation' },
    ];
    const courseIncludes = [
        { icon: FaVideo, text: '16 Live Interactive Sessions' },
        { icon: FaBookOpen, text: 'Recorded Lectures Access' },
        { icon: FaAward, text: 'Digital Certificate' },
        { icon: FaFileAlt, text: 'Case Study Library' },
        { icon: FaClock, text: 'Lifetime Access' },
        { icon: FaComments, text: 'Expert Q&A Support' },
    ];

    const stats = [
        { icon: FaUser, value: '64', label: 'Students Enrolled' },
        { icon: FaClock, value: '8 weeks', label: 'Program Duration' },
        { icon: FaAward, value: '36', label: 'Left This Week' },
    ];
    return (
        <>
            {/* --- ADVANCED ENDOMETRIAL PATHOLOGY PROGRAM --- */}
            <section className="bg-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12 space-y-4 animate-fade-in-up">
                        {/* Badge Above Heading */}
                        <div className="inline-flex items-center gap-2 bg-[#f97316] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                            <FaSprayCanSparkles className="w-4 h-4 text-white" />
                            Now Accepting Applications
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl md:text-5xl font-bold leading-tight">
                            Advanced Endometrial <br />
                            <span className="bg-gradient-to-r from-[#f0b100] to-yellow-600 bg-clip-text text-transparent">
                                Pathology Program
                            </span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive training designed to enhance diagnostic
                            confidence in complex endometrial pathology.
                        </p>
                    </div>


                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Left Image Card */}
                        <div className="lg:col-span-5 animate-slide-in-left">
                            <div className="bg-white/70 rounded-3xl overflow-hidden shadow-lg border border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500 relative">

                                {/* Image */}
                                <div className="relative h-72 overflow-hidden rounded-t-3xl">
                                    <img
                                        src="https://www.snexplores.org/wp-content/uploads/2020/05/1030_SS_amoeba-1028x579.png"
                                        alt="Endometrial pathology specimen"
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                </div>

                                {/* ✅ Stats Section moved below image (fully visible now) */}
                                <div className="grid grid-cols-3 gap-3 w-[90%] mx-auto -mt-8 relative z-10">
                                    {stats.map((stat, i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-2xl p-4 text-center border border-[#f0b100]/30 shadow-md hover:shadow-lg transition-all"
                                        >
                                            <stat.icon className="w-6 h-6 mx-auto text-[#f0b100] mb-2" />
                                            <div className="text-2xl font-bold">{stat.value}</div>
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Schedule and Testimonial Section */}
                                <div className="p-6 space-y-6 mt-4">
                                    {/* Next Session Card */}
                                    <div className="bg-[#f0b100] text-white p-5 rounded-2xl shadow-md">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm opacity-80">Next Session</span>
                                            <div className="bg-white/20 text-white flex items-center gap-1 px-2 py-1 rounded-md text-sm">
                                                <FaCalendarAlt className="w-3 h-3" /> Live
                                            </div>
                                        </div>
                                        <div className="text-xl font-bold">Thursday, Sep 11</div>
                                        <div>9:00 PM GMT+5:30</div>
                                    </div>

                                    {/* Testimonial Card */}
                                    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 shadow-sm">
                                        <div className="flex gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-[#f0b100]" />
                                            ))}
                                        </div>
                                        <p className="italic text-gray-700 mb-2">
                                            "Dramatically improved my diagnostic confidence"
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            – <span className="font-semibold text-gray-800">Dr. Sarah Chen</span>, Pathologist
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Right Details */}
                        <div className="lg:col-span-7 space-y-8 animate-slide-in-right">
                            <div className="bg-white/70 rounded-3xl p-8 shadow-lg border border-[#f0b100]/30 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
                                <h2 className="text-3xl font-bold mb-4 text-[#f0b100]">
                                    Interpretation of Endometrial Biopsies
                                </h2>
                                <p className="text-muted-foreground mb-6">
                                    Master the complexities of endometrial pathology
                                    with confidence and precision.
                                </p>

                                {/* Instructor */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
                                    <div className="flex gap-4 items-center mb-4">
                                        <img
                                            src="https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg"
                                            alt="Dr. Nandkishore Managoli"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-[#f0b100]"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                Dr. Nandkishore Managoli
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                MD, Senior Surgical & Digital Pathologist
                                            </p>
                                        </div>
                                    </div>

                                    {/* Experience + Students */}
                                    <div className="flex items-center gap-6 text-sm text-gray-700 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FaAward className="text-[#f0b100]" />
                                            <span>30+ Years Experience</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaUserGraduate className="text-[#f0b100]" />
                                            <span>1000+ Students Taught</span>
                                        </div>
                                    </div>

                                    {/* Quote */}
                                    <div className="border-l-4 border-[#f0b100] pl-4 italic text-gray-600 text-sm">
                                        "Focused on advancing diagnostic accuracy through systematic evaluation
                                        approaches and evidence-based practice."
                                    </div>
                                </div>

                                {/* What You'll Master */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <FaChartLine className="w-5 h-5 text-[#f0b100]" />
                                        What You'll Master:
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {masterFeatures.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 bg-[#f0b100]/5 p-3 rounded-xl border border-[#f0b100]/20 hover:bg-[#f0b100]/10 transition-all"
                                            >
                                                <item.icon className="w-5 h-5 text-[#f0b100]" />
                                                <span className="text-sm">
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Course Includes */}
                                <div className="pt-6">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        <FaMagic className="w-5 h-5 text-[#f0b100]" />
                                        Course Includes:
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {courseIncludes.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 bg-[#f0b100]/5 border border-[#f0b100]/20 rounded-xl p-3 hover:bg-[#f0b100]/10 transition-all"
                                            >
                                                <item.icon className="w-4 h-4 text-[#f0b100]" />
                                                <span className="text-sm">
                                                    {item.text}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="bg-[#f0b100] rounded-3xl p-8 text-white shadow-md relative overflow-hidden group">
                                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-2xl font-bold mb-2">Register Now</h3>
                                        <p className="text-sm opacity-90">
                                            Small cohort sizes ensure personalized attention • Expert-led instruction
                                        </p>
                                    </div>

                                    {/* Buttons Row */}
                                    <div className="flex flex-row flex-wrap gap-4 justify-center sm:justify-end w-full sm:w-auto">
                                        <button className="bg-white text-[#f0b100] hover:bg-white/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                                            Enroll Now
                                            <FaArrowRight />
                                        </button>
                                        <button className="border-2 border-white/70 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                                            More Details
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default EndometrialPathology