import { HouseHeart, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#e5e5e5] text-gray-800 border-t-2 border-red-500">
      <div className="container mx-auto px-4 py-10 flex gap-70">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <HouseHeart className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold">Cozy Corner</span>
          </div>
          <p className="text-gray-700 w-[280px]">
            Creating cozy, beautiful spaces with elegant home decor — from
            candles and vases to mirrors and plants.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-gray-600">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-600">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-500" />
              <span>24 Bloomfield Road, London, UK</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-red-500" />
              <span>+44 20 7946 1287</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-red-500" />
              <span>info@cozycorner.co.uk</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-400 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} Cozy Corner. All rights reserved.
      </div>
    </footer>
  );
}
