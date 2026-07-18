import "./Hero.css";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";

import hero1 from "../../assets/images/hero/hero1.jpg";
import hero2 from "../../assets/images/hero/hero2.jpg";
import hero3 from "../../assets/images/hero/hero3.jpg";
import hero4 from "../../assets/images/hero/hero4.jpg";

export default function Hero() {

  const images = [hero1, hero2, hero3, hero4];

  const [current, setCurrent] = useState(0);

  useEffect(() => {

    const slider = setInterval(() => {

      setCurrent((prev) => (prev + 1) % images.length);

    }, 5000);

    return () => clearInterval(slider);

  }, []);

  return (

    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(rgba(8,22,40,.72), rgba(8,22,40,.72)), url(${images[current]})`
      }}
    >

      <div className="hero-content">

        <span className="hero-tag">
          Stainless Steel • Aluminium • Engineering Excellence
        </span>

        <h1>
          Premium Stainless Steel
          <br />
          Solutions Built To Last.
        </h1>

        <p>
          Halogen Stainless & Steel Venture delivers premium stainless steel
          railings, electric fencing, aluminium works, modern gates,
          carports, cubicles and custom fabrication with outstanding
          craftsmanship.
        </p>

        <div className="hero-buttons">

          <Link to="/register" className="hero-btn-primary">
            Get Free Quote
            <FaArrowRight />
          </Link>

          <Link to="/services" className="hero-btn-secondary">
            Our Services
          </Link>

        </div>

      </div>

    </section>

  );
}