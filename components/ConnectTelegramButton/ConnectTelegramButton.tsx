"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getTelegramLinked } from "@/lib/api/clientApi";

interface ConnectTelegramButtonProps {
  userId: string;
  botUsername: string;
}

const ConnectTelegramButton = ({
  userId,
  botUsername,
}: ConnectTelegramButtonProps) => {
  const { user } = useAuthStore();
  const [isLinked, setIsLinked] = useState(user?.telegramLinked || false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const data = await getTelegramLinked(userId);
        setIsLinked(data?.isLinked);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 3000);
    return () => clearInterval(interval);
  }, [userId]);

  const telegramLink = `https://t.me/${botUsername}?start=${encodeURIComponent(
    userId
  )}`;

  if (loading) return <p>Завантаження...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-2xl max-w-md mx-auto text-center">
      <h2 className="text-2xl font-semibold">Підключення Telegram 📲</h2>

      {isLinked ? (
        <div className="text-green-600 text-lg font-medium">
          ✅ Telegram підключено!
        </div>
      ) : (
        <>
          <p className="text-gray-600">
            Натисни кнопку, щоб підключити свій Telegram.
          </p>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0088cc] text-white py-3 px-6 rounded-full text-lg hover:bg-[#007ab8] transition"
          >
            Відкрити бота
          </a>
          <p className="text-sm text-gray-500">
            Після запуску бота статус оновиться автоматично.
          </p>
        </>
      )}
    </div>
  );
};

export default ConnectTelegramButton;
