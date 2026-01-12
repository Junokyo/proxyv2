// src/store/auth.store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { apolloClient } from '../../graphql/client';
import { GET_PROFILE_QUERY } from '../../graphql/queries/users/users.queries';

// Keycloak user profile response type
export type KeycloakUserProfile = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  attributes?: {
    locale?: string[];
    [key: string]: unknown;
  };
  userProfileMetadata?: unknown; // We don't need to store this
};

// GraphQL profile response type
export type GraphQLUserProfile = {
  id: string;
  providerId?: string;
  username: string;
  email?: string;
  roles: string[];
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  avatarUrl?: string;
  loyalLevelId?: string;
  active?: boolean;
};

// Unified AppUser type - only store what we need
export type AppUser = {
  id: string;
  providerId?: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  emailVerified?: boolean;
  roles: string[];
  locale?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
  phone?: string;
  avatarUrl?: string;
  loyalLevelId?: string;
  active?: boolean;
  resourceAccess?: Record<string, { roles: string[] }>;
  isAdmin?: boolean;
};

/**
 * Transform Keycloak user profile to AppUser format
 */
const transformKeycloakProfile = (
  profile: KeycloakUserProfile,
): Partial<AppUser> => {
  return {
    id: profile.id,
    username: profile.username,
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    emailVerified: profile.emailVerified,
    locale: profile.attributes?.locale?.[0],
    roles: [], // Roles will be set from token or separate endpoint
  };
};

/**
 * Transform GraphQL profile to AppUser format
 */
const transformGraphQLProfile = (
  profile: GraphQLUserProfile,
): Partial<AppUser> => {
  return {
    id: profile.id,
    providerId: profile.providerId,
    username: profile.username,
    email: profile.email,
    roles: profile.roles,
    lastLogin: profile.lastLogin,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
    phone: profile.phone,
    avatarUrl: profile.avatarUrl,
    loyalLevelId: profile.loyalLevelId,
    active: profile.active,
  };
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
  updateUserProfile: (profile: Partial<AppUser>) => void;
  setKeycloakProfile: (profile: KeycloakUserProfile) => void;
  fetchGraphQLProfile: () => Promise<void>;
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

      /**
       * Update user profile with partial data
       * Useful for merging data from different sources
       */
      updateUserProfile: (profile) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, ...profile }
            : (profile as AppUser),
          authenticated: true,
        })),

      /**
       * Set user profile from Keycloak response
       * Automatically transforms and stores only necessary fields
       */
      setKeycloakProfile: (profile) => {
        const transformedProfile = transformKeycloakProfile(profile);
        set((state) => ({
          user: state.user
            ? { ...state.user, ...transformedProfile }
            : (transformedProfile as AppUser),
          authenticated: true,
        }));
      },

      /**
       * Fetch user profile from GraphQL API
       * Uses the profile query to get complete user information
       */
      fetchGraphQLProfile: async () => {
        try {
          const { data } = await apolloClient.query<{
            profile: GraphQLUserProfile;
          }>({
            query: GET_PROFILE_QUERY,
            fetchPolicy: 'network-only', // Always fetch fresh data
          });

          if (data?.profile) {
            const transformedProfile = transformGraphQLProfile(data.profile);
            set((state) => ({
              user: state.user
                ? { ...state.user, ...transformedProfile }
                : (transformedProfile as AppUser),
              authenticated: true,
            }));
          }
        } catch (error) {
          console.error('Failed to fetch GraphQL profile:', error);
          // Optionally reset auth state on error
        }
      },

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
    updateUserProfile,
    setKeycloakProfile,
    fetchGraphQLProfile,
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
    updateUserProfile,
    setKeycloakProfile,
    fetchGraphQLProfile,
    reset,
  };
};
