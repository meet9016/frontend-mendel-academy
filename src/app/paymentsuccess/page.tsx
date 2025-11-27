"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiCopy, FiCheckCircle } from "react-icons/fi";
import CommonButton from "@/comman/Button";
import { JSX, useEffect, useState } from "react";
import { copyToClip, formatCurrency, formatDate } from "@/utils/helper";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/* Copy /  Next steps  (unchanged)                                    */
/* ------------------------------------------------------------------ */
const nextSteps: { icon: JSX.Element; title: string; subtitle: string }[] = [
  {
    icon: <FiCheckCircle className="w-5 h-5 text-amber-500" />,
    title: "Confirmation Email",
    subtitle: "Sent to your email address",
  },
  {
    icon: <FiCheckCircle className="w-5 h-5 text-amber-500" />,
    title: "Event Tickets",
    subtitle: "Available in your account",
  },
  {
    icon: <FiCheckCircle className="w-5 h-5 text-amber-500" />,
    title: "Event Reminder",
    subtitle: "You'll receive reminders before the event",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function PaymentSuccess() {
  const router = useRouter();
  const [data, setData] = useState<StripeData | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("stripdata");
      if (raw) setData(JSON.parse(raw));
    } catch {
      /* ignore malformed json */
    }
  }, []);

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

/* ------------------------------------------------------------------ */
/* Banner                                                             */
/* ------------------------------------------------------------------ */
const Banner = () => (
  <div className="bg-green-50 border-b border-green-200 px-6 py-5 flex items-center gap-4">
    <span className="grid place-items-center w-12 h-12 rounded-full bg-green-100 text-green-600">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <div>
      <h1 className="text-lg font-semibold text-green-700">Payment Successful!</h1>
      <p className="text-sm text-green-600">Your event registration has been confirmed.</p>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Content grid                                                       */
/* ------------------------------------------------------------------ */
const Content = ({ stripeData }: { stripeData: StripeData | null }) => (
  <div className="p-6 grid md:grid-cols-2 gap-8">
    <OrderDetails data={stripeData} />
    <NextSteps />
  </div>
);

/* ------------------------------------------------------------------ */
/* Order details  (table layout)                                      */
/* ------------------------------------------------------------------ */
const OrderDetails = ({ data }: { data: StripeData | null }) => {
  if (!data) return <SkeletonRows />;

  const rows: { label: string; value: string; chip?: boolean }[] = [
    { label: "Order ID", value: data.id, chip: true },
    { label: "Transaction ID", value: data.transaction_id, chip: true },
    { label: "Amount Paid", value: formatCurrency(data.amount, data.currency) },
    { label: "Date", value: formatDate(data.createdAt) },
    { label: "Name", value: data.full_name },
    { label: "Email", value: data.email, chip: true },
    { label: "Phone", value: data.phone },
    { label: "Payment Method", value: data.payment_method },
    { label: "Status", value: data.payment_status },
    { label: "Plan ID", value: data.plan_id, chip: true },
  ];

  return (
    <div>
      <h2 className="font-semibold text-gray-800 mb-4">Order Details</h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b last:border-b-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-600 align-top">{r.label}</td>
                <td className="px-4 py-3 text-right">
                  {r.chip ? (
                    <Chip text={r.value} onClick={() => copyToClip(r.value)} />
                  ) : (
                    r.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Next steps list                                                    */
/* ------------------------------------------------------------------ */
const NextSteps = () => (
  <div>
    <h2 className="font-semibold text-gray-800 mb-4">What's Next?</h2>
    <ul className="space-y-3">
      {nextSteps.map((s) => (
        <li key={s.title} className="flex items-start gap-3">
          {s.icon}
          <div>
            <p className="font-medium text-gray-800">{s.title}</p>
            <p className="text-xs text-gray-500">{s.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

/* ------------------------------------------------------------------ */
/* Actions footer                                                     */
/* ------------------------------------------------------------------ */
const Actions = ({ onDone }: { onDone: () => void }) => (
  <div className="px-6 pb-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="space-y-4"
    >
      <CommonButton onClick={onDone}>Done</CommonButton>
      <p className="text-center text-xs text-blue-700">
        Need help?{" "}
        <a href="mailto:info@mendelacademy.com" className="underline font-semibold">
          Contact our support team
        </a>{" "}
        or check your email for event details.
      </p>
    </motion.div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Skeleton while localStorage is read                                */
/* ------------------------------------------------------------------ */
const SkeletonRows = () => (
  <div>
    <h2 className="font-semibold text-gray-800 mb-4">Order Details</h2>
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <tbody>
          {Array.from({ length: 10 }).map((_, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="h-4 bg-gray-200 rounded w-32 ml-auto animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/* Re-usable chip + copy                                              */
/* ------------------------------------------------------------------ */
const Chip = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 transition"
  >
    <span className="text-xs font-medium">{truncate(text, 22)}</span>
    <FiCopy className="text-yellow-600" />
  </button>
);

/* ------------------------------------------------------------------ */
/* Utils                                                              */
/* ------------------------------------------------------------------ */
const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n)}…` : s);
