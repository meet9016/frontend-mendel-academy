'use client';
import React from 'react'
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiRadio, FiUsers } from 'react-icons/fi'
import { MdAccessTime } from 'react-icons/md';
import CommonButton from '@/comman/Button';
import { FaArrowRight } from 'react-icons/fa';

interface LiveSessionProps {
    data: any; // ideally, replace 'any' with proper type
}

const LiveSession: React.FC<LiveSessionProps> = ({ data }) => {
    return (
        <div>

            {/* LIVE SECTION */}
            <section className="relative py-6 bg-gradient-to-br from-[#1a2332] via-[#2a3f5f] to-[#1a2332] overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-10 right-20 w-48 h-48 bg-[#fecd11]/5 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-10 left-20 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                </div>


                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        {/* Live Badge */}
                        <motion.div
                            className="flex justify-center mb-4"
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm rounded-full border border-emerald-400/30">
                                <motion.div
                                    className="absolute inset-0 bg-emerald-500/20 rounded-full"
                                    animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                />
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <FiRadio className="text-emerald-400 text-lg relative z-10" />
                                </motion.div>
                                <span className="text-emerald-300 font-bold ff-font-bold text-sm relative z-10">LIVE</span>
                            </div>
                        </motion.div>

                        {/* Main Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-5 md:p-6 border border-white/20 shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#fecd11] rounded-tl-3xl" />
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#fecd11] rounded-br-3xl" />

                            <h2

                                className="text-2xl md:text-3xl font-bold text-center mb-2 bg-white ff-font-bold  bg-clip-text text-transparent"
                            >
                                Course In Session
                            </h2>

                            <div

                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <MdAccessTime className="text-primary text-base" />
                                <p className="text-white ff-font-bold text-sm">
                                    Started <span className="text-primary font-semibold">{data?.date}</span>
                                </p>
                            </div>

                            <div

                                className="text-center mb-5"
                            >
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fecd11]/10 backdrop-blur-sm rounded-xl border border-primary">
                                    <div className="w-2 h-2 bg-[#ffca00] rounded-full animate-pulse" />
                                    <p className="text-base ff-font-bold font-semibold text-white">
                                        Enrollment Still Open – Join Anytime
                                    </p>
                                </div>
                            </div>

                            <div
                                className="grid grid-cols-1 md:grid-cols-3 gap-3"
                            >
                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiClock className="text-primary text-2xl mb-2" />
                                    <h3 className="ff-font-bold text-white font-semibold text-sm mb-1">Flexible Schedule</h3>
                                    <p className="text-white/70 ff-font text-xs text-center">Learn at your own pace</p>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiUsers className="text-primary text-2xl mb-2" />
                                    <h3 className="text-white ff-font-bold font-semibold text-sm mb-1">Active Community</h3>
                                    <p className="text-white/70 text-xs ff-font text-center">Join fellow pathologists</p>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiCalendar className="text-primary text-2xl mb-2" />
                                    <h3 className="text-white font-semibold ff-font-bold text-sm mb-1">Lifetime Access</h3>
                                    <p className="text-white/70 text-xs ff-font text-center">Materials always available</p>
                                </div>
                            </div>

                            <div

                                className="mt-5 text-center"
                            >
                                {/* <button className="group px-7 py-2.5 bg-gradient-to-r from-[#fecd11] to-[#ffd94d] hover:from-[#ffd94d] hover:to-[#fecd11] text-[#1a2332] font-bold text-sm rounded-full shadow-md shadow-[#fecd11]/30 hover:shadow-lg hover:shadow-[#fecd11]/50 transition-all duration-300 hover:scale-105">
                                    <span className="flex items-center gap-1.5">
                                        Join Now
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </button> */}
                                <CommonButton pyClass="py-3" pxClass="px-26" fontWeight={700} fontSize={14}>
                                    Join Now
                                    <motion.span
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        < FaArrowRight />
                                    </motion.span>
                                </CommonButton>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}

export default LiveSession