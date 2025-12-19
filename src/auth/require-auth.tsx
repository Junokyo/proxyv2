import { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ScreenLoader } from '@/components/common/screen-loader';
import { useAuth } from './context/auth-context';
import { useKC } from './providers/keycloak.provider';

/**
 * Component to protect routes that require authentication.
 * If user is not authenticated, redirects to the login page.
 */
export const RequireAuth = () => {
  const { auth, verify, loading: globalLoading } = useAuth();
  const { ready: kcReady, authenticated: kcAuthenticated } = useKC();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const verificationStarted = useRef(false);

  useEffect(() => {
    // ✅ Keycloak SSO là nguồn auth chính cho luồng SSO.
    // Khi KC đã sẵn sàng và authenticated thì không cần verify theo Supabase nữa.
    if (kcReady && kcAuthenticated) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      if (!auth?.access_token || !verificationStarted.current) {
        verificationStarted.current = true;
        try {
          await verify();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    // Chỉ chạy verify Supabase sau khi Keycloak init xong (để tránh flash/loop)
    if (kcReady) checkAuth();
  }, [auth, verify, kcReady, kcAuthenticated]);

  // Show screen loader while checking authentication
  if (!kcReady || loading || globalLoading) {
    return <ScreenLoader />;
  }

  // If not authenticated, redirect to login
  if (!kcAuthenticated && !auth?.access_token) {
    return (
      <Navigate
        to={`/auth/signin?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  // If authenticated, render child routes
  return <Outlet />;
};
