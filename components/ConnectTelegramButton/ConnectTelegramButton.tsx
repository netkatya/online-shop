"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { getTelegramLinked } from "@/lib/api/clientApi";
import { SiTelegram } from "react-icons/si";

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

  if (loading)
    return (
      <div className="flex justify-center items-center py-6">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-6 flex flex-col items-center gap-4 mx-auto text-center">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
        Connect Your Telegram
      </h2>

      {isLinked ? (
        <div className="text-green-600 text-lg font-semibold mt-4">
          ✅ Telegram Connected!
        </div>
      ) : (
        <>
          <p className="text-gray-700 text-lg">
            Click the button below to connect your Telegram account.
          </p>
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2  px-6 py-3 bg-blue-600 text-white text-lg rounded-full font-semibold hover:bg-blue-500 transition"
          >
            <SiTelegram className="w-8 h-8 fill-white m-auto" />
            Open Bot
          </a>
          <p className="text-sm text-gray-500 mt-2">
            After starting the bot, the connection status will update
            automatically.
          </p>
        </>
      )}
    </div>
  );
};

export default ConnectTelegramButton;
