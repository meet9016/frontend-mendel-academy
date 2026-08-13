"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';

export type FaqItem = {
  id: number;
  title: string;
  description?: string;
};

const PathologyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${endPointApi.getAllFaq}`);
      setFaqs(res.data || []);
    } catch (err) {
      console.error('[PathologyFAQ] API error:', err);
    } finally {
      setTimeout(() => setLoading(false), 100);
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-t border-[#EBE8E2] font-sans">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Subtitle & Title */}
        <div className="text-center mb-16">
          <div className="flex items-center gap-3 justify-center mb-4">
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FFC900] font-black">Good to Know</span>
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
          </div>
          <h2 className="text-3xl md:text-[40px] font-black tracking-tight text-[#1D172A]">
            Frequently asked <span className="text-[#D54C80]">questions.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="border-t border-[#EBE8E2] divide-y divide-[#EBE8E2]">
          {loading ? (
            <FaqSkeleton />
          ) : (
            faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id} className="py-6">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="text-base font-extrabold text-[#1D172A] group-hover:text-[#D54C80] transition duration-150 pr-4">
                      {faq.title}
                    </span>
                    <span className="text-2xl text-[#D54C80] font-light leading-none select-none pl-4">
                      {isOpen ? '—' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && faq.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div 
                          className="mt-4 text-[#5C5575] text-sm md:text-base leading-relaxed pr-8"
                          dangerouslySetInnerHTML={{
                            __html: faq.description
                              .replace(/&lt;/g, "<")
                              .replace(/&gt;/g, ">")
                              .replace(/&amp;/g, "&")
                              .replace(/&quot;/g, '"')
                              .replace(/&#39;/g, "'"),
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

// Skeleton Loader
const FaqSkeleton = () => (
  <div className="space-y-6 pt-4">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="py-4 flex flex-col gap-2 border-b border-[#EBE8E2]">
        <div className="h-6 bg-gray-200/60 rounded w-3/4 animate-pulse" />
      </div>
    ))}
  </div>
);

export default PathologyFAQ;
