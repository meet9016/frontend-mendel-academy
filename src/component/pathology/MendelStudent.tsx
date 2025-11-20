import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteRight, FaStar } from 'react-icons/fa'

const MendelStudent = () => {
    const testimonials = [
        {
            id: 1,
            name: "Dr. Sangam Sodhi",
            rating: 5,
            timeAgo: "3 weeks ago",
            text: "Mendel's WHO-based tumor masterclasses made a huge difference in how I approach biopsy interpretation. The structured reporting templates and molecular marker explanations helped me understand not just what to diagnose, but why. ",
        },
        {
            id: 2,
            name: "Dr. Pallivela Umarani",
            rating: 5,
            timeAgo: "1 week ago",
            text: "The sessions on esophageal lesions were incredibly enlightening. Your detailed discussions added so much value and I found them extremely useful. Thank you so much, Sir 🙏.",
        },
        {
            id: 3,
            name: "Dr. Praveen Kulkarni",
            rating: 5,
            timeAgo: "1 month ago",
            text: "I deeply appreciate the hard work and dedication you put into crafting such elaborate and useful lectures. Thank you!",
        },
        {
            id: 4,
            name: "Dr. Robert Chen",
            rating: 5,
            timeAgo: "3 weeks ago",
            text: "Your ability to break down complex histomorphology into clear, clinically relevant patterns is outstanding. The systematic approach has transformed my diagnostic confidence.",
        },
        {
            id: 5,
            name: "Dr. Ananya Sharma",
            rating: 5,
            timeAgo: "2 weeks ago",
            text: "The immunohistochemistry panels and algorithmic approach to difficult cases are invaluable. This is the most practical pathology teaching I've encountered.",
        },
    ];
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const cardsPerView = 3;
    const maxIndex = Math.max(0, testimonials.length - cardsPerView);

    const handlePrevious = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <>
            {/* MENDEL STUDENT */}
            <section className="relative py-15 bg-white overflow-hidden">
                <div className="relative  max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center gap-2 mb-4">
                            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#f0b100]" />
                            <span className="text-sm font-medium text-primary ff-font uppercase tracking-wider">
                                Student Success Stories
                            </span>
                            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#f0b100]" />
                        </div>
                        <h2 className="text-4xl md:text-5xl ff-font-bold font-bold mb-4">
                            What Mendel Students<br />Say About Us
                        </h2>
                        <p className="ff-font text-lg max-w-2xl mx-auto">
                            Join thousands of pathology professionals who have transformed their diagnostic skills
                        </p>
                    </div>

                    {/* Carousel */}
                    <div className="relative">
                        {/* Arrows */}
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-4 rounded-full bg-white border-2 border-[#f0b100]/30 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#f0b100] hover:text-white group ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <FaChevronLeft className="text-primary group-hover:text-white" />
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-4 rounded-full bg-white border-2 border-[#f0b100]/30 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#f0b100] hover:text-white group ${currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                        >
                            <FaChevronRight className="text-primary group-hover:text-white" />
                        </button>

                        <div className="overflow-hidden px-2 cursor-pointer  p-8">
                            <div
                                className="flex gap-6 transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${currentIndex * (100 / cardsPerView + 2)}%)`,
                                }}
                            >
                                {testimonials.map((t, i) => (
                                    <div
                                        key={t.id}
                                        className="min-w-[calc(33.333%-1rem)] group relative bg-white rounded-2xl border-2 border-primary p-8 shadow-lg hover:shadow-2xl hover:border-[#f0b100]/40 transition-all duration-500 hover:-translate-y-2"
                                    >
                                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#FACC00] rounded-full flex items-center justify-center shadow-lg">
                                            <FaQuoteRight className="text-white" />
                                        </div>

                                        <h3 className="text-xl font-bold ff-font-bold mb-2">{t.name}</h3>
                                        <div className="flex items-center gap-2 mb-3">
                                            {[...Array(t.rating)].map((_, i) => (
                                                <FaStar key={i} className="text-primary" />
                                            ))}
                                            <span className="text-sm ff-font">{t.timeAgo}</span>
                                        </div>

                                        {/* ✅ Only this line changed — limit text to 5 lines */}
                                        <p className="ff-font text-sm leading-relaxed line-clamp-5">
                                            {t.text}
                                        </p>
                                    </div>

                                ))}
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {[...Array(maxIndex + 1)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-[#f0b100]' : 'w-2 bg-[#f0b100]/40 hover:bg-[#f0b100]/60'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MendelStudent