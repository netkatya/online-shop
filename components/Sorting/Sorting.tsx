import { SetStateAction } from "react";

interface SortingInt {
  sortBy: "name" | "priceAsc" | "priceDesc";
  setSortBy: (value: SetStateAction<"name" | "priceAsc" | "priceDesc">) => void;
}
export default function Sorting({ sortBy, setSortBy }: SortingInt) {
  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value as "name" | "priceAsc" | "priceDesc")
        }
        className="px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-red-400 outline-none"
      >
        <option value="name">Sort by Price</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
}
