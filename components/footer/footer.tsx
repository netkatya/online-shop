import { HouseHeart, MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#e5e5e5] text-gray-800 border-t-2 border-red-500">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
              <Link href="/#promotions" className="hover:text-gray-600">
                Promotions
              </Link>
            </li>
            <li>
              <Link href="/#location" className="hover:text-gray-600">
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
              <a href="tel:+4420794612879" className="hover:text-gray-600">
                +44 20 7946 1287
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-red-500" />
              <a
                href="mailto:info@cozycorner.co.uk"
                className="hover:text-gray-600"
              >
                info@cozycorner.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-400 text-center py-4 text-sm text-gray-600">
        {new Date().getFullYear()} Cozy Corner. Non-commercial educational
        project. All images belong to their respective owners.
      </div>
    </footer>
  );
}
