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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7z" />
          <path d="M9.5 12l1.8 1.8L15 10" />
        </svg>
      )
    },
    {
      title: "Documented results",
      desc: "Pre- and post-cohort assessments give you a clear index for CME reporting and competency files.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 19V5m0 14h16M8 15l3-4 3 2 4-6" />
        </svg>
      )
    },
    {
      title: "Onboard every new hire",
      desc: "Reuse the program to bring each new pathologist up to your team's standard — no repeating training every time.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 7h16M4 12h16M4 17h10" />
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      )
    }
  ];

  return (
    <section id="proposal-form-section" className="max-w-[1180px] mx-auto px-6 pb-[56px] pt-10 bg-[#FAF7F2] font-sans">
      
      {/* 1. Train Your Whole Team Dark Banner */}
      <div className="bg-gradient-to-r from-[#1E1540] to-[#150E28] rounded-[24px] p-[58px] [padding-inline:54px] text-white shadow-2xl relative overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[40px] items-center">
        {/* Subtle Watermark B2B */}
        <div className="absolute right-[-12px] bottom-[-50px] text-[10rem] font-extrabold tracking-[-0.05em] text-white/[0.05] pointer-events-none select-none">
          B2B
        </div>

        <div>
          <span className="inline-block text-[0.7rem] tracking-[0.14em] uppercase border border-[#FFC900]/40 px-[16px] py-[7px] rounded-full mb-[16px] text-[#FFC900] font-sans">
            Corporate · Institutional
          </span>
          <h2 className="text-[1.7rem] md:text-[2.4rem] font-extrabold text-white mb-[14px] tracking-tight leading-tight">
            Train your whole team
          </h2>
          <p className="text-white/78 text-[17px] leading-[1.65] max-w-[640px]">
            Run any course as a private cohort for your lab, hospital department, or training programme — shaped to your specialties, your schedule, and your reporting standards.
          </p>
        </div>

        <div className="flex flex-col gap-[12px] items-stretch min-w-[200px]">
          <button
            onClick={() => {
              const el = document.getElementById('scoping-scroller');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full px-[30px] py-[15px] bg-[#FFC900] text-[#1A1502] font-bold text-[1rem] rounded-full hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)] transition duration-200 cursor-pointer flex items-center justify-center gap-2.5"
          >
            Request a Proposal <span className="font-bold">→</span>
          </button>
          <button
            onClick={() => window.open("https://wa.me/919925511511?text=Hi%20Mendel%20Academy%2C%20I%27d%20like%20to%20discuss%20team%20training%20for%20my%20institution.", "_blank")}
            className="w-full px-[30px] py-[15px] bg-transparent border border-white/40 text-white font-bold text-[1rem] rounded-full hover:border-[#FFC900] hover:text-[#FFC900] transition duration-200 cursor-pointer flex items-center justify-center"
          >
            Book a Call
          </button>
          <p className="text-[0.66rem] tracking-[0.06em] text-white/50 mt-[14px] font-medium text-center uppercase font-sans">
            Typical reply within 1 business day
          </p>
        </div>
      </div>

      {/* 2. 4 Service Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-20">
        {b2bServices.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-[#E6E0D8] rounded-[18px] p-[28px] pl-[88px] relative flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-md transition duration-300"
          >
            <div className="absolute left-[28px] top-[28px] w-[46px] h-[46px] rounded-[13px] bg-[#F7DCE8] text-[#E0568F] flex items-center justify-center border border-[#E6E0D8] flex-shrink-0">
              {service.icon}
            </div>
            <div>
              <h4 className="font-extrabold text-[#241E3D] text-[1.36rem] flex items-center gap-2">
                <span>{service.title}</span>
                {service.badge && (
                  <span className="text-[0.64rem] tracking-[0.1em] uppercase font-semibold text-[#E0568F] bg-[#F7DCE8] px-2 py-0.5 rounded border border-[#E6E0D8]">
                    {service.badge}
                  </span>
                )}
              </h4>
              <p className="text-[#5C5575] text-[1.05rem] mt-1 leading-[1.5]">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Why Teams Choose Separator and Title */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-3 justify-center mb-4">
          <div className="w-[34px] h-[1.5px] bg-[#FFC900]" />
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#E0568F] font-bold">WHY TEAMS CHOOSE MENDEL</span>
          <div className="w-[34px] h-[1.5px] bg-[#FFC900]" />
        </div>
        <h2 className="text-3xl md:text-[2.6rem] font-extrabold tracking-tight text-[#241E3D] max-w-xl mx-auto leading-tight">
          Built for departments, not just <br />
          <span className="text-[#E0568F]">individuals.</span>
        </h2>
      </div>

      {/* 4. 3 Grid Why Choose Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] mb-20">
        {whyTeamsChoose.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-[#E6E0D8] rounded-[18px] p-[30px] flex flex-col justify-between shadow-[0_6px_20px_rgba(0,0,0,0.015)] transition duration-300 hover:shadow-md"
          >
            <div>
              <div className="w-[50px] h-[50px] rounded-[13px] bg-[#F7DCE8] text-[#E0568F] flex items-center justify-center border border-[#E6E0D8] mb-[18px]">
                {item.icon}
              </div>
              <h4 className="font-extrabold text-[#241E3D] text-[1.12rem] mb-2">
                {item.title}
              </h4>
              <p className="text-[#5C5575] text-[0.93rem] leading-[1.55]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Scoping Form Card */}
      <div id="scoping-scroller" className="bg-white border border-[#E6E0D8] rounded-[24px] overflow-hidden shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side - Dark Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1E1540] to-[#150E28] text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#E0568F] opacity-[0.1] blur-[60px] pointer-events-none rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-extrabold mb-4 leading-tight">Let&apos;s scope your cohort</h3>
              <p className="text-white/78 text-[1rem] mb-8 leading-[1.6]">
                Tell us a little about your team and we&apos;ll come back with a tailored plan — no obligation.
              </p>

              <ul className="space-y-4 text-sm font-semibold text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-[#FFC900] text-base">✓</span>
                  <span>A written proposal tuned to your case mix</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FFC900] text-base">✓</span>
                  <span>Transparent group pricing, one invoice</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FFC900] text-base">✓</span>
                  <span>Flexible scheduling around clinical duty</span>
                </li>
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
              <span className="text-xs uppercase text-white/50 tracking-wider block mb-4 font-semibold">Prefer to talk first?</span>
              <button 
                type="button"
                onClick={() => window.open("https://wa.me/919925511511?text=Hi%20Mendel%20Academy%2C%20I%27d%20like%20to%20discuss%20team%20training%20for%20my%20institution.", "_blank")}
                className="w-full py-3.5 bg-transparent border-2 border-white/30 rounded-full hover:border-[#FFC900] hover:text-[#FFC900] text-white font-extrabold text-sm transition duration-200 cursor-pointer"
              >
                Book a Call →
              </button>
            </div>
          </div>

          {/* Right Side - Request Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white">
            <h3 className="text-xl md:text-2xl font-black mb-2 text-[#241E3D]">Request a proposal</h3>
            <p className="text-[#5C5575] text-xs md:text-sm mb-8 font-medium">We reply within one business day.</p>

            {formSubmitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-2xl text-green-500 mx-auto mb-4">✓</div>
                <h4 className="text-lg font-bold mb-2">Thank you!</h4>
                <p className="text-[#5C5575] text-sm">Your proposal request has been received. Our team will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Institution / Lab *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      placeholder="e.g. City General Hospital"
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Work Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({...formData, workEmail: e.target.value})}
                      placeholder="e.g. john@hospital.com"
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Your Role</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Lab Director"
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Team Size *</label>
                    <select 
                      required
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition appearance-none"
                    >
                      <option value="">Select...</option>
                      <option value="2-5">2 to 5 pathologists</option>
                      <option value="6-10">6 to 10 pathologists</option>
                      <option value="11-20">11 to 20 pathologists</option>
                      <option value="20+">More than 20</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Course of Interest</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition appearance-none"
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
                  <label className="block text-[0.66rem] tracking-[0.08em] font-semibold uppercase text-[#5C5575] mb-2">Anything Else?</label>
                  <textarea 
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    placeholder="Timeline, subspecialties, team size..."
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-[12px] px-4 py-3 text-[#241E3D] focus:outline-none focus:border-[#E0568F] focus:ring-2 focus:ring-[#E0568F]/10 transition resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-[15px] bg-[#E0568F] hover:bg-[#B03A6C] hover:shadow-[0_12px_30px_rgba(224,86,143,0.38)] text-white font-bold rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-[1rem]"
                >
                  Request a Proposal →
                </button>

                <p className="text-center text-[0.82rem] text-[#5C5575]">
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
