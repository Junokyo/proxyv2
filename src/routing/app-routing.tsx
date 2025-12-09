import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/auth/context/auth-context';
import { useLocation } from 'react-router-dom';
import { useLoadingBar } from 'react-top-loading-bar';
import { AppRoutingSetup } from './app-routing-setup';

export function AppRouting() {
  const { start, complete } = useLoadingBar({
    color: 'var(--color-primary)',
    shadow: false,
    waitingTime: 400,
    transitionTime: 200,
    height: 2,
  });

  const { verify, setLoading } = useAuth();
  const [previousLocation, setPreviousLocation] = useState('');
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();
  const path = location.pathname.trim();
  const previousPathRef = useRef<string>('');

  // Chỉ chạy một lần khi component mount lần đầu
  useEffect(() => {
    if (firstLoad) {
      verify().finally(() => {
        setLoading(false);
        setFirstLoad(false);
        previousPathRef.current = path; // Set previousPath sau lần verify đầu tiên
        setPreviousLocation(path);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - chỉ chạy một lần khi mount

  // Chỉ chạy khi path thực sự thay đổi, không phải mỗi lần location object thay đổi
  useEffect(() => {
    // Bỏ qua lần đầu tiên (đã xử lý ở useEffect trên)
    if (firstLoad) {
      return;
    }

    // Chỉ verify khi path thực sự thay đổi
    if (path !== previousPathRef.current) {
      start('static');
      verify()
        .catch(() => {
          throw new Error('User verify request failed!');
        })
        .finally(() => {
          previousPathRef.current = path;
          setPreviousLocation(path);
          complete();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]); // Chỉ phụ thuộc vào path

  useEffect(() => {
    if (!CSS.escape(window.location.hash)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [previousLocation]);

  return <AppRoutingSetup />;
}
