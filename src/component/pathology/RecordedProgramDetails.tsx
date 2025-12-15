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
// export default function RecordedProgramDetails() {
//   return (
//     <>
//       <Hero />
//     </>
//   );
// }

// /* ----------  HERO  (identical motion)  ---------- */
// const Hero = () => (
//   <section className="relative w-full h-[80vh] overflow-hidden">
//     <motion.img
//       src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
//       alt="Blog Hero"
//       className="w-full h-full object-cover object-center"
//       initial={{ scale: 1.2, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ duration: 1.5, ease: "easeOut" }}
//     />
//     <motion.div
//       className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ delay: 0.5, duration: 1 }}
//     />

//   </section>
// );






















'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiBook,
  FiVideo,
  FiEdit3,
  FiShoppingCart,
  FiClock,
  FiUsers,
  FiAward,
  FiCheck,
} from "react-icons/fi";
import CommonButton from "@/comman/Button";

/* ---------- TYPES ---------- */
type Social = { Icon: React.ElementType; href: string };
type OptionType = "record-book" | "video" | "writing-book";
type OptionData = {
  id: OptionType;
  title: string;
  description: string;
  price: number;
  icon: React.ElementType;
  features: string[];
};

/* ---------- DATA ---------- */
const socials: Social[] = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
  { Icon: FaWhatsapp, href: "#" },
  { Icon: FaTiktok, href: "#" },
];

const options: OptionData[] = [
  {
    id: "record-book",
    title: "Record Book",
    description: "Complete recorded sessions with lifetime access",
    price: 49,
    icon: FiBook,
    features: [
      "50+ Hours Content",
      "Lifetime Access",
      "Downloadable Materials",
    ],
  },
  {
    id: "video",
    title: "Video Course",
    description: "HD video lessons with practical examples",
    price: 79,
    icon: FiVideo,
    features: [
      "4K Quality Videos",
      "Step-by-step Guides",
      "Certificate Included",
    ],
  },
  {
    id: "writing-book",
    title: "Writing Book",
    description: "Interactive workbook with exercises",
    price: 29,
    icon: FiEdit3,
    features: [
      "200+ Exercises",
      "Practice Sheets",
      "Answer Key Included",
    ],
  },
];

const programDetails = {
  title: "Master Professional Development",
  subtitle: "Comprehensive Learning Program",
  description:
    "Transform your skills with our expertly crafted program designed for ambitious professionals. This comprehensive course covers everything from fundamentals to advanced techniques.",
  access: "Lifetime Access",
  mainPrice: 149,
  features: [
    { icon: FiClock, text: "50+ Hours of Content" },
    { icon: FiUsers, text: "10,000+ Students Enrolled" },
    { icon: FiAward, text: "Certificate of Completion" },
  ],
};

/* ---------- MAIN ---------- */
export default function RecordedProgramDetails() {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const toggleOption = (id: OptionType) => {
    setSelectedOptions(prev =>
      prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
    );
  };

  const total =
    selectedOptions.length === 0
      ? programDetails.mainPrice
      : options
        .filter(o => selectedOptions.includes(o.id))
        .reduce((s, o) => s + o.price, 0);

  return (
    <main className="min-h-screen bg-[#f9fafb]">
      <Hero />

      <section className="relative -mt-40 px-4 pb-24 z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-10">
          {/* Header */}
          <h1 className="text-4xl font-serif font-bold ff-font-bold mt-2">
            {programDetails.title}
          </h1>

          <p className="ff-font max-w-3xl mt-3">
            {programDetails.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 mt-6">
            <span className="flex items-center gap-2 bg-white border border-primary ff-font px-4 py-1 rounded-full text-sm">
              <FiClock /> {programDetails.access}
            </span>

            <span className="text-3xl font-bold ff-font-bold">
              $149{" "}

            </span>

            {programDetails.features.map((f, i) => (
              <span key={i} className="flex items-center gap-2 text-sm ff-font">
                <f.icon className="ff-font-bold text-primary" />
                {f.text}
              </span>
            ))}
          </div>

          <hr className="my-8 text-gray-200" />

          {/* Options */}
          <h2 className="text-xl font-semibold mb-2 ff-font-bold">
            Choose Your Learning Path
          </h2>
          <p className="text-sm ff-font-bold mb-6">
            Select one or more options to customize your learning experience
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {options.map(opt => {
              const active = selectedOptions.includes(opt.id);
              return (
                <div
                  key={opt.id}
                  onClick={() => toggleOption(opt.id)}
                  className={`relative cursor-pointer rounded-xl border p-6 transition-all duration-300
    ${active
                      ? "border-[#FFCA00] bg-[#FFCA00]/10"
                      : "border-gray-200 hover:border-[#FFCA00]"
                    }`}
                >
                  {/* RADIO / CHECK ICON */}
                  <div className="absolute top-4 right-4">
                    {active ? (
                      <div className="w-6 h-6 rounded-full bg-[#FFCA00] flex items-center justify-center">
                        <FiCheck className="text-white text-sm" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-gray-300 bg-white" />
                    )}
                  </div>

                  {/* ICON */}
                  <div className="w-12 h-12 mb-3 rounded-xl bg-white border border-primary flex items-center justify-center ff-font-bold ">
                    <opt.icon className="text-xl" />
                  </div>

                  <h3 className="font-semibold ff-font-bold">{opt.title}</h3>
                  <p className="text-sm ff-font mb-4">
                    {opt.description}
                  </p>

                  <ul className="space-y-2 mb-4">
                    {opt.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm ff-font"
                      >
                        <FiCheck className="text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span className="text-primary font-bold">
                    ${opt.price}{" "}
                    <span className="text-lg font-normal">/one-time</span>
                  </span>
                </div>

              );
            })}
          </div>

          <hr className="my-8 text-gray-200" />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm ff-font-bold">Total Price</span>
              <div className="text-2xl font-bold ff-font-bold">${total}</div>
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

    </main>
  );
}

/* ---------- HERO ---------- */
const Hero = () => (
  <section className="relative w-full h-[80vh] overflow-hidden">
    <motion.img
      src="https://t3.ftcdn.net/jpg/06/45/68/94/360_F_645689490_Fzwptjq0YLCW8JZpC6lASo1KJcAgzZPj.jpg"
      alt="Blog Hero"
      className="w-full h-full object-cover object-center"
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    />

  </section>
);

