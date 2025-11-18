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
  const [startAnimation, setStartAnimation] = useState<boolean>(false);

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
    <>
      <motion.div
        initial={{ x: 0, opacity: 1 }}
        animate={startAnimation ? { x: "-100%", opacity: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="min-h-screen w-full flex overflow-hidden bg-white"
      >

        <div className="min-h-screen w-full flex overflow-hidden bg-white">

          {/* ------------------- RIGHT PANEL: SIGN-UP FORM (White Background) ------------------- */}
          <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-10 md:p-12">
            <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl   shadow-[0_12px_35px_rgba(0,0,0,0.12)] p-8 md:p-10 relative z-10">
              {/* Header */}
              <div className="text-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-4xl font-bold ff-font-bold mb-2">
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
                          className={`w-5 ff-font h-5 ${errors.email ? "text-red-500" : "text-gray-400 ff-font"
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
                          className={`w-5 ff-font h-5 ${errors.password ? "text-red-500" : "text-gray-400 ff-font"
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
                    {/* <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                    /> */}
                    <input
                      type="checkbox"
                      id="remember"
                      required
                      className="mt-1 w-4 h-4 rounded border-gray-400 cursor-pointer accent-[#ffca00]"
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
                    className="ff-font-bold hover:text-gray-800 transition-colors"
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
                  pxClass="px-52"
                  fontWeight={700}
                  fontSize={18}
                  onClick={(e) => handleSubmit(e)}
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


          {/* ------------------- LEFT PANEL: LOGIN PROMPT (Blue Background) ------------------- */}
          <div
            className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-8 md:p-16 order-2" // order-2 इसे राइट में भेजता है
            style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}
          >

            {/* Logo (Top Right Corner of the Panel) */}
            <div className="absolute top-8 right-10">
              <img
                src="http://localhost:3002/images/main%20logo.png"
                alt="BoardMe Logo"
                className="h-15"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm text-black">
              <h2 className="text-3xl font-bold mb-4">
                Glad to See You Again
              </h2>
              <p className="text-lg mb-8">
                Log in to continue your progress and explore new learning opportunities.
              </p>

              {/* LOGIN Button (Black Border) */}
              <button
                type="button"
                onClick={() => {
                  setStartAnimation(true);
                  setTimeout(() => {
                    router.push("/auth/register");
                  }, 700);
                }}
                className="w-48 py-3 px-6 cursor-pointer border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
              >
                SIGN UP
              </button>

            </div>
          </div>
        </div>
      </motion.div>

    </>
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
