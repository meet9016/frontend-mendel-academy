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


interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface SocialButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
}
export default function Registers() {
    const [startAnimation, setStartAnimation] = useState<boolean>(false);
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterFormData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
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

    // Optional: form submit handler
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = registerSchema.validate(formData, { abortEarly: false });

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
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
        };
        api.post(`${endPointApi.register}`, body)
            .then((response) => {
                console.log('Registration successful:', response.data);
                router.push("/");
                saveToken(response.data.token.access);
                toast.success(response.data.message || "User registered successfully!");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };
    return (
        <>
            <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={startAnimation ? { x: "100%", opacity: 0 } : {}}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="min-h-screen w-full flex overflow-hidden bg-white"
            >


                <div className="min-h-screen w-full flex overflow-hidden bg-white">
                    {/* ------------------- LEFT PANEL: LOGIN PROMPT (Blue Background) ------------------- */}
                    <div
                        className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-8 md:p-16"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }} // <--- यह line diagonal cut बनाती है
                    >
                        {/* BoardMe Logo (Top Left Corner of the Blue Panel) */}
                        <div className="absolute top-8 left-10">
                            <img
                                src="http://localhost:3002/images/main%20logo.png"
                                alt="BoardMe Logo"
                                className="h-15"
                            />
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm">
                            <h2 className="text-2xl font-extrabold ff-font-bold  mb-4">
                                Create Your Account Today!  
                            </h2>
                            <p className="ff-font text-lg mb-8">
                               Join Mendel Academy and Start Your Extraordinary Educational Journey
                            </p>

                            {/* LOGIN Button (White Border) */}
                            <button
                                type="button"
                                onClick={() => {
                                    setStartAnimation(true);
                                    setTimeout(() => {
                                        router.push('/auth/login');
                                    }, 700);
                                }}
                                className="w-48 py-3 px-6 cursor-pointer border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
                            >
                                LOG IN
                            </button>
                        </div>
                    </div>

                    {/* ------------------- RIGHT PANEL: SIGN-UP FORM (White Background) ------------------- */}
                    <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-10 md:p-12 ">
                        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl   shadow-[0_12px_35px_rgba(0,0,0,0.12)] p-8 md:p-10 relative z-10">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h4 className="text-3xl md:text-4xl font-bold ff-font-bold  tracking-tight">
                                    Sign up for an account
                                </h4>
                                <p className="ff-font text-sm md:text-base mt-1">
                                    Please enter your details to sign up
                                </p>
                            </div>

                            {/* FORM */}
                            <div className="space-y-5">

                                {/* First Name */}
                                <div className="relative group">
                                    <InputField
                                        name="firstName"
                                        placeholder="First name*"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={errors.firstName}
                                        icon={
                                            <GoPerson
                                                className={`w-5 h-5 transition-colors ff-font duration-200 ${errors.firstName ? "text-red-500 " : "text-gray-400 ff-font group-hover:text-black"}`}
                                            />
                                        }
                                    />
                                </div>

                                {/* Last Name */}
                                <div className="relative group">
                                    <InputField
                                        name="lastName"
                                        placeholder="Last name*"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={errors.lastName}
                                        icon={
                                            <GoPerson
                                                className={`w-5 h-5 transition-colors ff-font duration-200 ${errors.lastName ? "text-red-500" : "text-gray-400 ff-font group-hover:text-black"}`}
                                            />
                                        }
                                    />
                                </div>

                                {/* Email */}
                                <div className="relative group">
                                    <InputField
                                        name="email"
                                        placeholder="Email address*"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={errors.email}
                                        icon={
                                            <CiMail
                                                className={`w-5 h-5 transition-colors ff-font duration-200 ${errors.email ? "text-red-500" : "text-gray-400 ff-font group-hover:text-black"}`}
                                            />
                                        }
                                    />
                                </div>

                                {/* Password */}
                                <div className="relative group">

                                    <InputField
                                        name="password"
                                        placeholder="Create password*"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={errors.password}
                                        icon={
                                            <CiLock
                                                className={`w-5 h-5 transition-colors duration-200 ${errors.password ? "text-red-500" : "text-gray-400 group-hover:text-black"
                                                    }`}
                                            />
                                        }
                                    />

                                    {/* Eye Icon */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 
                   text-gray-500 cursor-pointer hover:text-black transition"
                                    >
                                        {showPassword ? (
                                            <FiEye className="w-5 h-5" />
                                        ) : (
                                            <FiEyeOff className="w-5 h-5" />
                                        )}
                                    </button>

                                </div>


                                {/* Terms */}
                                <div className="flex items-start space-x-3 text-sm">
                                    <input
                                        id="terms"
                                        type="checkbox"
                                        required
                                        className="mt-1 w-4 h-4 rounded border-gray-400 cursor-pointer accent-[#ffca00]"
                                    />
                                    <label htmlFor="terms" className="mt-1 cursor-pointer ff-font leading-tight">
                                        I agree to Mendel Academy's {" "}
                                        <a href="#" className="underline font-bold ff-font-bold">Terms of Service</a> & {" "}
                                        <a href="#" className="underline font-bold ff-font-bold">Privacy Policy</a>.
                                    </label>
                                </div>

                                {/* Submit */}
                                {/* <CommonButton
                                    className="bg-black text-white hover:bg-black hover:text-[#ffca00] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full"
                                    pyClass="py-4"
                                    pxClass="px-41"
                                    fontWeight={700}
                                    fontSize={16}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Create account
                                </CommonButton> */}
                                <CommonButton
                                    className="bg-black text-white hover:bg-black hover:text-[#ffca00]"
                                    pyClass="py-4"
                                    pxClass="px-45"
                                    fontWeight={700}
                                    fontSize={18}
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    Create account
                                </CommonButton>

                                {/* Social Login */}
                                <div className="flex flex-wrap md:flex-nowrap gap-3 pt-3">
                                    <SocialButton icon={<FcGoogle className="w-7 h-7" />} label="Google" />
                                    <SocialButton icon={<FaApple className="w-7 h-7" />} label="Apple" />
                                    <SocialButton icon={<CiMail className="w-7 h-7 text-gray-700" />} label="Email" />
                                </div>

                                {/* Footer */}
                                <p className="text-center text-sm ff-font pt-2">
                                    Already have an account?{" "}
                                    <a href="/auth/login" className="ff-font-bold font-semibold hover:underline">
                                        Sign in
                                    </a>
                                </p>

                            </div>
                        </div>
                    </div>



                </div>
            </motion.div>

        </>
    );
}

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