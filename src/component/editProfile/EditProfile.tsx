"use client";
import { useState } from "react";
import { FaBoxOpen, FaHome, FaUser } from "react-icons/fa";
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

const EditProfile = () => {
  // ✅ separated state
  const [userType, setUserType] = useState("dashboard"); // dashboard / new / trial / paid
  const [activeMenu, setActiveMenu] = useState("overview"); // sidebar control
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f6f4]">
      <div className="max-w-[1380px] mx-auto flex flex-col md:flex-row">

        {/* ================= SIDEBAR ================= */}
        {userType !== "dashboard" && (
          <>
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className={`fixed md:sticky md:top-0 top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>

              {/* Back */}
              <div className="px-5 py-4 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                  ← Back to Mendel
                </div>
              </div>

              {/* Menu */}
              <div className="flex-1 py-2">

                {/* Overview */}
                <div
                  onClick={() => setActiveMenu("overview")}
                  className={`flex items-center gap-3 px-5 py-[15px] cursor-pointer ${
                    activeMenu === "overview"
                      ? "bg-[#fff4d6] border-l-4 border-primary text-black font-bold"
                      : "text-gray-600 hover:bg-[#fffbf1]"
                  }`}
                >
                  <FaHome />
                  <span>Overview</span>
                </div>

                {/* Membership */}
                <div
                  onClick={() => setActiveMenu("membership")}
                  className={`flex items-center gap-3 px-5 py-[15px] cursor-pointer ${
                    activeMenu === "membership"
                      ? "bg-[#fff4d6] border-l-4 border-primary text-black font-bold"
                      : "text-gray-600 hover:bg-[#fffbf1]"
                  }`}
                >
                  <FiCreditCard />
                  <span>membership</span>
                </div>

                {/* My Product */}
                <div
                  onClick={() => setActiveMenu("myProduct")}
                  className={`flex items-center gap-3 px-5 py-[15px] cursor-pointer ${
                    activeMenu === "myProduct"
                      ? "bg-[#fff4d6] border-l-4 border-primary text-black font-bold"
                      : "text-gray-600 hover:bg-[#fffbf1]"
                  }`}
                >
                  <FaBoxOpen />
                  <span>My products</span>
                </div>

                {/* Profile */}
                <div
                  onClick={() => setActiveMenu("profile")}
                  className={`flex items-center gap-3 px-5 py-[15px] cursor-pointer ${
                    activeMenu === "profile"
                      ? "bg-[#fff4d6] border-l-4 border-primary text-black font-bold"
                      : "text-gray-600 hover:bg-[#fffbf1]"
                  }`}
                >
                  <FaUser />
                  <span>Profile</span>
                </div>

                {/* Contact */}
                <div
                  onClick={() => setActiveMenu("contactUs")}
                  className={`flex items-center gap-3 px-5 py-[15px] cursor-pointer ${
                    activeMenu === "contactUs"
                      ? "bg-[#fff4d6] border-l-4 border-primary text-black font-bold"
                      : "text-gray-600 hover:bg-[#fffbf1]"
                  }`}
                >
                  <MdEmail />
                  <span>Contact us</span>
                </div>

                {/* Divider */}
                <div className="px-5">
                  <div className="border-t border-gray-300 my-4"></div>
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

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex-1 p-4 md:p-8 space-y-6">

          {userType !== "dashboard" && (
            <div className="md:hidden">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 bg-white border rounded-lg"
              >
                ☰
              </button>
            </div>
          )}

          {/* ✅ Render Logic */}
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

      {/* ================= DEMO SWITCH ================= */}
      <div className="fixed bottom-4 right-1/2 translate-x-1/2 md:right-6 md:translate-x-0 bg-black rounded-2xl p-1 flex gap-1 z-[9999] overflow-x-auto max-w-[95%]">

        <button
          onClick={() => {
            setUserType("dashboard");
            setActiveMenu("overview");
          }}
          className={`px-4 py-2 rounded-xl text-sm ${
            userType === "dashboard"
              ? "bg-yellow-400 text-black"
              : "text-white"
          }`}
        >
          Demo State
        </button>

        <button
          onClick={() => {
            setUserType("new");
            setActiveMenu("overview");
          }}
          className={`px-4 py-2 rounded-xl text-sm ${
            userType === "new"
              ? "bg-yellow-400 text-black"
              : "text-white"
          }`}
        >
          New user
        </button>

        <button
          onClick={() => {
            setUserType("trial");
            setActiveMenu("overview");
          }}
          className={`px-4 py-2 rounded-xl text-sm ${
            userType === "trial"
              ? "bg-yellow-400 text-black"
              : "text-white"
          }`}
        >
          On trial
        </button>

        <button
          onClick={() => {
            setUserType("paid");
            setActiveMenu("overview");
          }}
          className={`px-4 py-2 rounded-xl text-sm ${
            userType === "paid"
              ? "bg-yellow-400 text-black"
              : "text-white"
          }`}
        >
          Paying member
        </button>
      </div>
    </div>
  );
};

export default EditProfile;