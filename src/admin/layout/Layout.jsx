import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import supabase from "../../lib/supabase";
import "./Layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="admin-layout">
      {/* Mobile Menu Button */}
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars />
      </button>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        {/* Close Button (Mobile) */}
        <button
          className="close-menu"
          onClick={closeMenu}
        >
          <FaTimes />
        </button>

        <h2>HALOGEN</h2>

        <NavLink
          to="/admin"
          onClick={closeMenu}
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={closeMenu}
        >
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={closeMenu}
        >
          <FaClipboardList />
          Orders
        </NavLink>

        <NavLink
          to="/admin/categories"
          onClick={closeMenu}
        >
          <FaTags />
          Categories
        </NavLink>

        <NavLink
          to="/admin/settings"
          onClick={closeMenu}
        >
          <FaCog />
          Settings
        </NavLink>

        <button
          className="logout-btn"
          onClick={async () => {
            closeMenu();
            await logout();
          }}
        >
          <FaSignOutAlt />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}