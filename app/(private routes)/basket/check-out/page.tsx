"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { createOrderNext } from "@/lib/api/orders";
import { useShopStore } from "@/lib/api/store/useShopStore";
import { useRouter } from "next/navigation";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity?: number;
  image?: string;
}

export default function Checkout() {
  const router = useRouter();
  const cart = useShopStore((state) => state.cart);
  const clearCart = useShopStore((state) => state.clearCart);

  const [success, setSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [errors, setErrors] = useState<{
    fullName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
  }>({});

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // Validation
  const validateFullName = (value: string) =>
    value.trim() ? "" : "Please enter your name.";
  const validateCardNumber = (value: string) => {
    const digits = value.replace(/\s/g, "");
    if (!/^\d+$/.test(digits)) return "Card number must contain only digits.";
    if (digits.length !== 16) return "Card number must be 16 digits.";
    return "";
  };
  const validateExpiry = (value: string) => {
    if (!/^\d{2}\/\d{2}$/.test(value)) return "Expiry format must be MM/YY.";
    const [mmStr, yyStr] = value.split("/");
    const mm = Number(mmStr),
      yy = Number(yyStr);
    if (mm < 1 || mm > 12) return "Invalid month.";
    const expiryDate = new Date(2000 + yy, mm - 1, 1);
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    if (expiryDate < currentMonth) return "Card has expired.";
    return "";
  };
  const validateCvc = (value: string) =>
    /^\d{3}$/.test(value) ? "" : "CVC must be 3 digits.";

  const validateAll = () => {
    const newErrors: typeof errors = {};
    const fn = validateFullName(fullName);
    if (fn) newErrors.fullName = fn;
    const cn = validateCardNumber(cardNumber);
    if (cn) newErrors.cardNumber = cn;
    const ex = validateExpiry(expiry);
    if (ex) newErrors.expiry = ex;
    const cv = validateCvc(cvc);
    if (cv) newErrors.cvc = cv;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Input masks
  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    const grouped = digits.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(grouped);
    setErrors((prev) => ({
      ...prev,
      cardNumber: validateCardNumber(grouped) || undefined,
    }));
  };

  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    let formatted = digits;
    if (digits.length >= 3)
      formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4);
    if (formatted.length > 5) formatted = formatted.slice(0, 5);
    setExpiry(formatted);
    const err = /^\d{0,2}\/?\d{0,2}$/.test(formatted)
      ? validateExpiry(formatted)
      : "Invalid format.";
    setErrors((prev) => ({ ...prev, expiry: err || undefined }));
  };

  const handleCvcChange = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 3);
    setCvc(digits);
    setErrors((prev) => ({ ...prev, cvc: validateCvc(digits) || undefined }));
  };

  const handleNameChange = (val: string) => {
    setFullName(val);
    setErrors((prev) => ({
      ...prev,
      fullName: validateFullName(val) || undefined,
    }));
  };

  const isFormValid = useMemo(
    () =>
      !validateFullName(fullName) &&
      !validateCardNumber(cardNumber) &&
      !validateExpiry(expiry) &&
      !validateCvc(cvc),
    [fullName, cardNumber, expiry, cvc]
  );

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }
    if (!validateAll()) {
      showToast("Please fix the errors.");
      return;
    }

    try {
      const orderItems = cart.map((item) => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image,
      }));

      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      );

      await createOrderNext(orderItems, totalPrice);

      clearCart();
      setSuccess(true);
    } catch (error: any) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message || error
      );
      showToast("Please sign in to continue");
      setTimeout(() => router.push("/sign-in"), 2000);
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
            href="/profile"
            className="px-8 py-3 bg-red-700 text-white rounded-lg font-semibold hover:bg-red-800 transition"
          >
            Go to Orders
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

        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          placeholder="John Doe"
          value={fullName}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 mb-4 ${errors.fullName ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-500"}`}
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm mb-3">{errors.fullName}</p>
        )}

        <label className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => handleCardNumberChange(e.target.value)}
          required
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 mb-4 ${errors.cardNumber ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-500"}`}
        />
        {errors.cardNumber && (
          <p className="text-red-600 text-sm mb-3">{errors.cardNumber}</p>
        )}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              MM/YY
            </label>
            <input
              type="text"
              placeholder="12/25"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.expiry ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-500"}`}
            />
            {errors.expiry && (
              <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <input
              type="text"
              placeholder="123"
              value={cvc}
              onChange={(e) => handleCvcChange(e.target.value)}
              required
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.cvc ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-red-500"}`}
            />
            {errors.cvc && (
              <p className="text-red-600 text-sm mt-1">{errors.cvc}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition mt-4 ${
            isFormValid
              ? "bg-red-500 hover:bg-red-400"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Pay
        </button>

        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        )}
      </form>
    </div>
  );
}
