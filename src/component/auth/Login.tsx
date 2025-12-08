"use client";
import CommonButton from "@/comman/Button";
import InputField from "@/comman/InputField";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { saveToken } from "@/utils/tokenManager";
import { loginSchema } from "@/validationSchema/validationSchema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { FaApple, FaArrowRight } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

/* ----------  TYPES  ---------- */
type FormData = { email: string; password: string };
type Social = { icon: React.ReactNode; label: string; onClick?: () => void };

/* ----------  MAIN COMPONENT  ---------- */
export default function Login() {
  const router = useRouter();
  const [startAnimation, setStartAnimation] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = loginSchema.validate(formData, { abortEarly: false });
    if (error) {
      const newErrors: Partial<FormData> = {};
      error.details.forEach((d) => (newErrors[d.path[0] as keyof FormData] = d.message));
      setErrors(newErrors);
      return;
    }
    api
      .post(endPointApi.login, formData)
      .then((res) => {
        saveToken(res.data.token.access);
        toast.success(res.data.message || "User login successfully!");
        router.push("/");
      })
      .catch((err) => toast.error(err.response?.data?.message));
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={startAnimation ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen w-full flex overflow-hidden bg-white"
    >
      {/* ----------  RIGHT PANEL: LOGIN FORM  ---------- */}
      <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-10">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-10 border border-primary">
          <Header />
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              name="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={<CiMail className={`w-5 h-5 ${errors.email ? "text-red-500" : "text-gray-400"}`} />}
            />
            <PasswordField
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              show={showPassword}
              toggle={() => setShowPassword((v) => !v)}
            />
            <Checkbox />
            <CommonButton
              className="bg-black text-white hover:bg-black hover:text-[#ffca00]"
              pyClass="py-4"
              pxClass="px-52"
              fontWeight={700}
              fontSize={18}
              onClick={handleSubmit}
            >
              Continue
            </CommonButton>

          </form>
          <SocialRow />
          <p className="text-center text-sm ff-font pt-2">
            Don't have an account?{" "}
            <a href="/auth/register" className="ff-font-bold font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* ----------  LEFT PANEL: SIGN-UP PROMPT  ---------- */}
      <div
        className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-16"
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        {/* <img
          src="http://localhost:3002/images/main%20logo.png"
          alt="BoardMe Logo"
          className="absolute top-8 right-10 h-15"
        /> */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm text-black">
          <h2 className="text-3xl font-bold mb-4">Glad to See You Again</h2>
          <p className="text-lg mb-8">Log in to continue your progress and explore new learning opportunities.</p>
          <button
            onClick={() => {
              setStartAnimation(true);
              setTimeout(() => router.push("/auth/register"), 700);
            }}
            className="w-48 py-3 px-6 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ----------  ATOMIC COMPONENTS  ---------- */
const Header = () => (
  <div className="text-center mb-6 md:mb-8">
    <h2 className="text-2xl md:text-4xl font-bold ff-font-bold mb-2">Log In here!</h2>
    <p className="ff-font text-sm md:text-base">Please enter your details to login</p>
  </div>
);

const PasswordField = ({ value, onChange, error, show, toggle }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  show: boolean;
  toggle: () => void;
}) => (
  <div className="relative">
    <InputField
      name="password"
      placeholder="Create Password*"
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      error={error}
      icon={<CiLock className={`w-5 h-5 ${error ? "text-red-500" : "text-gray-400"}`} />}
    />

    <button
      type="button"
      onClick={toggle}
      className="absolute right-4 top-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors"
    >
      {show ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
    </button>
  </div>
);

const Checkbox = () => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="remember"
        required
        className="w-4 h-4 rounded border-gray-400 cursor-pointer accent-[#ffca00]"
      />
      <label htmlFor="remember" className="ff-font cursor-pointer select-none">
        Remember me
      </label>
    </div>
    <a href="#" className="ff-font-bold hover:text-gray-800 transition-colors">
      Forgot Password?
    </a>
  </div>
);

const SocialRow = () => (
  <div className="flex flex-wrap md:flex-nowrap gap-3 pt-4">
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