import React from 'react';
import { Link } from 'react-router-dom';
import kldnsv from '../images/logo9.png'
const Header = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">  </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/rentcar" className="nav-link">Rent a Car</Link>
          </li>
          <li className="nav-item">
            <Link to="/aboutus" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
