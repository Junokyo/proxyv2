import { Navigate, Outlet } from 'react-router-dom';
import { ScreenLoader } from '@/components/common/screen-loader';
import { useKC } from './providers/keycloak.provider';

/**
 * Guard for guest-only pages (Login, Signup, etc.)
 * Redirects to home if the user is already authenticated.
 */
export const GuestGuard = () => {
  const { ready, authenticated } = useKC();

  if (!ready) {
    return <ScreenLoader />;
  }

  if (authenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
