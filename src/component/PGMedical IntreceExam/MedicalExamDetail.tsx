'use client'
import {
    FaPhone,
    FaLongArrowAltRight
} from 'react-icons/fa';
import Header from '../auth/Header';
import Footer from '../auth/Footer';
import CourseDes from './CourseDes';
import Faq from './Faq';
import WhoEnroll from './WhoEnroll';
import RegisterSec from './RegisterSec';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';

const MedicalExamDetail = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        fetcgExamData();
    }, [])

    const fetcgExamData = async () => {
        try {
            setLoading(true)
            const res = await api.get(`${endPointApi.getMedicalById}/${id}`)
            if (res.data) {
                setExamData(res?.data)
            } else {
                console.log("DATA FAILED")
            }
        } catch (error) {
            console.log("ERROR", error)
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}

            {loading ? skeleton : (
                <section className="relative bg-gradient-to-br from-indigo-50 via-amber-50 to-gray-50 overflow-hidden">
                    <div className="relative mx-auto max-w-7xl px-6 py-8 lg:py-18">
                        <div className="grid items-center gap-12 lg:grid-cols-2">

                            {/* Left Content */}
                            <div className="order-2 space-y-8 lg:order-1">
                                {/* Heading & Description */}
                                <div className="space-y-5">
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                                        {examData?.exams[0]?.exam_name}
                                    </h1>
                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {examData?.exams[0]?.description}
                                    </p>
                                </div>

                                {/* Subtitle / Feature List */}
                                <div className="space-y-3">
                                    <p className="text-lg font-semibold text-gray-900">
                                        With Mendal Academy, you will get:
                                    </p>
                                    <div className="grid gap-3">
                                        {examData?.exams[0]?.sub_titles?.map((feature: any, index: number) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-yellow-400 hover:shadow-md"
                                            >
                                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-yellow-100 transition-colors group-hover:bg-yellow-200">
                                                    <FaLongArrowAltRight className="text-sm text-yellow-500" />
                                                </div>
                                                <span className="text-gray-900 text-[15px]">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Contact + Button */}
                                <div className="space-y-5 rounded-2xl border border-yellow-400/40 bg-gradient-to-br from-yellow-100 to-amber-50 p-6 lg:p-8 shadow-sm">
                                    <p className="flex items-center gap-2 text-[15px] text-gray-700">
                                        <FaPhone className="text-yellow-500" />
                                        For payment and more information, call{" "}
                                        <a
                                            href="tel:+919925511631"
                                            className="font-semibold text-yellow-600 hover:underline"
                                        >
                                            +91-99255-11631
                                        </a>
                                    </p>
                                    <button className="w-full transform rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 px-10 py-4 text-lg font-bold text-white shadow-md shadow-yellow-400/25 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="order-1 flex justify-center lg:order-2">
                                <div className="relative">
                                    <div className="absolute -inset-4 rounded-3xl bg-yellow-200/40 blur-2xl"></div>
                                    <img
                                        src="https://static.vecteezy.com/system/resources/previews/021/518/002/non_2x/a-woman-doctor-with-a-tablet-and-a-stethoscope-an-image-on-a-blue-background-a-doctor-in-a-medical-uniform-cartoon-style-family-doctor-medical-worker-paramedic-vector.jpg"
                                        alt="Medical professional"
                                        className="relative z-10 h-auto w-[85%] md:w-[95%] lg:w-[100%] rounded-3xl border border-[#ffcb04] object-cover shadow-xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* Course Description */}
            <CourseDes />

            {/* FAQs */}
            <Faq />

            {/* Who Can Enroll */}
            <WhoEnroll
                plans={examData?.choose_plan_list || []}
                loading={loading}
            />


            {/* REGISTER SECTION */}
            <RegisterSec />

            <Footer />
        </div>
    );
};


const skeleton = (
    <section className="relative bg-gradient-to-br from-indigo-50 via-amber-50 to-gray-50 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:py-18">
            <div className="grid items-center gap-12 lg:grid-cols-2">
                {/* Left Column */}
                <div className="order-2 space-y-8 lg:order-1">
                    {/* Heading & Description Skeleton */}
                    <div className="space-y-5">
                        <Skeleton height={120} borderRadius={16} />
                    </div>
                    {/* Subtitle / Feature List Skeleton */}
                    <div className="space-y-3">
                        <div className="rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 p-6 shadow-sm">
                            {/* Title skeleton */}
                            <Skeleton height={25} width="50%" borderRadius={10} />
                            {/* 3 inner feature lines */}
                            <div className="mt-4 space-y-3">
                                {[1, 2, 3].map((_, i) => (
                                    <Skeleton
                                        key={i}
                                        height={25}
                                        width="100%"
                                        borderRadius={8}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Contact + Button Skeleton */}
                    <div className="space-y-5 rounded-2xl bg-white/60 backdrop-blur-sm border border-gray-200 p-6 lg:p-8 shadow-sm">
                        <Skeleton height={20} width="70%" />
                        <Skeleton height={45} borderRadius={12} />
                    </div>
                </div>
                {/* Right Column (Image Area) */}
                <div className="order-1 flex justify-center lg:order-2">
                    <Skeleton height={450} width={450} borderRadius={20} />
                </div>
            </div>
        </div>
    </section>
);

export default MedicalExamDetail;
