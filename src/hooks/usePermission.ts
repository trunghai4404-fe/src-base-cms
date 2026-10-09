import { useAppSelector } from "@/stores/hooks";

export function usePermission() {
    const user = useAppSelector(state => state.auth.user);
    const permissions = user?.permissions ?? [];

    const can = (permission: string) => {
        return permissions.includes(permission);
    };

    const canAny = (required: string[]) => {
        return required.some((permission) =>
            permissions.includes(permission),
        );
    };

    const canAll = (required: string[]) => {
        return required.every((permission) =>
            permissions.includes(permission),
        );
    };

    return {
        can,
        canAny,
        canAll,
    };
}