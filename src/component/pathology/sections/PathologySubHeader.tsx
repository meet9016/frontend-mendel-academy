"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const links = [
  { name: "WHY MENDEL", id: "why-mendel" },
  { name: "FELLOWSHIP", id: "fellowship", href: "/pathology/fellowship" },
  { name: "MASTERY COURSES", id: "mastery-courses", href: "/pathology/mastery-courses" },
  { name: "BOARD PREP", id: "board-prep", href: "/pathology/board-prep" },
  { name: "CONSULTING", id: "consulting", href: "/pathology/consulting" },
  { name: "CLINICAL RESEARCH", id: "clinical-research", href: "/pathology/clinical-research" },
  { name: "MINI-MEDICAL MBAS", id: "mini-mba", href: "/pathology/mini-mba" },
  { name: "COMMUNITY", id: "community", href: "/pathology#community" },
  { name: "LEARNING EXPERIENCE", id: "learning-experience", href: "/pathology#learning-experience" },
  { name: "FAQ", id: "faq" }
];

const PathologySubHeader = () => {
  const [activeId, setActiveId] = useState("fellowship");
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      // Find all sections that have an id
      const scrollPosition = window.scrollY + 150; // offset for sticky header
      
      let currentId = activeId;
      
      for (const link of links) {
        const element = document.getElementById(link.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentId = link.id;
          }
        }
      }
      
      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // init

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  const handleLinkClick = (id: string, href?: string) => {
    if (href) {
      router.push(href);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveId(id);
    }
  };

  return (
    <div className="w-full bg-[#161221] border-b border-[#2A2438] sticky top-[80px] z-40 overflow-x-auto no-scrollbar shadow-xl">
      <div className="max-w-[1380px] mx-auto px-4 md:px-6 lg:px-8">
        <ul className="flex items-center justify-start md:justify-center min-w-max gap-8 h-12">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleLinkClick(link.id, link.href)}
                className={`text-[10px] font-bold tracking-widest uppercase ff-font-bold transition-colors ${
                  activeId === link.id 
                    ? "text-[#FFCA00] border-b-2 border-[#FFCA00] h-12" 
                    : "text-[#A3A8B8] hover:text-white"
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default PathologySubHeader;
