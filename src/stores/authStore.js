import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api.js";

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      name: "",
      role: "",
      loading: false,

      // login function
      login: async (credentials) => {
        set({ loading: true });
        try {
          // Get CSRF first if required
          await api.get("/csrf/");
          // Login
          await api.post("/login/", credentials);
          // Fetch user info
          const response = await api.get("/me/");
          set({
            isLoggedIn: true,
            name: response.data.name,
            role: response.data.role,
          });
        } catch (err) {
          console.error(err);
          set({ isLoggedIn: false, name: "", role: "" });
          throw err;
        } finally {
          set({ loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/logout/"); // optional logout API
        } catch (err) {
          console.error(err);
        } finally {
          set({ isLoggedIn: false, name: "", role: "" });
        }
      },

      fetchUser: async () => {
        set({ loading: true });
        try {
          const response = await api.get("/me/");
          set({
            isLoggedIn: true,
            name: response.data.name,
            role: response.data.role,
          });
        } catch {
          set({ isLoggedIn: false, name: "", role: "" });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage, // persist in localStorage
    },
  ),
);

export default useAuthStore;
