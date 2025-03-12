import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthProvider';

export default function RequireAuth() {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser) {
    // return <Navigate to="/signin" />;
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
