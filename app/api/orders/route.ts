// app/api/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "../api"; // твой axios instance
import { isAxiosError } from "axios";

// GET /api/orders — получить заказы текущего пользователя
export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await api.get("/orders/my", {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
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

// POST /api/orders — создать новый заказ
export async function POST(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalPrice } = body;

    if (!items || !Array.isArray(items) || items.length === 0 || !totalPrice) {
      return NextResponse.json(
        { error: "Missing order data" },
        { status: 400 }
      );
    }

    const res = await api.post(
      "/orders",
      { items, totalPrice },
      {
        headers: {
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      }
    );

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
