import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Fungsi Login
export async function loginUser(email: string, password: string) {
  const response = await api.post("/api/auth/login", { email, password });
  return response.data.data;
}
