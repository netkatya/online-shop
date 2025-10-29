"use client";

import { resetPassword } from "@/lib/api/clientApi";
import { ApiError } from "@/types/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const token = searchParams.get("token");

    if (!token) {
      setError("Token not found. Please,use link from email.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password needs to be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const res = await resetPassword({ token, password });

      if (res) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Password changed successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          You can now log in to your account with your new password. Redirecting
          to the login page...
        </p>
        <Link
          href="/sign-in"
          className="w-full inline-block bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Go to sign in page
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Write new password
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            New password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Repeat password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="••••••••"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p className="text-center p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition disabled:bg-red-300"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Reset password"}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-linear-to-r from-[#f3f3f3] to-[#e5e5e5] p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md mx-4">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}
