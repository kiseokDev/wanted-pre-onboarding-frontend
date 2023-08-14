import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../components";
import { AppRoutes } from "../App";

type InitialEntriesType = {
    path: '/' | '/signin' | '/signup' | '/todo'
}
export const TestApp = ({ path }: InitialEntriesType) => {
    return (
        <AuthProvider>
            <MemoryRouter initialEntries={[path]}>
                <AppRoutes />
            </MemoryRouter>
        </AuthProvider>
    );
}