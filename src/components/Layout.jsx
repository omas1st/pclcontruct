import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      <Link to="/">
        <img src="/img/img1.png" alt="Company Logo" className="logo" />
      </Link>
      {/* Hiring banner with plain text */}
      <div className="hiring-banner">
        We are hiring! Apply now
      </div>
    </header>

    <main>{children}</main>

    <footer>
      &copy; 2025 PCL Constructors Inc. All rights reserved.
    </footer>
  </div>
);

export default Layout;