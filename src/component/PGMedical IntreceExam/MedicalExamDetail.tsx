'use client'
import {
    FaBookOpen,
    FaBrain,
    FaChartLine,
    FaUsers,
    FaClipboardCheck,
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

const MedicalExamDetail = () => {

    const features = [
        { icon: FaBookOpen, text: "High-yield MCQ based active learning" },
        { icon: FaBrain, text: "Mnemonics" },
        { icon: FaClipboardCheck, text: "Mendal Academy SketchNotes" },
        { icon: FaChartLine, text: "Mendal Academy Flowcharts" },
        { icon: FaChartLine, text: "Self-Assessment Tests with performance analytics" },
        { icon: FaUsers, text: "Closed Telegram group for student interactions" }
    ];

    const { id } = useParams();
    const [examData, setExamData] = useState<any>(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        fetcgExamData();
    }, [])

    console.log(examData, 'examData')

    const fetcgExamData = async () => {
        try {
            setLoading(true)
            const res = await api.get(`${endPointApi.getMedicalById}/${id}`)
            if (res.data) {
                console.log(res.data, 'uuuuu');

                setExamData(res?.data)
            } else {
                console.log("DATA FAILED")
            }
        } catch (error) {
            console.log("ERROR", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-amber-50 to-gray-50 pointer-events-none"></div>
                <div className="relative mx-auto max-w-7xl px-6 py-15 md:py-8">
                    <div className="grid items-center gap-16 md:grid-cols-2">
                        {/* Left Content */}
                        <div className="order-2 space-y-10 md:order-1">
                            <div className="space-y-4">
                                <div className="inline-block rounded-full bg-yellow-100 px-5 py-2">
                                    <span className="text-sm font-semibold text-yellow-600">
                                        Premium Medical Education
                                    </span>
                                </div>
                                <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                                    {examData?.exams[0]?.exam_name}
                                </h1>
                                <p className="text-xl text-gray-600">
                                    {/* Master your medical knowledge with expert-led comprehensive preparation */}
                                    {examData?.exams[0]?.description}
                                </p>
                                <div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        With Mendal Academy, you will get:
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="grid gap-3">
                                    {examData?.exams[0]?.sub_titles?.map((feature :any, index: number) => (
                                        <div
                                            key={index}
                                            className="group cursor-pointer flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-300 hover:border-yellow-400 hover:shadow-md"
                                        >
                                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-yellow-100 transition-colors group-hover:bg-yellow-200">
                                                {/* <feature.icon className="text-sm text-yellow-500" /> */}
                                                <FaLongArrowAltRight className="text-sm text-yellow-500" />
                                            </div>
                                            <span className="text-gray-900 text-[15px]">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>


                            <div className="space-y-5 rounded-2xl border border-yellow-400/40 bg-gradient-to-br from-yellow-100 to-amber-50 p-7 md:p-8">
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
                                <button className="w-full transform rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 px-10 py-6 text-lg font-bold text-white shadow-md shadow-yellow-400/25 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                    Enroll Now
                                </button>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 flex justify-center mt-0 md:mt-[18rem] md:order-2">
                            <div className="relative">
                                {/* <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-yellow-200 to-amber-100 blur-2xl"></div> */}
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/021/518/002/non_2x/a-woman-doctor-with-a-tablet-and-a-stethoscope-an-image-on-a-blue-background-a-doctor-in-a-medical-uniform-cartoon-style-family-doctor-medical-worker-paramedic-vector.jpg"
                                    alt="Medical professional"
                                    className="relative h-auto w-[85%] rounded-3xl object-cover border border-[#ffcb04] shadow-2xl md:w-[95%] lg:w-[100%]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Description */}
            <CourseDes />

            {/* FAQs */}
            <Faq />

            {/* Who Can Enroll */}
            <WhoEnroll plans={examData?.choose_plan_list || []} />


            {/* REGISTER SECTION */}
            <RegisterSec />

            <Footer />
        </div>
    );
};

export default MedicalExamDetail;
