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
import { FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { GoPerson } from "react-icons/go";
import { toast } from "react-toastify";

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
        <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-br from-yellow-50 to-white">
            {/* ------------------- LEFT PANEL: ONLY IMAGE ------------------- */}
            <div className="hidden lg:flex w-1/2 bg-white items-center justify-center p-8 md:p-16">
                <img
                    src="https://media.istockphoto.com/id/1492383467/vector/web-banner-template-of-speech-bubble-with-register-now-phrase.jpg?s=612x612&w=0&k=20&c=G1PEIxAAeM5KvKK3z_rxsHeNTlNiN6cb8APiUuC-dSg="
                    alt="Register Now"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* ------------------- RIGHT PANEL: SIGN-UP FORM ------------------- */}
            <div className="w-full lg:w-1/2 bg-[#ffca00] relative flex items-center justify-center p-8 md:p-16">
                <div className="w-full max-w-md relative z-10">
                    {/* header */}
                    <div className="text-center mb-6 md:mb-8">
                        <h4 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Create an account
                        </h4>
                        {/* <p className="text-gray-600 text-sm md:text-base">
                            Please enter your details to sign up
                        </p> */}
                    </div>

                    {/* form */}
                    <div className="space-y-4 md:space-y-5">
                        {/* First name */}
                        <div className="relative flex flex-col">
                            <div className="relative">
                                <InputField
                                    name="firstName"
                                    placeholder="First name*"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={errors.firstName}
                                    icon={<GoPerson className={`w-5 h-5 ${errors.firstName ? "text-red-500" : "text-gray-400"}`} />}
                                />
                            </div>
                        </div>

                        {/* Last name */}
                        <div className="relative flex flex-col">
                            <div className="relative">
                                <InputField
                                    name="lastName"
                                    placeholder="Last name*"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={errors.lastName}
                                    icon={<GoPerson className={`w-5 h-5 ${errors.lastName ? "text-red-500" : "text-gray-400"}`} />}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="relative flex flex-col">
                            <div className="relative">
                                <InputField
                                    name="email"
                                    placeholder="Email*"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    icon={<CiMail className={`w-5 h-5 ${errors.email ? "text-red-500" : "text-gray-400"}`} />}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="relative flex flex-col">
                            <div className="relative">
                                <InputField
                                    name="password"
                                    placeholder="Create Password*"
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={errors.password}
                                    icon={<CiLock className={`w-5 h-5 ${errors.password ? "text-red-500" : "text-gray-400"}`} />}
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


                        {/* T&C checkbox */}
                        <div className="flex items-start space-x-2 text-sm">
                            <input
                                id="terms"
                                type="checkbox"
                                required
                                className="mt-1 w-4 h-4 rounded border-gray-300 cursor-pointer"
                            />
                            <label htmlFor="terms" className="ff-font mt-1 cursor-pointer select-none leading-tight">
                                I agree to Mendel Academy&apos;s{" "}
                                <a href="#" className="underline hover:text-gray-900">Terms of Service</a> &{" "}
                                <a href="#" className="underline hover:text-gray-900">Privacy Policy</a>.
                            </label>
                        </div>

                        {/* Submit */}
                        {/* <button
                            type="submit"
                            className="w-full py-3 md:py-4 rounded-lg cursor-pointer bg-black hover:bg-gray-800 text-white font-semibold shadow-md transition-all duration-300 active:scale-95"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Create account
                        </button> */}
                        <CommonButton
                            className="bg-black text-white hover:bg-black hover:text-[#ffca00]"
                            pyClass="py-4"
                            pxClass="px-41"
                            fontWeight={700}
                            fontSize={16}
                        >
                            Create account
                        </CommonButton>

                        {/* Social row */}
                        <div className="flex flex-wrap md:flex-nowrap gap-3 pt-4">
                            <SocialButton icon={<FcGoogle className="w-7 h-7" />} label="Google" />
                            <SocialButton icon={<FaApple className="w-7 h-7" />} label="Apple" />
                            <SocialButton icon={<CiMail className="w-7 h-7 text-gray-700" />} label="Email" />
                        </div>

                        {/* footer link */}
                        <p className="text-center text-sm text-gray-600 pt-2">
                            Already have an account?{" "}
                            <a href="/auth/login" className="text-gray-900 font-semibold hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
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