"use client";
import { useState } from "react";
import { FaArrowLeft, FaBoxOpen, FaHome, FaUser } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

import OntrialOverview from "./On Trial/OntrialOverview";
import PayingMemberOverview from "./Paying Member/PayingMemberOverview";
import NewuserOverview from "./New User/NewuserOverview";
import Dashboard from "./Demo State/Dashboard";
import Membership from "./Membership";
import MyProduct from "./MyProduct";
import Profile from "./Profile";
import ContactUs from "./ContactUs";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [userType, setUserType] = useState("dashboard");
  const [activeMenu, setActiveMenu] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="min-h-screen bg-[#f6f6f4] overflow-x-hidden">
      <div className="max-w-[1380px] mx-auto flex">

        {/* ================= SIDEBAR ================= */}
        {userType !== "dashboard" && (
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 
              ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"} lg:hidden`}
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar */}
            <div
              className={`fixed top-0 left-0 z-50 h-full w-[260px] bg-white border-r border-gray-200 flex flex-col 
              transform transition-transform duration-300 ease-in-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:translate-x-0 lg:static lg:min-h-screen`}
            >

              {/* Back */}
              <div className="px-5 py-6 border-b border-gray-200">
                <div
                  className="flex text-[13px] items-center gap-2 text-md text-gray-600 cursor-pointer">
                  <FaArrowLeft />
                  <span>Back to Mendel</span>
                </div>
              </div>

              {/* Menu */}
              <div className="flex-1 py-4 overflow-y-auto">
                {/* Overview */}
                <div
                  onClick={() => {
                    setActiveMenu("overview");
                    setSidebarOpen(false);
                  }}
                  className={`flex ff-font text-[14px] items-center gap-3 px-5 py-[10px] cursor-pointer ${activeMenu === "overview"
                    ? "bg-[#fff4d6] border-l-4 border-primary text-black"
                    : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                >
                  <FaHome />
                  <span>Overview</span>
                </div>

                {/* Membership */}
                <div
                  onClick={() => {
                    setActiveMenu("membership");
                    setSidebarOpen(false);
                  }}
                  className={`flex ff-font text-[14px] items-center gap-3 px-5 py-[10px] cursor-pointer ${activeMenu === "membership"
                    ? "bg-[#fff4d6] border-l-4 border-primary text-black"
                    : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                >
                  <FiCreditCard />
                  <span>Membership</span>
                </div>

                {/* My Product */}
                <div
                  onClick={() => {
                    setActiveMenu("myProduct");
                    setSidebarOpen(false);
                  }}
                  className={`flex ff-font text-[14px] items-center gap-3 px-5 py-[10px] cursor-pointer ${activeMenu === "myProduct"
                    ? "bg-[#fff4d6] border-l-4 border-primary text-black"
                    : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                >
                  <FaBoxOpen />
                  <span>My products</span>
                </div>

                {/* Profile */}
                <div
                  onClick={() => {
                    setActiveMenu("profile");
                    setSidebarOpen(false);
                  }}
                  className={`flex ff-font text-[14px] items-center gap-3 px-5 py-[10px] cursor-pointer ${activeMenu === "profile"
                    ? "bg-[#fff4d6] border-l-4 border-primary text-black"
                    : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </div>

                {/* Contact */}
                <div
                  onClick={() => {
                    setActiveMenu("contactUs");
                    setSidebarOpen(false);
                  }}
                  className={`flex text-[14px] ff-font items-center gap-3 px-5 py-[10px] cursor-pointer ${activeMenu === "contactUs"
                    ? "bg-[#fff4d6] border-l-4 border-primary text-black"
                    : "text-gray-600 hover:bg-[#fffbf1]"
                    }`}
                >
                  <MdEmail />
                  <span>Contact us</span>
                </div>

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
            </div>
          </>
        )}

        {/* ================= CONTENT ================= */}
        <div className="flex-1 w-full p-4 lg:p-8 space-y-6">

          {/* Hamburger (VISIBLE till 1023px including 768) */}
          {userType !== "dashboard" && (
            <div className="lg:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 bg-white border rounded-lg shadow-sm"
              >
                ☰
              </button>
            </div>
          )}

          {/* Render */}
          {userType === "dashboard" && <Dashboard />}

          {activeMenu === "overview" && userType === "new" && <NewuserOverview />}
          {activeMenu === "overview" && userType === "trial" && <OntrialOverview />}
          {activeMenu === "overview" && userType === "paid" && <PayingMemberOverview />}

          {activeMenu === "membership" && <Membership />}
          {activeMenu === "myProduct" && <MyProduct />}
          {activeMenu === "profile" && <Profile />}
          {activeMenu === "contactUs" && <ContactUs />}
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