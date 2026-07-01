import React from 'react';
import MasteryHeroSection from '@/component/pathology/MasteryCourses/MasteryHeroSection';
import CoursesListSection from '@/component/pathology/MasteryCourses/CoursesListSection';

export const metadata = {
  title: 'Mendel Academy | Mastery Courses',
  description: 'Specialized Mastery Courses. High-impact, focused programs for rapid skill elevation.',
};

const MasteryCoursesPage = () => {
  return (
    <main className="min-h-screen bg-[#FAF8F5] flex flex-col font-sans">
      <div className="flex-1">
        <MasteryHeroSection />
        <CoursesListSection />
      </div>
    </main>
  );
};

export default MasteryCoursesPage;
