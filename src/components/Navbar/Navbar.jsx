import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaWhatsapp,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

import CartDrawer from "../CartDrawer/CartDrawer";

import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  return (
    <>
      <nav className="navbar">

        {/* Mobile Menu Icon */}

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Logo */}

        <div className="logo">
          <span className="gold">
         
            <br />
           
          </span>

          <span className="blue">
            Stainless & Steel Venture
          </span>
        </div>

        {/* Mobile Cart */}

        <div
          className="mobile-cart"
          onClick={() => setCartOpen(true)}
        >
          <FaShoppingCart />

          {totalItems > 0 && (
            <span>{totalItems}</span>
          )}
        </div>

        {/* Navigation */}

        <ul
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={closeMenu}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/gallery" onClick={closeMenu}>
              Gallery
            </Link>
          </li>

          <li>
            <Link to="/track-order" onClick={closeMenu}>
              Track Order
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link to="/my-orders" onClick={closeMenu}>
                  My Orders
                </Link>
              </li>

              <li>
                <Link to="/profile" onClick={closeMenu}>
                  Profile
                </Link>
              </li>
            </>
          )}

          {!user ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" onClick={closeMenu}>
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                className="mobile-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}

          {/* Mobile WhatsApp */}

          <div className="mobile-buttons">
            <a
              href="https://wa.me/2348143763866"
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp />
              WhatsApp
            </a>
          </div>

        </ul>

        {/* Desktop Buttons */}

        <div className="nav-buttons">

          <div
            className="cart-icon"
            onClick={() => setCartOpen(true)}
          >
            <FaShoppingCart />

            {totalItems > 0 && (
              <span>{totalItems}</span>
            )}
          </div>

          {!user ? (
            <>
              <Link
                to="/login"
                className="quote-btn"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="quote-btn"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="quote-btn"
              >
                My Account
              </Link>

              <button
                className="quote-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

          <a
            href="https://wa.me/2348143763866"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

        </div>

      </nav>

      <CartDrawer
        open={cartOpen}
        close={() => setCartOpen(false)}
      />
    </>
  );
}