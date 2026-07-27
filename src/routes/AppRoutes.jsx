import { BrowserRouter, Routes, Route } from "react-router-dom";

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

/* Admin */
import Dashboard from "../admin/pages/Dashboard";
import AdminProducts from "../admin/pages/Products";
import AddProduct from "../admin/pages/AddProduct";
import Orders from "../admin/pages/Orders";
import Settings from "../admin/pages/Settings";
import Categories from "../admin/pages/Categories";
import EditProduct from "../admin/pages/EditProduct";
import AdminLogin from "../admin/pages/Login";

import AdminRoute from "../admin/routes/AdminRoute";

import TrackOrder from "../pages/TrackOrder/TrackOrder";
import MyOrders from "../pages/MyOrders/MyOrders";
import Profile from "../pages/Profile/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* WEBSITE */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />
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

        {/* ADMIN LOGIN */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

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

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />

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