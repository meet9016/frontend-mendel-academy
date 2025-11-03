'use client';
import React, { useState } from 'react';
import Header from '../auth/Header';
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaGlobe,
    FaCity,
    FaMapPin,
    FaShoppingCart,
    FaCreditCard,
    FaWallet,
    FaMoneyBillWave,
} from 'react-icons/fa';
import { MdPayment, MdLocalShipping } from 'react-icons/md';
import Footer from '../auth/Footer';

const CheckOut = () => {
    const [sameAsShipping, setSameAsShipping] = useState<boolean>(false);
    const [selectedPayment, setSelectedPayment] = useState<string>('phonepay');
    const [discountCode, setDiscountCode] = useState<string>('');


    const orderItems = [
        {
            id: 1,
            name: 'FOSTER STAND',
            size: 'A4 SIZE',
            quantity: 2,
            price: 2800,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
        },
        {
            id: 2,
            name: 'TABLE TOP LEG FRAME STAND',
            size: 'A4 SIZE',
            quantity: 1,
            price: 1900,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
        },
        {
            id: 3,
            name: 'HEXAGON DOUBLE SIDE ROLLUP STAND',
            size: '2M5 FEET',
            quantity: 1,
            price: 3700,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
        },

    ];

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const shippingCharge = 0;
    const gstAmount = Math.round(subtotal * 0.18);
    const finalTotal = subtotal - discount + shippingCharge + gstAmount;

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <Header />
                {/* Top Bar */}
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col items-center justify-between text-center">
                    <h1 className="text-4xl font-extrabold text-gray-800">Checkout</h1>
                    <p className="text-lg text-gray-500 mt-2">Complete your order in just a few steps</p>
                </div>
                {/* Main Layout */}
                <div className="max-w-7xl mx-auto px-4 py-3 grid lg:grid-cols-3 gap-6">
                    {/* LEFT SIDE */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* BILLING INFORMATION */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 flex items-center gap-3">
                                <MdPayment className="text-white text-2xl" />
                                <h2 className="text-white font-bold text-xl">Billing Information</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                        />
                                    </div>
                                </div>

                                {/* Email & Phone */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <input
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <input
                                                type="tel"
                                                placeholder="+91 1234567890"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Country, State, City, Postal */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Country *
                                        </label>
                                        <div className="relative">
                                            <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <select className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none">
                                                <option value="">Select Country</option>
                                                <option value="india">India</option>
                                                <option value="usa">USA</option>
                                                <option value="uk">UK</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            State *
                                        </label>
                                        <div className="relative">
                                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <select className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none">
                                                <option value="">Select State</option>
                                                <option value="gujarat">Gujarat</option>
                                                <option value="maharashtra">Maharashtra</option>
                                                <option value="delhi">Delhi</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            City *
                                        </label>
                                        <div className="relative">
                                            <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <input
                                                type="text"
                                                placeholder="Enter your city"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Postal Code *
                                        </label>
                                        <div className="relative">
                                            <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <input
                                                type="text"
                                                placeholder="e.g. 400001"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Address *
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="House/Flat No., Street, Area"
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none resize-none"
                                />
                            </div> */}
                            </div>
                        </div>

                        {/* SHIPPING INFORMATION */}
                        {/* <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="bg-[#feda4c] p-4 flex items-center gap-3">
                                <MdLocalShipping className="text-white text-2xl" />
                                <h2 className="text-white font-bold text-xl">Shipping Address</h2>
                            </div>

                            <div className="p-6 space-y-4">
                                <label className="flex items-center gap-2 text-gray-700 font-medium">
                                    <input
                                        type="checkbox"
                                        checked={sameAsShipping}
                                        onChange={(e) => setSameAsShipping(e.target.checked)}
                                        className="w-5 h-5 accent-[#feda4c]"
                                    />
                                    Same as billing address
                                </label>
                            </div>

                            {!sameAsShipping && (
                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <input
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <input
                                                    type="tel"
                                                    placeholder="+91 1234567890"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Country *
                                            </label>
                                            <div className="relative">
                                                <FaGlobe className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <select className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none">
                                                    <option value="">Select Country</option>
                                                    <option value="india">India</option>
                                                    <option value="usa">USA</option>
                                                    <option value="uk">UK</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                State *
                                            </label>
                                            <div className="relative">
                                                <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <select className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none">
                                                    <option value="">Select State</option>
                                                    <option value="gujarat">Gujarat</option>
                                                    <option value="maharashtra">Maharashtra</option>
                                                    <option value="delhi">Delhi</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                City *
                                            </label>
                                            <div className="relative">
                                                <FaCity className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <input
                                                    type="text"
                                                    placeholder="Enter your city"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Postal Code *
                                            </label>
                                            <div className="relative">
                                                <FaMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#feda4c]" />
                                                <input
                                                    type="text"
                                                    placeholder="e.g. 400001"
                                                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div> */}


                        {/* PAYMENT METHOD */}
                        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 flex items-center gap-3">
                                <MdPayment className="text-white text-2xl" />
                                <h2 className="text-white font-bold text-xl">Payment Method</h2>
                            </div>

                            <div className="p-6 grid md:grid-cols-2 gap-4">
                                {/* Stripe Payment Option */}
                                <div
                                    onClick={() => setSelectedPayment('stripe')}
                                    className={`cursor-pointer p-6 h-40 rounded-xl border-2 transition-all ${selectedPayment === 'stripe'
                                        ? 'border-[#feda4c] bg-[#fffbea]'
                                        : 'border-gray-200 hover:border-[#feda4c]'
                                        } flex flex-col justify-center items-center text-center`}
                                >
                                    <div className="text-[#feda4c] text-3xl mb-3">
                                        <FaWallet />
                                    </div>
                                    <span className="font-semibold text-lg">Stripe Payment</span>
                                </div>

                                {/* Razor Pay Option */}
                                <div
                                    onClick={() => setSelectedPayment('razorpay')}
                                    className={`cursor-pointer p-6 h-40 rounded-xl border-2 transition-all ${selectedPayment === 'razorpay'
                                        ? 'border-[#feda4c] bg-[#fffbea]'
                                        : 'border-gray-200 hover:border-[#feda4c]'
                                        } flex flex-col justify-center items-center text-center`}
                                >
                                    <div className="text-[#feda4c] text-3xl mb-3">
                                        <FaCreditCard />
                                    </div>
                                    <span className="font-semibold text-lg">Razor Pay</span>
                                </div>
                            </div>

                            {/* SHOW CARD INPUT FIELDS IF STRIPE SELECTED */}
                            {selectedPayment === 'stripe' && (
                                <div className="px-6 pb-6 space-y-4 mt-2 border-t border-gray-200">
                                    {/* Card Number */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-5">Card Number *</label>
                                            <input
                                                type="text"
                                                placeholder="1234 5678 9012 3456"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>

                                        {/* Cardholder Name */}
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2 mt-5">Cardholder Name *</label>
                                            <input
                                                type="text"
                                                placeholder="Name on card"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                    </div>

                                    {/* Expiry and CVV */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date *</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                                            <input
                                                type="password"
                                                placeholder="123"
                                                maxLength={3}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#feda4c] outline-none transition"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>



                    </div>
                    {/* RIGHT SIDE — ORDER SUMMARY */}
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 h-fit sticky top-24">
                        {/* Header */}
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-4 rounded-t-2xl flex items-center gap-2">
                            <FaShoppingCart className="text-white text-xl" />
                            <h2 className="text-white font-bold text-xl">Order Summary</h2>
                        </div>

                        <div className="p-6">
                            {/* Discount Code Section */}
                            <div className="flex gap-2 mb-6">
                                <input
                                    placeholder="Enter discount code"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#feda4c] outline-none"
                                />
                                <button className="px-4 py-2 rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 text-white font-semibold hover:bg-[#ffd329] transition">
                                    Apply
                                </button>
                            </div>


                            {/* Scrollable Order Items */}
                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#feda4c] scrollbar-track-gray-100">
                                {orderItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-3 p-3 border rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md border border-gray-200"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-sm">{item.name}</h3>
                                            <p className="text-xs text-gray-500">Size: {item.size}</p>
                                            <p className="text-sm font-bold text-gray-500">
                                                ₹{item.price} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div className="space-y-2 text-sm mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal:</span>
                                    <span className="font-medium">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Discount:</span>
                                    <span className="font-medium text-green-600">-₹{discount}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping:</span>
                                    <span className="font-medium">₹{shippingCharge}</span>
                                </div>
                            </div>

                            {/* Final Total */}
                            <div className="flex justify-between items-center bg-yellow-50 p-4 rounded-xl mb-6">
                                <span className="font-semibold text-lg">Final Total:</span>
                                <span className="font-bold text-2xl text-[#feda4c]">₹{finalTotal}</span>
                            </div>

                            {/* Buttons */}
                            <button className="w-full h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl hover:opacity-90">
                                Place Order
                            </button>
                            <button className="w-full h-12 mt-3 border border-gray-300 rounded-xl hover:bg-gray-100">
                                ← Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckOut;
