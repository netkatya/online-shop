"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import { Product } from "@/types/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useLayoutEffect } from "react";

interface ProductsGridInt {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridInt) {
  const [isHydrated, setIsHydrated] = useState(false);

  // Store methods
  const addToFavorites = useShopStore((state) => state.addToFavorites);
  const removeFromFavorites = useShopStore(
    (state) => state.removeFromFavorites
  );
  const addToCart = useShopStore((state) => state.addToCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  
  // Get the entire favorites and cart arrays to trigger re-renders
  const favorites = useShopStore((state) => state.favorites);
  const cart = useShopStore((state) => state.cart);

  const router = useRouter();

  // Use useLayoutEffect to set hydration state before paint
  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  // Helper functions that check if product is in favorites/cart
  const isFavorite = (productId: string) => {
    return favorites.some((item) => item._id === productId);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => item._id === productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => {
        const productIsFavorite = isHydrated && isFavorite(product._id);
        const productIsInCart = isHydrated && isInCart(product._id);

        return (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {/* Clickable area */}
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/products/${product._id}`)}
            >
              <div className="w-full h-70 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-gray-800 h-[40px]">
                  {product.name}
                </h2>
                <p className="text-red-500 font-bold mt-2">£{product.price}</p>
                <p className="text-[13px] text-gray-500 mt-2">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="p-4 flex gap-4 justify-center">
              <button
                aria-label={
                  productIsFavorite
                    ? "Remove from favourites"
                    : "Add to favourites"
                }
                className="flex justify-center items-center h-[30px] w-[80px] rounded-lg 
                  border border-red-400 bg-gradient-to-b from-white to-red-50 
                  shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
                  active:scale-95 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  productIsFavorite
                    ? removeFromFavorites(product._id)
                    : addToFavorites(product);
                }}
              >
                <Heart
                  className={`w-5 h-5 transition ${
                    productIsFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-red-500"
                  }`}
                />
              </button>

              <button
                aria-label={
                  productIsInCart
                    ? "Remove from basket" 
                    : "Add to basket"
                }
                className="flex justify-center items-center h-[30px] w-[80px] rounded-lg 
                  border border-red-400 bg-gradient-to-b from-white to-red-50 
                  shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
                  active:scale-95 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  productIsInCart
                    ? removeFromCart(product._id)
                    : addToCart(product);
                }}
              >
                <ShoppingCart
                  className={`w-5 h-5 transition ${
                    productIsInCart
                      ? "fill-green-500 text-green-500"
                      : "text-gray-800"
                  }`}
                />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}