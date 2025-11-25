"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { MdAutoAwesome, MdBiotech, } from "react-icons/md";
import { TbDna2 } from "react-icons/tb";
import { FiPlay } from "react-icons/fi";
import CommonButton from "@/comman/Button";
import { FaArrowRight } from "react-icons/fa";

interface MainSectionProps {
    data: any; // ideally, replace 'any' with proper type
}

const MainSection: React.FC<MainSectionProps> = ({ data }) => {

    // const heroBackground =
    //     "https://heise.cloudimg.io/width/610/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/8/1/2/3/1/6/shutterstock_1932149360-98c98b4c5c9c2e4f.jpeg";
    const heroBackground = "https://t4.ftcdn.net/jpg/02/65/95/81/360_F_265958166_YTEL6wHpfxnPlN9nNYxL7UKHiOWCln59.jpg"

    return (
        <>
            {/* HERO SECTION */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
                style={{
                    backgroundImage: `linear-gradient(135deg, rgba(20, 40, 80, 0.55), rgba(30, 60, 100, 0.45)), url(${heroBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                }}
            >
                {/* Floating Animated Shapes (unchanged) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-24 h-24 border-4 border-blue-200/30 rotate-45"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="absolute inset-2 bg-blue-200/10 backdrop-blur-sm"></div>
                    </motion.div>

                    <motion.div
                        className="absolute top-40 right-20 w-32 h-32 border-4 border-yellow-200/40 rounded-full"
                        animate={{ y: [0, 25, 0] }}
                        transition={{
                            duration: 7,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="absolute inset-2 bg-yellow-200/10 backdrop-blur-sm rounded-full"></div>
                    </motion.div>

                    <motion.div
                        className="absolute bottom-32 left-1/4 w-20 h-20 border-4 border-green-200/30"
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            duration: 5,
                            delay: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="absolute inset-2 bg-green-200/10 backdrop-blur-sm"></div>
                    </motion.div>

                    {/* Floating Icons */}
                    <motion.div
                        className="absolute top-1/4 right-1/4"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <TbDna2 className="text-6xl text-blue-200/20" />
                    </motion.div>

                    <motion.div
                        className="absolute bottom-1/4 left-1/3"
                        animate={{ y: [0, 20, 0] }}
                        transition={{
                            duration: 6,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <MdBiotech className="text-5xl text-yellow-200/20" />
                    </motion.div>
                </div>

                {/* ✨ CENTER ZOOM-IN CONTENT ✨ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 1.2,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="container mx-auto px-4 py-16 relative z-10"
                >
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-200/10 backdrop-blur-sm border border-blue-200/30 mb-6">
                            <MdAutoAwesome className="text-blue-200 text-xl" />
                            <span className="text-blue-200 ff-font-bold font-semibold">
                                Advanced Medical Solutions
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-4 ff-font-bold text-white leading-tight">
                            {data?.course_title}
                        </h1>

                        <p className="text-lg md:text-xl mb-3 ff-font-bold text-white/90 font-semibold">
                            Mendel Mastery Series™
                        </p>

                        <p className="text-base md:text-lg mb-8 ff-font-bold text-white/80 max-w-2xl mx-auto">
                            For Pathologists, Pathology Residents,
                            <br /> & Fellows in Gynecologic Pathology
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            {/* <button className="min-w-[180px] text-base bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition">
                                Register Now
                                <FiArrowRight className="ml-2" />
                            </button> */}
                            <CommonButton
                                pyClass="py-4"
                                pxClass="px-15"
                                fontWeight={700}
                                fontSize={14}
                                className="group"
                            >
                                <div className="flex items-center gap-2">
                                    <span>Register Now</span>
                                    <FaArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </CommonButton>

                            {/* <button className="min-w-[180px] text-base border border-white text-white hover:bg-white/10 flex items-center justify-center gap-2 py-3 rounded-xl transition">
                                <FiPlay className="mr-2" />
                                See More Details
                            </button> */}
                            <CommonButton pyClass="py-4" pxClass="px-15" fontWeight={700} fontSize={14} className="border-white bg-white text-black">
                                <FiPlay className="mr-2" /> See More Details
                            </CommonButton>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
};

export default MainSection;
