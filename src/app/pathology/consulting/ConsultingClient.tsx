"use client";

import React, { useState } from 'react';
import ConsultingHeroSection from '@/component/pathology/Consulting/ConsultingHeroSection';
import EngagementWaysSection from '@/component/pathology/Consulting/EngagementWaysSection';
import EngagementProcessSection from '@/component/pathology/Consulting/EngagementProcessSection';
import PricingSection from '@/component/pathology/Consulting/PricingSection';
import ConsultingCtaSection from '@/component/pathology/Consulting/ConsultingCtaSection';
import ScheduleCallModal from '@/component/pathology/Consulting/ScheduleCallModal';
import RequestCaseReviewModal from '@/component/pathology/Consulting/RequestCaseReviewModal';
import FloatingCartFab from '@/component/pathology/Consulting/FloatingCartFab';

const ConsultingClient = () => {
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const openBookModal = () => setBookModalOpen(true);
  const closeBookModal = () => setBookModalOpen(false);

  const openCaseModal = () => setCaseModalOpen(true);
  const closeCaseModal = () => setCaseModalOpen(false);

  const handleToggleCartItem = (id: string) => {
    setCartItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex-1 relative">
      <ConsultingHeroSection onOpenBookModal={openBookModal} />
      <EngagementWaysSection
        onOpenBookModal={openBookModal}
        onRequestCaseReviewModal={openCaseModal}
      />
      <EngagementProcessSection />
      <PricingSection
        onOpenBookModal={openBookModal}
        onOpenCaseModal={openCaseModal}
        cartItems={cartItems}
        onToggleCartItem={handleToggleCartItem}
      />
      <ConsultingCtaSection onOpenBookModal={openBookModal} />

      <ScheduleCallModal isOpen={bookModalOpen} onClose={closeBookModal} />
      <RequestCaseReviewModal isOpen={caseModalOpen} onClose={closeCaseModal} />
      <FloatingCartFab count={cartItems.length} onClick={openCaseModal} />
    </div>
  );
};

export default ConsultingClient;
