import React from 'react'
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiRadio, FiUsers } from 'react-icons/fi'
import { MdAccessTime } from 'react-icons/md';

const LiveSession = () => {
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
                                <span className="text-emerald-300 font-bold text-sm relative z-10">LIVE</span>
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

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-[#fecd11] to-white bg-clip-text text-transparent"
                            >
                                Course In Session
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="flex items-center justify-center gap-2 mb-4"
                            >
                                <MdAccessTime className="text-[#fecd11] text-base" />
                                <p className="text-white/80 text-sm">
                                    Started <span className="text-[#fecd11] font-semibold">09/11</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-center mb-5"
                            >
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fecd11]/10 backdrop-blur-sm rounded-xl border border-[#fecd11]/30">
                                    <div className="w-2 h-2 bg-[#fecd11] rounded-full animate-pulse" />
                                    <p className="text-base font-semibold text-white">
                                        Enrollment Still Open – Join Anytime
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-3"
                            >
                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiClock className="text-[#fecd11] text-2xl mb-2" />
                                    <h3 className="text-white font-semibold text-sm mb-1">Flexible Schedule</h3>
                                    <p className="text-white/70 text-xs text-center">Learn at your own pace</p>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiUsers className="text-[#fecd11] text-2xl mb-2" />
                                    <h3 className="text-white font-semibold text-sm mb-1">Active Community</h3>
                                    <p className="text-white/70 text-xs text-center">Join fellow pathologists</p>
                                </div>

                                <div className="flex flex-col items-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-[#fecd11]/50 transition-all duration-300 hover:shadow-md hover:shadow-[#fecd11]/20">
                                    <FiCalendar className="text-[#fecd11] text-2xl mb-2" />
                                    <h3 className="text-white font-semibold text-sm mb-1">Lifetime Access</h3>
                                    <p className="text-white/70 text-xs text-center">Materials always available</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="mt-5 text-center"
                            >
                                <button className="group px-7 py-2.5 bg-gradient-to-r from-[#fecd11] to-[#ffd94d] hover:from-[#ffd94d] hover:to-[#fecd11] text-[#1a2332] font-bold text-sm rounded-full shadow-md shadow-[#fecd11]/30 hover:shadow-lg hover:shadow-[#fecd11]/50 transition-all duration-300 hover:scale-105">
                                    <span className="flex items-center gap-1.5">
                                        Join Now
                                        <motion.span
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            →
                                        </motion.span>
                                    </span>
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}

export default LiveSession