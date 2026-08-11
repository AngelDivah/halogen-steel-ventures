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
  FaStar,
  FaProjectDiagram,
} from "react-icons/fa";

import supabase from "../../lib/supabase";
import "./Layout.css";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="admin-layout">

      {/* Mobile Menu Button */}

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(true)}
        aria-label="Open admin menu"
      >
        <FaBars />
      </button>

      {/* Mobile Overlay */}

      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`sidebar ${
          menuOpen ? "open" : ""
        }`}
      >

        <button
          className="close-menu"
          onClick={closeMenu}
          aria-label="Close admin menu"
        >
          <FaTimes />
        </button>

        {/* Logo */}

        <div className="logo">
          <h2>HALOGEN</h2>
          <span>Admin Panel</span>
        </div>

        {/* Navigation */}

        <nav>

          <NavLink
            to="/admin"
            end
            onClick={closeMenu}
          >
            <FaHome />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            onClick={closeMenu}
          >
            <FaBoxOpen />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            onClick={closeMenu}
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/admin/projects"
            onClick={closeMenu}
          >
            <FaProjectDiagram />
            <span>Projects</span>
          </NavLink>

          <NavLink
            to="/admin/categories"
            onClick={closeMenu}
          >
            <FaTags />
            <span>Categories</span>
          </NavLink>

          <NavLink
            to="/admin/reviews"
            onClick={closeMenu}
          >
            <FaStar />
            <span>Reviews</span>
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={closeMenu}
          >
            <FaCog />
            <span>Settings</span>
          </NavLink>

        </nav>

        {/* Logout */}

        <button
          className="logout-btn"
          onClick={async () => {
            closeMenu();
            await logout();
          }}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </aside>

      {/* Main Content */}

      <main className="admin-content">
        {children}
      </main>

    </div>
  );
}