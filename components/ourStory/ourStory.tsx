import Image from "next/image";

export default function OurStory() {
  return (
    <section className="w-full bg-gradient-to-t from-[#fff] to-[#e5e5e5] py-18">
      <div className="container w-[410px] md:w-[1440px] mx-auto flex flex-col-reverse md:flex-row gap-10 items-center px-4">
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image
            src="/img/our-story1.webp"
            alt="Our story - cozy home"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6 text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Cozy Corner began with a love for simple, beautiful living. What
            started as a small collection of handcrafted ceramics and candles
            has grown into a carefully curated selection of home décor pieces
            that bring warmth and comfort to every corner of your space.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Each product is chosen with care — inspired by natural textures,
            soft tones, and timeless design. We believe a cozy home is not about
            perfection, but about creating a place that feels truly yours.
          </p>
        </div>
      </div>
    </section>
  );
}
