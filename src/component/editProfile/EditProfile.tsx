// const EditProfile = () => {
//   const student = {
//     name: "Aarav Sharma",
//     email: "aarav@example.com",
//     phone: "+91 98765 43210",
//     joined: "January 2024",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   };

//   const books = [
//     { id: 1, title: "React Basics", purchasedOn: "2025-11-01" },
//     { id: 2, title: "Next.js Advanced", purchasedOn: "2025-10-15" },
//   ];

//   const payments = [
//     { id: 1, amount: 499, date: "2025-11-10", status: "Success" },
//     { id: 2, amount: 999, date: "2025-10-20", status: "Success" },
//   ];

//   const courses = [
//     {
//       id: 1,
//       name: "Next.js Full Course",
//       type: "Paid",
//       status: "Active",
//       expiresOn: "2025-12-10",
//     },
//     {
//       id: 2,
//       name: "Tailwind CSS Crash Course",
//       type: "Free",
//       status: "Expired",
//       expiresOn: "2025-11-30",
//     },
//   ];

//   const isExpiringSoon = (date: string) => {
//     const today = new Date();
//     const expiry = new Date(date);
//     const diff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
//     return diff <= 5 && diff >= 0;
//   };

//   const tagColor = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "paid": return "bg-gradient-to-r from-blue-400 to-blue-600 text-white";
//       case "free": return "bg-gradient-to-r from-green-400 to-green-600 text-white";
//       case "expired": return "bg-gradient-to-r from-red-400 to-red-600 text-white";
//       default: return "bg-gray-200 text-gray-800";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Student Profile Card */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center gap-6">
//           <img
//             src={student.avatar}
//             alt="Student Avatar"
//             className="w-20 h-20 rounded-full border-4 border-blue-400"
//           />
//           <div>
//             <h1 className="text-2xl font-extrabold text-gray-800">{student.name}</h1>
//             <p className="text-sm text-gray-600">{student.email}</p>
//             <p className="text-sm text-gray-600">{student.phone}</p>
//             <p className="text-xs text-gray-500 mt-1">Joined: {student.joined}</p>
//           </div>
//         </div>

//         {/* Dashboard Title */}
//         <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Dashboard Overview</h2>

//         {/* 3 Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Book Purchases */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               📚 Book Purchases
//             </h3>
//             <ul className="space-y-3">
//               {books.map((book) => (
//                 <li key={book.id} className="border-l-4 border-blue-400 pl-4">
//                   <p className="font-semibold text-gray-800">{book.title}</p>
//                   <p className="text-sm text-gray-500">Purchased: {book.purchasedOn}</p>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Payment History */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               💳 Payment History
//             </h3>
//             <ul className="space-y-3">
//               {payments.map((p) => (
//                 <li key={p.id} className="border-l-4 border-green-400 pl-4">
//                   <p className="font-semibold text-gray-800">₹{p.amount}</p>
//                   <p className="text-sm text-gray-500">{p.date} - <span className="text-green-600 font-medium">{p.status}</span></p>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Course Purchases */}
//           <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
//             <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//               🎓 Course Purchases
//             </h3>
//             <ul className="space-y-4">
//               {courses.map((course) => (
//                 <li
//                   key={course.id}
//                   className={`p-4 rounded-xl border-2 ${
//                     isExpiringSoon(course.expiresOn)
//                       ? "border-red-300 bg-red-50"
//                       : "border-gray-200 bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <p className="font-bold text-gray-800">{course.name}</p>
//                       <p className="text-sm text-gray-600 mt-1">Expires: {course.expiresOn}</p>
//                     </div>
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColor(course.type)}`}>
//                       {course.type}
//                     </span>
//                   </div>
//                   {isExpiringSoon(course.expiresOn) && (
//                     <p className="text-xs text-red-600 font-semibold mt-2">⚠️ Expires Soon – Renew Now!</p>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;



























import { FaBook, FaCreditCard, FaGraduationCap, FaChartLine, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdEmail, MdPhone, MdCalendarToday, MdPerson } from "react-icons/md";

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
    { id: 1, name: "Next.js Full Course", type: "Paid", status: "Active", expiresOn: "2025-12-10" },
    { id: 2, name: "Tailwind CSS Crash Course", type: "Free", status: "Expired", expiresOn: "2025-11-30" },
  ];

  const paymentsTotal = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeCourses = courses.filter((c) => c.status === "Active").length;

  const isExpiringSoon = (date: string) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 5 && diff >= 0;
  };

  const tagColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "paid": return "bg-blue-500 text-white";
      case "free": return "bg-green-500 text-white";
      case "expired": return "bg-red-500 text-white";
      default: return "bg-gray-300 text-gray-800";
    }
  };

  const stats = [
    { label: "Books Purchased", value: books.length.toString(), icon: FaBook, color: "bg-[#fff9df] text-primary" },
    { label: "Total Spent", value: `₹${paymentsTotal.toLocaleString()}`, icon: FaCreditCard, color: "bg-[#fff9df] text-primary" },
    { label: "Active Courses", value: activeCourses.toString(), icon: FaGraduationCap, color: "bg-[#fff9df] text-primary" },
    { label: "Learning Progress", value: "68%", icon: FaChartLine, color: "bg-[#fff9df] text-primary" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1380px] mx-auto space-y-8">

        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl overflow-hidden ring-3 ring-[#FFCA00]">
              <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FFCA00] rounded-lg flex items-center justify-center">
              <MdPerson className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold ff-font-bold mb-1">{student.name}</h1>
            <p className="ff-font text-sm mb-4">Student Profile</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdEmail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-800">{student.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdPhone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Phone</p>
                  <p className="text-sm font-medium ff-font-bold">{student.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                  <MdCalendarToday className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs ff-font text-gray-500">Member Since</p>
                  <p className="text-sm font-medium ff-font-bold">{student.joined}</p>
                </div>
              </div>
            </div>
          </div>

          {/* <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
            Edit Profile
          </button> */}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-start">
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
          <h2 className="text-2xl font-bold ff-font-bold">Dashboard Overview</h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Book Purchases */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaBook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold">Book Purchases</h3>
                <p className="text-xs ff-font text-gray-500">{books.length} books in library</p>
              </div>
            </div>
            <div className="space-y-4">
              {books.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-3 border-l-4 border-[#FFCA00] cursor-pointer hover:bg-[#fff9df] transition">
                  <div>
                    <p className=" ff-font-bold">{book.title}</p>
                    <p className="text-sm ff-font text-gray-500">
                      Purchased: {new Date(book.purchasedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaCreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold">Payment History</h3>
                <p className="text-xs ff-font text-gray-500">{payments.length} transactions</p>
              </div>
            </div>
            <div className="space-y-4">
              {payments.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-[#fff9df] rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#fff9df] flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm ff-font text-gray-500">
                        {new Date(p.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs font-medium ff-font">{p.status}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold ff-font-bold">₹{p.amount}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Course Purchases */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold0">Course Purchases</h3>
                <p className="text-xs ff-font text-gray-500">{courses.length} enrolled courses</p>
              </div>
            </div>
            <div className="space-y-4">
              {courses.map((c) => (
                <div key={c.id} className={`p-4 rounded-xl border-2 ${isExpiringSoon(c.expiresOn) ? "border-red-300 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold ff-font-bold">{c.name}</p>
                      <p className="text-sm ff-font text-gray-500 mt-1">Expires: {c.expiresOn}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColor(c.type)}`}>
                      {c.type}
                    </span>
                  </div>
                  {isExpiringSoon(c.expiresOn) && (
                    <p className="text-xs ff-font text-red-600 font-semibold mt-2 flex items-center gap-1">
                      <FaExclamationTriangle className="w-4 h-4" /> Expires Soon – Renew Now!
                    </p>
                  )}
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














