import React from 'react'
import { motion } from "framer-motion";
import { MdArrowForward } from 'react-icons/md';
import { FiCalendar, FiClock, FiMail, FiVideo } from 'react-icons/fi';
import { BsHourglass } from 'react-icons/bs';

const RegisterMasterClass = () => {
    const details = [
        { icon: FiCalendar, label: "Start", value: "September 11, 2025" },
        { icon: FiVideo, label: "Format", value: "Live, Online on Zoom" },
        // { icon: BsHourglass, label: "Duration", value: "8 weeks" },
        {
            icon: FiClock,
            label: "When",
            value: "Wednesdays & Saturdays",
            subValue: "9:00 PM - 10:00 PM (Asia/Calcutta)",
        },
    ];
    return (
        <div>
            <section className="relative py-15 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    <motion.div
                        className="absolute top-20 left-10 w-32 h-32"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-400/10">
                            <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" />
                        </svg>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-32 right-20 w-40 h-40"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-400/10">
                            <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" />
                        </svg>
                    </motion.div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-4">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                            <span className="text-yellow-600 font-semibold text-sm">
                                Limited Seats Available
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Register for the <span className="text-yellow-500">Masterclass</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto" />
                    </motion.div>

                    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
                        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                            {/* LEFT SIDE */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                                    Course Details
                                </h3>

                                {details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 mb-6 group"
                                    >
                                        <div className="relative w-12 h-12 flex items-center justify-center bg-yellow-50 border border-yellow-200 rounded-lg group-hover:scale-110 transition-transform">
                                            <detail.icon className="text-xl text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-500">
                                                {detail.label}
                                            </p>
                                            <p className="text-base font-bold text-gray-800">
                                                {detail.value}
                                            </p>
                                            {detail.subValue && (
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {detail.subValue}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                <button className="w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold rounded-xl shadow-lg shadow-yellow-400/30 flex items-center justify-center gap-3 transition-all group mt-8">
                                    <span className="text-lg">Register Now</span>
                                    <MdArrowForward className="text-xl group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="flex flex-col gap-2 mt-6">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FiMail className="text-yellow-500" />
                                        <span>Need help? Contact us at</span>
                                    </div>
                                    <a
                                        href="mailto:info@mendelacademy.com"
                                        className="text-yellow-600 font-semibold hover:text-yellow-700 underline"
                                    >
                                        info@mendelacademy.com
                                    </a>
                                </div>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex justify-center items-center">
                                <div className="relative w-full">
                                    <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/20 via-pink-300/20 to-purple-400/20 rounded-2xl blur-xl" />
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                                        <img
                                            src='https://www.autopista.es/uploads/s1/10/32/90/85/la-ameba-contiene-estructuras-especializadas-llamadas-organulos-que-realizan-una-variedad-de-funciones-celulares.jpeg'
                                            alt="Endometrial Biopsy Sample"
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>

                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className="absolute -bottom-4 -right-4 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black font-bold px-6 py-3 rounded-xl shadow-lg"
                                    >
                                        <div className="text-center">
                                            <div className="text-2xl">8</div>
                                            <div className="text-xs">WEEKS</div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Bottom Decorative Elements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="flex justify-center gap-4 mt-10"
                    >
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                                className="w-2 h-2 bg-yellow-400 rounded-full"
                            />
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default RegisterMasterClass