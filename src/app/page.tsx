import Home from "@/component/home/Home";

export default function page() {
  return (
    <div>
        <Home/>
    </div>
  );
}























// 'use client';
// import { motion } from "framer-motion";
// import { FiMenu, FiShoppingCart, FiTag, FiCalendar, FiClock } from "react-icons/fi";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
// import Header from "@/component/auth/Header";
// import Footer from "@/component/auth/Footer";

// export default function Home() {
//   return (
//     <>
//       <Header />

//       {/* ✅ Hero Image Section */}
//       <section className="relative w-full h-[80vh] overflow-hidden">
//         {/* Hero Image */}
//         <motion.img
//           src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
//           alt="Blog Hero"
//           className="w-full h-full object-cover object-center"
//           initial={{ scale: 1.2, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.5, ease: "easeOut" }}
//         />

//         {/* Overlay */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         />
//       </section>

//       {/* ✅ Article Section */}
//       <section className="max-w-4xl mx-auto px-6 md:px-10 -mt-32 relative z-10">
//         {/* Article Card */}
//         <motion.div
//           className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
//           initial={{ y: 50, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           {/* Tag */}
//           <motion.div
//             className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full mb-6"
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.3, duration: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <FiTag className="w-4 h-4 text-yellow-600" />
//             <span className="text-sm font-semibold text-yellow-600">
//               NEET PG • USMLE • PLAB
//             </span>
//           </motion.div>

//           {/* Title */}
//           <motion.h1
//             className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
//             initial={{ y: 40, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             Global Medical Entrance Exam Coaching with Mendel Academy
//           </motion.h1>

//           {/* Paragraph */}
//           <motion.p
//             className="text-lg text-gray-700 mb-8 leading-relaxed"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             Discover how Mendel Academy's cutting-edge AI-powered platform is
//             revolutionizing medical entrance exam preparation worldwide.
//           </motion.p>

//           {/* Author Info */}
//           <motion.div
//             className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <div className="flex items-center gap-2">
//               <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
//                 PS
//               </div>
//               <span className="font-medium text-gray-800">Dr. Priya Sharma</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiCalendar className="w-4 h-4" />
//               <span>March 5, 2025</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiClock className="w-4 h-4" />
//               <span>8 min read</span>
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* ✅ Main Article Content */}
//         <motion.article
//           className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
//           initial={{ y: 80, opacity: 0 }}
//           whileInView={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//           viewport={{ once: true }}
//         >
//           <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-gray-900">
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//             >
//               Why Choose Mendel Academy?
//             </motion.h2>
//             <p>
//               Mendel Academy combines AI-powered personalization with expert mentoring to create the most effective medical entrance exam preparation experience.
//             </p>

//             <h2>Comprehensive Coverage</h2>
//             <p>
//               Prepare for NEET PG, USMLE, PLAB, and more with a single adaptive platform tailored to your learning style.
//             </p>

//             <h2>AI-Powered Personalization</h2>
//             <p>
//               The platform identifies your strengths and weaknesses to focus study time efficiently, improving your retention and confidence.
//             </p>

//             <h2>Expert Faculty & Support</h2>
//             <p>
//               Our experienced medical educators and toppers guide you with strategies, live sessions, and peer discussions.
//             </p>
//           </div>

//           {/* ✅ Share Section Animation */}
//           <motion.div
//             className="mt-12 pt-8 border-t border-gray-200"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//           >
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Share this article
//             </h3>
//             <div className="flex items-center gap-3 text-xl text-gray-500">
//               {[FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTiktok].map((Icon, i) => (
//                 <motion.a
//                   key={i}
//                   href="#"
//                   className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white transition-all"
//                   whileHover={{ scale: 1.15, rotate: 5 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <Icon />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>
//         </motion.article>
//       </section>

//       {/* ✅ Footer */}
//       <Footer />
//     </>
//   );
// }







































// 'use client';
// import Header from "@/component/auth/Header";
// import { FaCheckCircle } from "react-icons/fa";
// export default function page() {
//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-white text-gray-900">
//         {/* Hero Section */}
//         <section className="container mx-auto px-4 py-12  md:py-15">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-12">

//             {/* Left Image */}
//             <div className="flex-1 flex justify-center">
//               <img
//                 src="https://png.pngtree.com/png-clipart/20250515/original/pngtree-a-cute-female-doctor-depicted-in-clipart-style-png-image_21008903.png"
//                 alt="Medical student with laptop"
//                 className="w-full max-w-md h-auto object-contain drop-shadow-md rounded-xl"
//               />
//             </div>

//             {/* Right Content */}
//             <div className="flex-1 space-y-8">
//               <h1 className="text-4xl md:text-5xl font-bold">
//                 USMLE Step 1
//               </h1>

//               <div className="space-y-4">
//                 <p className="text-lg font-semibold">
//                   With Mendal Academy, you will get:
//                 </p>
//                 <ul className="space-y-3">
//                   {[
//                     "High-yield MCQ based active learning",
//                     "Mnemonics",
//                     "Mendal Academy SketchNotes",
//                     "Mendal Academy Flowcharts",
//                     "Self-Assessment Tests with performance analytics",
//                     "Closed Telegram group for student interactions",
//                   ].map((item, index) => (
//                     <li key={index} className="flex items-start gap-3">
//                       <FaCheckCircle className="w-5 h-5 text-[#f0b100] mt-0.5" />
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="space-y-2">
//                 <p className="text-sm text-gray-600">
//                   **For payment and more information, call{" "}
//                   <a
//                     href="tel:+919925511631"
//                     className="underline text-[#f0b100] hover:no-underline"
//                   >
//                     +91-99255-11631
//                   </a>
//                 </p>
//                 <button className="bg-[#f0b100] hover:bg-[#e0a700] text-white font-semibold px-10 py-2 text-lg rounded-lg">
//                   Enroll Now
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Divider */}
//         <div className="container mx-auto px-4">
//           <div className="border-t border-gray-200" />
//         </div>

//         {/* Course Description */}
//         <section className="container mx-auto px-4 py-16">
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
//             Course Description
//           </h2>
//           <div className="max-w-4xl mx-auto space-y-4 text-gray-700 leading-relaxed">
//             <p>
//               Join our comprehensive exam preparation course designed specifically
//               for <span className="font-semibold">USMLE Step 1 test</span> by our
//               experienced{" "}
//               <span className="font-semibold">
//                 Chief Educator, Dr. Nandkishore Managed
//               </span>
//               . This program is tailored to help you excel and secure a coveted
//               residency or post-graduate program.
//             </p>
//             <p>
//               With <span className="font-semibold">Dr. Managed's</span> expert
//               guidance, you'll embark on a{" "}
//               <span className="font-semibold">structured journey</span> with a{" "}
//               <span className="font-semibold">personalized timetable</span> to
//               achieve outstanding results. For more information, call{" "}
//               <a
//                 href="tel:+919925511631"
//                 className="font-semibold underline text-[#f0b100] hover:no-underline"
//               >
//                 +91-99255-11631
//               </a>{" "}
//               or email{" "}
//               <a
//                 href="mailto:ask@mendalacademy.com"
//                 className="font-semibold underline text-[#f0b100] hover:no-underline"
//               >
//                 ask@mendalacademy.com
//               </a>
//               .
//             </p>
//           </div>
//         </section>

//         {/* Divider */}
//         <div className="container mx-auto px-4">
//           <div className="border-t border-gray-200" />
//         </div>

//         {/* Who Can Enroll */}
//         <section className="container mx-auto px-4 py-16">
//           <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-16">
//             <div className="flex-1 flex justify-center">
//               <img
//                 src="https://img.freepik.com/free-photo/cute-girl-young-boy-dressed-up-as-doctors_23-2148465682.jpg"
//                 alt="Students studying together"
//                 className="w-full max-w-md h-auto object-contain drop-shadow-lg rounded-xl"
//               />
//             </div>

//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl md:text-4xl font-bold">
//                 Who Can Enroll?
//               </h2>
//               <div className="space-y-4 text-gray-700">
//                 <p>
//                   Our courses are designed for students preparing for the{" "}
//                   <span className="font-semibold text-[#f0b100] underline">
//                     USMLE Step 1 exam
//                   </span>
//                   .
//                 </p>
//                 <p>
//                   We recommend students have a basic understanding of exam topics
//                   and are comfortable with the test format.
//                 </p>
//                 <p>
//                   If you’re unsure whether our course is right for you,{" "}
//                   <a
//                     href="#contact"
//                     className="text-[#f0b100] underline hover:no-underline font-semibold"
//                   >
//                     contact us
//                   </a>
//                   .
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Pricing Card */}
//           <div className="max-w-2xl mx-auto bg-[#f0b100]/10 border border-[#f0b100]/30 p-8 md:p-12 rounded-2xl shadow-lg">
//             <div className="text-center space-y-6">
//               <h3 className="text-2xl md:text-3xl font-bold">USMLE Step 1</h3>
//               <div className="space-y-2">
//                 <p className="text-sm text-gray-500 uppercase tracking-wide">
//                   Total (INR)
//                 </p>
//                 <p className="text-5xl md:text-6xl font-bold text-[#f0b100]">
//                   ₹90,000
//                 </p>
//                 <p className="text-sm text-gray-500">(Plus 18% GST)</p>
//               </div>

//               <div className="grid md:grid-cols-2 gap-4 py-6 text-left">
//                 <ul className="space-y-2">
//                   {["High-yield MCQs", "Mnemonics", "Illustrations", "Flowcharts"].map(
//                     (item, index) => (
//                       <li key={index} className="flex items-center gap-2">
//                         <span className="text-[#f0b100] font-semibold">
//                           {index + 1}.
//                         </span>
//                         <span>{item}</span>
//                       </li>
//                     )
//                   )}
//                 </ul>
//                 <ul className="space-y-2">
//                   {[
//                     "SketchNotes",
//                     "Tests & Discussions",
//                     "1:1 Mentorship",
//                     "Access to private WhatsApp group",
//                   ].map((item, index) => (
//                     <li key={index} className="flex items-center gap-2">
//                       <span className="text-[#f0b100] font-semibold">
//                         {index + 5}.
//                       </span>
//                       <span>{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <button className="bg-[#f0b100] hover:bg-[#e0a700] text-white font-semibold px-10 py-6 text-lg rounded-lg mt-4">
//                 Sign Up Today!
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

