"use client";
import { useState } from "react";
import { FaArrowLeft, FaHome, FaUser } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

import OntrialOverview from "./On Trial/OntrialOverview";
import PayingMemberOverview from "./Paying Member/PayingMemberOverview";
import NewuserOverview from "./New User/NewuserOverview";
import Dashboard from "./Demo State/Dashboard";
import Membership from "./Membership";
import Profile from "./Profile";
import ContactUs from "./ContactUs";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("dashboard");
  const [activeMenu, setActiveMenu] = useState("overview");

  const menuItems = [
    { id: "overview", label: "Overview", icon: FaHome },
    { id: "membership", label: "Membership", icon: FiCreditCard },
    { id: "profile", label: "Profile", icon: FaUser },
    { id: "contactUs", label: "Contact us", icon: MdEmail },
  ];

  return (
    <div className="min-h-screen bg-[#f6f6f4] overflow-x-hidden">
      <div className="max-w-[1380px] mx-auto flex">

        {/* ================= DESKTOP SIDEBAR ================= */}
        {userType !== "dashboard" && (
          <aside className="hidden lg:flex lg:flex-col lg:w-[260px] lg:shrink-0 bg-white border-r border-gray-200 min-h-screen">
            {/* Back */}
            <div className="px-5 py-6 border-b border-gray-200">
              <div
                onClick={() => router.push("/")}
                className="flex text-[13px] items-center gap-2 text-gray-600 hover:text-black cursor-pointer transition-colors"
              >
                <FaArrowLeft />
                <span>Back to Mendel</span>
              </div>
            </div>

            {/* Menu */}
            <div className="flex-1 py-4 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setActiveMenu(item.id)}
                    className={`flex ff-font text-[14px] items-center gap-3 px-5 py-[10px] cursor-pointer transition-colors ${
                      isActive
                        ? "bg-[#fff4d6] border-l-4 border-primary text-black font-semibold"
                        : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                  >
                    <Icon className="text-base" />
                    <span>{item.label}</span>
                  </div>
                );
              })}

              {/* Divider */}
              <div className="px-5">
                <div className="border-t border-gray-300 my-6"></div>
              </div>

              {/* Help */}
              <div className="px-5">
                <div className="bg-black text-white rounded-2xl p-5">
                  <p className="text-[11px] text-primary mb-2 font-semibold">
                    NEED HELP?
                  </p>
                  <p className="text-sm font-bold">
                    Reach out to our support team
                  </p>
                  <p className="text-xs text-primary mt-3">
                    info@mendelacademy.com
                  </p>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* ================= CONTENT ================= */}
        <div className="flex-1 w-full p-3 sm:p-4 lg:p-8">

          {/* ================= MOBILE 4-ITEM NAVIGATION (ONE LINE) ================= */}
          {userType !== "dashboard" && (
            <div className="lg:hidden mb-4 sm:mb-6">
              <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-1 sm:p-1.5 shadow-2xs">
                <div className="grid grid-cols-4 gap-1 sm:gap-1.5">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeMenu === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveMenu(item.id)}
                        className={`flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-1 sm:px-2 rounded-lg sm:rounded-xl text-[11px] sm:text-[13px] ff-font font-medium transition-all duration-150 cursor-pointer whitespace-nowrap select-none ${
                          isActive
                            ? "bg-primary text-black font-bold shadow-xs"
                            : "text-gray-600 hover:text-black hover:bg-gray-100"
                        }`}
                        title={item.label}
                      >
                        <Icon
                          className={`text-[12px] sm:text-[14px] shrink-0 ${
                            isActive ? "text-black" : "text-gray-500"
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 sm:space-y-6">
            {/* Render */}
            {userType === "dashboard" && <Dashboard />}

            {activeMenu === "overview" && userType === "new" && <NewuserOverview />}
            {activeMenu === "overview" && userType === "trial" && <OntrialOverview />}
            {activeMenu === "overview" && userType === "paid" && <PayingMemberOverview />}

            {activeMenu === "membership" && <Membership />}
            {activeMenu === "profile" && <Profile />}
            {activeMenu === "contactUs" && <ContactUs />}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM SWITCH ================= */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 
      bg-black rounded-2xl p-1 flex gap-1 z-[9999] overflow-x-auto max-w-[95%] whitespace-nowrap">

        {["dashboard", "new", "trial", "paid"].map((type) => (
          <button
            key={type}
            onClick={() => {
              setUserType(type);
              setActiveMenu("overview");
            }}
            className={`px-4 py-2 cursor-pointer rounded-xl text-sm ${userType === type
              ? "bg-yellow-400 text-black"
              : "text-white"
              }`}
          >
            {type === "dashboard"
              ? "Demo State"
              : type === "new"
                ? "New user"
                : type === "trial"
                  ? "On trial"
                  : "Paying member"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EditProfile;
