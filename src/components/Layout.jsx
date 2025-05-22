import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/shared.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      {/* Company logo linking to external site */}
      <a 
        href="https://www.pcl.com/us/en" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/img/img1.png" alt="Company Logo" className="logo" />
      </a>

      {/* Hiring banner with internal link */}
      <Link to="/" className="hiring-banner">
        We are hiring! <span className="apply-now">Apply now</span>
      </Link>
    </header>

    <main>{children}</main>

    <footer>
      &copy; 2025 PCL Constructors Inc. All rights reserved.
    </footer>
  </div>
);

export default Layout;