import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import React, { useCallback, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

;
type QuestionType = {
    id: number;
    title: string;
    description?: string;
};

const Faq = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [data, setData] = useState<QuestionType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    const getFaqData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(`${endPointApi.getAllFaq}`);
            setData(res.data || [])
        } catch (err) {
            console.error(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    }, []);

    useEffect(() => {
        getFaqData();
    }, [getFaqData]);

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
                            {
                                loading ? skeletonFaq :
                                    data.map((faq, index) => (
                                        <div
                                            key={index}
                                            className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                                className="w-full p-6 flex items-center justify-between text-left hover:bg-yellow-50 transition-colors"
                                            >
                                                <span className="text-lg font-medium text-gray-900 pr-4">
                                                    {faq.title}
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
                                                        <div
                                                            className="text-gray-600"
                                                            dangerouslySetInnerHTML={{ __html: faq.description || "" }}
                                                        >
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}




const skeletonFaq = (
    <div className="space-y-4">
        {[1, 2, 3].map((_, i) => (
            <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-center justify-between"
            >
                {/* Left: Fake Skeleton Line */}
                <div className="h-[30px] w-[95%] bg-gray-200 rounded-md animate-pulse"></div>

                {/* Right: Small Box Placeholder */}
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
            </div>
        ))}
    </div>
);






export default Faq