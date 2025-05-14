import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

const AboutSection = () => {
  useScrollAnimation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(document.querySelector('#about'));

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  const calculateTransform = (index) => {
    if (!isVisible) return 'translateY(50px)';
    const x = (mousePosition.x / window.innerWidth - 0.5) * 40;
    const y = (mousePosition.y / window.innerHeight - 0.5) * -40;
    return `rotateX(${y}deg) rotateY(${x}deg) translateZ(${index * 10}px)`;
  };

  const codeLines = [
    "const developer = {",
    "  name: 'Elian palma',",
    "  role: 'Web developer',",
    "  skills: ['WordPress', 'React', 'PHP', 'JavaScript'],'Shopify','Prestashop'],",
    "  experience: '5+ years',",
    "  projects: 60+,",
    "  focus: 'Building digital experiences',",
    "  passion: 'Clean code & innovation'",
    "};"
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-gray-100 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center scroll-animate">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-blue-400">&lt;</span>
            <span className="text-blue-400">Sobre</span> mí
            <span className="text-blue-400">/&gt;</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-6xl mx-auto">
            ¡Hola! Soy un desarrollador web especializado en la <b> creación de sitios a medida, robustos y de alto rendimiento</b> utilizando tecnologías modernas. Mi experiencia abarca desde la planificación y arquitectura hasta la implementación completa, asegurando soluciones escalables y seguras para una presencia online efectiva. Complemento mi expertise con principios de diseño <b>UX/UI para crear interfaces intuitivas y visualmente atractivas, y ofrezco consultoría SEO para optimizar la visibilidad</b>y el alcance de tu sitio web. ¡Conversemos sobre tus proyectos de desarrollo web!
          </p>
        </div>

        <div className="relative w-full h-96 mb-16 scroll-animate">
          {codeLines.map((line, index) => (
            <div 
              key={index}
              className="absolute font-mono text-sm md:text-base lg:text-lg w-full text-center"
              style={{
                transform: calculateTransform(index),
                transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                opacity: isVisible ? 1 : 0,
                color: index === 0 || index === codeLines.length - 1 ? '#60A5FA' : '#E5E7EB',
                textShadow: '0 0 15px rgba(96, 165, 250, 0.7)',
                top: `${20 + index * 8}%`
              }}
            >
              <span className="inline-block px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700">
                {line}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 scroll-animate hover:border-blue-400 transition-all duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Experiencia</h3>
            <p className="text-gray-300">Más de 60 proyectos exitosos entregados</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 scroll-animate hover:border-blue-400 transition-all duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Tecnologías</h3>
            <p className="text-gray-300">Más de 30 tecnologías dominadas</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 scroll-animate hover:border-blue-400 transition-all duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Enfoque</h3>
            <p className="text-gray-300">Resultados, calidad y la experiencia del usuario</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;