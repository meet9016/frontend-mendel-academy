"use client";

import { Plan } from "@/component/PGMedical IntreceExam/sections/WhoEnroll";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import { getTempId } from "@/utils/helper";
import { getAuthId } from "@/utils/tokenManager";
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";

export default function QBankPlansPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchasedPlanId, setPurchasedPlanId] = useState<string | null>(null);
  const [pendingCartPlanId, setPendingCartPlanId] = useState<string | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
  const router = useRouter();

  const handleSelectPlan = async (planId: string) => {
    try {
      setAddingToCartId(planId);
      const userId = getAuthId();
      const tempId = userId ? null : getTempId();

      const body = {
        ...(userId ? { user_id: userId } : { temp_id: tempId }),
        qbank_plan_id: planId,
        bucket_type: true
      };

      const res = await api.post(`${endPointApi.postAddQbankPlanToCart}`, body);

      if (res.data.success) {
        const identifier = userId || tempId;
        const countRes = await api.get(`${endPointApi.cartCount}/${identifier}`);

        store.dispatch(setCartCount(countRes.data.count));

        if (res.data.alreadyInCart) {
          toast.info("Plan is already in cart");
        } else {
          toast.success("Plan added to cart successfully!");
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("mendel_qbank_pro", planId);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      const { data }: any = await api.get<{
        success: boolean;
        data: Plan[];
        total: number;
      }>(`${endPointApi.getActivePlans}`);
      if (data.success) {
        setPlans(data.data)
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserProfileStatus = useCallback(async () => {
    try {
      const userId = getAuthId();
      if (!userId) return;
      const response = await api.get(`${endPointApi.getProfile}/${userId}`);
      if (response?.data) {
        // Check if a plan is already purchased (bucket_type: false)
        const activePlan = response.data.cart?.payBill?.find((p: any) => p.cart_type === "qbank_plan");
        if (activePlan) {
          setPurchasedPlanId(activePlan.qbank_plan_id?._id || activePlan.qbank_plan_id);
        }

        // Check if an item is already inside the cart (bucket_type: true)
        const pendingPlanInCart = response.data.cart?.addToCartItem?.find((p: any) => p.cart_type === "qbank_plan");
        if (pendingPlanInCart) {
          setPendingCartPlanId(pendingPlanInCart.qbank_plan_id?._id || pendingPlanInCart.qbank_plan_id);
        }
      }
    } catch (error) {
      console.error('Error fetching profile status:', error);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
    fetchUserProfileStatus();
  }, [fetchPlans, fetchUserProfileStatus]);

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="relative bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden" style={{ height: "650px" }}>
      <div className="p-8 flex flex-col h-full">
        {/* Plan Header Skeleton */}
        <div className="mb-6 flex items-center justify-center min-h-[96px] text-center">
          <div className="w-full">
            <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mx-auto"></div>
            <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse mt-3 mx-auto"></div>
          </div>
        </div>

        {/* Price Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Features Skeleton */}
        <div className="flex-1 mb-8">
          <ul className="space-y-4">
            {/* Duration feature */}
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
              <div className="h-5 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
            </li>
            {/* 5 feature placeholders */}
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-gray-200 animate-pulse flex-shrink-0"></div>
                <div className="h-5 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
              </li>
            ))}
          </ul>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-14 bg-gray-200 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Unlock Pro QBank
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a plan to upgrade from demo mode and get full access to all
            questions and features.
          </p>
        </div>

        {/* Pricing Cards with Skeleton Loader */}
        <div className="grid gap-8 md:grid-cols-3">
          {loading ? (
            // Show 3 skeleton cards while loading
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            // Show actual plans when loaded
            plans.map((plan: any) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-2 ${plan.badge ? "ring-offset-2" : ""
                  }`}
                style={{ height: "650px" }}
              >
                {(plan.is_popular || plan.is_best_value) && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="relative">
                      <div className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-bl-3xl shadow-lg">
                        {plan.is_popular ? "Most Popular" : "Best Value"}
                      </div>
                      <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-4 border-primary rounded-full border-t-transparent border-r-transparent"></div>
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col h-full">

                  {/* Plan Header */}
                  <div className="mb-6 flex items-center justify-center min-h-[96px] text-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h2>
                      <p className="text-base text-gray-500 mt-1">
                        {plan.duration}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-gray-900">
                      {`₹ ${plan.price_inr}` || `$ ${plan.price_usd}`}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex-1 mb-8">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <div className="mt-0.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <BiCheck className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-base text-gray-700">
                          {plan.duration_months} Months Access
                        </span>
                      </li>
                      {plan.features.map((feature: any) => (
                        <li key={feature} className="flex items-start gap-3">
                          <div className="mt-0.5 h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                            <BiCheck className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <span className="text-base text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (purchasedPlanId) {
                        toast.warning("You already have an active plan!");
                        return;
                      }
                      if (pendingCartPlanId && pendingCartPlanId !== plan.id) {
                        toast.warning("You already have another plan in your cart!");
                        return;
                      }
                      handleSelectPlan(plan.id)
                    }}
                    disabled={purchasedPlanId ? true :addingToCartId === plan.id || purchasedPlanId === plan.id || pendingCartPlanId === plan.id}
                    className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {purchasedPlanId === plan.id ? "Active" : pendingCartPlanId === plan.id ? "Already In Cart" : addingToCartId === plan.id ? "Adding..." : "Add to Cart"}
                    {addingToCartId !== plan.id && purchasedPlanId !== plan.id && pendingCartPlanId !== plan.id && <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Demo Option */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => router.push("/test-create")}
            className="text-base text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center gap-2 group font-medium"
          >
            Continue in demo mode
            <BsArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}