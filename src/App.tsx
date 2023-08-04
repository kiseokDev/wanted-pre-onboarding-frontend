import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignUpPage, SignInPage, TodoPage } from './pages/index';



function App() {
  const token = localStorage.getItem('jwt');
  console.log(token);

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


export default App;
