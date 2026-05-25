import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Pure. Natural. Powerful.',
    subtitle: 'Nourish Your Body with Royal Superfood',
    description: 'Experience the unique nutritional richness of premium Red Banana Powder. Handpicked from organic orchards, rich in potassium, prebiotics, and essential vitamins.',
    cta: 'Explore Collection',
    image: 'https://placehold.co/800x600/7B1C2E/FFF8F5?text=Red+Banana+Superfood',
    bg: 'bg-gradient-to-r from-[#FFF0EB] to-[#FDF0F0]',
    accent: 'text-maroon',
  },
  {
    title: '100% Organic Gut Health',
    subtitle: 'High Resistant Starch Cooking Essential',
    description: 'Elevate your healthy baking with our gluten-free Red Banana Flour. Low glycemic, grain-free, and high in prebiotics to support a happy digestive system.',
    cta: 'Shop Organic Flour',
    image: 'https://placehold.co/800x600/C8992A/FFF8F5?text=Raw+Organic+Powder',
    bg: 'bg-gradient-to-r from-[#FDF0F0] to-[#FFF6EA]',
    accent: 'text-gold-dark',
  },
  {
    title: 'Immunity in a Capsule',
    subtitle: 'Your Daily Dose of Active Nutrition',
    description: 'Get all the incredible benefits of raw red banana on-the-go. Pure extracts encapsulated in organic, vegetable shell capsules for maximum daily performance.',
    cta: 'Discover Capsules',
    image: 'https://placehold.co/800x600/7B1C2E/FFF8F5?text=Capsules+For+Immunity',
    bg: 'bg-gradient-to-r from-[#FFF6EA] to-[#FFF0EB]',
    accent: 'text-maroon',
  }
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  // Autoplay functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-cream border-b border-maroon/5 bg-floral-pattern">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 transition-all duration-1000 ease-in-out ${
            index === current 
              ? 'opacity-100 translate-x-0 z-10' 
              : 'opacity-0 translate-x-8 -z-10'
          } ${slide.bg}`}
        >
          {/* Left: Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 md:space-y-6 text-left mt-6 md:mt-0 max-w-xl">
            <span className="text-xs md:text-sm font-bold text-gold uppercase tracking-[0.25em] animate-slide-up">
              {slide.subtitle}
            </span>
            <h1 className="text-3.5xl md:text-5xl lg:text-6xl font-black font-heading text-maroon leading-tight animate-slide-up">
              {slide.title}
            </h1>
            <p className="text-sm md:text-base text-darkbrown/70 leading-relaxed font-medium animate-slide-up">
              {slide.description}
            </p>

            <div className="pt-2 animate-slide-up">
              <button
                onClick={() => navigate('/products')}
                className="bg-maroon hover:bg-maroon-hover text-white font-bold px-8 py-3.5 rounded-full border border-gold hover:shadow-gold-glow flex items-center gap-2 group transition-all duration-300 uppercase tracking-widest text-xs"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right: Mock Product Image */}
          <div className="w-full md:w-1/2 h-full flex items-center justify-center relative mt-6 md:mt-0">
            <div className="w-[280px] md:w-[420px] aspect-square rounded-3xl overflow-hidden border-2 border-gold/20 shadow-blush-lg bg-white relative p-4 group transition-all duration-500 hover:rotate-1 hover:scale-[1.02]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/5 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      ))}

      {/* Manual Arrow Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-maroon border border-maroon/10 shadow-sm hover:scale-105 transition-all z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-maroon border border-maroon/10 shadow-sm hover:scale-105 transition-all z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === current 
                ? 'bg-maroon w-7 shadow-sm' 
                : 'bg-maroon/30 hover:bg-maroon/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
