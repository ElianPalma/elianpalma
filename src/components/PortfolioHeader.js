import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/solid'; // Importa el nuevo icono


const PortfolioHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-lg backdrop-blur-md py-3'
          : 'bg-gradient-to-br from-gray-800/80 to-gray-700/80 py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-400 transition-all duration-300 hover:text-blue-300 tracking-wider">
            <span className="text-white">Elian</span>Palma
          </h1>
          <nav className="hidden md:flex space-x-6 items-center">
            <a
              href="#projects"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group"
            >
              Proyectos
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#skills"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group"
            >
              Habilidades
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group"
            >
              Contacto
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a
              href="https://eliancv.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-md flex items-center"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" /> {/* Nuevo icono aquí */}
              Currículum
            </a>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg className={`w-6 h-6 text-gray-300 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-md rounded-md py-4 px-6">
            <a href="#projects" className="block text-gray-300 hover:text-blue-400 transition-colors font-medium">Proyectos</a>
            <a href="#skills" className="block text-gray-300 hover:text-blue-400 transition-colors font-medium">Habilidades</a>
            <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors font-medium">Contacto</a>
            <a
              href="https://eliancv.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors text-center shadow-md flex items-center justify-center"
            >
              <DocumentArrowDownIcon className="w-5 h-5 mr-2" /> {/* Nuevo icono aquí */}
              Currículum
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default PortfolioHeader;