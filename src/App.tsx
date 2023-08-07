import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './components';
import { useContext } from 'react';
import { SignInPage, SignUpPage, TodoPage } from './pages';

const App: React.FC = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={token ? <Navigate to="/todo" /> : <SignInPage />} />
        <Route path="/signup" element={token ? <Navigate to="/todo" /> : <SignUpPage />} />
        <Route path="/todo" element={!token ? <Navigate to="/signin" /> : <TodoPage />} />
      </Routes>
    </Router>
  );
}

const WrappedApp: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default WrappedApp;