"use client";

import React, { useState, useEffect } from 'react';

const FONT = "font-['-apple-system',BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue','Segoe_UI',Roboto,sans-serif]";
const MONO = "font-['SF_Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace]";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal = ({ isOpen, onClose }: ApplyModalProps) => {
  // Step 1: About You
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');

  // Step 2: Qualifications
  const [qualification, setQualification] = useState('');
  const [qualificationOther, setQualificationOther] = useState('');
  const [registrationNo, setRegistrationNo] = useState('');
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  // Step 3: Practice
  const [designation, setDesignation] = useState('');
  const [institution, setInstitution] = useState('');
  const [institutionType, setInstitutionType] = useState('');
  const [institutionTypeOther, setInstitutionTypeOther] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [specialityOther, setSpecialityOther] = useState('');
  const [yearsOfPractice, setYearsOfPractice] = useState('');
  const [casesPerMonth, setCasesPerMonth] = useState('');

  // Step 4: Goals & Files
  const [motivation, setMotivation] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [referralSource, setReferralSource] = useState('');
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset form states
      setFullName('');
      setEmail('');
      setPhone('');
      setLocation('');
      setQualification('');
      setQualificationOther('');
      setRegistrationNo('');
      setCertificateFile(null);
      setDesignation('');
      setInstitution('');
      setInstitutionType('');
      setInstitutionTypeOther('');
      setSpeciality('');
      setSpecialityOther('');
      setYearsOfPractice('');
      setCasesPerMonth('');
      setMotivation('');
      setCvFile(null);
      setReferralSource('');
      setConsent(false);
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

    // Step 1 validation
    if (fullName.trim().length < 2) newErrors.fullName = true;
    if (!validEmail(email)) newErrors.email = true;
    if (!validPhone(phone)) newErrors.phone = true;
    if (location.trim().length < 2) newErrors.location = true;

    // Step 2 validation
    if (!qualification) newErrors.qualification = true;
    if (qualification === '__other' && qualificationOther.trim().length < 2) newErrors.qualificationOther = true;
    if (!certificateFile) {
      newErrors.certificate = true;
    } else if (certificateFile.size > MAX_FILE_SIZE) {
      newErrors.certificateSize = true;
    }

    // Step 3 validation
    if (designation.trim().length < 2) newErrors.designation = true;
    if (institution.trim().length < 2) newErrors.institution = true;
    if (!institutionType) newErrors.institutionType = true;
    if (institutionType === '__other' && institutionTypeOther.trim().length < 2) newErrors.institutionTypeOther = true;
    if (!speciality) newErrors.speciality = true;
    if (speciality === '__other' && specialityOther.trim().length < 2) newErrors.specialityOther = true;
    if (!yearsOfPractice) newErrors.yearsOfPractice = true;
    if (!casesPerMonth) newErrors.casesPerMonth = true;

    // Step 4 validation
    if (motivation.trim().length < 40) newErrors.motivation = true;
    if (cvFile && cvFile.size > MAX_FILE_SIZE) newErrors.cvSize = true;
    if (!consent) newErrors.consent = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Find the first error element and scroll to it
      const firstErrKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`ap-${firstErrKey}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
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
      <div className={`${FONT} relative w-full max-w-[840px] max-h-[84vh] flex flex-col bg-[#FAF7F2] rounded-[24px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-white/10`}>
        {/* Header */}
        <header className="flex items-center justify-between gap-5 p-[26px_36px] bg-[#150E28] text-white border-b border-white/10 flex-none">
          <div>
            <span className={`${MONO} block text-[0.66rem] tracking-[0.16em] uppercase text-[#FFC900] mb-1.5 font-bold`}>
              12-MONTH VIRTUAL FELLOWSHIP · SEATS ARE LIMITED
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Fellowship Application
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
        <div className="overflow-y-auto p-[30px_32px_34px] flex-1">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="space-y-8">
              {/* SECTION 1: About you */}
              <fieldset className="border-0 p-0 m-0 space-y-4">
                <legend className="flex items-baseline gap-3 w-full pb-3.5 mb-4 border-b border-[#E6E0D8]">
                  <span className={`${MONO} text-[0.7rem] font-bold tracking-[0.1em] text-[#C79A00]`}>01</span>
                  <span className="text-[1.12rem] font-extrabold text-[#241E3D]">About you</span>
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                  {/* Full Name */}
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Full name <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Dr. Jane Doe"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.fullName ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    {errors.fullName && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter your full name.</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Email <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@hospital.org"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.email ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    {errors.email && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter a valid email address.</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Phone number <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Include country code"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.phone ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    {errors.phone && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter a valid phone number.</span>
                    )}
                  </div>

                  {/* City & Country */}
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      City &amp; country <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, Country"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.location ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    <span className="text-[0.8rem] text-[#5C5575] mt-1.5">Helps us schedule live vMTBs across time zones.</span>
                    {errors.location && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please tell us where you&apos;re based.</span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* SECTION 2: Qualifications */}
              <fieldset className="border-0 p-0 m-0 space-y-4">
                <legend className="flex items-baseline gap-3 w-full pb-3.5 mb-4 border-b border-[#E6E0D8]">
                  <span className={`${MONO} text-[0.7rem] font-bold tracking-[0.1em] text-[#C79A00]`}>02</span>
                  <span className="text-[1.12rem] font-extrabold text-[#241E3D]">Qualifications</span>
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                  {/* Highest Qualification */}
                  <div className="flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Highest qualification <span className="text-[#E0568F]">*</span>
                    </label>
                    <select
                      id="ap-qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                        errors.qualification ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    >
                      <option value="" disabled>Select…</option>
                      <optgroup label="Primary medical degree">
                        <option value="MBBS / MBChB / MBBCh">MBBS / MBChB / MBBCh</option>
                        <option value="MD — Doctor of Medicine (US / Canada)">MD — Doctor of Medicine (US / Canada)</option>
                        <option value="DO — Doctor of Osteopathic Medicine (US)">DO — Doctor of Osteopathic Medicine (US)</option>
                      </optgroup>
                      <optgroup label="India &amp; South Asia">
                        <option value="MD — Pathology">MD — Pathology</option>
                        <option value="MD — Other speciality">MD — Other speciality</option>
                        <option value="MS">MS</option>
                        <option value="DNB — Pathology">DNB — Pathology</option>
                        <option value="DNB — Other speciality">DNB — Other speciality</option>
                        <option value="DM / MCh">DM / MCh</option>
                        <option value="DCP — Diploma in Clinical Pathology">DCP — Diploma in Clinical Pathology</option>
                      </optgroup>
                      <optgroup label="United States &amp; Canada">
                        <option value="Residency — Anatomic and/or Clinical Pathology">Residency — Anatomic and/or Clinical Pathology</option>
                        <option value="ABPath board certified — AP / CP / AP-CP">ABPath board certified — AP / CP / AP-CP</option>
                        <option value="ABPath subspeciality (e.g. Molecular Genetic Pathology)">ABPath subspeciality (e.g. Molecular Genetic Pathology)</option>
                        <option value="FCAP — Fellow, College of American Pathologists">FCAP — Fellow, College of American Pathologists</option>
                        <option value="FRCPC — Pathology (Canada)">FRCPC — Pathology (Canada)</option>
                      </optgroup>
                      <optgroup label="United Kingdom &amp; Ireland">
                        <option value="MRCPath">MRCPath</option>
                        <option value="FRCPath">FRCPath</option>
                        <option value="CCT — Histopathology">CCT — Histopathology</option>
                      </optgroup>
                      <optgroup label="Europe">
                        <option value="Facharzt / national specialist title — Pathology">Facharzt / national specialist title — Pathology</option>
                        <option value="European Board of Pathology (UEMS)">European Board of Pathology (UEMS)</option>
                      </optgroup>
                      <optgroup label="Australia &amp; New Zealand">
                        <option value="FRCPA — Royal College of Pathologists of Australasia">FRCPA — Royal College of Pathologists of Australasia</option>
                      </optgroup>
                      <optgroup label="Middle East, Africa &amp; other regions">
                        <option value="Arab Board — Pathology">Arab Board — Pathology</option>
                        <option value="FCPath / national specialist board — Pathology">FCPath / national specialist board — Pathology</option>
                      </optgroup>
                      <optgroup label="Research &amp; academic">
                        <option value="PhD">PhD</option>
                        <option value="MD/PhD">MD/PhD</option>
                        <option value="MSc">MSc</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="Fellowship (other)">Fellowship (other)</option>
                        <option value="__other">Other (please specify)</option>
                      </optgroup>
                    </select>
                    {errors.qualification && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please select your highest qualification.</span>
                    )}
                  </div>

                  {/* Licence No */}
                  <div className="flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Medical licence / registration no.
                    </label>
                    <input
                      type="text"
                      value={registrationNo}
                      onChange={(e) => setRegistrationNo(e.target.value)}
                      placeholder="Optional — council or state licence"
                      className="w-full bg-white border border-[#E6E0D8] rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15 transition-all"
                    />
                  </div>

                  {/* QualificationOther specification */}
                  {qualification === '__other' && (
                    <div className="md:col-span-2 flex flex-col">
                      <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                        Your qualification <span className="text-[#E0568F]">*</span>
                      </label>
                      <input
                        id="ap-qualificationOther"
                        type="text"
                        value={qualificationOther}
                        onChange={(e) => setQualificationOther(e.target.value)}
                        placeholder="Type your highest qualification"
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                          errors.qualificationOther ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                        } focus:ring-4`}
                      />
                      {errors.qualificationOther && (
                        <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please tell us your qualification.</span>
                      )}
                    </div>
                  )}

                  {/* Upload Certificate File */}
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Highest qualification certificate <span className="text-[#E0568F]">*</span>
                    </label>
                    <div
                      className={`relative flex items-center gap-3.5 border border-dashed rounded-xl px-4 py-3 bg-white transition-all ${
                        errors.certificate || errors.certificateSize ? 'border-[#C0392B]' : 'border-[#E6E0D8]'
                      }`}
                    >
                      <span className="bg-[#E6E0D8]/40 hover:bg-[#E6E0D8]/70 text-[#241E3D] font-bold text-[0.9rem] rounded-md px-3.5 py-1.5 cursor-pointer flex-none">
                        Choose file
                      </span>
                      <span className="text-[0.9rem] text-[#5C5575] truncate">
                        {certificateFile ? certificateFile.name : 'No file selected'}
                      </span>
                      <input
                        id="ap-certificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setCertificateFile(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                    <span className="text-[0.8rem] text-[#5C5575] mt-1.5">PDF, JPG or PNG · max 5 MB</span>
                    {(errors.certificate || errors.certificateSize) && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">
                        {errors.certificateSize ? 'File must be under 5 MB.' : 'Please attach your certificate.'}
                      </span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* SECTION 3: Your practice */}
              <fieldset className="border-0 p-0 m-0 space-y-4">
                <legend className="flex items-baseline gap-3 w-full pb-3.5 mb-4 border-b border-[#E6E0D8]">
                  <span className={`${MONO} text-[0.7rem] font-bold tracking-[0.1em] text-[#C79A00]`}>03</span>
                  <span className="text-[1.12rem] font-extrabold text-[#241E3D]">Your practice</span>
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                  {/* Position */}
                  <div className="flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Position / designation <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-designation"
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="Consultant Pathologist"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.designation ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    {errors.designation && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter your position.</span>
                    )}
                  </div>

                  {/* Institution */}
                  <div className="flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Institution / place of work <span className="text-[#E0568F]">*</span>
                    </label>
                    <input
                      id="ap-institution"
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="Hospital, lab or university"
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                        errors.institution ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    {errors.institution && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please enter your institution.</span>
                    )}
                  </div>

                  {/* Type of Institution */}
                  <div className="flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Type of institution <span className="text-[#E0568F]">*</span>
                    </label>
                    <select
                      id="ap-institutionType"
                      value={institutionType}
                      onChange={(e) => setInstitutionType(e.target.value)}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                        errors.institutionType ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    >
                      <option value="" disabled>Select…</option>
                      <option value="Private practice / independent lab">Private practice / independent lab</option>
                      <option value="Diagnostic chain">Diagnostic chain</option>
                      <option value="Corporate / private hospital">Corporate / private hospital</option>
                      <option value="Government hospital">Government hospital</option>
                      <option value="Medical college / university">Medical college / university</option>
                      <option value="Research institute">Research institute</option>
                      <option value="Cancer centre">Cancer centre</option>
                      <option value="__other">Other (please specify)</option>
                    </select>
                    {errors.institutionType && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please select the type of institution.</span>
                    )}
                  </div>

                  {/* Speciality */}
                  <div className="flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Speciality <span className="text-[#E0568F]">*</span>
                    </label>
                    <select
                      id="ap-speciality"
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                        errors.speciality ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    >
                      <option value="" disabled>Select…</option>
                      <optgroup label="Pathology">
                        <option value="Oncopathology">Oncopathology</option>
                        <option value="Molecular pathology">Molecular pathology</option>
                        <option value="Histopathology">Histopathology</option>
                      </optgroup>
                      <optgroup label="Oncology">
                        <option value="Medical oncology">Medical oncology</option>
                        <option value="Surgical oncology">Surgical oncology</option>
                        <option value="Radiation oncology">Radiation oncology</option>
                        <option value="Radiology">Radiology</option>
                        <option value="Hemato-oncology">Hemato-oncology</option>
                        <option value="Paediatric oncology">Paediatric oncology</option>
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

                  {/* InstitutionTypeOther specification */}
                  {institutionType === '__other' && (
                    <div className="md:col-span-2 flex flex-col">
                      <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                        Type of institution <span className="text-[#E0568F]">*</span>
                      </label>
                      <input
                        id="ap-institutionTypeOther"
                        type="text"
                        value={institutionTypeOther}
                        onChange={(e) => setInstitutionTypeOther(e.target.value)}
                        placeholder="Describe your place of work"
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                          errors.institutionTypeOther ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                        } focus:ring-4`}
                      />
                      {errors.institutionTypeOther && (
                        <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please describe your place of work.</span>
                      )}
                    </div>
                  )}

                  {/* SpecialityOther specification */}
                  {speciality === '__other' && (
                    <div className="md:col-span-2 flex flex-col">
                      <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                        Your sub-speciality <span className="text-[#E0568F]">*</span>
                      </label>
                      <input
                        id="ap-specialityOther"
                        type="text"
                        value={specialityOther}
                        onChange={(e) => setSpecialityOther(e.target.value)}
                        placeholder="Type your sub-speciality"
                        className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 ${
                          errors.specialityOther ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                        } focus:ring-4`}
                      />
                      {errors.specialityOther && (
                        <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please tell us your sub-speciality.</span>
                      )}
                    </div>
                  )}

                  {/* Years of Practice */}
                  <div className="flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Years of practice <span className="text-[#E0568F]">*</span>
                    </label>
                    <select
                      id="ap-yearsOfPractice"
                      value={yearsOfPractice}
                      onChange={(e) => setYearsOfPractice(e.target.value)}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                        errors.yearsOfPractice ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    >
                      <option value="" disabled>Select…</option>
                      <option value="In training / residency">In training / residency</option>
                      <option value="Less than 1 year">Less than 1 year</option>
                      <option value="1–3 years">1–3 years</option>
                      <option value="4–6 years">4–6 years</option>
                      <option value="7–10 years">7–10 years</option>
                      <option value="11–15 years">11–15 years</option>
                      <option value="16–20 years">16–20 years</option>
                      <option value="More than 20 years">More than 20 years</option>
                    </select>
                    {errors.yearsOfPractice && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please select your years of practice.</span>
                    )}
                  </div>

                  {/* Approx Cases per month */}
                  <div className="flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Approx. cases per month <span className="text-[#E0568F]">*</span>
                    </label>
                    <select
                      id="ap-casesPerMonth"
                      value={casesPerMonth}
                      onChange={(e) => setCasesPerMonth(e.target.value)}
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none transition-all duration-150 appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer ${
                        errors.casesPerMonth ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    >
                      <option value="" disabled>Select…</option>
                      <option value="Fewer than 50">Fewer than 50</option>
                      <option value="50–100">50–100</option>
                      <option value="101–250">101–250</option>
                      <option value="251–500">251–500</option>
                      <option value="501–1,000">501–1,000</option>
                      <option value="More than 1,000">More than 1,000</option>
                    </select>
                    {errors.casesPerMonth && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">Please select your approximate case load.</span>
                    )}
                  </div>
                </div>
              </fieldset>

              {/* SECTION 4: Your goals */}
              <fieldset className="border-0 p-0 m-0 space-y-4">
                <legend className="flex items-baseline gap-3 w-full pb-3.5 mb-4 border-b border-[#E6E0D8]">
                  <span className={`${MONO} text-[0.7rem] font-bold tracking-[0.1em] text-[#C79A00]`}>04</span>
                  <span className="text-[1.12rem] font-extrabold text-[#241E3D]">Your goals</span>
                </legend>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
                  {/* Why join fellowship */}
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      Why do you want to join this fellowship? <span className="text-[#E0568F]">*</span>
                    </label>
                    <textarea
                      id="ap-motivation"
                      value={motivation}
                      maxLength={800}
                      onChange={(e) => setMotivation(e.target.value)}
                      placeholder="What you want to change about your practice, the cases you find hardest, and where you want to be in 12 months."
                      className={`w-full bg-white border rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none min-h-[110px] resize-vertical leading-[1.55] transition-all duration-150 ${
                        errors.motivation ? 'border-[#C0392B] focus:ring-[#C0392B]/12' : 'border-[#E6E0D8] focus:border-[#E0568F] focus:ring-[#E0568F]/15'
                      } focus:ring-4`}
                    />
                    <div className={`${MONO} text-[0.7rem] text-[#5C5575] text-right mt-1.5`}>
                      <span>{motivation.length}</span>/800
                    </div>
                    {errors.motivation && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-0.5">Please tell us a little about your goals (at least 40 characters).</span>
                    )}
                  </div>

                  {/* CV Upload */}
                  <div className="md:col-span-2 flex flex-col">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      CV / résumé
                    </label>
                    <div
                      className={`relative flex items-center gap-3.5 border border-dashed rounded-xl px-4 py-3 bg-white transition-all ${
                        errors.cvSize ? 'border-[#C0392B]' : 'border-[#E6E0D8]'
                      }`}
                    >
                      <span className="bg-[#E6E0D8]/40 hover:bg-[#E6E0D8]/70 text-[#241E3D] font-bold text-[0.9rem] rounded-md px-3.5 py-1.5 cursor-pointer flex-none">
                        Choose file
                      </span>
                      <span className="text-[0.9rem] text-[#5C5575] truncate">
                        {cvFile ? cvFile.name : 'Optional — PDF or DOC'}
                      </span>
                      <input
                        id="ap-cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setCvFile(file);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </div>
                    {errors.cvSize && (
                      <span className="text-[0.8rem] text-[#C0392B] mt-1.5">File must be under 5 MB.</span>
                    )}
                  </div>

                  {/* How did you hear about us */}
                  <div className="md:col-span-2 flex flex-col relative">
                    <label className={`${MONO} text-[0.68rem] tracking-[0.12em] uppercase text-[#5C5575] font-semibold mb-2`}>
                      How did you hear about us?
                    </label>
                    <select
                      value={referralSource}
                      onChange={(e) => setReferralSource(e.target.value)}
                      className={`w-full bg-white border border-[#E6E0D8] rounded-xl px-4 py-3 text-[1rem] text-[#241E3D] outline-none appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235C5575' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[position:right_14px_center] bg-[size:17px] pr-[44px] cursor-pointer focus:border-[#E0568F] focus:ring-4 focus:ring-[#E0568F]/15 transition-all`}
                    >
                      <option value="">Select…</option>
                      <option value="Colleague or referral">Colleague or referral</option>
                      <option value="A current or past fellow">A current or past fellow</option>
                      <option value="Social media">Social media</option>
                      <option value="Search engine">Search engine</option>
                      <option value="Conference or CME">Conference or CME</option>
                      <option value="Email from Mendel Academy">Email from Mendel Academy</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* Consent Checkbox */}
              <div className="flex flex-col gap-1 mt-6">
                <label className="flex items-start gap-3 cursor-pointer text-[0.92rem] text-[#5C5575] leading-relaxed">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-[22px] h-[22px] rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    consent ? 'bg-[#E0568F] border-[#E0568F] text-white' : 'border-[#E6E0D8] bg-white'
                  }`}>
                    {consent && <span className="text-xs font-bold">✓</span>}
                  </div>
                  <span>
                    I confirm the information above is accurate, and I agree to be contacted by Mendel Academy about my application.{' '}
                    <span className="text-[#E0568F] font-bold">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <span className="text-[0.8rem] text-[#C0392B] pl-[34px]">Please confirm to continue.</span>
                )}
              </div>

              {/* Footer Submit */}
              <div className="flex items-center justify-end gap-4 pt-6 mt-6 border-t border-[#E6E0D8]">
                <button
                  type="submit"
                  className={`${FONT} w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold text-[0.95rem] px-8 py-3.5 rounded-full bg-[#E0568F] text-white transition-all duration-150 hover:bg-[#B03A6C] hover:-translate-y-0.5`}
                >
                  Submit Application <span className="font-normal">→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-[62px] h-[62px] rounded-full bg-[#E0568F] text-white flex items-center justify-center text-[2rem] font-bold mx-auto mb-4">
                ✓
              </div>
              <h3 className="text-[1.5rem] font-extrabold text-[#241E3D] mb-2.5">
                Application received.
              </h3>
              <p className="text-[#5C5575] text-[0.98rem] max-w-[460px] mx-auto leading-relaxed">
                Thank you. Our team will review your application and get in touch within a few working days to arrange your 20-minute conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
