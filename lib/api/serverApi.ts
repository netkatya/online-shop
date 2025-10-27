import { Product } from "@/types/products";
import { nextServer } from "./api";
import { isAxiosError } from "axios";

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const { data } = await nextServer.get<Product>(`/products/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Fetching product failed"
      );
    }
    throw new Error("Fetching product failed");
  }
}
