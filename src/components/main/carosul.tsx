"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Carousel() {
  const slides = [
    "You choose country, we take you there through study routes.",
    "Success often offers friendship to those who answer when opportunity knocks at their door.",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("left");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
      setSlideDirection("");
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection("right");
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsTransitioning(false);
      setSlideDirection("");
    }, 300);
  };

  return (
    <div className="w-full relative">
      <div className="relative w-full h-[12rem] sm:h-[14rem] md:h-64 lg:h-80 overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-500"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-yellow-400/20"></div>
        
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-6 md:left-8 w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 md:bottom-8 md:right-12 w-8 h-8 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-purple-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1 sm:left-2 md:left-4 w-5 h-5 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-cyan-300/15 rounded-full blur-lg animate-ping"></div>

        <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-16 text-center h-full flex items-center justify-center">
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              <div className="p-1 sm:p-2 md:p-3 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-white/30 shadow-md sm:shadow-lg">
                <Quote className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white/90" />
              </div>
            </div>

            <div
              className={`
                relative p-4 sm:p-6 md:p-8 lg:p-12 bg-white/95 backdrop-blur-md 
                rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl
                border border-white/20 shadow-md sm:shadow-lg md:shadow-xl max-w-3xl mx-auto
                transition-all duration-500 ease-out transform
                ${isTransitioning && slideDirection === "left"
                  ? "translate-x-full opacity-0 scale-95"
                  : ""
                }
                ${isTransitioning && slideDirection === "right"
                  ? "-translate-x-full opacity-0 scale-95"
                  : ""
                }
                ${!isTransitioning ? "translate-x-0 opacity-100 scale-100" : ""}
              `}
            >
              <div className="absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 md:-top-2 md:-left-2 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-60"></div>
              <div className="absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 md:-bottom-2 md:-right-2 w-4 h-4 sm:w-5 sm:h-5 md:w-8 md:h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-40"></div>
              
              <blockquote className="text-sm sm:text-base md:text-xl lg:text-2xl font-medium leading-relaxed text-transparent bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text">
                "{slides[currentSlide]}"
              </blockquote>
              
              <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 w-10 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 z-20 
                     group p-1.5 sm:p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                     rounded-lg sm:rounded-xl md:rounded-2xl border border-white/30 shadow-sm sm:shadow-md
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 
                     disabled:cursor-not-allowed hover:shadow-lg sm:hover:shadow-xl"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white group-hover:text-white transition-colors duration-200" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 z-20 
                     group p-1.5 sm:p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm 
                     rounded-lg sm:rounded-xl md:rounded-2xl border border-white/30 shadow-sm sm:shadow-md
                     transition-all duration-300 hover:scale-110 disabled:opacity-50 
                     disabled:cursor-not-allowed hover:shadow-lg sm:hover:shadow-xl"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white group-hover:text-white transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
}