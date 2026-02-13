"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiBook,
  FiVideo,
  FiEdit3,
  FiClock,
  FiUsers,
  FiAward,
  FiCheck,
} from "react-icons/fi";
import CommonButton from "@/comman/Button";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";
import { getTempId } from "@/utils/helper";
import { getAuthId } from "@/utils/tokenManager";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* ---------- TYPES ---------- */
type OptionType = "record-book" | "video" | "writing-book";

interface Option {
  type: OptionType;
  description: string;
  price: number; // Display price (already converted by backend)
  price_usd?: number; // Original USD price
  price_inr?: number; // Original INR price
  features: string[];
  is_available: boolean;
}

interface ProgramDetail {
  _id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  price: number; // Display price (already converted by backend)
  price_usd?: number; // Original USD price
  price_inr?: number; // Original INR price
  duration: string;
  rating: number;
  total_reviews: number;
  vimeo_video_id: string;
  status: string;
  date: string;
  createdAt: string;
  currency: string; // 'INR' or 'USD' based on user location
  user_country?: string;
  options?: Option[];
}

/* ---------- ICON & TITLE MAPPING ---------- */
const getIconForType = (type: OptionType): React.ElementType => {
  const iconMap: Record<OptionType, React.ElementType> = {
    "record-book": FiBook,
    video: FiVideo,
    "writing-book": FiEdit3,
  };
  return iconMap[type] || FiBook;
};

const getTitleForType = (type: OptionType): string => {
  const titleMap: Record<OptionType, string> = {
    "record-book": "Record Book",
    video: "Video Course",
    "writing-book": "Writing Book",
  };
  return titleMap[type] || type;
};

// ✅ Helper to format currency based on user's location
const formatCurrency = (
  amount: number | undefined | null,
  currency: string
) => {
  const safeAmount = Number(amount) || 0;

  if (currency === "INR") {
    return `₹${safeAmount.toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  return `$${safeAmount.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
};

// ✅ Helper to get the correct price based on currency
const getPriceForCurrency = (option: Option, currency: string): number => {
  // If backend sent both prices, use the appropriate one
  if (currency === "INR" && option.price_inr) {
    return option.price_inr;
  }
  if (currency === "USD" && option.price_usd) {
    return option.price_usd;
  }
  // Fallback to display price (already converted by backend)
  return option.price;
};

/* ---------- ADD TO CART FUNCTION ---------- */
const addToCart = async (
  program: ProgramDetail,
  selectedOptions: OptionType[],
  isAlreadyInCart: boolean
) => {
  try {
    const userId = getAuthId();
    const tempId = userId ? null : getTempId();

    const productId = (program as any).id || program._id;

    if (!productId) {
      toast.error("Product ID is missing");
      return;
    }

    if (selectedOptions.length === 0) {
      toast.warning("Please select at least one learning path option");
      return;
    }

    const body = {
      ...(userId ? { user_id: userId } : { temp_id: tempId }),
      product_id: productId,
      selected_options: selectedOptions,
      category_name: program.category,
      duration: program.duration,
      bucket_type: true,
    };

    const res = await api.post(`${endPointApi.postCreateAddToCart}`, body);

    if (res.data.success) {
      const identifier = userId || tempId;
      const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);

      store.dispatch(setCartCount(countRes.data.count));
      
      if (isAlreadyInCart) {
        toast.info("Product is already in cart");
      } else {
        toast.success("Product added to cart successfully!");
      }
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to add to cart");
  }
};

/* ---------- MAIN COMPONENT ---------- */
export default function RecordedProgramDetails() {
  const params = useParams();
  const router = useRouter();
  const [program, setProgram] = useState<ProgramDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartItemId, setCartItemId] = useState<string | null>(null);

  // Clean up broken images in description
  useEffect(() => {
    if (!program?.description) return;

    const timer = setTimeout(() => {
      const images = document.querySelectorAll(".prose img");
      images.forEach((img: any) => {
        img.onerror = () => {
          img.style.display = "none";
        };
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [program?.description]);

  // Check if product is already in cart and pre-select options
  const checkCartAndPreselect = async (productId: string) => {
    try {
      const userId = getAuthId();
      const tempId = userId || getTempId();

      const cartRes = await api.get(`${endPointApi.getCart}`, {
        params: { temp_id: userId || tempId },
      });

      if (
        cartRes.data.success &&
        cartRes.data.cart &&
        cartRes.data.cart.length > 0
      ) {
        const cartItem = cartRes.data.cart.find((item: any) => {
          const itemProductId = item.product_id?._id || item.product_id;
          return itemProductId === productId;
        });

        if (
          cartItem &&
          cartItem.selected_options &&
          cartItem.selected_options.length > 0
        ) {
          setSelectedOptions(cartItem.selected_options);
          setCartItemId(cartItem._id);
        } else {
          setSelectedOptions([]);
          setCartItemId(null);
        }
      } else {
        setSelectedOptions([]);
        setCartItemId(null);
      }
    } catch (error) {
      setSelectedOptions([]);
      setCartItemId(null);
    }
  };

  // Fetch program details
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const id = params?.id;

        if (!id) {
          toast.error("Program ID not found");
          router.push("/pathology");
          return;
        }

        const res = await api.get(`${endPointApi.getPreRecordedById}/${id}`);

        if (res.data?.success && res.data?.data) {
          setProgram(res.data.data);

          const productId = res.data.data.id || res.data.data._id;
          await checkCartAndPreselect(productId);
        } else {
          toast.error("Program not found");
          router.push("/pathology");
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load program details"
        );
        router.push("/pathology");
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [params?.id, router]);

  const toggleOption = (type: OptionType) => {
    setSelectedOptions((prev) =>
      prev.includes(type) ? prev.filter((o) => o !== type) : [...prev, type]
    );
  };

  // ✅ Calculate total using the correct currency prices
  const total =
    selectedOptions.length === 0
      ? program?.price || 0
      : program?.options
        ?.filter((o) => selectedOptions.includes(o.type))
        .reduce(
          (sum, o) => sum + getPriceForCurrency(o, program.currency),
          0
        ) || 0;

  const handleAddToCart = async () => {
    if (!program) return;

    if (
      program.options &&
      program.options.length > 0 &&
      selectedOptions.length === 0
    ) {
      toast.warning("Please select at least one learning path option");
      return;
    }

    setAddingToCart(true);
    await addToCart(program, selectedOptions, !!cartItemId);
    setAddingToCart(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f9fafb]">
        <HeroSkeleton />
        <section className="relative -mt-40 px-4 pb-24 z-10">
          <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
            <Skeleton height={40} width="60%" className="mb-4" />
            <Skeleton height={20} width="80%" className="mb-6" />
            <Skeleton height={100} className="mb-8" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} height={300} borderRadius={12} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (!program) {
    return (
      <main className="min-h-screen bg-[#f9fafb] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Program Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The program you're looking for doesn't exist.
          </p>
          <CommonButton onClick={() => router.push("/pathology")}>
            Back to Programs
          </CommonButton>
        </div>
      </main>
    );
  }

  // ✅ Currency is determined by backend based on user's IP location
  const programCurrency = program.currency || "USD";

  return (
    <main className="min-h-screen bg-[#f9fafb]">
      <Hero />

      <section className="relative -mt-40 px-4 pb-24 z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          {/* Header */}
          <h1 className="text-4xl font-serif font-bold ff-font-bold mt-2 ">
            {program.title}
          </h1>

          {/* Description */}
          <p className="ff-font mt-3">
            {program.description && (
              <span
                dangerouslySetInnerHTML={{
                  __html: program.description
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'"),
                }}
              />
            )}
          </p>


          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <span className="flex items-center gap-2 bg-white border border-primary ff-font px-4 py-1 rounded-full text-sm">
              <FiClock /> Lifetime Access
            </span>

            <span className="text-2xl font-bold ff-font-bold">
              Starting at {formatCurrency(program.price, programCurrency)}
            </span>

            <span className="flex items-center gap-2 text-sm ff-font">
              <FiClock className="ff-font-bold text-primary" />
              50+ Hours of Content
            </span>

            <span className="flex items-center gap-2 text-sm ff-font">
              <FiUsers className="ff-font-bold text-primary" />
              {program.total_reviews > 0
                ? `${program.total_reviews}+`
                : "10,000+"}{" "}
              Students Enrolled
            </span>

            <span className="flex items-center gap-2 text-sm ff-font">
              <FiAward className="ff-font-bold text-primary" />
              Certificate of Completion
            </span>
          </div>

          <hr className="my-8 text-gray-200" />

          {/* Options */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold ff-font-bold">
              Choose Your Learning Path
            </h2>
          </div>
          <p className="text-sm ff-font-bold mb-6">
            Select one or more options to customize your learning experience
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {program.options &&
              program.options
                .filter((opt) => opt.is_available)
                .map((opt) => {
                  const active = selectedOptions.includes(opt.type);
                  const Icon = getIconForType(opt.type);
                  const title = getTitleForType(opt.type);

                  // ✅ Get the correct price based on user's currency
                  const displayPrice = getPriceForCurrency(
                    opt,
                    programCurrency
                  );

                  return (
                    <div
                      key={opt.type}
                      onClick={() => toggleOption(opt.type)}
                      className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300
                      flex flex-col h-full
                      ${active
                          ? "border-[#FFCA00] bg-[#FFCA00]/10"
                          : "border-gray-200 hover:border-[#FFCA00]"
                        }`}
                    >
                      {/* Check Icon */}
                      <div className="absolute top-4 right-4">
                        {active ? (
                          <div className="w-6 h-6 rounded-full bg-[#FFCA00] flex items-center justify-center">
                            <FiCheck className="text-white text-sm" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-gray-300 bg-white" />
                        )}
                      </div>

                      {/* Icon */}
                      <div className="w-12 h-12 mb-3 rounded-xl bg-white border border-primary flex items-center justify-center ff-font-bold">
                        <Icon className="text-xl" />
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold ff-font-bold">{title}</h3>

                      {/* Description */}
                      <p className="text-sm ff-font mb-4 line-clamp-3">
                        {opt.description}
                      </p>


                      {/* Features */}
                      <ul className="space-y-2 mb-4">
                        {opt.features.map((f, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm ff-font"
                          >
                            <FiCheck className="text-primary" />
                            <span className="truncate">
                              {f}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* ✅ Price with correct currency */}
                      <div className="mt-auto pt-6">
                        <span className="font-bold text-lg">
                          {formatCurrency(displayPrice, programCurrency)}{" "}
                          <span className="font-normal">/one-time</span>
                        </span>
                      </div>

                    </div>
                  );
                })}
          </div>

          <hr className="my-8 text-gray-200" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm ff-font-bold">Total Price</span>
              <div className="text-2xl font-bold ff-font-bold">
                {formatCurrency(total, programCurrency)}
              </div>
            </div>

            <CommonButton
              pyClass="py-2"
              pxClass="px-7"
              fontWeight={700}
              fontSize={14}
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart
                ? "Adding..."
                : cartItemId
                  ? "Update Cart"
                  : "Add to Cart"}
            </CommonButton>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="relative w-full h-[80vh] overflow-hidden">
    <motion.img
      src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
      alt="Blog Hero"
      className="w-full h-full object-cover object-center"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    />
  </section>
);

/* ---------- SKELETON ---------- */
const HeroSkeleton = () => (
  <section className="relative w-full h-[80vh] overflow-hidden bg-gray-200">
    <Skeleton height="100%" width="100%" />
  </section>
);