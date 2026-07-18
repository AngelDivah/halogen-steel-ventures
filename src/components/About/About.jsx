import "./About.css";
import { FaShieldAlt, FaAward, FaTools, FaUsers } from "react-icons/fa";

export default function About() {
  return (
    <section className="about">

      <div className="about-left">

        <span className="section-tag">
          WHO WE ARE
        </span>

        <h2>
          Building Strong,
          <br />
          Beautiful &
          Reliable Steel Structures.
        </h2>

        <p>
          Halogen Stainless & Steel Venture specializes in premium
          stainless steel fabrication, aluminium works,
          electric fencing, modern gates, railings,
          cubicles and custom engineering solutions.
        </p>

        <p>
          Our mission is to deliver durable craftsmanship,
          modern aesthetics and professional installation
          for residential, commercial and industrial clients.
        </p>

      </div>

      <div className="about-right">

        <div className="card">
          <FaAward />
          <h3>Premium Quality</h3>
          <p>Top-grade materials with excellent finishing.</p>
        </div>

        <div className="card">
          <FaTools />
          <h3>Professional Installation</h3>
          <p>Experienced craftsmen delivering precision.</p>
        </div>

        <div className="card">
          <FaShieldAlt />
          <h3>Guaranteed Durability</h3>
          <p>Built to withstand time and weather.</p>
        </div>

        <div className="card">
          <FaUsers />
          <h3>Customer Satisfaction</h3>
          <p>Every project completed with excellence.</p>
        </div>

      </div>

    </section>
  );
}