// src/store/auth.store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type AppUser = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  roles: string[];
  resourceAccess?: Record<string, { roles: string[] }>;
};

type AuthState = {
  ready: boolean;
  authenticated: boolean;
  user: AppUser | null;

  setReady: (v: boolean) => void;
  setAuthenticated: (v: boolean) => void;
  setUser: (u: AppUser | null) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ready: false,
      authenticated: false,
      user: null,

      setReady: (v) => set({ ready: v }),
      setAuthenticated: (v) => set({ authenticated: v }),
      setUser: (u) => set({ user: u }),
      reset: () => set({ ready: true, authenticated: false, user: null }),
    }),
    {
      name: "auth-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        user: s.user,
        authenticated: s.authenticated,
        ready: s.ready,
      }),
    },
  ),
);

export const useAuth = () => {
  const {
    ready,
    authenticated,
    user,
    setReady,
    setAuthenticated,
    setUser,
    reset,
  } = useAuthStore();
  return {
    ready,
    authenticated,
    user,
    setReady,
    setAuthenticated,
    setUser,
    reset,
  };
};
