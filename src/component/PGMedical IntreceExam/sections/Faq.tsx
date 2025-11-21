// Faq.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';

// Faq.types.ts
export type FaqItem = {
  id: number;
  title: string;
  description?: string;
};

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFaqs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${endPointApi.getAllFaq}`);
      setFaqs(res.data || []);
    } catch (err) {
      console.error('[Faq] API error:', err);
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
    <section className="py-15 bg-[#f9fafb]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="FAQs" />

          <div className="space-y-4">
            {loading ? (
              <FaqSkeleton />
            ) : (
              faqs.map((faq, index) => (
                <FaqCard
                  key={faq.id}
                  faq={faq}
                  isOpen={openIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;

// Reusable Heading
const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center mb-12">
    <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">{title}</h2>
  </div>
);

// Single FAQ Card
const FaqCard = ({ faq, isOpen, onToggle }: { faq: FaqItem; isOpen: boolean; onToggle: () => void }) => (
  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
    <button
      onClick={onToggle}
      className="w-full p-6 flex items-center justify-between text-left"
    >
      <span className="text-lg font-medium ff-font-bold pr-4">{faq.title}</span>
      <div className="flex-shrink-0 w-8 h-8 bg-white border-primary rounded-lg flex items-center justify-center">
        {isOpen ? <FaChevronUp className="text-primary" /> : <FaChevronDown className="text-primary" />}
      </div>
    </button>

    {isOpen && (
      <div className="px-6 pb-6">
        <div className="pt-4 border-t border-gray-200">
          <div
            className="text-gray-600 ff-font"
            dangerouslySetInnerHTML={{ __html: faq.description || '' }}
          />
        </div>
      </div>
    )}
  </div>
);

// Skeleton Loader
const FaqSkeleton = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between">
        <Skeleton height={24} width="90%" />
        <Skeleton height={32} width={32} borderRadius={8} />
      </div>
    ))}
  </div>
);