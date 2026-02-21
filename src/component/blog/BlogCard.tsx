"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { formatDateWithDayjs } from "@/utils/helper";
import { BlogCardSkeleton } from "../Skeletons";
import Skeleton from "react-loading-skeleton";

/* ----------  TYPES  ---------- */
type Blog = {
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

/* ----------  HOOK  (same fetch)  ---------- */
const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAllBlogs}`);
        if (res?.data?.data?.length) setBlogs(res.data.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { blogs, loading };
};

/* ----------  MAIN PAGE  ---------- */
export default function BlogCard() {
  const router = useRouter();
  const { blogs, loading } = useBlogs();
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(blogs.length / itemsPerPage);
  const currentItems = blogs.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Hero />
      <BlogSection loading={loading} blogs={currentItems} onCard={(id) => router.push(`/blog/${id}`)} />
      <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
    </>
  );
}

/* ----------  HERO  (identical motion)  ---------- */
const Hero = () => (
  <section className="relative w-full bg-[#ffca00] py-8 lg:py-10 overflow-hidden">
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
        <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold ff-font-bold leading-tight">
          Articles and <br className="hidden sm:block" /> Insights
        </h1>
        <p className="text-lg sm:text-xl ff-font leading-relaxed max-w-xl mx-auto lg:mx-0">
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
);

/* ----------  BLOG SECTION  ---------- */
const BlogSection = ({ loading, blogs, onCard }: { loading: boolean; blogs: Blog[]; onCard: (id?: number) => void }) => (
  <section className="py-10 bg-gray-50">
    <div className="max-w-7xl mx-auto px-6 md:px-10">
      <div className="text-center mb-5">
        <h2 className="text-3xl sm:text-4xl font-bold ff-font-bold mb-1">Latest Articles</h2>
        <p className="ff-font text-lg max-w-2xl mb-5 mx-auto">Expert insights and guidance to help you excel in your medical career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} height={380} width={340} borderRadius={24} className="rounded-3xl w-full lg:max-w-[380px]" />
            ))}
          </>
        ) : (
          blogs.map((post, i) => (
            <Card key={post.id} post={post} index={i} onClick={() => onCard(post.id)} />
          ))
        )}
      </div>
    </div>
  </section>
);

/* ----------  SINGLE BLOG CARD  (identical motion)  ---------- */
const Card = ({ post, index, onClick }: { post: Blog; index: number; onClick: () => void }) => (
  <motion.article
    className="group bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300 flex flex-col h-full w-full lg:max-w-[380px]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
    whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
    onClick={onClick}
  >
    <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-xl flex-shrink-0">
      <motion.img
        src={post.image || "https://thumbs.dreamstime.com/b/no-photo-available-missing-image-no-image-symbol-isolated-white-background-no-photo-available-missing-image-no-image-272386847.jpg"}
        alt={post.exam_name}
        className="w-full h-full object-cover"
        initial={{ scale: 1.05 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>

    <div className="p-6 space-y-4 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <span className="inline-block px-3 py-1 text-xs font-semibold bg-white ff-font-bold text-primary border-primary rounded-full capitalize">
          {post.exam_name || "general"}
        </span>
        <span className="text-sm ff-font">{formatDateWithDayjs(post.date) || "-"}</span>
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

/* ----------  PAGINATION  ---------- */
const Pagination = ({ pageCount, onPageChange }: { pageCount: number; onPageChange: (event: { selected: number }) => void }) => (
  <div className="mt-5 flex justify-center">
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      onPageChange={onPageChange}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={3}
      containerClassName={"flex gap-2"}
      pageClassName={"border border-gray-300 cursor-pointer rounded-lg mb-10 w-10 h-10 flex items-center justify-center text-gray-700 hover:bg-yellow-500 hover:text-white font-medium"}
      activeClassName={"bg-[#ffca00] text-black"}
      previousClassName={"border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"}
      nextClassName={"border border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center hover:bg-yellow-500 hover:text-white"}
      disabledClassName={"opacity-50 cursor-not-allowed"}
    />
  </div>
);

