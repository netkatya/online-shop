import ReactPaginate from "react-paginate";
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={(data) => setCurrentPage(data.selected + 1)}
      forcePage={currentPage - 1}
      nextLabel="→"
      previousLabel="←"
      containerClassName="flex justify-center items-center gap-3 mt-10 select-none"
      pageClassName="flex items-center justify-center w-10 h-10 rounded-xl border border-gray-300 
                     bg-gradient-to-b from-white to-gray-50 shadow-md text-gray-700 font-medium 
                     hover:shadow-lg hover:from-gray-50 hover:to-white 
                     transition-all duration-200 cursor-pointer active:scale-95"
      activeClassName="!bg-red-500 !border-red-500 shadow-lg"
      renderOnZeroPageCount={null}
    />
  );
}
