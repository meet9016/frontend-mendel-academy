import React from 'react'
import { FaArrowRight, FaBell, FaCalendarAlt, FaEnvelope, FaGraduationCap, FaUsers } from 'react-icons/fa'

const UpcomingCourse = () => {
    const courses = [
        {
            id: 1,
            image:
                "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80",
            title: "Interpretation ",
            description:
                "Advanced training in bone marrow biopsy interpretation, covering normal & abnormal patterns with comprehensive case discussions retation, covering normal & abnormal patterns with comprehensive case discussions.",
            startDate: "Starts September 2025",
            spotsLeft: 800,
        },
        {
            id: 2,
            image: 'https://st2.depositphotos.com/1000434/12333/i/450/depositphotos_123334030-stock-photo-different-amoebas-on-black-background.jpg',
            title: "Interpretation of Renal Biopsies of Liver Biopsies of Liver Biopsies",
            description:
                "Comprehensive course in renal pathology with case discussions, covering glomerular, tubular, and interstitial patterns with clinical correlation retation, covering normal & abnormal patterns with comprehensive case discussions retation, covering normal & abnormal patterns with comprehensive case discussions.",
            startDate: "Starts October 2025",
            spotsLeft: 9,
        },
        {
            id: 3,
            image:
                "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            title: "Interpretation of Liver Biopsies",
            description:
                "Modern approach to liver pathology including steatosis.",
            startDate: "Starts November 2025",
            spotsLeft: 92,
        },
    ];
    return (
        <>
            <section className="relative py-16 overflow-hidden bg-gradient-to-b from-background via-[#fffdf5] to-background">
                {/* Animated Background */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffca00]/10 rounded-full blur-3xl animate-float" />
                <div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-[#ffca00]/5 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "2s" }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-4 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffca00]/10 border border-[#ffca00]/30 rounded-full backdrop-blur-sm">
                            <FaGraduationCap className="w-4 h-4 text-[#ffca00]" />
                            <span className="text-sm font-semibold text-[#ffca00]">
                                2025 Course Calendar
                            </span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-bold">
                            <span className="bg-gradient-to-r from-[#ffca00] to-[#f0b100] bg-clip-text text-transparent">
                                Upcoming
                            </span>{" "}
                            <span className="text-foreground">Courses</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Expand your expertise with additional subspeciality training courses launching throughout 2025.
                            Join the waitlist to get early access and exclusive updates.
                        </p>
                    </div>

                    {/* Course Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-24">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="group relative animate-fade-in-up flex flex-col h-full"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >
                                {/* Glow */}
                                <div className="absolute -inset-4 bg-gradient-to-br from-[#ffca00]/30 via-[#ffca00]/10 to-transparent rounded-md blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                                {/* Main Card */}
                                <div
                                    className="relative flex flex-col h-full bg-card border-2 border-[#ffca00]/30 
  overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(255,202,0,0.25)] 
  transition-all duration-500 rounded-[3rem] 
  group-hover:border-[#fae7b2]"
                                >

                                    {/* --- IMAGE SECTION WITH BADGES + WAVE --- */}
                                    <div className="relative h-56 overflow-hidden rounded-t-[3rem]">
                                        {/* Course Image */}
                                        <img
                                            src={course.image}
                                            alt={course.title}
                                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#ffca00]/40 via-transparent to-[#f0b100]/40 mix-blend-overlay" />

                                        {/* --- TOP BADGES --- */}
                                        <div className="absolute top-4 left-4 flex flex-wrap gap-3">
                                            <span className="bg-white/90 text-[#f0b100] text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-md uppercase border border-[#f0b100]/30 backdrop-blur-sm">
                                                Advanced Level
                                            </span>
                                            <span className="bg-[#f0b100] text-white text-[10px] font-bold tracking-wide px-3 py-1 rounded-full shadow-md uppercase border border-white/20">
                                                Case-Based Learning
                                            </span>
                                        </div>

                                        {/* --- CURVED WAVE FIXED (NO WHITE LINE) --- */}
                                        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                                            <svg
                                                className="relative block w-full h-[60px]"
                                                viewBox="0 0 500 60"
                                                preserveAspectRatio="none"
                                            >
                                                <path
                                                    d="M0,30 C150,70 350,0 500,40 L500,60 L0,60 Z"
                                                    fill="white"
                                                />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* --- CONTENT SECTION --- */}
                                    <div className="p-8 space-y-5 relative flex flex-col justify-between flex-1">
                                        <div className="flex flex-col flex-1">
                                            {/* --- Title --- */}
                                            <div className="relative pl-4">
                                                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-[#ffca00] transition-colors line-clamp-2 min-h-[3.5rem]">
                                                    {course.title}
                                                </h3>
                                                <div className="h-1 bg-gradient-to-r from-[#ffca00] to-transparent w-0 group-hover:w-full transition-all duration-500 mt-2" />
                                            </div>

                                            {/* --- Description --- */}
                                            <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-3 mt-2 min-h-[4.5rem]">
                                                {course.description}
                                            </p>

                                            {/* --- Info Boxes --- */}
                                            <div className="space-y-3 pl-4 mt-2">
                                                <div className="relative group/date">
                                                    <div className="absolute inset-0 bg-[#ffca00]/5 transform -skew-x-6 group-hover/date:skew-x-0 transition-transform duration-300" />
                                                    <div className="relative flex items-center gap-3 p-3 border-2 border-[#ffca00]/20 group-hover/date:border-[#ffca00]/40 transition-colors duration-300">
                                                        <div className="p-2 bg-[#ffca00] rounded-full">
                                                            <FaCalendarAlt className="w-4 h-4 text-white" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-foreground">
                                                            {course.startDate}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="relative group/spots">
                                                    <div className="absolute inset-0 bg-[#ffca00]/5 transform skew-x-6 group-hover/spots:skew-x-0 transition-transform duration-300" />
                                                    <div className="relative flex items-center gap-3 p-3 border-2 border-[#ffca00]/20 group-hover/spots:border-[#ffca00]/40 transition-colors duration-300">
                                                        <div className="p-2 bg-[#ffca00] rounded-full">
                                                            <FaUsers className="w-4 h-4 text-white" />
                                                        </div>
                                                        <span className="text-sm text-muted-foreground">
                                                            <span className="font-bold text-[#ffca00]">{course.spotsLeft} spots</span> on waitlist
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- CTA Button --- */}
                                        <div className="relative pt-4 pl-4">
                                            <button
                                                className="w-full py-3 px-6 bg-[#f0b100] hover:bg-[#ffca00] text-white font-semibold rounded-md shadow-md transition-all duration-300 flex items-center justify-center gap-3"
                                            >
                                                <FaBell className="w-4 h-4" />
                                                <span className="text-base">Get Notified</span>
                                                <FaArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bottom Gradient Bar */}
                                    <div className="h-2 bg-gradient-to-r from-[#ffca00] via-[#f0b100] to-[#ffca00]" />
                                </div>

                                {/* Floating Decorations */}
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-8 border-[#ffca00]/20 rounded-full group-hover:scale-110 group-hover:border-[#ffca00]/40 transition-all duration-700" />
                                <div className="absolute -top-6 -left-6 w-16 h-16 bg-[#ffca00]/10 rounded-full group-hover:scale-125 transition-all duration-700" />
                            </div>
                        ))}
                    </div>


                    {/* Newsletter Section */}
                    <div className="relative animate-fade-in-up" style={{ animationDelay: "0.8s" }}>
                        <div className="relative bg-white border-[#fbc400] rounded-3xl p-1 shadow-2xl shadow-[#ffca00]/40">
                            <div className="bg-card rounded-3xl p-8 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    {/* Left Content */}
                                    <div className="space-y-6">
                                        <div className="inline-flex p-4 bg-[#ffca00]/10 rounded-2xl">
                                            <div className="relative">
                                                <FaBell className="w-8 h-8 text-[#ffca00] animate-pulse" />
                                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffca00] opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ffca00]"></span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                                                Never Miss a{" "}
                                                <span className="bg-gradient-to-r from-[#ffca00] to-[#f0b100] bg-clip-text text-transparent">
                                                    Course Launch
                                                </span>
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Get the latest updates on our upcoming courses, early bird pricing, and exclusive
                                                content from our expert instructors.
                                            </p>
                                        </div>

                                        {/* Trust Badge */}
                                        <div className="flex items-center gap-3 pt-4">
                                            <div className="flex -space-x-2">
                                                {[1, 2, 3, 4].map((i) => (
                                                    <div
                                                        key={i}
                                                        className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffca00] to-[#f0b100] border-2 border-card flex items-center justify-center text-white font-bold text-sm"
                                                    >
                                                        {i}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Join <span className="font-bold text-foreground">10,000+ medical professionals</span>{" "}
                                                •{" "}
                                                <span className="text-[#ffca00] font-semibold">Unsubscribe anytime</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right CTA */}
                                    <div className="space-y-4">
                                        <div className="flex flex-col sm:flex-row gap-4">

                                            <button className="bg-gradient-to-r from-[#ffca00] to-[#f0b100] hover:from-[#f0b100] hover:to-[#e0a100] text-white font-bold px-10 py-5 rounded-full flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl">
                                                <FaEnvelope />
                                                Subscribe to Newsletter
                                            </button>
                                        </div>
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

export default UpcomingCourse