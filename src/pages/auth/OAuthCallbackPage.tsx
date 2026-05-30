import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      const decoded = jwtDecode<{ sub: string }>(token);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', decoded.sub);  // userId 저장
      navigate('/role-select');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <p className='text-gray-500'>로그인 중...</p>
    </div>
  );
};

export default OAuthCallbackPage;