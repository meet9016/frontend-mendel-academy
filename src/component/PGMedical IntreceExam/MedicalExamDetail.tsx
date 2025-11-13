'use client'
import {
    FaPhone,
    FaLongArrowAltRight,
    FaStar,
    FaCheckCircle
} from 'react-icons/fa';
import Header from '../auth/Header';
import Footer from '../auth/Footer';
import CourseDes from './CourseDes';
import Faq from './Faq';
import WhoEnroll from './WhoEnroll';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/utils/axiosInstance';
import endPointApi from '@/utils/endPointApi';
import 'react-loading-skeleton/dist/skeleton.css';
import Skeleton from 'react-loading-skeleton';
import { HiSparkles } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { IoMdCall } from 'react-icons/io';
import NewsLetter from './NewsLetter';

const MedicalExamDetail = () => {
    const { id } = useParams();
    const [examData, setExamData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        fetcgExamData();
    }, [])

    console.log("examData*****", examData)

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

    console.log("examData?.choose_plan_list", examData);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
            >
                {/* Decorative background elements */}
                <div className="absolute top-20 right-20 h-72 w-72 rounded-full bg-yellow-200/30 blur-3xl"></div>
                <div className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-yellow-300/30 blur-3xl"></div>

                <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        {/* Left Content */}
                        <div className="space-y-5">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 border border-yellow-300/40">
                                <HiSparkles className="text-yellow-500 text-lg" />
                                <span className="text-sm font-semibold text-gray-900">
                                    Medical Entrance Exam
                                </span>
                            </div>

                            {/* Main Title */}
                            <div className="space-y-2">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                                    {examData?.exams[0]?.exam_name}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="h-1 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                                    <FaStar className="text-yellow-500 text-xl" />
                                </div>
                            </div>

                            {/* Subtitle */}
                            <p className="text-xl md:text-2xl font-medium text-gray-700">
                                {examData?.exams[0]?.title}
                            </p>

                            {/* Features List */}
                            <div className="space-y-3">
                                {examData?.exams[0]?.sub_titles?.map((feature: any, index: number) => (
                                    <div
                                        key={index}
                                        className="group flex items-start gap-4 p-4 rounded-2xl bg-white border border-gray-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-200/40"
                                    >
                                        <div className="flex-shrink-0 mt-1">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
                                                <FaCheckCircle className="text-white text-sm" />
                                            </div>
                                        </div>
                                        <span className="text-base md:text-lg text-gray-900 font-medium leading-relaxed">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Section */}
                            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 p-[3px]">
                                <div className="bg-white rounded-[22px] p-5 md:p-6 space-y-4">
                                    {/* Contact Info */}
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-gray-700">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                                                <IoMdCall className="text-yellow-500 text-base" />
                                            </div>
                                            <span className="text-sm font-medium">
                                                For more information, call
                                            </span>
                                        </div>
                                        <a
                                            href="tel:+919925511631"
                                            className="text-base md:text-lg font-bold text-yellow-700 hover:text-yellow-500 transition-colors"
                                        >
                                            +91-99255-11631
                                        </a>
                                    </div>

                                    {/* Enroll Button */}
                                    <button className="w-full group relative overflow-hidden cursor-pointer rounded-xl bg-[#ffca00] px-5 py-3 text-base md:text-lg font-semibold text-white shadow-md shadow-yellow-300/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/50 hover:scale-[1.02]">
                                        <span className="relative z-10">Enroll Now</span>
                                    </button>
                                </div>
                            </div>


                        </div>

                        {/* Right Image */}
                        <div className="relative order-first lg:order-last">
                            <div className="relative">
                                {/* Main image container */}
                                <div className="relative overflow-hidden rounded-3xl border-4 border-[#ffcb04] shadow-2xl p-2 w-[550px] h-[440px] mx-auto">
                                    <img
                                        src={
                                            examData?.exams?.[0]?.image
                                                ? examData.exams[0].image
                                                : "https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg"
                                        }
                                        alt={examData?.exams?.[0]?.exam_name}
                                        className="w-full h-full rounded-[1.5rem] object-cover shadow-2xl"
                                    />
                                </div>

                                {/* Floating badge */}
                                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-gray-200 p-3 md:p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600">
                                            <FaStar className="text-white text-base" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-bold text-gray-900 leading-tight">100%</p>
                                            <p className="text-xs text-gray-600">Success Rate</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </motion.section>




            {/* Course Description */}
            <CourseDes data={examData?.exams[0]?.description} />

            {/* FAQs */}
            <Faq />

            {/* Who Can Enroll */}
            <WhoEnroll
                plans={examData}
                loading={loading}
            />


            {/* REGISTER SECTION */}
            <NewsLetter />

            <Footer />
        </div>
    );
};





export default MedicalExamDetail;
