"use client";
import { useState } from "react";
import { fetchProductsClient } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import Sorting from "@/components/Sorting/Sorting";
import Categories from "@/components/Categories/Categories";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
export default function ProductsClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc" | "name">(
    "name"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearchedQuery] = useDebounce(search, 500);
  const perPage = 8;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", debouncedSearchedQuery, currentPage, perPage],
    queryFn: () =>
      fetchProductsClient(debouncedSearchedQuery, currentPage, perPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log(data);
  // Локальная сортировка по цене или имени
  const sortedProducts = [...(data?.data ?? [])].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });
  const totalPages = data?.totalPages || 0;
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        {/* Поиск */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none w-full md:w-1/3"
        />
        {/* Выпадающий список категорий */}
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* Сортировка */}
        <Sorting setSortBy={setSortBy} sortBy={sortBy} />
      </div>
      {/* Сетка товаров */}
      {isError && (
        <p className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Something went wrong...
        </p>
      )}
      {isLoading ? (
        <p className="text-center text-gray-500 mt-10">Loading products...</p>
      ) : (
        <ProductsGrid products={sortedProducts} />
      )}
      {/* Пагинация */}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
