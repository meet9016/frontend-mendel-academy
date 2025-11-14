'use client';
import React from 'react'
import { FaGlobe, FaShieldAlt, FaUsers } from 'react-icons/fa';

const StatusSection = () => {
    return (
        <>
            {/* --- Stats Section --- */}
            <section className="bg-[#f9fafb] py-12">
                <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    {/* 1 Stat Card */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 border-primary  rounded-xl">
                            <FaUsers className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-2xl ff-font-bold">2300+</h3>
                        <p className="ff-font text-sm">Pathologists empowered worldwide</p>
                    </div>

                    {/* 2 Stat Card */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 border-primary  rounded-xl">
                            <FaShieldAlt className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-2xl ff-font-bold">900+</h3>
                        <p className="ff-font text-sm">
                            Annotated pathology slides across <span className="font-semibold text-primary">20+</span> tumor types
                        </p>
                    </div>

                    {/* 3 Stat Card */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 border-primary  rounded-xl">
                            <FaGlobe className="text-primary w-6 h-6" />
                        </div>
                        <h3 className="text-2xl ff-font-bold">150+</h3>
                        <p className="ff-font text-sm">Hours of expert-led video lectures</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StatusSection