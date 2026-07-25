import {
  FaHome,
  FaBoxOpen,
  FaPlus,
  FaFolderOpen,
  FaClipboardList,
  FaCog,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <h2>HALOGEN</h2>
        <span>ADMIN PANEL</span>
      </div>

      <nav>

        <NavLink to="/admin">
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/products">
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/add-product">
          <FaPlus />
          <span>Add Product</span>
        </NavLink>

        <NavLink to="/admin/categories">
          <FaFolderOpen />
          <span>Categories</span>
        </NavLink>

        <NavLink to="/admin/orders">
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

    </aside>
  );
}