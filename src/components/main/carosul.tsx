"use client"
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Carousel() {
  // Simple text slides
  const slides = [
    "You can change the country, we take you there through study routes.",
    "Success often offers friendship to those who answer when opportunity knocks at their door.",
  ]

  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [slideDirection, setSlideDirection] = useState('')

  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setSlideDirection('left') // Moving to next slide = slide left
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
      setIsTransitioning(false)
      setSlideDirection('')
    }, 150) // Half of transition duration
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setSlideDirection('right') // Moving to prev slide = slide right
    
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
      setIsTransitioning(false)
      setSlideDirection('')
    }, 150) // Half of transition duration
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-52 md:h-72 bg-gradient-to-r from-[#9dabda] via-[#c6c8d2] to-[#e3e4e9] rounded-lg shadow-lg overflow-hidden">
        
        <div className="px-16 text-center h-full flex items-center justify-center">
          <div 
            className={`
               text-lg italic sm:text-2xl text-cyan-800 font-medium leading-relaxed max-h-48 overflow-y-auto bg-white rounded-md py-10 px-1
              transition-all duration-300 ease-in-out 
              ${isTransitioning && slideDirection === 'left' ? 'transform translate-x-full opacity-0' : ''}
              ${isTransitioning && slideDirection === 'right' ? 'transform -translate-x-full opacity-0' : ''}
              ${!isTransitioning ? 'transform translate-x-0 opacity-100' : ''}
            `}
          >
            "{slides[currentSlide]}"
          </div>
        </div>

        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-white/20 rounded-full p-1 transition-colors duration-200 disabled:opacity-50"
        >
          <ChevronLeft className="w-8 h-8 text-black" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 hover:bg-white/20 rounded-full p-1 transition-colors duration-200 disabled:opacity-50"
        >
          <ChevronRight className="w-8 h-8 text-black" />
        </button>

      </div>
    </div>
  )
}