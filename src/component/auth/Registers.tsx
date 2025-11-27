"use client";
import CommonButton from "@/comman/Button";
import InputField from "@/comman/InputField";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { saveToken } from "@/utils/tokenManager";
import { registerSchema } from "@/validationSchema/validationSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { FaApple, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type FormData = { firstName: string; lastName: string; email: string; password: string };
type Social = { icon: React.ReactNode; label: string; onClick?: () => void };

/* ----------  MAIN COMPONENT  ---------- */
export default function Registers() {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ firstName: "", lastName: "", email: "", password: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = registerSchema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors: Partial<FormData> = {};
      error.details.forEach((d) => (newErrors[d.path[0] as keyof FormData] = d.message));
      setErrors(newErrors);
      return;
    }
    api
      .post(endPointApi.register, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        saveToken(res.data.token.access);
        toast.success(res.data.message || "User registered successfully!");
        router.push("/");
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={startAnimation ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen w-full flex overflow-hidden bg-white"
    >
      {/* ----------  LEFT PANEL: SIGN-UP PROMPT  ---------- */}
      <div
        className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-8 md:p-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 80% 100%, 0 100%)" }}
      >
        {/* <img
          src="http://localhost:3002/images/main%20logo.png"
          alt="BoardMe Logo"
          className="absolute top-8 left-10 h-15"
        /> */}
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
      <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-10 md:p-12">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-8 md:p-10 relative z-10">
          <Header />
          <form onSubmit={handleSubmit} className="space-y-5">
            <NameFields formData={formData} errors={errors} onChange={handleChange} />
            <EmailField value={formData.email} error={errors.email} onChange={handleChange} />
            <PasswordField value={formData.password} error={errors.password} onChange={handleChange} show={showPassword} toggle={() => setShowPassword((v) => !v)} />
            <TermsCheckbox />
            <CommonButton
              className="bg-black text-white hover:bg-black hover:text-[#ffca00]"
              pyClass="py-4"
              pxClass="px-45"
              fontWeight={700}
              fontSize={18}
              onClick={handleSubmit}
            >
              Create account
            </CommonButton>
          </form>
          <SocialRow />
          <p className="text-center text-sm ff-font pt-2">
            Already have an account?{" "}
            <a href="/auth/login" className="ff-font-bold font-semibold hover:underline">
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
  <div className="text-center mb-8">
    <h4 className="text-3xl md:text-4xl font-bold ff-font-bold tracking-tight">Sign up for an account</h4>
    <p className="ff-font text-sm md:text-base mt-1">Please enter your details to sign up</p>
  </div>
);

const NameFields = ({ formData, errors, onChange }: { formData: { firstName: string; lastName: string }; errors: Partial<{ firstName: string; lastName: string }>; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

const EmailField = ({ value, error, onChange }: { value: string; error?: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <InputField
    name="email"
    placeholder="Email address*"
    value={value}
    onChange={onChange}
    error={error}
    icon={<CiMail className={`w-5 h-5 transition-colors duration-200 ${error ? "text-red-500" : "text-gray-400 group-hover:text-black"}`} />}
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
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-black transition"
    >
      {show ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
    </button>
  </div>
);

const TermsCheckbox = () => (
  <div className="flex items-start space-x-3 text-sm">
    <input
      id="terms"
      type="checkbox"
      required
      className="mt-1 w-4 h-4 rounded border-gray-400 cursor-pointer accent-[#ffca00]"
    />
    <label htmlFor="terms" className="mt-1 cursor-pointer ff-font leading-tight">
      I agree to Mendel Academy's <a href="#" className="underline font-bold ff-font-bold">Terms of Service</a> & <a href="#" className="underline font-bold ff-font-bold">Privacy Policy</a>.
    </label>
  </div>
);

const SocialRow = () => (
  <div className="flex flex-wrap md:flex-nowrap gap-3 pt-3">
    <SocialButton icon={<FcGoogle className="w-7 h-7" />} label="Google" />
    <SocialButton icon={<FaApple className="w-7 h-7" />} label="Apple" />
    <SocialButton icon={<CiMail className="w-7 h-7 text-gray-700" />} label="Email" />
  </div>
);

const SocialButton = ({ icon, label, onClick }: Social) => (
  <button
    type="button"
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-3 py-3 md:py-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 transition-all duration-300 ease-in-out"
  >
    {icon}
    <span>{label}</span>
  </button>
);