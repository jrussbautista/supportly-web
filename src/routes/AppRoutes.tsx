import { useAuth } from '../contexts/AuthContext';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
};

export default AppRoutes;
