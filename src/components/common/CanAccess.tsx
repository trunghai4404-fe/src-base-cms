import { usePermission } from '@/hooks/usePermission';

interface CanAccessProps {
    permission: string;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export function CanAccess({ permission, children, fallback = null }: CanAccessProps) {
    const { can } = usePermission();
    if (!can(permission)) return fallback;
    return (
        <>
            {children}
        </>
    );
}
