"use client";
import { useState } from "react";

import { ApiError, RequestResetEmail } from "@/types/auth";
import Link from "next/link";
import { requestResetEmail } from "@/lib/api/clientApi";

export default function RequestResetEmailPage() {
  const [error, setError] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    try {
      const formValues = Object.fromEntries(formData) as RequestResetEmail;

      const res = await requestResetEmail(formValues);

      if (res) {
        setIsSubmitted(true);
        setError("");
      } else {
        setError("Invalid email");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#f3f3f3] to-[#e5e5e5] p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mx-4">
        {isSubmitted ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Mail Sent!
            </h1>
            <p className="text-gray-600 mb-6">
              Please check your email and follow the instructions to reset your
              password.
            </p>
            <Link
              href="/sign-in"
              className="w-full inline-block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
            >
              Back to log in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Write mail to send reset instructions
            </h1>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                  placeholder="you@example.com"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="text-center p-2 bg-red-100 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:bg-red-300"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send mail"}
              </button>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Remembered your password?{" "}
                <Link
                  href="/sign-in"
                  className="text-red-500 hover:underline font-medium"
                >
                  Sign In
                </Link>
              </p>
            </div>

            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                ← Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
