import { useEffect, useState } from 'react';
import { authApi } from './apis/services/auth.api';
import DefaultLayout from './components/layout/DefaultLayout';
import { useAuthStore } from './stores/authStore';
import { loadKakaoScript } from './utils/loadMap';

const App = () => {
  const { setUser, setLoading } = useAuthStore();
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadKakaoScript();
      setIsKakaoLoaded(true);
    };

    init();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    authApi
      .me()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setLoading(false);
      });
  }, [setUser, setLoading]);

  return (
    <div className="min-h-screen bg-[#e5e7eb] flex justify-center">
      <div className="min-h-screen w-[393px] overflow-hidden bg-white">
        <DefaultLayout />
      </div>
    </div>
  );
};

export default App;
