import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import DOMPurify from 'dompurify';
import { formatPrice } from "@/utils/helper";
import CommonButton from "@/comman/Button";

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
      <section className="py-15 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-24 grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
            {/* Image Section */}
            <div className="order-2 flex justify-center md:order-1">
              <div className="relative overflow-hidden rounded-3xl border-4 border-primary shadow-2xl p-2 w-[320px] h-[300px] md:w-[500px] md:h-[500px]">
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
                <h2 className="mb-4 text-4xl font-bold ff-font-bold md:text-5xl">
                  {plans?.who_can_enroll_title}
                </h2>
                {/* <div className="h-1 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400"></div> */}
              </div>

              <div className="space-y-5">
                {/* <div dangerouslySetInnerHTML={{ __html: cleanHtml }} /> */}
                <div
                  className="prose max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:marker:text-[#ffcb04] ff-font"
                  dangerouslySetInnerHTML={{ __html: cleanHtml }}
                />
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">
                Choose Your Plan
              </h2>
              {/* <div className="w-24 h-1 bg-gradient-to-r from-[#ffcb04] to-amber-400 mx-auto rounded-full"></div> */}
            </div>


            {loading ? skeletonPlanCards :
              (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {plans?.choose_plan_list.map((plan, index) => (
                    <div
                      key={index}
                      className={`relative bg-white border-2 rounded-2xl p-6 flex flex-col h-full min-h-[480px] transition-all duration-300 
  ${plan.most_popular
                          ? "border-primary shadow-xl"
                          : "border-[#e5e7eb] cursor-pointer hover:shadow-xl hover:border-[#ffca00]"
                        }
  `}
                    >
                      {/* Optional POPULAR badge for middle plan */}
                      {plan.most_popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="bg-[#ffca00] text-white ff-font-bold px-6 py-2 rounded-full text-xs font-bold shadow-lg">
                            POPULAR
                          </span>
                        </div>
                      )}

                      <div className="flex flex-col justify-between h-full space-y-6 mt-2">
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="inline-block px-4 py-2 bg-white border-primary rounded-full">
                              <span className="text-sm font-bold text-primary ff-font-bold uppercase">
                                {plan.plan_type}
                              </span>
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold ff-font-bold text-center">
                            {plan.plan_day} Days
                          </h3>

                          <div className="space-y-2 text-center">
                            <p className="text-3xl ff-font-bold font-bold text-primary">
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
                                <FaCheckCircle className="text-primary mt-1 flex-shrink-0" />
                                <span className="ff-font">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* <button
                          className="w-full cursor-pointer bg-gradient-to-r from-[#ffcb04] to-amber-400 hover:shadow-lg text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 mt-auto"
                          onClick={() => router.push(`/checkout/${plan._id}`)}
                        >
                          Enroll Now
                        </button> */}
                        <CommonButton onClick={() => router.push(`/checkout/${plan._id}`)} pyClass="py-3" pxClass="px-20" fontWeight={700} fontSize={14}>
                          Enroll Now
                        </CommonButton>
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
