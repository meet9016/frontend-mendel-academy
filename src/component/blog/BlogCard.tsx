'use client';

import { useEffect, useState } from "react";
import Header from "../auth/Header";
import Footer from "../auth/Footer";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { formatDateWithDayjs } from "@/utils/helper";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

type BlogType = {
    id?: number;
    title: string;
    image: string;
    category?: string;
    date?: string;
    excerpt?: string;
    exam_name?: string;
    author?: string;
    createdAt?: string;
    sort_description?: string;
};


const BlogCard = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<BlogType[]>([]);
    const router = useRouter();
    const itemsPerPage = 6;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        setCurrentPage(event.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const getBlogData = async () => {
        try {
            setLoading(true)
            const res = await api.get(`${endPointApi.getAllBlogs}`);
            if (res?.data?.data?.length) {
                setData(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getBlogData();
    }, []);

 


    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="relative w-full bg-[#ffca00] py-24 lg:py-36 overflow-hidden">
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
                        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold ff-font-bold leading-tight">
                            Articles and <br className="hidden sm:block" /> Insights
                        </h1>
                        <p className="text-lg sm:text-xl ff-font leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Stay updated with expert insights, medical exam strategies, and the
                            latest in healthcare education.
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

            {/* Blog Grid Section */}
            <section className="py-15 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold ff-font-bold mb-4">
                            Latest Articles
                        </h2>
                        <p className="ff-font text-lg max-w-2xl mx-auto">
                            Expert insights and guidance to help you excel in your medical
                            career
                        </p>
                    </div>


                    {/* Blog Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {loading ? (
                            <BlogSingleSkeleton />
                        ) : (
                            currentItems?.map((post: any, index: number) => (
                                <div
                                    key={index}
                                    className="w-full lg:max-w-[380px]"
                                    onClick={() => router.push(`/blog/${post.id}`)}
                                >
                                    <MultipleCard post={post} index={index} />
                                </div>
                            ))
                        )}
                    </div>

                    {/*  Pagination */}
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
                                "border border-gray-300 cursor-pointer rounded-lg w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-yellow-500 hover:text-white font-medium"
                            }
                            activeClassName={"bg-[#ffca00] text-black"}
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
    );
};

//  Single Blog Card Component
const MultipleCard = ({ post, index }: { post: BlogType; index: number }) => (
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
                src={post.image ? post?.image : "https://thumbs.dreamstime.com/b/no-photo-available-missing-image-no-image-symbol-isolated-white-background-no-photo-available-missing-image-no-image-272386847.jpg"}

                // src={post?.image}
                alt={post.exam_name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 flex flex-col flex-grow">
            <div className="flex items-center justify-between">
                <span className="inline-block px-3 py-1 text-xs font-semibold bg-white ff-font-bold text-primary border-primary rounded-full capitalize">
                    {post.exam_name || "general"}
                </span>
                <span className="text-sm ff-font">
                    {formatDateWithDayjs(post.date) || "-"}
                </span>
            </div>
            <h3 className="text-xl font-bold ff-font-bold line-clamp-2 group-hover:text-[#ffca00] transition-colors duration-300">
                {post.title}
            </h3>
            <p className="ff-font text-sm line-clamp-3 flex-grow">
                {post.sort_description || "Click to read more about this article."}
            </p>
        </div>
    </motion.article>
);

export default BlogCard;




const BlogSingleSkeleton = () => {
    return (
        <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton
                    key={i}
                    height={380}
                    width={340}
                    borderRadius={24}
                    className="rounded-3xl w-full lg:max-w-[380px]"
                />
            ))}
        </>
    );
};
