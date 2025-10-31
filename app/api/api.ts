import axios from "axios";

const baseURL = process.env.NEXT_BACKEND_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
