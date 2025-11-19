"use client";

import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCalendar, BiShoppingBag } from "react-icons/bi";
import { FiMenu, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CommonButton from "@/comman/Button";
import { getTempId } from "@/utils/helper";
type Exam = {
  exam_name: string;
  link: string;
};

type ExamCategory = {
  category_name: string;
  exams: Exam[];
};

type CartItem = {
  _id: string;
  category_name: string;
  price: number;
  duration: number;
  image: string;
  quantity: number,
};


export default function Header() {
    const tempIdGet = sessionStorage.getItem("temp_id");
  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState<boolean>(false);
  const [examCategories, setExamCategories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAppMedicalExam}`)
        if (res.data.data) {
          setExamCategories(res.data.data || [])
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.push("/auth/login");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: -10 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 120, damping: 12 },
    },
  };

  const isExamActive = pathname.startsWith("/medicalexam");
  
  const handleCartOpen = async () => {
    setIsCartOpen(true);

    try {
      const res = await api.get(
        `${endPointApi.getCart}?temp_id=${tempIdGet}`
      );

      if (res.data) {
        setCartData(res.data.cart);
        setCartTotalAmount(res.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* ✅ Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={'../../../images/main logo.png'}
              // src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
              alt="Mendel Academy Logo"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* ✅ Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-12">
            <button
              onClick={() => router.push("/")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
  ${pathname === "/" ? "text-primary" : "hover:text-yellow-500"}
`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ffca00] transition-all duration-300
        ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/pathology")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/pathology" ? "text-primary" : "hover:text-yellow-500"}
    `}
            >
              Pathology
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ffca00] transition-all duration-300
        ${pathname === "/pathology" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/blog")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/blog" ? "text-primary" : "hover:text-yellow-500"}
    `}
            >
              Blog
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ffca00] transition-all duration-300
        ${pathname === "/blog" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/aboutUs")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/aboutUs" ? "text-primary" : "hover:text-yellow-500"}
    `}
            >
              About Us
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#ffca00] transition-all duration-300
        ${pathname === "/aboutUs" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>

            {/* ✅ Dropdown Menu */}
            <div className="relative">
              <button
                id="exam-button"
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                className={`relative ff-font font-medium text-sm group cursor-pointer
    ${isExamActive ? "text-primary" : "hover:text-yellow-500"}
  `}
              >
                PG Medical Entrance Exams
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#ffca00] transition-all duration-300
    ${isExamActive ? "w-full" : "w-0 group-hover:w-full"}
  `}
                ></span>

              </button>

              {isExamDropdownOpen && (
                <div
                  id="exam-dropdown"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl p-6 animate-fadeIn"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* {Object.entries(examCategories).map(([category, exams]) => (
                      <div key={category}>
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                          {category}
                        </h3>
                        <ul className="space-y-2">
                          {exams.map((exam) => (
                            <li key={exam.name}>
                              <button
                                className="w-full text-left text-sm text-gray-800 hover:text-yellow-500 hover:bg-gray-50 px-3 py-2 rounded-md transition-all"
                                onClick={() => router.push("/medicalexam")}
                              >
                                {exam.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))} */}
                    {examCategories.map((category) => (
                      <div key={category.category_name}>
                        <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                          {category.category_name}
                        </h3>

                        <ul className="space-y-2">
                          {category?.exams?.map((exam: any) => (
                            <li key={exam?._id}>
                              <button
                                className="w-full text-left text-sm text-gray-800 hover:text-yellow-500 hover:bg-gray-50 px-3 py-2 rounded-md cursor-pointer transition-all"
                                // onClick={() => router.push("/medicalexam")}
                                onClick={() => router.push(`/medicalexam/${exam?.exam_id}`)}
                              >
                                {exam.exam_name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-4 pt-3 text-right">
                    <button
                      onClick={() => {
                        setIsExamDropdownOpen(false);
                      }}
                      className="text-yellow-600 font-medium text-sm hover:underline"
                    >
                      View All Exam Services →
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ✅ Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleCartOpen}
              className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {/* Cart Icon */}
              <FiShoppingCart className="w-5 h-5 text-gray-700" />

              {/* Count Badge */}
              {/* <span className="absolute -top-1.5 -right-1.5 bg-[#ffcb04] text-black text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-md">
                {cartItems.length}
              </span> */}
            </button>

            {authToken ? (
              <button
                onClick={() => handleLogout()}
                className="px-4 py-2 cursor-pointer rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth/register")}
                  className="px-4 py-2 cursor-pointer rounded-md bg-[#ffca00] text-black font-semibold hover:bg-yellow"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-800" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-4">
              {["Home", "Pathology", "Blog", "About Us"].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (item === "Home") router.push("/");
                    if (item === "Blog") router.push("/blog");
                    if (item === "Pathology") router.push("/pathology");
                    if (item === "About Us") router.push("/aboutUs");
                  }}
                  className="text-gray-800 hover:text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-left"
                >
                  {item}
                </button>
              ))}

              {/* ✅ Mobile Exam Dropdown */}
              <div className="px-4">
                <button
                  onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                  className="text-gray-800 font-medium py-2 w-full text-left hover:text-yellow-500"
                >
                  PG Medical Entrance Exams
                </button>
                {isExamDropdownOpen && (
                  <div className="mt-2 pl-4 space-y-3">
                    {examCategories?.map((category) => (
                      <div key={category?.category_name}>
                        <h4 className="text-xs font-extrabold text-gray-500 mb-1 uppercase">
                          {category?.category_name}
                        </h4>
                        <ul className="space-y-1">
                          {category?.exams?.map((exam: any) => (
                            <li key={exam?._id}>
                              <button className="text-gray-700 hover:text-yellow-500 text-sm py-1 w-full text-left">
                                {exam.exam_name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <hr className="border-gray-200 my-2" />

              {/* Buttons (Mobile) */}
              <div className="flex flex-col gap-3 px-4">
                <button className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                  Login
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600">
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                  <FiShoppingCart className="w-5 h-5" />
                  Cart
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>














      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              key="cart-sidebar"
              initial={{ x: "100%", opacity: 0, rotateY: -25, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ x: "100%", opacity: 0, rotateY: -25, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 14,
                duration: 0.7,
              }}
              className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 rounded-l-3xl overflow-hidden perspective-1000"
            >
              <motion.div
                className="flex flex-col h-full relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {/* Header */}
                <div className="relative flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-white  border-primary p-3 rounded-xl shadow-lg">
                        <BiShoppingBag className="w-6 h-6 text-primary" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold ff-font-bold text-white">
                          {/* {cartItems.length} */}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold ff-font-bold flex items-center gap-2">
                        My Cart
                      </h2>
                      <p className="text-sm ff-font">
                        {/* {cartItems.length} courses selected */}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-yellow-50 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110"
                  >
                    <AiOutlineClose className="w-6 h-6 ff-font-bold" />
                  </button>
                </div>

                {/* Animated Cart Items */}
                <motion.div
                  className="flex-1 overflow-y-auto p-4 space-y-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {cartData.map((item) => (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02, rotateX: 1 }}
                      className="group relative bg-white border border-primary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      {/* Delete Icon */}
                      <button
                        onClick={() => console.log('Delete:', item._id)}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>

                      <div className="flex gap-3 p-3 items-center justify-between bg-white rounded-xl border border-primary">

                        <div className="flex flex-col flex-1">

                          {/* Name */}
                          <h3 className="font-semibold ff-font-bold mb-1 line-clamp-2">
                            {/* {item.title} */}
                            {item.category_name}
                          </h3>

                          {/* Duration */}
                          <p className="text-xs text-black bg-white ff-font border border-primary px-2 py-0.5 rounded-full w-fit font-medium mb-1">
                            Duration: {item.duration} Days
                          </p>

                          {/* Quantity */}
                          <p className="text-xs ff-font-bold font-medium">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-lg font-bold ff-font-bold text-primary">
                          ₹{item.price}
                        </div>
                      </div>


                    </motion.div>
                  ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="border-t border-gray-200 p-6 bg-white space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 ff-font-bold font-medium">Subtotal</span>
                    <span className="font-bold ff-font-bold text-lg">
                      ₹{cartTotalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 ff-font-bold font-medium">Discount</span>
                    <span className="font-bold ff-font-bold text-green-600 text-lg">
                      ₹0.00
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center bg-white rounded-xl p-4 border-2 border-primary">
                    <div>
                      <p className="text-xs text-gray-500 ff-font-bold font-medium">Total Amount</p>
                      <span className="text-3xl font-bold text-primary ff-font-bold">
                        ₹{cartTotalAmount}
                      </span>
                    </div>
                    <GiSparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div> */}
                  {/* <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-xl hover:scale-[1.03] hover:shadow-md transition-all">
                    Checkout Now
                  </button> */}
                  <CommonButton pyClass="py-3" pxClass="px-39" fontWeight={700} fontSize={15} className="ml-2">
                    Checkout Now
                  </CommonButton>
                  <button
                    className="w-full border border-primary ff-font-bold rounded-xl py-4 font-semibold"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>

                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>












    </header>
  );
}
