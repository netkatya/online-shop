import { AxiosError } from "axios";

export type RegisterRequest = {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SessionResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type RequestResetEmail={
    email: string;
}
export type ResetPassword = {
  token:string,
  password: string;
}



export type ApiError = AxiosError<{ error: string }>