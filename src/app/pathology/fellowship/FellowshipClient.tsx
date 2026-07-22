"use client";

import React, { useState } from 'react';
import HeroSection from '@/component/pathology/Fellowship/HeroSection';
import PhasesSection from '@/component/pathology/Fellowship/PhasesSection';
import OutcomesSection from '@/component/pathology/Fellowship/OutcomesSection';
import TargetAudienceSection from '@/component/pathology/Fellowship/TargetAudienceSection';
import EnrollSection from '@/component/pathology/Fellowship/EnrollSection';
import PricingSection from '@/component/pathology/Fellowship/PricingSection';
import EcosystemSection from '@/component/pathology/Fellowship/EcosystemSection';
import FAQSection from '@/component/pathology/Fellowship/FAQSection';
import VMTBSection from '@/component/pathology/Fellowship/VMTBSection';
import ApplyModal from '@/component/pathology/Fellowship/ApplyModal';
import CohortModal from '@/component/pathology/Fellowship/CohortModal';
import CurriculumModal from '@/component/pathology/Fellowship/CurriculumModal';

const FellowshipClient = () => {
  const [applyOpen, setApplyOpen] = useState(false);
  const [cohortOpen, setCohortOpen] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(false);

  const openApply = () => setApplyOpen(true);
  const openCohort = () => setCohortOpen(true);
  const openCurriculum = () => setCurriculumOpen(true);

  return (
    <div className="flex-1">
      <HeroSection
        onOpenApply={openApply}
        onOpenCurriculum={openCurriculum}
      />
      <PhasesSection />
      <OutcomesSection onOpenCohort={openCohort} />
      <TargetAudienceSection />
      <EnrollSection onOpenApply={openApply} />
      <PricingSection onOpenApply={openApply} />
      <EcosystemSection onOpenApply={openApply} />
      <FAQSection />
      <VMTBSection onOpenCohort={openCohort} />

      <ApplyModal isOpen={applyOpen} onClose={() => setApplyOpen(false)} />
      <CohortModal isOpen={cohortOpen} onClose={() => setCohortOpen(false)} />
      <CurriculumModal isOpen={curriculumOpen} onClose={() => setCurriculumOpen(false)} />
    </div>
  );
};

export default FellowshipClient;
