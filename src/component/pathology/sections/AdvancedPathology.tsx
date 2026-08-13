'use client';
import React from 'react';

const AdvancedPathology = ({ onBrowseCourses, onCorporateClick }: { onBrowseCourses?: () => void; onCorporateClick?: () => void }) => {
    const badges = [
        'MD Pathology',
        'DNB',
        'NEET-SS - India',
        'ABPath - USA',
        'FRCPath - UK'
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
        <section className="relative bg-[#150E28] text-white py-20 overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(213,76,128,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute right-10 top-12 w-64 h-64 rounded-full border border-white/10 opacity-30 pointer-events-none" />

            <div className="max-w-[1380px] mx-auto px-6 relative z-10 text-center md:text-left flex flex-col items-center">
                {/* Hero Title and Description */}
                <div className="max-w-4xl text-center">
                    <h1 className="text-4xl md:text-[56px] font-extrabold leading-[1.1] tracking-tight mb-6">
                        Advanced Consultant<br />
                        Pathologist<br />
                        <span className="text-[#D54C80]">Mastery Series.</span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
                        A premium collection of live, case-based, consultant-level programs that bridge 
                        residency and independent practice — building the diagnostic reasoning, reporting, 
                        and medico-legal judgment to sign out with confidence.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button 
                            onClick={handleBrowseClick}
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#FFC900] text-black font-bold text-base rounded-full hover:bg-[#e6b500] transition duration-200 shadow-lg shadow-[#FFC900]/10 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            Browse Courses <span className="text-lg">→</span>
                        </button>
                        <button 
                            onClick={handleCorporateClick}
                            className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white/40 text-white font-bold text-base rounded-full hover:border-[#FFC900] hover:text-[#FFC900] transition duration-200 flex items-center justify-center cursor-pointer"
                        >
                            Corporate & Institutional Cohorts
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdvancedPathology;