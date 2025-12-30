"use client";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import CommonButton from "@/comman/Button";
import endPointApi from "@/utils/endPointApi";
import { api } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCartCount } from "@/redux/cartSlice";
import { AppDispatch } from "@/redux/store";
import { getAuthId } from "@/utils/tokenManager";
import { getTempId } from "@/utils/helper";

export type HyperSpecialistItem = {
  _id: string;
  id: string;
  title: string;
  description: string;
  price_dollar: number;
  price_inr: number;
  display_price: number;
  currency: string;
  tag?: string;
  tags: string[];
};

type CartItem = {
  _id: string;
  hyperspecialist_id?: string | { _id: string };
  cart_type?: string;
};

export default function Hero() {
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState<HyperSpecialistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [cartItemsLoaded, setCartItemsLoaded] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ✅ NEW: Fetch cart items and preselect hyperspecialist modules
  const loadCartItems = useCallback(async () => {
    try {
      const userId = getAuthId();
      const tempId = getTempId();
      const finalId = userId || tempId;

      if (!finalId) {
        console.log("No ID available for cart loading");
        setCartItemsLoaded(true);
        return;
      }

      const res = await api.get(`${endPointApi.getCart}?temp_id=${finalId}`);

      if (res.data && res.data.cart) {
        // Extract hyperspecialist IDs from cart
        const hyperspecialistIds = res.data.cart
          .filter((item: CartItem) => item.cart_type === "hyperspecialist")
          .map((item: CartItem) => {
            // Handle both object and string format
            if (
              typeof item.hyperspecialist_id === "object" &&
              item.hyperspecialist_id?._id
            ) {
              return item.hyperspecialist_id._id;
            }
            return item.hyperspecialist_id;
          })
          .filter(Boolean); // Remove any null/undefined values

        if (hyperspecialistIds.length > 0) {
          setSelected(hyperspecialistIds);
        }
      }
    } catch (error) {
      console.error("Error loading cart items:", error);
    } finally {
      setCartItemsLoaded(true);
    }
  }, []);

  const getLiveCoursesData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get(`${endPointApi.getAllHyperSpecialist}`);

      if (res.data.success) {
        setData(res.data.data as HyperSpecialistItem[]);
        setCurrency(res.data.currency || "USD");
      }
    } catch (err) {
      console.error("Error fetching HyperSpecialist modules:", err);
      toast.error("Failed to load modules");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch cart count on mount
  const fetchCartCount = useCallback(async () => {
    try {
      const userId = getAuthId();
      const tempId = getTempId();
      const finalId = userId || tempId;

      if (!finalId) {
        console.log("No ID available for cart count");
        return;
      }

      const res = await api.get(`${endPointApi.cartCount}/${finalId}`);
      if (res.data) {
        dispatch(setCartCount(res.data.count));
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }, [dispatch]);

  const addToCart = async () => {
    if (selected.length === 0) {
      toast.error("Please select at least one module");
      return;
    }

    setAddingToCart(true);

    try {
      const userId = getAuthId();
      const tempId = getTempId();

      // ✅ Build payload with proper ID handling
      const cartPayload: any = {
        hyperspecialist_id: "",
        bucket_type: true,
      };

      // Prioritize user_id over temp_id
      if (userId && userId !== "null") {
        cartPayload.user_id = userId;
      } else if (tempId && tempId !== "null") {
        cartPayload.temp_id = tempId;
      } else {
        toast.error("Session expired. Please refresh the page.");
        setAddingToCart(false);
        return;
      }

      // Add each selected module to cart
      const promises = selected.map((moduleId) => {
        return api.post(endPointApi.postAddHyperSpecialistToCart!, {
          ...cartPayload,
          hyperspecialist_id: moduleId,
        });
      });

      const results = await Promise.all(promises);

      // ✅ Count successes
      const successResults = results.filter((r) => r.data.success);
      const newAdditions = successResults.filter((r) => !r.data.alreadyInCart);
      const alreadyInCart = successResults.filter((r) => r.data.alreadyInCart);

      if (successResults.length === selected.length) {
        // ✅ Update cart count from the last response
        const lastResponse = results[results.length - 1];
        if (lastResponse.data.count !== undefined) {
          dispatch(setCartCount(lastResponse.data.count));
        } else {
          // ✅ Fallback: Fetch cart count manually
          await fetchCartCount();
        }

        // Show appropriate message
        if (newAdditions.length > 0 && alreadyInCart.length > 0) {
          toast.success(
            `${newAdditions.length} module${newAdditions.length > 1 ? "s" : ""
            } added to cart. ${alreadyInCart.length} ${alreadyInCart.length > 1 ? "were" : "was"
            } already in cart.`
          );
        } else if (alreadyInCart.length === selected.length) {
          toast.info(`All selected modules are already in your cart!`);
        } else {
          toast.success(
            `${newAdditions.length} module${newAdditions.length > 1 ? "s" : ""
            } added to cart!`
          );
        }

        // ✅ Don't clear selection - keep items selected to show they're in cart
        // setSelected([]);
      } else {
        toast.warning(
          `${successResults.length} of ${selected.length} modules processed`
        );
        // ✅ Still update cart count
        await fetchCartCount();
      }
    } catch (error: any) {
      console.error("Error adding to cart:", error);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  // ✅ Load modules and cart items in sequence
  useEffect(() => {
    const loadData = async () => {
      // First load modules
      await getLiveCoursesData();
      // Then load cart items to preselect
      await loadCartItems();
      // Finally fetch cart count
      await fetchCartCount();
    };

    loadData();
  }, [getLiveCoursesData, loadCartItems, fetchCartCount]);

  const currencySymbol = currency === "INR" ? "₹" : "$";

  return (
    <section className="relative bg-white px-4 py-10 text-black">
      <div className="max-w-[1380px] mx-auto">
        {/* Heading */}
        <h1 className="text-2xl md:text-4xl ff-font-bold font-bold mb-4">
          Select Your Modules
        </h1>

        <p className="ff-font mb-8">
          Craft your own intelligence stack. Choose only the modules you need
          and build a system that grows with your ambition.
        </p>

        {/* Loading State */}
        {loading || !cartItemsLoaded ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-yellow-500"></div>
          </div>
        ) : (
          <>
            {/* Modules Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {data.map((m, i) => {
                const active = selected.includes(m._id || m.id);

                return (
                  <motion.div
                    key={m._id || m.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -6 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => toggle(m._id || m.id)}
                    className={`relative cursor-pointer rounded-2xl border p-6 transition-all duration-300 flex flex-col h-full
                    ${active
                        ? "border-primary bg-yellow-50 shadow-[0_0_30px_rgba(250,204,21,0.25)]"
                        : "border-gray-200 bg-white hover:border-[#FFCA00]"
                      }`}
                  >

                    {/* Active Check */}
                    <div className="absolute top-4 right-4">
                      {active ? (
                        <FaCheckCircle className="text-yellow-500 text-xl" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-gray-300" />
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4 mt-6">
                      <h3 className="text-lg font-semibold ff-font-bold truncate">
                        {m.title}
                      </h3>
                    </div>

                    <p className="mb-4 text-md ff-font text-gray-600 h-[52px] line-clamp-3">
                      {m.description}
                    </p>

                    {m.tags && m.tags.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {m.tags.map((tag, idx) => (
                          <li key={idx} className="flex gap-2 text-md ff-font">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#FFCA00]" />
                            <span className="truncate">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto flex items-center justify-between pt-6 ">
                      <span className="text-xl font-bold">
                        {currencySymbol}
                        {m.display_price ||
                          (currency === "INR" ? m.price_inr : m.price_dollar)}
                      </span>

                      <span
                        className={`text-sm font-medium transition-colors
                        ${active
                            ? "text-yellow-600"
                            : "text-gray-500 group-hover:text-yellow-600"
                          }`}
                      >
                        {active ? "Selected" : "Click to select"}
                      </span>
                    </div>

                  </motion.div>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="ff-font">
                Selected Modules:{" "}
                <span className="font-bold text-black">{selected.length}</span>
              </div>
              <CommonButton
                pyClass="py-2"
                pxClass="px-7"
                fontWeight={700}
                fontSize={14}
                onClick={addToCart}
                disabled={selected.length === 0 || addingToCart}
              >
                {addingToCart
                  ? "Adding..."
                  : `Add ${selected.length > 0 ? selected.length : ""} to Cart`}
              </CommonButton>
            </div>
          </>
        )}
      </div>
    </section>
  );
}