import React from 'react';
import ConsultingClient from './ConsultingClient';

export const metadata = {
  title: 'Mendel Academy | Consulting & Advisory',
  description: 'When the stakes are high, bring in 35 years of expertise.',
};

const ConsultingPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <ConsultingClient />
    </main>
  );
};

export default ConsultingPage;
