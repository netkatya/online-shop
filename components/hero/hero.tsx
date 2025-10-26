export default function Hero() {
  return (
    <section className="relative w-full h-[650px]">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/img/living-room.webp')] bg-cover bg-center"></div>

      {/* Black overlay with 30% opacity */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Optional content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Stylish products for your home and interior
        </p>
        <button className="bg-white text-red-500 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition">
          Shop Now
        </button>
      </div>
    </section>
  );
}
