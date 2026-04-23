"use client";
import CommonButton from "@/comman/Button";
import InputField from "@/comman/InputField";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiMail } from "react-icons/ci";
import { ErrorToast, SuccessToast } from "@/comman/Toastify";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email"); return; }

    setLoading(true);
    try {
      await api.post(endPointApi.forgotPassword, { email });
      SuccessToast("Password reset link sent to your email!");
      setEmail("");
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
            <h2 className="text-2xl md:text-4xl font-bold ff-font-bold mb-2">Forgot Password?</h2>
            <p className="ff-font text-sm md:text-base">Enter your email to receive a reset link</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              name="email"
              placeholder="Email*"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              error={error}
              icon={<CiMail className={`w-5 h-5 ${error ? "text-red-500" : "text-gray-400"}`} />}
            />
            <CommonButton
              className="w-full bg-black text-white hover:bg-black hover:text-[#ffca00]"
              pyClass="py-4"
              fontWeight={700}
              fontSize={18}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </CommonButton>
          </form>

          <p className="text-center text-sm ff-font pt-2">
            Remember your password?{" "}
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
          <h2 className="text-3xl font-bold mb-4">No Worries!</h2>
          <p className="text-lg mb-8">We'll help you reset your password and get back to learning.</p>
          <button
            onClick={() => router.push("/auth/login")}
            className="w-48 py-3 px-6 border-2 border-black text-black font-semibold rounded-lg hover:bg-black hover:text-white transition duration-300"
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    </motion.div>
  );
}
