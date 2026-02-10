// WhoEnroll.tsx
import React, { useState } from "react";
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

interface WhoEnrollProps {
  data: WhoEnrollData | null;
  loading: boolean;
  examCategoryId?: string; // ✅ NEW: Pass exam category ID from parent
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
  plan_sub_title?: string[];
}

export interface RapidTool {
  _id?: string;
  tool_type?: string;
  price_usd?: number;
  price_inr?: number;
}

export interface WhoEnrollData {
  _id?: string;
  who_can_enroll_title?: string;
  who_can_enroll_description?: string;
  who_can_enroll_image?: string;
  choose_plan_list?: Plan[];
  rapid_learning_tools?: RapidTool[];
  user_currency?: string; // ✅ Backend provides this based on IP
  user_country?: string;
}

const WhoEnroll = ({ data, loading, examCategoryId }: WhoEnrollProps) => {
  const router = useRouter();
  const userId = getAuthId();
  const tempId = userId ? null : getTempId();
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const cleanHtml = DOMPurify.sanitize(data?.who_can_enroll_description || "", {
    USE_PROFILES: { html: true },
  });

  // ✅ Use backend-provided currency (based on IP detection)
  // Fallback to isIndia() only if backend doesn't provide currency
  const backendCurrency = data?.user_currency;
  const fallbackCurrency = isIndia() ? "INR" : "USD";
  const userCurrency = backendCurrency || fallbackCurrency;

  const addToCart = async (plan: Plan) => {
    try {
      setLoadingPlanId(plan._id);

      // ✅ Use exam category ID from parent component
      const categoryId = examCategoryId || data?._id;

      if (!categoryId) {
        toast.error("Category ID is missing");
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
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);

        store.dispatch(setCartCount(countRes.data.count));
        toast.success("Plan added to cart successfully!");
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);

      if (error.response?.status === 409) {
        toast.info("This plan is already in your cart");
      } else {
        toast.error(error.response?.data?.message || "Failed to add plan to cart");
      }
    } finally {
      setLoadingPlanId(null);
    }
  };

          console.log("DEBUG : WhoEnroll : data:", data);

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

        <PricingSection
          plans={data?.choose_plan_list || []}
          loading={loading}
          loadingPlanId={loadingPlanId}
          userCurrency={userCurrency}
          onEnroll={(plan) => addToCart(plan)}
        />

        <RapidToolsSection
          tools={data?.rapid_learning_tools || []}
          loading={loading}
          userCurrency={userCurrency}
        />
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
      <div className="relative overflow-hidden rounded-2xl border-4 border-primary shadow-xl p-2 w-[450px] h-[450px]">
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
      <h2 className="mb-4 text-4xl font-bold ff-font-bold md:text-5xl">
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
}: {
  plans: Plan[];
  loading: boolean;
  loadingPlanId: string | null;
  userCurrency: string;
  onEnroll: (plan: Plan) => void;
}) => (
  <div className="max-w-[1380px] mx-auto">
    <SectionHeading title="Choose Your Plan" />

    {loading ? (
      <PlanSkeleton />
    ) : (
      <div >
        <Sliders
          settings={{
            // dots: true,
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
            />
          ))}
        </Sliders>
      </div>
    )}
  </div >
);

// Section Heading
const SectionHeading = ({ title }: { title: string }) => (
  <div className="text-center mb-8">
    <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">
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
}: {
  plan: Plan;
  userCurrency: string;
  isLoading: boolean;
  onEnroll: () => void;
}) => {
  const price =
    userCurrency === "INR"
      ? plan.plan_pricing_inr
      : plan.plan_pricing_dollar;

  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  return (
    <div
      className={`
    relative bg-white border-2 rounded-2xl 
    m-3 my-8 p-6 
    flex flex-col 
    h-full               // ← important
    min-h-[420px] 
    transition-all duration-300
    ${plan.most_popular
      ? "border-primary shadow-xl"
      : "border-[#e5e7eb] hover:shadow-xl hover:border-[#ffca00]"
    }
  `}
    >
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

          <ul className="space-y-3 mt-8">
            {plan.plan_sub_title?.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                <span className="ff-font">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <CommonButton
          onClick={onEnroll}
          pyClass="py-3"
          pxClass="px-20"
          fontWeight={700}
          fontSize={14}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Enroll Now"}
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

// Rapid Learning Tools Section
const RapidToolsSection = ({
  tools,
  loading,
  userCurrency,
}: {
  tools: RapidTool[];
  loading: boolean;
  userCurrency: string;
}) => (
  <div className="max-w-[1380px] mx-auto mt-16">
    <SectionHeading title="Rapid Learning Tools" />

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
}: {
  tool: RapidTool;
  userCurrency: string;
}) => {
  const price = userCurrency === "INR" ? tool.price_inr : tool.price_usd;
  const currencySymbol = userCurrency === "INR" ? "₹" : "$";

  return (
    <div className="relative bg-white border-2 border-[#e5e7eb] rounded-2xl m-3 my-8 p-6 flex flex-col h-full min-h-[180px] transition-all duration-300 hover:shadow-xl hover:border-[#ffca00]">
      <div className="flex flex-col flex-grow justify-between">
        <div className="space-y-2">
          <div className="text-center">
            <h3 className="text-xl font-bold ff-font-bold capitalize">
              {tool.tool_type}
            </h3>
          </div>

          <div className="text-center">
            <p className="text-3xl ff-font-bold font-bold text-primary">
              {currencySymbol} {formatPrice(price ?? 0)}
            </p>
          </div>
        </div>

        <CommonButton
          onClick={() => console.log("Cart added")}
          pyClass="py-3"
          pxClass="px-20"
          fontWeight={700}
          fontSize={14}
        >
          Enroll Now
        </CommonButton>
      </div>
    </div>
  );
};