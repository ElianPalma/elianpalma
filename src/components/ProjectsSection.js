import React, { useState, useEffect, useRef } from 'react'; // Asegúrate de importar useEffect y useRef
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import projects from '../mock/projects'; // Asegúrate de que esta ruta sea correcta

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsPerPage = 6;

  // Nuevo estado para controlar la animación de entrada de la sección
  const [animateIn, setAnimateIn] = useState(false);

  // Refs para observar los elementos que queremos animar
  const headerRef = useRef(null); // Para el título y descripción
  const projectGridRef = useRef(null); // Para la cuadrícula de proyectos
  const paginationRef = useRef(null); // Para la paginación

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // useEffect para el IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null, // El viewport es el elemento raíz
      rootMargin: '0px',
      threshold: 0.1 // Activar cuando el 10% del elemento sea visible
    };

    // Crear un solo observador para múltiples elementos
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          // Podemos desconectar el observador después de que la sección principal esté visible
          // Si queremos que la animación solo ocurra una vez.
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    // Observar los elementos principales. Si el encabezado se hace visible, animamos todo.
    if (headerRef.current) observer.observe(headerRef.current);
    // Opcional: Podrías observar `projectGridRef.current` también si el encabezado
    // no siempre es el primero en entrar en el viewport.

    // Función de limpieza para desconectar el observador
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        {/* Encabezado de la sección */}
        <div 
          ref={headerRef} // Adjunta la ref
          className={`text-center mb-16 transition-all duration-700 ease-out 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-blue-400">Mis</span> Proyectos 
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Desarrollo <b> landing pages, sitios web, e-commerce y academias online</b>, creando <b>aplicaciones web con funcionalidades complejas y automatizaciones escalables </b>mediante la conexión de diversas plataformas.
          </p>
        </div>

        {/* Cuadrícula de proyectos */}
        <div 
          ref={projectGridRef} // Adjunta la ref
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 
                      transition-all duration-700 ease-out delay-200 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {currentProjects.map((project, index) => (
            // Aplicamos animaciones individuales a cada ProjectCard con un retraso escalonado
            <div 
              key={project.id} 
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              // Clases de animación para cada ProjectCard
              className={`transition-all duration-500 ease-out 
                          ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: animateIn ? `${index * 50}ms` : '0ms' }} // Retraso escalonado
            >
              <ProjectCard 
                project={project} 
                isHovered={hoveredProject === project.id}
              />
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div 
          ref={paginationRef} // Adjunta la ref
          className={`transition-all duration-700 ease-out delay-300 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;