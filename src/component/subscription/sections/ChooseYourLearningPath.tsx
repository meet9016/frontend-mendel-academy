import React, { useState, useEffect } from 'react'
import { motion } from "framer-motion";
import { BsAward, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineSchool, MdTrendingUp, MdVerifiedUser } from 'react-icons/md';
import { FiAlertCircle, FiCheck, FiMail } from 'react-icons/fi';
import CommonButton from '@/comman/Button';
import { toast } from 'react-toastify';
import endPointApi from '@/utils/endPointApi';
import { store } from "@/redux/store";
import { setCartCount } from "@/redux/cartSlice";


// TypeScript interfaces
interface ModuleFeature {
    features: string[];
}

interface ModuleData extends ModuleFeature {
    id?: string | number;
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    price_usd?: number;
    price_inr?: number;
    priceUSD?: number;
    isMostPopular?: boolean;
    gradient?: string;
    icon?: React.ReactNode;
    moduleNumber?: string;
}

interface ChooseYourLearningPathProps {
    data: ModuleData[];
    currency?: string;
    userCountry?: string;
    livecourseId?: string;
    onAddToCart?: (moduleId: string) => void;
}

// ✅ Helper function to format currency
const formatCurrency = (amount: number | undefined | null, currency: string) => {
    const safeAmount = Number(amount) || 0;

    if (currency === 'INR') {
        return {
            code: 'INR',
            symbol: '₹',
            formatted: safeAmount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        };
    }
    return {
        code: 'USD',
        symbol: '$',
        formatted: safeAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    };
};

// ✅ Helper function to get the correct price based on currency
const getPriceForCurrency = (module: ModuleData, currency: string): number => {
    if (currency === 'INR') {
        return module.price_inr || module.price || 0;
    }
    return module.price_usd || module.priceUSD || module.price || 0;
};

const ChooseYourLearningPath: React.FC<ChooseYourLearningPathProps> = ({
    data,
    currency = 'USD',
    userCountry,
    livecourseId,
    onAddToCart
}) => {
    const [loadingModuleId, setLoadingModuleId] = useState<string | null>(null);
    const [modulesWithIds, setModulesWithIds] = useState<ModuleData[]>([]);

    useEffect(() => {
        if (data && data.length > 0) {
            const processedModules = data.map((module, index) => {
                const moduleId = module._id || module.id || `module-${index}`;
                return {
                    ...module,
                    _id: moduleId.toString(),
                    id: moduleId.toString()
                };
            });
            setModulesWithIds(processedModules);
        }
    }, [data]);

    const handleAddToCart = async (module: ModuleData, moduleIndex: number) => {
        if (!livecourseId) {
            toast.error('Course information is missing');
            return;
        }

        let moduleId = module._id || module.id;

        if (!moduleId) {
            moduleId = moduleIndex;
        }

        if (!moduleId && moduleId !== 0) {
            toast.error('Module information is missing');
            return;
        }

        setLoadingModuleId(String(moduleId));

        try {
            const tempId = sessionStorage.getItem('temp_id');
            const userId = localStorage.getItem('auth_id');

            const requestPayload = {
                temp_id: tempId,
                user_id: userId,
                livecourse_id: livecourseId,
                livecourse_module_id: String(moduleId),
                bucket_type: true,
            };

            const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:5000/api';
            const apiUrl = `${API_BASE_URL}${endPointApi.postAddLiveCoursesToCart}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestPayload),
            });

            const result = await response.json();

            if (result.success) {
                try {
                    const identifier = userId || tempId;
                    const cartCountUrl = `${API_BASE_URL}${endPointApi.cartCount}/${identifier}`;

                    const countResponse = await fetch(cartCountUrl);
                    const countData = await countResponse.json();

                    if (countData.count !== undefined) {
                        store.dispatch(setCartCount(countData.count));
                    }
                } catch (countError) {
                    // Silently handle cart count update errors
                }

                if (result.alreadyInCart) {
                    toast.success('Module is already in your cart!');
                } else {
                    toast.success('Module added to cart successfully!');
                }

                if (onAddToCart) {
                    onAddToCart(String(moduleId));
                }
            } else {
                toast.error(result.message || 'Failed to add module to cart');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoadingModuleId(null);
        }
    };

    // Icon mapping function
    const getIconComponent = (module: ModuleData, index: number): React.ReactNode => {
        if (module.isMostPopular) {
            return <BsShieldCheck className="text-4xl" />;
        }

        switch (index) {
            case 0:
                return <BsAward className="text-4xl" />;
            case 1:
                return <MdOutlineSchool className="text-4xl" />;
            default:
                return <BsAward className="text-4xl" />;
        }
    };

    const getCardStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return `bg-white ${module.gradient || ''} border-2 border-[#ffcc09]`;
        } else {
            return `bg-white ${module.gradient || ''} border-2 border-gray-200`;
        }
    };

    const getIconBoxStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "bg-white text-primary";
        } else {
            return "bg-white text-gray-700";
        }
    };

    const getCheckCircleStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "bg-[#ffcc09]";
        } else {
            return "bg-gray-300";
        }
    };

    const getCheckMarkStyling = (module: ModuleData): string => {
        if (module.isMostPopular) {
            return "text-black";
        } else {
            return "text-white";
        }
    };

    // Use processed modules with guaranteed IDs
    const displayData = modulesWithIds.length > 0 ? modulesWithIds : data;

    return (
        <>
            <section className="py-15 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold ff-font-bold mb-4">
                            Choose Your Learning Path
                        </h2>
                        <p className="text-lg ff-font max-w-2xl mx-auto">
                            Select the module that best fits your learning goals and career aspirations
                        </p>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid md:grid-cols-3 gap-6 cursor-pointer justify-center mb-12">
                        {displayData?.map((module, index) => {
                            const displayPrice = getPriceForCurrency(module, currency);
                            const currencyInfo = formatCurrency(displayPrice, currency);
                            const moduleId = String(module._id || module.id || index);
                            const isLoading = loadingModuleId === moduleId;

                            return (
                                <motion.div
                                    key={`module-${index}-${moduleId}`}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative group h-full flex justify-center"
                                >
                                    {module.isMostPopular && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                                            <div className="bg-[#ffcc09] text-black text-xs font-bold px-6 py-2 rounded-full shadow-lg flex items-center gap-2">
                                                <MdTrendingUp />
                                                MOST POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div
                                        className={`relative h-full max-w-[400px] w-full mx-auto ${getCardStyling(module)} rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] flex flex-col`}
                                    >
                                        {!module.isMostPopular && (
                                            <div className="absolute top-0 right-0 w-20 h-20 bg-gray-200 opacity-10 rounded-bl-full" />
                                        )}

                                        {/* Icon Box */}
                                        <div className={`w-14 h-14 border-primary rounded-xl ${getIconBoxStyling(module)} flex items-center justify-center mb-5 shadow-md`}>
                                            {getIconComponent(module, index)}
                                        </div>

                                        {/* Title + Subtitle */}
                                        <div className="mb-3">
                                            <h3 className="text-xs font-bold ff-font-bold mb-1">
                                                {module.title}
                                            </h3>
                                            {module.subtitle && (
                                                <h4 className="text-lg font-bold ff-font leading-tight">
                                                    {module.subtitle}
                                                </h4>
                                            )}
                                        </div>

                                        <p className="text-sm ff-font mb-5 flex-grow">
                                            {module.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mb-5 pb-5 border-b-2 border-gray-200">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-semibold ff-font">
                                                        {currencyInfo.code}
                                                    </span>
                                                    <span className="text-3xl font-bold ff-font-bold">
                                                        {currencyInfo.symbol}{currencyInfo.formatted}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Features */}
                                        <ul className="space-y-2.5 mb-6 flex-grow">
                                            {module.features?.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5">
                                                    <div className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-full ${getCheckCircleStyling(module)} flex items-center justify-center`}>
                                                        <FiCheck className={`text-[10px] ${getCheckMarkStyling(module)}`} />
                                                    </div>
                                                    <span className="text-sm ff-font leading-relaxed">
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Add to Cart Button */}
                                        <CommonButton
                                            pyClass="py-3"
                                            pxClass="px-26"
                                            fontWeight={700}
                                            fontSize={14}
                                            onClick={() => handleAddToCart(module, index)}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Adding...
                                                </span>
                                            ) : (
                                                'Add to Cart'
                                            )}
                                        </CommonButton>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Alert Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="bg-white border-2 border-primary rounded-xl p-6 mb-12 flex items-center gap-4 max-w-4xl mx-auto"
                    >
                        <FiAlertCircle className="text-3xl text-primary flex-shrink-0" />
                        <p className="ff-font font-medium">
                            <span className="font-bold ff-font-bold">Seats are limited!</span> Course fee based on chosen module (non-refundable)
                        </p>
                    </motion.div>

                    {/* Help Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-[#f9fafb] rounded-2xl p-10 text-center max-w-2xl mx-auto"
                    >
                        <MdVerifiedUser className="text-5xl text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold ff-font-bold mb-3">
                            Need Help Choosing?
                        </h3>
                        <p className="ff-font mb-6">
                            Not sure which module is right for you? Our team is here to help you make the best choice for your career goals.
                        </p>
                        <CommonButton
                            pyClass="py-3"
                            pxClass="px-12"
                            fontWeight={700}
                            fontSize={15}
                            className="bg-black text-white flex items-center gap-2 hover:bg-black hover:text-white"
                        >
                            <FiMail />
                            Contact Our Team
                        </CommonButton>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default ChooseYourLearningPath;