import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <span className="gold">HALOGEN</span>
        <span className="blue">Steel Venture</span>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link></li>
        <li><Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link></li>
        <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
        <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>

        <div className="mobile-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="quote-btn">Register</Link>
        </div>
      </ul>

      <div className="nav-buttons">
        <Link to="/login" className="login-btn">Login</Link>
        <Link to="/register" className="quote-btn">Register</Link>
      </div>
    </nav>
  );
}