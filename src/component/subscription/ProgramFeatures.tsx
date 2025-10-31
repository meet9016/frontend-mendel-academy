import React from 'react'
import { FaBalanceScale, FaCheckCircle, FaTrophy } from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { MdBiotech } from 'react-icons/md';
import { TbDna2 } from 'react-icons/tb';

const ProgramFeatures = () => {
    const features = [
        {
            icon: TbDna2,
            title: "Real-Life Diagnostic Insights",
            description: "Go beyond textbooks with real biopsy cases",
            color: "from-amber-400 to-yellow-500",
            iconBg: "bg-gradient-to-br from-amber-50 to-yellow-100",
        },
        {
            icon: HiDocumentText,
            title: "Annotated Image Decks",
            description: "Morphologic mastery with curated visuals",
            color: "from-yellow-400 to-amber-500",
            iconBg: "bg-gradient-to-br from-yellow-50 to-amber-100",
        },
        {
            icon: MdBiotech,
            title: "IHC Ladders",
            description: "Smart interpretation, not rote memorization",
            color: "from-amber-500 to-yellow-600",
            iconBg: "bg-gradient-to-br from-amber-50 to-yellow-50",
        },
        {
            icon: FaBalanceScale,
            title: "Legal-Safe Reporting kit",
            description: "100+ scenarios to keep you compliant and protected",
            color: "from-yellow-500 to-amber-600",
            iconBg: "bg-gradient-to-br from-yellow-100 to-amber-50",
        },
        {
            icon: FaCheckCircle,
            title: "Mendel Self-Audit Checklist™",
            description: "Go beyond textbooks with real biopsy cases",
            color: "from-amber-400 to-yellow-500",
            iconBg: "bg-gradient-to-br from-amber-100 to-yellow-50",
        },
        {
            icon: FaTrophy,
            title: "Dual Certification (Module-3 only)",
            description: "Stand out with advanced credentials",
            color: "from-yellow-600 to-amber-500",
            iconBg: "bg-gradient-to-br from-yellow-50 to-amber-100",
        },
    ];
    return (
        <div>
            <section className="py-15 px-4 relative bg-[#f9fafb]">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why you will love this program
                        </h2>
                    </div>

                    {/* Grid */}
                    <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="group relative">
                                    <div
                                        className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                                        aria-hidden="true"
                                    />
                                    <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 h-full">
                                        <div className="mb-6 relative">
                                            <div
                                                className={`w-20 h-20 ${feature.iconBg} rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center relative overflow-hidden`}
                                            >
                                                <div className="absolute top-0 right-0 w-8 h-8 opacity-40 bg-yellow-400" />
                                                <Icon
                                                    className="text-4xl relative z-10 group-hover:scale-110 transition-transform duration-300 text-yellow-500"
                                                />
                                            </div>
                                            <div className="absolute -bottom-2 -right-2 w-6 h-6 rounded-full opacity-30 bg-yellow-400" />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Decorative accents */}
                    <div className="absolute left-10 top-1/4 w-32 h-32 rounded-full opacity-5 bg-yellow-400" />
                    <div className="absolute right-20 bottom-1/4 w-24 h-24 rotate-45 opacity-5 bg-yellow-400" />
                </div>
            </section>
        </div>
    )
}

export default ProgramFeatures