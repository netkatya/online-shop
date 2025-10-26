import { HouseHeart, ShoppingBasket } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#e5e5e5] text-gray-900 shadow-md h-[60px] border-b-2 border-red-500">
      <div className="container mx-auto flex items-center justify-between py-2">
        <div className="flex items-center space-x-2">
          <HouseHeart className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">Cozy Corner</span>
        </div>

        <nav className="space-x-6">
          <a href="/" className="hover:text-gray-700">
            Home
          </a>
          <a href="/products" className="hover:text-gray-700">
            Products
          </a>
          <a
            href="/auth/log-in"
            className="border border-gray-300 px-[15px] py-[5px] rounded-md hover:text-gray-700 bg-gray-300 hover:bg-gray-400"
          >
            Sign In
          </a>
          <a
            href="/auth/sign-up"
            className="border border-gray-300 px-[15px] py-[5px] rounded-md hover:text-gray-700 bg-gray-300 hover:bg-gray-400"
          >
            Sign Up
          </a>
        </nav>

        <div>
          <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md">
            <ShoppingBasket className="w-6 h-6 text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
