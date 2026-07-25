import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaTags,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import supabase from "../../lib/supabase";

import "./Layout.css";

export default function Layout({ children }) {

  const navigate = useNavigate();

  const logout = async () => {

    await supabase.auth.signOut();

    navigate("/admin/login");

  };

  return (

    <div className="admin-layout">

      <aside className="sidebar">

        <h2>HALOGEN</h2>

        <NavLink to="/admin">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/admin/products">
          <FaBoxOpen />
          Products
        </NavLink>

        <NavLink to="/admin/orders">
          <FaClipboardList />
          Orders
        </NavLink>

        <NavLink to="/admin/categories">
          <FaTags />
          Categories
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          Settings
        </NavLink>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      <main className="admin-content">

        {children}

      </main>

    </div>

  );

}