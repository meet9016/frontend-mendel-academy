"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import CommonButton from "@/comman/Button";
import { JSX, useEffect, useState } from "react";
import { copyToClip, formatDate } from "@/utils/helper";

type StripeData = {
  amount: number;
  createdAt: string;
  currency: string;
  email: string;
  full_name: string;
  id: string;
  payment_method: string;
  payment_status: string;
  phone: string;
  plan_id: string;
  transaction_id: string;
};

const nextSteps: { icon: JSX.Element; title: string; subtitle: string }[] = [
  {
    icon: <FiCheckCircle className="w-5 h-5 text-primary" />,
    title: "Confirmation Email",
    subtitle: "Check your inbox for course details",
  },
  {
    icon: <FiCheckCircle className="w-5 h-5 text-primary" />,
    title: "Course Access",
    subtitle: "Available in your account dashboard",
  },
  {
    icon: <FiCheckCircle className="w-5 h-5 text-primary" />,
    title: "Learning Materials",
    subtitle: "Start learning immediately",
  },
];

export default function PaymentSuccess() {
  const router = useRouter();
  const [data, setData] = useState<StripeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        const raw = localStorage.getItem("stripdata");
        if (raw) {
          setData(JSON.parse(raw));
        }
      } catch (err) {
        console.error("Error loading payment data:", err);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure smooth transition from payment page
    setTimeout(loadData, 500);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
      >
        <Banner />
        <Content stripeData={data} />
        <Actions onDone={() => router.push("/")} />
      </motion.div>
    </div>
  );
}

const Banner = () => (
  <div className="bg-yellow-50 border-b border-yellow-200 px-6 py-6 flex items-center gap-4">
    <span className="grid place-items-center w-14 h-14 rounded-full bg-yellow-100 text-primary flex-shrink-0">
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <div>
      <h1 className="text-xl font-bold text-primary">Payment Successful!</h1>
      <p className="text-sm text-gray-700 mt-1">Your course enrollment has been confirmed</p>
    </div>
  </div>
);

const Content = ({ stripeData }: { stripeData: StripeData | null }) => (
  <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
    <OrderDetails data={stripeData} />
    <NextSteps />
  </div>
);

const OrderDetails = ({ data }: { data: StripeData | null }) => {
  if (!data) {
    return (
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h2>
        <p className="text-gray-500 text-sm">No payment information available</p>
      </section>
    );
  }

  const formatAmount = (amount: number, currency: string) => {
    const symbol = currency === 'INR' ? '₹' : '$';
    return `${symbol}${amount.toLocaleString()}`;
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <header className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
        <p className="text-sm text-gray-500 mt-1">Transaction summary</p>
      </header>

      <div className="px-6 py-5 space-y-4">
        {/* Transaction ID */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-gray-500">Transaction ID</span>
          <Chip text={data.transaction_id} onClick={() => copyToClip(data.transaction_id)} />
        </div>

        {/* Amount */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Amount Paid</span>
          <span className="text-lg font-bold text-primary">
            {formatAmount(data.amount, data.currency)}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Payment Date</span>
          <span className="text-sm font-medium text-gray-800">
            {formatDate(data.createdAt)}
          </span>
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Payment Method</span>
          <span className="text-sm font-medium text-gray-800">
            {data.payment_method}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Status</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-400">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-xs font-medium text-gray-700">
              {formatStatus(data.payment_status)}
            </span>
          </span>
        </div>

        {/* Customer Name */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-gray-500">Customer Name</span>
          <span className="text-sm font-medium text-gray-800 text-right">
            {data.full_name}
          </span>
        </div>

        {/* Email */}
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm text-gray-500">Email</span>
          <span className="text-sm font-medium text-gray-800 text-right break-all">
            {data.email}
          </span>
        </div>
      </div>

      <footer className="px-6 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-100">
        <p className="text-xs text-gray-500">
          Receipt has been sent to your email address
        </p>
      </footer>
    </section>
  );
};

const NextSteps = () => (
  <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-1">What's Next?</h2>
    <p className="text-sm text-gray-500 mb-5">Start your learning journey</p>

    <ul className="space-y-4">
      {nextSteps.map((step) => (
        <li key={step.title} className="flex items-start gap-3">
          <span className="mt-0.5 flex-shrink-0">{step.icon}</span>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{step.title}</p>
            <p className="text-sm text-gray-500 mt-0.5">{step.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>

    <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <p className="text-sm text-gray-800 font-medium mb-1">
        🎓 Ready to start learning?
      </p>
      <p className="text-xs text-gray-600">
        Access your course materials in your account dashboard
      </p>
    </div>
  </section>
);

const Actions = ({ onDone }: { onDone: () => void }) => (
  <div className="px-6 pb-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="space-y-4"
    >
      <CommonButton onClick={onDone}>Go to Home</CommonButton>
      <p className="text-center text-xs text-gray-600">
        Need help?{" "}
        <a
          href="mailto:info@mendelacademy.com"
          className="text-primary underline font-semibold hover:text-[#e6b800]"
        >
          Contact our support team
        </a>
      </p>
    </motion.div>
  </div>
);

const Chip = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-50 text-gray-700 border border-yellow-200 hover:bg-yellow-100 transition text-right"
    title="Click to copy"
  >
    <span className="text-xs font-mono">{truncate(text, 20)}</span>
    <FiCopy className="text-gray-500 flex-shrink-0" size={14} />
  </button>
);

const truncate = (s: string, n: number) => (s?.length > n ? `${s?.slice(0, n)}…` : s);  