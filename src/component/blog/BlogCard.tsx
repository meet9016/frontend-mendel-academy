'use client'
import { useState } from "react";
import Header from "../auth/Header";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import Footer from "../auth/Footer";
import { useRouter } from "next/navigation";

const BlogCard = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;
    const router = useRouter()

    // ✅ Blog Data
    const blogPosts = [
        {
            category: "global-medical-prep",
            date: "March 5, 2025",
            title: "Global Medical Entrance Exam Coaching with Mendel Academy",
            excerpt:
                "Explore how Mendel Academy's AI-powered platform offers personalized preparation for global medical entrance exams.",
        },
        {
            category: "exam-preparation",
            date: "March 3, 2025",
            title: "Top 10 Study Strategies for NEET PG Success",
            excerpt:
                "Discover proven study techniques and time management strategies for NEET PG success.",
        },
        {
            category: "pathology",
            date: "March 1, 2025",
            title: "Understanding Clinical Pathology: A Complete Guide",
            excerpt:
                "Deep dive into clinical pathology concepts with notes, diagrams, and practical case studies.",
        },
        {
            category: "career-guidance",
            date: "February 28, 2025",
            title: "Medical Career Paths After MBBS: Complete Guide",
            excerpt:
                "Explore specialization options, entrance exams, and opportunities for medical graduates.",
        },
        {
            category: "study-tips",
            date: "February 25, 2025",
            title: "Effective Revision Techniques for Medical Exams",
            excerpt:
                "Learn memory and revision techniques to retain complex medical concepts longer.",
        },
        {
            category: "exam-updates",
            date: "February 22, 2025",
            title: "Latest Updates on PG Medical Entrance Exams 2025",
            excerpt:
                "Stay updated with notifications, exam dates, and eligibility criteria.",
        },
        {
            category: "global-medical-prep",
            date: "February 20, 2025",
            title: "USMLE Preparation Guide: Step by Step Approach",
            excerpt:
                "Complete roadmap for USMLE preparation including resources and strategies.",
        },
    ];

    // ✅ Single Card Component - Simple & Professional Animation
    const BlogCard = ({ post, index }: { post: any; index: number }) => (
        <motion.article
            key={index}
            className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.3, ease: "easeOut" },
            }}
        >
            {/* Image */}
            <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-xl flex-shrink-0">
                <motion.img
                    src="https://static.vecteezy.com/system/resources/thumbnails/054/880/166/small/thriving-tree-in-lush-green-environment-nature-conservation-and-protection-concept-free-photo.jpeg"
                    alt={post.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-full">
                        {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300">
                    {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3 flex-grow">{post.excerpt}</p>
            </div>
        </motion.article>
    );

    const pageCount = Math.ceil(blogPosts.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPosts = blogPosts.slice(offset, offset + itemsPerPage);

    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <Header />

            {/* ✅ Blog Data */}
            <section className="relative w-full bg-gradient-to-br from-[#FFD95A] via-[#fbba2d] to-[#f8a300] py-24 lg:py-36 overflow-hidden">
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        background: [
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 70%)",
                            "radial-gradient(circle at 80% 40%, rgba(255,255,255,0.2), transparent 70%)",
                            "radial-gradient(circle at 50% 80%, rgba(255,255,255,0.3), transparent 70%)",
                        ],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative max-w-7xl mx-auto px-6 md:px-10 z-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        className="space-y-8 text-center lg:text-left"
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                            Articles and <br className="hidden sm:block" /> Insights
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-800 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Stay updated with expert insights, medical exam strategies, and the latest in healthcare education.
                        </p>
                    </motion.div>
                    <motion.div
                        className="flex justify-center lg:justify-end"
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2 }}
                    >
                        <motion.img
                            src="https://mendelacademy.com/blog-logo.svg"
                            alt="Hero"
                            className="w-full max-w-md h-auto drop-shadow-2xl"
                            animate={{ y: [0, -20, 0], rotate: [0, 1, -1, 0] }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ✅ Blog Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Latest Articles
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Expert insights and guidance to help you excel in your medical career
                        </p>
                    </div>

                    {/* Blog Cards via Map */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {currentPosts.map((post, index) => (
                            <div key={index} className="w-full lg:max-w-[380px]" onClick={() => router.push('/blog/blogdetail')}>
                                <BlogCard post={post} index={index} />
                            </div>
                        ))}
                    </div>


                    {/* ✅ Pagination */}
                    <div className="mt-12 flex justify-center">
                        <ReactPaginate
                            previousLabel={"←"}
                            nextLabel={"→"}
                            breakLabel={"..."}
                            onPageChange={handlePageClick}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            containerClassName={"flex gap-2"}
                            pageClassName={
                                "border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-yellow-500 hover:text-white font-medium"
                            }
                            activeClassName={"bg-yellow-500 text-white"}
                            previousClassName={
                                "border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"
                            }
                            nextClassName={
                                "border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"
                            }
                            disabledClassName={"opacity-50 cursor-not-allowed"}
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default BlogCard;