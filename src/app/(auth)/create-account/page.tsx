"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
// import { useAuthModal } from "@/lib/AuthModalContext";

interface Slide {
  img: string;
  title: string;
  earnings: string;
}

const slides: Slide[] = [
  { img: "/img1.jpg", title: "Manifest Academy", earnings: "$40,907/month" },
  { img: "/img2.jpg", title: "Manifest Academy", earnings: "$40,907/month" },
  { img: "/img3.jpg", title: "Manifest Academy", earnings: "$40,907/month" },
];

export default function Page() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  // const { openModal } = useAuthModal();

  const prev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const next = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 600);
  };

  const getPrevIndex = () => (current === 0 ? slides.length - 1 : current - 1);
  const getNextIndex = () => (current === slides.length - 1 ? 0 : current + 1);

  const getImageStyle = (
    position: "prev" | "current" | "next" | "hidden"
  ) => {
    const base =
      "absolute rounded-xl overflow-hidden shadow-lg transition-all duration-600 ease-out";

    switch (position) {
      case "prev":
        return `${base} left-0 w-[220px] sm:w-[280px] md:w-[240px] lg:w-[320px] h-[200px] sm:h-[240px] z-10 transform -translate-x-1/3 scale-85 opacity-60`;
      case "current":
        return `${base} left-1/2 transform -translate-x-1/2 w-[260px] sm:w-[320px] md:w-[300px] lg:w-[360px] h-[220px] sm:h-[260px] z-30 scale-100 opacity-100 shadow-2xl`;
      case "next":
        return `${base} right-0 w-[220px] sm:w-[280px] md:w-[240px] lg:w-[320px] h-[200px] sm:h-[240px] z-10 transform translate-x-1/3 scale-85 opacity-60`;
      default:
        return base;
    }
  };

  const handleCreateCommunity = () => {
    // openModal("signup");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-center">
      {/* Logo */}
      <Image src="/logo.svg" alt="logo" height={30} width={30} />
<<<<<<< HEAD
      
      {/* <h1 className="text-4xl font-extrabold mb-2">
        <span className="text-red-500">s</span>
        <span className="text-black">k</span>
        <span className="text-blue-500">o</span>
        <span className="text-green-500">o</span>
        <span className="text-purple-600">l</span>
      </h1> */}
=======
>>>>>>> 6cb00ea6dd7370ef1aee3a4c760bc2e9b2167254

      {/* Tagline */}
      <p className="text-lg sm:text-xl font-semibold text-gray-700 leading-relaxed mt-3">
        Build a community around your passion.
        <br />
        Make money doing what you love.
      </p>

      {/* Carousel */}
      <div className="relative w-full max-w-[420px] sm:max-w-[600px] h-[300px] sm:h-[350px] mt-6 flex items-center justify-center perspective-1000">
        {slides.map((slide, index) => {
          let position: "prev" | "current" | "next" | "hidden" = "hidden";
          if (index === current) position = "current";
          else if (index === getPrevIndex()) position = "prev";
          else if (index === getNextIndex()) position = "next";
          if (position === "hidden") return null;

          return (
            <div
              key={index}
              className={getImageStyle(position)}
              style={{
                transitionDelay: position === "current" ? "100ms" : "0ms",
              }}
            >
              <Image
                src={slide.img}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              {position === "current" && (
                <div className="absolute top-2 right-2 bg-green-600 text-white text-sm px-3 py-1 rounded-md shadow-md transition-opacity duration-300">
                  <strong>{slide.title}</strong>
                  <br />
                  Earns {slide.earnings}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation + Dots */}
      <div className="flex items-center gap-5 mt-4 text-black">
        <button
          onClick={prev}
          className="cursor-pointer h-fit disabled:opacity-50"
          disabled={isAnimating}
        >
          <HiArrowLongLeft size={24} />
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setCurrent(index);
                  setTimeout(() => setIsAnimating(false), 600);
                }
              }}
              className={`w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                current === index ? "bg-blue-500" : "bg-gray-300"
              } ${isAnimating ? "pointer-events-none" : ""}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="cursor-pointer h-fit disabled:opacity-50"
          disabled={isAnimating}
        >
          <HiArrowLongRight size={24} />
        </button>
      </div>

      {/* CTA */}
<<<<<<< HEAD
      <button onClick={handleCreateCommunity}>
        <button className="mt-8 cursor-pointer bg-black hover:bg-[#2a2a5a] text-white font-bold py-3 px-6 rounded shadow-md transition-colors duration-200">
          CREATE YOUR COMMUNITY
        </button>
=======
      <button
        onClick={handleCreateCommunity}
        className="mt-8 cursor-pointer bg-[#313273] hover:bg-[#2a2a5a] text-white font-bold py-3 px-6 rounded shadow-md transition-colors duration-200"
      >
        CREATE YOUR COMMUNITY
>>>>>>> 6cb00ea6dd7370ef1aee3a4c760bc2e9b2167254
      </button>
    </main>
  );
}
