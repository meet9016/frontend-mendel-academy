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

interface RegisterFormData {
  email: string;
  password: string;
}

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "", // remove error message for that field
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = loginSchema.validate(formData, { abortEarly: false });

    if (error) {
      const newErrors: Record<string, string> = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const body = {
      email: formData.email,
      password: formData.password,
    };
    api
      .post(`${endPointApi.login}`, body)
      .then((response) => {
        router.push("/");
        saveToken(response.data.token.access);
        toast.success(response.data.message || "User login successfully!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-br from-yellow-50 to-white">
      {/* Left Side - White Background with Branding */}
      <div className="hidden lg:flex w-1/2 bg-white relative flex-col items-center justify-center p-8 md:p-16">
        {/* Top decorative yellow shape */}
        <div className="absolute top-0 left-0 w-2/3 h-24 md:h-32 bg-[#ffca00] rounded-br-[80px] md:rounded-br-[100px]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-lg">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ff-font-bold mb-2">
              Welcome to <span className="italic font-serif">Waitly</span>
            </h1>
          </div>

          <div className="relative mb-8 md:mb-12">
            {/* Yellow brushstroke background */}
            <div className="absolute inset-0 -left-6 -right-6 -top-6 -bottom-6 md:-left-8 md:-right-8 md:-top-8 md:-bottom-8">
              <div className="w-full h-full bg-[#ffca00] rounded-[60px] md:rounded-[80px] rotate-[-5deg]" />
            </div>
            <img
              src="https://i.pinimg.com/736x/63/77/36/63773689c5405621be6336d5e91b5b61.jpg"
              alt="Food Illustration"
              className="relative z-10 w-64 h-48 md:w-80 md:h-64 object-contain drop-shadow-2xl"
            />
          </div>

          <div className="text-center mt-6 md:mt-8">
            <p className="text-xl md:text-2xl font-semibold ff-font-bold mb-1">
              Unlock your dineline
            </p>
            <p className="text-base md:text-lg ff-font">Sign in now!</p>
          </div>
        </div>

        {/* Bottom decorative arrow button - hidden on mobile */}
        <div className="hidden lg:block absolute bottom-8 right-8">
          <div className="w-20 h-20 bg-[#ffca00] rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#ffca00] transition-all duration-300 hover:scale-110">
            <FaArrowRight className="w-8 h-8 text-black" />
          </div>
        </div>
      </div>

      {/* Right Side - Yellow Background with Form */}
      <div className="w-full lg:w-1/2 bg-[#ffca00] relative flex items-center justify-center p-8 md:p-16">
        {/* Decorative brushstroke shapes */}
        <div className="hidden lg:block absolute top-32 right-0 w-80 h-40 bg-white/20 rounded-l-[100px]" />
        <div className="hidden lg:block absolute bottom-24 left-0 w-72 h-32 bg-white/20 rounded-r-[100px]" />
        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold ff-font-bold mb-2">
              Log In here!
            </h2>
            <p className="ff-font text-sm md:text-base">
              Please enter your details to login
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-4 md:space-y-5">
            <div className="relative flex flex-col">
              <div className="relative">
                <InputField
                  name="email"
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={
                    <CiMail
                      className={`w-5 h-5 ${errors.email ? "text-red-500" : "text-gray-400"
                        }`}
                    />
                  }
                />
              </div>
            </div>

            <div className="relative flex flex-col">
              <div className="relative">
                <InputField
                  name="password"
                  placeholder="Create Password*"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={
                    <CiLock
                      className={`w-5 h-5 ${errors.password ? "text-red-500" : "text-gray-400"
                        }`}
                    />
                  }
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-7 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? (
                    <FiEye className="w-5 h-5" />
                  ) : (
                    <FiEyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ff-font cursor-pointer select-none"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="ff-font hover:text-gray-800 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            {/* <button
              type="submit"
              className="w-full py-3 md:py-4 rounded-lg cursor-pointer bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-300 active:scale-95"
              onClick={(e) => handleSubmit(e)}
            >
              Continue
            </button> */}
            <CommonButton
              className="bg-black text-white hover:bg-black hover:text-[#ffca00]"
              pyClass="py-4"
              pxClass="px-44"
              fontWeight={700}
              fontSize={18}
            >
              Continue
            </CommonButton>



            {/* <div className="space-y-3 pt-2">
              <button
                type="button"
                className="w-full py-3 md:py-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                className="w-full py-3 md:py-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </button>

              <button
                type="button"
                className="w-full py-3 md:py-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-all duration-200"
              >
                <Mail className="w-5 h-5" />
                Continue with email
              </button>
            </div> */}

            {/* Social row */}
            <div className="flex flex-wrap md:flex-nowrap gap-3 pt-4">
              <SocialButton
                icon={<FcGoogle className="w-7 h-7" />}
                label="Google"
              />
              <SocialButton
                icon={<FaApple className="w-7 h-7" />}
                label="Apple"
              />
              <SocialButton
                icon={<CiMail className="w-7 h-7 text-gray-700" />}
                label="Email"
              />
            </div>
            <p className="text-center text-sm ff-font pt-2">
              Don't have an account?{" "}
              <a
                href="/auth/register"
                className="ff-font-bold font-semibold hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-3 py-3 md:py-4 
               cursor-pointer rounded-lg bg-white border border-gray-300 text-gray-800 
               font-medium hover:bg-gray-100 hover:shadow-md hover:scale-105 
               transition-all duration-300 ease-in-out"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
