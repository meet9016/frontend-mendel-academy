import { Metadata } from "next";
import USMLEStep1Page from "@/component/PGMedical IntreceExam/USMLEStep1Page";

export const metadata: Metadata = {
  title: "USMLE Step 1 Prep App: QBank, Chitras & Flashcards | Mendel Academy",
  description:
    "Concept-first USMLE Step 1 prep for MD, DO and IMG students. QBank, illustrated Chitras, spaced-repetition flashcards and a free Self-Assessment in one app. Plans from $309.",
  alternates: {
    canonical: "https://mendelacademy.com/services/usmle-step-1",
  },
  openGraph: {
    type: "website",
    siteName: "Mendel Academy",
    title: "USMLE Step 1 Prep, Simplified | Mendel Academy",
    description:
      "QBank, illustrated Chitras, flashcards and notes in one app, with analytics that tell you when you’re ready. Try a free Self-Assessment.",
    url: "https://mendelacademy.com/services/usmle-step-1",
    images: [
      {
        url: "https://mendelacademy.com/images/og/usmle-step-1.jpg",
        width: 1200,
        height: 630,
        alt: "Mendel Academy USMLE Step 1 prep app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "USMLE Step 1 Prep, Simplified | Mendel Academy",
    description:
      "QBank, Chitras, flashcards and notes in one app. Try a free Self-Assessment.",
    images: ["https://mendelacademy.com/images/og/usmle-step-1.jpg"],
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": "https://mendelacademy.com/#org",
      "name": "Mendel Academy",
      "url": "https://mendelacademy.com/",
      "logo": "https://mendelacademy.com/images/main%20logo.png",
      "slogan": "We simplify learning, amplify success.",
      "email": "info@mendelacademy.com",
      "telephone": "+1-310-708-3244",
      "founder": { "@id": "https://mendelacademy.com/#founder" },
      "sameAs": [
        "https://www.instagram.com/[HANDLE]",
        "https://www.youtube.com/@[HANDLE]",
        "https://www.linkedin.com/company/[HANDLE]"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://mendelacademy.com/#founder",
      "name": "Kishore Managoli",
      "honorificSuffix": "MD",
      "jobTitle": "Founder & CEO",
      "worksFor": { "@id": "https://mendelacademy.com/#org" }
    },
    {
      "@type": "WebPage",
      "@id": "https://mendelacademy.com/services/usmle-step-1#page",
      "url": "https://mendelacademy.com/services/usmle-step-1",
      "name": "USMLE Step 1 Prep App: QBank, Chitras & Flashcards",
      "description": "Concept-first USMLE Step 1 prep for MD, DO and IMG students from Mendel Academy.",
      "inLanguage": "en",
      "dateModified": "2026-10-30",
      "isPartOf": { "@type": "WebSite", "@id": "https://mendelacademy.com/#site", "url": "https://mendelacademy.com/", "name": "Mendel Academy", "publisher": { "@id": "https://mendelacademy.com/#org" } },
      "about": { "@id": "https://mendelacademy.com/services/usmle-step-1#course" },
      "breadcrumb": { "@id": "https://mendelacademy.com/services/usmle-step-1#breadcrumb" }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://mendelacademy.com/services/usmle-step-1#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mendelacademy.com/" },
        { "@type": "ListItem", "position": 2, "name": "PG Medical Entrance Exams", "item": "https://mendelacademy.com/services" },
        { "@type": "ListItem", "position": 3, "name": "USMLE Step 1", "item": "https://mendelacademy.com/services/usmle-step-1" }
      ]
    },
    {
      "@type": "Course",
      "@id": "https://mendelacademy.com/services/usmle-step-1#course",
      "name": "USMLE Step 1 Prep Program",
      "description": "Concept-first USMLE Step 1 preparation in the Mendel Galaxy app: QBank, Mendel Chitras, flashcards, study notes, Rapid Recall, Fast Facts, analytics and Self-Assessments (one free for everyone, three in total with any plan).",
      "provider": { "@id": "https://mendelacademy.com/#org" },
      "educationalLevel": "Medical school",
      "audience": { "@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Preclinical MD students, DO students and international medical graduates" },
      "teaches": ["Pathology", "Physiology", "Pharmacology", "Microbiology", "Immunology", "Biochemistry", "Genetics", "Anatomy", "Behavioral Sciences", "Biostatistics"],
      "offers": [
        { "@type": "Offer", "name": "1 month", "price": "309", "priceCurrency": "USD", "category": "Subscription", "url": "https://mendelacademy.com/services/usmle-step-1#pricing" },
        { "@type": "Offer", "name": "3 months", "price": "429", "priceCurrency": "USD", "category": "Subscription", "url": "https://mendelacademy.com/services/usmle-step-1#pricing" },
        { "@type": "Offer", "name": "6 months", "price": "449", "priceCurrency": "USD", "category": "Subscription", "url": "https://mendelacademy.com/services/usmle-step-1#pricing" },
        { "@type": "Offer", "name": "12 months", "price": "499", "priceCurrency": "USD", "category": "Subscription", "url": "https://mendelacademy.com/services/usmle-step-1#pricing" },
        { "@type": "Offer", "name": "24 months", "price": "699", "priceCurrency": "USD", "category": "Subscription", "url": "https://mendelacademy.com/services/usmle-step-1#pricing" }
      ],
      "hasCourseInstance": [
        { "@type": "CourseInstance", "courseMode": "Online", "courseWorkload": "Self-paced", "name": "Mendel Galaxy app (self-paced)" },
        { "@type": "CourseInstance", "courseMode": "Online", "name": "Live Step 1 mentorship", "instructor": { "@id": "https://mendelacademy.com/#founder" },
          "offers": { "@type": "Offer", "price": "1199", "priceCurrency": "USD" } }
      ]
    },
    {
      "@type": "OfferCatalog",
      "@id": "https://mendelacademy.com/services/usmle-step-1#mentorship",
      "name": "Mendel Academy live mentorship",
      "description": "Live, physician-led mentorship with Dr. Kishore Managoli, MD. Every course includes one year of Mendel Galaxy app access.",
      "itemListElement": [
        { "@type": "Offer", "name": "USMLE Step 2 CK mentorship", "price": "1499", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } },
        { "@type": "Offer", "name": "USMLE Step 3 mentorship", "price": "899", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } },
        { "@type": "Offer", "name": "COMLEX Level 1 mentorship", "price": "1199", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } },
        { "@type": "Offer", "name": "Shelf exam mentorship (per exam)", "price": "299", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } },
        { "@type": "Offer", "name": "Tsunami Bundle: Step 1 + Step 2 CK mentorship", "price": "2235", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } },
        { "@type": "Offer", "name": "Full Match Bundle: Step 1 + Step 2 CK + Step 3 mentorship", "price": "2995", "priceCurrency": "USD", "seller": { "@id": "https://mendelacademy.com/#org" } }
      ]
    },
    {
      "@type": "MobileApplication",
      "@id": "https://mendelacademy.com/#app",
      "name": "Mendel Galaxy",
      "operatingSystem": "iOS, iPadOS, Web",
      "applicationCategory": "EducationalApplication",
      "publisher": { "@id": "https://mendelacademy.com/#org" },
      "offers": { "@type": "Offer", "price": "309", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "@id": "https://mendelacademy.com/services/usmle-step-1#faq",
      "mainEntity": [
        { "@type": "Question", "name": "Is USMLE Step 1 pass/fail?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. USMLE Step 1 has reported pass/fail outcomes only since January 26, 2022. Step 2 CK and Step 3 still report a three-digit score. Mendel Academy’s Self-Assessments estimate how ready you are to pass." } },
        { "@type": "Question", "name": "What is the Mendel Academy USMLE Step 1 program?",
          "acceptedAnswer": { "@type": "Answer", "text": "It is a concept-first USMLE Step 1 prep program delivered in the Mendel Galaxy app. It includes a QBank, Mendel Chitras, flashcards, study notes, Rapid Recall and Fast Facts, plus analytics and NBME-style Self-Assessments." } },
        { "@type": "Question", "name": "How much does Mendel Academy Step 1 prep cost?",
          "acceptedAnswer": { "@type": "Answer", "text": "App plans range from $309 for 1 month to $699 for 24 months; the 12-month plan is $499. Every plan includes all six study tools and three Self-Assessments in total. Live Step 1 mentorship is $1,199 and includes one year of app access." } },
        { "@type": "Question", "name": "How many Self-Assessments are included?",
          "acceptedAnswer": { "@type": "Answer", "text": "Self-Assessment 1 is free for everyone, with no purchase needed. Every Mendel Galaxy app plan adds Self-Assessments 2 and 3, so plan members get three in total. Self-Assessment 4 is available separately. Each is an NBME-style, exam-paced test of 280 questions with a predicted score and percentile." } },
        { "@type": "Question", "name": "What is Understand the why in the Mendel QBank?",
          "acceptedAnswer": { "@type": "Answer", "text": "Understand the why is the explanation after every Mendel QBank question. Triage paraphrases the question down to what it is really asking, Core Mechanism explains the science, Peel the Reasoning reveals the logic one clue at a time down to the core principle, and The Trap breaks down the dangerous distractors and how to duck them. It closes with the educational objective, the question writer’s intent and a Mendel Hack to remember it." } },
        { "@type": "Question", "name": "What is a Mendel Chitra?",
          "acceptedAnswer": { "@type": "Answer", "text": "A Mendel Chitra is a hand-illustrated, one-page visual summary of a medical topic, covering definition, pathophysiology, presentation, workup, management and memory hacks." } },
        { "@type": "Question", "name": "Is Mendel Academy good for IMGs and DO students?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. The program is built for preclinical MD students, international medical graduates (IMGs) and DO students taking USMLE Step 1." } },
        { "@type": "Question", "name": "Which devices does the Mendel Galaxy app work on?",
          "acceptedAnswer": { "@type": "Answer", "text": "The Mendel Galaxy app works on iPhone, iPad and on the web from any desktop or laptop." } }
      ]
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <USMLEStep1Page />
    </>
  );
}

