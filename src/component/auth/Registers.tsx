"use client";
import CommonButton from "@/comman/Button";
import InputField from "@/comman/InputField";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { saveToken, saveUserId } from "@/utils/tokenManager";
import { registerSchema } from "@/validationSchema/validationSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { MdPhone } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";

/* ----------  TYPES  ---------- */
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
type Social = { icon: React.ReactNode; label: string; onClick?: () => void };

/* ----------  MAIN COMPONENT  ---------- */
export default function Registers() {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    const { error } = registerSchema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors: Partial<FormData> = {};
      error.details.forEach((d) => (newErrors[d.path[0] as keyof FormData] = d.message));
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post(endPointApi.register, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response?.data) {
        // Save token
        if (response.data.token?.access) {
          saveToken(response.data.token.access);
        }

        // Save user ID
        if (response.data.user?._id) {
          saveUserId(response.data.user._id);
          console.log("✅ User registered with ID:", response.data.user._id);
        }

        SuccessToast(response.data.message || "Registration successful!");

        // Small delay to ensure localStorage is updated
        setTimeout(() => {
          router.push("/");
        }, 100);
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      ErrorToast(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={startAnimation ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center overflow-hidden bg-white lg:min-h-screen py-4 sm:py-6 lg:py-0"
    >
      {/* ----------  LEFT PANEL: SIGN-UP PROMPT  ---------- */}
      <div
        className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-8 md:p-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm text-black">
          <h2 className="text-2xl font-extrabold ff-font-bold mb-4">Create Your Account Today!</h2>
          <p className="ff-font text-lg mb-8">Join Mendel Academy and Start Your Extraordinary Educational Journey</p>
          <button
            onClick={() => {
              setStartAnimation(true);
              setTimeout(() => router.push("/auth/login"), 700);
            }}
            className="w-48 py-3 px-6 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            LOG IN
          </button>
        </div>
      </div>

      {/* ----------  RIGHT PANEL: SIGN-UP FORM  ---------- */}
      <div className="w-full lg:w-1/2 bg-white relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm p-6 sm:p-8 md:p-10 relative z-10 border-2 border-primary">
          <Header />
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <NameFields formData={formData} errors={errors} onChange={handleChange} />
            <EmailField value={formData.email} error={errors.email} onChange={handleChange} />
            <PhoneField value={formData.phone} error={errors.phone} onChange={handleChange} />
            <PasswordField value={formData.password} error={errors.password} onChange={handleChange} show={showPassword} toggle={() => setShowPassword((v) => !v)} />
            <TermsCheckbox />
            <CommonButton
              className="w-full bg-black text-white hover:bg-black hover:text-[#ffca00] text-sm sm:text-base md:text-[18px] rounded-xl flex items-center justify-center gap-2"
              size="xxl"
              pyClass="py-2.5 sm:py-3"
              fontWeight={700}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Creating account..." : "Create account"}</span>
            </CommonButton>
          </form>
          <SocialRow />
          <p className="text-center text-sm ff-font pt-3.5 sm:pt-4 text-gray-800">
            Already have an account?{" "}
            <a href="/auth/login" className="text-[#ffca00] ff-font-bold font-bold hover:underline ml-1">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------  ATOMIC COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-5 md:mb-8">
    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold ff-font-bold tracking-tight text-[#1a1a1a]">Sign up for an account</h4>
    <p className="ff-font text-sm md:text-base mt-1 text-gray-500">Please enter your details to sign up</p>
  </div>
);

const NameFields = ({ formData, errors, onChange }: {
  formData: { firstName: string; lastName: string };
  errors: Partial<{ firstName: string; lastName: string }>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
    <InputField
      name="firstName"
      placeholder="First name*"
      value={formData.firstName}
      onChange={onChange}
      error={errors.firstName}
      icon={<GoPerson className={`w-5 h-5 transition-colors duration-200 ${errors.firstName ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
    />
    <InputField
      name="lastName"
      placeholder="Last name*"
      value={formData.lastName}
      onChange={onChange}
      error={errors.lastName}
      icon={<GoPerson className={`w-5 h-5 transition-colors duration-200 ${errors.lastName ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
    />
  </div>
);

const EmailField = ({ value, error, onChange }: {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <InputField
    name="email"
    placeholder="Email address*"
    value={value}
    onChange={onChange}
    error={error}
    icon={<CiMail className={`w-5 h-5 transition-colors duration-200 ${error ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
  />
);

const PhoneField = ({ value, error, onChange }: {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => (
  <InputField
    name="phone"
    placeholder="Phone number*"
    value={value}
    onChange={onChange}
    error={error}
    icon={<MdPhone className={`w-5 h-5 transition-colors duration-200 ${error ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
  />
);

const PasswordField = ({ value, error, onChange, show, toggle }: {
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  toggle: () => void;
}) => (
  <div className="relative group">
    <InputField
      name="password"
      placeholder="Create password*"
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      icon={<CiLock className={`w-5 h-5 transition-colors duration-200 ${error ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
    />
    <button
      type="button"
      onClick={toggle}
      className={`absolute right-4 ${error ? "top-3.5 md:top-4" : "top-3.5 md:top-5"} text-gray-500 cursor-pointer hover:text-black transition`}
    >
      {show ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
    </button>
  </div>
);

const TermsCheckbox = () => (
  <div className="flex items-start space-x-2.5 sm:space-x-3 text-xs sm:text-sm">
    <input
      id="terms"
      type="checkbox"
      required
      className="mt-0.5 sm:mt-1 w-4 h-4 shrink-0 rounded border-gray-400 cursor-pointer accent-[#ffca00]"
    />
    <label htmlFor="terms" className="cursor-pointer ff-font leading-tight text-gray-700">
      I agree to Mendel Academy's <a href="#" className="underline font-bold ff-font-bold">Terms of Service</a> & <a href="#" className="underline font-bold ff-font-bold">Privacy Policy</a>.
    </label>
  </div>
);

const SocialRow = () => (
  <div className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-4">
    <SocialButton icon={<FcGoogle className="w-5 h-5 shrink-0" />} label="Google" />
    <SocialButton icon={<FaApple className="w-5 h-5 shrink-0 text-black" />} label="Apple" />
    <SocialButton icon={<CiMail className="w-5 h-5 text-gray-700 shrink-0" />} label="Email" />
  </div>
);

const SocialButton = ({ icon, label, onClick }: Social) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 md:py-4 px-2 sm:px-3 rounded-xl bg-white border border-gray-200 text-gray-800 text-sm md:text-base font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200 cursor-pointer"
  >
    {icon}
    <span className="truncate">{label}</span>
  </button>
);