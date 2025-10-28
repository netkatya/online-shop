"use client";

import { Product } from "@/types/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";

import { useRouter } from "next/navigation";

interface ProductsGridInt {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridInt) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product) => (
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
              <p className="text-[14px] text-gray-500 mt-2">
                {product.description}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-4 flex gap-4 justify-center">
            <button
              aria-label="add to favourites"
              className="flex justify-center items-center h-[30px] w-[80px] rounded-lg 
              border border-red-400 bg-gradient-to-b from-white to-red-50 
              shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
              active:scale-95 transition-all duration-200"
              onClick={() => console.log("Add to favorites:", product._id)}
            >
              <Heart className="w-5 h-5 text-red-500" />
            </button>

            <button
              aria-label="add to basket"
              className="flex justify-center items-center h-[30px] w-[80px] rounded-lg 
              border border-red-400 bg-gradient-to-b from-white to-red-50 
              shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
              active:scale-95 transition-all duration-200"
              onClick={() => console.log("Add to cart:", product._id)}
            >
              <ShoppingCart className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
