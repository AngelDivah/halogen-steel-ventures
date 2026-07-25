import { FaBell, FaUserCircle } from "react-icons/fa";

import "./Topbar.css";

export default function Topbar() {
  return (
    <header className="topbar">

      <div>

        <h2>Dashboard</h2>

        <p>Welcome back, Admin.</p>

      </div>

      <div className="topbar-right">

        <FaBell className="icon" />

        <div className="profile">

          <FaUserCircle className="user-icon" />

          <div>

            <h4>Administrator</h4>

            <span>Halogen Steel Ventures</span>

          </div>

        </div>

      </div>

    </header>
  );
}