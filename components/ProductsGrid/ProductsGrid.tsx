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
        <Link
          href={`/products/${product._id}`}
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
            <div>
              {/* <Link
                href={`/products/${product._id}`}
                className=" inline-block text-red-500 hover:underline"
              >
                View Details
              </Link> */}

              <div className="flex items-center justify-center gap-4">
                <button
                  className="flex justify-center items-center h-[30px] w-[80px] rounded-lg 
               border border-red-400 bg-gradient-to-b from-white to-red-50 
               shadow-md hover:shadow-lg hover:from-red-50 hover:to-white
               active:scale-95 transition-all duration-200"
                  onClick={() => console.log("Add to favorites:", product._id)}
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>

                <button
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
          </div>
        </Link>
      ))}
    </div>
  );
}
