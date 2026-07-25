import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Dashboard.css";

export default function Dashboard() {

  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    totalSales: 0,
    customers: 0,
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    const { data: orders } = await supabase
      .from("orders")
      .select("*");

    const { count } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    const totalSales =
      orders
        ?.filter(order => order.payment_status === "Paid")
        .reduce((sum, order) => sum + Number(order.total), 0) || 0;

    setStats({

      totalOrders: orders?.length || 0,

      pendingOrders:
        orders?.filter(
          order => order.payment_status === "Pending"
        ).length || 0,

      completedOrders:
        orders?.filter(
          order => order.order_status === "Completed"
        ).length || 0,

      cancelledOrders:
        orders?.filter(
          order => order.order_status === "Cancelled"
        ).length || 0,

      totalSales,

      customers: count || 0,

    });

  };

  return (

    <Layout>

      <div className="dashboard">

        <h1>Dashboard</h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <h3>Total Orders</h3>
            <h2>{stats.totalOrders}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Pending Payments</h3>
            <h2>{stats.pendingOrders}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Completed Orders</h3>
            <h2>{stats.completedOrders}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Cancelled Orders</h3>
            <h2>{stats.cancelledOrders}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Total Sales</h3>
            <h2>₦{stats.totalSales.toLocaleString()}</h2>
          </div>

          <div className="dashboard-card">
            <h3>Customers</h3>
            <h2>{stats.customers}</h2>
          </div>

        </div>

      </div>

    </Layout>

  );

}