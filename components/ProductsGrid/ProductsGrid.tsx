"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import { Product } from "@/types/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductsGridInt {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridInt) {
  // We only get the necessary methods and state from the store
  const addToFavorites = useShopStore((state) => state.addToFavorites);
  const removeFromFavorites = useShopStore(
    (state) => state.removeFromFavorites
  );
  const isFavorite = useShopStore((state) => state.isFavorite);

  const addToCart = useShopStore((state) => state.addToCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const isInCart = useShopStore((state) => state.isInCart);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-70 object-cover"
            height="80"
            width="192"
          ></Image>
          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-gray-800 h-[40px]">
              {product.name}
            </h2>
            <p className="text-red-500 font-bold mt-2">£{product.price}</p>

            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
            {/* <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {product.category}
            </p> */}
            <div className="mt-2 flex items-center justify-between">
              <Link
                href={`/products/${product._id}`}
                className=" inline-block text-red-500 hover:underline"
              >
                View Details
              </Link>

              <div className="flex items-center gap-2">
                {/* ❤️ Favorites */}
                <button
                  className="flex justify-center items-center h-[30px] w-[60px] rounded-lg 
               border border-red-400 bg-gradient-to-b from-white to-red-50 
               shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
               active:scale-95 transition-all duration-200"
                  // onClick={() => console.log("Add to favorites:", product._id)}
                  onClick={() =>
                    isFavorite(product._id)
                      ? removeFromFavorites(product._id)
                      : addToFavorites(product)
                  }
                  aria-label={
                    isFavorite(product._id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {/* <Heart 
                  className="w-5 h-5 text-red-500" /> */}
                  <Heart
                    size={22}
                    className={`transition ${
                      isFavorite(product._id)
                        ? "fill-pink-500 text-pink-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                {/* 🛒 Cart */}
                <button
                  className="flex justify-center items-center h-[30px] w-[60px] rounded-lg 
               border border-red-400 bg-gradient-to-b from-white to-red-50 
               shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
               active:scale-95 transition-all duration-200"
                  // onClick={() => console.log("Add to cart:", product._id)}
                  onClick={() =>
                    isInCart(product._id)
                      ? removeFromCart(product._id)
                      : addToCart(product)
                  }
                  aria-label={
                    isInCart(product._id) ? "Remove from cart" : "Add to cart"
                  }
                >
                  {/* <ShoppingCart className="w-5 h-5 text-gray-800" /> */}
                  <ShoppingCart
                    size={22}
                    className={`transition ${
                      isInCart(product._id)
                        ? "fill-green-500 text-green-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
