import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MdArrowForward } from 'react-icons/md';
import { FiCalendar, FiClock, FiMail, FiVideo } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import CommonButton from '@/comman/Button';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type IconComponent = React.ElementType;

interface CourseDetail {
  icon: IconComponent;
  label: string;
  value: string;
  subValue?: string;
}

interface RegisterMasterClassProps {
  className?: string;
  startDate?: string;
  timeSlot?: string;
  timeZone?: string;
  contactMail?: string;
  heroImage?: string;
  weeks?: number;
}

/* ------------------------------------------------------------------ */
/* Default data (can be overridden via props or CMS)                  */
/* ------------------------------------------------------------------ */
const DEFAULT_DETAILS: CourseDetail[] = [
  { icon: FiCalendar, label: 'Start', value: 'September 11, 2025' },
  { icon: FiVideo, label: 'Format', value: 'Live, Online on Zoom' },
  {
    icon: FiClock,
    label: 'When',
    value: 'Wednesdays & Saturdays',
    subValue: '9:00 PM – 10:00 PM (Asia/Calcutta)',
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                 */
/* ------------------------------------------------------------------ */
const floatVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      delay: i * 0.2,
      ease: 'easeInOut',
    },
  }),
};

const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 20, repeat: Infinity, ease: 'linear' },
  },
};

const reverseSpinVariants: Variants = {
  animate: {
    rotate: -360,
    transition: { duration: 25, repeat: Infinity, ease: 'linear' },
  },
};

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */
const DetailRow: React.FC<{ detail: CourseDetail }> = ({ detail }) => (
  <div className="flex items-start gap-4 mb-6 group">
    <div className="relative w-12 h-12 flex items-center justify-center bg-white border border-primary rounded-lg group-hover:scale-110 transition-transform">
      <detail.icon className="text-xl text-primary" />
    </div>
    <div>
      <p className="text-sm font-semibold ff-font">{detail.label}</p>
      <p className="text-base font-bold ff-font-bold">{detail.value}</p>
      {detail.subValue && (
        <p className="text-sm ff-font mt-1 text-gray-600">{detail.subValue}</p>
      )}
    </div>
  </div>
);

const FloatingDots: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay: 0.5 }}
    className="flex justify-center gap-4 mt-10"
  >
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        custom={i}
        variants={floatVariants}
        animate="animate"
        className="w-2 h-2 bg-[#FFCA00] rounded-full"
      />
    ))}
  </motion.div>
);

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
const RegisterMasterClass: React.FC<RegisterMasterClassProps> = ({
  className = '',
  startDate = 'September 11, 2025',
  timeSlot = 'Wednesdays & Saturdays',
  timeZone = 'Asia/Calcutta',
  contactMail = 'info@mendelacademy.com',
  heroImage = 'https://www.autopista.es/uploads/s1/10/32/90/85/la-ameba-contiene-estructuras-especializadas-llamadas-organulos-que-realizan-una-variedad-de-funciones-celulares.jpeg',
  weeks = 8,
}) => {
  const details: CourseDetail[] = React.useMemo(
    () => [
      { icon: FiCalendar, label: 'Start', value: startDate },
      { icon: FiVideo, label: 'Format', value: 'Live, Online on Zoom' },
      {
        icon: FiClock,
        label: 'When',
        value: timeSlot,
        subValue: `9:00 PM – 10:00 PM (${timeZone})`,
      },
    ],
    [startDate, timeSlot, timeZone]
  );

  return (
    <section className={`relative py-15 bg-white overflow-hidden ${className}`}>
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32"
          variants={spinVariants}
          animate="animate"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-yellow-400/10">
            <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-32 right-20 w-40 h-40"
          variants={reverseSpinVariants}
          animate="animate"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-blue-400/10">
            <polygon points="50 0, 93.3 25, 93.3 75, 50 100, 6.7 75, 6.7 25" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">
            Register for the Masterclass
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* LEFT */}
            <div>
              <h3 className="text-2xl font-bold ff-font-bold mb-8">Course Details</h3>
              {details.map((d, i) => (
                <DetailRow key={i} detail={d} />
              ))}

              <CommonButton
                pyClass="py-3"
                pxClass="px-35"
                fontWeight={700}
                fontSize={14}
                className="flex items-center group gap-2 mt-8"
              >
                Register Now
                <FaArrowRight className="text-xl duration-300 group-hover:translate-x-1" />
              </CommonButton>

              <div className="flex flex-col gap-2 mt-6">
                <div className="flex items-center gap-3 text-sm ff-font">
                  <FiMail className="text-black" />
                  <span>Need help? Contact us at</span>
                </div>
                <a
                  href={`mailto:${contactMail}`}
                  className="text-primary font-semibold hover:text-yellow-700 underline"
                >
                  {contactMail}
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex justify-center items-center">
              <div className="relative w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={heroImage}
                    alt="Endometrial Biopsy Sample"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="absolute -bottom-4 -right-4 bg-[#FFCA00] text-black font-bold px-6 py-3 rounded-xl shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl ff-font-bold">{weeks}</div>
                    <div className="text-xs ff-font">WEEKS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FloatingDots />
      </div>
    </section>
  );
};

export default RegisterMasterClass