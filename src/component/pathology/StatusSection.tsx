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
                        <div className="p-3 bg-[#f0b100]/20 rounded-xl">
                            <FaUsers className="text-[#f0b100] w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">2300+</h3>
                        <p className="text-muted-foreground text-sm">Pathologists empowered worldwide</p>
                    </div>

                    {/* 2 Stat Card */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-[#f0b100]/20 rounded-xl">
                            <FaShieldAlt className="text-[#f0b100] w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">900+</h3>
                        <p className="text-muted-foreground text-sm">
                            Annotated pathology slides across <span className="font-semibold text-[#f0b100]">20+</span> tumor types
                        </p>
                    </div>

                    {/* 3 Stat Card */}
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-[#f0b100]/20 rounded-xl">
                            <FaGlobe className="text-[#f0b100] w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">150+</h3>
                        <p className="text-muted-foreground text-sm">Hours of expert-led video lectures</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default StatusSection