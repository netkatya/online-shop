"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartFavoritesCounter() {
  const favorites = useShopStore((state) => state.favorites);
  const getCartItemsCount = useShopStore((state) => state.getCartQuantity);

  return (
    <div className="flex items-center gap-4">
      {/* Favorites */}
      <Link
        href="/favorites"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Heart className="w-6 h-6 text-gray-700" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favorites.length}
          </span>        )}
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {getCartItemsCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {getCartItemsCount()}
          </span>
        )}
      </Link>
    </div>
  );
}