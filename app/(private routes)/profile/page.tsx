// "use client";

// import { useAuthStore } from "@/lib/store/authStore";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { logout } from "@/lib/api/clientApi";

// export default function UserProfile() {
//   const router = useRouter();
//   const { user, clearIsAuthenticated } = useAuthStore();

//   const handleLogout = async () => {
//     await logout();
//     clearIsAuthenticated();
//     router.push("/sign-in");
//   };

//   return (
//     <div className="min-h-screen flex justify-center bg-gray-50 px-4 py-10 md:p-[80px]">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
//         {/* Avatar */}
//         <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/3 flex items-center justify-center bg-gray-100">
//           <div className="flex flex-col items-center mb-6">
//             <label className="relative cursor-pointer group">
//               <div className="w-40 h-40 sm:w-60 sm:h-60 rounded-full overflow-hidden">
//                 <Image
//                   src={user?.avatar || "/img/avatar.png"}
//                   alt="avatar"
//                   width={200}
//                   height={200}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm opacity-0 rounded-full transition">
//                 Change
//               </div>
//             </label>
//             <input
//               id="avatar"
//               name="avatar"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               readOnly
//             />
//           </div>
//         </div>

//         {/* Information */}
//         <div className="w-full md:w-2/3 p-6 sm:p-10 flex flex-col justify-between">
//           <div className="mb-6">
//             <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 md:pt-24 mb-4">
//               {user?.username}
//             </h1>

//             <p className="text-lg md:text-xl text-gray-700 mb-2">
//               <span className="font-semibold">Email:</span> {user?.email}
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             <Link
//               href="/profile/edit"
//               className="w-full sm:flex-1 px-6 py-3 bg-red-500 text-white text-center font-semibold rounded-lg hover:bg-red-400 transition"
//             >
//               Edit Profile
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="w-full sm:flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { getMyOrdersNext } from "@/lib/api/orders";
import { Order } from "@/types/orders";

export default function UserProfile() {
  const router = useRouter();
  const { user, clearIsAuthenticated } = useAuthStore();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrdersNext();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:p-[80px] flex flex-col items-center gap-10">
      {/* ==== Profile Card ==== */}
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Avatar */}
        <div className="relative w-full h-64 md:w-1/3 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 sm:w-56 sm:h-56 rounded-full overflow-hidden">
              <Image
                src={user?.avatar || "/img/avatar.png"}
                alt="avatar"
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-2/3 p-6 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">
            {user?.username}
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/profile/edit"
              className="px-6 py-3 bg-red-500 text-white text-center font-semibold rounded-lg hover:bg-red-400 transition"
            >
              Edit Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ==== Orders ==== */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && orders.length === 0 && <p>No orders found.</p>}

        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="border p-4 rounded-lg bg-white shadow flex flex-col gap-3"
            >
              {/* Items */}
              {order.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-4 items-center cursor-pointer"
                  onClick={() => router.push(`/products/${item.productId}`)}
                >
                  <Image
                    src={item.image || "/img/default-product.png"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">
                      {item.quantity} × ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Order Info */}
              <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                <p className="font-semibold text-gray-900">
                  Total: ${order.totalPrice.toFixed(2)}
                </p>
                <p>Paid: {new Date(order.paymentDate).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
