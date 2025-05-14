import React from 'react';

const ProjectCard = ({ project, isHovered }) => {
  return (
    <div className={`relative group overflow-hidden rounded-2xl shadow-xl transition-all duration-500 transform ${isHovered ? '-translate-y-2' : ''}`}>
      <div
        className="relative overflow-hidden overflow-y-auto h-64"
        style={{
          scrollbarColor: '#387df4 transparent', // Color del pulgar y la pista (Firefox)
          '&::-webkit-scrollbar': {
            width: '8px', // Ancho de la barra de scroll (WebKit)
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#387df4', // Color del pulgar (WebKit)
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent', // Color de la pista (WebKit)
          },
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-auto transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-105'}`}
          loading="lazy"
          style={{ maxHeight: 'inherit' }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 flex items-end p-6`}>
          <div className={`transform ${isHovered ? 'translate-y-0' : 'translate-y-4'} transition-transform duration-500`}>
            <h3 className="text-white text-2xl font-bold">{project.title}</h3>
            <p className="text-gray-200 mt-2">{project.description}</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-gray-800/50 backdrop-blur-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-medium rounded-full hover:bg-blue-800 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex space-x-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-center rounded-lg transition-all duration-300 shadow hover:shadow-md"
            data-cursor-hover="link"
          >
            Demostración
          </a>
            {/*<a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-200 text-center rounded-lg transition-all duration-300 shadow hover:shadow-md" data-cursor-hover="link" > Code</a>*/}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;