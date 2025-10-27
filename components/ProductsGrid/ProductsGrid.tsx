import { Product } from "@/types/products";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductsGridInt {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridInt) {
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
            className="w-full h-76 object-cover"
            height="80"
            width="192"
          ></Image>
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {product.name}
            </h2>
            <p className="text-red-500 font-bold mt-2">${product.price}</p>
            <p className="text-gray-600 text-sm mt-1">{product.category}</p>
            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between">
              <Link
                href={`/products/${product._id}`}
                className="mt-3 inline-block text-red-500 hover:underline"
              >
                View Details
              </Link>

              <div className="flex items-center gap-2">
                <button
                  size="icon"
                  variant="ghost"
                  className="flex justify-center items-center border border-red-500 h-[30px] w-[50px] rounded-md hover:bg-gray-100"
                  onClick={() => console.log("Add to favorites:", product._id)}
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>

                <button
                  size="icon"
                  variant="ghost"
                  className="flex justify-center items-center border border-red-500 h-[30px] w-[50px] rounded-md hover:bg-gray-100"
                  onClick={() => console.log("Add to cart:", product._id)}
                >
                  <ShoppingCart className="w-5 h-5 text-gray-800" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
