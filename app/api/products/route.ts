import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";

import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const rawCategory = request.nextUrl.searchParams.get("category") ?? "";
    const category = rawCategory === "All" ? "" : rawCategory;
    const sortBy = request.nextUrl.searchParams.get("sortBy") ?? "price";
    const sortOrder = request.nextUrl.searchParams.get("sortOrder") ?? "asc";
    const res = await api("/products", {
      params: {
        ...(search && { search }),
        page,
        perPage: 8,
        ...(category && { category }),
        sortBy,
        sortOrder,
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
