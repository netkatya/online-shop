import { Product } from "@/types/products";
import { isAxiosError } from "axios";
import { nextServer } from "./api";

export interface FetchProductsResponse {
  products: Product[];
  totalPages: number;
}

const DEFAULT_CATEGORIES = ["vases", "mirrors", "plants", "clocks", "candles"];

export async function fetchProductsClient(
  search = "",
  page = 1,
  perPage = 8,
  category?: string
): Promise<FetchProductsResponse> {
  try {
    const params: Record<string, string> = {
      page: String(page),
      perPage: String(perPage),
    };
    if (search) params.search = search;
    if (category && category.toLowerCase() !== "all")
      params.category = category;

    const { data } = await nextServer.get<FetchProductsResponse>("/products", {
      params,
    });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Fetching products failed"
      );
    }
    throw new Error("Fetching products failed");
  }
}

export async function getCategoriesClient(): Promise<string[]> {
  try {
    const res = await fetchProductsClient();
    const categoriesFromProducts: string[] = Array.from(
      new Set(res.products.map((product) => product.category))
    );
    return Array.from(
      new Set([...DEFAULT_CATEGORIES, ...categoriesFromProducts])
    );
  } catch (error) {
    console.error("Cannot fetch categories:", error);
    return DEFAULT_CATEGORIES;
  }
}
