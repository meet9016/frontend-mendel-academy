import React from 'react'
import Header from '../auth/Header'
import { FaEarthAmericas } from 'react-icons/fa6'
import { FaTrophy } from 'react-icons/fa'
import Footer from '../auth/Footer'

const MainAbout = () => {
    return (
        <>
            <Header />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden h-[400px] md:h-[500px]">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            'url(https://www.shutterstock.com/image-photo/artificial-intelligence-content-generator-man-600nw-2471042165.jpg)',
                    }}
                >
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
                    <div className="text-center animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold ff-font-bold text-white drop-shadow-2xl">
                            About Mendel Academy
                        </h1>
                    </div>
                </div>
            </section>

            {/* COMPANYINFO  */}
            <section className="py-15 bg-gradient-to-b from-background to-secondary/30">    
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Logo and Content Grid */}
                        <div className="grid md:grid-cols-12 gap-12 items-center">
                            {/* Logo Section */}
                            <div className="md:col-span-4 flex justify-center animate-slide-in-left">
                                <div className="relative group flex items-center gap-5">
                                    {/* Glow Effect */}
                                    {/* <div
                                        className="absolute -inset-4 rounded-3xl opacity-40 group-hover:opacity-70 blur-2xl transition-all duration-500"
                                        style={{
                                            background:
                                                "radial-gradient(circle at center, #ffcc09 0%, rgba(255,204,9,0.3) 40%, transparent 80%)",
                                            boxShadow: "0 0 40px 10px rgba(255,204,9,0.25)",
                                        }}
                                    ></div> */}

                                    {/* Logo Container */}
                                    <div className="relative bg-white rounded-2xl p-6 shadow-xl border border-gray-200 hover:border-[#ffcc09] transition-all duration-500 hover:shadow-[0_0_35px_#ffcc09]">
                                        <img
                                            src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
                                            alt="Mendel Academy Logo"
                                            className="w-24 h-auto transform group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Text Next to Logo */}
                                    <div className="relative">
                                        <h2 className="text-3xl font-extrabold ff-font-bold tracking-tight">
                                            Mendel <span className="text-primary ff-font-bold">Academy</span>
                                        </h2>

                                    </div>
                                </div>
                            </div>



                            {/* Text Content */}
                            <div className="md:col-span-8 space-y-6 animate-slide-in-right">
                                {/* Paragraph 1 */}
                                <div className="bg-white rounded-2xl p-8  border border-primary transition-all duration-500 ">
                                    <p className="text-lg leading-relaxed ff-font-bold">
                                        <span className="font-bold ff-font text-primary]">
                                            Mendel EdTech Pvt Ltd (Mendel Academy)
                                        </span>{' '}
                                        is a family-owned startup offering a digital education platform for medical school graduates.
                                        Founded in 2015, Mendel Academy offers an adaptive{' '}
                                        <span className="font-semibold ff-font text-primary">live-online course</span>{' '}
                                        for students to prepare for highly specialized licensure exams.
                                    </p>
                                </div>

                                {/* Paragraph 2 */}
                                <div className="bg-white rounded-2xl p-8 border border-primary transition-all duration-500 ">
                                    <p className="text-lg leading-relaxed ff-font-bold mb-6">
                                        Here at{' '}
                                        <span className="font-bold ff-font text-primary">Mendel Academy</span>, we have been
                                        providing personalized coaching to over{' '}
                                        <span className="font-bold ff-font text-primary">1000 medical students</span> for
                                        licensure exams with special focus on the USMLEs; resulting in over{' '}
                                        <span className="font-bold ff-font text-primary">
                                            90% students matching into top residency programs
                                        </span>. In the wake of the pandemic, Mendel Academy has adapted to the
                                        changing times and incorporated modern EdTech tools to provide an online
                                        coaching paradigm which is now easily accessible for medical students all
                                        around the world.
                                    </p>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* OUR MISSIION */}
            <section className="relative py-15 bg-[#f9fafb] overflow-hidden">
                <div className="container mx-auto px-6 md:px-12 lg:px-50 relative z-10">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold ff-font-bold mb-4">
                            Our Achievements & Vision
                        </h2>
                        <p className="ff-font max-w-3xl mx-auto text-lg">
                            Building excellence in medical education through innovation,
                            accessibility, and precision learning.
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left - Achievements */}
                        <div className="bg-white rounded-3xl  border border-primary p-10 relative transition-all duration-500">
                            {/* <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#ffcc09]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all"></div> */}
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-primary text-primary text-3xl">
                                        <FaTrophy />
                                    </div>
                                    <h3 className="text-2xl font-bold ff-font-bold">
                                        Our Achievements
                                    </h3>
                                </div>
                                <p className="ff-font text-lg leading-relaxed">
                                    At{" "}
                                    <span className="font-semibold text-primary">
                                        Mendel Academy
                                    </span>
                                    , we’ve developed a proprietary
                                    <span className="font-bold text-primary"> question bank </span>
                                    of over
                                    <span className="font-bold text-primary">
                                        {" "}
                                        10,000 USMLE-style MCQs
                                    </span>
                                    , helping students enhance their performance by{" "}
                                    <span className="font-bold text-primary">15–20%</span>.
                                </p>
                                <p className="ff-font text-lg leading-relaxed mt-4">
                                    We take pride in our unique{" "}
                                    <span className="font-bold text-primary">
                                        "Mendel SketchNotes"
                                    </span>
                                    , designed to simplify complex medical concepts with elegant
                                    visuals and precise annotations. Mendel Academy has established
                                    its presence in{" "}
                                    <span className="font-semibold text-primary">
                                        India, USA, Russia, China,
                                    </span>{" "}
                                    and beyond.
                                </p>
                            </div>
                        </div>

                        {/* Right - Vision */}
                        <div className="bg-white rounded-3xl  border border-primary p-10 relative  transition-all duration-500">
                            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-bl from-[#ffcc09]/20 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-all"></div>
                            <div className="relative z-10 text-center md:text-left">
                                {/* ✅ Logo and Text side by side */}
                                <div className="flex justify-center md:justify-start items-center gap-4 mb-6">
                                    <img
                                        src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
                                        alt="Mendel Academy"
                                        className="w-20 h-auto"
                                    />
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-extrabold ff-font-boldleading-tight">
                                            Mendel
                                        </h2>
                                        <h3 className="text-3xl font-extrabold text-primary leading-tight">
                                            Academy
                                        </h3>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold ff-font-bold mb-4">
                                    Our Vision
                                </h3>
                                <p className="ff-font text-lg leading-relaxed">
                                    Our vision at{" "}
                                    <span className="font-semibold ff-font text-primary">
                                        Mendel Academy
                                    </span>{" "}
                                    is to create an{" "}
                                    <span className="font-bold ff-font text-primary">
                                        accessible digital coaching platform
                                    </span>{" "}
                                    that empowers medical students globally to unlock their full
                                    potential — regardless of cost or location.
                                </p>

                                <div className="mt-6 flex justify-center md:justify-start">
                                    <div className="flex items-center gap-3 ff-font text-primary font-semibold text-lg">
                                        <FaEarthAmericas className="text-2xl" />
                                        <span>Global Learning, Limitless Access</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ✅ Decorative Yellow Glows (raised higher) */}
                {/* <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#ffcc09]/30 rounded-full blur-3xl opacity-60"></div>
                <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#ffcc09]/40 rounded-full blur-3xl opacity-40"></div> */}
            </section>

            <Footer />
        </>
    )
}

export default MainAbout