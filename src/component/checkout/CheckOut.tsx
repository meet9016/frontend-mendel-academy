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
  FaUser,
  FaWallet,
} from "react-icons/fa";
import { paySchema } from "@/validationSchema/validationSchema";
import { MdOutlinePhone } from "react-icons/md";
import { resetCartCount } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId } from "@/utils/helper";

const formatDuration = (item: any) => {
  if (item.cart_type === 'exam_plan') {
    let months = item.plan_details?.plan_month || item.duration;

    if (typeof months === 'string') {
      months = months.replace(/[^\d]/g, '');
    }

    const monthValue = parseInt(months) || 0;

    if (monthValue === 0 && item.exam_category_id?.choose_plan_list) {
      const matchingPlan = item.exam_category_id.choose_plan_list.find(
        (p: any) => p._id === item.plan_id
      );

      if (matchingPlan) {
        const planDuration = parseInt(matchingPlan.plan_month || matchingPlan.plan_day) || 0;
        if (planDuration > 0) {
          return `${planDuration} Month${planDuration !== 1 ? 's' : ''}`;
        }
      }
    }

    if (monthValue === 0) {
      return 'Not specified';
    }

    return `${monthValue} Month${monthValue !== 1 ? 's' : ''}`;
  }

  const duration = item.duration;
  const durationValue = parseInt(duration) || 0;

  if (durationValue === 0) {
    return 'Not specified';
  }

  return `${durationValue} Month${durationValue !== 1 ? 's' : ''}`;
};

// Payment Processing Loader Component with blur background
const PaymentLoader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-gray-900/30">
    <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center shadow-2xl">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Processing Payment</h3>
      <p className="text-gray-600 text-sm">Please wait while we confirm your payment...</p>
      <p className="text-gray-500 text-xs mt-4">Do not close or refresh this page</p>
    </div>
  </div>
);

const StripeCheckoutForm = ({
  full_name,
  phone,
  email,
  plan,
  onSuccess,
  id,
  currency,
}: any) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/paymentsuccess",
        receipt_email: email,
      },
      redirect: "if_required",
    }).then(async (result: any) => {
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
            currency: currency,
            temp_id: id,
            user_id: getAuthId() || null,
          })
          .then((res) => {
            localStorage.setItem("stripdata", JSON.stringify(res.data.payment));
          })
          .catch((err) => {
            setMessage("Payment succeeded but verification failed. Please contact support.");
          });

        onSuccess();
      }

      setLoading(false);
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h2>

      <div className="border rounded-lg p-4 bg-gray-50 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total Amount:</span> {currency === 'INR' ? '₹' : '$'}{plan?.totalAmount}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Currency: {currency}
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 border rounded-xl">
          <PaymentElement />
        </div>

        {message && (
          <p className="text-red-600 text-sm bg-red-50 p-2 rounded-md border border-red-200">
            {message}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={!stripe || loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition-all 
            ${loading || !stripe
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-[#e6b800] shadow-md"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
              Processing…
            </div>
          ) : (
            `Pay ${currency === 'INR' ? '₹' : '$'}${plan?.totalAmount}`
          )}
        </button>
      </div>
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

export type FormErrors = Partial<Record<keyof BillingInformation, string>>;

// Enhanced Phone validation function
const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim() === '') {
    return 'Phone number is required';
  }

  // Allow only digits, spaces, +, -, (, )
  const validCharsRegex = /^[\d\s()+-]+$/;
  if (!validCharsRegex.test(phone)) {
    return 'Phone number contains invalid characters';
  }

  // Remove non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');

  // E.164 standard: 10–15 digits
  if (digitsOnly.length < 10) {
    return 'Phone number must be at least 10 digits';
  }

  if (digitsOnly.length > 15) {
    return 'Phone number must not exceed 15 digits';
  }

  // Optional: must not start with 0 (common rule)
  if (/^0+$/.test(digitsOnly)) {
    return 'Invalid phone number';
  }

  return null;
};


const CheckOut = () => {
  const userId = getAuthId();
  const { id: paramId } = useParams();
  const actualId = userId || (paramId && paramId !== 'null' && paramId !== 'undefined' ? paramId : getTempId());

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [plan, setPlan] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [billing, setBilling] = useState<BillingInformation>({
    fullName: "",
    email: "",
    phone: "",
    selectedPayment: "Razorpay",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const res = await api.get(`${endPointApi.getProfile}/${userId}`);

      if (res.data) {
        setUserProfile(res.data.data || res.data.user);

        setBilling({
          fullName: res.data.user?.first_name || res.data.user?.first_name || "",
          email: res.data.data?.email || res.data.user?.email || "",
          phone: res.data.data?.phone || res.data.user?.phone || "",
          selectedPayment: "Razorpay",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchAddToCart = async () => {
    try {
      if (!actualId || actualId === 'null' || actualId === 'undefined') {
        router.push('/');
        return;
      }

      setLoading(true);
      const res = await api.get(`${endPointApi.getcheckoutTempId}/${actualId}`);
      setPlan(res?.data);
    } catch (err) {
      console.error("Fetch checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate full name
    if (!billing.fullName || billing.fullName.trim() === '') {
      newErrors.fullName = 'Full name is required';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!billing.email || billing.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(billing.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    const phoneError = validatePhone(billing.phone);
    if (phoneError) {
      newErrors.phone = phoneError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
    fetchAddToCart();
  }, [actualId]);

  const handlePaymentSelect = (method: string) =>
    setBilling((prev) => ({ ...prev, selectedPayment: method }));

  const handleChange = (field: keyof BillingInformation, value: string) => {
    // For phone field, restrict input to numbers and common phone characters
    if (field === 'phone') {
      // Allow only numbers, +, -, (, ), and spaces
      const sanitized = value.replace(/[^\d\+\-\(\)\s]/g, '');
      // Limit to 15 digits (excluding formatting characters)
      const digitsOnly = sanitized.replace(/\D/g, '');
      if (digitsOnly.length <= 15) {
        setBilling((prev) => ({ ...prev, [field]: sanitized }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    } else {
      setBilling((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleRazorpayPayment = async () => {

    if (!userId) {
      const isValid = validateForm();
      if (!isValid) return;
    } else {
      // Still validate phone for logged-in users
      const phoneError = validatePhone(billing.phone);
      if (phoneError) {
        setErrors({ phone: phoneError });
        return;
      }
    }

    try {
      setPaymentProcessing(true);

      const res = await api.post(`${endPointApi.postPaymentCreate}`, {
        ...(userId ? { user_id: userId } : { guest_id: actualId }),
        full_name: billing.fullName,
        email: billing.email,
        phone: billing.phone,
        amount: plan?.totalAmount,
        currency: plan?.currency,
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

      if (!scriptLoaded) {
        setPaymentProcessing(false);
        return alert("Failed to load Razorpay.");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Mendel Academy",
        description: `Payment for ${userId ? "User" : "Guest"} ${actualId}`,
        order_id: data.order_id,
        handler: async (response: any) => {
          const verifyBody = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            amount: data.amount / 100,
            plan_id: plan.data[0].livecourse_id._id,
            ...(userId ? { user_id: userId } : { guest_id: actualId }),
            status: "captured",
            currency: plan?.currency,
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
            dispatch(resetCartCount());

            // Keep loader visible during redirect
            setTimeout(() => {
              router.push("/paymentsuccess");
            }, 1000);
          } else {
            setPaymentProcessing(false);
          }
        },
        prefill: {
          name: billing.fullName,
          email: billing.email,
          contact: billing.phone,
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Razorpay Error:", error);
      setPaymentProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    const isValid = validateForm();
    if (!isValid) return;

    try {
      setPaymentProcessing(true);

      const res = await api.post(`${endPointApi.createStripePaymentIntent}`, {
        amount: plan?.totalAmount,
        email: billing.email,
        plan_id: actualId,
        currency: plan?.currency,
        ...(userId ? { user_id: userId } : { guest_id: actualId }),
      });

      setClientSecret(res.data.clientSecret);
      setPaymentProcessing(false);
    } catch (err) {
      console.error("Stripe Payment Intent Error:", err);
      setPaymentProcessing(false);
    }
  };

  const appearance = { theme: "stripe" };
  const stripeOptions: any = { clientSecret, appearance };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!actualId || actualId === 'null') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">No checkout session found</p>
          <button
            onClick={() => router.push('/')}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-[#e6b800]"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {paymentProcessing && <PaymentLoader />}

      <div className="max-w-[1380px] mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
              Billing Information
            </h2>
            <div className="p-6 space-y-4">
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
                    disabled={!!userId}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm ml-2 mt-1">{errors.fullName}</p>
                )}
              </div>

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
                      disabled={!!userId}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm ml-2 mt-1">{errors.email}</p>
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
                      maxLength={18}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm ml-2 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div
                onClick={() => handlePaymentSelect("Razorpay")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center ${billing.selectedPayment === "Razorpay"
                  ? "border-primary bg-yellow-50"
                  : "border-gray-200"
                  }`}
              >
                <FaCreditCard className="text-primary ff-font text-2xl mx-auto mb-2" />
                Razorpay
              </div>

              <div
                onClick={() => handlePaymentSelect("Stripe")}
                className={`cursor-pointer border-2 rounded-xl p-4 text-center ${billing.selectedPayment === "Stripe"
                  ? "border-primary bg-yellow-50"
                  : "border-gray-200"
                  }`}
              >
                <FaWallet className="text-primary ff-font text-2xl mx-auto mb-2" />
                Stripe
              </div>
            </div>

            {billing.selectedPayment === "Stripe" && clientSecret && (
              <Elements stripe={stripePromise} options={stripeOptions}>
                <StripeCheckoutForm
                  full_name={billing.fullName}
                  phone={billing.phone}
                  email={billing.email}
                  plan={plan}
                  currency={plan?.currency}
                  onSuccess={() => {
                    setPaymentProcessing(true);
                    dispatch(resetCartCount());
                    setTimeout(() => {
                      router.push("/paymentsuccess");
                    }, 1000);
                  }}
                  id={actualId}
                />
              </Elements>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold ff-font-bold text-primary mb-4">
            Order Summary
          </h2>
          {plan &&
            plan?.data?.length > 0 &&
            plan?.data?.map((item: any, index: number) => (
              <div
                key={index}
                className="border rounded-lg p-3 flex gap-3 items-center mb-4"
              >
                <img
                  src={item.product_id?.image || "/default.jpg"}
                  className="w-16 h-16 rounded-md object-cover"
                  alt="plan"
                />

                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {item.product_id?.title || item.category_name}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Duration: {formatDuration(item)}
                  </p>

                  {item.selected_options && item.selected_options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.selected_options.map((opt: string) => (
                        <span
                          key={opt}
                          className="text-[10px] bg-yellow-50 border border-yellow-400 px-2 py-0.5 rounded-full"
                        >
                          {opt === 'record-book' ? 'Record Book' : opt === 'video' ? 'Video' : 'Writing Book'}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="font-bold text-sm text-gray-800">
                      {item.currency === 'INR' ? '₹' : '$'}
                      {item.total_price?.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          <hr className="my-4" />

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Subtotal:</span>
            <span className="text-sm font-semibold text-gray-800">
              {plan?.currency === 'INR' ? '₹' : '$'}
              {plan?.totalAmount?.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Tax & Fees:</span>
            <span className="text-sm font-semibold text-gray-800">
              {plan?.currency === 'INR' ? '₹' : '$'}0
            </span>
          </div>

          <hr className="my-4" />

          {plan?.totalAmount && (
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-primary">
                {plan?.currency === 'INR' ? '₹' : '$'}
                {plan?.totalAmount?.toLocaleString()}
              </span>
            </div>
          )}

          <button
            onClick={
              billing.selectedPayment === "Stripe"
                ? handleStripePayment
                : handleRazorpayPayment
            }
            disabled={paymentProcessing}
            className={`w-full font-semibold py-3 rounded-xl cursor-pointer transition-all duration-300 mt-2 shadow-md ${paymentProcessing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#ffca00] hover:bg-[#e6b800]'
              }`}
          >
            {paymentProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                Processing...
              </div>
            ) : (
              billing.selectedPayment === "Stripe"
                ? `Proceed with Stripe (${plan?.currency === 'INR' ? '₹' : '$'}${plan?.totalAmount})`
                : `Pay with Razorpay (${plan?.currency === 'INR' ? '₹' : '$'}${plan?.totalAmount})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;