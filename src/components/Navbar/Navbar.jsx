import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaWhatsapp,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import CartDrawer from "../CartDrawer/CartDrawer";

import "./Navbar.css";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cart } = useCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>

      <nav className="navbar">

        <div className="logo">

          <span className="gold">HALOGEN</span>

          <span className="blue">
            Stainless & Steel Venture
          </span>

        </div>

        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>

          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
          </li>

          <li>
            <Link to="/gallery" onClick={() => setMenuOpen(false)}>
              Projects
            </Link>
          </li>

          <li>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
          </li>

          <div className="mobile-buttons">

            <a
              href="https://wa.me/2347035742676"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              <FaWhatsapp />
              WhatsApp
            </a>

            <a
              href="#quote"
              className="quote-btn"
            >
              Get Quote
            </a>

          </div>

        </ul>

        <div className="nav-buttons">

          <div
            className="cart-icon"
            onClick={() => setCartOpen(true)}
          >
            <FaShoppingCart />
            <span>{totalItems}</span>
          </div>

          <a
            href="https://wa.me/2347035742676"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <FaWhatsapp />
            WhatsApp
          </a>

          <a
            href="#quote"
            className="quote-btn"
          >
            Get Quote
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