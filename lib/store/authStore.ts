import { User } from "@/types/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
  setLoading: (isLoading: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      isLoading: true,
      setUser: (user: User) => {
        set(() => ({ user, isAuthenticated: true, isLoading: false }));
      },
      clearIsAuthenticated: () => {
        console.log("Clearing the userStore...");

        set(() => ({ user: null, isAuthenticated: false, isLoading: false }));
      },
      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
    // {
    //   name: "auth-storage",
    //   partialize: (state) => ({
    //     isAuthenticated: state.isAuthenticated,
    //     user: state.user,
    //     isLoading: state.isLoading,
    //   }),
    // }
  )
);
