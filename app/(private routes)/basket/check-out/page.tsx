"use client";

import { useState } from "react";
import Link from "next/link";
import { useShopStore } from "@/lib/api/store/useShopStore";
import { createOrderNext } from "@/lib/api/orders";

export default function Checkout() {
  const [success, setSuccess] = useState(false);
  const cartItems = useShopStore((state) => state.cartItems);
  const clearCart = useShopStore((state) => state.clearCart);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1️⃣ Calculate total price
      const totalPrice = cartItems.reduce(
        (sum: number, item: { price: number; quantity: number }) =>
          sum + item.price * item.quantity,
        0
      );

      // 2️⃣ Send order to backend
      const newOrder = await createOrderNext(cartItems, totalPrice);
      console.log("Order created:", newOrder);

      // 3️⃣ Clear cart
      clearCart();

      // 4️⃣ Show success message
      setSuccess(true);
    } catch (error: any) {
      console.error("Error creating order:", error.response?.data || error);
      alert("Error creating order. Please try again.");
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-2xl rounded-3xl p-20 max-w-2xl w-full text-center">
          <h1 className="text-4xl font-extrabold text-red-700 mb-8">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Thank you for your purchase!
          </p>
          <Link
            href="/account/profile"
            className="px-8 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
          >
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handlePayment}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-4xl"
      >
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4 text-center md:text-left">
          Checkout
        </h1>

        {/* Payment fields */}
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
        />

        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
        />

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              MM/YY
            </label>
            <input
              type="text"
              placeholder="12/25"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition mt-4"
        >
          Pay
        </button>
      </form>
    </div>
  );
}
