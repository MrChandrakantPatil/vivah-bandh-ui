import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';

export const PublicRoute = () => {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};
