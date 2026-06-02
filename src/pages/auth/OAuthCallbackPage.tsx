import { authApi } from '@/apis/services/auth.api';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', decoded.sub);
      
      const isNew = params.get('isNew') === 'true';
      authApi.me()
        .then((user) => {
          setUser(user);
          navigate(isNew ? ROUTES.LANGUAGE_SELECT : ROUTES.HOME);
        })
        .catch(() => navigate(ROUTES.LOGIN));
    } else {
      navigate(ROUTES.LOGIN);
    }
  }, [navigate, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">로그인 중...</p>
    </div>
  );
};

export default OAuthCallbackPage;
