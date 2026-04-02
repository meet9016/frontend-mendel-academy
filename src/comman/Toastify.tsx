// "use client";

// import React from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Toastify = () => {
//   return (
//     <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop
//       closeOnClick
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="colored"
//     />
//   );
// };

// export default Toastify;

import toast, { Toaster } from 'react-hot-toast';

export const SuccessToast=(message:string)=>{
  toast.success(message);
}

export const ErrorToast=(message:string)=>{
  toast.error(message);
}

export const WarningToast=(message:string)=>{
  toast.error(message);
}

export const InfoToast=(message:string)=>{
  toast.success(message, {
  style: {
    border: '1px solid #713200',
    padding: '16px',
    color: '#713200',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});
}
export const Toastify = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
    />
  );
};

