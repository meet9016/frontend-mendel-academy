'use client';
import Header from "@/component/auth/Header";
import { FaCheckCircle } from "react-icons/fa";
export default function page() {
  return (
    // <>
    //   <Header />
    //   <main className="min-h-screen bg-white text-gray-900">
    //     {/* Hero Section */}
    //     <section className="container mx-auto px-4 py-12  md:py-15">
    //       <div className="flex flex-col md:flex-row items-center justify-between gap-12">

    //         {/* Left Image */}
    //         <div className="flex-1 flex justify-center">
    //           <img
    //             src="https://png.pngtree.com/png-clipart/20250515/original/pngtree-a-cute-female-doctor-depicted-in-clipart-style-png-image_21008903.png"
    //             alt="Medical student with laptop"
    //             className="w-full max-w-md h-auto object-contain drop-shadow-md rounded-xl"
    //           />
    //         </div>

    //         {/* Right Content */}
    //         <div className="flex-1 space-y-8">
    //           <h1 className="text-4xl md:text-5xl font-bold">
    //             USMLE Step 1
    //           </h1>

    //           <div className="space-y-4">
    //             <p className="text-lg font-semibold">
    //               With Mendal Academy, you will get:
    //             </p>
    //             <ul className="space-y-3">
    //               {[
    //                 "High-yield MCQ based active learning",
    //                 "Mnemonics",
    //                 "Mendal Academy SketchNotes",
    //                 "Mendal Academy Flowcharts",
    //                 "Self-Assessment Tests with performance analytics",
    //                 "Closed Telegram group for student interactions",
    //               ].map((item, index) => (
    //                 <li key={index} className="flex items-start gap-3">
    //                   <FaCheckCircle className="w-5 h-5 text-[#f0b100] mt-0.5" />
    //                   <span>{item}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <div className="space-y-2">
    //             <p className="text-sm text-gray-600">
    //               **For payment and more information, call{" "}
    //               <a
    //                 href="tel:+919925511631"
    //                 className="underline text-[#f0b100] hover:no-underline"
    //               >
    //                 +91-99255-11631
    //               </a>
    //             </p>
    //             <button className="bg-[#f0b100] hover:bg-[#e0a700] text-white font-semibold px-10 py-2 text-lg rounded-lg">
    //               Enroll Now
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </section>

    //     {/* Divider */}
    //     <div className="container mx-auto px-4">
    //       <div className="border-t border-gray-200" />
    //     </div>

    //     {/* Course Description */}
    //     <section className="container mx-auto px-4 py-16">
    //       <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
    //         Course Description
    //       </h2>
    //       <div className="max-w-4xl mx-auto space-y-4 text-gray-700 leading-relaxed">
    //         <p>
    //           Join our comprehensive exam preparation course designed specifically
    //           for <span className="font-semibold">USMLE Step 1 test</span> by our
    //           experienced{" "}
    //           <span className="font-semibold">
    //             Chief Educator, Dr. Nandkishore Managed
    //           </span>
    //           . This program is tailored to help you excel and secure a coveted
    //           residency or post-graduate program.
    //         </p>
    //         <p>
    //           With <span className="font-semibold">Dr. Managed's</span> expert
    //           guidance, you'll embark on a{" "}
    //           <span className="font-semibold">structured journey</span> with a{" "}
    //           <span className="font-semibold">personalized timetable</span> to
    //           achieve outstanding results. For more information, call{" "}
    //           <a
    //             href="tel:+919925511631"
    //             className="font-semibold underline text-[#f0b100] hover:no-underline"
    //           >
    //             +91-99255-11631
    //           </a>{" "}
    //           or email{" "}
    //           <a
    //             href="mailto:ask@mendalacademy.com"
    //             className="font-semibold underline text-[#f0b100] hover:no-underline"
    //           >
    //             ask@mendalacademy.com
    //           </a>
    //           .
    //         </p>
    //       </div>
    //     </section>

    //     {/* Divider */}
    //     <div className="container mx-auto px-4">
    //       <div className="border-t border-gray-200" />
    //     </div>

    //     {/* Who Can Enroll */}
    //     <section className="container mx-auto px-4 py-16">
    //       <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
    //         <div className="flex-1 flex justify-center">
    //           <img
    //             src="https://img.freepik.com/free-photo/cute-girl-young-boy-dressed-up-as-doctors_23-2148465682.jpg"
    //             alt="Students studying together"
    //             className="w-full max-w-md h-auto object-contain drop-shadow-lg rounded-xl"
    //           />
    //         </div>

    //         <div className="flex-1 space-y-6">
    //           <h2 className="text-3xl md:text-4xl font-bold">
    //             Who Can Enroll?
    //           </h2>
    //           <div className="space-y-4 text-gray-700">
    //             <p>
    //               Our courses are designed for students preparing for the{" "}
    //               <span className="font-semibold text-[#f0b100] underline">
    //                 USMLE Step 1 exam
    //               </span>
    //               .
    //             </p>
    //             <p>
    //               We recommend students have a basic understanding of exam topics
    //               and are comfortable with the test format.
    //             </p>
    //             <p>
    //               If you’re unsure whether our course is right for you,{" "}
    //               <a
    //                 href="#contact"
    //                 className="text-[#f0b100] underline hover:no-underline font-semibold"
    //               >
    //                 contact us
    //               </a>
    //               .
    //             </p>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Pricing Card */}
    //       <div className="max-w-2xl mx-auto bg-[#f0b100]/10 border border-[#f0b100]/30 p-8 md:p-12 rounded-2xl shadow-lg">
    //         <div className="text-center space-y-6">
    //           <h3 className="text-2xl md:text-3xl font-bold">USMLE Step 1</h3>
    //           <div className="space-y-2">
    //             <p className="text-sm text-gray-500 uppercase tracking-wide">
    //               Total (INR)
    //             </p>
    //             <p className="text-5xl md:text-6xl font-bold text-[#f0b100]">
    //               ₹90,000
    //             </p>
    //             <p className="text-sm text-gray-500">(Plus 18% GST)</p>
    //           </div>

    //           <div className="grid md:grid-cols-2 gap-4 py-6 text-left">
    //             <ul className="space-y-2">
    //               {["High-yield MCQs", "Mnemonics", "Illustrations", "Flowcharts"].map(
    //                 (item, index) => (
    //                   <li key={index} className="flex items-center gap-2">
    //                     <span className="text-[#f0b100] font-semibold">
    //                       {index + 1}.
    //                     </span>
    //                     <span>{item}</span>
    //                   </li>
    //                 )
    //               )}
    //             </ul>
    //             <ul className="space-y-2">
    //               {[
    //                 "SketchNotes",
    //                 "Tests & Discussions",
    //                 "1:1 Mentorship",
    //                 "Access to private WhatsApp group",
    //               ].map((item, index) => (
    //                 <li key={index} className="flex items-center gap-2">
    //                   <span className="text-[#f0b100] font-semibold">
    //                     {index + 5}.
    //                   </span>
    //                   <span>{item}</span>
    //                 </li>
    //               ))}
    //             </ul>
    //           </div>

    //           <button className="bg-[#f0b100] hover:bg-[#e0a700] text-white font-semibold px-10 py-6 text-lg rounded-lg mt-4">
    //             Sign Up Today!
    //           </button>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </>
    <>
      <Header />
    </>
  );
}
