const Pagination = ({
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  prevPage,
  goToFirstPage,
  goToLastPage,
  hasNextPage,
  hasPrevPage,
  startIndex,
  endIndex,
  totalItems,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-6 pb-6">
      <p className="text-gray-400 text-sm">
        Showing {startIndex} to {endIndex} of {totalItems} countries
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={goToFirstPage}
          disabled={!hasPrevPage}
          className="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="First page"
        >
          «
        </button>

        <button
          onClick={prevPage}
          disabled={!hasPrevPage}
          className="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Previous page"
        >
          ‹
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded transition-colors ${
                currentPage === page
                  ? "bg-gray-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={nextPage}
          disabled={!hasNextPage}
          className="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Next page"
        >
          ›
        </button>

        <button
          onClick={goToLastPage}
          disabled={!hasNextPage}
          className="px-3 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Last page"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;