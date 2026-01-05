'use client';

import { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { keycloak } from '../lib/keycloak';
import { AppUser, useAuthStore } from '../store/auth.store';

// StrictMode (dev) sẽ mount/unmount/mount lại và chạy useEffect 2 lần.
// keycloak-js chỉ cho phép init() một lần, nên cần cache promise ở module scope.
let keycloakInitPromise: Promise<boolean> | null = null;

function initKeycloakOnce() {
  if (!keycloakInitPromise) {
    keycloakInitPromise = keycloak.init({
      onLoad: 'check-sso',
      checkLoginIframe: false,
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      silentCheckSsoFallback: false,
      flow: 'standard',
    });
  }
  return keycloakInitPromise;
}

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
    setToken,
    setTokenReady,
    reset,
  } = useAuthStore();
  const mounted = useRef(true);

  const loadUser = async () => {
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

    // Lấy roles cụ thể của client này (test-web-client) để check quyền chuyên sâu
    const clientRoles =
      tokenParsed?.resource_access?.['test-web-client']?.roles ?? [];

    const u: AppUser = {
      id: p.id!,
      username:
        (keycloak.tokenParsed?.preferred_username as string) ?? p.username!,
      firstName: p.firstName ?? undefined,
      lastName: p.lastName ?? undefined,
      email: p.email ?? (keycloak.tokenParsed?.email as string | undefined),
      roles, // Tất cả roles (Realm + All Clients)
      resourceAccess,
      isAdmin: clientRoles.includes('admin'),
      // Có thể thêm các helper khác ở đây sau này
      // isEditor: clientRoles.includes('editor'),
    };
    setUser(u);
  };

  useEffect(() => {
    mounted.current = true;

    (async () => {
      try {
        // Ưu tiên mạnh: Init keycloak trước tiên để lấy token
        const auth = await initKeycloakOnce();

        if (!mounted.current) return;

        // Lưu token vào store ngay khi có (kể cả khi chưa authenticated)
        const token = keycloak.token;
        if (token) {
          setToken(token);
        }
        setTokenReady(true); // Đánh dấu token đã được init

        setAuthenticated(!!auth);

        if (auth) {
          // lấy profile + roles
          try {
            await loadUser();
          } catch {
            // ignore: vẫn coi là authenticated nhưng chưa có profile
          }
        } else {
          setUser(null);
        }
      } catch {
        // init lỗi: coi như chưa đăng nhập
        reset();
        setTokenReady(true); // Vẫn đánh dấu token ready (dù không có token)
      } finally {
        if (mounted.current) setReady(true);
      }
    })();

    // token lifecycle
    keycloak.onAuthSuccess = async () => {
      if (!mounted.current) return;
      setAuthenticated(true);
      // Cập nhật token vào store khi login thành công
      const token = keycloak.token;
      if (token) {
        setToken(token);
      }
      // sau redirect login, đôi khi cần load profile lại để SignInPage nhận state mới
      try {
        await loadUser();
      } catch {
        // ignore
      }
    };

    keycloak.onAuthLogout = () => {
      if (!mounted.current) return;
      reset();
    };

    keycloak.onTokenExpired = async () => {
      try {
        // refresh nếu còn > 30s hết hạn
        const refreshed = await keycloak.updateToken(30);
        if (refreshed && keycloak.token) {
          // Cập nhật token mới vào store
          setToken(keycloak.token);
        }
      } catch {
        // refresh fail -> clear
        keycloak.clearToken();
        setToken(null);
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
