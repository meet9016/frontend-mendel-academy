// CourseDes.tsx
import React from 'react';
import DOMPurify from 'dompurify';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// CourseDes.types.ts
export interface CourseDesProps {
  data?: string;
  loading?: boolean;

}

const CourseDes = ({ data = '', loading = false }: CourseDesProps) => {
  const cleanHtml = DOMPurify.sanitize(data, {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeading title="Course Description" />

          {loading ? (
            <ContentSkeleton />
          ) : (
            <ContentBox html={cleanHtml} />
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseDes;

// Reusable Section Heading
const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center mb-5">
    <h2 className="text-4xl md:text-5xl font-bold ff -font-bold ">
      {title}
    </h2>
  </div>
);

// Content Box
const ContentBox = ({ html }: { html: string }) => (
  <div
    dangerouslySetInnerHTML={{ __html: html }}
    className="bg-white p-8 md:p-10 ff-font rounded-3xl shadow-lg border border-gray-200 space-y-6"
  />
);

// Skeleton Loader
const ContentSkeleton = () => (
  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6">
    {[...Array(5)].map((_, i) => (
      <Skeleton key={i} height={30} width="100%" className="mb-4" />
    ))}
    <Skeleton height={20} width="80%" />
  </div>
);