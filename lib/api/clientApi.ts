import { Product } from "@/types/products";
import { isAxiosError } from "axios";
import { nextServer } from "./api";

export interface FetchProductsResponse {
  data: Product[];
  totalPages: number;
}

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

export function getCategories(): string[] {
  return ["Vases", "Mirrors", "Plants", "Clocks", "Candles"];
}
