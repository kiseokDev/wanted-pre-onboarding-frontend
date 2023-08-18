import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../components";
import { AppRoutes } from "../App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
type InitialEntriesType = {
    path: '/' | '/signin' | '/signup' | '/todo'
}
export const TestApp = ({ path }: InitialEntriesType) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <MemoryRouter initialEntries={[path]}>
                    <AppRoutes />
                </MemoryRouter>
            </AuthProvider>
        </QueryClientProvider>
    );
}