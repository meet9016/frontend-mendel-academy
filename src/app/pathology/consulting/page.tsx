import React from 'react';
import ConsultingHeroSection from '@/component/pathology/Consulting/ConsultingHeroSection';
import EngagementWaysSection from '@/component/pathology/Consulting/EngagementWaysSection';
import EngagementProcessSection from '@/component/pathology/Consulting/EngagementProcessSection';

export const metadata = {
  title: 'Mendel Academy | Consulting & Advisory',
  description: 'When the stakes are high, bring in 35 years of expertise.',
};

const ConsultingPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <div className="flex-1">
        <ConsultingHeroSection />
        <EngagementWaysSection />
        <EngagementProcessSection />
      </div>
    </main>
  );
};

export default ConsultingPage;
