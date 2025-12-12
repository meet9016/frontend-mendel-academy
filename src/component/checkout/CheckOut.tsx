"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import {
  FaCreditCard,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { paySchema } from "@/validationSchema/validationSchema";
import { MdOutlinePhone } from "react-icons/md";
import { resetCartCount } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAuthId } from "@/utils/tokenManager";

const StripeCheckoutForm = ({
  full_name,
  phone,
  email,
  plan,
  onSuccess,
  id,
}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const result: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/paymentsuccess",
        receipt_email: email,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setMessage(result.error.message);
      setLoading(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      await api
        .post(`${endPointApi.verifyStripePayment}`, {
          paymentIntentId: result.paymentIntent.id,
          full_name,
          email,
          phone,
          plan_id: id,
          amount: plan.totalAmount,
        })
        .then((res) => {
          localStorage.setItem("stripdata", JSON.stringify(res.data.payment));
        });

      onSuccess();
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h2>

      <div className="border rounded-lg p-4 bg-gray-50 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Plan:</span> {plan?.plan_type}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Price:</span> ${plan?.plan_pricing}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 bg-gray-50 border rounded-xl">
          <PaymentElement />
        </div>

        {message && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all 
            ${
              loading || !stripe
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-md"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              Processing…
            </div>
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </div>
  );
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface BillingInformation {
  fullName: string;
  email: string;
  phone: string;
  selectedPayment: string;
}

interface PlanItem {
  temp_id: string;
  product_id: string;
  category_name: string;
  quantity: number;
  price: number;
  duration: string;
  plan_image?: string;
}

export type FormErrors = Partial<Record<keyof BillingInformation, string>>;
const CheckOut = () => {
  const userId = getAuthId();

  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [plan, setPlan] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState<BillingInformation>({
    fullName: "",
    email: "",
    phone: "",
    selectedPayment: "Razorpay",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  // const fetchPlan = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await api.get(`${endPointApi.getPlan}/${id}`);
  //     setPlan(res?.data?.data);
  //   } catch (err) {
  //     console.error("Fetch plan error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //tempid vise
  const fetchAddToCart = async () => {
    try {
      setLoading(true);
      const res = await api.get(`${endPointApi.getcheckoutTempId}/${id}`);
      setPlan(res?.data);
    } catch (err) {
      console.error("Fetch plan error:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const { error } = paySchema.validate(billing, { abortEarly: false });
    if (!error) {
      setErrors({});
      return true;
    }
    const newErrors: FormErrors = {};
    error.details.forEach((detail) => {
      const key = detail.path[0] as keyof BillingInformation;
      newErrors[key] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  useEffect(() => {
    // fetchPlan();
    fetchAddToCart();
  }, []);

  const handlePaymentSelect = (method: string) =>
    setBilling((prev) => ({ ...prev, selectedPayment: method }));
  const handleChange = (field: keyof BillingInformation, value: string) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // =============================
  // Razorpay Handler
  // =============================
  const handleRazorpayPayment = async () => {
    if (!userId) {
      const isValid = validateForm();
      if (!isValid) return;
    }
    try {
      const res = await api.post(`${endPointApi.postPaymentCreate}`, {
        ...(userId ? { user_id: id } : { guest_id: id }),
        full_name: billing.fullName,
        email: billing.email,
        phone: billing.phone,
        amount: plan?.totalAmount,
        payment_method: "Razorpay",
      });

      const data = res.data;
      const scriptLoaded = await new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) return resolve(true);
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
      if (!scriptLoaded) return alert("Failed to load Razorpay.");

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Mendel Academy",
        description: `Payment for Plan ${id}`,
        order_id: data.order_id,
        handler: async (response: any) => {
          const verifyBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: data.amount / 100,
            plan_id: id,
            // user_id: id,
            ...(userId ? { user_id: id } : { guest_id: id }),
            status: "captured",
          };
          const verifyRes = await api.post(
            `${endPointApi.postPaymentVerify}`,
            verifyBody
          );

          if (verifyRes.data.success) {
            localStorage.setItem(
              "stripdata",
              JSON.stringify(verifyRes.data.payment)
            );
            router.push("/paymentsuccess");
            dispatch(resetCartCount());
          }
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
    }
  };

  // =============================
  // 💰 Stripe Handler
  // =============================
  const handleStripePayment = async () => {
    const isValid = validateForm();
    if (!isValid) return;
    try {
      const res = await api.post(`${endPointApi.createStripePaymentIntent}`, {
        amount: plan?.totalAmount,
        email: billing.email,
        plan_id: id,
      });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error("Stripe Payment Intent Error:", err);
    }
  };

  const appearance = { theme: "stripe" };
  const stripeOptions: any = { clientSecret, appearance };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1380px] mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
        {/* Left: Billing Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
              Billing Information
            </h2>
            <div className="p-6 space-y-4">
              {/* Full Name */}
              <div className="mb-1">
                <label className="block text-sm ff-font mb-2">
                  Full Name *
                </label>

                <div className="relative h-[52px] flex items-center">
                  <FaUser className="absolute left-4 text-primary pointer-events-none" />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffca00] outline-none transition"
                    value={billing.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm ml-2">{errors.fullName}</p>
                )}
              </div>

              {/* Email & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="mb-1">
                  <label className="block text-sm ff-font mb-2">
                    Email Address *
                  </label>
                  <div className="relative h-[52px] flex items-center">
                    <FaEnvelope className="absolute left-4 text-primary pointer-events-none" />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffca00] outline-none transition"
                      value={billing.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm ml-2">{errors.email}</p>
                  )}
                </div>

                <div className="mb-1">
                  <label className="block text-sm ff-font mb-2">
                    Phone Number *
                  </label>
                  <div className="relative h-[52px] flex items-center">
                    <MdOutlinePhone className="absolute left-4 text-primary pointer-events-none" />
                    <input
                      type="tel"
                      placeholder="+91 1234567890"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#ffca00] outline-none transition"
                      value={billing.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm ml-2">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div
                onClick={() => handlePaymentSelect("Razorpay")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center ${
                  billing.selectedPayment === "Razorpay"
                    ? "border-primary bg-yellow-50"
                    : "border-gray-200"
                }`}
              >
                <FaCreditCard className="text-primary ff-font text-2xl mx-auto mb-2" />
                Razorpay
              </div>

              <div
                onClick={() => handlePaymentSelect("Stripe")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center ${
                  billing.selectedPayment === "Stripe"
                    ? "border-primary bg-yellow-50"
                    : "border-gray-200"
                }`}
              >
                <FaWallet className="text-primary ff-font text-2xl mx-auto mb-2" />
                Stripe
              </div>
            </div>

            {/* Stripe Payment UI */}
            {billing.selectedPayment === "Stripe" && clientSecret && (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <StripeCheckoutForm
                  full_name={billing.fullName}
                  phone={billing.phone}
                  email={billing.email}
                  plan={plan}
                  onSuccess={() => router.push("/paymentsuccess")}
                  id={id}
                />
              </Elements>
            )}
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
            Order Summary
          </h2>
          {plan &&
            plan?.data?.length > 0 &&
            plan?.data?.map((item: PlanItem, index: number) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex gap-3 items-center mb-4"
              >
                <img
                  src={item.plan_image || "/default.jpg"}
                  className="w-16 h-16 rounded-md object-cover"
                  alt="plan"
                />

                <div>
                  <p className="font-semibold">{item.category_name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-bold text-gray-800">₹{item.price}</p>
                </div>
              </div>
            ))}
          <hr className="my-4" />
          {plan?.totalAmount && (
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total:</span>
              <span className="text-xl font-bold text-gray-900">
                ₹{plan?.totalAmount}
              </span>
            </div>
          )}
          <button
            onClick={
              billing.selectedPayment === "Stripe"
                ? handleStripePayment
                : handleRazorpayPayment
            }
            className="w-full bg-[#ffca00]  font-semibold py-3 rounded-xl cursor-pointer  transition-all duration-300 mt-2 shadow-md"
          >
            {billing.selectedPayment === "Stripe"
              ? "Proceed with Stripe"
              : "Pay with Razorpay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
