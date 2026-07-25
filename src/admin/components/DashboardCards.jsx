import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

import supabase from "../../lib/supabase";

import "./DashboardCards.css";

export default function DashboardCards() {

  const [stats, setStats] = useState({
    total_products: 0,
    total_categories: 0,
    total_orders: 0,
    total_revenue: 0,
    pending_orders: 0,
    processing_orders: 0,
    completed_orders: 0,
  });

  useEffect(() => {

    loadDashboard();

  }, []);

  const loadDashboard = async () => {

    const { data, error } = await supabase
      .from("dashboard_stats")
      .select("*")
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setStats(data);

  };

  return (

    <div className="dashboard-cards">

      <div className="dashboard-card">

        <FaBoxOpen className="card-icon" />

        <div>

          <h4>Products</h4>

          <h2>{stats.total_products}</h2>

        </div>

      </div>

      <div className="dashboard-card">

        <FaClipboardList className="card-icon" />

        <div>

          <h4>Orders</h4>

          <h2>{stats.total_orders}</h2>

        </div>

      </div>

      <div className="dashboard-card">

        <FaMoneyBillWave className="card-icon" />

        <div>

          <h4>Revenue</h4>

          <h2>
            ₦
            {Number(
              stats.total_revenue || 0
            ).toLocaleString()}
          </h2>

        </div>

      </div>

      <div className="dashboard-card">

        <FaUsers className="card-icon" />

        <div>

          <h4>Categories</h4>

          <h2>{stats.total_categories}</h2>

        </div>

      </div>

    </div>

  );

}