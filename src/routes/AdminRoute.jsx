import React from 'react'
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../components/loading/Loading';

const AdminRoute = ({children}) => {
    const location = useLocation();

    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
    return <Loading/>
    }
    if (user && user.email && role === "admin") {
      return children;
    } else {
      return <Navigate to={"/login"} state={location.pathname} />;
    }
 
}

export default AdminRoute