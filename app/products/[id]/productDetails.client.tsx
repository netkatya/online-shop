"use client";

import Loader from "@/app/loading";
import { fetchProductById } from "@/lib/api/serverApi";
import { useShopStore } from "@/lib/api/store/useShopStore";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
// import { useState } from "react";

interface ProductDetailsClientProps {
  productId: string;
}

export default function ProductDetailsClient({
  productId,
}: ProductDetailsClientProps) {
  return <ProductContent productId={productId} />;
}

function ProductContent({ productId }: { productId: string }) {
  // const [quantity, setQuantity] = useState(1);

  const addToCart = useShopStore((state) => state.addToCart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const cart = useShopStore((state) => state.cart);

  const addToFavorites = useShopStore((state) => state.addToFavorites);
  const removeFromFavorites = useShopStore(
    (state) => state.removeFromFavorites
  );
  const favorites = useShopStore((state) => state.favorites);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error || !product)
    return (
      <p className="text-red-500 text-center mt-8">Something went wrong.</p>
    );

  const inCart = cart.some((item) => item._id === product._id);
  const inFav = favorites.some((item) => item._id === product._id);

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4 py-10 md:p-[80px]">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-6  flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              {product.name}
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <p className="text-3xl sm:text-4xl md:text-6xl font-bold">
                £{product.price}
              </p>
            </div>

            {/* <div className="mb-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div> */}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Кнопка корзины */}
            <button
              className="w-full sm:w-[250px] px-3 py-3 bg-red-500 text-white  rounded-lg 
                flex items-center justify-center gap-2 transition-colors hover:bg-red-400"
              onClick={() =>
                inCart ? removeFromCart(product._id) : addToCart({ ...product })
              }
            >
              <ShoppingCart
                className={`w-5 h-5 ${inCart ? "fill-green-500 text-green-500" : "text-white"}`}
              />
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>

            {/* Кнопка избранного */}
            <button
              className="w-full sm:w-[250px] px-3 py-3 border border-gray-300 text-gray-700 rounded-lg 
                flex items-center justify-center gap-2 transition-colors hover:bg-gray-100"
              onClick={() =>
                inFav
                  ? removeFromFavorites(product._id)
                  : addToFavorites(product)
              }
            >
              <Heart
                className={`w-5 h-5 ${inFav ? "fill-red-500 text-red-500" : "text-red-500"}`}
              />
              {inFav ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
