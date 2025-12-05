// import React from "react";
// import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa"; // Using for X (Twitter) icon
// import { AiOutlineEdit } from "react-icons/ai";

// const EditProfile = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-lg shadow-md">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row items-center justify-between border rounded-lg p-4 space-y-4 md:space-y-0">
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
//             alt="Profile"
//             className="w-20 h-20 rounded-full object-cover"
//           />
//           <div>
//             <h2 className="text-lg font-semibold">Musharof Chowdhury</h2>
//             <p className="text-gray-500 text-sm">
//               Team Manager | Arizona, United States
//             </p>
//           </div>
//         </div>
//         <div className="flex items-center space-x-3">
//           <button className="p-2 rounded-full hover:bg-gray-100"><FaFacebookF /></button>
//           <button className="p-2 rounded-full hover:bg-gray-100"><FaTwitter /></button>
//           <button className="p-2 rounded-full hover:bg-gray-100"><FaLinkedinIn /></button>
//           <button className="p-2 rounded-full hover:bg-gray-100"><FaInstagram /></button>
//           <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
//             <AiOutlineEdit className="mr-1" /> Edit
//           </button>
//         </div>
//       </div>

//       {/* Personal Information */}
//       <div className="border rounded-lg p-4 space-y-4">
//         <div className="flex justify-between items-center">
//           <h3 className="font-semibold text-gray-700">Personal Information</h3>
//           <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
//             <AiOutlineEdit className="mr-1" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-500 text-sm">First Name</p>
//             <p className="font-medium">Chowdhury</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Last Name</p>
//             <p className="font-medium">Musharof</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Email address</p>
//             <p className="font-medium">randomuser@pimjo.com</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Phone</p>
//             <p className="font-medium">+09 363 398 46</p>
//           </div>
//           <div className="md:col-span-2">
//             <p className="text-gray-500 text-sm">Bio</p>
//             <p className="font-medium">Team Manager</p>
//           </div>
//         </div>
//       </div>

//       {/* Address */}
//       <div className="border rounded-lg p-4 space-y-4">
//         <div className="flex justify-between items-center">
//           <h3 className="font-semibold text-gray-700">Address</h3>
//           <button className="flex items-center px-3 py-1 border rounded hover:bg-gray-50">
//             <AiOutlineEdit className="mr-1" /> Edit
//           </button>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-500 text-sm">Country</p>
//             <p className="font-medium">United States</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">City/State</p>
//             <p className="font-medium">Arizona, United States</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Postal Code</p>
//             <p className="font-medium">ERT 2489</p>
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">TAX ID</p>
//             <p className="font-medium">AS4568384</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;

// components/StudentDashboard.tsx

const EditProfile = () => {
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

  const isExpiringSoon = (date: string) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 5 && diff >= 0;
  };

  const tagColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "paid": return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
      case "free": return "bg-gradient-to-r from-green-400 to-green-600 text-white";
      case "expired": return "bg-gradient-to-r from-red-400 to-red-600 text-white";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-6">
          <img
            src={student.avatar}
            alt="Student Avatar"
            className="w-20 h-20 rounded-full border-4 border-blue-400"
          />
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">{student.name}</h1>
            <p className="text-sm text-gray-600">{student.email}</p>
            <p className="text-sm text-gray-600">{student.phone}</p>
            <p className="text-xs text-gray-500 mt-1">Joined: {student.joined}</p>
          </div>
        </div>

        {/* Dashboard Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Dashboard Overview</h2>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Book Purchases */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              📚 Book Purchases
            </h3>
            <ul className="space-y-3">
              {books.map((book) => (
                <li key={book.id} className="border-l-4 border-blue-400 pl-4">
                  <p className="font-semibold text-gray-800">{book.title}</p>
                  <p className="text-sm text-gray-500">Purchased: {book.purchasedOn}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              💳 Payment History
            </h3>
            <ul className="space-y-3">
              {payments.map((p) => (
                <li key={p.id} className="border-l-4 border-green-400 pl-4">
                  <p className="font-semibold text-gray-800">₹{p.amount}</p>
                  <p className="text-sm text-gray-500">{p.date} - <span className="text-green-600 font-medium">{p.status}</span></p>
                </li>
              ))}
            </ul>
          </div>

          {/* Course Purchases */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🎓 Course Purchases
            </h3>
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course.id}
                  className={`p-4 rounded-xl border-2 ${
                    isExpiringSoon(course.expiresOn)
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{course.name}</p>
                      <p className="text-sm text-gray-600 mt-1">Expires: {course.expiresOn}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColor(course.type)}`}>
                      {course.type}
                    </span>
                  </div>
                  {isExpiringSoon(course.expiresOn) && (
                    <p className="text-xs text-red-600 font-semibold mt-2">⚠️ Expires Soon – Renew Now!</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;