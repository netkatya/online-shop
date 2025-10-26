import axios from "axios";

export const api = axios.create({
  baseURL: "https://node-v3-blended-starter-1.onrender.com",
  withCredentials: true,
});
