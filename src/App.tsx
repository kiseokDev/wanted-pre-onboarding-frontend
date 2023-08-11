import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components';
import { useContext } from 'react';
import { SignInPage, SignUpPage, TodoPage } from './pages';

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
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}


export default App;
