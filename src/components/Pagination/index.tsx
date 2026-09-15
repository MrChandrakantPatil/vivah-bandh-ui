import type { Paginations as PaginationType } from './types';

type PaginationProps = {
  pagination: PaginationType;
  setPage: (page: number) => void;
};

export function Pagination({ pagination, setPage }: PaginationProps) {
  const { page, totalPages, hasPreviousPage, hasNextPage } = pagination;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    setPage(newPage);
  };

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (page <= 4) {
      return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    }

    if (page >= totalPages - 3) {
      return [
        1,
        'ellipsis',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', totalPages];
  };

  return (
    <div
      className="
        flex items-center justify-center gap-1
        py-3 mt-4
        border-t border-b border-gray-200
        sm:py-4 lg:py-5 sm:mt-6 lg:mt-8
      "
    >
      <button
        type="button"
        disabled={!hasPreviousPage}
        onClick={() => handlePageChange(page - 1)}
        className="
          px-3 py-2 mr-2
          rounded-lg
          font-medium text-gray-600 text-sm
          transition-colors
          hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        ← <span className="sm:inline hidden">Previous</span>
      </button>

      {getPageNumbers().map((pageNumber, index) =>
        pageNumber === 'ellipsis' ? (
          <span
            key={`ellipsis-${index}`}
            className="
              flex items-center justify-center
              w-9 h-9
              text-gray-500 text-sm
            "
          >
            ...
          </span>
        ) : (
          <button
            key={pageNumber}
            type="button"
            onClick={() => handlePageChange(pageNumber)}
            className={`
              flex items-center justify-center
              w-9 h-9
              rounded-lg
              font-medium text-sm
              transition-colors
              ${
                page === pageNumber
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }
            `}
          >
            {pageNumber}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => handlePageChange(page + 1)}
        className="
          px-3 py-2 ml-2
          rounded-lg
          font-medium text-gray-600 text-sm
          transition-colors
          hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed
        "
      >
        <span className="sm:inline hidden">Next</span> →
      </button>
    </div>
  );
}
