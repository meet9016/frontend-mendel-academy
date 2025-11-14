import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import DOMPurify from 'dompurify';
import { formatPrice } from "@/utils/helper";

interface Plan {
  _id: string;
  id: number;
  name: string;
  price: number;
  most_popular?: boolean;
  plan_type?: string;
  plan_day?: number;
  plan_pricing?: string;
  plan_sub_title?: any[];
}

interface WhoEnrollProps {
  plans: Plan[];
  loading: boolean
}

const WhoEnroll = ({ plans, loading }: WhoEnrollProps) => {
  const router = useRouter();
  const cleanHtml = DOMPurify.sanitize(plans?.who_can_enroll_description || '', {
    USE_PROFILES: { html: true },
  });

  return (
    <div>
      <section className="py-15 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          {loading ? skeletonImageTextSection : (
            <div className="mx-auto mb-24 grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
              {/* Image Section */}
              <div className="order-2 flex justify-center md:order-1">
                <div className="relative overflow-hidden rounded-3xl border-4 border-[#ffcb04] shadow-2xl p-2 w-[320px] h-[300px] md:w-[500px] md:h-[500px]">
                  <img
                    src={
                      plans?.who_can_enroll_image
                        ? plans.who_can_enroll_image
                        : "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
                    }
                    alt="Medical professional"
                    className="w-full h-full rounded-[1.5rem] object-cover shadow-2xl"
                  />
                </div>
              </div>
              {/* Text Section */}
              <div className="order-1 space-y-8 md:order-2">
                <div>
                  <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                    {plans?.who_can_enroll_title}
                  </h2>
                  <div className="h-1 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400"></div>
                </div>

                <div className="space-y-5">
                  {/* <div dangerouslySetInnerHTML={{ __html: cleanHtml }} /> */}
                  <div
                    className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:marker:text-[#ffcb04] text-gray-800"
                    dangerouslySetInnerHTML={{ __html: cleanHtml }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Pricing Cards */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Choose Your Plan
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#ffcb04] to-amber-400 mx-auto rounded-full"></div>
            </div>

            {loading ? skeletonPlanCards :
              (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {plans?.choose_plan_list.map((plan, index) => (
                    <div
                      key={index}
                      className={`relative bg-white border-2 rounded-2xl p-6 flex flex-col h-full min-h-[480px] transition-all duration-300 
  ${plan.most_popular
                          ? "border-[#ffcb04] shadow-xl bg-gradient-to-br from-yellow-50 via-white to-amber-50"
                          : "border-[#e5e7eb] hover:shadow-xl hover:border-[#ffcb04]"
                        }
  `}
                    >
                      {/* Optional POPULAR badge for middle plan */}
                      {plan.most_popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-gradient-to-r from-[#ffcb04] to-amber-400 text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg">
                            POPULAR
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col justify-between h-full space-y-6 mt-2">
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="inline-block px-4 py-2 bg-yellow-50 rounded-full">
                              <span className="text-sm font-bold text-[#ffcb04] uppercase">
                                {plan.plan_type}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-gray-900 text-center">
                            {plan.plan_day} Days
                          </h3>

                          <div className="space-y-2 text-center">
                            <p className="text-4xl font-bold text-[#ffcb04]">
                              INR {formatPrice(plan.plan_pricing)}
                            </p>
                            {/* <p className="text-xs text-gray-500">(Plus 18% GST)</p> */}
                          </div>

                          <ul className="space-y-3 mt-8">
                            {plan.plan_sub_title?.map((feature, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                              >
                                <FaCheckCircle className="text-[#ffcb04] mt-1 flex-shrink-0" />
                                <span className="text-gray-900">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <button
                          className="w-full cursor-pointer bg-gradient-to-r from-[#ffcb04] to-amber-400 hover:shadow-lg text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 mt-auto"
                          onClick={() => router.push(`/checkout/${plan._id}`)}
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          </div>
        </div>
      </section>
    </div>
  );
};

// Skeleton for Image + Text Section
const skeletonImageTextSection = (
  <div className="mx-auto mb-24 grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
    {/* Image Skeleton - Left Side */}
    <div className="relative order-1 md:order-1 flex justify-center">
      <div className="relative overflow-hidden rounded-8xl shadow-2xl p-3 w-[500px] h-[500px]">
        <Skeleton height="100%" />
      </div>

    </div>

    {/* Text Skeleton - Right Side */}
    <div className="order-2 md:order-2 space-y-8 w-full">
      <Skeleton height={40} width={300} borderRadius={10} className="mb-4" />

      <div className="space-y-3">
        <div>
          <Skeleton height={200} width="100%" borderRadius={20} />
        </div>
      </div>
    </div>
  </div>
);

const skeletonPlanCards = (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <Skeleton
        key={i}
        height={480}
        borderRadius={16}
        className="rounded-2xl"
      />
    ))}
  </div>

);

export default WhoEnroll;
