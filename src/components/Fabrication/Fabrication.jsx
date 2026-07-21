import "./Fabrication.css";
import { Link } from "react-router-dom";

export default function Fabrication() {
  return (
    <section className="fabrication">

      <div className="fabrication-overlay"></div>

      <div className="fabrication-content">

        <span>CUSTOM FABRICATION</span>

        <h2>
          Crafted To Your
          <br />
          Exact Specifications
        </h2>

        <p>
          Whether you need custom steel gates, stainless railings,
          aluminium windows, security doors or any special fabrication,
          our experienced team delivers precision workmanship with
          premium-quality materials.
        </p>

        <div className="fabrication-buttons">

          <Link to="/contact" className="fabrication-btn">
            Request Custom Quote
          </Link>

          <Link to="/products" className="fabrication-btn-outline">
            Browse Products
          </Link>

        </div>

      </div>

    </section>
  );
}