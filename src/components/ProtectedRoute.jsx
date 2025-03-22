import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children, roleRequired }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/patients" replace />;
  }

  return children;
}

export default ProtectedRoute;