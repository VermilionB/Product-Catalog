import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../index';
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    Component: React.ComponentType<any>;
    role_id: number;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = observer(({ Component, role_id }) => {
    const { user } = useContext(Context);
    const hasRole2 = user && user.user.role_id === role_id;

    if (!user || !hasRole2) {
        return <Navigate to="/" replace />;
    }

    return <Component />;
});

export default ProtectedRoute;
