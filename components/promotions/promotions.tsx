import { Gift, Percent, Calendar, Star } from "lucide-react";

export default function OurPromotions() {
  const promotions = [
    {
      icon: <Gift className="w-10 h-10 text-red-500" />,
      title: "Buy 1 Get 1 Free",
      description: "Limited time offer on selected home items.",
    },
    {
      icon: <Percent className="w-10 h-10 text-red-500" />,
      title: "20% Off This Week",
      description: "Enjoy 20% discount on all kitchen products.",
    },
    {
      icon: <Calendar className="w-10 h-10 text-red-500" />,
      title: "Weekend Sale",
      description: "Special prices every weekend on top products.",
    },
    {
      icon: <Star className="w-10 h-10 text-red-500" />,
      title: "Premium Deals",
      description: "Exclusive offers on high-quality items.",
    },
  ];

  return (
    <section
      className="bg-gradient-to-b from-[#fff] to-[#e5e5e5] px-10 py-18 w-full"
      id="promotions"
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Promotions</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:auto-rows-auto justify-items-center">
          {promotions.map((promo, index) => (
            <div
              key={index}
              className="w-[380px] md:w-full bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{promo.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{promo.title}</h3>
              <p className="text-gray-700">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
