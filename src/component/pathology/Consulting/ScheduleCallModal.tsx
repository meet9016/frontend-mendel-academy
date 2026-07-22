"use client";

import React, { useState, useEffect } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface ScheduleCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleCallModal = ({ isOpen, onClose }: ScheduleCallModalProps) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [purpose, setPurpose] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form states
      setName('');
      setAge('');
      setPhone('');
      setEmail('');
      setCompany('');
      setPosition('');
      setPurpose('');
      setErrors({});
      setSubmitted(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const validPhone = (v: string) => v.replace(/[^0-9]/g, '').length >= 7;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: boolean } = {};

    if (name.trim().length < 2) newErrors.name = true;
    if (!validPhone(phone)) newErrors.phone = true;
    if (!validEmail(email)) newErrors.email = true;
    if (company.trim().length < 2) newErrors.company = true;
    if (position.trim().length < 2) newErrors.position = true;
    if (purpose.trim().length < 5) newErrors.purpose = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-12 sm:pt-16 pb-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#150E28]/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className={`${FONT} relative w-full max-w-[620px] max-h-[88vh] flex flex-col bg-white rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/20`}>
        {/* Header */}
        <header className="relative p-6 sm:p-8 pb-4 bg-white flex-none">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#E6E0D8] bg-white flex items-center justify-center text-[#5C5575] text-[1.4rem] hover:bg-[#FAF7F2] hover:text-[#241E3D] transition-colors cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#241E3D] leading-tight mb-2">
            Schedule a call
          </h2>
          <p className="text-[#5C5575] text-[0.98rem] mb-4">
            Tell us a little about you and your case or project.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 font-bold text-[0.82rem] text-[#C79A00] bg-[#FFF8E3] border border-[#FFC900]/40 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFC900] flex-none" />
            We&apos;ll get back to you within 24 hours
          </div>
        </header>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto p-6 sm:p-8 pt-2 flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Name <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.name
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[0.78rem] text-[#C0392B] mt-1">Please enter your name.</span>
                  )}
                </div>

                {/* Age */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Age
                  </label>
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder=""
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D8] rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15 transition-all duration-150"
                  />
                </div>

                {/* Phone number */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Phone number <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Include country code"
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.phone
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[0.78rem] text-[#C0392B] mt-1">Please enter a valid phone number.</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Email <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.org"
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.email
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[0.78rem] text-[#C0392B] mt-1">Please enter a valid email.</span>
                  )}
                </div>

                {/* Company name / Individual */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Company name / Individual <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder=""
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.company
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.company && (
                    <span className="text-[0.78rem] text-[#C0392B] mt-1">Please enter company or individual name.</span>
                  )}
                </div>

                {/* Position */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                    Position <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder=""
                    className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.position
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.position && (
                    <span className="text-[0.78rem] text-[#C0392B] mt-1">Please enter your position.</span>
                  )}
                </div>
              </div>

              {/* Purpose of call */}
              <div className="flex flex-col pt-1">
                <label className={`${MONO} text-[0.72rem] font-bold tracking-[0.06em] text-[#5C5575] uppercase mb-1.5`}>
                  Purpose of call <span className="text-[#E0568F]">*</span>
                </label>
                <textarea
                  rows={3}
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Briefly describe your case, program, or project (2–3 lines)"
                  className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3 text-[0.95rem] text-[#241E3D] outline-none transition-all duration-150 resize-y min-h-[90px] ${
                    errors.purpose
                      ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                      : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                  }`}
                />
                {errors.purpose && (
                  <span className="text-[0.78rem] text-[#C0392B] mt-1">Please briefly describe the purpose of call.</span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className={`${FONT} w-full inline-flex items-center justify-center gap-2 font-bold text-[1.05rem] px-8 py-4 rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-180 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(255,201,0,0.35)] cursor-pointer`}
                >
                  Send request <span className="font-normal">→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#E0568F] text-white flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-2xl font-extrabold text-[#241E3D] mb-2">
                Request Sent!
              </h3>
              <p className="text-[#5C5575] text-[0.98rem] max-w-[420px] mx-auto leading-relaxed mb-6">
                Thank you — we&apos;ve received your request. Dr. Managoli&apos;s team will reach out to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className={`${FONT} inline-flex items-center gap-2 font-bold text-[0.95rem] px-6 py-2.5 rounded-full bg-[#241E3D] text-white hover:bg-[#342C54] transition-colors cursor-pointer`}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCallModal;
