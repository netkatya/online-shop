"use client";
import { useState } from "react";
import { fetchProductsClient } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import Sorting from "@/components/Sorting/Sorting";
import Categories from "@/components/Categories/Categories";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
// import SearchBox from "@/components/SearchBox/SearchBox";
export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc" | "name">(
    "name"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearchedQuery] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "products",
      debouncedSearchedQuery,
      currentPage,
      selectedCategory,
      sortBy,
    ],
    queryFn: () =>
      fetchProductsClient(
        debouncedSearchedQuery,
        currentPage,
        selectedCategory,
        sortBy
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const products = data?.data ?? [];

  const totalPages = data?.totalPages || 0;

  // const handleChange = (value: string) => {
  //   setCurrentPage(1);
  //   setSearch(value);
  // };
  const handleChangeCategory = (category: string) => {
    setCurrentPage(1);
    setSelectedCategory(category);
  };
  const handleChangeSorting = (sortBy: "priceAsc" | "priceDesc" | "name") => {
    setCurrentPage(1);
    setSortBy(sortBy);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        {/* Поиск
        <SearchBox value={search} onChange={handleChange} /> */}
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={handleChangeCategory}
        />
        <Sorting setSortBy={handleChangeSorting} sortBy={sortBy} />
      </div>
      {isError && (
        <p className="text-center text-gray-500 mt-10">
          Something went wrong...
        </p>
      )}
      {isLoading ? (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      ) : (
        <ProductsGrid products={products} />
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
