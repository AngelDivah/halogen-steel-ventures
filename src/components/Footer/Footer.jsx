import "./Footer.css";
import { Link } from "react-router-dom";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Company */}

        <div className="footer-about">

          <h2>
            <span>HALOGEN</span> Steel Venture
          </h2>

          <p>
            Premium stainless steel fabrication, aluminium works,
            carports, tempered glass railings, electric fencing,
            stainless railings, gates and custom engineering
            solutions built with exceptional craftsmanship.
          </p>

          <div className="socials">

            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a
              href="https://wa.me/2347035742676"
              target="_blank"
              rel="noreferrer"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

        {/* Navigation */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/products">Products</Link>

          <Link to="/gallery">Projects</Link>

          <Link to="/contact">Contact</Link>

        </div>

        {/* Categories */}

        <div className="footer-links">

          <h3>Categories</h3>

          <Link to="/products">Carports</Link>

          <Link to="/products">Stainless Gates</Link>

          <Link to="/products">Stainless Railings</Link>

          <Link to="/products">Tempered Glass Railings</Link>

          <Link to="/products">Protectors</Link>

        </div>

        {/* Contact */}

        <div className="footer-contact">

          <h3>Contact Us</h3>

          <p>
            <FaPhoneAlt />
            +234 703 574 2676
          </p>

          <p>
            <FaEnvelope />
            halogenstainlessschool@gmail.com
          </p>

          <p>
            <FaMapMarkerAlt />
            Office 1: Beside IDC Primary School,
            Along Ojo Ekun Road,
            Odo Ona,
            Orita Challenge,
            Ibadan,
            Oyo State.
          </p>

          <p>
            <FaMapMarkerAlt />
            Office 2: Opposite Princeway Diagnostics Centre,
            Akala Express,
            Ibadan,
            Oyo State.
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Halogen Stainless & Steel Venture.
          All Rights Reserved.
        </p>

        <p>
          Designed & Developed by <strong>CRUXIFIED FORGE</strong>
        </p>

      </div>

    </footer>
  );
} 