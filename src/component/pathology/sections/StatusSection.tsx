"use client";
import { FaUsers, FaShieldAlt, FaGlobe } from "react-icons/fa";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type Stat = { icon: React.ElementType; value: string; label: string; highlight?: string };

/* ----------  DATA  ---------- */
const stats: Stat[] = [
  { icon: FaUsers, value: "2300+", label: "Pathologists empowered worldwide" },
  { icon: FaShieldAlt, value: "900+", label: "Annotated pathology slides across", highlight: "20+" },
  { icon: FaGlobe, value: "150+", label: "Hours of expert-led video lectures" },
];

/* ----------  MAIN COMPONENT  ---------- */
export default function StatusSection() {
  return (
    <section className="bg-[#f9fafb] py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="p-3 border-primary rounded-xl">
              <s.icon className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-2xl ff-font-bold">{s.value}</h3>
            <p className="ff-font text-sm">
              {s.label}
              {s.highlight && (
                <>
                  {" "}
                  <span className="font-semibold text-primary">{s.highlight}</span> tumor types
                </>
              )}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}