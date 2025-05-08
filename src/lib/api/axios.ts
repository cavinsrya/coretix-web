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

// 🔹 Fungsi Register
export async function registerUser(
  name: string,
  email: string,
  password: string,
  referredBy?: string
) {
  const response = await api.post("/api/register", {
    name,
    email,
    password,
    ...(referredBy && { referredBy }),
  });

  return response.data.data;
}

export async function fetchAllEvents() {
  try {
    const response = await api.get("/api/events");

    // Akses data di dalam detail
    const events = response.data?.detail || [];

    return events; // Return langsung events dari detail
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return []; // fallback jika error
  }
}

export async function fetchEventById(eventId: string) {
  try {
    const response = await api.get(`/api/event/${eventId}`);
    console.log("API Response:", response.data);
    return response.data.detail;
  } catch (error) {
    console.error("Failed to fetch event details:", error);
    throw error;
  }
}

export const getEventDetails = async (id: string) => {
  try {
    const response = await api.get(`api/event/${id}`);
    return response.data.detail;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

// 🔹 Fungsi Fetch User Information by ID
export async function fetchUserInfo(userId: string) {
  try {
    const response = await api.get(`/api/user/${userId}`);
    return response.data.data; // Sesuaikan dengan struktur response API kamu
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}

// Fungsi untuk Create Transaction (Checkout)
export async function createTransaction(data: {
  ticketTypeId: number;
  promotionCode?: string;
  voucherCode?: string;
  usePoint?: boolean;
}) {
  try {
    const response = await api.post("/api/transactions", data);
    return response.data.detail;
  } catch (error) {
    console.error("Failed to create transaction:", error);
    throw error;
  }
}

// 🔹 Fungsi Get User
// export async function getProfile() {
//   const token = localStorage.getItem("token");
//   const response = await api.get("/api/", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data.data; // harus mengandung 'points'
// }
