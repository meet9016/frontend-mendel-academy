import React from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const CourseSnapShot = () => {
    const leftTopics = [
        {
            title: "Biopsy Adequacy Criteria",
            description: "for context-specific evaluation",
        },
        {
            title: "Cycle Phase identification",
            description: "histomorphologic anchors",
        },
        {
            title: "EIN vs Hyperplasia",
            description: "hormonal effect unmasking",
        },
        {
            title: "Avoid Diagnostic Pitfalls",
            description: "artifacts & landmines",
        },
    ];

    const rightTopics = [
        {
            title: "Biopsy Reporting Guide",
            description:
                "secretory, proliferative, atrophic, IUD, hormonal, pregnancy",
        },
        {
            title: "Infertility Workup Reporting",
            description: "WHO/AFIP strategies",
        },
        {
            title: "IHC Ladder Workup",
            description: "PTEN, PAX2, MMR, p53",
        },
    ];
    return (
        <div>
            <section className="bg-white py-15">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Course Snapshot
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Focused, evidence-based training in diagnostic histopathology of
                            the endometrium.
                        </p>
                    </div>

                    {/* Topics Grid */}
                    <div className="grid md:grid-cols-2 cursor-pointer gap-8 md:gap-12">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {leftTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#fecd11] hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-[#fecd11] flex items-center justify-center">
                                                <FiCheckCircle
                                                    className="text-white text-2xl"
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {topic.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {topic.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#fecd11] opacity-5 rounded-bl-full"></div>
                                </div>
                            ))}
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {rightTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#fecd11] hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-[#fecd11] flex items-center justify-center">
                                                <FiCheckCircle
                                                    className="text-white text-2xl"
                                                    strokeWidth={2.5}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {topic.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {topic.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#fecd11] opacity-5 rounded-bl-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Decorative Line */}
                    <div className="mt-16 flex justify-center">
                        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#fecd11] to-transparent rounded-full"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CourseSnapShot