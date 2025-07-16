import React, { useState, useEffect, useRef } from 'react'; // Asegúrate de importar useRef
// import useScrollAnimation from '../hooks/useScrollAnimation'; // No lo usaremos directamente aquí para este efecto

const AboutSection = () => {
  // useScrollAnimation(); // Deshabilitamos este hook si vamos a implementar la lógica de scroll aquí

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isSectionVisible, setIsSectionVisible] = useState(false); // Renombrado para claridad
  
  // Nuevo estado para controlar la animación de entrada de los elementos
  const [animateIn, setAnimateIn] = useState(false);

  // Refs para observar los elementos principales para la animación de entrada
  const sectionRef = useRef(null); // Ref para toda la sección About
  const headerRef = useRef(null); // Ref para el encabezado
  const codeBlockContainerRef = useRef(null); // Ref para el contenedor del bloque de código
  const statsContainerRef = useRef(null); // Ref para el contenedor de las estadísticas (Experiencia, Tecnologías, Enfoque)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Observador para la visibilidad general de la sección para el efecto del mouse
    const mainObserver = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 } // Se considera visible si el 10% está en pantalla
    );

    // Si la sección principal tiene una ref, la observamos
    if (sectionRef.current) {
        mainObserver.observe(sectionRef.current);
    }
    
    // Observadores para la animación de entrada de los sub-elementos
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Activamos la animación cuando el 10% del elemento sea visible
    };

    const headerContentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setAnimateIn(true); // Una vez que cualquier parte importante es visible, animamos todo
                headerContentObserver.unobserve(entry.target); // Detener observación si solo se anima una vez
            }
        });
    }, observerOptions);

    // Adjuntar observadores a los elementos que queremos animar al aparecer
    if (headerRef.current) headerContentObserver.observe(headerRef.current);
    // Podemos optar por que todos los elementos se animen cuando el header o el primer elemento es visible
    // Esto es una simplificación para no tener un observer por cada elemento.
    // Si quisieras animaciones individuales, necesitarías más observers y estados.

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (sectionRef.current) mainObserver.unobserve(sectionRef.current);
      if (headerRef.current) headerContentObserver.unobserve(headerRef.current);
      mainObserver.disconnect(); // Desconectar para limpiar recursos
      headerContentObserver.disconnect(); // Desconectar para limpiar recursos
    };
  }, []); // Se ejecuta solo una vez al montar

  const calculateTransform = (index) => {
    // Si la sección no está visible o la animación de entrada no se ha activado, comienza desde una posición inicial
    if (!isSectionVisible || !animateIn) return 'translateY(50px) scale(0.9)'; 
    
    // Si está visible y animada, aplica el efecto de mouse
    const x = (mousePosition.x / window.innerWidth - 0.5) * 40;
    const y = (mousePosition.y / window.innerHeight - 0.5) * -40;
    return `rotateX(${y}deg) rotateY(${x}deg) translateZ(${index * 10}px)`;
  };

  const codeLines = [
    "const developer = {",
    "  name: 'Elian palma',",
    "  role: 'Web developer',",
    "  skills: ['WordPress', 'React', 'PHP', 'JavaScript','Shopify','Prestashop'],",
    "  experience: '5+ years',",
    "  projects: 60+,",
    "  focus: 'Building digital experiences',",
    "  passion: 'Clean code & innovation'",
    "};"
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 text-gray-100 relative overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Encabezado de la sección */}
        <div 
          ref={headerRef} // Adjunta la ref al contenedor del texto
          className={`text-center transition-all duration-700 ease-out 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-blue-400">&lt;</span>
            <span className="text-blue-400">Sobre</span> mí
            <span className="text-blue-400">/&gt;</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-6xl mx-auto">
            ¡Hola! Soy un desarrollador web especializado en la <b> creación de sitios a medida, robustos y de alto rendimiento</b> utilizando tecnologías modernas. Mi experiencia abarca desde la planificación y arquitectura hasta la implementación completa, asegurando soluciones escalables y seguras para una presencia online efectiva. Complemento mi expertise con principios de diseño <b>UX/UI para crear interfaces intuitivas y visualmente atractivas, y ofrezco consultoría SEO para optimizar la visibilidad</b>y el alcance de tu sitio web. ¡Conversemos sobre tus proyectos de desarrollo web!
          </p>
        </div>

        {/* Bloque de código con efecto de mouse */}
        <div 
          ref={codeBlockContainerRef} // Adjunta la ref al contenedor
          className={`relative w-full h-96 mb-16 transition-all duration-700 ease-out delay-200 
                      ${animateIn ? 'opacity-100' : 'opacity-0'}`}
          // Estilos 3D para el contenedor, si es necesario para el efecto de perspectiva
          style={{ perspective: isSectionVisible && animateIn ? '1000px' : 'none' }}
        >
          {codeLines.map((line, index) => (
            <div 
              key={index}
              className="absolute font-mono text-sm md:text-base lg:text-lg w-full text-center"
              style={{
                transform: calculateTransform(index), // Aplica la transformación
                transition: 'transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.7s ease-out', // Transición para transform y opacity
                opacity: isSectionVisible && animateIn ? 1 : 0, // Opacidad controlada por ambos estados
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

        {/* Sección de estadísticas (tarjetas) */}
        <div 
          ref={statsContainerRef} // Adjunta la ref al contenedor
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 
                      transition-all duration-700 ease-out delay-300
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Experiencia</h3>
            <p className="text-gray-300">Más de 60 proyectos exitosos entregados</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-500">
            <h3 className="text-xl font-bold text-blue-400 mb-3">Tecnologías</h3>
            <p className="text-gray-300">Más de 30 tecnologías dominadas</p>
            <div className="mt-4 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-500">
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