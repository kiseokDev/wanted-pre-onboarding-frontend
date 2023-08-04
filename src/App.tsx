import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { SignUp, SignIn, Todo } from './pages/index';



function App() {
  const token = localStorage.getItem('jwt');
  console.log(token);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={token ? <Navigate to="/todo" /> : <SignIn />} />
        <Route path="/signup" element={token ? <Navigate to="/todo" /> : <SignUp />} />
        <Route path="/todo" element={!token ? <Navigate to="/signin" /> : <Todo />} />
      </Routes>
    </Router>
  );
}


export default App;
