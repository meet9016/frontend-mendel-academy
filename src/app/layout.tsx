"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Toastify from "@/comman/Toastify";
import Header from "@/component/auth/Header";
import Footer from "@/component/auth/Footer";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);

  const pathname = usePathname();
  const isFullScreen = pathname.startsWith("/test-run");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          {!isFullScreen && <Header />}
          {children}
          <Toastify />
          {!isFullScreen && <Footer />}
        </Provider>
      </body>
    </html>
  );
}
