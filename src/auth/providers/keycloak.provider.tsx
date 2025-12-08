'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { keycloak } from '../lib/keycloak';
import { AppUser, useAuthStore } from '../store/auth.store';

type KCContext = {
  ready: boolean;
  authenticated: boolean;
  user: AppUser | null;
  token?: string; // chỉ nên dùng rất hạn chế ở FE-only
  login: (redirectUri?: string) => void;
  logout: (redirectUri?: string) => void;
  keycloak: typeof keycloak;
};

const Ctx = createContext<KCContext | null>(null);
export const useKC = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('useKC must be used within <KeycloakProvider>');
  return v;
};

export default function KeycloakProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    ready,
    authenticated,
    user,
    setReady,
    setAuthenticated,
    setUser,
    reset,
  } = useAuthStore();
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    (async () => {
      try {
        const auth = await keycloak.init({
          onLoad: 'check-sso',
          checkLoginIframe: false,
          pkceMethod: 'S256',
          silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
          silentCheckSsoFallback: false,
          flow: 'standard',
        });

        if (!mounted.current) return;

        setAuthenticated(!!auth);

        if (auth) {
          // lấy profile + roles
          try {
            const p = await keycloak.loadUserProfile();
            const tokenParsed = keycloak.tokenParsed;
            const roles = [
              ...(tokenParsed?.realm_access?.roles ?? []),
              ...Object.values(tokenParsed?.resource_access ?? {}).flatMap(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (r: any) => r?.roles ?? [],
              ),
            ];

            const resourceAccess = tokenParsed?.resource_access
              ? Object.fromEntries(
                  Object.entries(tokenParsed.resource_access).map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ([k, v]: any) => [k, { roles: v?.roles ?? [] }],
                  ),
                )
              : undefined;
            const u: AppUser = {
              id: p.id!,
              username:
                (keycloak.tokenParsed?.preferred_username as string) ??
                p.username!,
              // name:
              //   p.firstName || p.lastName
              //     ? `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()
              //     : p.username!,
              firstName: p.firstName ?? undefined,
              lastName: p.lastName ?? undefined,
              email:
                p.email ?? (keycloak.tokenParsed?.email as string | undefined),
              roles,
              resourceAccess,
            };
            setUser(u);
          } catch {
            // ignore: vẫn coi là authenticated nhưng chưa có profile
          }
        } else {
          setUser(null);
        }
      } catch {
        // init lỗi: coi như chưa đăng nhập
        reset();
      } finally {
        if (mounted.current) setReady(true);
      }
    })();

    // token lifecycle
    keycloak.onAuthSuccess = () => {
      if (!mounted.current) return;
      setAuthenticated(true);
    };

    keycloak.onAuthLogout = () => {
      if (!mounted.current) return;
      reset();
    };

    keycloak.onTokenExpired = async () => {
      try {
        // refresh nếu còn > 30s hết hạn
        await keycloak.updateToken(30);
      } catch {
        // refresh fail -> clear
        keycloak.clearToken();
        reset();
        enqueueSnackbar('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.', {
          variant: 'error',
        });
      }
    };

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Không lưu token vào storage; chỉ expose tạm nếu cần call API FE-only
  const { token } = keycloak;

  const value = useMemo<KCContext>(
    () => ({
      ready,
      authenticated,
      user,
      token,
      login: (redirectUri?: string) =>
        keycloak.login({
          redirectUri: redirectUri ?? `${window.location.origin}/`,
        }),
      logout: (redirectUri?: string) =>
        keycloak.logout({
          redirectUri: redirectUri ?? `${window.location.origin}/`,
        }),
      keycloak,
    }),
    [ready, authenticated, user, token],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
