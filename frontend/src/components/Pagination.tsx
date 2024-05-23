import { PaginationProps } from "../tying";

function Pagination({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center ">
      <ul className="flex border border-slate-3000">
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`px-2 py-1 ${
              currentPage === page ? "bg-gray-200 " : ""
            }`}
          >
            <button onClick={() => handlePageChange(page)} className="p-2">
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
