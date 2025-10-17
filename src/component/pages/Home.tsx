'use client'
import { FiSearch, FiFileText, FiActivity, FiHeart, FiBookOpen, FiCpu, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import CourseCard from "../cousercard/CourseCard";


const Home = () => {
    const courses = [
        { icon: <FiFileText className="w-7 h-7" />, title: "USMLE Step 1", badge: "POPULAR", rating: 4.9, students: 1300, tags: ["Adaptive AI", "Analytics"], moreFeatures: 1, description: "Master the exam prep with our adaptive AI powered techniques", badgeVariant: "default" },
        { icon: <FiActivity className="w-7 h-7" />, title: "USMLE Step 2", badge: "UPDATED", rating: 4.8, students: 940, tags: ["Patient Cases", "Dx Trainer"], moreFeatures: 1, description: "Excel in clinical knowledge and patient care scenarios", badgeVariant: "secondary" },
        { icon: <FiHeart className="w-7 h-7" />, title: "USMLE Step 3", badge: "NEW", rating: 4.7, students: 610, tags: ["EMR Training", "Residency Cases"], moreFeatures: 1, description: "Complete your USMLE journey with confidence and success", badgeVariant: "outline" },
        { icon: <FiBookOpen className="w-7 h-7" />, title: "INI CET", badge: "POPULAR", rating: 4.8, students: 820, tags: ["AIIMS Faculty", "Topper Strategy"], moreFeatures: 1, description: "Secure your AIIMS seat with our comprehensive program", badgeVariant: "default" },
        { icon: <FiCpu className="w-7 h-7" />, title: "NEET PG", badge: "TRENDING", rating: 4.9, students: 1520, tags: ["Weak Areas AI", "Smart Notes"], moreFeatures: 1, description: "Achieve your dream with proven strategies", badgeVariant: "secondary" },
    ];
    const scroll = (direction: 'left' | 'right') => {
        const container = document.getElementById("course-scroll-container");
        if (container) {
            const scrollAmount = 360;
            const newScrollPosition = container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
            container.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth'
            });
        }
    };
    return (
        <>
            <Header />

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 md:px-8 lg:px-16 text-center space-y-6 py-16">
                <p className="text-sm md:text-base text-gray-500 bg-gray-50 px-4 py-2 rounded-full shadow-md inline-block">
                    Trusted by 10,000+ Medical Students
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-snug">
                    We <span className="font-extrabold">simplify</span> learning, <br />
                    <span className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg">amplify</span> success
                </h1>

                <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl">
                    Personalized Medical Coaching Driven by Data, Enhanced by AI
                </p>

                <div className="w-full max-w-xl relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="What do you want to learn today?"
                        className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-700 placeholder-gray-400 transition"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition transform hover:-translate-y-1 shadow-md">
                        PG Entrance Exams
                    </button>
                    <button className="border border-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-100 transition transform hover:-translate-y-1 shadow-md">
                        Advanced Pathology
                    </button>
                </div>
            </main>

            {/* Courses Section */}
            <section className="bg-[#f9fafb] py-16 px-4 md:px-8 lg:px-16 relative group/section">
                <div className="max-w-7xl mx-auto relative">
                    <div className="text-center mb-12">
                        <span className="inline-block text-xs font-semibold text-[#434de3] bg-[#e0e7ff] px-3 py-1 rounded-full mb-4 shadow-sm">
                            AI-PERSONALIZED
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Adaptive Qbanks<br />for Exam Prep
                        </h2>
                        <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
                            Crush high-stakes medical exams with data-driven practice & targeted remediation.
                        </p>
                    </div>

                    {/* Scroll container wrapper (relative for overlay buttons) */}
                    <div className="relative">
                        {/* Gradient Overlays (side fade) */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#f9fafb] to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#f9fafb] to-transparent z-10 pointer-events-none" />

                        {/* Left Scroll Button */}
                        <button
                            onClick={() => scroll('left')}
                            className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
                        >
                            <FiChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Scrollable Courses */}
                        <div
                            id="course-scroll-container"
                            className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
                        >
                            {courses.map((course, index) => (
                                <CourseCard key={index} {...course} />
                            ))}
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            onClick={() => scroll('right')}
                            className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-xl border-2 border-gray-200 hover:bg-gray-100 hover:scale-110 transition-all duration-300 opacity-0 group-hover/section:opacity-100"
                        >
                            <FiChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </section>


            {/* Hide scrollbar */}
            <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <Footer />
        </>
    );
}

export default Home