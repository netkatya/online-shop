import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post("auth/login", body);
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      // 1. Создаем ответ с данными JSON
      const response = NextResponse.json(apiRes.data, {
        status: apiRes.status,
      });

      // 2. Копируем ВСЕ заголовки Set-Cookie из ответа API в наш ответ
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        response.headers.append("Set-Cookie", cookieStr);
      }

      return response; // 3. Отправляем ответ клиенту
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status }
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
