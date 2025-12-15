// "use client";
// import { FaFacebookF, FaLinkedinIn, FaTiktok, FaWhatsapp } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { FiCalendar, FiClock, FiTag } from "react-icons/fi";

// /* ----------  TYPES  ---------- */
// type Social = { Icon: React.ElementType; href: string };

// /* ----------  DATA  ---------- */
// const socials: Social[] = [
//   { Icon: FaFacebookF, href: "#" },
//   { Icon: FaLinkedinIn, href: "#" },
//   { Icon: FaWhatsapp, href: "#" },
//   { Icon: FaTiktok, href: "#" },
// ];

// /* ----------  MAIN PAGE  ---------- */
// export default function HyperspecialistSectionDetails() {
//   return (
//     <>
//       <Hero />
//     </>
//   );
// }

// /* ----------  HERO  (identical motion)  ---------- */
// const Hero = () => (
//  <>
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  Hello
//  </>
// );

















"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaBriefcase,
  FaRocket,
  FaShieldAlt,
  FaLayerGroup,
  FaMicroscope,
  FaCheckCircle,
} from "react-icons/fa";
import CommonButton from "@/comman/Button";

/* ---------------- DATA ---------------- */
const modules = [
  {
    id: 1,
    title: "Diagnostic Engine",
    price: 45000,
    icon: FaMicroscope,
    tag: "Core",
    description:
      "End-to-end diagnostic intelligence covering pathology, lab workflows and compliance-ready reporting.",
    points: [
      "Multi-disciplinary lab integration",
      "CAP-safe & medico-legal reporting",
      "High-accuracy clinical insights",
    ],
  },
  {
    id: 2,
    title: "Polymath Clinical Brain",
    price: 52000,
    icon: FaBrain,
    tag: "Advanced",
    description:
      "AI-assisted clinical reasoning engine designed for complex, cross-domain decisions.",
    points: [
      "Cross-specialty intelligence",
      "Evidence-based recommendations",
      "Continuous learning model",
    ],
  },
  {
    id: 3,
    title: "Futurist Domain Mastery",
    price: 48000,
    icon: FaRocket,
    tag: "Vision",
    description:
      "Future-ready frameworks for emerging domains and disruptions.",
    points: [
      "Trend & foresight modeling",
      "Scenario simulations",
      "Long-term strategic clarity",
    ],
  },
  {
    id: 4,
    title: "AI & Digital Ethics",
    price: 38000,
    icon: FaShieldAlt,
    tag: "Governance",
    description:
      "Ethical, legal and societal safeguards for responsible AI deployment.",
    points: [
      "AI governance frameworks",
      "Bias & risk mitigation",
      "Regulatory alignment",
    ],
  },
  {
    id: 5,
    title: "Board Influence Layer",
    price: 55000,
    icon: FaLayerGroup,
    tag: "Leadership",
    description:
      "Executive-level intelligence for boards and senior decision-makers.",
    points: [
      "Board-ready dashboards",
      "Strategic narrative building",
      "High-impact decision support",
    ],
  },
  {
    id: 6,
    title: "Business & Systems",
    price: 42000,
    icon: FaBriefcase,
    tag: "Operations",
    description:
      "Align business processes, systems and execution.",
    points: [
      "Process optimization",
      "Scalable system design",
      "Operational intelligence",
    ],
  },
];

/* ---------------- COMPONENT ---------------- */
export default function Hero() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <section className="relative bg-white px-4 py-10 text-black">
      <div className="max-w-[1380px] mx-auto">
        {/* Heading */}
        <h1
          className="text-2xl md:text-4xl ff-font-bold font-bold mb-4"
        >
          Select Your Modules
        </h1>

        <p
          className="ff-font max-w-2xl mb-8"
        >
          Craft your own intelligence stack. Choose only the modules you need and
          build a system that grows with your ambition.
        </p>

        {/* Modules Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const active = selected.includes(m.id);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => toggle(m.id)}
                className={`relative cursor-pointer rounded-2xl border p-6 transition-all duration-300
              ${active
                    ? "border-primary bg-yellow-50 shadow-[0_0_30px_rgba(250,204,21,0.25)]"
                    : "border-gray-200 bg-white hover:border-[#FFCA00]"
                  }`}
              >
                {/* Active Check */}
                <div className="absolute top-4 right-4">
                  {active ? (
                    <FaCheckCircle className="text-yellow-500 text-xl" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border border-gray-300" />
                  )}
                </div>

                <span className="absolute top-4 left-4 text-xs px-3 py-1 border border-primary rounded-full bg-white ff-font">
                  {m.tag}
                </span>

                <div className="flex items-center gap-4 mb-4 mt-6">

                  <h3 className="text-lg font-semibold ff-font-bold">{m.title}</h3>
                </div>

                <p className="text-md ff-font mb-4">{m.description}</p>

                <ul className="space-y-2 mb-6">
                  {m.points.map((p, idx) => (
                    <li key={idx} className="flex gap-2 text-md ff-font">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FFCA00]" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ₹{m.price.toLocaleString()}
                  </span>
                  <span className="text-md ff-font">One-time fee</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="ff-font">
            Selected Modules: <span className="text-black">{selected.length}</span>
          </div>
          <CommonButton
            pyClass="py-2"
            pxClass="px-7"
          >
            Add to Cart
          </CommonButton>
        </div>
      </div>
    </section>

  );
}
