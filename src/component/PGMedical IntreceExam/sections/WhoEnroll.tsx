// WhoEnroll.tsx
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCheckCircle } from "react-icons/fa";

import { formatPrice, getTempId, isIndia } from "@/utils/helper";
import CommonButton from "@/comman/Button";
import { getAuthId } from "@/utils/tokenManager";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";
import { toast } from "react-toastify";
import Sliders from "@/comman/Sliders";
import { ErrorToast, InfoToast, SuccessToast } from "@/comman/Toastify";

interface WhoEnrollProps {
  data: WhoEnrollData | null;
  loading: boolean;
  examCategoryId?: string;
}

export interface Plan {
  _id: string;
  id?: number;
  name?: string;
  most_popular?: boolean;
  plan_type?: string;
  plan_day?: number;
  plan_month?: number;
  plan_pricing_dollar?: number;
  plan_pricing_inr?: number;
  plan_title?: string;
  plan_sub_title?: string[];
  is_plan_visible?: boolean;
}

export interface RapidTool {
  _id?: string;
  tool_type?: string;
  price_usd?: number;
  price_inr?: number;
}

export interface EliteMentorship {
  _id?: string;
  name?: string;
  subtitle?: string;
  price_usd?: number;
  price_inr?: number;
  included_services?: string;
}

export interface Tsunami {
  name?: string;
  included_service_price_usd?: number;
  included_service_price_inr?: number;
  description?: string;
}

export interface WhoEnrollData {
  _id?: string;
  who_can_enroll_title?: string;
  who_can_enroll_description?: string;
  who_can_enroll_image?: string;
  plan_section_title?: string;
  mentorship_tsunami_section_title?: string;
  rapid_tools_section_title?: string;
  choose_plan_list?: Plan[];
  rapid_learning_tools?: RapidTool[];
  elite_mentorship?: EliteMentorship[];
  tsunami?: Tsunami;
  user_currency?: string;
  user_country?: string;
  is_plan_visible?: boolean;
  is_rapid_tools_visible?: boolean;
}

const WhoEnroll = ({ data, loading, examCategoryId }: WhoEnrollProps) => {
  const router = useRouter();
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const fetchCartItems = async () => {
    try {
      const identifier = userId || tempId;
      if (!identifier) return;

      const res = await api.get(`${endPointApi.getCart}`, {
        params: { temp_id: identifier },
      });

      if (res.data.success) {
        setCartItems(res.data.cart || []);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, tempId]);
  const cleanHtml = DOMPurify.sanitize(data?.who_can_enroll_description || "", {
    USE_PROFILES: { html: true },
  });

  const backendCurrency = data?.user_currency;
  const fallbackCurrency = isIndia() ? "INR" : "USD";
  const userCurrency = backendCurrency || fallbackCurrency;

  const addToCart = async (plan: Plan) => {
    try {
      setLoadingPlanId(plan._id);
      const categoryId = examCategoryId || data?._id;

      if (!categoryId) {
        ErrorToast("Category ID is missing");
        return;
      }

      if (!plan._id) {
        ErrorToast("Plan ID is missing");
        return;
      }

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: categoryId,
        plan_id: plan._id,
        bucket_type: true,
      };

      const res = await api.post(`${endPointApi.postAddExamPlanToCart}`, body);

      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        
        // Refresh local cart items to update button state
        await fetchCartItems();

        if (res.data.alreadyInCart) {
          InfoToast("This plan is already in your cart");
        } else {
          SuccessToast("Plan added to cart successfully!");
        }
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This plan is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add plan to cart");
      }
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {loading ? (
          <HeroSkeleton />
        ) : (
          <ContentSection
            title={data?.who_can_enroll_title || ""}
            html={cleanHtml}
            image={data?.who_can_enroll_image}
          />
        )}

        {data?.is_plan_visible !== false && (
          <PricingSection
            plans={data?.choose_plan_list || []}
            loading={loading}
            loadingPlanId={loadingPlanId}
            userCurrency={userCurrency}
            onEnroll={(plan) => addToCart(plan)}
            title={data?.plan_section_title || "Choose Your Plan"}
            cartItems={cartItems}
          />
        )}
        {/* Elite Mentorship & Tsunami Program - USMLE Style */}
        {(data?.elite_mentorship && data.elite_mentorship.length > 0) || data?.tsunami ? (
          <section className="py-[72px] px-6 bg-white">
            <div className="max-w-[960px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
                  {data?.mentorship_tsunami_section_title || "Elite Mentorship & Tsunami Program"}
                </h2>
                <p className="text-sm usmle-text-gray ff-font">Live, physician-led coaching. Includes 1-year Galaxy App access free.</p>
              </div>

              {data?.elite_mentorship && data.elite_mentorship.length > 0 && (
                <div className="bg-white border border-[#E5E3DA] rounded-2xl overflow-hidden mb-5">
                  <div className="bg-[#1A1A1A] p-4 md:px-6">
                    <p className="text-[11px] font-extrabold tracking-[0.1em] uppercase text-[#F5C800]">Individual Courses</p>
                    <p className="text-xs text-[#64748b] mt-1">Enroll in any course individually · Includes 1-year Galaxy App access free</p>
                  </div>
                  {data.elite_mentorship.map((mentorship, index) => {
                    const price = userCurrency === "INR" ? mentorship.price_inr : mentorship.price_usd;
                    const currencySymbol = userCurrency === "INR" ? "₹" : "$";
                    return (
                      <div
                        key={mentorship._id || index}
                        className="flex items-center p-4 md:px-6 gap-4 transition-colors duration-150 hover:bg-[#fffbe6] border-b border-[#F7F6F1] last:border-b-0"
                      >
                        <div className="flex-grow">
                          <p className="text-sm font-extrabold text-[#1A1A1A] mb-1 ff-font-bold">{mentorship.name}</p>
                          {mentorship.subtitle && (
                            <p className="text-xs text-[#64748b] ff-font">{mentorship.subtitle}</p>
                          )}
                          {/* {!mentorship.subtitle && (
                            <p className="text-xs text-[#64748b] ff-font">Weekly live sessions · Group mentorship</p>
                          )} */}
                        </div>
                        <p className="text-lg font-black text-[#1A1A1A] flex-shrink-0 min-w-[70px] text-right ff-font-bold">
                          {currencySymbol}{formatPrice(price ?? 0)}
                        </p>
                        <MentorshipButton
                          mentorship={mentorship}
                          examCategoryId={examCategoryId}
                          cartItems={cartItems}
                          onUpdateCart={fetchCartItems}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* {data?.tsunami && data.tsunami.name && ( */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* <TsunamiBundleCardUSMLE
                    tsunami={data.tsunami}
                    userCurrency={userCurrency}
                    examCategoryId={examCategoryId}
                    cartItems={cartItems}
                    onUpdateCart={fetchCartItems}
                  /> */}
                  {/* {data?.elite_mentorship && data.elite_mentorship.length > 0 && ( */}
                    <FullMatchBundleCard
                      mentorships={data.elite_mentorship}
                      userCurrency={userCurrency}
                      examCategoryId={examCategoryId}
                      cartItems={cartItems}
                      onUpdateCart={fetchCartItems}
                    />
                  {/* )} */}
                </div>
              {/* )} */}
            </div>
          </section>
        ) : null}

        {data?.is_rapid_tools_visible !== false && (
          <RapidToolsSection
            tools={data?.rapid_learning_tools || []}
            loading={loading}
            userCurrency={userCurrency}
            examCategoryId={examCategoryId}
            title={data?.rapid_tools_section_title || "Rapid Learning Tools"}
            cartItems={cartItems}
            onUpdateCart={fetchCartItems}
          />
        )}

        {/* All Cards in One Line - Elite Mentorship + Tsunami */}
      </div>
    </section>
  );
};

export default WhoEnroll;

// Content Section (Image + Text)
const ContentSection = ({
  title,
  html,
  image,
}: {
  title: string;
  html: string;
  image?: string;
}) => (
  <div className="mx-auto mb-20 grid max-w-[1380px] items-center gap-16 px-4 md:grid-cols-2">
    <ImageBlock src={image} />
    <TextBlock title={title} html={html} />
  </div>
);

// Image Block
const ImageBlock = ({ src }: { src?: string }) => {
  const fallback =
    "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg";
  return (
    <div className="order-2 flex justify-center md:order-1">
      <div className="relative overflow-hidden rounded-3xl border-4 border-primary shadow-2xl p-2 w-[550px] h-[450px] mx-auto">
        <img
          src={src || fallback}
          alt="Medical professional"
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = fallback;
          }}
        />
      </div>
    </div>
  );
};

// Text Block
const TextBlock = ({ title, html }: { title: string; html: string }) => (
  <div className="order-1 space-y-8 md:order-2">
    <div>
      <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
        {title}
      </h2>
    </div>
    <div
      className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:marker:text-[#ffcb04] ff-font"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  </div>
);

// Pricing Section
const PricingSection = ({
  plans,
  loading,
  loadingPlanId,
  userCurrency,
  onEnroll,
  title,
  cartItems,
}: {
  plans: Plan[];
  loading: boolean;
  loadingPlanId: string | null;
  userCurrency: string;
  onEnroll: (plan: Plan) => void;
  title: string;
  cartItems: any[];
}) => (
  <div id="pricing" className="max-w-[1380px] mx-auto">
    <SectionHeading title={title} />

    {loading ? (
      <PlanSkeleton />
    ) : (
      <div>
        <Sliders
          settings={{
            accessibility: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true
          }}
        >
          {plans.map((plan) => (
            <PlanCard
              key={plan._id}
              plan={plan}
              userCurrency={userCurrency}
              isLoading={loadingPlanId === plan._id}
              onEnroll={() => onEnroll(plan)}
              isSelected={cartItems.some(item => item.cart_type === 'exam_plan' && (item.plan_id?._id === plan._id || item.plan_id === plan._id))}
            />
          ))}
        </Sliders>
      </div>
    )}
  </div>
);

// Section Heading
const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center mb-4">
    <h2 className="text-[30px] font-black usmle-text-black mb-2 ff-font-bold">
      {title}
    </h2>
  </div>
);

// Single Plan Card
const PlanCard = ({
  plan,
  userCurrency,
  isLoading,
  onEnroll,
  isSelected,
}: {
  plan: Plan;
  userCurrency: string;
  isLoading: boolean;
  onEnroll: () => void;
  isSelected?: boolean;
}) => {
  const price = userCurrency === "INR" ? plan.plan_pricing_inr : plan.plan_pricing_dollar;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  return (
    <div className={`relative bg-white border-2 rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[420px] transition-all duration-300 ${plan.most_popular ? "border-primary shadow-xl" : "border-[#e5e7eb] hover:shadow-xl hover:border-[#ffca00]"}`}>
      {plan.most_popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-[#ffca00] text-white ff-font-bold px-6 py-2 rounded-full text-xs font-bold shadow-lg">
            POPULAR
          </span>
        </div>
      )}

      <div className="flex flex-col flex-grow justify-between space-y-6 mt-2">
        <div className="space-y-2">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-white border-primary rounded-full text-sm font-bold text-primary ff-font-bold uppercase">
              {plan.plan_type}
            </span>
          </div>

          <h3 className="text-2xl font-bold ff-font-bold text-center">
            {plan.plan_month} Month{(plan.plan_month) && (plan.plan_month) > 1 ? "s" : ""}
          </h3>

          <div className="space-y-2 text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>

          {/* {plan.plan_title && (
            <p className="text-sm text-gray-500 text-center ff-font">{plan.plan_title}</p>
          )} */}

          <ul className="space-y-3 mt-8">
            {plan.plan_sub_title?.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                <span className="ff-font">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <CommonButton onClick={onEnroll} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};

// Skeleton Loaders
const HeroSkeleton = () => (
  <div className="mx-auto mb-24 grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
    <Skeleton height={500} width={500} borderRadius={24} />
    <div className="space-y-8 w-full">
      <Skeleton height={40} width={300} borderRadius={10} />
      <Skeleton height={200} width="100%" borderRadius={20} />
    </div>
  </div>
);

const PlanSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={480} borderRadius={16} />
    ))}
  </div>
);

const RapidToolSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={200} borderRadius={16} />
    ))}
  </div>
);

const CombinedSkeleton = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={i} height={280} borderRadius={16} />
    ))}
  </div>
);

// Rapid Learning Tools Section
const RapidToolsSection = ({
  tools,
  loading,
  userCurrency,
  examCategoryId,
  title,
  cartItems,
  onUpdateCart,
}: {
  tools: RapidTool[];
  loading: boolean;
  userCurrency: string;
  examCategoryId?: string;
  title: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => (
  <div className="max-w-[1380px] mx-auto mt-16">
    <SectionHeading title={title} />

    {loading ? (
      <RapidToolSkeleton />
    ) : (
      <div>
        <Sliders
          settings={{
            accessibility: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
          }}
        >
          {tools.map((tool) => (
            <RapidToolCard
              key={tool._id}
              tool={tool}
              userCurrency={userCurrency}
              examCategoryId={examCategoryId}
              isSelected={cartItems.some(item => item.cart_type === 'rapid_tool' && (item.tool_id?._id === tool._id || item.tool_id === tool._id))}
              onUpdateCart={onUpdateCart}
            />
          ))}
        </Sliders>
      </div>
    )}
  </div>
);

// Single Rapid Tool Card
const RapidToolCard = ({
  tool,
  userCurrency,
  examCategoryId,
  isSelected,
  onUpdateCart,
}: {
  tool: RapidTool;
  userCurrency: string;
  examCategoryId?: string;
  isSelected?: boolean;
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tool.price_inr : tool.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const addToolToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      if (!tool._id) {
        ErrorToast("Tool ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        tool_id: tool._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddRapidToolToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This tool is already in your cart");
        } else {
          SuccessToast("Tool added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding tool to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This tool is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add tool to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[180px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-xl font-bold ff-font-bold capitalize">{tool.tool_type}</h3>
          </div>
          <div className="text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>
        </div>
        <CommonButton onClick={addToolToCart} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};

// COMBINED SECTION - All cards in one line (Elite Mentorship + Tsunami)
const CombinedMentorshipAndTsunamiSection = ({
  mentorships,
  tsunami,
  loading,
  userCurrency,
  examCategoryId,
  title,
  cartItems,
  onUpdateCart,
}: {
  mentorships: EliteMentorship[];
  tsunami?: Tsunami;
  loading: boolean;
  userCurrency: string;
  examCategoryId?: string;
  title: string;
  cartItems: any[];
  onUpdateCart: () => void;
}) => {
  // Create a combined array of all items
  const allItems: (EliteMentorship | Tsunami)[] = [...mentorships];

  // Add tsunami to the combined array if it exists
  if (tsunami && tsunami.name) {
    allItems.push(tsunami);
  }

  if (allItems.length === 0) return null;

  return (
    <div className="max-w-[1380px] mx-auto mt-16">
      <SectionHeading title={title} />

      {loading ? (
        <CombinedSkeleton />
      ) : (
        <div>
          <Sliders
            settings={{
              accessibility: true,
              infinite: true,
              speed: 500,
              slidesToShow: Math.min(4, allItems.length),
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              arrows: true,
              responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: Math.min(3, allItems.length),
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: Math.min(2, allItems.length),
                  },
                },
                {
                  breakpoint: 640,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ],
            }}
          >
            {allItems.map((item, index) => {
              // Check if item is Tsunami (has name and description structure)
              if ('included_service_price_usd' in item || 'description' in item) {
                const tsunamiItem = item as Tsunami;
                return (
                  <TsunamiCardInLine
                    key={`tsunami-${index}`}
                    tsunami={tsunamiItem}
                    userCurrency={userCurrency}
                    examCategoryId={examCategoryId}
                    isSelected={cartItems.some(item => item.cart_type === 'tsunami' && (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId))}
                    onUpdateCart={onUpdateCart}
                  />
                );
              } else {
                // It's an Elite Mentorship item
                const mentorshipItem = item as EliteMentorship;
                return (
                  <EliteMentorshipCardInLine
                    key={mentorshipItem._id || `mentorship-${index}`}
                    mentorship={mentorshipItem}
                    userCurrency={userCurrency}
                    examCategoryId={examCategoryId}
                    isSelected={cartItems.some(item => item.cart_type === 'elite_mentorship' && (item.mentorship_id?._id === mentorshipItem._id || item.mentorship_id === mentorshipItem._id))}
                    onUpdateCart={onUpdateCart}
                  />
                );
              }
            })}
          </Sliders>
        </div>
      )}
    </div>
  );
};

// Elite Mentorship Card for Inline Display
const EliteMentorshipCardInLine = ({
  mentorship,
  userCurrency,
  examCategoryId,
  isSelected,
  onUpdateCart,
}: {
  mentorship: EliteMentorship;
  userCurrency: string;
  examCategoryId?: string;
  isSelected?: boolean;
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? mentorship.price_inr : mentorship.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const addMentorshipToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      if (!mentorship._id) {
        ErrorToast("Mentorship ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        mentorship_id: mentorship._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddEliteMentorshipToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This mentorship is already in your cart");
        } else {
          SuccessToast("Mentorship added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding mentorship to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This mentorship is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add mentorship to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[280px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-xl font-bold ff-font-bold capitalize">{mentorship.name}</h3>
          </div>
          <div className="text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>
          {mentorship.included_services && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 ff-font">{mentorship.included_services}</p>
            </div>
          )}
        </div>
        <CommonButton onClick={addMentorshipToCart} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};

// Tsunami Card for Inline Display
const TsunamiCardInLine = ({
  tsunami,
  userCurrency,
  examCategoryId,
  isSelected,
  onUpdateCart,
}: {
  tsunami: Tsunami;
  userCurrency: string;
  examCategoryId?: string;
  isSelected?: boolean;
  onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tsunami.included_service_price_inr : tsunami.included_service_price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const addTsunamiToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) {
        ErrorToast("Category ID is missing");
        return;
      }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddTsunamiToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) {
          ErrorToast("Unable to identify user. Please log in or refresh the page.");
          return;
        }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        if (res.data.alreadyInCart) {
          InfoToast("This program is already in your cart");
        } else {
          SuccessToast("Program added to cart successfully!");
        }
        await onUpdateCart();
      }
    } catch (error: any) {
      console.error("Error adding tsunami to cart:", error);
      if (error.response?.status === 409) {
        InfoToast("This program is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add program to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[280px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-bold ff-font-bold capitalize">{tsunami.name}</h3>
          </div>
          <div className="text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>
          {tsunami.description && (
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 ff-font">{tsunami.description}</p>
            </div>
          )}
        </div>
        <CommonButton onClick={addTsunamiToCart} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14} disabled={isLoading || isSelected}>
          {isLoading ? "Adding..." : (isSelected ? "Selected" : "Enroll Now")}
        </CommonButton>
      </div>
    </div>
  );
};

// USMLE Style Mentorship Button
const MentorshipButton = ({
  mentorship, examCategoryId, cartItems, onUpdateCart,
}: {
  mentorship: EliteMentorship; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const isSelected = cartItems.some(item =>
    item.cart_type === "elite_mentorship" &&
    (item.mentorship_id?._id === mentorship._id || item.mentorship_id === mentorship._id)
  );

  const addMentorshipToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
      if (!mentorship._id) { ErrorToast("Mentorship ID is missing"); return; }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        mentorship_id: mentorship._id,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddEliteMentorshipToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        res.data.alreadyInCart ? InfoToast("This mentorship is already in your cart") : SuccessToast("Mentorship added to cart successfully!");
        await onUpdateCart();
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        InfoToast("This mentorship is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add mentorship to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={addMentorshipToCart}
      disabled={isLoading || isSelected}
      className="flex-shrink-0 px-6 py-2 rounded-lg bg-[#1A1A1A] text-[#F5C800] text-xs font-extrabold border-none cursor-pointer transition-opacity duration-150 hover:opacity-80 disabled:opacity-50"
    >
      {isLoading ? "Adding..." : isSelected ? "Selected" : "Enroll"}
    </button>
  );
};

// USMLE Style Tsunami Bundle Card
const TsunamiBundleCardUSMLE = ({
  tsunami, userCurrency, examCategoryId, cartItems, onUpdateCart,
}: {
  tsunami: Tsunami; userCurrency: string; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const price = userCurrency === "INR" ? tsunami.included_service_price_inr : tsunami.included_service_price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item =>
    item.cart_type === "tsunami" &&
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addTsunamiToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        exam_category_id: examCategoryId,
        bucket_type: true,
      };
      const res = await api.post(`${endPointApi.postAddTsunamiToCart}`, body);
      if (res.data.success) {
        const identifier = userId || tempId;
        if (!identifier) { ErrorToast("Unable to identify user. Please log in or refresh the page."); return; }
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);
        store.dispatch(setCartCount(countRes.data.count));
        res.data.alreadyInCart ? InfoToast("This program is already in your cart") : SuccessToast("Program added to cart successfully!");
        await onUpdateCart();
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        InfoToast("This program is already in your cart");
      } else {
        ErrorToast(error.response?.data?.message || "Failed to add program to cart");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] border-2 border-[#F5C800] rounded-2xl p-8 flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#475569] mb-2">Step 1 + Step 2 Bundle</p>
      <h3 className="text-xl font-black text-[#F5C800] mb-5 ff-font-bold">{tsunami.name || "Mendel Tsunami"}</h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black text-white leading-none ff-font-bold">{currencySymbol}{formatPrice(price ?? 0)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {tsunami.description?.split("\n").filter(Boolean).map((line, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-[#94a3b8] ff-font">
            <span className="text-[#F5C800]">✓</span>
            {line.trim()}
          </div>
        ))}
      </div>
      <button
        onClick={addTsunamiToCart}
        disabled={isLoading || isSelected}
        className="w-full py-3.5 rounded-lg bg-[#F5C800] text-black text-xs font-black border-none cursor-pointer tracking-[0.05em] mt-auto transition-colors duration-150 hover:bg-[#d4a900] disabled:opacity-50"
      >
        {isLoading ? "Adding..." : isSelected ? "Selected" : "GET DUAL MASTERY"}
      </button>
    </div>
  );
};

// Full Match Bundle Card
const FullMatchBundleCard = ({
  mentorships, userCurrency, examCategoryId, cartItems, onUpdateCart,
}: {
  mentorships: EliteMentorship[]; userCurrency: string; examCategoryId?: string; cartItems: any[]; onUpdateCart: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();

  const totalPrice = mentorships.reduce((sum, m) => {
    const price = userCurrency === "INR" ? m.price_inr : m.price_usd;
    return sum + (price ?? 0);
  }, 0);
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  const isSelected = cartItems.some(item =>
    item.cart_type === "full_match" &&
    (item.exam_category_id?._id === examCategoryId || item.exam_category_id === examCategoryId)
  );

  const addFullMatchToCart = async () => {
    try {
      setIsLoading(true);
      if (!examCategoryId) { ErrorToast("Category ID is missing"); return; }
    } catch (error: any) {
      ErrorToast(error.response?.data?.message || "Failed to add program to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 flex flex-col">
      <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#64748b] mb-2">Basic Science to Residency</p>
      <h3 className="text-xl font-black text-[#1A1A1A] uppercase mb-5 ff-font-bold">The Full Match</h3>
      <div className="flex items-baseline gap-3 mb-1">
        <p className="text-4xl font-black text-[#1A1A1A] leading-none ff-font-bold">{currencySymbol}{formatPrice(totalPrice)}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 my-6">
        {mentorships.map((m, index) => (
          <div key={index} className="flex items-center gap-2 text-xs text-[#64748b] ff-font">
            <span className="text-[#F5C800]">✓</span>
            {m.name}
          </div>
        ))}
        <div className="flex items-center gap-2 text-xs text-[#64748b] ff-font"><span className="text-[#F5C800]">✓</span>CCS simulations</div>
        <div className="flex items-center gap-2 text-xs text-[#64748b] ff-font"><span className="text-[#F5C800]">✓</span>Alumnus networking</div>
      </div>
      <button
        onClick={addFullMatchToCart}
        disabled={isLoading || isSelected}
        className="w-full py-3.5 rounded-lg bg-transparent text-[#1A1A1A] text-xs font-black border-2 border-[#1A1A1A] cursor-pointer tracking-[0.05em] mt-auto transition-all duration-150 hover:bg-[#1A1A1A] hover:text-white disabled:opacity-50"
      >
        {isLoading ? "Adding..." : isSelected ? "Selected" : "ENROLL IN THE MATCH"}
      </button>
    </div>
  );
};