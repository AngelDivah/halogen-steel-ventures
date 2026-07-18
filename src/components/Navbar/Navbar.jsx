import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-main">HALOGEN</span>
        <span className="logo-sub">Stainless & Steel Venture</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/products">Projects</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/register" className="quote-btn">
          Get Quote
        </Link>
      </div>
    </nav>
  );
}