import { useAuthStore } from '@/stores/authStore';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to='/login' replace />;

  return <>{children}</>;
};

export default PrivateRoute;
