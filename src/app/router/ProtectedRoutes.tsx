import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/stores/hooks';
import { usePermission } from '@/hooks/usePermission';

interface ProtectedRouteProps {
    permission?: string;
    anyPermission?: string[];
    allPermissions?: string[];
    roles?: string[];
    children?: React.ReactNode;
    redirectTo?: string;
    unauthorizedTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    permission,
    anyPermission,
    allPermissions,
    roles,
    children,
    redirectTo = '/login',
    unauthorizedTo = '/403',
}) => {
    const location = useLocation();
    const { user, isLoading } = useAppSelector((state) => state.auth);
    const { can, canAny, canAll } = usePermission();

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <div className="text-gray-500 font-medium">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }
    if (roles && roles.length > 0) {
        const userRoles = user.roles ?? [];
        const hasRole = roles.some((role) => userRoles.includes(role));
        if (!hasRole) {
            return <Navigate to={unauthorizedTo} replace />;
        }
    }

    if (permission && !can(permission)) {
        return <Navigate to={unauthorizedTo} replace />;
    }

    if (anyPermission && anyPermission.length > 0 && !canAny(anyPermission)) {
        return <Navigate to={unauthorizedTo} replace />;
    }

    if (allPermissions && allPermissions.length > 0 && !canAll(allPermissions)) {
        return <Navigate to={unauthorizedTo} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
