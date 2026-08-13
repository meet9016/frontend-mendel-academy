"use client";
import React, { useState } from "react";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";

const CohortScopingForm = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    institution: "",
    workEmail: "",
    role: "",
    teamSize: "",
    course: "",
    additionalInfo: ""
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.institution || !formData.workEmail || !formData.teamSize) {
      ErrorToast("Please fill in all required fields.");
      return;
    }
    setFormSubmitted(true);
    SuccessToast("Proposal request submitted successfully!");
  };

  const b2bServices = [
    {
      title: "Team Seats",
      desc: "One team. One standard. One price.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      title: "Private Cohort",
      desc: "A course run just for your team, on your own schedule.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      title: "Institutional Licence",
      desc: "Buy training modules for your institution.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      )
    },
    {
      title: "Enterprise",
      badge: "White label",
      desc: "A fully custom program run under your institution's brand.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    }
  ];

  const whyTeamsChoose = [
    {
      title: "Consistent sign-out",
      desc: "Everyone works to the same criteria — less inter-observer variation and more consistent reports.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      title: "Documented results",
      desc: "Pre- and post-cohort assessments give you a clear index for CME reporting and competency files.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      title: "Onboard every new hire",
      desc: "Reuse the program to bring each new pathologist up to your team's standard — no repeating training every time.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    }
  ];

  return (
    <section id="proposal-form-section" className="max-w-[1380px] mx-auto px-6 pb-20 pt-10 bg-[#FAF8F5] font-sans">
      
      {/* 1. Train Your Whole Team Dark Banner */}
      <div className="bg-[#110922] rounded-[32px] p-8 md:p-12 text-white shadow-2xl border border-[#201534] relative overflow-hidden mb-8">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#9A33FF] opacity-[0.15] blur-[60px] pointer-events-none rounded-full" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-bold bg-[#FAF5FF]/10 text-[#FCCA29] border border-[#FCCA29]/40 px-3.5 py-1.5 rounded-full mb-4">
              COHORT / INSTITUTIONAL
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
              Train your whole team
            </h2>
            <p className="text-[#B4ADC3] text-sm md:text-base leading-relaxed max-w-3xl">
              Run any course as a private cohort for your lab, hospital department, or training programme — shaped by your specialties, your schedule, and your reporting standards.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end gap-3 text-center lg:text-right">
            <button
              onClick={() => {
                const el = document.getElementById('scoping-scroller');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FCCA29] text-black font-extrabold text-sm rounded-full hover:bg-[#e5b422] transition duration-200 shadow-lg shadow-[#FCCA29]/10 cursor-pointer"
            >
              Request a Proposal →
            </button>
            <button
              onClick={() => window.open("https://calendly.com", "_blank")}
              className="w-full sm:w-auto px-8 py-3.5 bg-transparent border-2 border-white/40 text-white font-extrabold text-sm rounded-full hover:border-[#FCCA29] hover:text-[#FCCA29] transition duration-200 cursor-pointer"
            >
              Book a Call
            </button>
            <p className="text-[10px] text-gray-400 mt-1 font-medium italic">
              typical reply within 1 business day
            </p>
          </div>
        </div>
      </div>

      {/* 2. 4 Service Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
        {b2bServices.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-[#EBE3D8] rounded-[22px] p-6.5 flex items-center gap-5 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300"
          >
            <div className="w-[50px] h-[50px] rounded-2xl bg-[#FAF1F5] text-[#D54C80] flex items-center justify-center border border-[#F5E2EC] flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <h4 className="font-extrabold text-[#160B29] text-base flex items-center gap-2">
                <span>{service.title}</span>
                {service.badge && (
                  <span className="text-[9px] tracking-wide uppercase font-extrabold text-[#D54C80] bg-[#FAF1F5] px-2 py-0.5 rounded border border-[#F5E2EC]">
                    {service.badge}
                  </span>
                )}
              </h4>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Why Teams Choose Separator and Title */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="w-[34px] h-[2px] bg-[#FCCA29]" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A16207] font-bold">WHY TEAMS CHOOSE MENDEL</span>
          <div className="w-[34px] h-[2px] bg-[#FCCA29]" />
        </div>
        <h2 className="text-3xl md:text-[38px] font-black tracking-tight text-[#1D172A]">
          Built for departments, not just <span className="text-[#D54C80]">individuals.</span>
        </h2>
      </div>

      {/* 4. 3 Grid Why Choose Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {whyTeamsChoose.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#EBE3D8] rounded-[22px] p-8 flex flex-col justify-between shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300"
          >
            <div>
              <div className="w-[50px] h-[50px] rounded-2xl bg-[#FAF1F5] text-[#D54C80] flex items-center justify-center border border-[#F5E2EC] mb-6">
                {item.icon}
              </div>
              <h4 className="font-extrabold text-[#160B29] text-[17px] mb-3">
                {item.title}
              </h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Scoping Form Card */}
      <div id="scoping-scroller" className="bg-white border border-[#EBE3D8] rounded-[32px] overflow-hidden shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side - Dark Card */}
          <div className="lg:col-span-5 bg-[#110922] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#9A33FF] opacity-[0.1] blur-[60px] pointer-events-none rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">Let&apos;s scope your cohort</h3>
              <p className="text-[#B4ADC3] text-sm mb-8 leading-relaxed">
                Tell us a little about your team and we&apos;ll come back with a tailored plan — no obligation.
              </p>

              <ul className="space-y-4 text-xs font-semibold text-[#B4ADC3]">
                <li className="flex items-center gap-3">
                  <span className="text-[#FCCA29] text-base">✓</span>
                  A written proposal tuned to your case mix
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FCCA29] text-base">✓</span>
                  Transparent group pricing, one invoice
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FCCA29] text-base">✓</span>
                  Flexible scheduling around clinical duty
                </li>
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <span className="text-xs uppercase text-gray-400 tracking-wider block mb-4 font-semibold">Prefer to talk first?</span>
              <button 
                type="button"
                onClick={() => window.open("https://calendly.com", "_blank")}
                className="w-full py-3.5 bg-transparent border-2 border-white/30 rounded-full hover:border-[#FCCA29] hover:text-[#FCCA29] text-white font-extrabold text-sm transition duration-200 cursor-pointer"
              >
                Book a Call →
              </button>
            </div>
          </div>

          {/* Right Side - Request Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white">
            <h3 className="text-xl md:text-2xl font-black mb-2 text-[#1D172A]">Request a proposal</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-8 font-medium">We reply within one business day.</p>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-2xl text-green-500 mx-auto mb-4">✓</div>
                <h4 className="text-lg font-bold mb-2">Thank you!</h4>
                <p className="text-gray-500 text-sm">Your proposal request has been received. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Institution / Lab *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      placeholder="e.g. City General Hospital"
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Work Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({...formData, workEmail: e.target.value})}
                      placeholder="e.g. john@hospital.com"
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Your Role</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Lab Director"
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Team Size *</label>
                    <select 
                      required
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="2-5">2 to 5 pathologists</option>
                      <option value="6-10">6 to 10 pathologists</option>
                      <option value="11-20">11 to 20 pathologists</option>
                      <option value="20+">More than 20</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Course of Interest</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="grossing">Surgical Grossing Mastery</option>
                      <option value="reporting">Diagnostic Reporting Mastery</option>
                      <option value="integrated">Integrated Clinico-Diagnostic Reasoning</option>
                      <option value="custom">Multiple / Custom Package</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Anything Else?</label>
                  <textarea 
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    placeholder="Timeline, subspecialties, team size..."
                    className="w-full bg-[#FAF8F5] border border-[#EBE3D8] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FCCA29] transition resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#D54C80] hover:bg-[#b83b6b] text-white font-extrabold rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
                >
                  Request a Proposal →
                </button>

                <p className="text-center text-[10px] text-gray-400">
                  By submitting you agree to be contacted about team training. We never share your details.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CohortScopingForm;
