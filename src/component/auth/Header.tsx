"use client";

import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { FiMenu, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import CommonButton from "@/comman/Button";
import { FaUser } from "react-icons/fa";
import { FaRightFromBracket } from "react-icons/fa6";
import MyCart from "../mycart/MyCart";
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
  quantity: number;
};

export default function Header() {
  // const tempIdGet = sessionStorage.getItem("temp_id");
  let tempIdGet: string | null = null;

  if (typeof window !== "undefined") {
    tempIdGet = sessionStorage.getItem("temp_id");
  }

  const authToken =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState<boolean>(false);
  const [examCategories, setExamCategories] = useState<ExamCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [cartItemCount, setCartItemCount] = useState<number>(0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get(`${endPointApi.getAppMedicalExam}`);
        if (res.data.data) {
          setExamCategories(res.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  // useEffect(() => {
  //   const fetchExams = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await api.get(`${endPointApi.getAppMedicalExam}`);
  //       if (res.data.data) {
  //         setExamCategories(res.data.data || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching exam data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchExams();
  // }, []);


  useEffect(() => {
    const getCountCartItems = async () => {
      try {
        const res = await api.get(`${endPointApi.cartCount}/${tempIdGet}`);
        console.log("dataaaa", res);

        if (res.data) {
          setCartItemCount(res.data.count);
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    getCountCartItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsProfileOpen(false);
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
      const res = await api.get(`${endPointApi.getCart}?temp_id=${tempIdGet}`);

      if (res.data) {
        setCartData(res.data.cart);
        setCartTotalAmount(res.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const MdRemoveShoppingCart = async (cartId: string) => {
    try {
      const res = await api.delete(`${endPointApi.removeCart}/${cartId}`);
      if (res.data) {
        // Refresh cart data after removal
        handleCartOpen();
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/*  Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={"../../../images/main logo.png"}
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
  ${pathname === "/" ? "" : "hover:text-[#FFCA00]"}
`}
            >
              Home
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
        ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            {/* ✅ Dropdown Menu */}
            <div className="relative">
              <button
                id="exam-button"
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                className={`relative ff-font font-medium text-sm group cursor-pointer
    ${isExamActive ? "" : "hover:text-[#FFCA00]"}
  `}
              >
                PG Medical Entrance Exams
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
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
                                onClick={() => {
                                  router.push(`/medicalexam/${exam?.exam_id}`);
                                  setIsExamDropdownOpen(false);
                                }}
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
                      className=" font-medium text-sm hover:underline"
                    >
                      View All Exam Services →
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => router.push("/pathology")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/pathology" ? "" : "hover:text-[#FFCA00]"}
    `}
            >
              Advanced Pathology Prep
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
        ${pathname === "/pathology" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/aboutUs")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/aboutUs" ? "" : "hover:text-[#FFCA00]"}
    `}
            >
              About Us
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
        ${pathname === "/aboutUs" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/blog")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/blog" ? "" : "hover:text-[#FFCA00]"}
    `}
            >
              Blog
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
        ${pathname === "/blog" ? "w-full" : "w-0 group-hover:w-full"}
      `}
              ></span>
            </button>
            <button
              onClick={() => router.push("/studentTestimonials")}
              className={`relative ff-font font-medium text-sm group cursor-pointer
      ${pathname === "/studentTestimonials" ? "" : "hover:text-[#FFCA00]"}
    `}
            >
              Student Testimonials
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-[#FFCA00] transition-all duration-300
        ${pathname === "/studentTestimonials"
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                  }
      `}
              ></span>
            </button>
          </nav>

          {/* ✅ Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={handleCartOpen}
              className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              {/* Cart Icon */}
              <FiShoppingCart className="w-5 h-5" />

              {/* Count Badge */}
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffcb04] text-black text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-md">
                {cartItemCount}
              </span>
            </button>

            {authToken ? (
              // <button
              //   onClick={() => handleLogout()}
              //   className="px-4 py-2 cursor-pointer rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
              // >
              //   Logout
              // </button>
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 hover:scale-105 transition-all"
              >
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                  className="w-full h-full object-cover"
                  alt="Guest User"
                />
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/auth/login")}
                  className="px-4 py-2 cursor-pointer rounded-md border border-gray-300 ff-font-bold hover:bg-gray-100 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/auth/register")}
                  className="px-4 py-2 cursor-pointer rounded-md bg-[#FFCA00] ff-font-bold  hover:bg-yellow"
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
                  className="ff-font  hover:text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-left"
                >
                  {item}
                </button>
              ))}

              {/* ✅ Mobile Exam Dropdown */}
              <div className="px-4">
                <button
                  onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                  className="ff-font font-medium py-2 w-full text-left hover:text-yellow-500"
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
                <button className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium ff-font ">
                  Login
                </button>
                <button className="flex items-center justify-center gap-2 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 ff-font ">
                  Sign Up
                </button>

                {/* ✅ Profile Button with Image */}
                <button className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium">
                  <img
                    src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium ff-font ">My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex ff-font  items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Cart
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {isProfileOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl border border-gray-300 py-2 z-50 animate-fadeIn">
          {/* Edit Profile */}
          <button
            onClick={() => {
              router.push("/editProfile")
              setIsMenuOpen(false);
            }
            }
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full text-left cursor-pointer transition-colors duration-200"
          >
            <FaUser className="text-gray-500  w-5 h-5" />
            <span className="text-sm font-medium ff-font">Edit Profile</span>
          </button>
          <hr className="my-2 border-gray-200" />
          {/* Logout */}
          <button
            onClick={() => handleLogout()}
            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-red-50 text-red-600 w-full text-left font-semibold transition-colors duration-200"
          >
            <FaRightFromBracket className="text-red-500 ff-font w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* <MyCart /> */}
            <MyCart
              cartTotalAmount={cartTotalAmount}
              cartData={cartData}
              setIsCartOpen={setIsCartOpen}
              MdRemoveShoppingCart={MdRemoveShoppingCart}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
