"use client";

import Image from "next/image";

interface UserProfileProps {
  avatar: string;
  name: string;
  email: string;
  phone: string;
}

export default function UserProfile({
  avatar,
  name,
  email,
  phone,
}: UserProfileProps) {
  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4 py-10 md:p-[80px]">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Аватар */}
        <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/3 flex items-center justify-center bg-gray-100">
          <Image
            src="/img/avatar.png"
            alt={name}
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>

        {/* Информация */}
        <div className="w-full md:w-2/3 p-6 sm:p-10 flex flex-col justify-between">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              {name}
            </h1>

            <p className="text-lg md:text-xl text-gray-700 mb-2">
              <span className="font-semibold">Email:</span> {email}
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-2">
              <span className="font-semibold">Phone:</span> {phone}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button className="w-full sm:flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition">
              Edit Profile
            </button>
            <button className="w-full sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
