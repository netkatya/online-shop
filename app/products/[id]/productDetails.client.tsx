"use client";

import Loader from "@/app/loading";
import { fetchProductById } from "@/lib/api/serverApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

interface ProductDetailsClientProps {
  productId: string;
}

export default function ProductDetailsClient({
  productId,
}: ProductDetailsClientProps) {
  return <ProductContent productId={productId} />;
}

function ProductContent({ productId }: { productId: string }) {
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

  return (
    <div className="min-h-screen flex  justify-center bg-gray-50 p-[80px]">
      <div className="h-[520px] w-full max-w-6xl bg-white shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden">
        {/* Левая часть — изображение продукта */}
        <div className="md:w-1/2 w-full h-96 md:h-auto relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Правая часть — информация о продукте */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <p className="text-6xl font-bold">£{product.price}</p>
            </div>

            <div className="mb-6">
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
                defaultValue={1}
                className="w-24 px-3 py-2 border border-black-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
              />
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex gap-4 flex-wrap">
            <button className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition">
              🛒 Add to Cart
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              ❤️ Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
