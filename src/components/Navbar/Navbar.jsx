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

  const handleLogout = async () => {

    await logout();

    setMenuOpen(false);

  };

  return (

    <>

      <nav className="navbar">

        <div className="logo">

          <span className="gold">

            HALOGEN

          </span>

          <span className="blue">

            Stainless & Steel Venture

          </span>

        </div>

        <div
          className="menu-icon"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >

          {menuOpen ? <FaTimes /> : <FaBars />}

        </div>

        <ul
          className={
            menuOpen
              ? "nav-links active"
              : "nav-links"
          }
        >

          <li>

            <Link
              to="/"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Home

            </Link>

          </li>

          <li>

            <Link
              to="/products"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Shop

            </Link>

          </li>

          <li>

            <Link
              to="/gallery"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Projects

            </Link>

          </li>

          <li>

            <Link
              to="/track-order"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Track Order

            </Link>

          </li>

          <li>

            <Link
              to="/contact"
              onClick={() =>
                setMenuOpen(false)
              }
            >

              Contact

            </Link>

          </li>

          {

            !user ? (

              <>
{user ? (
  <>
    <li>
      <Link
        to="/profile"
        onClick={() => setMenuOpen(false)}
      >
        My Account
      </Link>
    </li>

    <li>
      <button
        className="logout-link"
        onClick={logout}
      >
        Logout
      </button>
    </li>
  </>
) : (
  <>
    <li>
      <Link
        to="/login"
        onClick={() => setMenuOpen(false)}
      >
        Login
      </Link>
    </li>

    <li>
      <Link
        to="/register"
        onClick={() => setMenuOpen(false)}
      >
        Sign Up
      </Link>
    </li>
  </>
)}

                <li>

                  <Link
                    to="/register"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >

                    Sign Up

                  </Link>

                </li>

              </>

            ) : (

              <>

                <li>

                  <Link
                    to="/my-orders"
                    onClick={() =>
                      setMenuOpen(false)
                    }
                  >

                    My Account

                  </Link>

                </li>

                <li>

                  <button
                    className="mobile-logout"
                    onClick={handleLogout}
                  >

                    Logout

                  </button>

                </li>

              </>

            )

          }

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

          </div>

        </ul>

        <div className="nav-buttons">

          <div
            className="cart-icon"
            onClick={() =>
              setCartOpen(true)
            }
          >

            <FaShoppingCart />

            <span>

              {totalItems}

            </span>

          </div>

          {

            !user ? (

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
                  to="/my-orders"
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

            )

          }

          <a
            href="https://wa.me/2347035742676"
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >

            <FaWhatsapp />

            WhatsApp

          </a>

        </div>

      </nav>

      <CartDrawer
        open={cartOpen}
        close={() =>
          setCartOpen(false)
        }
      />

    </>

  );

}