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
  const cleanHtml = DOMPurify.sanitize(data, { USE_PROFILES: { html: true } });

  return (
    <section className="bg-white py-[72px] px-6">
      <div className="max-w-[960px] mx-auto text-center">
        <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">Course Description</h2>

          {loading ? (
            <ContentSkeleton />
          ) : (
            <ContentBox html={cleanHtml} />
          )}
      </div>
    </section>
  );
};

export default CourseDes;

const ContentBox = ({ html }: { html: string }) => (
  <div
    dangerouslySetInnerHTML={{ __html: html }}
    className="bg-[#f9fafb] border border-[#E5E3DA] border-l-[5px] border-l-[#F5C800] rounded-xl px-9 py-8 text-left leading-[1.85] text-[15px] text-[#1A1A1A] ff-font"
  />
);

const ContentSkeleton = () => (
  <div className="bg-[#f9fafb] border border-[#E5E3DA] border-l-[5px] border-l-[#F5C800] rounded-xl px-9 py-8 text-left space-y-4">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={22} width="100%" />
    ))}
    <Skeleton height={22} width="70%" />
  </div>
);