//app/(private route)/basket/page.tsx

"use client";

import { useShopStore } from "@/lib/api/store/useShopStore";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, Plus, Minus, ArrowRight } from "lucide-react";

export default function CartPage() {
  const cart = useShopStore((state) => state.cart);
  const removeFromCart = useShopStore((state) => state.removeFromCart);
  const updateCartQuantity = useShopStore((state) => state.updateCartQuantity);
  const clearCart = useShopStore((state) => state.clearCart);
  const getCartTotal = useShopStore((state) => state.getCartTotal);

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartQuantity(productId, newQuantity);
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-[#f3f3f3] to-[#e5e5e5] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-3">
              <ShoppingCart className="text-green-500" size={36} />
              Your Shopping Cart
            </h1>
            {cart.length > 0 && (
              <p className="text-gray-600 mt-2">
                {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
              </p>
            )}
          </div>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
            <div className="bg-green-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="text-green-300" size={48} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Add some products to your cart and they will appear here!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
                >
                  {/* Product Image */}
                  <Link
                    href={`/products/${item._id}`}
                    className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 96px"
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-grow w-full sm:w-auto">
                    <Link
                      href={`/products/${item._id}`}
                      className="font-semibold text-gray-800 hover:text-red-500 transition line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-red-500 font-bold mt-1">
                      £{item.price.toFixed(2)}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            (item.quantity || 1) - 1
                          )
                        }
                        disabled={(item.quantity || 1) <= 1}
                        className="p-2 hover:bg-gray-200 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} className="text-gray-700" />
                      </button>

                      <input
                        type="number"
                        min="1"
                        max="99"
                        value={item.quantity || 1}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value > 0) {
                            handleQuantityChange(item._id, value);
                          }
                        }}
                        className="w-12 text-center font-semibold bg-transparent border-none focus:outline-none"
                      />

                      <button
                        onClick={() =>
                          handleQuantityChange(
                            item._id,
                            (item.quantity || 1) + 1
                          )
                        }
                        className="p-2 hover:bg-gray-200 rounded-md transition"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} className="text-gray-700" />
                      </button>
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="flex items-center gap-3">
                      <p className="font-bold text-gray-800 min-w-[60px] text-right">
                        £{(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        aria-label="Remove from cart"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      £{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">£0.00</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-200" />

                <div className="flex justify-between font-bold text-gray-900 text-xl mb-6">
                  <span>Total</span>
                  <span className="text-red-500">£{total.toFixed(2)}</span>
                </div>

                <Link
                  href="/basket/check-out"
                  className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition shadow-md hover:shadow-lg font-semibold"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/products"
                  className="flex items-center justify-center gap-2 w-full mt-3 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Continue Shopping
                </Link>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>30-day money-back guarantee</span>
                  </div>
                </div>
              </div>
              {/* <button className="w-full mt-6 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition">
                Proceed to Checkout
              </button> */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
