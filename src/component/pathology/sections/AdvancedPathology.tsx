'use client';
import React from 'react';
import {
    FaGlobe,
    FaShieldAlt,
    FaUsers,
} from 'react-icons/fa';
import CommonButton from '@/comman/Button';

const AdvancedPathology = () => {
    const features = [
        {
            icon: FaGlobe,
            text: 'Ideal for MD, DNB, NEET-SS (India), ABPath (USA), and FRCPath (UK) aspirants',
        },
        {
            icon: FaShieldAlt,
            text: 'Trusted by Doctors & Alumni in India, SEA, UAE, USA, Caribbean, & Canada',
        },
        {
            icon: FaUsers,
            text: 'For Pathology Residents, Fellows, and Consultants',
        },
    ];

    // Single static slide
    const slide = {
        id: 1,
        image: 'https://cdn.britannica.com/86/13486-159-8F1387A9/extensions-amoeba-cell-pseudopods-feet-cytoplasm-forms.jpg',
        diagnosis: 'Adenocarcinoma with glandular pattern',
    };

    return (
        <>
            {/* --- Hero Section --- */}
            <section className="relative flex items-center justify-center overflow-hidden bg-white">
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f0b100]/15 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: '1s' }}
                />
                <div className="relative z-10 max-w-[1380px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left content */}
                    <div className="flex flex-col justify-center space-y-8 animate-fade-in-up h-full">
                        <div className="space-y-4">
                            <h1 className="text-2xl md:text-4xl font-bold">
                                <span className="ff-font-bold">
                                    Advanced
                                </span>
                                <br />
                                <span className="ff-font-bold">Pathology Prep.</span>
                            </h1>
                        </div>

                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 group animate-fade-in-up"
                                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                                >
                                    <div className="p-3 rounded-xl border-primary group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-5 h-5 text-primary" />
                                    </div>

                                    <p className="ff-font flex-1">
                                        {feature.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div
                            className="pt-4 animate-fade-in-up"
                            style={{ animationDelay: '0.6s' }}
                        >
                            <CommonButton pyClass="py-3" pxClass="px-15" fontWeight={700} fontSize={18}>
                                Enroll Now
                            </CommonButton>
                        </div>
                    </div>

                    {/* Right content - Full Width Image */}
                    <div
                        className="relative flex flex-col justify-center items-center h-full animate-scale-in rounded-3xl border-2 border-[#FFCA00]/40 bg-white/60 backdrop-blur-sm p-8 transition-all"
                        style={{ animationDelay: '0.4s' }}
                    >
                        <div className="text-center mb-6 animate-fade-in-down">
                            <h2 className="text-2xl md:text-4xl font-bold mb-2 ff-font-bold pb-[4px]">
                                Pathology Mastery Challenge
                            </h2>
                            <p className="text-md ff-font">
                                Can you diagnose these?
                            </p>
                        </div>

                        {/* Full Width Image - Takes 100% width of container */}
                        <div className="relative w-full animate-scale-in">
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-card border-2 border-[#f0b100]/30 shadow-lg transition-all duration-500 hover:scale-105">
                                <img
                                    src={slide.image}
                                    alt="Pathology slide"
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#000000cc] to-transparent">
                                    <p className="text-sm font-medium text-white text-center">
                                        {slide.diagnosis}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="text-center mt-4 ff-font">
                            Master pattern recognition with Mendel Academy's
                            case-based mentoring.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdvancedPathology;