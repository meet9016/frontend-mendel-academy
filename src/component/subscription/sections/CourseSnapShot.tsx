import React from 'react'
import { motion } from "framer-motion";
import { FiCheckCircle } from 'react-icons/fi'

interface Topic {
    title: string;
    description: string;
}

const CourseSnapShot: React.FC = () => {
    const leftTopics: Topic[] = [
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

    const rightTopics: Topic[] = [
        {
            title: "Biopsy Reporting Guide",
            description: "secretory, proliferative, atrophic, IUD, hormonal, pregnancy",
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

    // Reusable Topic Card Component
    const TopicCard: React.FC<{ topic: Topic; index: number }> = ({ topic, index }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white border-2 border-primary rounded-2xl p-6 hover:border-[#ffca00] hover:shadow-lg transition-all duration-300"
        >
            <div className="flex gap-4">
                <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-primary bg-white flex items-center justify-center group-hover:border-[#ffca00] transition-colors duration-300">
                        <FiCheckCircle
                            className="text-primary text-2xl group-hover:text-[#ffca00] transition-colors duration-300"
                            strokeWidth={2.5}
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold ff-font-bold mb-2 text-gray-800 group-hover:text-[#ffca00] transition-colors duration-300">
                        {topic.title}
                    </h3>
                    <p className="ff-font leading-relaxed text-gray-600">
                        {topic.description}
                    </p>
                </div>
            </div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffca00] opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity duration-300"></div>
        </motion.div>
    );

    return (
        <section className="bg-white py-15">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4 text-gray-800">
                        Course Snapshot
                    </h2>
                    <p className="text-lg ff-font max-w-3xl mx-auto text-gray-600">
                        Focused, evidence-based training in diagnostic histopathology of
                        the endometrium.
                    </p>
                </motion.div>

                {/* Topics Grid */}
                <div className="grid md:grid-cols-2 cursor-pointer gap-8 md:gap-12">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {leftTopics.map((topic, index) => (
                            <TopicCard key={`left-${index}`} topic={topic} index={index} />
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {rightTopics.map((topic, index) => (
                            <TopicCard key={`right-${index}`} topic={topic} index={index + leftTopics.length} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseSnapShot;