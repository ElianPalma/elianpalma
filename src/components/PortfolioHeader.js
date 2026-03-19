import React, { useState, useEffect } from 'react';
import { DocumentArrowDownIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';
// Importa el PDF directamente
import pdfCV from './img/Elian Palma CV 2026.pdf';

const PortfolioHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Función para abrir/cerrar modal
  const toggleModal = (e) => {
    if (e) e.preventDefault();
    setShowModal(!showModal);
  };

  return (
    <>
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
              <a href="#projects" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
                Proyectos
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#skills" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
                Habilidades
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors font-medium relative group">
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              
              {/* Botón en el header */}
              <button
                onClick={toggleModal}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-md flex items-center"
              >
                <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                Currículum
              </button>
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
              <button
                onClick={() => { toggleModal(); toggleMenu(); }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors shadow-md flex items-center justify-center"
              >
                <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                Currículum
              </button>
            </div>
          )}
        </div>
      </header>

      {/* MODAL DEL PDF - MODIFICADO PARA SER MÁS GRANDE Y TENER BOTÓN DE DESCARGA */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 bg-black/80 backdrop-blur-sm">
          {/* Contenedor del modal maximizado: w-[95vw] h-[95vh] */}
          <div className="relative w-full md:w-[95vw] h-[90vh] md:h-[95vh] bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col transition-all duration-300">
            {/* Barra superior del modal */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
              <h3 className="text-white font-medium">Currículum Vitae - Elian Palma</h3>
              
              <div className="flex items-center space-x-3">
                {/* NUEVO: Botón de Descarga */}
                <a 
                  href={pdfCV}
                  download="Elian_Palma_CV_2026.pdf" // Forzar la descarga
                  title="Descargar Currículum"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <ArrowDownTrayIcon className="w-7 h-7" />
                </a>
                
                {/* Botón Cerrar */}
                <button 
                  onClick={toggleModal}
                  title="Cerrar"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <XMarkIcon className="w-8 h-8" />
                </button>
              </div>
            </div>
            
            {/* Contenedor del PDF */}
            <div className="flex-1 w-full bg-white">
              <iframe
                src={`${pdfCV}#toolbar=0`}
                className="w-full h-full"
                title="PDF CV"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioHeader;
