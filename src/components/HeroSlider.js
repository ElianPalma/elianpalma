import React, { useState, useEffect } from 'react';
import imgslider1 from './img/software.jpg';
import imgslider2 from './img/diseñoweb.jpg';
import imgslider3 from './img/SEO.jpg';

const heroSlides = [
  {
    id: 1,
    title: "Desarrollador Web Full Stack",
    subtitle: "Especializado en WordPress y E-commerce",
    description: "Creación de sitios web a medida con las últimas tecnologías y enfoque en resultados.",
    image: imgslider1,
    ctaText: "Ver mis proyectos",
    ctaLink: "#projects"
  },
  {
    id: 2,
    title: "Experto en UX/UI",
    subtitle: "Diseño centrado en el usuario",
    description: "Interfaces intuitivas que mejoran la experiencia y conversión de tus clientes.",
    image: imgslider2,
    ctaText: "Conoce mis habilidades",
    ctaLink: "#skills"
  },
  {
    id: 3,
    title: "Consultor SEO y Marketing Digital",
    subtitle: "Posicionamiento y visibilidad online",
    description: "Estrategias personalizadas para aumentar el tráfico cualificado a tu sitio web.",
    image: imgslider3,
    ctaText: "Contáctame ahora",
    ctaLink: "#contact"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransition(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        setTransition(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setTransition(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setTransition(true);
    }, 500);
  };

  return (
    <section className="relative h-screen max-h-[800px] overflow-hidden">
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      <div className="relative h-full w-full">
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${transition ? 'opacity-100' : 'opacity-0'} ${
              index === currentSlide ? 'z-0' : 'z-[-1]'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6">
          <div className={`max-w-2xl transition-all duration-700 ${transition ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
              {heroSlides[currentSlide].title}
            </h1>
            <h2 className="text-2xl md:text-3xl text-blue-300 mb-6 animate-fadeIn delay-100">
              {heroSlides[currentSlide].subtitle}
            </h2>
            <p className="text-lg text-white mb-8 animate-fadeIn delay-200">
              {heroSlides[currentSlide].description}
            </p>
            <a
              href={heroSlides[currentSlide].ctaLink}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 animate-fadeIn delay-300"
              data-cursor-hover="button"
            >
              {heroSlides[currentSlide].ctaText}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50'}`}
            aria-label={`Ir a slide ${index + 1}`}
          ></button>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.2s; }
        .delay-200 { animation-delay: 0.4s; }
        .delay-300 { animation-delay: 0.6s; }
      `}</style>
    </section>
  );
};

export default HeroSlider;

// DONE