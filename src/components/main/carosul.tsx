// export default function carosul() {

//     return(
//         <div className="bg-amber-200">
//             <h1>Carosul</h1>
//         </div>
//     )
// }

"use client"

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function carosul() {
  // Simple text slides
  const slides = [
    "You can change the country, we take you there through study routes.", 
    "Success often offers friendship to those who answer when oppurtunity knocks at their door.",
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="w-full">
      {/* Carousel Container - fixed width */}
      <div className="relative w-full h-52 md:h-72 bg-gradient-to-r from-[#9dabda] via-[#c6c8d2] to-[#e3e4e9] rounded-lg shadow-lg">
        
        {/* Text Content - with padding and overflow handling */}
        <div className="px-16 py-8 text-center h-full flex items-center justify-center">
          <div className="text-gray-600 text-xl font-medium leading-relaxed max-h-48 overflow-y-auto">
            {slides[currentSlide]}
          </div>
        </div>

        {/* Left Arrow - fixed position with z-index */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2  z-10"
        >
          <ChevronLeft className="w-8 h-8 text-black" />
        </button>
        
        {/* Right Arrow - fixed position with z-index */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  z-10"
        >
          <ChevronRight className="w-8 h-8 text-black" />
        </button>
      </div>
    </div>
  )
}
