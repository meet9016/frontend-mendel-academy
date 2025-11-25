import React from 'react'
import { motion } from "framer-motion";
import { BsAward, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineSchool, MdTrendingUp, MdVerifiedUser } from 'react-icons/md';
import { FaEarthAmericas } from 'react-icons/fa6';
import { FiAlertCircle, FiCheck, FiMail } from 'react-icons/fi';
import CommonButton from '@/comman/Button';

// TypeScript interfaces
interface ModuleFeature {
  features: string[];
}

interface ModuleData extends ModuleFeature {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  priceUSD?: number;
  isMostPopular?: boolean;
  gradient?: string;
  icon?: React.ReactNode;
}

interface ChooseYourLearningPathProps {
  data: ModuleData[];
}

const ChooseYourLearningPath: React.FC<ChooseYourLearningPathProps> = ({ data }) => {
    
    // Icon mapping function with proper TypeScript typing
    const getIconComponent = (module: ModuleData, index: number): React.ReactNode => {
        // For most popular module, show shield icon
        if (module.isMostPopular) {
            return <BsShieldCheck className="text-4xl" />;
        }
        
        // For other modules, show different icons based on position/index
        switch (index) {
            case 0:
                return <BsAward className="text-4xl" />;
            case 1:
                return <MdOutlineSchool className="text-4xl" />;
            default:
                return <BsAward className="text-4xl" />;
        }
    };

    // Dynamic card styling function - only most popular gets yellow border
    const getCardStyling = (module: ModuleData, index: number): string => {
        if (module.isMostPopular) {
            // Only most popular module gets yellow border
            return `bg-white ${module.gradient} border-2 border-[#ffcc09]`;
        } else {
            // All other cards get gray border
            return `bg-white ${module.gradient} border-2 border-gray-200`;
        }
    };

    // Dynamic icon background styling
    const getIconBoxStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "bg-white text-primary";
        } else {
            return "bg-white text-gray-700";
        }
    };

    // Dynamic check circle styling
    const getCheckCircleStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "bg-[#ffcc09]";
        } else {
            return "bg-gray-300";
        }
    };

    // Dynamic check mark styling
    const getCheckMarkStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "text-black";
        } else {
            return "text-white";
        }
    };

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
                        {data?.map((module, index) => {
                            return (
                                <motion.div
                                    key={module.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group h-full flex justify-center"
                                >
                                    {module.isMostPopular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="bg-[#ffcc09] text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                                                <MdTrendingUp />
                                                MOST POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className={`relative h-full max-w-[400px] w-full mx-auto ${getCardStyling(module, index)} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col`}
                                    >
                                        {/* Corner Decoration - only for non-most popular cards */}
                                        {!module.isMostPopular && (
                                            <div
                                                className="absolute top-0 right-0 w-20 h-20 bg-gray-200 opacity-10 rounded-bl-full"
                                            />
                                        )}

                                        {/* Icon Box */}
                                        <div
                                            className={`w-14 h-14 border-primary rounded-xl ${getIconBoxStyling(module)} flex items-center justify-center mb-5 shadow-md`}
                                        >
                                            {getIconComponent(module, index)}
                                        </div>

                                        {/* Title + Subtitle */}
                                        <div className="mb-3">
                                            <h3 className="text-xs font-bold ff-font-bold mb-1">
                                                {module.title}
                                            </h3>
                                            <h4 className="text-lg font-bold ff-font leading-tight">
                                                {module.subtitle}
                                            </h4>
                                        </div>

                                        <p className="text-sm ff-font mb-5 flex-grow">
                                            {module.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-5 pb-5 border-b-2 border-gray-200">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-semibold ff-font">INR</span>
                                                    <span className="text-3xl font-bold ff-font-bold">{module.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-2.5 mb-6 flex-grow">
                                            {module.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div
                                                        className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full ${getCheckCircleStyling(module)} flex items-center justify-center`}
                                                    >
                                                        <FiCheck
                                                            className={`text-[10px] ${getCheckMarkStyling(module)}`}
                                                        />
                                                    </div>
                                                    <span className="text-sm ff-font leading-relaxed">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Button */}
                                        <CommonButton pyClass="py-3" pxClass="px-26" fontWeight={700} fontSize={14}>
                                            Enroll Now
                                        </CommonButton>
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
                        className="bg-white border-2 border-primary rounded-xl p-6 mb-12 flex items-center gap-4 max-w-4xl mx-auto"
                    >
                        <FiAlertCircle className="text-3xl text-primary flex-shrink-0" />
                        <p className="ff-font font-medium">
                            <span className="font-bold ff-font-bold">Seats are limited!</span> Course fee based on chosen module (non-refundable)
                        </p>
                    </motion.div>

                    {/* Help Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#f9fafb] rounded-2xl p-10 text-center max-w-2xl mx-auto"
                    >
                        <MdVerifiedUser className="text-5xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold ff-font-bold mb-3">
                            Need Help Choosing?
                        </h3>
                        <p className="ff-font mb-6">
                            Not sure which module is right for you? Our team is here to help you make the best choice for your career goals.
                        </p>
                        <CommonButton
                            pyClass="py-3"
                            pxClass="px-12"
                            fontWeight={700}
                            fontSize={15}
                            className="bg-black text-white flex items-center gap-2 hover:bg-black hover:text-white"
                        >
                            <FiMail />
                            Contact Our Team
                        </CommonButton>

                    </motion.div>
                </div>
            </section >
        </>
    )
}

export default ChooseYourLearningPath;