import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;
  
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages && endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(renderPageNumber(1));
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className="px-3 py-1">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(renderPageNumber(i));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-3 py-1">...</span>);
      }
      pages.push(renderPageNumber(totalPages));
    }

    return pages;
  };

  const renderPageNumber = (number) => (
    <button
      key={number}
      onClick={() => onPageChange(number)}
      className={`px-4 py-2 rounded-lg transition-all ${
        currentPage === number 
          ? 'bg-blue-600 text-white shadow-md' 
          : 'bg-white hover:bg-gray-100 text-gray-700'
      }`}
    >
      {number}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        « Anterior
      </button>
      
      {getPageNumbers()}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Siguiente »
      </button>
    </div>
  );
};

export default Pagination;