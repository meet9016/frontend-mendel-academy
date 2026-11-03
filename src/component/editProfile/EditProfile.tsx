"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlTab = new URLSearchParams(window.location.search).get("tab");
      if (urlTab && ["overview", "membership", "profile", "contactUs"].includes(urlTab)) {
        setActiveMenu(urlTab);
      }
    }
  }, []);

  useEffect(() => {
    const handleTabChange = (e: any) => {
      if (e?.detail && ["overview", "membership", "profile", "contactUs"].includes(e.detail)) {
        setActiveMenu(e.detail);
      }
    };
    window.addEventListener("editProfileTabChange", handleTabChange);
    return () => {
      window.removeEventListener("editProfileTabChange", handleTabChange);
    };
  }, []);

  const handleTabSelect = (tabId: string) => {
    setActiveMenu(tabId);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/editProfile?tab=${tabId}`);
      window.dispatchEvent(new CustomEvent("editProfileTabChange", { detail: tabId }));
    }
  };

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
        {(userType !== "dashboard" || activeMenu !== "overview") && (
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
                    onClick={() => handleTabSelect(item.id)}
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

          <div className="space-y-4 sm:space-y-6">
            {/* Render */}
            {activeMenu === "overview" && userType === "dashboard" && <Dashboard />}

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
              handleTabSelect("overview");
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
