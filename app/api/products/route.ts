import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    // const cookieStore = cookies();
    const search = request.nextUrl.searchParams.get("search") ?? "";
    const page = Number(request.nextUrl.searchParams.get("page") ?? 1);
    const rawCategory = request.nextUrl.searchParams.get("category") ?? "";
    const category = rawCategory === "All" ? "" : rawCategory;

    // const cookieHeader = cookieStore
    //   .getAll()
    //   .map((c) => `${c.name}=${c.value}`)
    //   .join("; ");

    const res = await api("/products", {
      params: {
        ...(search && { search }),
        page,
        perPage: 8,
        ...(category && { category }),
      },
      // headers: { Cookie: cookieHeader },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }

    console.error("Server error:", (error as Error).message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
