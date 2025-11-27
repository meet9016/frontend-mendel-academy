'use client';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { FaArrowLeft, FaStar, FaUsers } from 'react-icons/fa';
import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import { toast } from 'react-toastify';
import CommonButton from '@/comman/Button';
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from 'next/navigation';

/* ---------- TYPES ---------- */
type Program = {
    id: number;
    title: string;
    subtitle: string;
    rating: number;
    total_reviews: number;
    price: number;
    duration: string;
    category: string;
};

/* ---------- UTILS ---------- */
const getTempId = () => {
    let tempId = sessionStorage.getItem("temp_id");
    if (!tempId) {
        tempId =
            "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem("temp_id", tempId);
    }
    return tempId;
};

const addToCart = async (item: Program) => {
    try {
        const body = {
            temp_id: getTempId(),
            product_id: item.id,
            category_name: item.category,
            price: item.price,
            quantity: 1,
            duration: item.duration,
        };
        const res = await api.post(`${endPointApi.postCreateAddToCart}`, body);
        if (res.data.success) toast.success(res.data.message);
    } catch {
        toast.error("Failed to add to cart");
    }
};

/* ---------- COMPONENT ---------- */
const RecordedPrograms = () => {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await api.get(`${endPointApi.getAllPreRecorded}`);
                if (res?.data?.data?.length) setPrograms(res.data.data);
                else setPrograms([]);
            } catch (error) {
                console.error(error);
                setPrograms([]);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <section className="max-w-[1380px] mx-auto mt-10 px-4 md:px-6 lg:px-8 mb-10">
            <CommonButton
                pyClass="py-2"
                pxClass="px-6"
                fontWeight={700}
                fontSize={16}
                onClick={() => router.push("/pathology")}
            >
                <div className="flex items-center gap-2">
                    <FaArrowLeft className="text-base" />
                    <span>Back to Pathology</span>
                </div>
            </CommonButton>

            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold ff-font-bold">Recorded Programs</h2>
                <p className="ff-font text-lg">Self-paced learning with lifetime access</p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} height={300} borderRadius={16} className="rounded-xl" />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                    {programs.map((p) => (
                        <div
                            key={p.id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow hover:shadow-lg hover:-translate-y-1 transition"
                        >
                            <div className="relative h-48">
                                <img
                                    src="https://st2.depositphotos.com/1000434/11667/i/450/depositphotos_116673844-stock-photo-amoeba-on-blue-background.jpg"
                                    alt={p.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-2 left-2 flex items-center bg-white/90 px-2 py-0.5 rounded-full">
                                    <FaStar className="text-primary w-3 h-3 mr-1" />
                                    <span className="text-xs font-semibold">{p.rating}</span>
                                </div>
                                <div className="absolute bottom-2 right-2 ff-font-bold flex items-center bg-white/90 px-2 py-0.5 rounded-full">
                                    <span className="text-xs font-semibold">{p.total_reviews}+ learners</span>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3
                                    className="font-bold ff-font-bold text-sm mb-1 line-clamp-2 overflow-hidden text-ellipsis"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        lineHeight: "1.4rem",
                                        height: "2.8rem",
                                    }}
                                >
                                    {p.title}
                                </h3>

                                <p
                                    className="text-xs ff-font mb-3 overflow-hidden text-ellipsis line-clamp-2"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                        lineHeight: "1.2rem",
                                        height: "2.4rem",
                                    }}
                                >
                                    {p.subtitle}
                                </p>
                                <div className="border-t border-gray-200 my-3"></div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-xs ff-font">{p.duration} month access</p>
                                        <p className="text-sm font-bold ff-font-bold">${p.price}</p>
                                    </div>

                                    <CommonButton
                                        pyClass="py-0"
                                        pxClass="px-2"
                                        fontWeight={700}
                                        fontSize={14}
                                        onClick={() => addToCart(p)}
                                    >
                                        Add to cart
                                    </CommonButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecordedPrograms;
