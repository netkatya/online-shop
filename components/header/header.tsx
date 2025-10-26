import { HouseHeart, ShoppingBasket } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#e5e5e5] text-gray-900 shadow-md h-[60px] border-b-2 border-red-500 p-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <HouseHeart className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">Cozy Corner</span>
        </Link>

        <nav className="space-x-6">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-700">
            Products
          </Link>
          <Link href="/location" className="hover:text-gray-700">
            Location
          </Link>
        </nav>

        <ul className="flex space-x-2">
          <li>
            <Link
              href="/auth/log-in"
              className="border border-gray-300 px-[15px] py-[5px] rounded-md hover:text-gray-700 bg-gray-300 hover:bg-gray-400"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              href="/auth/sign-up"
              className="border border-gray-300 px-[15px] py-[5px] rounded-md hover:text-gray-700 bg-gray-300 hover:bg-gray-400"
            >
              Sign Up
            </Link>
          </li>
        </ul>

        <div>
          <Link
            href="/basket"
            className="bg-gray-300 hover:bg-gray-400 w-[40px] px-2 py-2 rounded-md flex items-center"
          >
            <ShoppingBasket className="w-6 h-6 text-red-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}
