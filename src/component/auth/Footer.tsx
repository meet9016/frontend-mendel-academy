'use client';

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
const navLinks = [
    "Home",
    "Pathology",
    "Blog",
    "About Us",
    "PG Medical Entrance Exams",
];
const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-200 ">
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid lg:grid-cols-3 gap-10">
                {/* Logo & Description */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="https://mendelacademy.com/mendel-logo/mendel-logo-main.svg"
                            alt="Mendel Academy Logo"
                            className="w-12 h-12 object-contain"
                        />
                        <div className="flex flex-col leading-tight">
                            <span className="font-bold text-lg text-white">MENDEL</span>
                            <span className="text-xs text-gray-400 uppercase tracking-wider">ACADEMY</span>
                        </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                        Empowering medical aspirants worldwide with expert guidance, innovative strategies, and a community-driven approach.
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xl text-gray-400">
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaFacebookF /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaInstagram /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaWhatsapp /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaYoutube /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaTiktok /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaPinterestP /></a>
                        <a href="#" className="hover:text-yellow-500 transition-colors"><FaLinkedinIn /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        {navLinks.map((link, index) => (
                            <li key={index} className="hover:text-yellow-500 transition-colors cursor-pointer">{link}</li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                        <span>🇮🇳</span> +91 99255-11511
                    </p>
                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
                        <span>🇺🇸</span> +1 310-708-3244
                    </p>
                    <p className="text-gray-400 text-sm mt-4">
                        <a href="mailto:info@mendelacademy.com" className="hover:text-yellow-500 transition-colors">info@mendelacademy.com</a>
                    </p>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
                © 2025 Mendel Academy. All rights reserved. Designed & Developed by <a href="#" className="hover:text-yellow-500">Gargi Managoli</a>
            </div>
        </footer>
    )
}

export default Footer