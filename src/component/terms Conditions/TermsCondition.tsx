import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import he from "he";
import Skeleton from "react-loading-skeleton";

import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
const TermsCondition = () => {
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllTermsAndConditions}`);
        setData(res?.data?.data?.description || "");
      } catch (error) {
        console.error("Error fetching T&C", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ SSR SAFE
  const decodedHtml = he.decode(data);
  const cleanHtml = DOMPurify.sanitize(decodedHtml);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading title="Terms & Conditions" />

          {/* {loading ? (
            <ContentSkeleton />
          ) : ( */}
            <>
            {/* <ContentBox html={cleanHtml} /> */}
              <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Content Card */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10 space-y-6 text-gray-700 leading-relaxed">

          <p>
            Welcome to Mendel Academy. By accessing or using our website{" "}
            <a
              href="https://mendelacademy.com"
              className="text-blue-600 underline"
              target="_blank"
            >
              https://mendelacademy.com
            </a>
            , you agree to be bound by the following Terms of Service. If you do
            not agree with these terms, please do not use our website or services.
          </p>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              1. About Mendel Academy
            </h2>
            <p>
              Mendel Academy provides educational training, coaching programs
              and learning services through online and offline modes.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              2. Eligibility
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>You are capable of entering into a legally binding agreement under Indian law</li>
              <li>The information you provide is accurate and complete</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              3. Account and Registration
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Maintaining the confidentiality of your login information</li>
              <li>All activities carried out under your account</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              4. Payments
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>All fees must be paid in full before accessing services</li>
              <li>Fees are clearly shown at the time of enrollment</li>
              <li>Pricing may change without prior notice</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              5. Use of Website and Content
            </h2>
            <p>
              All content including videos, study material, notes, logos and
              website content belongs to Mendel Academy and may not be copied,
              shared, recorded, distributed or resold without written permission.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              6. Student Conduct
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Misuse the platform</li>
              <li>Share login credentials</li>
              <li>Disrupt classes or sessions</li>
              <li>Upload harmful or illegal content</li>
              <li>Attempt to copy or record training material</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              7. Service Changes
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Modify or discontinue any course</li>
              <li>Change schedules or instructors</li>
              <li>Update service features</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              8. Limitation of Liability
            </h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal outcomes or results of students</li>
              <li>Technical failures beyond our control</li>
              <li>Internet or device-related issues</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              9. Termination
            </h2>
            <p>
              Access may be suspended or terminated if these terms are violated
              or misuse is observed.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-gray-900">
              10. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance
              with the laws of India. Jurisdiction shall be Surat, Gujarat.
            </p>
          </div>

        </div>
      </div>
    </section>
            </>
          {/* )} */}
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
