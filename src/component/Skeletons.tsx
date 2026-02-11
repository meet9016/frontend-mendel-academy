"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogCardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md flex flex-col h-full w-full lg:max-w-[380px]">
    <div className="relative w-full h-56 overflow-hidden bg-gray-100 rounded-t-xl flex-shrink-0">
      <Skeleton height="100%" />
    </div>
    <div className="p-6 space-y-4 flex flex-col flex-grow">
      <div className="flex items-center justify-between">
        <Skeleton width={80} height={20} borderRadius={20} />
        <Skeleton width={60} height={15} />
      </div>
      <Skeleton height={28} width="90%" />
      <div className="space-y-2 flex-grow">
        <Skeleton count={3} />
      </div>
    </div>
  </div>
);

export const BlogDetailSkeleton = () => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <Skeleton height={400} className="rounded-2xl mb-8" />
    <div className="space-y-6">
      <Skeleton height={40} width="80%" />
      <div className="flex gap-4 items-center mb-8">
        <Skeleton circle width={40} height={40} />
        <Skeleton width={120} height={20} />
        <Skeleton width={100} height={20} />
      </div>
      <div className="space-y-4">
        <Skeleton count={10} />
      </div>
    </div>
  </div>
);

export const CourseCardSkeleton = () => (
  <div className="flex-shrink-0 w-[300px] bg-white border-2 border-gray-200 rounded-3xl p-6 flex flex-col relative overflow-hidden">
    <div className="flex items-start gap-3">
      <Skeleton width={60} height={60} borderRadius={16} />
      <div className="flex-1">
        <Skeleton height={24} width="80%" />
      </div>
    </div>
    <div className="flex gap-2 py-3 mt-4">
      <Skeleton width={60} height={24} borderRadius={20} />
      <Skeleton width={60} height={24} borderRadius={20} />
      <Skeleton width={60} height={24} borderRadius={20} />
    </div>
    <div className="mt-2 mb-6">
      <Skeleton count={2} />
    </div>
    <Skeleton height={45} borderRadius={10} />
    <div className="mt-3 flex justify-center">
      <Skeleton width={150} height={12} />
    </div>
  </div>
);

export const PathologyCardSkeleton = () => (
  <div className="w-[320px] flex-shrink-0 bg-white rounded-2xl overflow-hidden border border-gray-200 p-0">
    <div className="relative h-42 w-full overflow-hidden bg-gray-100">
      <Skeleton height="100%" />
    </div>
    <div className="p-6 flex flex-col justify-between h-full bg-white">
      <div className="space-y-3">
        <Skeleton height={24} width="90%" />
        <div className="space-y-2">
          <Skeleton count={2} height={14} />
        </div>
        <div className="flex items-center gap-4 py-2">
          <Skeleton width={60} height={20} />
          <Skeleton width={80} height={20} />
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <Skeleton width={80} height={28} />
        <Skeleton width={100} height={40} borderRadius={8} />
      </div>
    </div>
  </div>
);

export const HyperspecialistCardSkeleton = () => (
  <div className="relative rounded-2xl border border-gray-200 p-6 flex flex-col h-full bg-white">
    <div className="absolute top-4 right-4">
      <Skeleton circle width={20} height={20} />
    </div>
    <div className="flex items-center gap-4 mb-4 mt-6">
      <Skeleton width="70%" height={24} />
    </div>
    <div className="space-y-2 mb-4">
      <Skeleton count={2} />
    </div>
    <div className="space-y-2 mb-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-2">
          <Skeleton circle width={10} height={10} className="mt-1" />
          <Skeleton width="60%" height={16} />
        </div>
      ))}
    </div>
    <div className="mt-auto flex items-center justify-between pt-6">
      <Skeleton width={60} height={28} />
      <Skeleton width={100} height={20} />
    </div>
  </div>
);

export const FeaturedLiveSkeleton = () => (
  <div className="w-full bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-8 mt-10">
    <div className="lg:w-1/2">
      <Skeleton height={300} borderRadius={24} />
    </div>
    <div className="lg:w-1/2 space-y-6">
      <div className="flex gap-2">
        <Skeleton width={100} height={28} borderRadius={20} />
        <Skeleton width={80} height={28} borderRadius={20} />
      </div>
      <Skeleton height={40} width="90%" />
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-3">
            <Skeleton circle width={24} height={24} />
            <Skeleton width="80%" height={20} />
          </div>
        ))}
      </div>
      <Skeleton height={50} width={200} borderRadius={12} />
    </div>
  </div>
);

export const CartItemSkeleton = () => (
  <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 space-y-3">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <Skeleton height={20} width="80%" />
        <Skeleton height={14} width="40%" className="mt-1" />
      </div>
      <Skeleton height={24} width={60} />
      <Skeleton circle width={32} height={32} />
    </div>
    <Skeleton width={100} height={24} borderRadius={20} />
    <div className="flex flex-wrap gap-2">
      <Skeleton width={80} height={20} borderRadius={12} />
      <Skeleton width={80} height={20} borderRadius={12} />
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-[1380px] mx-auto space-y-8">
      {/* Profile Header Skeleton */}
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8">
        <Skeleton width={112} height={112} borderRadius={16} />
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton width={250} height={32} />
            <Skeleton width={100} height={16} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-100 rounded-xl px-4 py-3">
                <Skeleton circle width={40} height={40} />
                <div className="flex-1">
                  <Skeleton width="40%" height={12} />
                  <Skeleton width="80%" height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-5">
            <Skeleton width={40} height={40} borderRadius={8} className="mb-3" />
            <Skeleton width="60%" height={24} className="mb-1" />
            <Skeleton width="40%" height={14} />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Skeleton width={200} height={28} />
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>

      {/* Dashboard Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-6 h-[500px]">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton width={40} height={40} borderRadius={8} />
              <div className="flex-1">
                <Skeleton width="50%" height={20} />
                <Skeleton width="30%" height={12} />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <Skeleton width={60} height={60} borderRadius={8} />
                  <div className="flex-1">
                    <Skeleton width="80%" height={16} />
                    <Skeleton width="40%" height={12} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const CheckoutSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-[1380px] mx-auto px-4 py-10 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Billing Info Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <Skeleton width={200} height={28} className="mb-6" />
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton width={100} height={16} />
              <Skeleton height={52} borderRadius={12} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton width={100} height={16} />
                <Skeleton height={52} borderRadius={12} />
              </div>
              <div className="space-y-2">
                <Skeleton width={100} height={16} />
                <Skeleton height={52} borderRadius={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method Skeleton */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <Skeleton width={200} height={28} className="mb-6" />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Skeleton height={80} borderRadius={12} />
            <Skeleton height={80} borderRadius={12} />
          </div>
        </div>
      </div>

      {/* Order Summary Skeleton */}
      <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
        <Skeleton width={150} height={24} className="mb-6" />
        <div className="space-y-4 mb-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <Skeleton width={60} height={60} borderRadius={8} />
              <div className="flex-1 space-y-2">
                <Skeleton width="80%" height={16} />
                <Skeleton width="40%" height={12} />
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <Skeleton width={80} height={16} />
            <Skeleton width={60} height={16} />
          </div>
          <div className="flex justify-between pt-2 border-t">
            <Skeleton width={100} height={20} />
            <Skeleton width={80} height={20} />
          </div>
        </div>
        <Skeleton height={50} borderRadius={12} className="mt-6" />
      </div>
    </div>
  </div>
);

export const DetailPageSkeleton = () => (
  <div className="bg-gray-50 min-h-screen">
    <div className="w-full h-[60vh] bg-gray-200">
      <Skeleton height="100%" />
    </div>
    <div className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8 py-12 -mt-20 relative z-10">
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Skeleton height={50} width="70%" />
            <Skeleton height={30} width="90%" />
            <div className="space-y-4 py-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton width={32} height={32} borderRadius={8} />
                  <Skeleton width="80%" height={32} borderRadius={12} />
                </div>
              ))}
            </div>
            <Skeleton height={100} borderRadius={24} />
          </div>
          <div className="space-y-6">
            <Skeleton height={400} borderRadius={24} />
            <div className="flex justify-between items-center">
              <Skeleton width={150} height={40} borderRadius={12} />
              <Skeleton width={120} height={40} borderRadius={12} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
