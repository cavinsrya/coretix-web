import axios from "axios";
import { profile } from "console";
import { useAuth } from "@/app/utils/hook/useAuth";

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
// export async function createTransaction(data: {
//   ticketTypeId: number;
//   promotionCode?: string;
//   voucherCode?: string;
//   usePoint?: boolean;
// }) {
//   try {
//     const response = await api.post("/api/transactions", data);
//     return response.data.detail;
//   } catch (error) {
//     console.error("Failed to create transaction:", error);
//     throw error;
//   }
// }

export const createTransaction = async (data: {
  userId: number;
  ticketTypeId: number;
  usePoints?: boolean;
  promotionCode?: string;
  voucherCode?: string;
}) => {
  const token = localStorage.getItem("token"); // atau dari context/auth hook
  const response = await axios.post(
    "http://localhost:3000/api/transactions",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserPoints = async () => {
  const response = await api.get("api/profile");
  return response.data.detail.points;
};

export const fetchProfileInfo = async () => {
  const token = localStorage.getItem("token"); // atau dari context/auth hook
  const response = await axios.get("http://localhost:3000/api/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.detail;
};

export const getTransactionById = async (transactionId: number) => {
  const token = localStorage.getItem("token"); // atau dari auth context/hook
  //console.log("GET transactionId:", transactionId);
  //console.log("Authorization token:", token);
  const response = await axios.get(
    `http://localhost:3000/api/transactions/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export interface GetAllTransactionParams {
  page?: number;
  limit?: number;
  status?: string;
  eventId?: number;
}

export const getAllTransactions = async (params?: GetAllTransactionParams) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "http://localhost:3000/api/dashboard/transactions-list",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    }
  );

  return response.data; // { transactions, total }
};

export async function acceptTransaction(transactionId: number) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `http://localhost:3000/api/dashboard/transactions/${transactionId}/accept`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to accept transaction"
    );
  }
}

export async function rejectTransaction(transactionId: number) {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `http://localhost:3000/api/dashboard/transactions/${transactionId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to reject transaction"
    );
  }
}

export const getUserProfile = async () => {
  const { isAuthenticated } = useAuth();
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  if (!isAuthenticated || !token) {
    throw new Error("User is not authenticated.");
  }

  try {
    const response = await axios.get("api/profile", {
      headers: {
        Authorization: `Bearer ${token}`, // Sertakan token di header
      },
    });
    return response.data.detail; // Mengembalikan data profil lengkap
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Agar error dapat ditangani lebih lanjut
  }
};

export const uploadPaymentProof = async ({
  transactionId,
  file,
}: {
  transactionId: number;
  file: File;
}) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `http://localhost:3000/api/transactions/${transactionId}/payment-proof`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// 🔹 Fungsi Get User
// export async function getProfile() {
//   const token = localStorage.getItem("token");
//   const response = await api.get("/api/", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data.data; // harus mengandung 'points'
// }
