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
      containerClassName="flex justify-center items-center gap-2 mt-10 select-none"
      activeClassName="!bg-red-500 !text-white !border-red-500 shadow-lg"
      nextLabel="→"
      previousLabel="←"
    />
  );
}
