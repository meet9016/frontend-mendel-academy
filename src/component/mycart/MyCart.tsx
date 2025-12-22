"use client";
import React from "react";
import { motion } from "framer-motion";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiTrash2, FiBook, FiVideo, FiEdit3, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import CommonButton from "@/comman/Button";

// ✅ Helper function to get icon for option type
const getOptionIcon = (type) => {
  switch (type) {
    case "record-book":
      return <FiBook className="w-3 h-3" />;
    case "video":
      return <FiVideo className="w-3 h-3" />;
    case "writing-book":
      return <FiEdit3 className="w-3 h-3" />;
    default:
      return <FiBook className="w-3 h-3" />;
  }
};

// ✅ Helper function to get title for option type
const getOptionTitle = (type) => {
  switch (type) {
    case "record-book":
      return "Record Book";
    case "video":
      return "Video Course";
    case "writing-book":
      return "Writing Book";
    default:
      return type;
  }
};

// ✅ Smart URL Generator based on product type
const getProductUrl = (item) => {
  if (item.redirect_url) {
    return item.redirect_url;
  }

  const productId = item.product_id?._id || item.product_id;

  if (!productId) {
    console.warn("No product ID available for cart item:", item);
    return null;
  }

  const category = item.category_name?.toLowerCase() || "";

  if (category.includes("pathology")) {
    return `/pathology/${productId}`;
  } else if (category.includes("medical") || category.includes("exam")) {
    const examId = item.exam_id || "default-exam";
    return `/medicalexam/${examId}/course/${productId}`;
  } else if (item.product_type === "course") {
    return `/course/${productId}`;
  }

  return `/product/${productId}`;
};

const MyCart = ({
  cartData,
  cartTotalAmount,
  setIsCartOpen,
  MdRemoveShoppingCart,
  removeCartOption,
  isLoading = false, // ✅ NEW: Loading prop
}) => {
  const router = useRouter();

  // ✅ Handle cart item click
  const handleCartItemClick = (item, e) => {
    if (
      e.target.closest('[data-action="delete"]') ||
      e.target.closest('[data-action="remove-option"]')
    ) {
      return;
    }

    const url = getProductUrl(item);

    if (url) {
      setIsCartOpen(false);
      router.push(url);
    } else {
      console.error("Could not determine URL for item:", item);
    }
  };

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
                <div className="bg-white border-primary p-3 rounded-xl shadow-lg">
                  <BiShoppingBag className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl ff-font-bold font-bold">My Cart</h2>
                <p className="text-sm ff-font">
                  {!isLoading && cartData.length > 0 && `${cartData.length} ${cartData.length === 1 ? 'course' : 'courses'} selected`}
                  {isLoading && "Loading..."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-yellow-50 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>

          {/* ✅ LOADING STATE */}
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="relative">
                {/* Spinning cart icon */}
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#FFCA00]"></div>
                <BiShoppingBag className="w-8 h-8 text-[#FFCA00] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="mt-4 text-gray-500 ff-font">Loading your cart...</p>
            </div>
          ) : (
            /* ✅ CART ITEMS (Only show when not loading) */
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <BiShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                </div>
              ) : (
                cartData.map((item) => (
                  <div
                    key={item._id}
                    className="group relative bg-white border border-primary rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#FFCA00] transition-all duration-300"
                  >
                    {/* Clickable Content Area */}
                    <div
                      onClick={(e) => handleCartItemClick(item, e)}
                      className="cursor-pointer p-4"
                    >
                      {/* Header Row: Title + Price + Delete */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        {/* Title */}
                        <h3 className="ff-font-bold font-bold flex-1 line-clamp-2 transition-colors">
                          {item.product_id?.title || item.category_name}
                        </h3>

                        {/* Price (Always Visible) */}
                        <div className="text-lg font-bold text-primary whitespace-nowrap">
                          ₹{item.total_price || item.price}
                        </div>

                        {/* Delete Button (Separate, doesn't overlap) */}
                        <button
                          data-action="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            MdRemoveShoppingCart(item._id);
                          }}
                          className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0"
                          title="Remove from cart"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Duration Badge */}
                      <div className="flex ff-font-bold items-center gap-2 mb-3">
                        <span className="text-xs bg-white border border-primary px-2.5 py-1 rounded-full font-medium">
                          Duration: {item.duration} Months
                        </span>
                        <span className="text-xs font-medium ff-font-bold">
                          Qty: {item.quantity}
                        </span>
                      </div>

                      {/* Selected Bundle Options */}
                      {item.selected_options && item.selected_options.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {item.selected_options.map((optionType) => (
                            <div
                              key={optionType}
                              className="flex items-center gap-1.5 bg-yellow-50 border border-primary px-2.5 py-1 rounded-full text-xs group/option"
                            >
                              {getOptionIcon(optionType)}
                              <span className="font-medium">
                                {getOptionTitle(optionType)}
                              </span>

                              {/* Remove individual option */}
                              {item.selected_options.length > 1 && removeCartOption && (
                                <button
                                  data-action="remove-option"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCartOption(item._id, optionType);
                                  }}
                                  className="ml-0.5 p-0.5 rounded-full hover:bg-red-100 hover:text-red-500 opacity-0 group-hover/option:opacity-100 transition-all"
                                  title={`Remove ${getOptionTitle(optionType)}`}
                                >
                                  <FiX className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-2 right-3 text-xs ff-font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      Click to view →
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ✅ Footer (Only show when NOT loading AND has items) */}
          {!isLoading && cartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="border-t border-gray-200 p-6 bg-white space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="ff-font-bold font-medium">Subtotal</span>
                <span className="font-bold text-lg">₹{cartTotalAmount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="ff-font-bold font-medium">Discount</span>
                <span className="font-bold text-green-600 text-lg">₹0.00</span>
              </div>

              <CommonButton
                pyClass="py-3"
                pxClass="px-38"
                fontSize={18}
                onClick={() => {
                  const tempIdGet = sessionStorage.getItem("temp_id");
                  const userId = localStorage.getItem("user_id");
                  const finalId = userId || tempIdGet;
                  router.push(`/checkout/${finalId}`);
                  setIsCartOpen(false);
                }}
              >
                Checkout Now
              </CommonButton>

              <CommonButton
                className="bg-white border border-primary"
                pyClass="py-3"
                pxClass="px-34"
                fontSize={18}
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </CommonButton>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyCart;