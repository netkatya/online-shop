"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateMe, updateMeAvatar } from "@/lib/api/clientApi";
import { User } from "@/types/user";
import { useState } from "react";
import ConnectTelegramButton from "@/components/ConnectTelegramButton/ConnectTelegramButton";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState(user?.avatar || "");

  const TELEGRAM_BOT_USERNAME =
    process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updatedUser = await updateMe(formData as Partial<User>);
    if (avatar) {
      updatedUser = await updateMeAvatar(avatar as File);
    }
    setUser(updatedUser);

    router.push("/profile");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  if (!user) {
    router.push("/sign-in");
    return <></>;
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4 py-10 md:p-[80px]">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Avatar */}
        <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/3 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center mb-6">
            <label htmlFor="avatar" className="relative cursor-pointer group">
              <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden">
                <Image
                  src={preview || "/img/avatar.png"}
                  alt="avatar"
                  width={200}
                  height={200}
                  loading="eager"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 rounded-full transition">
                Change
              </div>
            </label>

            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Information */}
        <div></div>
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-2/3 p-6 sm:p-10 flex flex-col justify-between"
        >
          <div className="mb-6">
            <label className="mb-6 font-bold  text-gray-700" htmlFor="username">
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="w-full mt-2 mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label className="mb-6 font-bold  text-gray-700" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <ConnectTelegramButton
            userId={user.id}
            botUsername={TELEGRAM_BOT_USERNAME}
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full  bg-red-500 text-white sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-red-600 transition"
            >
              Save
            </button>
            <button
              type="button"
              className="w-full sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
