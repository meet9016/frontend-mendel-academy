import React from 'react'
import { motion } from "framer-motion";
import { BsAward, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineSchool, MdTrendingUp, MdVerifiedUser } from 'react-icons/md';
import { FaEarthAmericas } from 'react-icons/fa6';
import { FiAlertCircle, FiCheck, FiMail } from 'react-icons/fi';

const LearningPath = () => {
    const modules = [
        {
            id: 1,
            icon: <MdOutlineSchool className="text-4xl" />,
            title: "MODULE 1",
            subtitle: "CORE COMPETENCE BUNDLE",
            description:
                "A 7-8 week course with annotated images, algorithms, IHC ladders, and diagnostic insights. ",
            priceINR: "7500",
            priceUSD: "105",
            features: [
                "7-8 week comprehensive course",
                "Annotated images and algorithms",
                "IHC ladders for interpretation",
                "Real diagnostic insights",
                "Core competence development",
            ],
            popular: false,
            gradient: "from-blue-50 to-cyan-50",
        },
        {
            id: 2,
            icon: <BsShieldCheck className="text-4xl" />,
            title: "MODULE 2",
            subtitle: "CORE COMPETENCE + LEGAL-SAFE BUNDLE",
            description:
                "Core + Reporting Toolkit: 100+ Endometrial Biopsy Scenarios, CAP-compliant, Litigation-safe.",
            priceINR: "9500",
            priceUSD: "129",
            features: [
                "Everything from Module 1",
                "100+ Endometrial Biopsy Scenarios",
                "CAP-compliant reporting",
                "Litigation-safe protocols",
                "Legal-safe reporting toolkit",
            ],
            popular: false,
            gradient: "from-purple-50 to-pink-50",
        },
        {
            id: 3,
            icon: <BsAward className="text-4xl" />,
            title: "MODULE 3",
            subtitle: "MAESTRO PREMIUM BUNDLE",
            description:
                "Core + Toolkit + 100 Case Discussions + Mastery & Dual Certification (incl. Mendel Mastery Certificate for CV boost).",
            priceINR: "15000",
            priceUSD: "179",
            features: [
                "Everything from Module 1 & 2",
                "100 comprehensive case discussions",
                "Mastery-level expertise development",
                "Dual Certification included",
                "Mendel Mastery Certificate",
                "CV enhancement credentials",
            ],
            popular: true,
            gradient: "from-amber-50 to-yellow-50",
        },
    ];
    return (
        <>
            <section className="py-15 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">
                            Choose Your Learning Path
                        </h2>
                        <p className="text-lg ff-font max-w-2xl mx-auto">
                            Select the module that best fits your learning goals and career aspirations
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6 cursor-pointer justify-center mb-12">
                        {modules.map((module, index) => {
                            const isWhiteCard = index === 0 || index === 1;

                            return (
                                <motion.div
                                    key={module.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group h-full flex justify-center"
                                >
                                    {module.popular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="bg-[#ffcc09] text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                                                <MdTrendingUp />
                                                MOST POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className={`relative h-full max-w-[400px] w-full mx-auto ${isWhiteCard
                                            ? "bg-white border-2 border-[#ffca00]"
                                            : `bg-gradient-to-br ${module.gradient} border-2 ${module.popular ? "border-[#ffca00]" : "border-gray-200"
                                            }`
                                            } rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] flex flex-col`}
                                    >
                                        {/* Corner Decoration */}
                                        {!isWhiteCard && (
                                            <div
                                                className={`absolute top-0 right-0 w-20 h-20 ${module.popular ? "bg-[#ffcc09]" : "bg-gray-200"
                                                    } opacity-10 rounded-bl-full`}
                                            />
                                        )}

                                        {/* Icon Box */}
                                        <div
                                            className={`w-14 h-14 border-primary rounded-xl ${module.popular
                                                ? "bg-[#ffcc09] text-black"
                                                : isWhiteCard
                                                    ? "bg-white text-primary"
                                                    : "bg-white text-gray-700"
                                                } flex items-center justify-center mb-5 shadow-md`}
                                        >
                                            {module.icon}
                                        </div>

                                        {/* Title + Subtitle */}
                                        <div className="mb-3">
                                            <h3 className="text-xs font-bold text-gray-500 mb-1">
                                                {module.title}
                                            </h3>
                                            <h4 className="text-lg font-bold text-gray-900 leading-tight">
                                                {module.subtitle}
                                            </h4>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-5 flex-grow">
                                            {module.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-5 pb-5 border-b-2 border-gray-200">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-xs text-gray-500">IN</span>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-semibold text-gray-600">INR</span>
                                                    <span className="text-3xl font-bold text-gray-900">{module.priceINR}</span>
                                                </div>

                                            </div>
                                            <div className="flex items-center gap-1 text-gray-600 mt-1">
                                                <div className="flex items-center justify-center w-5 h-5 bg-gray-100 rounded-full">
                                                    <FaEarthAmericas className="text-blue-500 text-lg" />
                                                </div>
                                                <span className="text-sm font-medium tracking-wide">
                                                    USD&nbsp;{module.priceUSD}
                                                </span>
                                            </div>

                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-2.5 mb-6 flex-grow">
                                            {module.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div
                                                        className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full ${module.popular
                                                            ? "bg-[#ffcc09]"
                                                            : isWhiteCard
                                                                ? "bg-gray-300"
                                                                : "bg-gray-300"
                                                            } flex items-center justify-center`}
                                                    >
                                                        <FiCheck
                                                            className={`text-[10px] ${module.popular ? "text-black" : "text-white"
                                                                }`}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-700 leading-relaxed">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Button */}
                                        <button
                                            className="w-full cursor-pointer py-3 rounded-xl font-bold text-sm  bg-[#ffcc09] hover:bg-[#ffd633] text-black shadow-lg hover:shadow-xl transition-all duration-300">
                                            Enroll Now
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Alert Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-[#ffcc09] rounded-xl p-6 mb-12 flex items-center gap-4 max-w-4xl mx-auto"
                    >
                        <FiAlertCircle className="text-3xl text-[#ffcc09] flex-shrink-0" />
                        <p className="text-gray-700 font-medium">
                            <span className="font-bold text-gray-900">Seats are limited!</span> Course fee based on chosen module (non-refundable)
                        </p>
                    </motion.div>

                    {/* Help Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-gray-50 rounded-2xl p-10 text-center max-w-2xl mx-auto"
                    >
                        <MdVerifiedUser className="text-5xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Need Help Choosing?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Not sure which module is right for you? Our team is here to help you make the best choice for your career goals.
                        </p>
                        <button className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                            <FiMail />
                            Contact Our Team
                        </button>
                    </motion.div>
                </div>
            </section >
        </>
    )
}

export default LearningPath