"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/products";
import {
  fetchProductsClient,
  FetchProductsResponse,
  getCategoriesClient,
} from "@/lib/api/clientApi";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"priceAsc" | "priceDesc" | "name">(
    "name"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const perPage = 8;

  const loadProducts = async () => {
    setLoading(true);
    try {
      const res: FetchProductsResponse = await fetchProductsClient(
        search,
        currentPage,
        perPage,
        selectedCategory
      );
      setProducts(res.products);
      setTotalPages(res.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    const cats = await getCategoriesClient();
    setCategories(["all", ...cats]);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // сброс страницы при смене фильтра или поиска
    loadProducts();
  }, [selectedCategory, search]);

  useEffect(() => {
    loadProducts();
  }, [currentPage]);

  // Локальная сортировка по цене или имени
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <section className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Products
        </h1>

        {/* Фильтры и поиск */}
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
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Сортировка */}
          <div>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "name" | "priceAsc" | "priceDesc")
              }
              className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="name">Sort by Price</option>
              <option value="priceAsc">Price: Low to High</option>
              <option value="priceDesc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Сетка товаров */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-red-500 font-bold mt-2">
                    ${product.price}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {product.category}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.id}`}
                    className="mt-3 inline-block text-red-500 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Пагинация */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-md border ${
                currentPage === page
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-800 border-gray-300"
              } hover:bg-red-500 hover:text-white transition`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
