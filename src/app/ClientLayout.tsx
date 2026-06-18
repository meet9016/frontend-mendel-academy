"use client";
import Header from "@/component/auth/Header";
import Footer from "@/component/auth/Footer";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toastify } from "@/comman/Toastify";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  const pathname = usePathname();

  const hideLayoutRoutes = [
    "/test-run",
    "/question-bank",
    // "/configure-practice",
    // "/practice-setup",
    // "/subject-detail",
    // "/session-summary",
    "/flash-card",
  ];

  const isFullScreen = hideLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <Provider store={store}>
      {!isFullScreen && <Header />}
      {children}
      <Toastify />
      {!isFullScreen && <Footer />}
    </Provider>
  );
}
