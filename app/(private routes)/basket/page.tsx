import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  // temporary
  const cartItems = [
    {
      id: 1,
      name: "Twist Ceramic Vase",
      price: 45,
      image: "/img/Twist Ceramic Vase.webp",
      quantity: 1,
    },
    {
      id: 2,
      name: "Large Multi Wick Candle",
      price: 40,
      image: "/img/Large Multi Wick Candle.webp",
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#f3f3f3] to-[#e5e5e5] py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Shopping Cart
        </h1>

        {/* if ampty */}
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Your cart is empty.</p>
            <Link
              href="/products"
              className="inline-block mt-4 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white rounded-xl shadow p-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-gray-500">£{item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      className="w-16 text-center border border-gray-300 rounded-md"
                    />
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between font-semibold text-gray-900 text-lg">
                <span>Total</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
