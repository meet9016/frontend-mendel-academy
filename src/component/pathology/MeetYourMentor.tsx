import React from 'react'
import { FaBriefcase, FaCertificate, FaFlask, FaSearch } from 'react-icons/fa'

const MeetYourMentor = () => {
    return (
        <>
            <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#fff8e1] via-white to-[#fffdf5]">
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-72 h-72 bg-[#f0b100]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#f0b100]/5 rounded-full blur-3xl" />

                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Title */}
                    <div className="text-center mb-16 animate-fade-in-down">
                        <h2 className="text-5xl md:text-6xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#f0b100] to-yellow-600 bg-clip-text text-transparent">
                                Meet Your
                            </span>{' '}
                            <span className="text-foreground">Mentor</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#f0b100] to-yellow-600 mx-auto rounded-full" />
                    </div>

                    {/* Main Content */}
                    <div className="relative">
                        {/* Hexagonal Background Decoration */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5">
                            <svg width="800" height="800" viewBox="0 0 100 100" className="animate-spin-slow">
                                <polygon
                                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                                    fill="none"
                                    stroke="#f0b100"
                                    strokeWidth="0.5"
                                />
                            </svg>
                        </div>

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Left Side - Profile */}
                            <div className="relative animate-fade-in-left">
                                <div className="relative inline-block">


                                    {/* Profile Card */}
                                    <div className="relative bg-white/80 backdrop-blur-lg rounded-[2rem] p-8 shadow-2xl border-2 border-[#f0b100]/20">
                                        {/* Profile Image with Geometric Frame */}
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#f0b100]/30 to-yellow-600/30 rounded-full blur-2xl" />
                                            <div className="relative w-48 h-48 mx-auto">
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#f0b100] to-yellow-600 rounded-full animate-spin-slow opacity-20" />
                                                <div className="absolute inset-2 bg-white rounded-full" />
                                                <img
                                                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
                                                    alt="Dr. Kishor Managoli"
                                                    className="absolute inset-3 w-[168px] h-[168px] rounded-full object-cover border-4 border-[#f0b100]/30"
                                                />
                                            </div>
                                            {/* Floating Badge (Jump Animation) */}
                                            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-[#f0b100] to-yellow-600 text-white px-4 py-2 rounded-full shadow-lg animate-jump">
                                                <span className="text-sm font-bold">MD</span>
                                            </div>

                                        </div>

                                        {/* Name and Title */}
                                        <div className="text-center mb-6">
                                            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#f0b100] to-yellow-600 bg-clip-text text-transparent">
                                                Dr. Kishor Managoli, MD
                                            </h3>
                                            <p className="text-lg text-muted-foreground font-medium mb-1">
                                                Senior Surgical & Digital Pathologist
                                            </p>
                                            <p className="text-md text-muted-foreground">
                                                Founder & Chief Educator, Mendel Academy
                                            </p>
                                        </div>

                                        {/* Description */}
                                        <div className="bg-gradient-to-br from-[#f0b100]/5 to-yellow-600/5 rounded-2xl p-6 border border-[#f0b100]/10">
                                            <p className="text-muted-foreground leading-relaxed text-center">
                                                Dr. Managoli is popular for providing his students a transformational experience.
                                                His mentorship is deeply interactive and case-based, designed to help you think
                                                critically, diagnose confidently, and connect pathology to real clinical decisions.
                                                Every session challenges you to engage, question, and evolve, not just as a learner,
                                                but as a future leader in diagnostics. Under his mentorship, you will build a strong
                                                foundation in surgical pathology, master digital techniques, and develop critical
                                                thinking skills essential for diagnostic excellence.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Achievements */}
                            <div className="space-y-6 cursor-pointer animate-fade-in-right">
                                {[
                                    { icon: FaBriefcase, text: '30+ years of Surgical & Pathology experience' },
                                    { icon: FaFlask, text: 'Actively involved in stem cell research' },
                                    { icon: FaSearch, text: '15 years of clinical research in the U.S.' },
                                    { icon: FaCertificate, text: '8 U.S. patents' },
                                ].map((achievement, index) => (
                                    <div
                                        key={index}
                                        className="group relative animate-scale-in"
                                        style={{ animationDelay: `${index * 0.15}s` }}
                                    >
                                        {/* Card Background Glow */}
                                        <div className="absolute -inset-1 bg-gradient-to-r from-[#f0b100]/0 via-[#f0b100]/50 to-[#f0b100]/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                        {/* Achievement Card */}
                                        <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#f0b100]/20 shadow-lg hover:shadow-2xl hover:border-[#f0b100]/40 transition-all duration-500 hover:-translate-y-2">
                                            <div className="flex items-center gap-6">
                                                {/* Icon Container */}
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-[#f0b100] to-yellow-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                                                    <div className="relative bg-gradient-to-br from-[#f0b100] to-yellow-600 rounded-2xl p-4 transform group-hover:rotate-6 transition-transform duration-500">
                                                        <achievement.icon className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>

                                                {/* Text */}
                                                <p className="text-lg font-medium text-foreground flex-1 group-hover:text-[#f0b100] transition-colors">
                                                    {achievement.text}
                                                </p>
                                            </div>

                                            {/* Decorative Line */}
                                            <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#f0b100]/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MeetYourMentor