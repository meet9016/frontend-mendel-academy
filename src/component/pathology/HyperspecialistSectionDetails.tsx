"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CommonButton from "@/comman/Button";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { isIndia } from "@/utils/helper";

export type HyperSpecialistItem = {
  id: string;
  title: string;
  description: string;
  price_dollar: number;
  price_inr: number;
  tag: string;
  tags: string[];
};

type Item = {
  id: string;
  title: string;
  description: string;
  price_dollar: number;
  price_inr: number;
  tag: string;
  tags: string[];
};
/* ---------------- COMPONENT ---------------- */
export default function Hero() {
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<HyperSpecialistItem[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getLiveCoursesData = useCallback(async () => {
    // setLoading(true);
    try {
      const res = await api.get(`${endPointApi.getAllHyperSpecialist}`);

      setData(res.data.data as HyperSpecialistItem[]);
    } catch (err) {
      console.error(err);
    } finally {
      // setLoading(false);
    }
  }, []);

  useEffect(() => {
    getLiveCoursesData();
  }, [getLiveCoursesData]);

  return (
    <section className="relative bg-white px-4 py-10 text-black">
      <div className="max-w-[1380px] mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl ff-font-bold font-bold mb-4">
          Select Your Modules
        </h1>

        <p className="ff-font  mb-8">
          Craft your own intelligence stack. Choose only the modules you need
          and build a system that grows with your ambition.
        </p>

        {/* Modules Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((m: Item, i: number) => {
            const active = selected.includes(m.id);
            const showIndiaPrice = isIndia();

            const price = showIndiaPrice ? m?.price_dollar : m?.price_inr;

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
              ${
                active
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

                {/* <span className="absolute top-4 left-4 text-xs px-3 py-1 border border-primary rounded-full bg-white ff-font">
                  {m.tag}
                </span> */}

                <div className="flex items-center gap-4 mb-4 mt-6">
                  <h3 className="text-lg font-semibold ff-font-bold">
                    {m.title}
                  </h3>
                </div>

                {/* <p className="text-md ff-font mb-4">{m.description}</p> */}
                <p className="mb-4 text-md ff-font text-gray-600 h-[52px] line-clamp-3">
                  {m.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {m.tags.map((p, idx) => (
                    <li key={idx} className="flex gap-2 text-md ff-font">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FFCA00]" />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold ">
                    ₹{price}
                  </span>
                  <span
                    className={`text-sm font-medium transition-colors
              ${
                active
                  ? "text-yellow-600"
                  : "text-gray-500 group-hover:text-yellow-600"
              }`}
                  >
                    {active ? "Selected" : "Click to select"}
                  </span>
                  {/* <span className="text-md ff-font">One-time fee</span> */}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="ff-font">
            Selected Modules:{" "}
            <span className="text-black">{selected.length}</span>
          </div>
          <CommonButton pyClass="py-2" pxClass="px-7">
            Add to Cart
          </CommonButton>
        </div>
      </div>
    </section>
  );
}
