//app/(private route)/favorite/page.tsx

"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import { Trash2, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FavoritesPage() {
  const favorites = useShopStore((state) => state.favorites);
  const removeFromFavorites = useShopStore((state) => state.removeFromFavorites);
  const clearFavorites = useShopStore((state) => state.clearFavorites);
  const addToCart = useShopStore((state) => state.addToCart);
  const isInCart = useShopStore((state) => state.isInCart);

  const handleAddToCart = (product: any) => {
    addToCart(product);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#f3f3f3] to-[#e5e5e5] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <Heart className="text-pink-500 fill-pink-500" size={36} />
              My Favorites
            </h1>
            {favorites.length > 0 && (
              <p className="text-gray-600 mt-2">
                {favorites.length} item{favorites.length !== 1 ? "s" : ""} saved
              </p>
            )}
          </div>

          {favorites.length > 0 && (
            <button
              onClick={clearFavorites}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
            >
              Clear All Favorites
            </button>
          )}
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
            <div className="bg-pink-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Heart className="text-pink-300" size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite products here!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg"
            >
              Browse Products
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <Link 
                  href={`/products/${product._id}`}
                  className="relative aspect-square overflow-hidden group"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Remove Button Overlay */}
                  <button
                    className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-full shadow-lg hover:bg-red-50 hover:scale-110 transition-all z-10"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromFavorites(product._id);
                    }}
                    aria-label="Remove from favorites"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </Link>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 hover:text-red-500 transition">
                      {product.name}
                    </h3>
                  </Link>

                  {product.description && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-red-500 mb-4">
                      £{product.price}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/products/${product._id}`}
                        className="flex-1 text-center bg-gray-100 text-gray-700 py-2.5 rounded-lg hover:bg-gray-200 transition font-medium"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={isInCart(product._id)}
                        className={`px-4 py-2.5 rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                          isInCart(product._id)
                            ? "bg-green-50 text-green-600 cursor-not-allowed"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        <ShoppingCart size={18} />
                        {isInCart(product._id) ? "Added" : "Add"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}