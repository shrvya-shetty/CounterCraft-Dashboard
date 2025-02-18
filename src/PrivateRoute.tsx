
// PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Correct import


interface PrivateRouteProps {
  component: React.ComponentType;
}

const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/user" />; // Use Navigate instead of Redirect
};

export default PrivateRoute;
