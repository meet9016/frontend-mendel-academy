"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CommonButton from "@/comman/Button";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { getAuthId } from "@/utils/tokenManager";

interface MyCartProps {
  cartData: any[]; // change to your actual type
  cartTotalAmount: number;
  setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  MdRemoveShoppingCart: (cartId: string) => Promise<void>;
}

const MyCart: React.FC<MyCartProps> = ({
  cartData,
  cartTotalAmount,
  setIsCartOpen,
  MdRemoveShoppingCart,
}) => {
  const tempIdGet = sessionStorage.getItem("temp_id");
  const userId = getAuthId();
  const finalId = userId ? userId : tempIdGet;
  const router = useRouter();

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
        animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <motion.div
        key="cart-sidebar"
        initial={{ x: "100%", opacity: 0, rotateY: -25, scale: 0.95 }}
        animate={{ x: 0, opacity: 1, rotateY: 0, scale: 1 }}
        exit={{ x: "100%", opacity: 0, rotateY: -25, scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 14,
          duration: 0.7,
        }}
        className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 rounded-l-3xl overflow-hidden perspective-1000"
      >
        <motion.div
          className="flex flex-col h-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Header */}
          <div className="relative flex items-center justify-between p-6 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-white  border-primary p-3 rounded-xl shadow-lg">
                  <BiShoppingBag className="w-6 h-6 text-primary" />
                </div>
                {/* <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold ff-font-bold text-white">
                    5
                  </span>
                </div> */}
              </div>
              <div>
                <h2 className="text-2xl font-bold ff-font-bold flex items-center gap-2">
                  My Cart
                </h2>
                <p className="text-sm ff-font">
                  {/* {cartItems.length} courses selected */}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-yellow-50 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110"
            >
              <AiOutlineClose className="w-6 h-6 ff-font-bold" />
            </button>
          </div>

          {/* Animated Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {cartData.map((item) => (
              <div className="group relative bg-white border border-primary rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Delete Icon */}
                <button
                  onClick={() => MdRemoveShoppingCart(item._id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>

                <div className="flex gap-3 p-3 items-center justify-between bg-white rounded-xl ">
                  <div className="flex flex-col flex-1">
                    {/* Name */}
                    <h3 className="font-semibold ff-font-bold mb-1 line-clamp-2">
                      {/* {item.title} */}
                      {item.category_name}
                    </h3>

                    {/* Duration */}
                    <p className="text-xs text-black bg-white ff-font border border-primary px-2 py-0.5 rounded-full w-fit font-medium mb-1">
                      Duration: {item.duration} Days
                    </p>

                    {/* Quantity */}
                    <p className="text-xs ff-font-bold font-medium">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-lg font-bold ff-font-bold text-primary">
                    ₹{item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="border-t border-gray-200 p-6 bg-white space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-gray-500 ff-font-bold font-medium">
                Subtotal
              </span>
              <span className="font-bold ff-font-bold text-lg">
                ₹{cartTotalAmount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 ff-font-bold font-medium">
                Discount
              </span>
              <span className="font-bold ff-font-bold text-green-600 text-lg">
                ₹0.00
              </span>
            </div>
            {/* <div className="flex justify-between items-center bg-white rounded-xl p-4 border-2 border-primary">
                    <div>
                      <p className="text-xs text-gray-500 ff-font-bold font-medium">Total Amount</p>
                      <span className="text-3xl font-bold text-primary ff-font-bold">
                        ₹{cartTotalAmount}
                      </span>
                    </div>
                    <GiSparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
                  </div> */}
            {/* <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 rounded-xl hover:scale-[1.03] hover:shadow-md transition-all">
                    Checkout Now
                  </button> */}
            <CommonButton
              pyClass="py-3"
              pxClass="px-41"
              fontWeight={700}
              fontSize={15}
              onClick={() => {
                router.push(`/checkout/${finalId}`);
                setIsCartOpen(false);
              }}
            >
              CheckoutNow
            </CommonButton>
            {/* <button
                    className="w-full border border-primary ff-font-bold rounded-xl py-4 font-semibold"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button> */}
            <CommonButton
              pyClass="py-3"
              pxClass="px-46"
              fontWeight={700}
              fontSize={15}
              onClick={() => setIsCartOpen(false)}
            >
              Continue
            </CommonButton>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyCart;
