import React from "react";
import DOMPurify from 'dompurify';

const CourseDes = ({ data }: { data: any }) => {
  const cleanHtml = DOMPurify.sanitize(data || '', {
    USE_PROFILES: { html: true },
  });
  return (
    <div>
      <section className="py-10 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Section Heading */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Course Description
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffcb04] to-amber-400 mx-auto rounded-full"></div>
            </div>

            {/* Content Box */}
            <div
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
              className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6">
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDes;
