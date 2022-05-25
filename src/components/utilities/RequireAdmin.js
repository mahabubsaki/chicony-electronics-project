import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import auth from '../firebase.init';
import useAdminCheck from '../hooks/useAdminCheck';
import Loading from './Loading';

const RequireAdmin = ({ children }) => {
    // this hook require admin for getting into child route

    const [user, loading] = useAuthState(auth);
    const { admin, adminLoading } = useAdminCheck(user?.email)

    if (loading || adminLoading) {
        return <Loading></Loading>
    }
    if (!user || !admin) {
        return <Navigate to="/dashboard" />;
    }

    return children;
};

export default RequireAdmin;