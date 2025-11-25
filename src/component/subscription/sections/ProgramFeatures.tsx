import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  FaBalanceScale,
  FaCheckCircle,
  FaTrophy,
} from 'react-icons/fa';
import { HiDocumentText } from 'react-icons/hi';
import { MdBiotech } from 'react-icons/md';
import { TbDna2 } from 'react-icons/tb';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type IconComponent = React.ElementType;

export interface ProgramFeature {
  icon: IconComponent;
  title: string;
  description: string;
  gradient: string;          // e.g. "from-amber-400 to-yellow-500"
  iconBgGradient: string;    // e.g. "from-amber-50 to-yellow-100"
}

export interface ProgramFeaturesProps {
  className?: string;
  heading?: string;
  features?: ProgramFeature[];
}

/* ------------------------------------------------------------------ */
/* Default content (move to CMS / i18n later)                         */
/* ------------------------------------------------------------------ */
const DEFAULT_FEATURES: ProgramFeature[] = [
  {
    icon: TbDna2,
    title: 'Real-Life Diagnostic Insights',
    description: 'Go beyond textbooks with real biopsy cases',
    gradient: 'from-amber-400 to-yellow-500',
    iconBgGradient: 'from-amber-50 to-yellow-100',
  },
  {
    icon: HiDocumentText,
    title: 'Annotated Image Decks',
    description: 'Morphologic mastery with curated visuals',
    gradient: 'from-yellow-400 to-amber-500',
    iconBgGradient: 'from-yellow-50 to-amber-100',
  },
  {
    icon: MdBiotech,
    title: 'IHC Ladders',
    description: 'Smart interpretation, not rote memorization',
    gradient: 'from-amber-500 to-yellow-600',
    iconBgGradient: 'from-amber-50 to-yellow-50',
  },
  {
    icon: FaBalanceScale,
    title: 'Legal-Safe Reporting kit',
    description: '100+ scenarios to keep you compliant and protected',
    gradient: 'from-yellow-500 to-amber-600',
    iconBgGradient: 'from-yellow-100 to-amber-50',
  },
  {
    icon: FaCheckCircle,
    title: 'Mendel Self-Audit Checklist™',
    description: 'Go beyond textbooks with real biopsy cases',
    gradient: 'from-amber-400 to-yellow-500',
    iconBgGradient: 'from-amber-100 to-yellow-50',
  },
  {
    icon: FaTrophy,
    title: 'Dual Certification (Module-3 only)',
    description: 'Stand out with advanced credentials',
    gradient: 'from-yellow-600 to-amber-500',
    iconBgGradient: 'from-yellow-50 to-amber-100',
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                 */
/* ------------------------------------------------------------------ */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

const glowVariants = {
  hover: { opacity: 0.25, scale: 1.05 },
  rest: { opacity: 0, scale: 1 },
};

/* ------------------------------------------------------------------ */
/* Single feature card                                                */
/* ------------------------------------------------------------------ */
const FeatureCard: React.FC<{ feat: ProgramFeature; index: number }> = ({
  feat,
  index,
}) => {
  const Icon = feat.icon;
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      className="group relative"
    >
      {/* Gradient glow on hover */}
      <motion.div
        variants={glowVariants}
        whileHover="hover"
        initial="rest"
        className={`absolute -inset-1 bg-gradient-to-r ${feat.gradient} rounded-2xl blur-xl`}
      />

      <div className="relative bg-white rounded-2xl p-8 shadow-sm transition-shadow duration-300 border border-gray-200 h-full">
        {/* Icon */}
        <div
          className={`mb-6 w-20 h-20 bg-gradient-to-br ${feat.iconBgGradient} rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 flex items-center justify-center relative overflow-hidden`}
        >
          <Icon className="text-4xl text-primary group-hover:scale-110 transition-transform" />
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold ff-font-bold mb-3 group-hover:text-[#ffca00] transition-colors">
          {feat.title}
        </h3>
        <p className="ff-font leading-relaxed text-gray-600">
          {feat.description}
        </p>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/* Main component                                                     */
/* ------------------------------------------------------------------ */
const ProgramFeatures: React.FC<ProgramFeaturesProps> = ({
  className = '',
  heading = 'Why you will love this program',
  features = DEFAULT_FEATURES,
}) => {
  return (
    <section className={`py-15 px-4 relative bg-[#f9fafb] ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold ff-font-bold">
            {heading}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <FeatureCard key={feat.title} feat={feat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramFeatures;