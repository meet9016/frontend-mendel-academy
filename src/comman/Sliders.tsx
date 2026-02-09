import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 bg-primary text-yellow-600 hover:text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 bg-primary text-yellow-600 hover:text-white p-3 rounded-full shadow-lg hover:bg-yellow-600 transition"
  >
    <FaChevronLeft />
  </button>
);

export default function Sliders({ settings = {}, children }) {
  const defaultSettings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    ...settings,
  };

  return (
    <Slider {...defaultSettings}>
      {children}
    </Slider>
  );
}