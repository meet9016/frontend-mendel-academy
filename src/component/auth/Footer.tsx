"use client";
import { useRouter } from "next/navigation";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

/* ----------  TYPES  ---------- */
type NavLink = { name: string; path: string };
type Social = { Icon: React.ElementType; href: string };

/* ----------  DATA  ---------- */
const navLinks: NavLink[] = [
  { name: "Home", path: "/" },
  { name: "Pathology", path: "/pathology" },
  { name: "Blog", path: "/blog" },
  { name: "About Us", path: "/aboutUs" },
  { name: "PG Medical Entrance Exams", path: "/" },
  { name: "Terms & Condition", path: "/terms-condition" },
];

const socials: Social[] = [
  { Icon: FaFacebookF, href: "#" },
  { Icon: FaInstagram, href: "#" },
  { Icon: FaWhatsapp, href: "#" },
  { Icon: FaYoutube, href: "#" },
  { Icon: FaTiktok, href: "#" },
  { Icon: FaPinterestP, href: "#" },
  { Icon: FaLinkedinIn, href: "#" },
];

/* ----------  MAIN FOOTER  ---------- */
export default function Footer() {
  const router = useRouter();

  return (
    <footer className="bg-[#1a1a18] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        <LogoDesc socials={socials} />
        <QuickLinks links={navLinks} onNav={(path) => router.push(path)} />
        <Contact />
      </div>

      <BottomBar />
    </footer>
  );
}

/* ----------  SUB-COMPONENTS  ---------- */
const LogoDesc = ({ socials }: { socials: Social[] }) => (
  <div className="space-y-5">
    <img src="/images/main logo.png" alt="Mendel Academy Logo" className="w-40 h-auto object-contain cursor-pointer" />
    <p className="text-sm leading-relaxed ff-font-bold">
      Empowering medical aspirants worldwide with expert guidance, innovative strategies, and a community-driven approach.
    </p>
    <div className="flex items-center gap-4 text-xl pt-2">
      {socials.map(({ Icon, href }, i) => (
        <a key={i} href={href} className="hover:text-[#ffca00] transition">
          <Icon />
        </a>
      ))}
    </div>
  </div>
);

const QuickLinks = ({ links, onNav }: { links: NavLink[]; onNav: (path: string) => void }) => (
  <div>
    <h4 className="font-semibold ff-font-bold text-lg mb-4">Quick Links</h4>
    <ul className="space-y-2 ff-font text-sm">
      {links.map((l) => (
        <li key={l.name} onClick={() => onNav(l.path)} className="hover:text-[#ffca00] cursor-pointer transition">
          {l.name}
        </li>
      ))}
    </ul>
  </div>
);

const Contact = () => (
  <div>
    <h4 className="font-semibold ff-font-bold text-lg mb-4">Contact Us</h4>
    <div className="space-y-3 ff-font text-sm">
      <p className="flex items-center gap-2">🇮🇳 <span>+91 99255-11511</span></p>
      <p className="flex items-center gap-2">🇺🇸 <span>+1 310-708-3244</span></p>
      <p className="pt-2">
        <a href="mailto:info@mendelacademy.com" className="hover:text-[#ffca00] ff-font-bold transition">
          info@mendelacademy.com
        </a>
      </p>
    </div>
  </div>
);

const BottomBar = () => (
  <div className="border-t ff-font-bold border-gray-700 py-5 mt-6 text-center text-xs md:text-sm">
    © 2025 Mendel Academy. All rights reserved. Designed & Developed by
    <a href="#" className="hover:text-[#ffca00] ml-1">Gargi Managoli</a>
  </div>
);