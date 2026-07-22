"use client";

import React, { useState, useRef } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface PricingSectionProps {
  onOpenBookModal?: () => void;
  onOpenCaseModal?: () => void;
  cartItems?: string[];
  onToggleCartItem?: (id: string) => void;
}

const PricingSection = ({ onOpenBookModal, onOpenCaseModal, cartItems = [], onToggleCartItem }: PricingSectionProps) => {
  const [activeTab, setActiveTab] = useState<'pkg' | 'so' | 'spec' | 'ihc' | 'mol' | 'more' | 'log'>('pkg');
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.8);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10);
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        const progress = 0.8 + 0.2 * (scrollLeft / maxScroll);
        setScrollProgress(Math.min(1, Math.max(0.8, progress)));
      }
    }
  };

  const handleItemClick = (id: string) => {
    if (onToggleCartItem) {
      onToggleCartItem(id);
    }
  };

  const tabs = [
    { id: 'pkg', title: 'Packages', subtitle: 'Recommended reviews' },
    { id: 'so', title: 'Second Opinions', subtitle: 'Review tiers & extras' },
    { id: 'spec', title: 'Specimens', subtitle: 'Entire-specimen & histology' },
    { id: 'ihc', title: 'IHC & Stains', subtitle: 'Markers, panels & stains' },
    { id: 'mol', title: 'Molecular & FISH', subtitle: 'Genomics, fusions & NGS' },
    { id: 'more', title: 'Cyto · Heme · More', subtitle: 'Cytology, heme, frozen, digital' },
    { id: 'log', title: 'Priority & Logistics', subtitle: 'Turnaround, shipping & institutional' },
  ];

  const packages = [
    {
      id: 'pkg-5',
      name: 'Precision Pathology Consultation',
      price: '₹22,000',
      flag: 'FLAGSHIP',
      featured: true,
      desc: 'Integration of histology, IHC & molecular results.',
      list: [
        'Comprehensive slide review',
        'Biomarker results interpreted',
        'Integrated diagnostic conclusion',
        'Personalized testing plan',
      ],
      note: 'New laboratory testing is charged separately.',
    },
    {
      id: 'pkg-1',
      name: 'Expert Confirmation',
      price: '₹5,000',
      desc: 'Focused confirmation of an existing diagnosis.',
      list: ['Up to 5 slides', 'Up to 2 blocks', 'Concise expert report', '5–7 working days'],
    },
    {
      id: 'pkg-2',
      name: 'Advanced Diagnostic Review',
      price: '₹8,000',
      desc: 'An uncertain or challenging diagnosis.',
      list: ['Up to 15 slides', 'Up to 5 blocks', 'Detailed differential diagnosis', 'Testing recommendations'],
    },
    {
      id: 'pkg-3',
      name: 'Senior Subspecialist Review',
      price: '₹12,000',
      desc: 'Rare, difficult or high-impact cases.',
      list: ['Up to 25 slides', 'Up to 8 blocks', 'Subspecialty review', 'Clinicopathologic correlation'],
    },
    {
      id: 'pkg-4',
      name: 'Comprehensive Cancer Review',
      price: '₹18,000',
      desc: 'Cancer type, grade, stage, margins, nodes & biomarkers.',
      list: ['Up to 40 slides', 'Up to 10 blocks', 'Existing IHC & molecular reviewed', 'Integrated cancer report'],
    },
  ];

  const addOns = [
    { id: 'ca-1', name: 'Additional slide beyond package allowance', price: '₹400 / slide' },
    { id: 'ca-2', name: 'Additional paraffin block', price: '₹750 / block' },
    { id: 'ca-3', name: 'Review of an existing IHC-stained slide', price: '₹750 / marker' },
    { id: 'ca-4', name: 'Review of one outside molecular report', price: '₹3,500' },
    { id: 'ca-5', name: 'Review of a comprehensive NGS report', price: '₹7,500' },
    { id: 'ca-6', name: 'Addendum after new IHC results', price: '₹3,500' },
    { id: 'ca-7', name: 'Addendum after new molecular results', price: '₹5,000' },
    { id: 'ca-8', name: 'Priority review (~72 hours)', price: '+25%' },
    { id: 'ca-9', name: 'Urgent review (~48 hours)', price: '+40%' },
  ];

  // 100% Full Tables Data matching index.html
  const secondOpinionTables = [
    {
      subtitle: 'CONSULTATION TIERS',
      rows: [
        { id: 'rt-1', service: 'Focused Expert Review — up to 5 slides / 2 blocks', price: '₹5,000' },
        { id: 'rt-2', service: 'Comprehensive Diagnostic Review — up to 15 slides / 5 blocks', price: '₹8,000' },
        { id: 'rt-3', service: 'Complex Subspecialty Consultation — up to 25 slides / 8 blocks', price: '₹12,000' },
        { id: 'rt-4', service: 'Comprehensive Cancer Pathology Review — up to 40 slides / 10 blocks', price: '₹18,000' },
        { id: 'rt-5', service: 'Integrated Precision Pathology Consultation', price: '₹22,000' },
        { id: 'rt-6', service: 'Multispecimen or Longitudinal Case Review', price: 'From ₹25,000' },
      ],
    },
    {
      subtitle: 'ADDITIONAL SECOND-OPINION CHARGES',
      rows: [
        { id: 'rt-7', service: 'Additional slide beyond allowance', price: '₹400 / slide' },
        { id: 'rt-8', service: 'Additional paraffin block', price: '₹750 / block' },
        { id: 'rt-9', service: 'Additional specimen (same procedure)', price: 'From ₹2,500' },
        { id: 'rt-10', service: 'Separate specimen (another procedure/date)', price: 'From ₹4,000' },
        { id: 'rt-11', service: 'Review of a prior related case', price: '₹3,000 / case' },
        { id: 'rt-12', service: 'Review of an existing IHC-stained slide', price: '₹750 / marker' },
        { id: 'rt-13', service: 'Review of an existing special-stain slide', price: '₹500 / stain' },
        { id: 'rt-14', service: 'Review of one outside molecular report', price: '₹3,500' },
        { id: 'rt-15', service: 'Review of a comprehensive NGS report', price: '₹7,500' },
        { id: 'rt-16', service: 'Review of radiology or operative records', price: '₹2,000' },
        { id: 'rt-17', service: 'Addendum after new slides', price: '₹3,000' },
        { id: 'rt-18', service: 'Addendum after new IHC results', price: '₹3,500' },
        { id: 'rt-19', service: 'Addendum after new molecular results', price: '₹5,000' },
        { id: 'rt-20', service: 'Formal comparison with previous specimens', price: '₹3,500 / prior case' },
        { id: 'rt-21', service: 'More than 50 slides', price: 'Custom quotation' },
        { id: 'rt-22', service: 'More than 15 blocks', price: 'Custom quotation' },
      ],
    },
  ];

  const specimenTables = [
    {
      subtitle: 'ENTIRE SPECIMEN — GROSS & MICROSCOPIC',
      note: 'Entire specimens are accepted only through an appropriately equipped, authorized laboratory after prior coordination. Final price is confirmed after gross examination.',
      rows: [
        { id: 'rt-23', service: 'Tiny Biopsy (up to 2 blocks)', price: 'From ₹3,000' },
        { id: 'rt-24', service: 'Multiple Small Biopsies (up to 5 blocks)', price: 'From ₹5,000' },
        { id: 'rt-25', service: 'Small Surgical Specimen (up to 5 blocks)', price: 'From ₹6,000' },
        { id: 'rt-26', service: 'Medium Surgical Specimen (up to 10 blocks)', price: 'From ₹10,000' },
        { id: 'rt-27', service: 'Large Surgical Specimen (up to 15 blocks)', price: 'From ₹15,000' },
        { id: 'rt-28', service: 'Standard Oncologic Resection (up to 25 blocks)', price: 'From ₹22,000' },
        { id: 'rt-29', service: 'Complex Oncologic Resection (up to 40 blocks)', price: 'From ₹35,000' },
        { id: 'rt-30', service: 'Highly Complex / Multiorgan Resection (40+ blocks)', price: 'From ₹50,000' },
      ],
    },
    {
      subtitle: 'SPECIMEN-SPECIFIC PRICES',
      rows: [
        { id: 'rt-31', service: 'Appendix', price: '₹5,000' },
        { id: 'rt-32', service: 'Gallbladder', price: '₹5,000' },
        { id: 'rt-33', service: 'Hemorrhoidectomy specimen', price: '₹5,000' },
        { id: 'rt-34', service: 'Skin excision', price: '₹5,000' },
        { id: 'rt-35', service: 'Lymph-node excision', price: '₹7,500' },
        { id: 'rt-36', service: 'Products of conception', price: '₹5,000' },
        { id: 'rt-37', service: 'Placenta, routine', price: '₹6,000' },
        { id: 'rt-38', service: 'Placenta, complex / high-risk', price: '₹10,000' },
        { id: 'rt-39', service: 'Thyroid lobectomy', price: '₹10,000' },
        { id: 'rt-40', service: 'Total thyroidectomy, benign', price: '₹13,000' },
        { id: 'rt-41', service: 'Thyroidectomy for malignancy', price: '₹18,000' },
        { id: 'rt-42', service: 'Simple hysterectomy, benign', price: '₹12,000' },
        { id: 'rt-43', service: 'Hysterectomy with adnexa, benign', price: '₹15,000' },
        { id: 'rt-44', service: 'Hysterectomy with adnexa for malignancy', price: '₹25,000' },
        { id: 'rt-45', service: 'Ovarian tumor specimen', price: 'From ₹18,000' },
        { id: 'rt-46', service: 'Breast lumpectomy', price: '₹15,000' },
        { id: 'rt-47', service: 'Breast lumpectomy with margin mapping', price: '₹20,000' },
        { id: 'rt-48', service: 'Mastectomy without lymph nodes', price: '₹20,000' },
        { id: 'rt-49', service: 'Mastectomy with sentinel/axillary nodes', price: '₹25,000' },
        { id: 'rt-50', service: 'Radical prostatectomy', price: '₹25,000' },
        { id: 'rt-51', service: 'Radical cystectomy', price: '₹30,000' },
        { id: 'rt-52', service: 'Nephrectomy for tumor', price: '₹22,000' },
        { id: 'rt-53', service: 'Colectomy with lymph nodes', price: '₹24,000' },
        { id: 'rt-54', service: 'Gastrectomy with lymph nodes', price: '₹26,000' },
        { id: 'rt-55', service: 'Esophagectomy', price: 'From ₹30,000' },
        { id: 'rt-56', service: 'Lung lobectomy', price: '₹25,000' },
        { id: 'rt-57', service: 'Pneumonectomy', price: '₹30,000' },
        { id: 'rt-58', service: 'Liver resection', price: '₹28,000' },
        { id: 'rt-59', service: 'Pancreaticoduodenectomy', price: '₹40,000' },
        { id: 'rt-60', service: 'Head and neck cancer resection', price: 'From ₹30,000' },
        { id: 'rt-61', service: 'Soft-tissue sarcoma resection', price: 'From ₹35,000' },
        { id: 'rt-62', service: 'Bone-tumor resection', price: 'From ₹40,000' },
        { id: 'rt-63', service: 'Complex multiorgan resection', price: 'From ₹50,000' },
      ],
    },
    {
      subtitle: 'HISTOLOGY & TISSUE-PROCESSING ADD-ONS',
      rows: [
        { id: 'rt-64', service: 'Additional routine paraffin block', price: '₹500 / block' },
        { id: 'rt-65', service: 'New H&E slide from existing block', price: '₹350 / slide' },
        { id: 'rt-66', service: 'Unstained slide', price: '₹300 / slide' },
        { id: 'rt-67', service: 'Charged unstained slide', price: '₹350 / slide' },
        { id: 'rt-68', service: 'One recut section', price: '₹350' },
        { id: 'rt-69', service: 'Deeper levels, up to 3', price: '₹900 / block' },
        { id: 'rt-70', service: 'Each additional level', price: '₹250' },
        { id: 'rt-71', service: 'Serial sectioning', price: 'From ₹1,250 / block' },
        { id: 'rt-72', service: 'Re-embedding', price: '₹600 / block' },
        { id: 'rt-73', service: 'Tissue retrieval from archived block', price: '₹750' },
        { id: 'rt-74', service: 'Small-specimen decalcification', price: '₹2,000' },
        { id: 'rt-75', service: 'Large-bone decalcification', price: 'From ₹5,000' },
        { id: 'rt-76', service: 'Prolonged / specialized decalcification', price: 'From ₹7,500' },
        { id: 'rt-77', service: 'Fat-clearance lymph-node search', price: '₹5,000' },
        { id: 'rt-78', service: 'Complex orientation & margin inking', price: 'From ₹3,000' },
        { id: 'rt-79', service: 'Tumor mapping', price: 'From ₹3,500' },
        { id: 'rt-80', service: 'Tissue macrodissection', price: '₹2,000' },
        { id: 'rt-81', service: 'Tumor-content assessment', price: '₹1,500' },
        { id: 'rt-82', service: 'Cell-block preparation', price: '₹2,000' },
        { id: 'rt-83', service: 'Block retrieval & handling', price: '₹750 / case' },
      ],
    },
  ];

  const ihcTables = [
    {
      subtitle: 'INDIVIDUAL MARKERS',
      rows: [
        { id: 'rt-84', service: 'Routine diagnostic IHC marker', price: '₹1,750 / marker' },
        { id: 'rt-85', service: 'Specialized IHC marker', price: '₹2,250 / marker' },
        { id: 'rt-86', service: 'Rare or imported antibody', price: 'From ₹3,000 / marker' },
        { id: 'rt-87', service: 'Predictive biomarker IHC', price: '₹3,000–₹7,500' },
        { id: 'rt-88', service: 'Interpretation of an outside IHC slide', price: '₹750 / marker' },
      ],
    },
    {
      subtitle: 'DIAGNOSTIC PANELS',
      rows: [
        { id: 'rt-89', service: '2-marker focused panel', price: '₹3,250' },
        { id: 'rt-90', service: '3-marker focused panel', price: '₹4,750' },
        { id: 'rt-91', service: '4-marker panel', price: '₹6,000' },
        { id: 'rt-92', service: '5-marker diagnostic panel', price: '₹7,500' },
        { id: 'rt-93', service: '8-marker diagnostic panel', price: '₹11,500' },
        { id: 'rt-94', service: '10-marker diagnostic panel', price: '₹14,000' },
        { id: 'rt-95', service: '15-marker comprehensive panel', price: '₹20,000' },
        { id: 'rt-96', service: '20-marker complex panel', price: '₹26,000' },
        { id: 'rt-97', service: 'Broad undifferentiated-tumor work-up', price: 'From ₹30,000' },
        { id: 'rt-98', service: 'Extensive lymphoma panel', price: 'From ₹30,000' },
      ],
    },
    {
      subtitle: 'COMMON ORGAN-SPECIFIC PANELS',
      rows: [
        { id: 'rt-99', service: 'Breast: ER, PR, HER2, Ki-67', price: '₹9,000' },
        { id: 'rt-100', service: 'Mismatch-repair: MLH1, PMS2, MSH2, MSH6', price: '₹8,500' },
        { id: 'rt-101', service: 'Prostate confirmation panel', price: '₹6,000' },
        { id: 'rt-102', service: 'Lung adeno vs squamous', price: '₹6,000' },
        { id: 'rt-103', service: 'Neuroendocrine tumor panel', price: '₹8,000' },
        { id: 'rt-104', service: 'Hepatocellular differentiation', price: '₹8,000' },
        { id: 'rt-105', service: 'Melanocytic lesion panel', price: '₹8,000' },
        { id: 'rt-106', service: 'Mesothelioma vs adenocarcinoma', price: '₹12,000' },
        { id: 'rt-107', service: 'Metastatic carcinoma, initial panel', price: 'From ₹11,000' },
        { id: 'rt-108', service: 'Gynecologic tumor panel', price: 'From ₹11,000' },
        { id: 'rt-109', service: 'Endometrial carcinoma classification', price: 'From ₹12,000' },
        { id: 'rt-110', service: 'Renal tumor classification', price: 'From ₹12,000' },
        { id: 'rt-111', service: 'Germ-cell tumor panel', price: 'From ₹11,000' },
        { id: 'rt-112', service: 'Soft-tissue tumor initial panel', price: 'From ₹14,000' },
        { id: 'rt-113', service: 'Lymphoma initial classification', price: 'From ₹18,000' },
      ],
    },
    {
      subtitle: 'PREDICTIVE & PROGNOSTIC',
      rows: [
        { id: 'rt-114', service: 'ER', price: '₹2,000' },
        { id: 'rt-115', service: 'PR', price: '₹2,000' },
        { id: 'rt-116', service: 'HER2 IHC', price: '₹3,000' },
        { id: 'rt-117', service: 'Ki-67', price: '₹2,000' },
        { id: 'rt-118', service: 'PD-L1 IHC', price: 'From ₹7,500' },
        { id: 'rt-119', service: 'ALK IHC', price: '₹4,000' },
        { id: 'rt-120', service: 'ROS1 IHC', price: '₹4,000' },
        { id: 'rt-121', service: 'Pan-TRK IHC', price: '₹5,000' },
        { id: 'rt-122', service: 'BRAF V600E IHC', price: '₹4,000' },
        { id: 'rt-123', service: 'IDH1 R132H IHC', price: '₹4,000' },
        { id: 'rt-124', service: 'ATRX', price: '₹3,000' },
        { id: 'rt-125', service: 'p53', price: '₹2,000' },
        { id: 'rt-126', service: 'p16', price: '₹2,000' },
        { id: 'rt-127', service: 'INI1/SMARCB1', price: '₹3,500' },
        { id: 'rt-128', service: 'BRG1/SMARCA4', price: '₹3,500' },
        { id: 'rt-129', service: 'SDHB', price: '₹3,500' },
        { id: 'rt-130', service: 'Beta-catenin', price: '₹2,500' },
        { id: 'rt-131', service: 'EBV-LMP1', price: '₹2,500' },
      ],
    },
    {
      subtitle: 'SPECIAL STAINS',
      rows: [
        { id: 'rt-132', service: 'PAS', price: '₹900' },
        { id: 'rt-133', service: 'PAS with diastase', price: '₹1,100' },
        { id: 'rt-134', service: 'Ziehl–Neelsen', price: '₹900' },
        { id: 'rt-135', service: 'Fite stain', price: '₹1,100' },
        { id: 'rt-136', service: 'Gram stain', price: '₹900' },
        { id: 'rt-137', service: 'GMS', price: '₹1,250' },
        { id: 'rt-138', service: 'Alcian blue', price: '₹900' },
        { id: 'rt-139', service: 'Alcian blue–PAS', price: '₹1,100' },
        { id: 'rt-140', service: 'Mucicarmine', price: '₹1,000' },
        { id: 'rt-141', service: 'Congo red', price: '₹1,500' },
        { id: 'rt-142', service: 'Masson trichrome', price: '₹1,200' },
        { id: 'rt-143', service: 'Reticulin', price: '₹1,200' },
        { id: 'rt-144', service: 'Iron stain', price: '₹900' },
        { id: 'rt-145', service: 'Elastic stain', price: '₹1,200' },
        { id: 'rt-146', service: 'Toluidine blue', price: '₹900' },
        { id: 'rt-147', service: 'Warthin–Starry', price: '₹1,750' },
        { id: 'rt-148', service: 'Helicobacter stain', price: '₹900' },
        { id: 'rt-149', service: 'Von Kossa', price: '₹1,100' },
        { id: 'rt-150', service: 'Oil Red O (suitable tissue)', price: '₹1,750' },
      ],
    },
    {
      subtitle: 'IMMUNOFLUORESCENCE',
      rows: [
        { id: 'rt-151', service: 'Limited direct immunofluorescence panel', price: 'From ₹6,000' },
        { id: 'rt-152', service: 'Dermatopathology DIF panel', price: 'From ₹8,000' },
        { id: 'rt-153', service: 'Renal immunofluorescence panel', price: 'From ₹10,000' },
        { id: 'rt-154', service: 'Additional fluorescence marker', price: '₹1,500' },
        { id: 'rt-155', service: 'Review of outside IF images', price: '₹4,000' },
        { id: 'rt-156', service: 'Integrated light microscopy + IF report', price: '₹12,000' },
      ],
    },
  ];

  const molTables = [
    {
      subtitle: 'IN SITU HYBRIDIZATION & FISH',
      note: 'Starting prices — final cost depends on platform, methodology, gene coverage and performing laboratory. Testing charges are separate from professional interpretation fees.',
      rows: [
        { id: 'rt-157', service: 'HER2 ISH or FISH', price: '₹12,000' },
        { id: 'rt-158', service: 'ALK rearrangement FISH', price: '₹14,000' },
        { id: 'rt-159', service: 'ROS1 rearrangement FISH', price: '₹14,000' },
        { id: 'rt-160', service: 'RET rearrangement FISH', price: '₹16,000' },
        { id: 'rt-161', service: 'EWSR1 rearrangement FISH', price: '₹14,000' },
        { id: 'rt-162', service: 'SS18 rearrangement FISH', price: '₹14,000' },
        { id: 'rt-163', service: 'MDM2 amplification FISH', price: '₹14,000' },
        { id: 'rt-164', service: 'DDIT3 rearrangement FISH', price: '₹14,000' },
        { id: 'rt-165', service: '1p/19q codeletion', price: '₹16,000' },
        { id: 'rt-166', service: 'MYC rearrangement', price: '₹14,000' },
        { id: 'rt-167', service: 'BCL2 rearrangement', price: '₹14,000' },
        { id: 'rt-168', service: 'BCL6 rearrangement', price: '₹14,000' },
        { id: 'rt-169', service: 'MYC/BCL2/BCL6 lymphoma panel', price: '₹35,000' },
        { id: 'rt-170', service: 'EBER ISH', price: '₹6,000' },
        { id: 'rt-171', service: 'HPV ISH', price: 'From ₹9,000' },
        { id: 'rt-172', service: 'Other tumor-specific assay', price: 'On quotation' },
      ],
    },
    {
      subtitle: 'TISSUE PREPARATION',
      rows: [
        { id: 'rt-173', service: 'Selection of optimal tumor block', price: '₹1,500' },
        { id: 'rt-174', service: 'Tumor-content assessment', price: '₹1,500' },
        { id: 'rt-175', service: 'Manual macrodissection', price: '₹2,000' },
        { id: 'rt-176', service: 'Unstained slide preparation', price: '₹300 / slide' },
        { id: 'rt-177', service: 'DNA extraction', price: 'From ₹3,500' },
        { id: 'rt-178', service: 'RNA extraction', price: 'From ₹4,000' },
        { id: 'rt-179', service: 'Combined DNA & RNA extraction', price: 'From ₹6,000' },
        { id: 'rt-180', service: 'Nucleic-acid quality assessment', price: '₹2,500' },
      ],
    },
    {
      subtitle: 'SINGLE-GENE & TARGETED',
      rows: [
        { id: 'rt-181', service: 'EGFR mutation analysis', price: '₹10,000' },
        { id: 'rt-182', service: 'KRAS mutation analysis', price: '₹9,500' },
        { id: 'rt-183', service: 'NRAS mutation analysis', price: '₹9,500' },
        { id: 'rt-184', service: 'BRAF mutation analysis', price: '₹8,500' },
        { id: 'rt-185', service: 'KIT mutation analysis', price: '₹13,000' },
        { id: 'rt-186', service: 'PDGFRA mutation analysis', price: '₹13,000' },
        { id: 'rt-187', service: 'IDH1/IDH2 mutation analysis', price: '₹13,000' },
        { id: 'rt-188', service: 'JAK2 V617F', price: '₹7,500' },
        { id: 'rt-189', service: 'CALR mutation analysis', price: '₹10,000' },
        { id: 'rt-190', service: 'MPL mutation analysis', price: '₹10,000' },
        { id: 'rt-191', service: 'MYD88 mutation analysis', price: '₹10,000' },
        { id: 'rt-192', service: 'POLE mutation analysis', price: '₹18,000' },
        { id: 'rt-193', service: 'TERT promoter mutation', price: '₹13,000' },
        { id: 'rt-194', service: 'MGMT promoter methylation', price: '₹13,000' },
        { id: 'rt-195', service: 'MLH1 promoter methylation', price: '₹13,000' },
      ],
    },
    {
      subtitle: 'FUSION & TRANSLOCATION',
      rows: [
        { id: 'rt-196', service: 'BCR::ABL1 qualitative', price: '₹9,000' },
        { id: 'rt-197', service: 'BCR::ABL1 quantitative', price: '₹12,000' },
        { id: 'rt-198', service: 'PML::RARA', price: '₹10,000' },
        { id: 'rt-199', service: 'ALK fusion testing', price: '₹14,000' },
        { id: 'rt-200', service: 'ROS1 fusion testing', price: '₹14,000' },
        { id: 'rt-201', service: 'RET fusion testing', price: '₹16,000' },
        { id: 'rt-202', service: 'NTRK fusion testing', price: '₹20,000' },
        { id: 'rt-203', service: 'Other RNA-based fusion test', price: 'From ₹18,000' },
      ],
    },
    {
      subtitle: 'MSI & LYNCH SCREENING',
      rows: [
        { id: 'rt-204', service: 'MMR IHC panel', price: '₹8,500' },
        { id: 'rt-205', service: 'MSI by PCR', price: '₹13,000' },
        { id: 'rt-206', service: 'MLH1 promoter methylation', price: '₹13,000' },
        { id: 'rt-207', service: 'BRAF mutation for Lynch work-up', price: '₹8,500' },
        { id: 'rt-208', service: 'Integrated Lynch-screening interpretation', price: '₹6,000' },
      ],
    },
    {
      subtitle: 'HEREDITARY CANCER TESTING',
      rows: [
        { id: 'rt-209', service: 'Germline BRCA1 & BRCA2', price: '₹22,000' },
        { id: 'rt-210', service: 'Somatic BRCA1 & BRCA2', price: '₹28,000' },
        { id: 'rt-211', service: 'Lynch syndrome germline panel', price: '₹32,000' },
        { id: 'rt-212', service: 'Hereditary breast & ovarian cancer panel', price: '₹38,000' },
        { id: 'rt-213', service: 'Hereditary GI cancer panel', price: '₹38,000' },
        { id: 'rt-214', service: 'Broad hereditary cancer panel', price: '₹50,000' },
        { id: 'rt-215', service: 'Pre-test genetic counselling', price: '₹4,000' },
        { id: 'rt-216', service: 'Post-test genetic counselling', price: '₹4,000' },
        { id: 'rt-217', service: 'Combined pre- & post-test counselling', price: '₹7,000' },
      ],
    },
    {
      subtitle: 'NEXT-GENERATION SEQUENCING',
      rows: [
        { id: 'rt-218', service: 'Focused 5–20 gene panel', price: '₹25,000' },
        { id: 'rt-219', service: 'Targeted 20–50 gene panel', price: '₹38,000' },
        { id: 'rt-220', service: 'Comprehensive 50–150 gene panel', price: '₹55,000' },
        { id: 'rt-221', service: 'DNA & RNA fusion-inclusive panel', price: '₹65,000' },
        { id: 'rt-222', service: 'Comprehensive 200–300 gene panel', price: '₹75,000' },
        { id: 'rt-223', service: 'Comprehensive genomic profiling, 300–500+ genes', price: '₹95,000' },
        { id: 'rt-224', service: 'TMB & MSI-inclusive profiling', price: '₹1,00,000' },
        { id: 'rt-225', service: 'Tumor-normal paired sequencing', price: 'From ₹1,20,000' },
        { id: 'rt-226', service: 'Whole-exome sequencing', price: 'From ₹1,35,000' },
        { id: 'rt-227', service: 'Focused liquid-biopsy panel', price: 'From ₹45,000' },
        { id: 'rt-228', service: 'Comprehensive liquid-biopsy panel', price: 'From ₹85,000' },
      ],
    },
    {
      subtitle: 'MOLECULAR INTERPRETATION',
      rows: [
        { id: 'rt-229', service: 'Interpretation of one molecular test', price: '₹3,500' },
        { id: 'rt-230', service: 'Integrated histology + single-gene', price: '₹6,000' },
        { id: 'rt-231', service: 'Integrated histology, IHC & molecular', price: '₹10,000' },
        { id: 'rt-232', service: 'Independent NGS report review', price: '₹8,500' },
        { id: 'rt-233', service: 'Comprehensive genomic-profile consultation', price: '₹12,000' },
        { id: 'rt-234', service: 'Written treatment-biomarker summary', price: '₹6,000' },
        { id: 'rt-235', service: 'Molecular tumor-board participation', price: '₹6,000 / case' },
      ],
    },
  ];

  const moreTables = [
    {
      subtitle: 'CYTOPATHOLOGY',
      rows: [
        { id: 'rt-236', service: 'Conventional cytology', price: '₹2,000' },
        { id: 'rt-237', service: 'Fluid cytology', price: '₹2,500' },
        { id: 'rt-238', service: 'Fluid cytology with cell block', price: '₹4,500' },
        { id: 'rt-239', service: 'FNAC slide interpretation', price: '₹3,000' },
        { id: 'rt-240', service: 'FNAC procedure & interpretation', price: 'From ₹6,000' },
        { id: 'rt-241', service: 'Image-guided FNAC pathology component', price: '₹4,000' },
        { id: 'rt-242', service: 'Cell-block preparation', price: '₹2,000' },
        { id: 'rt-243', service: 'Cervical Pap smear', price: '₹1,500' },
        { id: 'rt-244', service: 'Liquid-based cervical cytology', price: '₹2,500' },
        { id: 'rt-245', service: 'Brush cytology', price: '₹2,500' },
        { id: 'rt-246', service: 'Outside cytology slide review', price: '₹5,000' },
        { id: 'rt-247', service: 'Complex cytology second opinion', price: '₹8,000' },
      ],
    },
    {
      subtitle: 'HEMATOPATHOLOGY',
      rows: [
        { id: 'rt-248', service: 'Peripheral-smear expert review', price: '₹3,000' },
        { id: 'rt-249', service: 'Bone-marrow aspirate interpretation', price: '₹5,000' },
        { id: 'rt-250', service: 'Bone-marrow trephine interpretation', price: '₹7,500' },
        { id: 'rt-251', service: 'Integrated aspirate + trephine report', price: '₹11,000' },
        { id: 'rt-252', service: 'Lymph-node second opinion', price: '₹8,000' },
        { id: 'rt-253', service: 'Complex lymphoma consultation', price: '₹15,000' },
        { id: 'rt-254', service: 'Acute-leukemia flow panel', price: 'From ₹14,000' },
        { id: 'rt-255', service: 'Lymphoma flow panel', price: 'From ₹18,000' },
        { id: 'rt-256', service: 'Plasma-cell disorder flow panel', price: 'From ₹18,000' },
        { id: 'rt-257', service: 'Minimal residual disease testing', price: 'From ₹22,000' },
        { id: 'rt-258', service: 'Lymphoma IHC panel', price: 'From ₹22,000' },
        { id: 'rt-259', service: 'Integrated hematopathology consultation', price: 'From ₹18,000' },
      ],
    },
    {
      subtitle: 'FROZEN SECTION & INTRAOPERATIVE',
      rows: [
        { id: 'rt-260', service: 'Frozen section, first specimen', price: '₹10,000' },
        { id: 'rt-261', service: 'Each additional frozen specimen', price: '₹4,000' },
        { id: 'rt-262', service: 'Complex margin assessment', price: 'From ₹15,000' },
        { id: 'rt-263', service: 'Multiple-margin mapping', price: 'From ₹20,000' },
        { id: 'rt-264', service: 'Intraoperative cytology consultation', price: '₹5,000' },
        { id: 'rt-265', service: 'After-hours / weekend / holiday surcharge', price: '₹7,500' },
        { id: 'rt-266', service: 'Senior subspecialist remote consultation', price: '₹6,000' },
      ],
    },
    {
      subtitle: 'DIGITAL PATHOLOGY & TELEPATHOLOGY',
      rows: [
        { id: 'rt-267', service: 'Whole-slide scanning, standard slide', price: '₹500 / slide' },
        { id: 'rt-268', service: 'Large or difficult slide', price: '₹750 / slide' },
        { id: 'rt-269', service: 'Digital case preparation & indexing', price: '₹1,250 / case' },
        { id: 'rt-270', service: 'Secure digital transfer', price: '₹1,000 / case' },
        { id: 'rt-271', service: 'Digital storage for 12 months', price: '₹1,250 / case' },
        { id: 'rt-272', service: 'Digital consultation, up to 5 slides', price: '₹5,000' },
        { id: 'rt-273', service: 'Digital consultation, up to 10 slides', price: '₹7,500' },
        { id: 'rt-274', service: 'Digital consultation, 11–25 slides', price: '₹12,000' },
        { id: 'rt-275', service: 'Digital consultation, 26–40 slides', price: '₹18,000' },
        { id: 'rt-276', service: 'More than 40 digital slides', price: 'Custom quotation' },
        { id: 'rt-277', service: 'Same-day digital review surcharge', price: '₹6,000' },
      ],
    },
    {
      subtitle: 'CLINICAL CONSULTATION & CONFERENCES',
      rows: [
        { id: 'rt-278', service: 'Patient/family explanation (up to 20 min)', price: '₹2,500' },
        { id: 'rt-279', service: 'Treating-doctor consultation (up to 30 min)', price: '₹4,000' },
        { id: 'rt-280', service: 'Extended clinician consultation (up to 60 min)', price: '₹7,500' },
        { id: 'rt-281', service: 'Multidisciplinary tumor-board discussion', price: '₹6,000 / case' },
        { id: 'rt-282', service: 'Written clinicopathologic summary', price: '₹4,000' },
        { id: 'rt-283', service: 'Detailed slide conference', price: '₹10,000' },
        { id: 'rt-284', service: 'Institutional case conference', price: 'On quotation' },
      ],
    },
  ];

  const logTables = [
    {
      subtitle: 'PRIORITY & URGENT SERVICES',
      rows: [
        { id: 'rt-285', service: 'Standard review — 5–7 working days', price: 'Included' },
        { id: 'rt-286', service: 'Complex review — 7–10 working days', price: 'Included' },
        { id: 'rt-287', service: 'Priority review — ~72 hours', price: '+25%' },
        { id: 'rt-288', service: 'Urgent review — ~48 hours', price: '+40%' },
        { id: 'rt-289', service: 'Stat review — ~24 hours', price: '+60%' },
        { id: 'rt-290', service: 'Same-day review — subject to availability', price: '+75%' },
      ],
    },
    {
      subtitle: 'SHIPPING, HANDLING & ADMINISTRATION',
      rows: [
        { id: 'rt-291', service: 'Case registration', price: '₹500' },
        { id: 'rt-292', service: 'Standard specimen-handling fee', price: '₹750' },
        { id: 'rt-293', service: 'Formalin-specimen packaging', price: 'From ₹1,000' },
        { id: 'rt-294', service: 'Return courier shipping (domestic)', price: '₹1,200' },
        { id: 'rt-295', service: 'International courier shipping', price: 'On quotation' },
      ],
    },
  ];

  const getActiveTabTables = () => {
    switch (activeTab) {
      case 'so':
        return secondOpinionTables;
      case 'spec':
        return specimenTables;
      case 'ihc':
        return ihcTables;
      case 'mol':
        return molTables;
      case 'more':
        return moreTables;
      case 'log':
        return logTables;
      default:
        return [];
    }
  };

  return (
    <section id="pricing" className={`${FONT} bg-[#FAF8F5] py-[80px] md:py-[96px] px-6 border-b border-[#E6E0D8]`}>
      <div className="max-w-[1180px] mx-auto">
        {/* Section Head */}
        <div className="mb-[36px]">
          <span className={`${MONO} text-[0.78rem] font-bold tracking-[0.16em] uppercase text-[#C79A00] block mb-1`}>
            PRICING
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#241E3D] tracking-tight leading-tight mb-3">
            Expert pathology services &amp; pricing
          </h2>
          <p className="text-[#5C5575] text-[1.02rem] max-w-[820px] leading-relaxed">
            Independent senior-subspecialist review for challenging biopsies, surgical specimens and complex cancer cases. All prices in Indian Rupees; &quot;From&quot; prices are starting prices.
          </p>
        </div>

        {/* Pricing Tabs - 1 Single Horizontal Row */}
        <div className="flex flex-nowrap overflow-x-auto no-scrollbar scrollbar-none gap-[10px] mb-[30px] pt-3 pb-2 px-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[135px] flex flex-col text-left px-4 py-3 rounded-[14px] border-2 transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#E0568F] shadow-[0_8px_22px_rgba(224,86,143,0.14)] -translate-y-0.5'
                    : 'bg-white border-[#E6E0D8] hover:border-[#E0568F]'
                }`}
              >
                <b className={`text-[0.88rem] leading-tight font-bold ${isActive ? 'text-[#E0568F]' : 'text-[#241E3D]'}`}>
                  {tab.title}
                </b>
                <small className={`${MONO} block text-[0.58rem] tracking-[0.05em] uppercase text-[#5C5575] mt-1 truncate`}>
                  {tab.subtitle}
                </small>
              </button>
            );
          })}
        </div>

        {/* Tab Panel Content */}
        {activeTab === 'pkg' && (
          <div>
            {/* Packages Carousel Container */}
            <div className="relative mb-8 group">
              {/* Scroll Left Button */}
              {canScrollLeft && (
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#E6E0D8] shadow-md flex items-center justify-center text-xl text-[#E0568F] font-extrabold hover:bg-[#FAF7F2] hover:scale-105 transition-all cursor-pointer"
                  aria-label="Scroll left"
                >
                  ‹
                </button>
              )}

              {/* Scroll Right Button */}
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-[#E6E0D8] shadow-md flex items-center justify-center text-xl text-[#E0568F] font-extrabold hover:bg-[#FAF7F2] hover:scale-105 transition-all cursor-pointer"
                aria-label="Scroll right"
              >
                ›
              </button>

              {/* 4 Cards Exactly Visible Container */}
              <div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex gap-5 overflow-x-auto scroll-smooth py-3 px-1.5 no-scrollbar scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {packages.map((pkg) => {
                  const isAdded = cartItems.includes(pkg.id);
                  return (
                    <div
                      key={pkg.id}
                      className={`w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)] flex-none bg-white border rounded-[20px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-150 ${
                        isAdded
                          ? 'border-[#E0568F] shadow-[0_10px_30px_rgba(224,86,143,0.18)] ring-2 ring-[#E0568F]/30'
                          : pkg.featured
                          ? 'border-[#E0568F] shadow-[0_10px_30px_rgba(224,86,143,0.12)] ring-1 ring-[#E0568F]'
                          : 'border-[#E6E0D8] hover:border-[#E0568F] shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Flag Tag */}
                        {pkg.flag ? (
                          <span className={`${MONO} text-[0.62rem] font-bold tracking-[0.1em] uppercase text-white bg-[#E0568F] px-3 py-1 rounded-full mb-3 inline-block`}>
                            {pkg.flag}
                          </span>
                        ) : (
                          <div className="h-[26px]" />
                        )}

                        <h4 className="text-lg font-extrabold text-[#241E3D] mb-2 leading-snug">
                          {pkg.name}
                        </h4>
                        <div className="text-2xl font-black text-[#E0568F] mb-3">
                          {pkg.price}
                        </div>
                        <p className="text-[#5C5575] text-[0.9rem] mb-4 min-h-[40px] leading-relaxed">
                          {pkg.desc}
                        </p>

                        <ul className="list-none space-y-2 text-[#5C5575] text-[0.88rem] mb-6 p-0">
                          {pkg.list.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-[#E0568F] font-bold mr-2 flex-none">-</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        {pkg.note && (
                          <p className="text-[0.76rem] text-[#5C5575] italic mb-4">
                            {pkg.note}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleItemClick(pkg.id)}
                        className={`${FONT} w-full py-[6px] px-[15px] rounded-full font-bold text-[0.86rem] transition-all cursor-pointer text-center ${
                          isAdded
                            ? 'bg-[#E0568F] text-white border-2 border-[#FFC900] shadow-[0_4px_14px_rgba(224,86,143,0.4)]'
                            : 'border border-[#E0568F] text-[#E0568F] bg-white hover:bg-[#E0568F] hover:text-white'
                        }`}
                      >
                        {isAdded ? '✓ Added to cart' : 'Add to cart'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Pink Progress Line at Bottom */}
              <div className="mt-4 w-full h-[4px] bg-[#E6E0D8] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E0568F] rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Common Add-ons Table */}
            <div className="bg-white border border-[#E6E0D8] rounded-[20px] p-6 sm:p-8 shadow-sm max-w-[1180px] mx-auto">
              <h4 className={`${MONO} text-[0.78rem] font-bold tracking-[0.12em] uppercase text-[#C79A00] mb-4`}>
                Common Add-ons
              </h4>
              <div className="divide-y divide-[#E6E0D8]">
                {addOns.map((addon) => {
                  const isAdded = cartItems.includes(addon.id);
                  return (
                    <div key={addon.id} className="py-3 flex items-center justify-between gap-4 text-[0.93rem]">
                      <span className="text-[#241E3D] font-medium">{addon.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#E0568F] font-bold">{addon.price}</span>
                        <button
                          onClick={() => handleItemClick(addon.id)}
                          className={`${FONT} text-[0.8rem] font-semibold px-[13px] py-[5px] rounded-full transition-all cursor-pointer whitespace-nowrap ${
                            isAdded
                              ? 'bg-[#E0568F] text-white border border-[#E0568F] shadow-sm'
                              : 'text-[#E0568F] bg-white border border-[#E0568F] hover:bg-[#FFF0F6]'
                          }`}
                        >
                          {isAdded ? '✓ Added' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Tables for Other Tabs (so, spec, ihc, mol, more, log) matching index.html 100% */}
        {activeTab !== 'pkg' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {getActiveTabTables().map((tableGroup: any, gIdx) => (
              <div key={gIdx} className="bg-white border border-[#E6E0D8] rounded-[20px] p-6 sm:p-8 shadow-sm">
                {tableGroup?.note && (
                  <p className="text-[0.9rem] text-[#5C5575] mb-5 leading-relaxed bg-[#FAF7F2] p-4 rounded-xl border border-[#E6E0D8]/60">
                    {tableGroup?.note}
                  </p>
                )}

                <span className={`${MONO} inline-block text-[0.74rem] font-bold tracking-[0.1em] uppercase text-[#1A1502] bg-[#FFC900] px-3.5 py-1.5 rounded-full mb-4`}>
                  {tableGroup.subtitle}
                </span>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#E6E0D8]">
                        <th className={`${MONO} pb-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#5C5575]`}>
                          Service
                        </th>
                        <th className={`${MONO} pb-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase text-[#5C5575] text-right pr-6`}>
                          Price
                        </th>
                        <th className="pb-3 text-right w-[110px]"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E6E0D8]">
                      {tableGroup.rows.map((row:any) => {
                        const isAdded = cartItems.includes(row.id);
                        return (
                          <tr key={row.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                            <td className="py-3.5 text-[#241E3D] text-[0.95rem] font-medium pr-4">
                              {row.service}
                            </td>
                            <td className="py-3.5 text-right text-[#E0568F] font-extrabold text-[1rem] whitespace-nowrap pr-6">
                              {row.price}
                            </td>
                            <td className="py-3.5 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleItemClick(row.id)}
                                className={`${FONT} text-[0.8rem] font-semibold px-[13px] py-[5px] rounded-full transition-all cursor-pointer whitespace-nowrap ${
                                  isAdded
                                    ? 'bg-[#E0568F] text-white border border-[#E0568F] shadow-sm'
                                    : 'text-[#E0568F] bg-white border border-[#E0568F] hover:bg-[#FFF0F6]'
                                }`}
                              >
                                {isAdded ? '✓ Added' : '+ Add'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pricing Fine Disclaimer Note */}
        <p className="max-w-[800px] mx-auto mt-10 text-center text-[0.78rem] text-[#5C5575]/80 leading-relaxed font-normal">
          Indicative starting prices for senior-subspecialist pathology services. Final charges depend on case complexity, number of specimens, slides and blocks, condition of submitted material, grossing, additional testing, external-laboratory charges, urgency and shipping. IHC, special stains, FISH, ISH, flow cytometry, cytogenetics and molecular testing are separate unless specifically included. A final quotation is provided before material additional testing. Payment does not guarantee a particular diagnosis, result, turnaround time or clinical outcome. See our{' '}
          <a href="#" className="text-[#E0568F] font-semibold hover:underline">
            Pricing Disclaimer
          </a>{' '}
          and{' '}
          <a href="#" className="text-[#E0568F] font-semibold hover:underline">
            Refund Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
