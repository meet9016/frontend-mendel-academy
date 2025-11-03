// 'use client';

// import { FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
// import Footer from "../auth/Footer";
// import Header from "../auth/Header";
// import { motion } from "framer-motion";
// import { FiCalendar, FiClock, FiTag } from "react-icons/fi";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import endPointApi from "@/utils/endPointApi";
// import { api } from "@/utils/axiosInstance";
// import { data } from "react-router-dom";
// import { formatDateWithDayjs, formatDateWithMonthNameDayjs } from "@/utils/helper";

// const BlogDetail = () => {
//     const { id } = useParams();
//     const [blog, setBlog] = useState<any>(null);


//     const getBlogDetail = async () => {
//         try {
//             const res = await api.get(`${endPointApi.getBlogById}/${id}`);
//             setBlog(res?.data);
//         } catch (err) {
//             console.error("Error fetching blog:", err);
//         }
//     };
//     useEffect(() => {
//         if (id) getBlogDetail();
//     }, [id]);
//     console.log("sas", blog);

//     const decodeHtml = (html: string): string => {
//         if (typeof window === "undefined") return html;
//         const txt = document.createElement("textarea");
//         txt.innerHTML = html;
//         return txt.value;
//     };

    
//     return (
//         <>
//             <Header />

//             {/* ✅ Hero Image Section */}
//             <section className="relative w-full h-[80vh] overflow-hidden">
//                 {/* Hero Image */}
//                 <motion.img
//                     src={blog?.image}
//                     // src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
//                     alt="Blog Hero"
//                     className="w-full h-full object-cover object-center"
//                     initial={{ scale: 1.2, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ duration: 1.5, ease: "easeOut" }}
//                 />

//                 {/* Overlay */}
//                 <motion.div
//                     className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.5, duration: 1 }}
//                 />
//             </section>

//             {/* ✅ Article Section */}
//             <section className="max-w-4xl mx-auto px-6 md:px-10 -mt-32 relative z-10">
//                 {/* Article Card */}
//                 {/* {blog} */}
//                 <motion.div
//                     className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
//                     initial={{ y: 50, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     viewport={{ once: true }}
//                 >
//                     {/* Tag */}
//                     <motion.div
//                         className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full mb-6"
//                         initial={{ opacity: 0, scale: 0.8 }}
//                         whileInView={{ opacity: 1, scale: 1 }}
//                         transition={{ delay: 0.3, duration: 0.6 }}
//                         viewport={{ once: true }}
//                     >
//                         <FiTag className="w-4 h-4 text-yellow-600" />
//                         <span className="text-sm font-semibold text-yellow-600">
//                             {blog?.exam_name}
//                         </span>
//                     </motion.div>

//                     {/* Title */}
//                     <motion.h1
//                         className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
//                         initial={{ y: 40, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         transition={{ delay: 0.4, duration: 0.8 }}
//                         viewport={{ once: true }}
//                     >
//                         {blog?.title}
//                     </motion.h1>

//                     {/* Paragraph */}
//                     <motion.p
//                         className="text-lg text-gray-700 mb-8 leading-relaxed"
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         transition={{ delay: 0.6, duration: 0.8 }}
//                         viewport={{ once: true }}
//                     >
//                         {blog?.sort_description}
//                     </motion.p>

//                     {/* Author Info */}
//                     <motion.div
//                         className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6"
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         transition={{ delay: 0.8, duration: 0.8 }}
//                         viewport={{ once: true }}
//                     >
//                         <div className="flex items-center gap-2">
//                             <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
//                                 PS
//                             </div>
//                             <span className="font-medium text-gray-800">Dr. Priya Sharma</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <FiCalendar className="w-4 h-4" />
//                             <span>{formatDateWithMonthNameDayjs(blog?.date)}</span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <FiClock className="w-4 h-4" />
//                             <span>8 min read</span>
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* ✅ Main Article Content */}
//                 <motion.article
//                     className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
//                     initial={{ y: 80, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 1, ease: "easeOut" }}
//                     viewport={{ once: true }}
//                 >
//                     <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-gray-900">
//                         {/* <motion.h2
//                             initial={{ opacity: 0, y: 20 }}
//                             whileInView={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.6 }}
//                             viewport={{ once: true }}
//                         >
//                             Why Choose Mendel Academy?
//                         </motion.h2>
//                         <p>
//                             Mendel Academy combines AI-powered personalization with expert mentoring to create the most effective medical entrance exam preparation experience.
//                         </p>

//                         <h2>Comprehensive Coverage</h2>
//                         <p>
//                             Prepare for NEET PG, USMLE, PLAB, and more with a single adaptive platform tailored to your learning style.
//                         </p>

//                         <h2>AI-Powered Personalization</h2>
//                         <p>
//                             The platform identifies your strengths and weaknesses to focus study time efficiently, improving your retention and confidence.
//                         </p>

//                         <h2>Expert Faculty & Support</h2>
//                         <p>
//                             Our experienced medical educators and toppers guide you with strategies, live sessions, and peer discussions.
//                         </p> */}
//                         {/* {blog?.long_description} */}
//                         {blog?.long_description && (
//                             <div
//                                 className="prose prose-lg font-sans text-gray-800 max-w-none"
//                                 dangerouslySetInnerHTML={{ __html: decodeHtml(blog.long_description) }}
//                             />
//                         )}

//                     </div>

//                     {/* ✅ Share Section Animation */}
//                     <motion.div
//                         className="mt-12 pt-8 border-t border-gray-200"
//                         initial={{ opacity: 0, y: 40 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                         viewport={{ once: true }}
//                     >
//                         <h3 className="text-lg font-semibold text-gray-900 mb-4">
//                             Share this article
//                         </h3>
//                         <div className="flex items-center gap-3 text-xl text-gray-500">
//                             {[FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTiktok].map((Icon, i) => (
//                                 <motion.a
//                                     key={i}
//                                     href="#"
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white transition-all"
//                                     whileHover={{ scale: 1.15, rotate: 5 }}
//                                     whileTap={{ scale: 0.9 }}
//                                 >
//                                     <Icon />
//                                 </motion.a>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </motion.article>
//             </section>

//             {/* ✅ Footer */}
//             <Footer />
//         </>
//     );
// }

// export default BlogDetail

'use client';

import { FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
import Footer from "../auth/Footer";
import Header from "../auth/Header";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiTag } from "react-icons/fi";

const BlogDetail = () => {
    return (
        <>
            <Header />

            {/* ✅ Hero Image Section */}
            <section className="relative w-full h-[80vh] overflow-hidden">
                {/* Hero Image */}
                <motion.img
                    src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
                    alt="Blog Hero"
                    className="w-full h-full object-cover object-center"
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />

                {/* Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                />
            </section>

            {/* ✅ Article Section */}
            <section className="max-w-4xl mx-auto px-6 md:px-10 -mt-32 relative z-10">
                {/* Article Card */}
                <motion.div
                    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {/* Tag */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full mb-6"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <FiTag className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-semibold text-yellow-600">
                            NEET PG • USMLE • PLAB
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        className="text-4xl font-bold text-gray-900 mb-6 leading-tight"
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Global Medical Entrance Exam Coaching with Mendel Academy
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p
                        className="text-lg text-gray-700 mb-8 leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Discover how Mendel Academy's cutting-edge AI-powered platform is
                        revolutionizing medical entrance exam preparation worldwide.
                    </motion.p>

                    {/* Author Info */}
                    <motion.div
                        className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-200 pt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
                                PS
                            </div>
                            <span className="font-medium text-gray-800">Dr. Priya Sharma</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            <span>March 5, 2025</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FiClock className="w-4 h-4" />
                            <span>8 min read</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* ✅ Main Article Content */}
                <motion.article
                    className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16"
                    initial={{ y: 80, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <div className="prose max-w-none prose-p:text-gray-700 prose-headings:text-gray-900">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Why Choose Mendel Academy?
                        </motion.h2>
                        <p>
                            Mendel Academy combines AI-powered personalization with expert mentoring to create the most effective medical entrance exam preparation experience.
                        </p>

                        <h2>Comprehensive Coverage</h2>
                        <p>
                            Prepare for NEET PG, USMLE, PLAB, and more with a single adaptive platform tailored to your learning style.
                        </p>

                        <h2>AI-Powered Personalization</h2>
                        <p>
                            The platform identifies your strengths and weaknesses to focus study time efficiently, improving your retention and confidence.
                        </p>

                        <h2>Expert Faculty & Support</h2>
                        <p>
                            Our experienced medical educators and toppers guide you with strategies, live sessions, and peer discussions.
                        </p>
                    </div>

                    {/* ✅ Share Section Animation */}
                    <motion.div
                        className="mt-12 pt-8 border-t border-gray-200"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Share this article
                        </h3>
                        <div className="flex items-center gap-3 text-xl text-gray-500">
                            {[FaFacebookF, FaLinkedinIn, FaWhatsapp, FaTiktok].map((Icon, i) => (
                                <motion.a
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white transition-all"
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </motion.article>
            </section>

            {/* ✅ Footer */}
            <Footer />
        </>
    );
}

export default BlogDetail