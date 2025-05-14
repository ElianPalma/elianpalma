import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import Pagination from './Pagination';
import projects from '../mock/projects';

const ProjectsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsPerPage = 6;

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-animate">
          <h2 className="text-4xl font-bold text-white mb-4">
            <span className="text-blue-400">Mis</span> Proyectos 
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Desarrollo <b> landing pages, sitios web, e-commerce y academias online</b>, creando <b>aplicaciones web con funcionalidades complejas y automatizaciones escalables </b>mediante la conexión de diversas plataformas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProjects.map((project) => (
            <div 
              key={project.id} 
              className="scroll-animate"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ProjectCard 
                project={project} 
                isHovered={hoveredProject === project.id}
              />
            </div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </section>
  );
};

export default ProjectsSection;

// DONE