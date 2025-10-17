'use client';

import { FiStar, FiUsers } from "react-icons/fi";

interface CourseCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    badge?: string;
    rating: number;
    students: number;
    tags: string[];
    moreFeatures?: number;
    description: string;
    badgeVariant?: "default" | "secondary" | "outline";
}

const CourseCard = ({
    icon,
    title,
    subtitle = "",
    badge,
    rating,
    students,
    tags,
    moreFeatures = 0,
    description,
    badgeVariant = "secondary"
}: CourseCardProps) => {

    const badgeClasses = {
        default: "bg-black text-white",
        secondary: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-800"
    };

    return (
        <div className="group flex-shrink-0 w-[340px] cursor-pointer bg-gradient-to-br from-white via-gray-50 to-yellow-50 border-2 border-gray-200 rounded-3xl p-6 hover:shadow-2xl hover:shadow-yellow-300/20 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] flex flex-col relative overflow-hidden">

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-transparent to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="relative z-10">
                {/* Icon & Badge */}
                <div className="flex justify-between items-start mb-5">
                    <div className="w-13 h-13 bg-[#353c4c] rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    {badge && (
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full shadow-md ${badgeClasses[badgeVariant]}`}>
                            {badge}
                        </span>
                    )}
                </div>

                {/* Title & Subtitle */}
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-yellow-500 transition-colors duration-300">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>

                {/* Rating & Students */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full">
                        <FiStar className="text-yellow-400" />
                        <span className="text-sm font-bold">{rating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-gray-700">
                        <FiUsers />
                        <span className="text-sm font-medium">{students.toLocaleString()}</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-3 py-1.5 bg-[#f3f6fa] text-black rounded-full font-medium shadow-sm hover:shadow-md transition-shadow">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* More Features */}
                {moreFeatures > 0 && (
                    <button className="text-xs text-yellow-600 hover:text-yellow-500 text-left mb-4 flex items-center gap-1 font-medium group/btn">
                        <span>+{moreFeatures} more features</span>
                        <span className="text-lg leading-none group-hover/btn:translate-x-1 transition-transform">›</span>
                    </button>
                )}

                {/* Description */}
                <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">{description}</p>

                {/* Enroll Button */}
                <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:shadow-lg hover:shadow-yellow-300/30 text-gray-900 font-bold py-4 rounded-xl transition-all duration-300 group-hover:scale-[1.02]">
                    Enroll Now
                </button>

                <p className="text-xs text-gray-400 text-center mt-3 font-medium">
                    Instant access •  Secure checkout
                </p>
            </div>
        </div>
    );
};

export default CourseCard;
