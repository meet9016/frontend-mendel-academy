"use client";

import { useRouter } from "next/navigation";
import { BiBookOpen } from "react-icons/bi";
import { CgLock, CgLogOff } from "react-icons/cg";
import { FaChartBar } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";


type QBankSidebarProps = {
  active: "create" | "previous" | "analysis" | "library" | "settings";
};

export default function QBankSidebar({ active }: QBankSidebarProps) {
  const router = useRouter();

  const menuItems = [
    {
      key: "create",
      label: "Create Test",
      path: "/test-create",
      icon: FiFilePlus,
      description: "Generate new practice tests"
    },
    {
      key: "previous",
      label: "Previous Tests",
      path: "/test-previous",
      icon: CgLock,
      description: "View test history"
    },
    // {
    //   key: "analysis",
    //   label: "Performance",
    //   path: "/test-analysis",
    //   icon: FaChartBar,
    //   description: "Analyze your progress"
    // },
    // {
    //   key: "library",
    //   label: "Question Library",
    //   path: "/question-library",
    //   icon: BiBookOpen,
    //   description: "Browse all questions"
    // },
    // {
    //   key: "settings",
    //   label: "Settings",
    //   path: "/settings",
    //   icon: CgLogOff,
    //   description: "Manage preferences"
    // }
  ] as const;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      {/* Header */}
      

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = active === item.key;
            const Icon = item.icon;
            
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => router.push(item.path)}
                className={`w-full group relative rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-dark shadow-sm"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                title={item.description}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    className={`w-5 h-5 transition-colors ${
                      isActive ? "text-dark" : "text-dark group-hover:text-gray-600"
                    }`} 
                  />
                  <span className="truncate">{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stats */}
        
      </nav>

      {/* Footer */}
     
    </aside>
  );
}