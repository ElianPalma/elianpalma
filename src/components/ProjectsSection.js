import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import projects from '../mock/projects';

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [animateIn, setAnimateIn] = useState(false);

  const projectsPerPage = 6;
  const categories = ['Todos', 'Wordpress', 'Shopify', 'Webflow', 'Prestashop'];

  const headerRef = useRef(null);
  const projectGridRef = useRef(null);
  const paginationRef = useRef(null);

  // Lógica de filtrado: busca la categoría dentro de los tags de cada proyecto
  const filteredProjects = activeFilter === 'Todos'
    ? projects
    : projects.filter(project =>
        project.tags.some(tag => tag.toLowerCase().includes(activeFilter.toLowerCase()))
      );

  // Cálculo de paginación basado en la lista filtrada
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Función para cambiar de filtro y resetear a la página 1
  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setAnimateIn(true);
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);

    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
    };
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        
        {/* Encabezado */}
        <div 
          ref={headerRef}
          className={`text-center mb-10 transition-all duration-700 ease-out 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-blue-400">Mis</span> Proyectos 
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Desarrollo <b>landing pages, sitios web, e-commerce y academias online</b>.
          </p>
        </div>

        {/* --- FILTROS PROFESIONALES --- */}
        <div 
          className={`flex flex-wrap justify-center gap-3 mb-12 transition-all duration-700 delay-100
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleFilterChange(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border ${
                activeFilter === cat
                  ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] scale-105'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:border-blue-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cuadrícula de proyectos */}
        <div 
          ref={projectGridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 
                      transition-all duration-700 ease-out delay-200 
                      ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {currentProjects.map((project, index) => (
            <div 
              key={project.id} 
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="transition-all duration-500 ease-out"
              style={{ transitionDelay: animateIn ? `${index * 50}ms` : '0ms' }}
            >
              <ProjectCard 
                project={project} 
                isHovered={hoveredProject === project.id}
              />
            </div>
          ))}
        </div>

        {/* Mensaje de no resultados */}
        {filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 py-10">No se encontraron proyectos en esta categoría.</p>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div 
            ref={paginationRef}
            className={`transition-all duration-700 ease-out delay-300 
                        ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
