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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section className="py-[56px] bg-[#FAF7F2] font-sans">
      <div className="max-w-[820px] mx-auto px-6">

        {/* Subtitle & Title */}
        <div className="text-center mb-[50px]">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#E0568F] font-bold">Good to Know</span>
            <div className="w-[34px] h-[2px] bg-[#FFC900]" />
          </div>
          <h2 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight text-[#241E3D] leading-tight">
            Frequently asked <span className="text-[#E0568F]">questions.</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="border-t border-[#E6E0D8] divide-y divide-[#E6E0D8]">
          {loading ? (
            <FaqSkeleton />
          ) : (
            faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id} className="border-b border-[#E6E0D8]">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between text-left focus:outline-none cursor-pointer py-[22px] pr-10 relative group"
                  >
                    <span className="text-[1.05rem] font-bold text-[#241E3D] group-hover:text-[#E0568F] transition duration-150">
                      {faq.title}
                    </span>
                    <span className="absolute right-[6px] top-1/2 -translate-y-1/2 text-[1.5rem] text-[#E0568F] font-normal leading-none select-none">
                      {isOpen ? '–' : '+'}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && faq.description && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden bg-[#FAF7F2]"
                      >
                        <div
                          className="pb-[22px] text-[#5C5575] text-[0.97rem] leading-[1.65] bg-[#FAF7F2] faq-description-container"
                          dangerouslySetInnerHTML={{
                            __html: `<style>
                              .faq-description-container, 
                              .faq-description-container p, 
                              .faq-description-container span,
                              .faq-description-container div {
                                background-color: transparent !important;
                                background: transparent !important;
                              } 
                            </style>` + faq.description
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
