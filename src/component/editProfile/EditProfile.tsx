import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa"; // Using for X (Twitter) icon
import { AiOutlineEdit } from "react-icons/ai";

const EditProfile = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border rounded-lg p-4 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">Musharof Chowdhury</h2>
            <p className="text-gray-500 text-sm">
              Team Manager | Arizona, United States
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100"><FaFacebookF /></button>
          <button className="p-2 rounded-full hover:bg-gray-100"><FaTwitter /></button>
          <button className="p-2 rounded-full hover:bg-gray-100"><FaLinkedinIn /></button>
          <button className="p-2 rounded-full hover:bg-gray-100"><FaInstagram /></button>
          <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
            <AiOutlineEdit className="mr-1" /> Edit
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Personal Information</h3>
          <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
            <AiOutlineEdit className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">First Name</p>
            <p className="font-medium">Chowdhury</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Name</p>
            <p className="font-medium">Musharof</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email address</p>
            <p className="font-medium">randomuser@pimjo.com</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="font-medium">+09 363 398 46</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Bio</p>
            <p className="font-medium">Team Manager</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="border rounded-lg p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Address</h3>
          <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
            <AiOutlineEdit className="mr-1" /> Edit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Country</p>
            <p className="font-medium">United States</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">City/State</p>
            <p className="font-medium">Arizona, United States</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Postal Code</p>
            <p className="font-medium">ERT 2489</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">TAX ID</p>
            <p className="font-medium">AS4568384</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
