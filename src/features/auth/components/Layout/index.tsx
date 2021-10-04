import React from 'react';

import './Layout.css';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="container">
      <div className="auth-content">{children}</div>
    </div>
  );
};

export default Layout;
