import React from "react";
import { motion } from "framer-motion";
import { BiShoppingBag } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiTrash2, FiBook, FiVideo, FiEdit3, FiX } from "react-icons/fi";

// Helper function to format currency
const formatCurrency = (amount: number, currency: string) => {
  const safeAmount = Number(amount) || 0;
  if (currency === 'INR') {
    return `₹${safeAmount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
  return `$${safeAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

// Helper function to get icon for option type
const getOptionIcon = (type: string) => {
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

// Helper function to get title for option type
const getOptionTitle = (type: string) => {
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

// ✅ ENHANCED: Helper to format duration with better fallback logic
const formatDuration = (item: any) => {
  if (item.cart_type === 'exam_plan') {
    let months = item.plan_details?.plan_month ||
      item.plan_details?.plan_day ||
      item.duration;

    if (typeof months === 'string') {
      months = months.replace(/[^\d]/g, '');
    }

    const monthValue = Number(months);

    if (isNaN(monthValue) || monthValue === 0) {
      if (item.exam_category_id?.choose_plan_list) {
        const matchingPlan = item.exam_category_id.choose_plan_list.find(
          (p: any) => p._id === item.plan_id
        );
        if (matchingPlan) {
          const planDuration = Number(matchingPlan.plan_month || matchingPlan.plan_day);
          if (!isNaN(planDuration) && planDuration > 0) {
            return `${planDuration} Month${planDuration !== 1 ? 's' : ''}`;
          }
        }
      }
      return 'Duration not specified';
    }

    return `${monthValue} Month${monthValue !== 1 ? 's' : ''}`;
  }
  else if (item.cart_type === 'hyperspecialist') {
    return 'Lifetime Access';
  }
  else {
    const duration = item.duration;
    const durationValue = Number(duration);

    if (isNaN(durationValue) || durationValue === 0) {
      return 'Duration not specified';
    }

    return `${durationValue} Month${durationValue !== 1 ? 's' : ''}`;
  }
};

// ✅ FIXED: Smart URL Generator based on product type
const getProductUrl = (item: any) => {
  if (item.redirect_url) {
    return item.redirect_url;
  }

  if (item.cart_type === 'exam_plan') {
    const examCategoryId = item.exam_category_id?._id || item.exam_category_id;
    if (examCategoryId) {
      return `/medicalexam/${examCategoryId}`;
    }
    console.warn("No exam_category_id available for exam_plan item:", item);
    return null;
  }

  if (item.cart_type === 'prerecord') {
    const productId = item.product_id?._id || item.product_id;
    if (productId) {
      return `/pathology/${productId}`;
    }
    console.warn("No product_id available for prerecord item:", item);
    return null;
  }

  if (item.cart_type === 'hyperspecialist') {
    return '/pathology/hyperspecialist';
  }

  return null;
};

// ✅ NEW: Get title and subtitle for cart item based on type
const getCartItemTitles = (item: any) => {
  if (item.cart_type === 'exam_plan') {
    // For exam plans: Show exam name as primary, category as secondary
    const examName = item.exam_category_id?.exams?.[0]?.exam_name ||
      item.exam_category_id?.exams?.[0]?.title ||
      'Exam';
    const categoryName = item.category_name || item.exam_category_id?.category_name;

    return {
      primary: examName,
      secondary: categoryName
    };
  }

  if (item.cart_type === 'hyperspecialist') {
    return {
      primary: item.hyperspecialist_id?.title || item.title || item.category_name || 'Hyperspecialist Module',
      secondary: null
    };
  }

  // For prerecord
  return {
    primary: item.product_id?.title || item.category_name || 'Product',
    secondary: null
  };
};

interface MyCartProps {
  cartData?: any[];
  cartTotalAmount?: number;
  setIsCartOpen: (isOpen: boolean) => void;
  MdRemoveShoppingCart: (cartId: string) => void;
  removeCartOption?: (cartId: string, optionType: string) => Promise<boolean>;
  isLoading?: boolean;
  currency?: string;
  onCartUpdate?: () => void;
}

const MyCart: React.FC<MyCartProps> = ({
  cartData = [],
  cartTotalAmount = 0,
  setIsCartOpen,
  MdRemoveShoppingCart,
  removeCartOption,
  isLoading = false,
  currency = 'USD',
  onCartUpdate
}) => {
  const handleCartItemClick = (item: any, e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest('[data-action="delete"]') ||
      (e.target as HTMLElement).closest('[data-action="remove-option"]')
    ) {
      return;
    }

    const url = getProductUrl(item);
    if (url) {
      setIsCartOpen(false);
      window.location.href = url;
    } else {
      console.error("Could not determine URL for item:", item);
    }
  };

  const handleRemoveOption = async (cartId: string, optionType: string) => {
    if (removeCartOption) {
      const success = await removeCartOption(cartId, optionType);
      if (success && onCartUpdate) {
        onCartUpdate();
      }
    }
  };

  const handleCheckout = () => {
    const tempIdGet = sessionStorage.getItem("temp_id");
    const userId = localStorage.getItem("user_id");
    const finalId = userId || tempIdGet;
    window.location.href = `/checkout/${finalId}`;
    setIsCartOpen(false);
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
        className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 rounded-l-3xl overflow-hidden"
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
              <div className="bg-white border-2 border-yellow-400 p-3 rounded-xl shadow-lg">
                <BiShoppingBag className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">My Cart</h2>
                <p className="text-sm text-gray-600">
                  {!isLoading && cartData.length > 0 && `${cartData.length} ${cartData.length === 1 ? 'item' : 'items'}`}
                  {isLoading && "Loading..."}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-yellow-50 rounded-xl transition-all duration-200 hover:scale-110"
            >
              <AiOutlineClose className="w-6 h-6" />
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-yellow-500"></div>
                <BiShoppingBag className="w-8 h-8 text-yellow-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="mt-4 text-gray-500">Loading your cart...</p>
            </div>
          ) : (
            /* Cart Items */
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <BiShoppingBag className="w-16 h-16 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                </div>
              ) : (
                cartData.map((item) => {
                  const itemCurrency = item.currency || currency;
                  const itemPrice = item.total_price || item.price || 0;
                  const { primary, secondary } = getCartItemTitles(item);

                  return (
                    <div
                      key={item._id}
                      className="group relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-yellow-400 transition-all duration-300"
                    >
                      {/* Clickable Content Area */}
                      <div
                        onClick={(e) => handleCartItemClick(item, e)}
                        className="cursor-pointer p-4"
                      >
                        {/* Header: Title + Price + Delete */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="font-bold line-clamp-2">
                              {primary}
                            </h3>
                            {secondary && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {secondary}
                              </p>
                            )}
                          </div>

                          <div className="text-lg font-bold text-yellow-600 whitespace-nowrap">
                            {formatCurrency(itemPrice, itemCurrency)}
                          </div>

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
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs bg-white border border-yellow-400 px-2.5 py-1 rounded-full font-medium">
                            {formatDuration(item)}
                          </span>
                          <span className="text-xs font-medium">
                            Qty: {item.quantity}
                          </span>
                        </div>

                        {/* Selected Bundle Options (for prerecord items only) */}
                        {item.cart_type === 'prerecord' && item.selected_options && item.selected_options.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {item.selected_options.map((optionType: string) => (
                              <div
                                key={optionType}
                                className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-400 px-2.5 py-1 rounded-full text-xs group/option"
                              >
                                {getOptionIcon(optionType)}
                                <span className="font-medium">
                                  {getOptionTitle(optionType)}
                                </span>

                                {/* ✅ Show remove button if more than 1 option */}
                                {item.selected_options.length > 1 && (
                                  <button
                                    data-action="remove-option"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveOption(item._id, optionType);
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
                      <div className="absolute bottom-2 right-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Click to view →
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Footer */}
          {!isLoading && cartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="border-t border-gray-200 p-6 bg-white space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold text-lg">
                  {formatCurrency(cartTotalAmount, cartData[0]?.currency || currency)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Discount</span>
                <span className="font-bold text-green-600 text-lg">
                  {formatCurrency(0, cartData[0]?.currency || currency)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-xl transition-all duration-300 shadow-md"
              >
                Checkout Now
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-white border-2 border-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-50 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default MyCart;