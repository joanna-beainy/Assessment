import { create } from "zustand";
import axios from "axios";
import type { User } from "../Types/types.ts";

const API_URL = "http://localhost:3000/auth";

interface AuthStore {
  user: User | null;
  token: string | null;

  name: string;
  email: string;  password: string;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;

  register: () => void;
  login: () => void;
  logout: () => void;
  resetForm: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  token: localStorage.getItem("token"),

  name: "",
  email: "",
  password: "",

  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  resetForm: () => set({ name: "", email: "", password: "" }),


  register: async () => {
    try {
      const {name, email, password, resetForm} = get();
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });

      const newUser = res.data.newUser
      set({user: newUser })
      resetForm();
    } catch (error) {
      console.log("Error registering:", error);
    }
  },

  login: async () => {
    try {
      const {email, password, resetForm} = get();
      const res = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      const { token, safeUser } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(safeUser));
      set({ token, user: safeUser });
      resetForm();

    } catch (error) {
      console.log("Error logging in:", error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
