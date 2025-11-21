"use client";
import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
} from "react-icons/fi";
import { useParams, useRouter } from "next/navigation";
import { BiShield } from "react-icons/bi";
import { BsPercent, BsTruck } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { toast } from "react-toastify";

interface CartItem {
  id: number;
  image: string;
  title: string;
  basePrice: number;
  quantity: number;
  period: "30" | "60" | "90";
}

const MyCart = () => {
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getPlan}/${id}`)
      if (res.data) {
        setPlan(res?.data?.data)
      } else {
        console.log("DATA FAILED")
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    } finally {
      setLoading(false);
    }
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      title: "Premium Wireless Headphones",
      basePrice: 800,
      quantity: 1,
      period: "30",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      title: "Smart Watch Pro Series",
      basePrice: 1200,
      quantity: 1,
      period: "30",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
      title: "Designer Sunglasses",
      basePrice: 600,
      quantity: 1,
      period: "30",
    },
  ]);
 
  const handleProceedToCheckout = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getPlan}/${id}`);

      if (res.data) {
        setPlan(res.data.data);
        if (res.data.message) {
          toast.success(res.data.message);
        } else {
          toast.success("Plan details fetched successfully!");
        }
        setTimeout(() => {
          router.push(`/checkout/${id}`);
        }, 500);
      } else {
        toast.error("Failed to fetch plan details!");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Server error!");
    } finally {
      setLoading(false);
    }
  };

  const calculateItemPrice = (item: CartItem) => {
    const multiplier = item.period === "30" ? 1 : item.period === "60" ? 2 : 3;
    return item.basePrice * multiplier * item.quantity;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemPrice(item),
    0
  );

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-500">
              {/* {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "} */}
              ready for checkout
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {plan && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 flex gap-5 relative">
                  {/*  Close Button */}
                  <button
                    onClick={() => setPlan(null)} // clears plan from state
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 hover:text-red-600 transition"
                  >
                    <CgClose className="h-5 w-5" />
                  </button>

                  {/* 🖼️ Static Image */}
                  <div className="w-28 h-28 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
                      alt="Plan Image"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 📄 Plan Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {plan?.plan_type || "Plan"}
                        </h3>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        Price: <span className="font-semibold">₹{plan?.plan_pricing}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Duration: <span className="font-semibold">{plan?.plan_day} Days</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="flex flex-col items-center justify-center p-4 border border-gray-200 bg-white rounded-xl hover:border-yellow-400 transition">
                  <BiShield className="h-6 w-6 text-yellow-500 mb-2" />
                  <p className="text-xs font-semibold text-gray-800">
                    Secure Payment
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border border-gray-200 bg-white rounded-xl hover:border-yellow-400 transition">
                  <BsTruck className="h-6 w-6 text-yellow-500 mb-2" />
                  <p className="text-xs font-semibold text-gray-800">
                    Free Delivery
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 border border-gray-200 bg-white rounded-xl hover:border-yellow-400 transition">
                  <BsPercent className="h-6 w-6 text-yellow-500 mb-2" />
                  <p className="text-xs font-semibold text-gray-800">
                    Best Prices
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-4">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-t-2xl flex items-center gap-2">
                    <FaShoppingCart className="text-white text-xl" />
                    <h2 className="text-white font-bold text-xl">
                      Order Summary
                    </h2>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Subtotal */}
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                      <span className="text-base text-gray-600 font-medium">
                        Subtotal
                        {/* ({cartItems.length}{" "}
                        {cartItems.length === 1 ? "item" : "items"}) */}
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        {/* ₹{subtotal.toLocaleString()}a */}
                        ₹{plan?.plan_pricing ? Number(plan.plan_pricing).toLocaleString() : "0"}
                      </span>
                    </div>

                    {/* Total */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                      <p className="text-3xl font-extrabold text-yellow-600">
                        ₹{plan?.plan_pricing ? Number(plan.plan_pricing).toLocaleString() : "0"}
                      </p>
                    </div>

                    {/* Checkout Button */}
                    <button
                      // onClick={() => router.push(`/checkout/${id}`)}
                      onClick={handleProceedToCheckout}

                      className="w-full h-12 flex items-center cursor-pointer justify-center rounded-lg bg-gradient-to-r from-yellow-500 to-amber-400 text-white font-semibold hover:opacity-90 transition"
                    >
                      Proceed to Checkout
                      <FiArrowRight className="ml-2 h-5 w-5" />
                    </button>

                    {/* Continue Shopping */}
                    <button className="w-full h-12 font-semibold border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 transition">
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default MyCart;
