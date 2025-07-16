import React, { useState, useEffect, useRef } from 'react'; // Importa useState, useEffect, y useRef

const skills = [
  { name: 'WordPress', level: 100 },
  { name: 'Woocommerce', level: 100 },
  { name: 'Elementor', level: 95 },
  { name: 'Divi', level: 95 },
  { name: 'WP-Bakery', level: 85 },
  { name: 'LearnDash', level: 90 },
  { name: 'Yoast SEO', level: 95 },
  { name: 'Shopify', level: 95 },
  { name: 'Prestashop', level: 85 },
  { name: 'Webflow', level: 90 },
  { name: 'Magento', level: 80 },
  { name: 'Drupal', level: 80 },
  { name: 'HTML5', level: 100 },
  { name: 'CSS3', level: 95 },
  { name: 'JavaScript', level: 90 },
  { name: 'ECMAScript', level: 90 },
  { name: 'PHP 8.1', level: 88 },
  { name: 'MySQL', level: 85 },
  { name: 'Bootstrap', level: 92 },
  { name: 'React.js', level: 80 },
  { name: 'Angular.js', level: 75 },
  { name: 'Vue.js', level: 85 },
  { name: 'Three.js', level: 70 },
  { name: 'Laravel', level: 70 },
  { name: 'Liferay', level: 79 },
  { name: 'Adobe Photoshop', level: 50 },
  { name: 'Adobe Illustrator', level: 50 },
  { name: 'Figma', level: 88 },
  { name: 'Google ADS', level: 75 },
  { name: 'Google Analytics', level: 82 },
  { name: 'Git', level: 90 },
  { name: 'Google Tag Manager', level: 78 },
  { name: 'SEO orgánico', level: 88 },
  { name: 'Gestión de Hosting', level: 85 },
  { name: 'Gestión de dominio', level: 90 }
];

const SkillsSection = () => {
  // Estado para controlar la animación de entrada de la sección y las tarjetas
  const [animateIn, setAnimateIn] = useState(false);

  // Refs para observar los elementos principales
  const headerRef = useRef(null); // Para el título y la descripción
  const skillsGridRef = useRef(null); // Para el contenedor de la cuadrícula de habilidades

  // useEffect para el IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // El viewport es el elemento raíz
      rootMargin: '0px',
      threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    };

    // Crear un observador para el encabezado de la sección o la cuadrícula
    const mainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateIn(true); // Activa la animación general de la sección y las tarjetas
          mainObserver.unobserve(entry.target); // Dejar de observar una vez que se hizo visible
        }
      });
    }, observerOptions);

    // Adjuntar observador a los elementos. Podemos observar el encabezado o la cuadrícula,
    // dependiendo de qué elemento definirá el inicio de la animación de la sección.
    // Observar el header para que la animación empiece cuando se vea el título.
    if (headerRef.current) mainObserver.observe(headerRef.current);
    // Si quieres que empiece cuando la cuadrícula es visible, puedes observar skillsGridRef.current

    // Función de limpieza para desconectar el observador
    return () => {
      if (headerRef.current) mainObserver.unobserve(headerRef.current);
      mainObserver.disconnect();
    };
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Encabezado de la sección de habilidades */}
        <div 
          ref={headerRef} // Adjunta la ref
          className={`text-center mb-16 transition-all duration-700 ease-out 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mis <span className="text-blue-600">Habilidades</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino y disfruto utilizando.
          </p>
        </div>

        {/* Contenedor de la cuadrícula de habilidades */}
        <div 
          ref={skillsGridRef} // Adjunta la ref, aunque el observador principal ya está en headerRef
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto
                      transition-all duration-700 ease-out delay-200 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow"
              // Clases de animación para cada tarjeta de habilidad
              // Usamos `transform` para el efecto de "flip" y `opacity` para el "fade-in"
              style={{
                transform: animateIn ? 'rotateX(0deg) translateY(0px)' : 'rotateX(-90deg) translateY(50px)',
                opacity: animateIn ? 1 : 0,
                transition: 'transform 0.6s ease-out, opacity 0.6s ease-out', // Transición para ambas propiedades
                transitionDelay: animateIn ? `${index * 80}ms` : '0ms', // Retraso escalonado
                transformOrigin: 'top center' // Asegura que el "flip" ocurra desde arriba
              }}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className="text-blue-600 font-medium">{skill.level}%</span>
              </div>
              {/* Aquí mantenemos la barra de progreso estática, sin animación por scroll */}
              <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  style={{ width: `${skill.level}%` }} // La barra ya está en su lugar
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;