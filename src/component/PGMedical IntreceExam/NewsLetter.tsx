import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { newsLatterSchema } from "@/validationSchema/validationSchema";
import React, { ChangeEvent, useState } from "react";
import {
  FaArrowRight,
  FaCalendar,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  medicalSchool: string;
  graduationYear: string;
}

interface FormErrors {
  firstName?: string;
  lastName: string;
  email?: string;
  medicalSchool?: string;
  graduationYear?: string;
}

const NewsLetter: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    medicalSchool: "",
    graduationYear: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    medicalSchool: "",
    graduationYear: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = (): boolean => {
    const { error } = newsLatterSchema.validate(formData, {
      abortEarly: false,
    });
    if (!error) {
      setErrors({
         firstName: "",
    lastName: "",
    email: "",
    medicalSchool: "",
    graduationYear: "",
      });
      return true;
    }

    const newErrors: any = {};
    error.details.forEach((detail) => {
      newErrors[detail.path[0]] = detail.message;
    });
    setErrors(newErrors);
    return false;
  };

  const handleRagisterNow = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);
      const body = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        medical_school: formData.medicalSchool,
        graduation_year: formData.graduationYear,
      };
      const res = await api.post(`${endPointApi.userRagisterCreate}`, body);
      if (res.data) {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          medicalSchool: "",
          graduationYear: "",
        });
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="relative overflow-hidden py-15 bg-gradient-to-br from-amber-100 via-white to-yellow-50">
        {/* Decorative Elements */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="mb-4 inline-block rounded-full bg-yellow-100 px-6 py-2">
                <span className="text-sm font-bold uppercase tracking-wide text-yellow-700">
                  Reserve Your Spot
                </span>
              </div>
              <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
                Start Your Journey Today
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-600">
                Fill in your details and take the first step towards USMLE
                success
              </p>
              <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Form Section */}
              <div className="h-full flex flex-col justify-between rounded-3xl border border-yellow-200 bg-white p-8 shadow-xl md:p-10">
                <div className="flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-6 flex-1">
                    {/* Name Fields */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <label
                          htmlFor="firstName"
                          className="flex items-center gap-2 font-semibold text-gray-800"
                        >
                          <FaUser className="text-yellow-600" />
                          First Name
                        </label>
                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          type="text"
                          placeholder="John"
                          className="h-12 w-full rounded-lg border border-yellow-300 px-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-sm">
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="lastName"
                          className="flex items-center gap-2 font-semibold text-gray-800"
                        >
                          <FaUser className="text-yellow-600" />
                          Last Name
                        </label>
                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          type="text"
                          placeholder="Doe"
                          className="h-12 w-full rounded-lg border border-yellow-300 px-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-sm">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 font-semibold text-gray-800"
                      >
                        <FaEnvelope className="text-yellow-600" />
                        Email Address
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="john.doe@example.com"
                        className="h-12 w-full rounded-lg border border-yellow-300 px-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="flex items-center gap-2 font-semibold text-gray-800"
                      >
                        <FaEnvelope className="text-yellow-600" />
                        Medical School
                      </label>
                      <input
                        name="medicalSchool"
                        type="text"
                        value={formData.medicalSchool}
                        onChange={handleChange}
                        placeholder="Your school name"
                        className="h-12 w-full rounded-lg border border-yellow-300 px-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                      />
                      {errors.medicalSchool && (
                        <p className="text-red-500 text-sm">
                          {errors.medicalSchool}
                        </p>
                      )}
                    </div>

                    {/* Medical School & Graduation Year */}
                    <div className="space-y-2">
                      <label
                        htmlFor="graduationYear"
                        className="flex items-center gap-2 font-semibold text-gray-800"
                      >
                        <FaCalendar className="text-yellow-600" />
                        Graduation Year
                      </label>
                      <input
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        type="text"
                        placeholder="2024"
                        className="h-12 w-full rounded-lg border border-yellow-300 px-3 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                      />
                      {errors.graduationYear && (
                        <p className="text-red-500 text-sm">
                          {errors.graduationYear}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Button at bottom */}
                  <div>
                    <button
                      type="submit"
                      onClick={handleRagisterNow}
                      className="group flex w-full h-14 items-center justify-center gap-2 rounded-xl bg-yellow-500 text-lg font-bold text-white shadow-lg hover:bg-yellow-600 transition-all"
                    >
                      Register Now
                      <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>

                    <p className="text-center text-sm text-gray-500 mt-3">
                      By registering, you agree to our terms and conditions
                    </p>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="h-full space-y-8 flex flex-col justify-between">
                {/* Contact */}
                <div className="rounded-3xl border border-yellow-200 bg-white p-8 shadow-lg">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Need Help?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-xl bg-yellow-50 p-4">
                      <div className="flex size-12 items-center justify-center rounded-full bg-yellow-100">
                        <FaPhone className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Call us at</p>
                        <a
                          href="tel:+919925511631"
                          className="text-lg font-bold text-yellow-700 hover:underline"
                        >
                          +91-99255-11631
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 rounded-xl bg-yellow-50 p-4">
                      <div className="flex size-12 items-center justify-center rounded-full bg-yellow-100">
                        <FaEnvelope className="text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email us at</p>
                        <a
                          href="mailto:ask@mendalacademy.com"
                          className="break-all text-lg font-bold text-yellow-700 hover:underline"
                        >
                          ask@mendalacademy.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 via-white to-amber-50 p-15 shadow-lg">
                  <h3 className="mb-6 text-2xl font-bold text-gray-900">
                    Why Register Now?
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Early bird pricing available",
                      "Limited seats per batch",
                      "Personal guidance from Dr. Managed",
                      "Access to exclusive study materials",
                      "Join our community of successful students",
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-yellow-500">
                          <FaCheckCircle className="text-sm text-white" />
                        </div>
                        <span className="text-gray-800">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
