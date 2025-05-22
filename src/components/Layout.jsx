import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      <Link to="/">
        <img src="/img/img1.png" alt="Company Logo" className="logo" />
      </Link>
      <nav>
        <Link to="/" className="home-btn">Home</Link>
      </nav>
    </header>

    <main>{children}</main>

    <footer>
      &copy; 2025 PLC Constructors Inc. All rights reserved.
    </footer>
  </div>
);

export default Layout;