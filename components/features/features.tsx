import { HouseHeart, Package, Star, Clock } from "lucide-react";

export default function OurFeatures() {
  const features = [
    {
      icon: <HouseHeart className="w-10 h-10 text-red-500" />,
      title: "Cozy Home Items",
      description: "Stylish products to make your home warm and inviting.",
    },
    {
      icon: <Package className="w-10 h-10 text-red-500" />,
      title: "Fast Delivery",
      description: "Quick and safe delivery right to your doorstep.",
    },
    {
      icon: <Star className="w-10 h-10 text-red-500" />,
      title: "Top Quality",
      description: "Carefully selected items with premium quality materials.",
    },
    {
      icon: <Clock className="w-10 h-10 text-red-500" />,
      title: "Easy Returns",
      description: "Hassle-free returns for a smooth shopping experience.",
    },
  ];

  return (
    <section className="bg-[var(--background)] py-16 w-full" id="features">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Features</h2>

        <div className="flex gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-xl bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
