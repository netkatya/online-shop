import { Product } from "@/types/products";
import { isAxiosError } from "axios";
import { nextServer } from "./api";
import {
  LoginRequest,
  RegisterRequest,
  RequestResetEmail,
  ResetPassword,
} from "@/types/auth";
import { User } from "@/types/user";

export interface FetchProductsResponse {
  data: Product[];
  totalPages: number;
}

export async function fetchProductsClient(
  search = "",
  page = 1,
  category?: string,
  sortBy: "priceAsc" | "priceDesc" | "name" = "name"
): Promise<FetchProductsResponse> {
  const perPage = 8;
  try {
    const params: Record<string, string> = {
      page: String(page),
      perPage: String(perPage),
    };
    if (search) params.search = search;
    if (category && category.toLowerCase() !== "all")
      params.category = category;

    if (sortBy === "priceAsc") {
      params.sortBy = "price";
      params.sortOrder = "asc";
    } else if (sortBy === "priceDesc") {
      params.sortBy = "price";
      params.sortOrder = "desc";
    } else {
      params.sortBy = "_id";
      params.sortOrder = "asc";
    }

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
  return ["vases", "mirrors", "plants", "clocks", "candles"];
}

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

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};
export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};
export const requestResetEmail = async (data: RequestResetEmail) => {
  const res = await nextServer.post<User>("/auth/requestResetEmail", data);
  return res.data;
};
export const resetPassword = async (data: ResetPassword) => {
  const res = await nextServer.post<User>("/auth/", data);
  return res.data;
};
export const getMe = async () => {
  const res = await nextServer.get<User>("/auth/me");
  return res.data;
};
