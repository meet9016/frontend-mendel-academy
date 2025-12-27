"use client";
import { api } from "@/utils/axiosInstance";
import endPointApi from "@/utils/endPointApi";
import { getAuthId } from "@/utils/tokenManager";
import { useEffect, useState, useRef } from "react";
import {
  FaBook,
  FaCreditCard,
  FaGraduationCap,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCamera,
  FaEdit,
  FaTimes,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdEmail, MdPhone, MdCalendarToday, MdPerson } from "react-icons/md";
import { toast } from "react-toastify";

const EditProfile = () => {
  const userId = getAuthId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cropContainerRef = useRef<HTMLDivElement>(null);

  const [profileData, setProfileData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showCropModal, setShowCropModal] = useState<boolean>(false);
  const [showPhotoPreview, setShowPhotoPreview] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [cropData, setCropData] = useState({
    x: 0,
    y: 0,
    size: 200,
    scale: 1
  });
  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  const isExpiringSoon = (date: string) => {
    const today = new Date();
    const expiry = new Date(date);
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diff <= 5 && diff >= 0;
  };

  const stats = [
    {
      label: "Books Purchased",
      value: (profileData?.cart?.payBill?.length || 0).toString(),
      icon: FaBook,
      color: "bg-[#fff9df] text-primary",
    },
    {
      label: "Total Spent",
      value: `₹${(profileData?.payment
        ?.filter((p: any) =>
          p.payment_status?.toLowerCase() === 'paid' ||
          p.payment_status?.toLowerCase() === 'succeeded'
        )
        .reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0
      ).toLocaleString("en-IN")}`,
      icon: FaCreditCard,
      color: "bg-[#fff9df] text-primary",
    },
    {
      label: "Cart Items",
      value: (profileData?.cart?.addToCartItem?.length || 0).toString(),
      icon: FaGraduationCap,
      color: "bg-[#fff9df] text-primary",
    },
    {
      label: "Total Payments",
      value: (profileData?.payment?.filter((p: any) =>
        p.payment_status?.toLowerCase() === 'paid' ||
        p.payment_status?.toLowerCase() === 'succeeded'
      ).length || 0).toString(),
      icon: FaChartLine,
      color: "bg-[#fff9df] text-primary",
    },
  ];

  useEffect(() => {
    let isMounted = true;

    const getProfileData = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${endPointApi.getProfile}/${userId}`);

        if (isMounted && response?.data) {
          setProfileData(response.data);
          setEditFormData({
            first_name: response.data.user.first_name || "",
            last_name: response.data.user.last_name || "",
            email: response.data.user.email || "",
            phone: response.data.user.phone || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    getProfileData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
        const minSize = Math.min(img.width, img.height);
        const centerX = (img.width - minSize) / 2;
        const centerY = (img.height - minSize) / 2;
        setCropData({
          x: centerX,
          y: centerY,
          size: minSize,
          scale: 1
        });
        setSelectedImage(event.target?.result as string);
        setShowCropModal(true);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleZoomIn = () => {
    setCropData(prev => ({
      ...prev,
      scale: Math.min(prev.scale + 0.1, 3)
    }));
  };

  const handleZoomOut = () => {
    setCropData(prev => ({
      ...prev,
      scale: Math.max(prev.scale - 0.1, 0.5)
    }));
  };

  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!cropContainerRef.current) return;

    const rect = cropContainerRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !cropContainerRef.current || !imageDimensions.width) return;

    const rect = cropContainerRef.current.getBoundingClientRect();
    
    // Calculate how much the mouse moved
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const deltaX = mouseX - dragStart.x;
    const deltaY = mouseY - dragStart.y;

    // Calculate scale factor between display and actual image
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    const scaleX = imageDimensions.width / displayWidth;
    const scaleY = imageDimensions.height / displayHeight;

    // Apply delta to crop position
    const newX = cropData.x + (deltaX * scaleX);
    const newY = cropData.y + (deltaY * scaleY);

    // Constrain within image bounds
    const maxX = imageDimensions.width - cropData.size;
    const maxY = imageDimensions.height - cropData.size;

    setCropData(prev => ({
      ...prev,
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    }));

    setDragStart({ x: mouseX, y: mouseY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  const handleCropImage = () => {
    if (!selectedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = 300;
      canvas.height = 300;

      ctx.drawImage(
        img,
        cropData.x,
        cropData.y,
        cropData.size,
        cropData.size,
        0,
        0,
        300,
        300
      );

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const formData = new FormData();
        formData.append("profile_photo", blob, "profile.jpg");
        formData.append("user_id", userId);

        try {
          setUploading(true);
          const response = await api.post(`${endPointApi.updateProfilePhoto}/${userId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          const profileResponse = await api.get(`${endPointApi.getProfile}/${userId}`);
          setProfileData(profileResponse.data);

          setShowCropModal(false);
          setSelectedImage(null);
          toast.success("Profile photo updated successfully!");
        } catch (error: any) {
          console.error("Photo upload error:", error);
          toast.error(error.response?.data?.message || "Failed to upload photo");
        } finally {
          setUploading(false);
        }
      }, 'image/jpeg', 0.9);
    };
    img.src = selectedImage;
  };

  const handleEditSubmit = async () => {
    try {
      const response = await api.put(`${endPointApi.updateProfile}/${userId}`, editFormData);

      setProfileData((prev: any) => ({
        ...prev,
        user: {
          ...prev.user,
          ...editFormData,
        },
      }));

      setIsEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      console.error("Profile update error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const downloadUserPayments = async () => {
    try {
      const response = await api.get(`/payment/user-download-excel`, {
        params: {
          user_id: userId,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "user-payments.xlsx";
      link.click();
      toast.success("Payment history downloaded!");
    } catch (error) {
      console.error("Excel download failed", error);
      toast.error("Failed to download payment history");
    }
  };

  const getProfilePhotoUrl = () => {
    if (!profileData?.user?.profile_photo) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData?.user?.first_name || '')}+${encodeURIComponent(profileData?.user?.last_name || '')}&background=ffca00&color=000&size=600`;
    }

    const photoPath = profileData.user.profile_photo;
    const rawBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3699';
    const baseUrl = rawBaseUrl.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '');

    if (photoPath.startsWith('http://') || photoPath.startsWith('https://')) {
      return photoPath;
    }

    const cleanPath = photoPath.startsWith('/') ? photoPath.slice(1) : photoPath;
    return `${baseUrl}/${cleanPath}`;
  };

  const hasProfilePhoto = () => {
    return profileData?.user?.profile_photo && 
           !profileData.user.profile_photo.includes('ui-avatars.com') &&
           profileData.user.profile_photo.trim() !== '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffca00] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="ff-font text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-[1380px] mx-auto space-y-8">
        {/* Student Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
          <div className="relative">
            <div 
              className="w-28 h-28 rounded-2xl overflow-hidden ring-4 ring-[#FFCA00] cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => hasProfilePhoto() && setShowPhotoPreview(true)}
            >
              <img
                src={getProfilePhotoUrl()}
                alt={profileData?.user?.first_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileData?.user?.first_name}+${profileData?.user?.last_name}&background=ffca00&color=000&size=200`;
                }}
              />
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FFCA00] rounded-lg flex items-center justify-center hover:bg-[#f5c000] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              title={hasProfilePhoto() ? "Edit photo" : "Upload photo"}
            >
              {uploading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : hasProfilePhoto() ? (
                <FaEdit className="w-5 h-5 text-black" />
              ) : (
                <FaCamera className="w-5 h-5 text-black" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            {isEditMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editFormData.first_name}
                    onChange={(e) => setEditFormData({ ...editFormData, first_name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffca00] ff-font"
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    value={editFormData.last_name}
                    onChange={(e) => setEditFormData({ ...editFormData, last_name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffca00] ff-font"
                    placeholder="Last Name"
                  />
                </div>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffca00] ff-font"
                  placeholder="Email"
                />
                <input
                  type="tel"
                  value={editFormData.phone}
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffca00] ff-font"
                  placeholder="Phone Number"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleEditSubmit}
                    className="bg-[#ffca00] text-black font-semibold ff-font-bold px-6 py-2 rounded-lg hover:bg-[#f5c000] transition-all"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditMode(false)}
                    className="bg-gray-200 text-gray-700 font-semibold ff-font px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold ff-font-bold">
                    {profileData?.user?.first_name} {profileData?.user?.last_name}
                  </h1>
                  <button
                    onClick={() => setIsEditMode(true)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaEdit className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="ff-font text-sm mb-4 text-gray-600">Student Profile</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                      <MdEmail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs ff-font text-gray-500">Email</p>
                      <p className="text-sm font-medium text-gray-800 ff-font">
                        {profileData?.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                      <MdPhone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs ff-font text-gray-500">Phone</p>
                      <p className="text-sm font-medium ff-font-bold">
                        {profileData?.user?.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-[#fff9df] flex items-center justify-center">
                      <MdCalendarToday className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs ff-font text-gray-500">Member Since</p>
                      <p className="text-sm font-medium ff-font-bold">
                        {new Date(profileData?.user?.createdAt).toLocaleDateString("en-IN", {
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-shadow"
            >
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
          <h2 className="text-2xl font-bold ff-font-bold">
            Dashboard Overview
          </h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold">Cart</h3>
                <p className="text-xs ff-font text-gray-500">
                  {profileData?.cart?.addToCartItem?.length || 0} items
                </p>
              </div>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {profileData?.cart?.addToCartItem?.length > 0 ? (
                profileData.cart.addToCartItem.map((c: any) => (
                  <div
                    key={c._id}
                    className={`p-4 rounded-xl border-2 ${isExpiringSoon(c.expiresOn)
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                      }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold ff-font-bold">
                          {c.category_name}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FFCA00]">
                        ₹{c.total_price || c.price}
                      </span>
                    </div>
                    {isExpiringSoon(c.expiresOn) && (
                      <p className="text-xs ff-font text-red-600 font-semibold mt-2 flex items-center gap-1">
                        <FaExclamationTriangle className="w-4 h-4" /> Expires Soon
                        – Renew Now!
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 ff-font py-8">No items in cart</p>
              )}
            </div>
          </div>

          {/* Book Purchases */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                <FaBook className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold ff-font-bold">
                  Purchases List
                </h3>
                <p className="text-xs ff-font text-gray-500">
                  {profileData?.cart?.payBill?.length || 0} items
                </p>
              </div>
            </div>
            <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
              {profileData?.cart?.payBill?.length > 0 ? (
                profileData.cart.payBill.map((book: any) => (
                  <div
                    key={book._id}
                    className="flex items-center justify-between p-3 border-l-4 border-[#FFCA00] bg-gray-50 cursor-pointer hover:bg-[#fff9df] transition rounded"
                  >
                    <div>
                      <p className="ff-font-bold">{book.category_name}</p>
                      <p className="text-sm ff-font text-gray-500">
                        Purchased:{" "}
                        {new Date(book.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <FiExternalLink className="w-4 h-4 text-gray-500" />
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 ff-font py-8">No purchases yet</p>
              )}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#fff9df] text-primary">
                  <FaCreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold ff-font-bold">
                    Payment History
                  </h3>
                  <p className="text-xs ff-font text-gray-500">
                    {profileData?.payment?.filter((p: any) =>
                      p.payment_status?.toLowerCase() === 'paid' ||
                      p.payment_status?.toLowerCase() === 'succeeded'
                    ).length || 0} successful transactions
                  </p>
                </div>
              </div>

              {profileData?.payment?.filter((p: any) =>
                p.payment_status?.toLowerCase() === 'paid' ||
                p.payment_status?.toLowerCase() === 'succeeded'
              ).length > 0 && (
                  <button
                    onClick={downloadUserPayments}
                    disabled={uploading}
                    className="bg-[#ffca00] px-4 py-2 rounded-md text-sm font-medium ff-font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-[#ffca00]/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Downloading...' : 'Download'}
                  </button>
                )}
            </div>

            <div className="space-y-4 max-h-[480px] overflow-y-auto custom-scrollbar">
              {profileData?.payment?.filter((p: any) =>
                p.payment_status?.toLowerCase() === 'paid' ||
                p.payment_status?.toLowerCase() === 'succeeded'
              ).length > 0 ? (
                profileData.payment
                  .filter((p: any) =>
                    p.payment_status?.toLowerCase() === 'paid' ||
                    p.payment_status?.toLowerCase() === 'succeeded'
                  )
                  .map((p: any) => (
                    <div
                      key={p._id}
                      className="flex items-center justify-between p-3 bg-[#fff9df] rounded-xl"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                          <FaCheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm ff-font text-gray-500">
                            {new Date(p.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                          <p className="text-xs font-medium ff-font text-green-600 capitalize">
                            {p.payment_status}
                          </p>
                          {p.payment_method && (
                            <p className="text-xs text-gray-500 ff-font capitalize">
                              via {p.payment_method}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="text-lg font-bold ff-font-bold whitespace-nowrap ml-2">
                        {p.currency === 'INR' ? '₹' : '$'}{p.amount.toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-center text-gray-500 ff-font py-8">No successful payments yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Photo Preview Modal */}
      {showPhotoPreview && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn"
          onClick={() => setShowPhotoPreview(false)}
        >
          <div className="relative max-w-xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setShowPhotoPreview(false)}
              className="absolute -top-14 right-0 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-sm group"
            >
              <FaTimes className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            {/* User info header */}
            <div className="absolute -top-20 left-0 text-white">
              <h3 className="text-2xl font-bold ff-font-bold mb-1">
                {profileData?.user?.first_name} {profileData?.user?.last_name}
              </h3>
              <p className="text-sm text-gray-300 ff-font">Profile Photo</p>
            </div>

            {/* Image container with proper aspect ratio */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={getProfilePhotoUrl()}
                alt="Profile Preview"
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileData?.user?.first_name}+${profileData?.user?.last_name}&background=ffca00&color=000&size=600`;
                }}
              />
              
              {/* Decorative corner borders */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#ffca00] rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#ffca00] rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#ffca00] rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#ffca00] rounded-br-lg"></div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowPhotoPreview(false);
                  fileInputRef.current?.click();
                }}
                className="bg-[#ffca00] text-black font-semibold ff-font-bold px-6 py-3 rounded-lg hover:bg-[#f5c000] transition-all flex items-center gap-2"
              >
                <FaEdit className="w-4 h-4" />
                Change Photo
              </button>
              <button
                onClick={() => setShowPhotoPreview(false)}
                className="bg-white/10 text-white font-semibold ff-font px-6 py-3 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Crop Modal with Smooth Drag */}
      {showCropModal && selectedImage && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold ff-font-bold">Crop Profile Photo</h3>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedImage(null);
                  setIsDragging(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mb-4">
              <div
                ref={cropContainerRef}
                className={`relative w-full h-96 bg-gray-900 rounded-lg overflow-hidden select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full h-full object-contain pointer-events-none"
                  style={{
                    transform: `scale(${cropData.scale})`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                  }}
                  draggable={false}
                />
                
                {/* Dark overlay for non-crop area */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                      <mask id="cropMask">
                        <rect width="100%" height="100%" fill="white"/>
                        <rect
                          x={`${(cropData.x / imageDimensions.width) * 100}%`}
                          y={`${(cropData.y / imageDimensions.height) * 100}%`}
                          width={`${(cropData.size / imageDimensions.width) * 100}%`}
                          height={`${(cropData.size / imageDimensions.height) * 100}%`}
                          fill="black"
                        />
                      </mask>
                    </defs>
                    <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#cropMask)"/>
                  </svg>
                </div>

                {/* Crop box with 9-grid */}
                <div
                  className="absolute border-2 border-white shadow-2xl pointer-events-none"
                  style={{
                    left: `${(cropData.x / imageDimensions.width) * 100}%`,
                    top: `${(cropData.y / imageDimensions.height) * 100}%`,
                    width: `${(cropData.size / imageDimensions.width) * 100}%`,
                    height: `${(cropData.size / imageDimensions.height) * 100}%`,
                    transition: isDragging ? 'none' : 'all 0.1s ease-out'
                  }}
                >
                  {/* Rule of thirds grid (9-box frame) */}
                  <svg width="100%" height="100%" className="absolute inset-0">
                    {/* Vertical lines */}
                    <line x1="33.33%" y1="0" x2="33.33%" y2="100%" stroke="white" strokeWidth="1" opacity="0.5"/>
                    <line x1="66.66%" y1="0" x2="66.66%" y2="100%" stroke="white" strokeWidth="1" opacity="0.5"/>
                    {/* Horizontal lines */}
                    <line x1="0" y1="33.33%" x2="100%" y2="33.33%" stroke="white" strokeWidth="1" opacity="0.5"/>
                    <line x1="0" y1="66.66%" x2="100%" y2="66.66%" stroke="white" strokeWidth="1" opacity="0.5"/>
                  </svg>

                  {/* Corner handles */}
                  <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-[#ffca00] rounded-tl"></div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-[#ffca00] rounded-tr"></div>
                  <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-[#ffca00] rounded-bl"></div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-[#ffca00] rounded-br"></div>

                  {/* Center instruction */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white bg-black/70 px-3 py-1.5 rounded-lg text-sm ff-font backdrop-blur-sm">
                      {isDragging ? '🎯 Positioning...' : '✋ Drag to reposition'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <button
                  onClick={handleZoomOut}
                  className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cropData.scale <= 0.5}
                >
                  <FaMinus className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#ffca00] transition-all duration-200"
                      style={{ width: `${((cropData.scale - 0.5) / 2.5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm ff-font font-medium min-w-[60px] text-center">
                    {Math.round(cropData.scale * 100)}%
                  </span>
                </div>
                <button
                  onClick={handleZoomIn}
                  className="p-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={cropData.scale >= 3}
                >
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm ff-font text-gray-500 mt-3 text-center">
                Click and drag to position • Use zoom controls to resize
              </p>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3">
              <button
                onClick={handleCropImage}
                disabled={uploading}
                className="flex-1 bg-[#ffca00] text-black font-semibold ff-font-bold px-6 py-3 rounded-lg hover:bg-[#f5c000] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </span>
                ) : (
                  'Set as Profile Photo'
                )}
              </button>
              <button
                onClick={() => {
                  setShowCropModal(false);
                  setSelectedImage(null);
                  setIsDragging(false);
                }}
                disabled={uploading}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold ff-font rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ffca00;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f5c000;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditProfile;