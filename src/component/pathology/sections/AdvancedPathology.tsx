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
            <section className="relative bg-[#150E28] text-white py-[56px] overflow-hidden font-sans bg-[radial-gradient(1100px_700px_at_80%_10%,#1E1540,#150E28_65%)]">
                {/* Background elements */}
                <div className="absolute -right-[160px] -top-[160px] w-[520px] h-[520px] rounded-full border border-white/5 bg-transparent pointer-events-none" />
                <div className="absolute -right-[100px] -top-[100px] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(224,86,143,0.16)_0%,transparent_70%)] pointer-events-none" />

                <div className="max-w-[880px] mx-auto px-6 relative z-10 flex flex-col items-start text-left">
                    {/* Hero Title and Description */}
                    <div className="max-w-4xl">
                        <span className="inline-block text-[0.7rem] tracking-[0.16em] uppercase bg-[#FFC900] text-[#1A1502] px-[16px] py-[7px] rounded-full mb-[22px] font-medium">
                            COHORT / MASTERY SERIES
                        </span>
                        <h1 className="text-4xl md:text-[3.7rem] font-extrabold leading-[1.08] tracking-tight mb-[22px] text-white">
                            Advanced Consultant<br />
                            Pathologist<br />
                            <span className="text-[#E0568F]">Mastery Series.</span>
                        </h1>

                        <p className="text-white/85 text-[1.16rem] max-w-[680px] leading-[1.65] mb-[34px]">
                            A premium collection of live, case-based, consultant-level programs that bridge 
                            residency and independent practice — building the diagnostic reasoning, reporting, 
                            and medico-legal judgment to sign out with confidence.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap items-center justify-start gap-[14px]">
                            <button 
                                onClick={handleBrowseClick}
                                className="px-[30px] py-[15px] bg-[#FFC900] text-[#1A1502] font-bold text-[1rem] rounded-full hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)] transition duration-200 flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                            >
                                Browse Courses <span className="font-bold">→</span>
                            </button>
                            <button 
                                onClick={handleCorporateClick}
                                className="px-[30px] py-[15px] bg-transparent border-2 border-white/40 text-white font-bold text-[1rem] rounded-full hover:border-[#FFC900] hover:text-[#FFC900] transition duration-200 flex items-center justify-center cursor-pointer whitespace-nowrap"
                            >
                                Corporate & Institutional Cohorts
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ideal For Section */}
            <div className="bg-white border-b border-[#E6E0D8]">
                <div className="max-w-[1180px] mx-auto py-[34px] px-6 text-center">
                    {/* Separator */}
                    <div className="flex items-center justify-center gap-3 mb-[18px]">
                        <div className="w-[24px] h-[2px] bg-[#FFC900]" />
                        <span className="text-[#5C5575] text-[0.72rem] font-bold tracking-[0.14em] uppercase">
                            IDEAL FOR
                        </span>
                        <div className="w-[24px] h-[2px] bg-[#FFC900]" />
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-[12px] mb-4">
                        {badges.map((badge, idx) => (
                            <span 
                                key={idx} 
                                className="px-[16px] py-[8px] bg-[#FAF7F2] border border-[#E6E0D8] text-[#241E3D] font-semibold text-[0.74rem] rounded-full tracking-[0.02em]"
                            >
                                {badge}
                            </span>
                        ))}
                    </div>

                    {/* Caption */}
                    <p className="text-[#5C5575] text-[0.9rem] font-medium mt-[2px]">
                        For pathology <span className="text-[#5C5575] font-bold">residents, fellows & consultants</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default AdvancedPathology;