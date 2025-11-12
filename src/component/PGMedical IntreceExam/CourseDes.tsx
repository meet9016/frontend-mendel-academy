import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const CourseDes = ({ data }: { data: any }) => {
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
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-200 space-y-6">
              {/* <p className="text-lg text-gray-900 leading-relaxed">
                                Join our comprehensive exam preparation course designed specifically for{" "}
                                <span className="font-bold text-[#ffcb04]">USMLE Step 1 test</span> by our experienced{" "}
                                <span className="font-bold text-amber-500">Chief Educator, Dr. Nandkishore Managed</span>.
                                This program is tailored to help you excel and secure a coveted residency or post-graduate program.
                            </p>

                            <p className="text-lg text-gray-900 leading-relaxed">
                                With <span className="font-bold text-amber-500">Dr. Managed's</span> expert guidance, you'll embark on a{" "}
                                <span className="font-semibold">structured journey</span>, complete with a{" "}
                                <span className="font-semibold">personalized timetable</span> to keep you on track for outstanding results.
                                We use the <span className="font-semibold">residency application process</span> throughout the journey.
                                For more information and to see how it can help boost your exam results, call us at{" "}
                                <a
                                    href="tel:+919925511631"
                                    className="font-bold text-[#ffcb04] hover:underline inline-flex items-center gap-1"
                                >
                                    <FaPhone className="text-sm text-[#ffcb04]" />
                                    +91-99255-11631
                                </a>{" "}
                                or email us at{" "}
                                <a
                                    href="mailto:ask@mendalacademy.com"
                                    className="font-bold text-[#ffcb04] hover:underline inline-flex items-center gap-1"
                                >
                                    <FaEnvelope className="text-sm text-[#ffcb04]" />
                                    ask@mendalacademy.com
                                </a>.
                            </p> */}
              {data}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDes;
