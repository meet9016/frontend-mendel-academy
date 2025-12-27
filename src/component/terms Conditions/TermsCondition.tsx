import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";

const decodeHtml = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};


const TermsCondition = () => {
  const [loading, setLoading] = useState(false);
  const [terms, setTerms] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllTermsAndConditions}`);

        if (res?.data?.data?.description) {
          setTerms(res.data.data.description);
        }
      } catch (error) {
        console.error("Error fetching Terms & Conditions", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="text-gray-500 text-lg">Loading...</span>
      </div>
    );
  }

    // 🔥 Step 1: Decode HTML
  const decodedHtml = decodeHtml(terms);

  // 🔒 Step 2: Sanitize
  const cleanHtml = DOMPurify.sanitize(decodedHtml, {
    USE_PROFILES: { html: true },
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Terms & Conditions" />

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

export default TermsCondition;

const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center mb-8">
    <h2 className="text-4xl md:text-5xl font-bold ff-font">
      {title}
    </h2>
  </div>
);

const ContentBox = ({ html }: { html: string }) => (
  <div
    dangerouslySetInnerHTML={{ __html: html }}
    className="
      bg-white
      p-8 md:p-12
      ff-font
      rounded-3xl
      shadow-lg
      border border-gray-200
      space-y-6
      prose prose-gray max-w-none
      prose-h1:text-2xl
      prose-h1:font-bold
      prose-h4:text-lg
      prose-h4:font-semibold
      prose-strong:font-bold
      prose-a:text-blue-600
    "
  />
);

const ContentSkeleton = () => (
  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6">
    {[...Array(6)].map((_, i) => (
      <Skeleton key={i} height={28} />
    ))}
    <Skeleton height={22} width="70%" />
  </div>
);
