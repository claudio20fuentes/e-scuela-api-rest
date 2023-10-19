import { React } from 'react';
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to='/auth/login' replace />;
  }
  return children;
};
export default Protected;
