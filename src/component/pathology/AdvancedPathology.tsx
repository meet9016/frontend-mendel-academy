'use client';
import React, { useState } from 'react';
import {
    FaGlobe,
    FaShieldAlt,
    FaUsers,
    FaChevronRight,
    FaChevronLeft
} from 'react-icons/fa';

import Header from '../auth/Header';
import StatusSection from './StatusSection';
import EndometrialPathology from './EndometrialPathology';
import PathologyMasterySeries from './PathologyMasterySeries';
import UpcomingCourse from './UpcomingCourse';
import MendelStudent from './MendelStudent';
import MeetYourMentor from './MeetYourMentor';
import Footer from '../auth/Footer';
import CommonButton from '@/comman/Button';

const AdvancedPathology = () => {
    const [revealedSlides, setRevealedSlides] = useState<Set<number>>(new Set());
    const handleReveal = (slideId: number) => {
        setRevealedSlides((prev) => new Set([...prev, slideId]));
    };

    const slides = [
        {
            id: 1,
            image: 'https://cdn.britannica.com/86/13486-159-8F1387A9/extensions-amoeba-cell-pseudopods-feet-cytoplasm-forms.jpg',
            diagnosis: 'Adenocarcinoma with glandular pattern',
        },
        {
            id: 2,
            image: 'https://cdn.britannica.com/86/13486-159-8F1387A9/extensions-amoeba-cell-pseudopods-feet-cytoplasm-forms.jpg',
            diagnosis: 'Lymphoblast with high N:C ratio',
        },
        {
            id: 3,
            image: 'https://cdn.britannica.com/86/13486-159-8F1387A9/extensions-amoeba-cell-pseudopods-feet-cytoplasm-forms.jpg',
            diagnosis: 'Immunofluorescence showing nuclear staining',
        },
    ];

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




    return (
        <>
            <Header />

            {/* --- Hero Section --- */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-white">
                <div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#f0b100]/15 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: '1s' }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                    {/* Left content */}
                    <div className="flex flex-col justify-center space-y-8 animate-fade-in-up h-full">
                        <div className="space-y-4">
                            <div className="inline-block px-4 py-2 bg-white border border-[#FFCA00] rounded-full backdrop-blur-sm">
                                <span className="text-sm font-medium ff-font">
                                    Mendel Mastery Series
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold leading-tight">
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
                                    className="flex items-start gap-4 group animate-fade-in-up"
                                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                                >
                                    <div className="mt-1 p-3 rounded-xl border-primary group-hover:scale-110 transition-transform duration-300">
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
                            {/* <button className="text-lg px-4 py-2 bg-[#f0b100] text-white hover:bg-[#d79d00] shadow-lg shadow-[#f0b100]/40 transition-all animate-glow-pulse rounded-md">
                                Enroll now
                            </button> */}
                            <CommonButton pyClass="py-5" pxClass="px-15" fontWeight={700} fontSize={18}>
                                Enroll Now
                            </CommonButton>
                        </div>
                    </div>

                    {/* Right content */}
                    <div
                        className="relative flex flex-col justify-center items-center h-full animate-scale-in rounded-3xl border-2 border-[#FFCA00]/40 bg-white/60 backdrop-blur-sm  p-8 transition-all "
                        style={{ animationDelay: '0.4s' }}
                    >
                        <div className="text-center mb-6 animate-fade-in-down">
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 ff-font-bold  leading-[1.2] pb-[4px]">
                                Pathology Mastery Challenge
                            </h2>
                            <p className="text-md ff-font">
                                Can you diagnose these?
                            </p>
                        </div>

                        {/* Slides */}
                        <div className="relative w-full">
                            <div
                                id="slides-container"
                                className="flex gap-6 overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth px-2 pb-4"
                            >
                                {slides.map((slide, index) => (
                                    <div
                                        key={slide.id}
                                        className="group relative animate-scale-in w-[200px] h-[250px] flex-shrink-0"
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <div className="relative h-full rounded-2xl overflow-hidden bg-card border-2 border-[#f0b100]/30 shadow-lg shadow-[#f0b100]/30 hover:shadow-[#f0b100]/50 transition-all duration-500 hover:scale-105">
                                            <img
                                                src={slide.image}
                                                alt={`Pathology slide ${slide.id}`}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-[#f0b100]/90 flex items-center justify-center transition-all duration-500 ${revealedSlides.has(slide.id)
                                                    ? 'translate-y-full opacity-0'
                                                    : 'translate-y-0 opacity-65'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() =>
                                                        handleReveal(slide.id)
                                                    }
                                                    className="flex items-center gap-2 px-5 py-2 bg-white/20 backdrop-blur-sm border cursor-pointer border-white/30 rounded-full text-gray-900 text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-110"
                                                >
                                                    <span>Slide to reveal</span>
                                                    <FaChevronRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div
                                                className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#000000bb] to-transparent transition-all duration-500 ${revealedSlides.has(slide.id)
                                                    ? 'opacity-100 translate-y-0'
                                                    : 'opacity-0 translate-y-4'
                                                    }`}
                                            >
                                                <p className="text-xs font-medium text-white text-center">
                                                    {slide.diagnosis}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Arrows */}
                            <button
                                onClick={() =>
                                    document
                                        .getElementById('slides-container')
                                        ?.scrollBy({ left: -250, behavior: 'smooth' })
                                }
                                className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#f0b100]/80 text-white p-2 rounded-full shadow-md hover:bg-[#f0b100] transition-all"
                            >
                                <FaChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById('slides-container')
                                        ?.scrollBy({ left: 250, behavior: 'smooth' })
                                }
                                className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#f0b100]/80 text-white p-2 rounded-full shadow-md hover:bg-[#f0b100] transition-all"
                            >
                                <FaChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        <p className="text-center mt-4 ff-font">
                            Master pattern recognition with Mendel Academy's
                            case-based mentoring.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- Stats Section --- */}
            <StatusSection />

            {/* --- ADVANCED ENDOMETRIAL PATHOLOGY PROGRAM --- */}
            <EndometrialPathology />

            {/* --- PATHOLOGY MENDEL MASTERY SERIES --- */}
            <PathologyMasterySeries />

            {/* UPCOMING COURSE */}
            <UpcomingCourse />

            {/* MENDEL STUDENT */}
            <MendelStudent />

            {/* MEET YOUR MENTOR */}
            <MeetYourMentor />

            <Footer />
        </>
    );
};

export default AdvancedPathology;
