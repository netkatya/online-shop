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
      pageClassName="flex items-center justify-center w-10 h-10 rounded-xl
               "
      activeClassName="!bg-red-500 !border-red-500 shadow-lg"
      renderOnZeroPageCount={null}
    />
  );
}
