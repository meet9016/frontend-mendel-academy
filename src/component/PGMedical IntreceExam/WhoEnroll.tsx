import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Skeleton from "react-loading-skeleton";

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
  return (
    <div>
      <section className="py-15 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-24 grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
            {/* Image Section */}
            <div className="order-2 flex justify-center md:order-1">
              <div className="relative">
                {/* <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-yellow-200 to-amber-100 blur-2xl"></div> */}
                <img
                  src={plans?.who_can_enroll_image}
                  // src="https://static.vecteezy.com/system/resources/previews/021/518/002/non_2x/a-woman-doctor-with-a-tablet-and-a-stethoscope-an-image-on-a-blue-background-a-doctor-in-a-medical-uniform-cartoon-style-family-doctor-medical-worker-paramedic-vector.jpg"
                  alt="Medical professional"
                  className="relative h-auto w-[85%] rounded-3xl object-cover border border-[#ffcb04] shadow-2xl md:w-[90%] lg:w-[95%]"
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
                {plans?.who_can_enroll_description}
                {/* <p className="text-lg text-gray-700">
                  Our courses are designed for students who are preparing for
                  the{" "}
                  <span className="font-bold text-yellow-500">
                    USMLE Step 1 exam
                  </span>
                  .
                </p>
                <p className="text-lg text-gray-700">
                  We recommend that students have a basic understanding of the
                  topics covered in the exam and are comfortable with the test
                  format.
                </p>
                <p className="text-lg text-gray-700">
                  If you have any questions about whether our courses are right
                  for you, please feel free to{" "}
                  <a
                    href="#contact"
                    className="font-bold text-yellow-500 hover:underline"
                  >
                    contact us
                  </a>
                  .
                </p> */}
              </div>
            </div>
          </div>

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
                      className={`relative bg-white border-2 rounded-2xl p-6 flex flex-col h-full min-h-[480px] transition-all duration-300 hover:shadow-xl hover:border-[#ffcb04]
        ${index === 1
                          ? "border-[#ffcb04] shadow-xl bg-gradient-to-br from-yellow-50 via-white to-amber-50"
                          : "border-gray-200"
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
                              {plan.plan_pricing}
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
