"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const downloads = [
  { name: "FRCPath Part 1", file: "FRCPath_Part1_Curriculum.pdf" },
  { name: "FRCPath Part 2", file: "FRCPath_Part2_Curriculum.pdf" },
  { name: "NEET-SS Pathology", file: "NEET_SS_Pathology_Curriculum.pdf" },
  { name: "ABPath Subspecialty", file: "ABPath_Subspecialty_Curriculum.pdf" }
];

const priceFactors = [
  { title: "Track and specialty", desc: "slide libraries and faculty differ per specialty" },
  { title: "Target sitting date", desc: "determines programme length and revision intensity" },
  { title: "Attempt history", desc: "repeat candidates get a diagnostic and a narrower plan" },
  { title: "Mentorship level", desc: "group teaching versus one to one case review" },
  { title: "Cohort or Individual", desc: "institutional and group rates are quoted separately" }
];

const RequestQuoteSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    track: 'FRCPath Part 1',
    specialty: '',
    targetSitting: '',
    attempt: 'First attempt',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleDownload = (fileName: string) => {
    // Generate simple notification or mock download trigger
    alert(`Downloading ${fileName}...`);
  };

  return (
    <section id="request-quote" className="bg-[#FAF7F2] py-16 md:py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-[2px] bg-[#A16207]"></div>
            <span className="text-[#A16207] text-xs font-black tracking-widest uppercase">
              PRICING
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#160B29] tracking-tight mb-4">
            Request a quote
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-3xl leading-relaxed">
            We don&apos;t publish a single price list. Fees depend on the track, the specialty within it, how long you need access, and how much one-to-one mentorship you want. Tell us where you are and we&apos;ll send a written quote.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-10 border border-gray-200/80 shadow-md relative overflow-hidden">
            {/* Left Accent Bar */}
            <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-b from-[#E84583] via-[#E84583] to-[#F9C814]" />

            <h3 className="text-2xl font-black text-[#160B29] mb-1">
              Tell us about your exam
            </h3>
            <p className="text-xs text-gray-500 mb-8">
              We reply within two working days with a written quote and a recommended start date.
            </p>

            {submitted ? (
              <motion.div
                className="bg-[#F8F5EF] p-8 rounded-2xl border border-[#EBE3D8] text-center my-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#E84583] text-white flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                  ✓
                </div>
                <h4 className="text-xl font-black text-[#160B29] mb-2">Quote Request Submitted</h4>
                <p className="text-sm text-gray-600">
                  Thank you! We have received your details and will prepare a customized quote for you within 2 working days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2 rounded-full bg-[#160B29] text-white text-xs font-bold hover:bg-black transition-colors"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      FULL NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@hospital.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      TRACK
                    </label>
                    <select
                      value={formData.track}
                      onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="FRCPath Part 1">FRCPath Part 1</option>
                      <option value="FRCPath Part 2">FRCPath Part 2</option>
                      <option value="NEET-SS Pathology">NEET-SS Pathology</option>
                      <option value="ABPath Subspecialty">ABPath Subspecialty</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      SPECIALTY
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Histopathology"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      TARGET SITTING
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Spring 2027"
                      value={formData.targetSitting}
                      onChange={(e) => setFormData({ ...formData, targetSitting: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                      ATTEMPT
                    </label>
                    <select
                      value={formData.attempt}
                      onChange={(e) => setFormData({ ...formData, attempt: e.target.value })}
                      className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors appearance-none cursor-pointer"
                    >
                      <option value="First attempt">First attempt</option>
                      <option value="Second attempt">Second attempt</option>
                      <option value="Multiple attempts">Multiple attempts</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Textarea */}
                <div>
                  <label className="block text-[10px] font-black tracking-wider text-gray-500 uppercase mb-2">
                    ANYTHING ELSE WE SHOULD KNOW
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Where you are in your preparation, mentorship you want, whether you're enquiring for a group or institution."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-[#F8F6F0] border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#160B29] font-medium focus:outline-none focus:border-[#E84583] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#E84583] hover:bg-[#d43773] text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  Request My Quote <span className="font-normal text-base">→</span>
                </button>

                <p className="text-[11px] text-gray-400 text-center">
                  No payment details required. We use your answers only to prepare your quote.
                </p>

              </form>
            )}

          </div>

          {/* Right Column: Stacked Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Top Card: Curriculum Download */}
            <div className="bg-[#160B29] rounded-3xl p-7 text-white shadow-md border border-[#271842]">
              <div className="text-[10px] text-[#F9C814] font-black tracking-widest uppercase mb-2">
                FREE DOWNLOADS
              </div>
              <h4 className="text-xl font-black text-white mb-2">
                Curriculum by track
              </h4>
              <p className="text-xs text-[#A39BB5] mb-6 leading-relaxed">
                Each track has its own document — domain weightings, specialty coverage and the method behind it. No email required.
              </p>

              <div className="flex flex-col gap-3">
                {downloads.map((dl, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDownload(dl.file)}
                    className="w-full bg-[#10061E] border border-[#271842] hover:border-[#E84583]/60 rounded-xl px-5 py-3.5 flex items-center justify-between text-sm font-bold text-white transition-all cursor-pointer group"
                  >
                    <span>{dl.name}</span>
                    <span className="text-[10px] text-gray-400 font-extrabold uppercase px-2 py-0.5 rounded bg-white/5 group-hover:bg-[#E84583] group-hover:text-white transition-colors">
                      PDF
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Card: What changes your price */}
            <div className="bg-white rounded-3xl p-7 border border-gray-200/80 shadow-sm">
              <div className="text-[10px] text-[#E84583] font-black tracking-widest uppercase mb-4">
                WHAT CHANGES YOUR PRICE
              </div>
              
              <ul className="flex flex-col gap-3.5">
                {priceFactors.map((pf, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#F9C814] flex-shrink-0 mt-1.5" />
                    <span className="text-gray-700">
                      <strong className="text-[#160B29] font-extrabold">{pf.title}</strong> — {pf.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default RequestQuoteSection;
