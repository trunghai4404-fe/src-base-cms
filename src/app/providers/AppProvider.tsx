import { QueryProvider } from "./QueryProvider"
import { ReduxProvider } from "./ReduxProvider"

interface Props {
    children: React.ReactNode
}

export function AppProvider({ children }: Props) {
    return (
        <ReduxProvider>
            <QueryProvider>
                {children}
            </QueryProvider>

        </ReduxProvider>
    )
}