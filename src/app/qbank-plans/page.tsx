"use client";

import { useRouter } from "next/navigation";
import { BiCheck, BiCrown, BiShield } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FiZap } from "react-icons/fi";

const plans = [
  {
    id: "elite",
    name: "Elite",
    price: "₹2,499",
    duration: "Videos, Question Bank, Test Series",
    features: [
      "6 Months Access",
      "Everything in Pro",
      "Revision and custom test tools",
      "Early access to new features",
    ],
    icon: <BiCrown className="w-6 h-6" />,
    badge: {
      text: "Best Value",
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹1,299",
    duration: "Question Bank, Test Series",
    features: [
      "3 Months Access",
      "Everything in Basic",
      "Advanced performance reports",
      "Subject and system-wise insights",
      "Priority support",
    ],
    icon: <BiShield className="w-6 h-6" />,
    badge: {
      text: "Most Popular",
    },
  },
  {
    id: "basic",
    name: "Basic",
    price: "₹499",
    duration: "Test Series",
    features: [
      "1 Month Access",
      "Access to full QBank",
      "Create unlimited tests",
      "Performance analytics",
    ],
    icon: <FiZap className="w-6 h-6" />,
    badge: null,
  },
];

export default function QBankPlansPage() {
  const router = useRouter();

  const handleSelectPlan = (planId: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mendel_qbank_pro", planId);
    }
    router.push("/test-create");
  };

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

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-2 ${plan.badge ? "ring-offset-2" : ""
                }`}
              style={{ height: "650px" }} // Increased height to accommodate more features
            >
              {plan.badge && (
                <div className="absolute top-0 right-0 z-10">
                  <div className="relative">
                    {/* Main badge - adjusted padding */}
                    <div className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-3 rounded-bl-3xl shadow-lg">
                      {plan.badge.text}
                    </div>
                    {/* Half circle decoration - positioned exactly at corner */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-4 border-primary rounded-full border-t-transparent border-r-transparent"></div>
                  </div>
                </div>
              )}

              {/* Top Accent Bar */}
              <div className="h-2 bg-primary"></div>

              <div className="p-8 flex flex-col h-full">

                {/* Plan Header - Flexible height based on content */}
                <div className="mb-6 flex items-start gap-3 min-h-[96px]">
                  <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-md flex-shrink-0">
                    {plan.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {plan.name}
                    </h2>
                    <p className="text-base text-gray-500 mt-1">
                      {plan.duration}
                    </p>
                  </div>
                </div>

                {/* Price - Flexible height */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                </div>

                {/* Features - Automatically expands without scroll */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
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

                {/* Button - Fixed at bottom */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                >
                  Choose Plan
                  <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
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