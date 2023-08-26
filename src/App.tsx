import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components';
import { useContext } from 'react';
import { SignInPage, SignUpPage, TodoPage } from './pages';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';


export const AppRoutes: React.FC = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/signin" element={token ? <Navigate to="/todo" /> : <SignInPage />} />
      <Route path="/signup" element={token ? <Navigate to="/todo" /> : <SignUpPage />} />
      <Route path="/todo" element={!token ? <Navigate to="/signin" /> : <TodoPage />} />
    </Routes>
  );
}


const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


export default App;
