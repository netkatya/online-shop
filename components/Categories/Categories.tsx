import { getCategories } from "@/lib/api/clientApi";

interface CategoriesInt {
  setSelectedCategory: (category: string) => void;
  selectedCategory: string;
}

export default function Categories({
  setSelectedCategory,
  selectedCategory,
}: CategoriesInt) {
  const fetchCategories = getCategories();
  const categories = ["all", ...fetchCategories];
  return (
    <div>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
