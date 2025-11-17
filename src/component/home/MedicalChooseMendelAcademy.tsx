'use client'
import CommonButton from '@/comman/Button'
import React from 'react'
import { FaUserMd, FaGraduationCap, FaChartLine, FaClock, FaUsers, FaCertificate } from 'react-icons/fa'

const MedicalChooseMendelAcademy = () => {
    const features = [
        {
            icon: <FaUserMd  />,
            title: 'Expert-Led Instruction',
            desc: 'Learn directly from board-certified pathologists and experienced educators with years of clinical experience.',
            tag: 'Board-certified faculty',
        },
        {
            icon: <FaGraduationCap  />,
            title: 'Comprehensive Curriculum',
            desc: 'Master essential pathology concepts with structured lessons, interactive case studies, and assessments.',
            tag: '600+ case studies',
        },
        {
            icon: <FaChartLine />,
            title: 'Proven Track Record',
            desc: '95% of our students successfully advance their medical careers within six months of course completion.',
            tag: '95% success rate',
        },
        {
            icon: <FaClock  />,
            title: 'Flexible Learning',
            desc: 'Access your courses anytime, anywhere — learn at your own pace with live and recorded sessions.',
            tag: 'Learn anywhere, anytime',
        },
        {
            icon: <FaUsers />,
            title: 'Peer Community',
            desc: 'Join 10,000+ medical professionals in our exclusive online study groups and collaborative network.',
            tag: '10,000+ active members',
        },
        {
            icon: <FaCertificate />,
            title: 'Certification Ready',
            desc: 'Comprehensive preparation for board exams and professional certification requirements.',
            tag: 'Board exam focused',
        },
    ]

    return (
        <main className="flex flex-col items-center justify-center min-h-[60vh] bg-white px-4 md:px-6 lg:px-8 py-15">
            {/* Title Section */}
            <div className="text-center space-y-1">
                <h1 className="text-4xl md:text-3xl ff-font-bold font-extrabold">
                    Why Medical Professionals
                </h1>
                <h2 className="text-4xl md:text-3xl ff-font-bold font-extrabold">
                    Choose Mendel Academy
                </h2>
            </div>

            {/* Subtitle */}
            <div className="text-center mt-4 ff-font text-base md:text-lg">
                <p>
                    Our comprehensive pathology platform accelerates your professional growth and clinical
                </p>
                <p>expertise.</p>
            </div>

            {/* Cards Section */}
            <section className="w-full max-w-[1025px] mx-auto mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-2xl hover:border-yellow-300 transition-all duration-300"
                        >
                            {/* Tag Badge */}
                            <div className="absolute top-3 right-3 ff-font text-primary border-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                                {feature.tag}
                            </div>

                            {/* Icon Circle */}
                            <div className="bg-white text-primary w-14 h-14 text-3xl border-primary flex items-center justify-center rounded-xl mt-6 ml-6 shadow-md group-hover:scale-110  duration-300">
                                {feature.icon}
                            </div>

                            {/* Text Content */}
                            <div className="p-6 pt-4 space-y-3">
                                <h3 className="text-lg font-bold ff-font-bold">{feature.title}</h3>
                                <p className="ff-font text-sm leading-relaxed">{feature.desc}</p>

                                <button className="text-primary ff-font-bold font-semibold hover:underline flex items-center gap-1 mt-3">
                                    Learn more <span>→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Join Section */}
                <div className="mt-16 w-full flex justify-center">
                    <div className="flex items-center gap-4 bg-[#f9fafb] py-3 px-6 rounded-full shadow-sm border border-gray-100">
                        {/* Circles */}
                        {/* <div className="flex items-center -space-x-1">
                            {["A", "B", "C", "D"].map((letter, i) => (
                                <div
                                    key={i}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-[#ff7a00] text-white font-semibold text-sm shadow-md"
                                >
                                    {letter}
                                </div>
                            ))}
                        </div> */}

                        {/* Text */}
                        <p className=" ff-font-bold text-sm md:text-base font-medium">
                            Join <span className="font-extrabold">10,000+</span> medical professionals learning with us
                        </p>
                    </div>
                </div>

                <div className="mt-16 w-full flex justify-center">
                    <div className="w-full max-w-3xl bg-black text-center text-white py-22 px-6 rounded-2xl relative shadow-lg ">
                        {/* Top Tag */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2">
                            <span className="bg-white text-primary border-primary ff-font-bold text-xs font-semibold px-4 py-1 rounded-full shadow">
                                Stay Updated
                            </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl ff-font-bold md:text-3xl font-bold mt-6">
                            Stay Ahead in Medical Education
                        </h2>

                        {/* Description */}
                        <p className="mt-4 ff-font text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
                            Get expert insights, course updates, and exclusive content—be first to
                            know about new programs & breakthroughs.
                        </p>

                        {/* Button */}
                        {/* <button className="mt-8 bg-yellow-400 hover:bg-yellow-500 cursor-pointer text-black font-semibold px-6 py-3 rounded-md text-sm md:text-base flex items-center justify-center gap-2 mx-auto transition-colors duration-200">
                            Subscribe to Newsletter <span>→</span>
                        </button> */}
                        <CommonButton pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} className='mt-8'>
                            Enroll Now <span>→</span>
                        </CommonButton>
                    </div>
                </div>

                {/* Bottom Note */}
                <div className="w-full flex justify-center mt-6">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 shadow-sm text-sm">
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        <span className="font-medium ff-font-bold">Unsubscribe anytime</span>
                        <span className="ff-font">•</span>
                        <span>Trusted by medical professionals worldwide</span>
                    </div>
                </div>


            </section>
        </main>
    )
}

export default MedicalChooseMendelAcademy
