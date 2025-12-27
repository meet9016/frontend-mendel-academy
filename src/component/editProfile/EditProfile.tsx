"use client";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { getAuthId } from "@/utils/tokenManager";
import { useEffect, useState } from "react";
import {
  FaBook,
  FaCreditCard,
  FaGraduationCap,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdEmail, MdPhone, MdCalendarToday, MdPerson } from "react-icons/md";

const EditProfile = () => {
  const userId = getAuthId();

  const student = {
    name: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    joined: "January 2024",
    avatar: "https://i.pravatar.cc/150?img=3",
  };

  const books = [
    { id: 1, title: "React Basics", purchasedOn: "2025-11-01" },
    { id: 2, title: "Next.js Advanced", purchasedOn: "2025-10-15" },
  ];

  const payments = [
    { id: 1, amount: 499, date: "2025-11-10", status: "Success" },
    { id: 2, amount: 999, date: "2025-10-20", status: "Success" },
  ];

  const courses = [
    {
      id: 1,
      name: "Next.js Full Course",
      type: "Paid",
      status: "Active",
      expiresOn: "2025-12-10",
    },
    {
      id: 2,
      name: "Tailwind CSS Crash Course",
      type: "Free",
      status: "Expired",
      expiresOn: "2025-11-30",
    },
  ];

  const paymentsTotal = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeCourses = courses.filter((c) => c.status === "Active").length;

  const [profileData, setProfileData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  console.log("profileData", profileData);

  const isExpiringSoon = (date: string) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 5 && diff >= 0;
  };

  const tagColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "paid":
        return "bg-blue-500 text-white";
      case "free":
        return "bg-green-500 text-white";
      case "expired":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const stats = [
    {
      label: "Books Purchased",
      value: books.length.toString(),
      icon: FaBook,
      color: "bg-[#fff9df] text-primary",
    },
    {
      label: "Total Spent",
      value: `₹${profileData?.totalSpent?.toLocaleString()}`,
      icon: FaCreditCard,
      color: "bg-[#fff9df] text-primary",
    },
    // {
    //   label: "Active Courses",
    //   value: activeCourses.toString(),
    //   icon: FaGraduationCap,
    //   color: "bg-[#fff9df] text-primary",
    // },
    // {
    //   label: "Learning Progress",
    //   value: "68%",
    //   icon: FaChartLine,
    //   color: "bg-[#fff9df] text-primary",
    // },
  ];

  useEffect(() => {
    let isMounted = true; // prevent state update after unmount

    const getProfileData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${endPointApi.getProfile}/${userId}`);

        if (isMounted && response?.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProfileData();

    return () => {
      isMounted = false; // cleanup
    };
  }, []);

  const downloadUserPayments = async () => {
    try {
      const response = await api.get(`/payment/user-download-excel`, {
        params: {
          user_id: userId, // required
          // start_date & end_date not passed
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "user-payments.xlsx";
      link.click();
    } catch (error) {
      console.error("Excel download failed", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1380px] mx-auto space-y-8">
        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-3 ring-[#FFCA00]">
              <img
                src={student.avatar}
                alt={student.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FFCA00] rounded-lg flex items-center justify-center">
              <MdPerson className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold ff-font-bold mb-1">
              {profileData?.user?.first_name}
            </h1>
            <p className="ff-font text-sm mb-4">Student Profile</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdEmail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">
                    {profileData?.user?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdPhone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Phone</p>
                  <p className="text-sm font-medium ff-font-bold">
                    {student.phone}
                  </p>
                </div>
              </div>

              {/* <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdCalendarToday className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Member Since</p>
                  <p className="text-sm font-medium ff-font-bold">
                    {student.joined}
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
            Edit Profile
          </button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-start"
            >
              <div className={`p-2 rounded-lg mb-3 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold ff-font-bold">{stat.value}</p>
              <p className="text-sm ff-font text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Dashboard Overview */}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold ff-font-bold">
            Dashboard Overview
          </h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold0">Cart</h3>
                <p className="text-xs ff-font text-gray-500">
                  {courses.length} enrolled courses
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {profileData?.cart?.addToCartItem?.map((c: any) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-xl border-2 ${
                    isExpiringSoon(c.expiresOn)
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold ff-font-bold">
                        {c.category_name}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold bg-[#FFCA00]`}
                    >
                      {c.price}
                    </span>
                  </div>
                  {isExpiringSoon(c.expiresOn) && (
                    <p className="text-xs ff-font text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <FaExclamationTriangle className="w-4 h-4" /> Expires Soon
                      – Renew Now!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Book Purchases */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaBook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold">
                  Purchases List
                </h3>
                <p className="text-xs ff-font text-gray-500">
                  {books.length} books in library
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {profileData?.cart?.payBill?.map((book: any) => (
                <div
                  key={book.id}
                  className="flex items-center justify-between p-3 border-l-4 border-[#FFCA00] cursor-pointer hover:bg-[#fff9df] transition"
                >
                  <div>
                    <p className=" ff-font-bold">{book.category_name}</p>
                    <p className="text-sm ff-font text-gray-500">
                      Purchased:{" "}
                      {new Date(book.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between gap-3 mb-6">
              {/* Left side */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                  <FaCreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold ff-font-bold">
                    Payment History
                  </h3>
                  <p className="text-xs ff-font text-gray-500">
                    {payments.length} transactions
                  </p>
                </div>
              </div>

              {/* Right side */}
              <button
                onClick={downloadUserPayments}
                className="bg-[#ffca00] px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                Download
              </button>
            </div>

            <div className="space-y-4">
              {profileData?.payment?.map((p: any) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-3 bg-[#fff9df] rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fff9df] flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm ff-font text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <p className="text-xs font-medium ff-font">{p.status}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold ff-font-bold">₹{p.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
