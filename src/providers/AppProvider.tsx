import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <Router>
      <AuthProvider>{children}</AuthProvider>
    </Router>
  );
};

export default AppProvider;
