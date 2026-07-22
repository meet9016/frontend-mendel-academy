"use client";

import React, { useState, useEffect } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface CohortModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CohortModal = ({ isOpen, onClose }: CohortModalProps) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [otherSpeciality, setOtherSpeciality] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form states
      setFullName('');
      setPhone('');
      setEmail('');
      setSpeciality('');
      setOtherSpeciality('');
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

    if (fullName.trim().length < 2) newErrors.fullName = true;
    if (!validPhone(phone)) newErrors.phone = true;
    if (!validEmail(email)) newErrors.email = true;
    if (!speciality) newErrors.speciality = true;
    if (speciality === '__other' && otherSpeciality.trim().length < 2) newErrors.otherSpeciality = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Success
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 pt-16 sm:pt-20 pb-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#150E28]/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className={`${FONT} relative w-full max-w-[860px] max-h-[84vh] flex flex-col bg-[#FAF7F2] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/10`}>
        {/* Header */}
        <header className="flex items-center justify-between gap-5 p-[28px_36px] bg-[#150E28] text-white border-b border-white/10 flex-none">
          <div>
            <span className={`${MONO} block text-[0.66rem] tracking-[0.16em] uppercase text-[#FFC900] mb-2 font-bold`}>
              LIVE · EVERY MONTH · VIRTUAL MOLECULAR TUMOR BOARDS
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Join the Next Cohort
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex-none w-[36px] h-[36px] rounded-full border border-white/25 flex items-center justify-center text-white text-[1.5rem] hover:bg-white/10 hover:border-[#FFC900] transition-colors cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
        </header>

        {/* Body */}
        <div className="overflow-y-auto p-[36px_40px] flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                {/* Full Name */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                    Full name <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.fullName
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.fullName && (
                    <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter your full name.</span>
                  )}
                </div>

                {/* Phone Number */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                    Phone number <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Include country code"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.phone
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter a valid phone number.</span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col">
                  <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                    Email <span className="text-[#E0568F]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.org"
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                      errors.email
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter a valid email address.</span>
                  )}
                </div>

                {/* Speciality */}
                <div className="md:col-span-2 flex flex-col relative">
                  <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                    Speciality <span className="text-[#E0568F]">*</span>
                  </label>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                      errors.speciality
                        ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                        : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                    }`}
                  >
                    <option value="" disabled>Select your speciality…</option>
                    <optgroup label="Oncology">
                      <option value="Medical oncology">Medical oncology</option>
                      <option value="Surgical oncology">Surgical oncology</option>
                      <option value="Radiation oncology">Radiation oncology</option>
                      <option value="Radiology">Radiology</option>
                      <option value="Hemato-oncology">Hemato-oncology</option>
                      <option value="Paediatric oncology">Paediatric oncology</option>
                    </optgroup>
                    <optgroup label="Pathology">
                      <option value="Oncopathology">Oncopathology</option>
                      <option value="Molecular pathology">Molecular pathology</option>
                      <option value="Histopathology">Histopathology</option>
                    </optgroup>
                    <optgroup label="Sub-speciality focus">
                      <option value="Breast oncology">Breast oncology</option>
                      <option value="Gynaecologic oncology (GY)">Gynaecologic oncology (GY)</option>
                      <option value="Genitourinary oncology (GU)">Genitourinary oncology (GU)</option>
                      <option value="Hepato-oncology">Hepato-oncology</option>
                      <option value="Obstetrics &amp; gynaecology (OB)">Obstetrics &amp; gynaecology (OB)</option>
                      <option value="Thoracic oncology">Thoracic oncology</option>
                      <option value="Gastrointestinal oncology">Gastrointestinal oncology</option>
                      <option value="Neuro-oncology">Neuro-oncology</option>
                      <option value="Head &amp; neck oncology">Head &amp; neck oncology</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="Physician / internal medicine">Physician / internal medicine</option>
                      <option value="__other">Other sub-speciality (please specify)</option>
                    </optgroup>
                  </select>
                  {errors.speciality && (
                    <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please select your speciality.</span>
                  )}
                </div>

                {/* Other Speciality input */}
                {speciality === '__other' && (
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Your sub-speciality <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      type="text"
                      value={otherSpeciality}
                      onChange={(e) => setOtherSpeciality(e.target.value)}
                      placeholder="Type your sub-speciality"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.otherSpeciality
                          ? 'border-[#C0392B] focus:border-[#C0392B] focus:ring-4 focus:ring-[#C0392B]/12'
                          : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15'
                      }`}
                    />
                    {errors.otherSpeciality && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please tell us your sub-speciality.</span>
                    )}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-4 mt-6 pt-5 border-t border-[#E6E0D8]">
                <button
                  type="submit"
                  className={`${FONT} inline-flex items-center gap-2 font-bold text-[0.95rem] px-6 py-3 rounded-full bg-[#FFC900] text-[#1A1502] transition-all duration-150 hover:-translate-y-0.5`}
                >
                  Join the Cohort <span className="font-normal">→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6">
              <div className="w-[62px] h-[62px] rounded-full bg-[#E0568F] text-white flex items-center justify-center text-[2rem] font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-[#241E3D] mb-2.5">
                You&apos;re on the list.
              </h3>
              <p className="text-[#5C5575] text-[0.98rem] max-w-[460px] mx-auto leading-relaxed">
                Thank you — we&apos;ve received your details. Our team will reach out shortly with cohort dates and next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CohortModal;
