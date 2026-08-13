'use client';
import React from 'react';

const AdvancedPathology = ({ onBrowseCourses, onCorporateClick }: { onBrowseCourses?: () => void; onCorporateClick?: () => void }) => {
    const badges = [
        'MD Pathology',
        'DNB',
        'NEET-SS · India',
        'ABPath · USA',
        'FRCPath · UK'
    ];

    const handleBrowseClick = () => {
        if (onBrowseCourses) {
            onBrowseCourses();
        } else {
            const el = document.getElementById('courses-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCorporateClick = () => {
        if (onCorporateClick) {
            onCorporateClick();
        } else {
            const el = document.getElementById('b2b-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="relative bg-[#110922] text-white py-24 overflow-hidden font-sans border-t-4 border-[#FCCA29]">
                {/* Background elements */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(213,76,128,0.12)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute right-10 top-12 w-64 h-64 rounded-full border border-white/10 opacity-30 pointer-events-none" />

                <div className="max-w-[1380px] mx-auto px-6 relative z-10 flex flex-col items-start text-left">
                    {/* Hero Title and Description */}
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6 text-white">
                            Advanced Consultant<br />
                            Pathologist<br />
                            <span className="text-[#E84583]">Mastery Series.</span>
                        </h1>

                        <p className="text-gray-300 text-base md:text-[17px] max-w-3xl leading-relaxed mb-10">
                            A premium collection of live, case-based, consultant-level programs that bridge 
                            residency and independent practice — building the diagnostic reasoning, reporting, 
                            and medico-legal judgment to sign out with confidence.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                            <button 
                                onClick={handleBrowseClick}
                                className="w-full sm:w-auto px-8 py-3.5 bg-[#FCCA29] text-black font-extrabold text-sm rounded-full hover:bg-[#e5b422] transition duration-200 shadow-lg shadow-[#FCCA29]/10 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                            >
                                Browse Courses <span className="font-normal">—</span>
                            </button>
                            <button 
                                onClick={handleCorporateClick}
                                className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white/20 text-white font-extrabold text-sm rounded-full hover:border-[#FCCA29] hover:text-[#FCCA29] transition duration-200 flex items-center justify-center cursor-pointer whitespace-nowrap"
                            >
                                Corporate & Institutional Cohorts
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideal For Section */}
            <div className="bg-white py-12 border-b border-gray-200/50">
                <div className="max-w-[1380px] mx-auto px-6 text-center">
                    {/* Separator */}
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-[2px] bg-[#FCCA29]" />
                        <span className="text-[#A16207] text-[10px] font-extrabold tracking-[0.25em] uppercase">
                            IDEAL FOR
                        </span>
                        <div className="w-8 h-[2px] bg-[#FCCA29]" />
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
                        {badges.map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="px-5 py-2.5 bg-white border border-[#EBE3D8] text-[#160B29] font-medium text-xs rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)] tracking-wide"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Caption */}
                    <p className="text-gray-500 text-sm font-medium">
                        For pathology <span className="text-[#160B29] font-extrabold">residents, fellows & consultants</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AdvancedPathology;