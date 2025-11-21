"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import CommonButton from "@/comman/Button";
import { JSX } from "react";

/* ----------  TYPES  ---------- */
type OrderItem = { label: string; value: string; bold?: boolean };
type NextStep = { icon: JSX.Element; title: string; subtitle: string };

/* ----------  DATA  ---------- */
const orderDetails: OrderItem[] = [
  { label: "Event:", value: "Sample Event Name" },
  { label: "Order ID:", value: "ORDER-1762516325822-ouviiylld", bold: true },
  { label: "Amount Paid:", value: "$10.89" },
  { label: "Registration Date:", value: "Nov 7, 2025" },
];

const nextSteps: NextStep[] = [
  {
    icon: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0v-1m0 1v1m8-4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h4" />
      </svg>
    ),
    title: "Confirmation Email",
    subtitle: "Sent to your email address",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m0 0V8m0 4v4m6-8v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8a2 2 0 012-2h4" />
      </svg>
    ),
    title: "Event Tickets",
    subtitle: "Available in your account",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
      </svg>
    ),
    title: "Event Reminder",
    subtitle: "You'll receive reminders before the event",
  },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <Banner />
      <Content />
      <Actions onDone={() => router.push("/")} />
    </div>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const Banner = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="bg-green-50 border border-green-200 rounded-md p-6 flex items-center space-x-4"
  >
    <CheckIcon />
    <div>
      <h2 className="text-lg font-semibold text-green-700">Payment Successful!</h2>
      <p className="text-green-600 text-sm">Your event registration has been confirmed.</p>
    </div>
  </motion.div>
);

const Content = () => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
    <OrderDetails />
    <NextSteps />
  </div>
);

const OrderDetails = () => (
  <div>
    <h3 className="font-semibold mb-4">Order Details</h3>
    <dl className="space-y-3 text-sm text-gray-700">
      {orderDetails.map((item) => (
        <div key={item.label} className="flex justify-between">
          <dt className={item.bold ? "font-bold" : "font-medium"}>{item.label}</dt>
          <dd className={item.bold ? "font-bold" : ""}>{item.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const NextSteps = () => (
  <div>
    <h3 className="font-semibold mb-4">What's Next?</h3>
    <ul className="space-y-4 text-sm text-gray-700">
      {nextSteps.map((step) => (
        <li key={step.title} className="flex items-start gap-3">
          {step.icon}
          <div>
            <strong>{step.title}</strong>
            <p className="text-gray-400 text-xs">{step.subtitle}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const Actions = ({ onDone }: { onDone: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="mt-8 space-y-4"
  >
    <CommonButton onClick={onDone}>
      Done
    </CommonButton>
    <p className="text-center text-xs text-blue-700">
      Need help?{" "}
      <a href="#" className="underline font-semibold">
        Contact our support team
      </a>{" "}
      or check your email for event details.
    </p>
  </motion.div>
);

/* ----------  ICONS  ---------- */
const CheckIcon = () => (
  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);