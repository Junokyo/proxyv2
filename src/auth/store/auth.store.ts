// src/store/auth.store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type AppUser = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  roles: string[];
  resourceAccess?: Record<string, { roles: string[] }>;
  isAdmin?: boolean;
};

type AuthState = {
  ready: boolean;
  authenticated: boolean;
  user: AppUser | null;
  token: string | null;
  tokenReady: boolean; // Đánh dấu token đã được init và sẵn sàng

  setReady: (v: boolean) => void;
  setAuthenticated: (v: boolean) => void;
  setUser: (u: AppUser | null) => void;
  setToken: (token: string | null) => void;
  setTokenReady: (v: boolean) => void;
  reset: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ready: false,
      authenticated: false,
      user: null,
      token: null,
      tokenReady: false,

      setReady: (v) => set({ ready: v }),
      setAuthenticated: (v) => set({ authenticated: v }),
      setUser: (u) => set({ user: u }),
      setToken: (token) => set({ token }),
      setTokenReady: (v) => set({ tokenReady: v }),
      reset: () =>
        set({
          ready: true,
          authenticated: false,
          user: null,
          token: null,
          tokenReady: false,
        }),
    }),
    {
      name: 'auth-ui',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        user: s.user,
        authenticated: s.authenticated,
      }),
    },
  ),
);

export const useAuth = () => {
  const {
    ready,
    authenticated,
    user,
    token,
    tokenReady,
    setReady,
    setAuthenticated,
    setUser,
    setToken,
    setTokenReady,
    reset,
  } = useAuthStore();
  return {
    ready,
    authenticated,
    user,
    token,
    tokenReady,
    setReady,
    setAuthenticated,
    setUser,
    setToken,
    setTokenReady,
    reset,
  };
};
