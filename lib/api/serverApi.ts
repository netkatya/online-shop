import { Product } from "@/types/products";
import { nextServer } from "./api";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";
import { parse } from 'cookie';
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";


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
export const checkServerSession = async (cookieStore: RequestCookies) => {
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  let cookieString = '';
  if (accessToken) cookieString += `accessToken=${accessToken}; `;
  if (refreshToken) cookieString += `refreshToken=${refreshToken}`;
  
  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieString,
    },
  });
  return res;
};

interface CookieOptions {
  expires?: Date;
  path?: string;
  maxAge?: number;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}


export function setCookiesOnResponse(response: NextResponse, setCookie: string | string[]) {
  const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

  for (const cookieStr of cookieArray) {
    const parsed = parse(cookieStr);
    
    const cookieName = Object.keys(parsed)[0];
    const cookieValue = parsed[cookieName];


    const options: CookieOptions = {
      expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
      path: parsed.Path,
      maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
      httpOnly: 'HttpOnly' in parsed,
      sameSite: parsed.SameSite as 'strict' | 'lax' | 'none' | undefined,
      secure: 'Secure' in parsed,
    };

    if (cookieName && cookieValue) {
      response.cookies.set(cookieName, cookieValue, options);
    }
  }
  return response;
}