'use client';
import { BsArrowRight, BsCheck, BsCheckCircleFill } from 'react-icons/bs';
import { FiChevronDown } from 'react-icons/fi';
import { IoPlayCircle, IoPlaySharp } from 'react-icons/io5';

const MyProduct = () => {
    return (
        <div className="min-h-screen  ff-font text-[#1a1a1a] ">
            <div className="mx-auto px-0 ">
                {/* --- HEADER  --- */}
                <header className="mb-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-2">
                        LIBRARY
                    </p>
                    <h1 className="text-4xl ff-font-bold mb-3 font-bold tracking-tight">
                        My products
                    </h1>
                    <p className="text-gray-500 text-[15px]">
                        Eight courses across Step 1 and Step 2. Pick up where you left off, or browse what's next.
                    </p>
                </header>

                {/* --- STATS SECTION --- */}
                {/* --- STATS SECTION --- */}
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 mt-4">

                    {[
                        { label: 'IN PROGRESS', value: '3' },
                        { label: 'COMPLETED', value: '1' },
                        { label: 'UPCOMING', value: '2' },
                        { label: 'STUDIED TOTAL', value: '62', unit: 'h' }
                    ].map((stat, i) => (
                        <div key={i} className="flex flex-col">

                            <div className="text-[18px] sm:text-[22px] font-bold">
                                {stat.value}
                                {stat.unit && (
                                    <span className="text-[14px] sm:text-[16px] text-gray-400 ml-0.5">
                                        {stat.unit}
                                    </span>
                                )}
                            </div>

                            <div className="text-[10px] sm:text-[11px] text-[#6b6b66] font-bold t mt-1 uppercase">
                                {stat.label}
                            </div>

                        </div>
                    ))}

                </div>

                {/* --- DIVIDER LINE  --- */}
                <hr className="border-gray-300 my-4" />

                {/* --- NAVIGATION --- */}
                <div className="flex items-center justify-between mb-10 overflow-x-auto scrollbar-hide">
                    <div className="flex text-[14px] font-medium text-gray-500">
                        <div className="relative pb-4 mr-8 cursor-pointer group">
                            <span className="text-black ff-font-bold">All courses</span>
                            {/* Active Bottom Line */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFCA00]"></div>
                        </div>
                        <button className="pb-4 px-1 mr-8 text-[13px] hover:text-black ff-font transition-colors">Step 1</button>
                        <button className="pb-4 px-1 mr-8 text-[13px] hover:text-black ff-font transition-colors">Step 2</button>
                        <button className="pb-4 px-1 mr-8 text-[13px] hover:text-black ff-font transition-colors">In progress</button>
                        <button className="pb-4 px-1 mr-8 text-[13px] hover:text-black ff-font transition-colors">Completed</button>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1 text-gray-500 text-[13px] pb-4 cursor-pointer">
                        <span>Sort: <span className="text-black font-medium">Recently studied</span></span>
                        <FiChevronDown />
                    </div>
                </div>

                <div className="exam-card-shadow rounded-2xl p-5 sm:p-6 lg:p-8 mb-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-gray-100 relative overflow-hidden bg-white">

                    {/* Yellow line */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[4px] h-2/3 bg-[#FFCA00] rounded-r-full"></div>

                    {/* LEFT SECTION */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">

                        {/* Continue Button */}
                        <button className="bg-black text-primary ff-font px-5 py-2 rounded-full text-[10px] ff-font-bold font-bold tracking-widest uppercase w-fit">
                            CONTINUE STUDYING
                        </button>

                        {/* Content */}
                        <div className="flex flex-col">
                            <h2 className="text-xl sm:text-2xl lg:text-[24px] ff-font-bold font-bold mb-2">
                                Immunology
                            </h2>

                            <p className="text-gray-400 ff-font text-[13px] sm:text-[14px] mb-4">
                                USMLE Step 1 • Last studied 47 minutes ago • 142 questions remaining
                            </p>

                            {/* Progress */}
                            <div className="w-full sm:w-[300px] h-[3px] bg-gray-100 rounded-full overflow-hidden">
                                <div className="bg-[#FFCA00] h-full w-[70%]"></div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT BUTTON */}
                    <button className="bg-black text-primary px-5 sm:px-6 py-3 rounded-xl flex items-center justify-center gap-3 text-[12px] sm:text-[13px] ff-font-bold font-bold uppercase tracking-wider w-full sm:w-fit">
                        <IoPlaySharp className="text-primary" size={16} />
                        <span className="ff-font text-primary">Resume course</span>
                    </button>
                </div>







                {/* --- COURSE LIST SECTION --- */}
                <div className="mb-10">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-primary text-[11px] font-bold tracking-[0.15em] uppercase mb-2">FOUNDATIONS</p>
                            <h2 className="text-[26px] ff-font-bold font-bold">USMLE Step 1</h2>
                            <p className="text-[#6b6b66] text-[13px]">Pre-clinical sciences and basic medical knowledge.</p>
                        </div>
                        <p className="text-gray-400 text-[11px] font-bold ff-font tracking-widest uppercase mt-2">5 COURSES</p>
                    </div>

                    <div className=" border-t border-gray-100">
                        <CourseRow
                            id="01" title="Immunology" progress={68} status="Resume"
                            subtext="Innate & adaptive immunity, hypersensitivity reactions, immunodeficiencies, and vaccines."
                            questions="312 questions" accuracy="82" hours="14"
                        />
                        <CourseRow
                            id="02" title="Pathology" progress={56} status="Resume"
                            subtext="General & systems pathology, cellular injury, inflammation, neoplasia."
                            questions="216 questions" accuracy="79" hours="11"
                        />
                        <CourseRow
                            id="03" title="Microbiology" progress={42} status="Resume"
                            subtext="Bacteria, viruses, fungi, parasites, antimicrobials, and lab diagnosis techniques."
                            questions="186 questions" accuracy="74" hours="9"
                        />
                        <CourseRow
                            id="04" title="Pharmacology" progress={31} status="Resume"
                            subtext="Drug classes, mechanisms of action, side effects, drug interactions, and toxicology."
                            questions="142 questions" accuracy="71" hours="6"
                        />
                        <CourseRow
                            id="05" title="Biochemistry" progress={100} status="Completed"
                            subtext="Metabolism, genetics, molecular biology, enzymes, and clinical nutrition."
                            questions="428 questions" accuracy="88" hours="22"
                        />
                    </div>
                </div>











                {/* --- STEP 2 SECTION (Upcoming Courses) --- */}
                <div className="mb-10">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                        <div>
                            <p className="text-[#4267B2] text-[11px] font-bold ff-font tracking-[0.15em] uppercase mb-2">
                                CLINICAL KNOWLEDGE
                            </p>
                            <h2 className="text-2xl sm:text-[26px] ff-font-bold font-bold mb-2">
                                USMLE Step 2 CK
                            </h2>
                            <p className="text-gray-400 text-[14px] sm:text-[13px] ff-font">
                                Applied clinical knowledge across major specialties.
                            </p>
                        </div>

                        <p className="text-gray-400 ff-font text-[11px] font-bold tracking-widest uppercase">
                            2 COURSES • BOTH UPCOMING
                        </p>
                    </div>

                    {/* List */}
                    <div className="mt-4 border-t border-gray-200">

                        {/* Row 1 */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 border-b border-gray-200 opacity-60 gap-3">

                            {/* LEFT */}
                            <div className="flex gap-6 lg:gap-10 items-start">
                                <span className="text-gray-400 ff-font-bold font-bold text-lg mt-1">
                                    06
                                </span>

                                <div className="max-w-full sm:max-w-md">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-[18px] sm:text-[20px] ff-font-bold font-bold leading-tight text-gray-500">
                                            Internal medicine
                                        </h3>
                                        <span className="text-[9px] bg-[#E8F0FE] text-[#4267B2] px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">
                                            STEP 2
                                        </span>
                                    </div>

                                    <p className="text-gray-400 ff-font text-[13px] sm:text-[14px] leading-relaxed">
                                        Cardiology, pulmonology, GI, nephrology, endocrinology, and infectious disease.
                                    </p>
                                </div>
                            </div>

                            {/* CENTER */}
                            <div className="w-full lg:flex-1 lg:max-w-[320px] lg:px-10">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-[12px] text-gray-400 font-medium ff-font">
                                        460 questions available
                                    </div>
                                    <div className="text-xl sm:text-2xl text-gray-200">—</div>
                                </div>

                                <div className="w-full h-[2px] bg-gray-100"></div>

                                <div className="text-[11px] text-gray-300 mt-2 font-medium ff-font">
                                    Not yet started
                                </div>
                            </div>

                            {/* RIGHT (FIXED) */}
                            <div className="w-full lg:w-28 text-left lg:text-right mt-2 lg:mt-0">
                                <span className="text-gray-400 text-[13px] font-medium ff-font">
                                    Starts May 1
                                </span>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 border-b border-gray-200 opacity-60 gap-3">

                            {/* LEFT */}
                            <div className="flex gap-6 lg:gap-10 items-start">
                                <span className="text-gray-400 ff-font-bold font-bold text-lg mt-1">
                                    07
                                </span>

                                <div className="max-w-full sm:max-w-md">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-[18px] sm:text-[20px] ff-font-bold font-bold leading-tight text-gray-500">
                                            Pediatrics
                                        </h3>
                                        <span className="text-[9px] bg-[#E8F0FE] text-[#4267B2] px-1.5 py-0.5 rounded font-bold tracking-widest uppercase">
                                            STEP 2
                                        </span>
                                    </div>

                                    <p className="text-gray-400 ff-font text-[13px] sm:text-[14px] leading-relaxed">
                                        Newborn care, developmental milestones, common pediatric conditions, vaccines.
                                    </p>
                                </div>
                            </div>

                            {/* CENTER */}
                            <div className="w-full lg:flex-1 lg:max-w-[320px] lg:px-10">
                                <div className="flex justify-between items-end mb-2">
                                    <div className="text-[12px] text-gray-400 font-medium ff-font">
                                        380 questions available
                                    </div>
                                    <div className="text-xl sm:text-2xl text-gray-200">—</div>
                                </div>

                                <div className="w-full h-[2px] bg-gray-100"></div>

                                <div className="text-[11px] text-gray-300 mt-2 font-medium ff-font">
                                    Not yet started
                                </div>
                            </div>

                            {/* RIGHT (FIXED) */}
                            <div className="w-full lg:w-28 text-left lg:text-right mt-2 lg:mt-0">
                                <span className="text-gray-400 text-[13px] font-medium ff-font">
                                    Starts May 1
                                </span>
                            </div>
                        </div>

                    </div>
                </div>












                {/* --- RECOMMENDED SECTION --- */}
                <div className="border-t border-gray-100 ">
                    <div className="flex justify-between items-start mb-5">
                        <div>
                            <p className="text-primary ff-font text-[11px] font-bold tracking-[0.15em] uppercase mb-2">EXPAND YOUR LIBRARY</p>
                            <h2 className="text-3xl ff-font-bold font-bold mb-2  text-[#1a1a1a]">Recommended for you</h2>
                            <p className="text-gray-400 ff-font text-[15px]">Based on your progress in Biochemistry and Immunology.</p>
                        </div>
                        <button className="text-primary text-[11px] font-bold tracking-widest flex items-center gap-1 uppercase mt-2 hover:opacity-80 ff-font">
                            BROWSE ALL COURSES <BsArrowRight size={14} />
                        </button>
                    </div>

                    {/* Grid Container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <PromoCard
                            tag="STEP 1 • PRE-CLINICAL"
                            title="Anatomy & Embryology"
                            price="$49"
                            description="Pairs well with your strong Biochemistry foundation. 520 questions across 32 hours of structured content."
                        />
                        <PromoCard
                            tag="STEP 1 • HIGH-YIELD"
                            title="Behavioral Sciences"
                            price="$29"
                            description="Common topic on Step 1. Covers psychiatric disorders, ethics, and biostatistics in a focused 2-week course."
                        />
                        <PromoCard
                            tag="STEP 2 • CLINICAL"
                            title="Emergency Medicine"
                            price="$39"
                            description="High-acuity clinical scenarios, triage, and rapid stabilization. Boards-essential 14-hour course."
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Small Simple Components ---

const CourseRow = ({
    id,
    title,
    subtext,
    questions,
    accuracy,
    hours,
    progress,
    status,
}) => (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between py-4 border-b border-gray-200 group hover:bg-gray-50/30 transition-all gap-4">

        {/* LEFT */}
        <div className="flex gap-4 sm:gap-6 lg:gap-10 items-start">
            <span className="text-gray-400 ff-font-bold font-bold text-lg mt-1">
                {id}
            </span>

            <div className="max-w-full sm:max-w-md">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-[18px] sm:text-[20px] ff-font-bold font-bold leading-tight">
                        {title}
                    </h3>

                    <span className="text-[9px] bg-[#FFF9E1] text-[#E6B800] px-1.5 py-0.5 rounded font-bold tracking-widest ff-font uppercase">
                        STEP 1
                    </span>
                </div>

                <p className="text-[#6b6b66] ff-font text-[13px] sm:text-[14px] leading-relaxed">
                    {subtext}
                </p>
            </div>
        </div>

        {/* CENTER */}
        <div className="w-full lg:flex-1 lg:max-w-[320px] lg:px-10">
            <div className="flex justify-between items-end mb-2">
                <div className="text-[12px] text-[#6b6b66] font-medium">
                    {questions} • {accuracy}% accuracy
                </div>

                <div
                    className={`text-xl sm:text-[14px] ff-font-bold font-bold ${progress === 100 ? "text-[#4CAF50]" : "text-black"
                        }`}
                >
                    {progress}%
                </div>
            </div>

            <div className="w-full h-[3px] bg-gray-100 rounded-full overflow-hidden">
                <div
                    className={`h-full rounded-full ${progress === 100 ? "bg-[#4CAF50]" : "bg-[#FFCA00]"
                        }`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="text-[11px] text-gray-400 mt-2 ff-font font-medium">
                {hours} hours studied
            </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-28 flex lg:justify-end">
            {status === "Completed" ? (
                <div className="text-[#4CAF50] text-[13px] ff-font font-bold flex items-center gap-1">
                    <BsCheck size={20} /> Completed
                </div>
            ) : (
                <button className="text-black text-[13px] ff-font-bold font-bold flex items-center gap-2 group-hover:text-[#FFCA00] transition-colors">
                    Resume <BsArrowRight size={16} />
                </button>
            )}
        </div>
    </div>
);

const PromoCard = ({ title, price, tag, description }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div>
            <p className="text-primary ff-font text-[10px] font-bold tracking-[0.12em] uppercase mb-3">{tag}</p>
            <h4 className="text-[17px] ff-font-bold font-bold mb-2 text-[#1a1a1a]">{title}</h4>

            <p className="text-gray-500 ff-font text-[12.5px]  mb-3">
                {description}
            </p>
        </div>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
            <span className="font-bold ff-font text-[16px] text-[#1a1a1a]">{price}</span>
            <button className="text-gray-500 text-[12.5px] font-bold ff-font flex items-center gap-1 hover:text-black transition-colors uppercase tracking-tight">
                Add to library <BsArrowRight size={14} />
            </button>
        </div>
    </div>
);

export default MyProduct;