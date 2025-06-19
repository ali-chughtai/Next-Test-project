"use client";

import { useState, useEffect } from "react";
import flags from "../../../public/images/flags/flag/flagImages";
import Image from "next/image";
import { Globe } from "lucide-react";
export default function Flags() {
  const countries = [
    [flags.america, flags.canada, flags.italy, flags.germany],
    [flags.south_korea, flags.uk, flags.france, flags.argentina],
    [flags.america, flags.canada, flags.italy, flags.germany],
    [flags.south_korea, flags.uk, flags.france, flags.argentina],
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % countries.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-lg overflow-hidden">
      <div className="py-2 flex items-center gap-2 rounded-xl justify-center px-4 md:bg-gradient-to-br md:from-violet-600 md:via-blue-600 md:to-cyan-500">
        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30 shadow-md">
          <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700/90 md:text-white/90" />
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-700 md:text-white">
          Countries
        </h2>
      </div>

      <div className="p-2 sm:p-3 md:p-4">
        <div className="grid grid-cols-4 md:grid-cols-2 gap-2 sm:gap-3">
          {countries[currentSlide].map((flag, index) => (
            <div 
              key={index} 
              className="aspect-[3/2] relative group"
            >

              <div className="relative h-full w-full flex items-center justify-center p-1 transition-all duration-300 hover:scale-110">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={flag}
                    alt="flag"
                    fill
                    sizes="(max-width: 768px) 25vw, 20vw"
                    className="object-fill transition-all duration-300  border rounded-lg border-gray-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-2 sm:pb-3 md:pb-4 pt-1 space-x-2">
        {countries.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ease-in-out
              ${index === currentSlide ? "bg-blue-600 w-6 sm:w-8" : "bg-gray-300"}`}
            onClick={() => setCurrentSlide(index)}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
