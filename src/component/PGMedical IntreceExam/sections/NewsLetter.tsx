// NewsLetter.tsx
import React, { useState } from 'react';
import { FaArrowRight, FaCalendar, FaCheckCircle, FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import { newsLatterSchema } from '@/validationSchema/validationSchema';
import CommonButton from '@/comman/Button';

// NewsLetter.types.ts
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  medicalSchool: string;
  graduationYear: string;
}

export type FormErrors = Partial<Record<keyof FormData, string>>;
const NewsLetter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    medicalSchool: '',
    graduationYear: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (): boolean => {
    const { error } = newsLatterSchema.validate(formData, { abortEarly: false });
    if (!error) return true;

    const newErrors: FormErrors = {};
    error.details.forEach((detail) => {
      const key = detail.path[0] as keyof FormData;
      newErrors[key] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const body = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        medical_school: formData.medicalSchool,
        graduation_year: formData.graduationYear,
      };

      const res = await api.post(`${endPointApi.userRagisterCreate}`, body);
      toast.success(res.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        medicalSchool: '',
        graduationYear: '',
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-10 bg-[#f9fafb]">
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            title="Start Your Journey Today"
            subtitle="Fill in your details and take the first step towards USMLE success"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <RegistrationForm
              formData={formData}
              errors={errors}
              loading={loading}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />

            <div className="h-full space-y-8 flex flex-col justify-between">
              <ContactCard />
              <BenefitsCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

// Section Header
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-10 text-center">
    <h2 className="mb-3 text-4xl font-bold ff-font-bold md:text-5xl">{title}</h2>
    <p className="mx-auto max-w-2xl text-xl ff-font">{subtitle}</p>
  </div>
);

// Registration Form
const RegistrationForm = ({
  formData,
  errors,
  loading,
  onChange,
  onSubmit,
}: {
  formData: FormData;
  errors: FormErrors;
  loading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}) => (
  <div className="h-full flex flex-col justify-between rounded-3xl border border-primary bg-white p-8 shadow-xl md:p-10">
    <div className="space-y-6 flex-1">
      <div className="grid gap-4 md:grid-cols-2">
        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={onChange} error={errors.firstName} icon={<FaUser />} />
        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={onChange} error={errors.lastName} icon={<FaUser />} />
      </div>

      <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={onChange} error={errors.email} icon={<FaEnvelope />} />
      <InputField label="Medical School" name="medicalSchool" value={formData.medicalSchool} onChange={onChange} error={errors.medicalSchool} icon={<FaEnvelope />} />
      <InputField label="Graduation Year" name="graduationYear" value={formData.graduationYear} onChange={onChange} error={errors.graduationYear} icon={<FaCalendar />} />
    </div>

    <div>
      <CommonButton onClick={onSubmit} pyClass="py-3" pxClass="px-44" fontWeight={700} fontSize={14} className="mt-8">
        <div className="flex items-center gap-2">
          <span>Register Now</span>
          <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CommonButton>
      <p className="text-center text-sm text-gray-500 mt-3">By registering, you agree to our terms and conditions</p>
    </div>
  </div>
);

// Input Field
const InputField = ({ label, name, type = 'text', value, onChange, error, icon }: any) => (
  <div className="space-y-2">
    <label htmlFor={name} className="flex items-center gap-2 font-medium ff-font">
      {icon}
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="h-12 w-full rounded-lg px-3 border-2 border-gray-200 focus:border-[#FFCA00] outline-none"
    />
    {error && <p className="text-red-500 text-sm">{error}</p>}
  </div>
);

// Contact Card
const ContactCard = () => (
  <div className="rounded-3xl border border-primary bg-white p-8 shadow-lg">
    <h3 className="mb-6 text-2xl font-bold ff-font-bold">Need Help?</h3>
    <div className="space-y-4">
      <ContactRow icon={<FaPhone />} label="Call us at" value="+91-99255-11631" href="tel:+919925511631" />
      <ContactRow icon={<FaEnvelope />} label="Email us at" value="ask@mendalacademy.com" href="mailto:ask@mendalacademy.com" />
    </div>
  </div>
);

// Contact Row
const ContactRow = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) => (
  <div className="flex items-center gap-4 rounded-xl border-primary p-4">
    <div className="flex size-12 items-center justify-center rounded-full bg-white border-primary">{icon}</div>
    <div>
      <p className="text-sm ff-font">{label}</p>
      <a href={href} className="text-lg font-bold text-primary ff-font-bold hover:underline">
        {value}
      </a>
    </div>
  </div>
);

// Benefits Card
const BenefitsCard = () => {
  const benefits = [
    'Early bird pricing available',
    'Limited seats per batch',
    'Personal guidance from Dr. Managed',
    'Access to exclusive study materials',
    'Join our community of successful students',
  ];

  return (
    <div className="rounded-3xl border border-primary bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold ff-font-bold">Why Register Now?</h3>
      <ul className="space-y-4">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffca00]">
              <FaCheckCircle className="text-sm text-white" />
            </div>
            <span className="ff-font">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};