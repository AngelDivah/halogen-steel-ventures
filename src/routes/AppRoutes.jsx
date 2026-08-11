
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* =========================
   WEBSITE PAGES
========================= */

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Products from "../pages/Products";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Checkout from "../pages/Checkout/Checkout";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import TrackOrder from "../pages/TrackOrder/TrackOrder";
import MyOrders from "../pages/MyOrders/MyOrders";
import Profile from "../pages/Profile/Profile";

/* =========================
   ADMIN PAGES
========================= */

import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import AddProduct from "../admin/pages/AddProduct";
import EditProduct from "../admin/pages/EditProduct";
import Orders from "../admin/pages/Orders";
import Categories from "../admin/pages/Categories";
import Reviews from "../admin/pages/Reviews";
import Settings from "../admin/pages/Settings";
import AdminProjects from "../admin/pages/Projects";
import AdminLogin from "../admin/pages/Login";

import AdminRoute from "../admin/routes/AdminRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================
            WEBSITE
        ================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        {/* =================================
            PUBLIC PROJECT GALLERY
        ================================= */}

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/track-order"
          element={<TrackOrder />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* =================================
            ADMIN DASHBOARD
        ================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN PRODUCTS
        ================================= */}

        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN ORDERS
        ================================= */}

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN PROJECTS
        ================================= */}

        <Route
          path="/admin/projects"
          element={
            <AdminRoute>
              <AdminProjects />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN CATEGORIES
        ================================= */}

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN REVIEWS
        ================================= */}

        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <Reviews />
            </AdminRoute>
          }
        />

        {/* =================================
            ADMIN SETTINGS
        ================================= */}

        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

