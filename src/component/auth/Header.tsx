"use client";

import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiShoppingBag } from "react-icons/bi";
import { FiMenu, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { FaNoteSticky, FaRightFromBracket } from "react-icons/fa6";
import MyCart from "../mycart/MyCart";
import { clearAuthId, clearToken, getAuthId } from "@/utils/tokenManager";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { decrementCartCount, resetCartCount, setCartCount } from "@/redux/cartSlice";
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
  quantity: number;
};

type UserProfile = {
  first_name: string;
  last_name: string;
  email: string;
  profile_photo?: string;
};

export default function Header() {
  const userId = getAuthId();
  const dispatch = useDispatch<AppDispatch>();
  const { count, error } = useSelector((state: RootState) => state.cart);

  // State management for IDs
  const [tempIdGet, setTempIdGet] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

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
  const [isCartLoading, setIsCartLoading] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  // Initialize tempIdGet ONCE on mount
  useEffect(() => {
    const storedId = getTempId();
    setTempIdGet(storedId);
    setIsInitialized(true);
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId || !authToken) return;

      try {
        const response = await api.get(`${endPointApi.getProfile}/${userId}`);
        if (response?.data?.user) {
          setUserProfile(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId, authToken]);

  // Fetch exams once on mount
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

  // Get cart count with proper ID handling
  const getCountCartItems = async () => {
    try {
      const finalId = userId || tempIdGet;

      if (!finalId) {
        console.log("No ID available yet, skipping cart count fetch");
        return;
      }

      const res = await api.get(`${endPointApi.cartCount}/${finalId}`);

      if (res.data) {
        dispatch(setCartCount(res.data.count));
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
      dispatch(setCartCount(0));
    }
  };

  // Load cart count only when ID is available
  useEffect(() => {
    if (isInitialized && (userId || tempIdGet)) {
      getCountCartItems();
    }
  }, [isInitialized, userId, tempIdGet]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isExamDropdownOpen &&
        !target.closest("#exam-button") &&
        !target.closest("#exam-dropdown")
      ) {
        setIsExamDropdownOpen(false);
      }
    };

    if (isExamDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExamDropdownOpen]);

  const handleLogout = () => {
    clearToken();
    clearAuthId();
    setIsProfileOpen(false);
    setUserProfile(null);
    dispatch(resetCartCount());
    router.push("/auth/login");
  };

  // Helper function to get profile photo URL
  const getProfilePhotoUrl = () => {
    if (!userProfile?.profile_photo) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.first_name || 'User')}+${encodeURIComponent(userProfile?.last_name || '')}&background=ffca00&color=000&size=200`;
    }

    const photoPath = userProfile.profile_photo;
    const rawBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3699';
    const baseUrl = rawBaseUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }

    const cleanPath = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
    return `${baseUrl}/${cleanPath}`;
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
    if (isCartLoading) return;

    try {
      setIsCartLoading(true);
      setIsCartOpen(true);

      const finalId = userId || tempIdGet;

      if (!finalId) {
        console.error("No ID available for cart fetch");
        setIsCartLoading(false);
        return;
      }

      const res = await api.get(`${endPointApi.getCart}?temp_id=${finalId}`);

      if (res.data) {
        setCartData(res.data.cart);
        setCartTotalAmount(res.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setIsCartLoading(false);
    }
  };

  const MdRemoveShoppingCart = async (cartId: string) => {
    try {
      const res = await api.delete(`${endPointApi.removeCart}/${cartId}`);
      if (res.data) {
        dispatch(decrementCartCount(1));

        // Refresh cart data
        const finalId = userId || tempIdGet;
        if (finalId) {
          const cartRes = await api.get(`${endPointApi.getCart}?temp_id=${finalId}`);
          if (cartRes.data) {
            setCartData(cartRes.data.cart);
            setCartTotalAmount(cartRes.data.total || 0);
          }
        }
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  const removeCartOption = async (cartId: string, optionType: string): Promise<boolean> => {
    try {
      const res = await api.post(`${endPointApi.removeCartOption}`, {
        cart_id: cartId,
        option_type: optionType
      });

      if (res.data && res.data.success) {
        if (res.data.deleted) {
          dispatch(decrementCartCount(1));
        }

        const finalId = userId || tempIdGet;
        if (finalId) {
          const cartRes = await api.get(`${endPointApi.getCart}?temp_id=${finalId}`);
          if (cartRes.data) {
            setCartData(cartRes.data.cart);
            setCartTotalAmount(cartRes.data.total || 0);
          }
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error removing cart option:", error);
      return false;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => router.push("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={"../../../images/main logo.png"}
              alt="Mendel Academy Logo"
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Links (Desktop) */}
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

            {/* Dropdown Menu */}
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
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white border border-gray-200 rounded-xl shadow-xl p-4 animate-fadeIn"
                >
                  <h3 className="text-sm font-bold text-[#FFCA00] mb-3 text-center uppercase tracking-wide ff-font-bold pb-2 border-b border-[#FFCA00]">
                    Medical Exam Prep
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {examCategories.map((category) => (
                      <ul key={category.category_name} className="space-y-1">
                        {category?.exams?.map((exam: any) => (
                          <li key={exam?._id}>
                            <button
                              className="w-full text-left text-sm ff-font text-gray-700 hover:text-[#FFCA00] hover:bg-yellow-50 hover:pl-3 px-2 py-2 rounded cursor-pointer transition-all duration-200"
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
                    ))}
                  </div>


                  <div className="border-t border-gray-200 mt-3 pt-3 text-center">
                    <button
                      onClick={() => {
                        router.push('/medicalexam')
                        setIsExamDropdownOpen(false);
                      }}
                      className="ff-font-bold text-xs text-[#FFCA00] hover:text-black hover:underline transition-colors duration-200"
                    >
                      View All →
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
                  ${pathname === "/studentTestimonials" ? "w-full" : "w-0 group-hover:w-full"}
                `}
              ></span>
            </button>
          </nav>

          {/* Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => {
                if (count > 0) {
                  handleCartOpen();
                }
              }}
              disabled={isCartLoading}
              className="relative p-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className={`w-5 h-5 ${isCartLoading ? 'animate-pulse' : ''}`} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#ffcb04] text-black text-[11px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center shadow-md">
                {count}
              </span>
            </button>

            {authToken ? (
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                }}
                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-gray-300 hover:border-gray-400 transition-all"
              >
                <img
                  src={getProfilePhotoUrl()}
                  className="w-full h-full object-cover"
                  alt={userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "User Profile"}
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.first_name || 'User')}+${encodeURIComponent(userProfile?.last_name || '')}&background=ffca00&color=000&size=200`;
                  }}
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
                  className="px-4 py-2 cursor-pointer rounded-md bg-[#FFCA00] ff-font-bold hover:bg-yellow"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
                  className="ff-font hover:text-yellow-500 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium text-left"
                >
                  {item}
                </button>
              ))}

              {/* Mobile Exam Dropdown */}
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
                {!authToken && (
                  <>
                    <button
                      onClick={() => router.push("/auth/login")}
                      className="flex items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium ff-font"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => router.push("/auth/register")}
                      className="flex items-center justify-center gap-2 py-2 rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 ff-font"
                    >
                      Sign Up
                    </button>
                  </>
                )}

                {authToken && (
                  <button
                    onClick={() => {
                      router.push("/editProfile");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-2 px-4 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium"
                  >
                    <img
                      src={getProfilePhotoUrl()}
                      alt={userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : "User"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile?.first_name || 'User')}+${encodeURIComponent(userProfile?.last_name || '')}&background=ffca00&color=000&size=200`;
                      }}
                    />
                    <span className="font-medium ff-font">
                      {userProfile ? `${userProfile.first_name} ${userProfile.last_name}` : 'My Profile'}
                    </span>
                  </button>
                )}

                <button
                  onClick={() => {
                    if (count > 0) {
                      setIsCartOpen(true);
                      setIsMenuOpen(false);
                      handleCartOpen();
                    }
                  }}
                  disabled={isCartLoading}
                  className="flex ff-font items-center justify-center gap-2 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 font-medium disabled:opacity-50"
                >
                  <FiShoppingCart className={`w-5 h-5 ${isCartLoading ? 'animate-pulse' : ''}`} />
                  Cart ({count})
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>

      {isProfileOpen && (
        <div className="absolute right-4 mt-2 w-56 bg-white shadow-xl rounded-xl border border-gray-300 py-2 z-50 animate-fadeIn">
          <button
            onClick={() => {
              router.push("/editProfile");
              setIsProfileOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full text-left cursor-pointer transition-colors duration-200"
          >
            <FaUser className="text-gray-500 w-5 h-5" />
            <span className="text-sm font-medium ff-font">Edit Profile</span>
          </button>
          <button
            onClick={() => {
              router.push("/test-create");
              setIsProfileOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full text-left cursor-pointer transition-colors duration-200"
          >
            <FaNoteSticky className="text-gray-500 w-5 h-5" />
            <span className="text-sm font-medium ff-font">QBank</span>
          </button>
          <hr className="my-2 border-gray-200" />
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
          <MyCart
            cartTotalAmount={cartTotalAmount}
            cartData={cartData}
            setIsCartOpen={setIsCartOpen}
            MdRemoveShoppingCart={MdRemoveShoppingCart}
            removeCartOption={removeCartOption}
            isLoading={isCartLoading}
          />
        )}
      </AnimatePresence>
    </header>
  );
}