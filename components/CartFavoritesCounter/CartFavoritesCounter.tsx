"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartFavoritesCounter() {
  const [mounted, setMounted] = useState(false);
  const favorites = useShopStore((state) => state.favorites);
  const cart = useShopStore((state) => state.cart);
  const totalCartItems = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  // Wait for component to mount on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not showing counts until mounted
  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/favorites"
          className="relative p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <Heart className="w-6 h-6 text-gray-700" />
        </Link>
        <Link
          href="/basket"
          className="relative p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {/* Favorites */}
      <Link
        href="/favorites"
        aria-label="Go to favourites"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Heart className="w-6 h-6 text-gray-700" />
        {favorites.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {favorites.length}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link
        href="/basket"
        aria-label="Go to cart"
        className="relative p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        {totalCartItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalCartItems}
          </span>
        )}
      </Link>
    </div>
  );
}
