"use client";

import { useState } from "react";
import { HouseHeart, ShoppingBasket, User, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[#e5e5e5] text-gray-900 border-b-2 border-red-500 sticky top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <HouseHeart className="w-8 h-8 text-red-500" />
          <span className="text-xl font-bold">Cozy Corner</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-bold hover:text-gray-400">
            Home
          </Link>
          <Link href="/products" className="font-bold hover:text-gray-400">
            Products
          </Link>
          <Link href="/#promotions" className="font-bold hover:text-gray-400">
            Promotions
          </Link>
          <Link href="/#location" className="font-bold hover:text-gray-400">
            Location
          </Link>
        </nav>

        {/* User & Basket (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-6 h-6 text-red-500" />
            <Link href="/account" className="font-bold hover:text-gray-400">
              My Account
            </Link>
          </div>
          <Link
            href="/basket"
            className="bg-gray-300 hover:bg-gray-400 w-10 px-2 py-2 rounded-md flex items-center justify-center"
          >
            <ShoppingBasket className="w-6 h-6 text-red-500" />
          </Link>
        </div>

        {/* Burger Menu (Mobile) */}
        <button
          aria-label="open menu"
          className="md:hidden focus:outline-none z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-red-500" />
          ) : (
            <Menu className="w-6 h-6 text-red-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-[#e5e5e5] z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-4 py-8 space-y-6">
          {/* Logo in Mobile Menu */}
          <Link
            href="/"
            className="flex items-center space-x-2 mb-12"
            onClick={() => setMenuOpen(false)}
          >
            <HouseHeart className="w-8 h-8 text-red-500" />
            <span className="text-xl font-bold">Cozy Corner</span>
          </Link>
          <div className="flex flex-col gap-8 mb-12">
            {/* Mobile Links */}
            <Link
              href="/"
              className="block font-bold text-xl hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block font-bold text-xl hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/#promotions"
              className="block font-bold text-xl hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Promotions
            </Link>
            <Link
              href="/#location"
              className="block font-bold text-xl hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              Location
            </Link>
          </div>

          {/* Account & Basket */}
          <div className="flex items-center space-x-2 mb-12">
            <User className="w-6 h-6 text-red-500" />
            <Link
              href="/account"
              className="font-bold text-xl hover:text-gray-400"
              onClick={() => setMenuOpen(false)}
            >
              My Account
            </Link>
          </div>

          <Link
            href="/basket"
            className="bg-gray-300 hover:bg-gray-400 w-12 px-3 py-3 rounded-md flex items-center justify-center mt-4"
            aria-label="to basket"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingBasket className="w-6 h-6 text-red-500" />
          </Link>
        </div>
      </div>
    </header>
  );
}
