'use client'
import React, { useState } from 'react';
import Header from '../auth/Header';
import { FiMinus, FiPlus, FiX, FiArrowRight, FiShield, FiTruck, FiPercent } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Footer from '../auth/Footer';


interface CartItem {
    id: number;
    image: string;
    title: string;
    price: number;
    quantity: number;
}

const MyCart = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([
        {
            id: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            title: 'Premium Wireless Headphones',
            price: 2800,
            quantity: 2,
        },
        {
            id: 2,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            title: 'Smart Watch Pro Series',
            price: 1900,
            quantity: 1,
        },
        {
            id: 3,
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
            title: 'Designer Sunglasses',
            price: 3700,
            quantity: 1,
        },
    ]);
    console.log(cartItems, 'cartI')

    const updateQuantity = (id: number, delta: number) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: number) => {
        console.log('oooooo')
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal;

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
                <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 max-w-7xl">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl lg:text-4xl font-black text-gray-900 mb-2 tracking-tight">
                            Shopping Cart
                        </h1>
                        <p className="text-gray-600">
                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} ready for checkout
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
                        {/* Cart Items Column */}
                        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
                            {cartItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="group bg-white rounded-2xl cursor-pointer overflow-hidden border border-gray-200 hover:border-yellow-400 transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="p-5 flex gap-5">
                                        {/* Product Image */}
                                        <div className="relative flex-shrink-0">
                                            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-xl overflow-hidden bg-gray-100 ring-1 ring-gray-200">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                                            {/* Title & Remove */}
                                            <div className="flex justify-between items-start gap-4 mb-3">
                                                <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
                                                    {item.title}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 cursor-pointer hover:text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <FiX className="h-5 w-5" />
                                                </button>
                                            </div>

                                            {/* Bottom Row - Price & Quantity */}
                                            <div className="flex items-end justify-between gap-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1.5 border border-gray-200">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-9 w-9 flex cursor-pointer items-center justify-center rounded-lg hover:bg-gray-200 transition-colors"
                                                    >
                                                        <FiMinus className="h-4 w-4 text-gray-700" />
                                                    </button>
                                                    <span className="w-12 text-center font-bold text-gray-900 text-lg">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-9 w-9 cursor-pointer flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 text-white transition-all hover:scale-105 hover:shadow-md"
                                                    >
                                                        <FiPlus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-2xl lg:text-3xl font-black text-gray-900">
                                                        ₹{(item.price * item.quantity).toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500 mt-0.5">
                                                        ₹{item.price.toLocaleString()} each
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 pt-4">
                                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                                    <FiShield className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                                    <FiTruck className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-700">Free Delivery</p>
                                </div>
                                <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                                    <FiPercent className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
                                    <p className="text-xs font-semibold text-gray-700">Best Prices</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary Sidebar */}
                        <div className="lg:col-span-5 xl:col-span-4">
                            <div className="lg:sticky lg:top-24 space-y-4">
                                {/* Order Summary */}
                                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-6">
                                        <h2 className="text-xl font-black text-white">Order Summary</h2>
                                    </div>

                                    <div className="p-6 space-y-5">
                                        {/* Subtotal */}
                                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                                            <span className="text-base text-gray-600 font-medium">
                                                Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                                            </span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ₹{subtotal.toLocaleString()}
                                            </span>
                                        </div>

                                        {/* Total */}
                                        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-300">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="text-sm text-gray-500 mb-1">Total Amount</p>
                                                    <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-400">
                                                        ₹{total.toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Checkout Button */}
                                        <button
                                        onClick={() => router.push('/checkout')}
                                            className="w-full h-14 flex items-center cursor-pointer justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl text-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group"
                                        >
                                            Proceed to Checkout
                                            <FiArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                        </button>


                                        {/* Continue Shopping */}
                                        <button
                                            className="w-full h-12 border-2 border-gray-300 cursor-pointer  rounded-xl font-semibold text-gray-800 hover:bg-gray-100 active:scale-[0.98] transition-all duration-300"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Footer/>
        </>
    );
};

export default MyCart;
