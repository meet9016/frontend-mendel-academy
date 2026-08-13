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

  return (
    <section id="proposal-form-section" className="max-w-[1380px] mx-auto px-6 pb-20 pt-10 bg-[#FAF8F5] font-sans">
      <div className="bg-white border border-[#EBE8E2] rounded-3xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Side - Dark Card */}
          <div className="lg:col-span-5 bg-[#150E28] text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">Let's scope your cohort</h3>
              <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
                Tell us a little about your team and we'll come back with a tailored plan — no obligation.
              </p>

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="text-[#FFC900] font-bold">✓</span>
                  A written proposal tuned to your case mix
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FFC900] font-bold">✓</span>
                  Transparent group pricing, one invoice
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#FFC900] font-bold">✓</span>
                  Flexible scheduling around clinical duty
                </li>
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="text-xs uppercase text-gray-400 tracking-wider block mb-4">Prefer to talk first?</span>
              <button 
                type="button"
                onClick={() => window.open("https://calendly.com", "_blank")}
                className="w-full py-3 bg-transparent border border-white/30 rounded-full hover:border-[#FFC900] hover:text-[#FFC900] text-white font-bold text-sm transition duration-200 cursor-pointer"
              >
                Book a Call →
              </button>
            </div>
          </div>

          {/* Right Side - Request Form */}
          <div className="lg:col-span-7 p-8 md:p-12 bg-white">
            <h3 className="text-xl md:text-2xl font-black mb-2 text-[#1D172A]">Request a proposal</h3>
            <p className="text-gray-500 text-xs md:text-sm mb-8">We reply within one business day.</p>

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
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Dr. John Doe"
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Institution / Lab *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.institution}
                      onChange={(e) => setFormData({...formData, institution: e.target.value})}
                      placeholder="e.g. City General Hospital"
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Work Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({...formData, workEmail: e.target.value})}
                      placeholder="e.g. john@hospital.com"
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Your Role</label>
                    <input 
                      type="text" 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      placeholder="e.g. Lab Director"
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Team Size *</label>
                    <select 
                      required
                      value={formData.teamSize}
                      onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition"
                    >
                      <option value="">Select...</option>
                      <option value="2-5">2 to 5 pathologists</option>
                      <option value="6-10">6 to 10 pathologists</option>
                      <option value="11-20">11 to 20 pathologists</option>
                      <option value="20+">More than 20</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Course of Interest</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData({...formData, course: e.target.value})}
                      className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition"
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
                  <label className="block text-[11px] font-extrabold uppercase text-gray-400 tracking-wider mb-2">Anything Else?</label>
                  <textarea 
                    rows={3}
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                    placeholder="Timeline, subspecialties, team size..."
                    className="w-full bg-[#FAF8F5] border border-[#EBE8E2] rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#FFC900] transition resize-none" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#D54C80] hover:bg-[#b83b6b] text-white font-bold rounded-full transition duration-200 flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
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
