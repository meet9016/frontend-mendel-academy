import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const Faq = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const faqs = [
        { question: "What are the benefits of high yield MCQ based learning?" },
        { question: "How can mnemonics help in mastering complex medical concepts?" },
        { question: "What are Mendal SketchNotes, and how do they help in medical exam prep?" },
        { question: "What are Mendal Flowcharts, and how do they help in medical exam prep?" },
        { question: "How do self-assessment tests with performance analytics help in exam preparation?" },
        { question: "How do tests and discussions benefit medical students?" },
        { question: "How can I join the Telegram study group for Mendal Academy?" }
    ];


    return (
        <div>
            <section className=" mb-10 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Heading */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                FAQs
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#ffcb04] to-amber-400 mx-auto rounded-full"></div>
                        </div>

                        {/* FAQ Items */}
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full p-6 flex items-center justify-between text-left hover:bg-yellow-50 transition-colors"
                                    >
                                        <span className="text-lg font-medium text-gray-900 pr-4">
                                            {faq.question}
                                        </span>
                                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                            {openFaq === index ? (
                                                <FaChevronUp className="text-[#ffcb04]" />
                                            ) : (
                                                <FaChevronDown className="text-[#ffcb04]" />
                                            )}
                                        </div>
                                    </button>

                                    {openFaq === index && (
                                        <div className="px-6 pb-6">
                                            <div className="pt-4 border-t border-gray-200">
                                                <p className="text-gray-600">
                                                    Our comprehensive program addresses this through structured learning and expert guidance.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Faq