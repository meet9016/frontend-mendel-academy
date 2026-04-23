"use client";
import CommonButton from "@/comman/Button";
import InputField from "@/comman/InputField";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [startAnimation, setStartAnimation] = useState(false);

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const criteria = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
    { label: "One special character", met: /[!@#$%^&*()_+\[\]{}<>?,.]/.test(formData.password) },
  ];

  const allCriteriaMet = criteria.every((c) => c.met);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (!allCriteriaMet) newErrors.password = "Password does not meet all criteria";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!token) { ErrorToast("Invalid or expired reset link"); return; }

    setLoading(true);
    try {
      await api.post(`${endPointApi.resetPassword}?token=${token}`, { password: formData.password });
      SuccessToast("Password reset successfully! Please login.");
      router.push("/auth/login");
    } catch (err: any) {
      ErrorToast(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={startAnimation ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="min-h-screen w-full flex overflow-hidden bg-white"
    >
      {/* LEFT: Form Panel */}
      <div className="w-full lg:w-1/2 bg-white relative flex items-center justify-center p-10">
        <div className="w-full max-w-xl bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg p-10 border border-primary">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold ff-font-bold mb-2">Reset Password</h2>
            <p className="ff-font text-sm md:text-base">Enter your new password below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* New Password */}
            <div className="relative">
              <InputField
                name="password"
                placeholder="New Password*"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => { setFormData((p) => ({ ...p, password: e.target.value })); setErrors((p) => ({ ...p, password: undefined })); }}
                error={errors.password}
                icon={<CiLock className={`w-5 h-5 ${errors.password ? "text-red-500" : "text-gray-400"}`} />}
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                {showPassword ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Criteria */}
            {formData.password.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 space-y-1.5">
                {criteria.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                      c.met ? "bg-green-500" : "bg-gray-300"
                    }`}>
                      {c.met
                        ? <FiCheck className="w-2.5 h-2.5 text-white" />
                        : <FiX className="w-2.5 h-2.5 text-white" />}
                    </span>
                    <span className={`text-xs ff-font ${
                      c.met ? "text-green-600" : "text-gray-400"
                    }`}>{c.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Confirm Password */}
            <div className="relative">
              <InputField
                name="confirmPassword"
                placeholder="Confirm Password*"
                type={showConfirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => { setFormData((p) => ({ ...p, confirmPassword: e.target.value })); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                error={errors.confirmPassword}
                icon={<CiLock className={`w-5 h-5 ${errors.confirmPassword ? "text-red-500" : "text-gray-400"}`} />}
              />
              <button type="button" onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-4 top-5 text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
                {showConfirm ? <FiEye className="w-5 h-5" /> : <FiEyeOff className="w-5 h-5" />}
              </button>
            </div>

            <CommonButton
              className="w-full bg-black text-white hover:bg-black hover:text-[#ffca00]"
              pyClass="py-4"
              fontWeight={700}
              fontSize={18}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </CommonButton>
          </form>

          <p className="text-center text-sm ff-font pt-2">
            <button
              type="button"
              onClick={() => {
                setStartAnimation(true);
                setTimeout(() => router.push("/auth/login"), 700);
              }}
              className="ff-font-bold font-semibold hover:underline cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>

      {/* RIGHT: Yellow Panel */}
      <div
        className="hidden lg:flex w-1/2 bg-[#ffca00] relative flex-col items-center justify-center p-16"
        style={{ clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0 100%)" }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-sm text-black">
          <h2 className="text-3xl font-bold mb-4">Almost There!</h2>
          <p className="text-lg mb-8">Set a strong new password to secure your Mendel Academy account.</p>
          <button
            onClick={() => {
              setStartAnimation(true);
              setTimeout(() => router.push("/auth/login"), 700);
            }}
            className="w-48 py-3 px-6 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </motion.div>
  );
}
