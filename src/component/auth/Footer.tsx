'use client';

import { useRouter } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
const navLinks = [
    { name: "Home", path: "/" },
    { name: "Pathology", path: "/pathology" },
    { name: "Blog", path: "/blog" },
    { name: "About Us", path: "/aboutUs" },
    { name: "PG Medical Entrance Exams", path: "/" },
];
const Footer = () => {
    const router = useRouter();
    return (
        <footer className="bg-[#1a1a18] text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {/* Logo + Description */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="/images/main logo.png"
                            alt="Mendel Academy Logo"
                            className="w-40 h-auto object-contain"
                        />
                    </div>
                    <p className="text-sm leading-relaxed ff-font-bold">
                        Empowering medical aspirants worldwide with expert guidance,
                        innovative strategies, and a community-driven approach.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 text-xl pt-2">
                        <a href="#" className="hover:text-[#ffca00] transition"><FaFacebookF /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaInstagram /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaWhatsapp /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaYoutube /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaTiktok /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaPinterestP /></a>
                        <a href="#" className="hover:text-[#ffca00] transition"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-semibold ff-font-bold text-lg mb-4">Quick Links</h4>
                    <ul className="space-y-2 ff-font text-sm">
                        {navLinks.map((link, index) => (
                            <li
                                key={index}
                                onClick={() => router.push(link.path)}
                                className="hover:text-[#ffca00] cursor-pointer transition"
                            >
                                {link.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="font-semibold ff-font-bold text-lg mb-4">Contact Us</h4>
                    <div className="space-y-3 ff-font text-sm">
                        <p className="flex items-center gap-2">
                            🇮🇳 <span>+91 99255-11511</span>
                        </p>
                        <p className="flex items-center gap-2">
                            🇺🇸 <span>+1 310-708-3244</span>
                        </p>
                        <p className="pt-2">
                            <a
                                href="mailto:info@mendelacademy.com"
                                className="hover:text-[#ffca00] ff-font-bold transition"
                            >
                                info@mendelacademy.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 py-5 mt-6 text-center text-xs md:text-sm">
                © 2025 Mendel Academy. All rights reserved. Designed & Developed by
                <a href="#" className="hover:text-[#ffca00] ml-1">Gargi Managoli</a>
            </div>
        </footer>

    )
}

export default Footer