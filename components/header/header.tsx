"use client";
import { useAuthStore } from "@/lib/store/authStore";
import { HouseHeart, ShoppingBasket, User } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = !!user;
  const profileHref = isAuthenticated
    ? "/profile"
    : "/sign-in?redirect=/profile";

  const basketHref = isAuthenticated ? "/basket" : "/sign-in?redirect=/basket";

  return (
    <header className="bg-[#e5e5e5] text-gray-900 h-[60px] border-b-2 border-red-500 p-2 sticky top-0 left-0 z-100">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <HouseHeart className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">Cozy Corner</span>
        </Link>
        <nav className="space-x-6"></nav>

        <div className="flex items-center space-x-2">
          <User className="w-6 h-6 text-red-500" />
          <Link href={profileHref} className="font-bold hover:text-gray-400">
            My Account
          </Link>
        </div>

        <div>
          <Link
            href={basketHref}
            className="bg-gray-300 hover:bg-gray-400 w-10 px-2 py-2 rounded-md flex items-center"
          >
            <ShoppingBasket className="w-6 h-6 text-red-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}
