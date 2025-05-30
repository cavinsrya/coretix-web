"use client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string, name: string, role: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
    localStorage.setItem("userId", userId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
  };

  return { isAuthenticated, login, logout };
}
