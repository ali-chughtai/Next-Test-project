"use client";

import { useState, useEffect } from "react";
import flags from "../../../public/images/flags/flag/flagImages";
import Image from "next/image";
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
    <div className="relative w-full rounded-lg md:bg-gradient-to-r md:from-[#e3e4e9] md:via-[#c6c8d2] md:to-[#9dabda]">
      <h2 className="text-xl font-bold text-center text-black md:text-white pt-2">
        Countries
      </h2>

      <div className="relative h-40 md:h-56 overflow-hidden rounded-lg">
        <div className="grid grid-cols-4 md:grid-cols-2 h-full items-center justify-center gap-3 md:p-2">
          <div className="w-full h-24 rounded-lg flex items-center justify-center">
            <Image
              src={countries[currentSlide][0]}
              alt="flag"
              width={150}
              height={150}
            />
          </div>

          <div className="w-full h-24 rounded-lg flex items-center justify-center">
            <Image
              src={countries[currentSlide][1]}
              alt="flag"
              width={150}
              height={150}
            />
          </div>

          <div className="w-full h-24 rounded-lg flex items-center justify-center">
            <Image
              src={countries[currentSlide][2]}
              alt="flag"
              width={150}
              height={150}
            />
          </div>

          <div className="w-full h-24 rounded-lg flex items-center justify-center">
            <Image
              src={countries[currentSlide][3]}
              alt="flag"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center md:mt-3 md:pb-3 space-x-3">
        {countries.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-2 h-2 rounded-full ${
              index === currentSlide ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
