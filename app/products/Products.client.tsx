"use client";
import { useState } from "react";
import { fetchProductsClient } from "@/lib/api/clientApi";
import Pagination from "@/components/Pagination/Pagination";
import ProductsGrid from "@/components/ProductsGrid/ProductsGrid";
import Sorting from "@/components/Sorting/Sorting";
import Categories from "@/components/Categories/Categories";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
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
    queryKey: [
      "products",
      debouncedSearchedQuery,
      currentPage,
      perPage,
      selectedCategory,
    ],
    queryFn: () =>
      fetchProductsClient(
        debouncedSearchedQuery,
        currentPage,
        perPage,
        selectedCategory
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  // Локальная сортировка по цене или имени
  const sortedProducts = [...(data?.data ?? [])].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  const totalPages = data?.totalPages || 0;

  const handleChange = (value: string) => {
    setCurrentPage(1);
    setSearch(value);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
        {/* Поиск */}
        <SearchBox value={search} onChange={handleChange} />
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
        <p className="text-center text-gray-500 mt-10">
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
