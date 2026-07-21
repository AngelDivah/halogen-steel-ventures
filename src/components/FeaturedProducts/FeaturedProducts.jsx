import "./FeaturedProducts.css";

import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { useRef } from "react";

import products from "../../data/products";

export default function FeaturedProducts() {

  const slider = useRef();

  const next = () => {
    slider.current.scrollBy({
      left: 350,
      behavior: "smooth",
    });
  };

  const prev = () => {
    slider.current.scrollBy({
      left: -350,
      behavior: "smooth",
    });
  };

  return (

    <section className="featured-products">

      <div className="featured-header">

        <div>

          <span>FEATURED PRODUCTS</span>

          <h2>Best Selling Products</h2>

        </div>

        <div className="slider-buttons">

          <button onClick={prev}>
            <FaArrowLeft />
          </button>

          <button onClick={next}>
            <FaArrowRight />
          </button>

        </div>

      </div>

      <div
        className="product-slider"
        ref={slider}
      >

        {products
          .filter((product) => product.featured)
          .map((product) => (

            <div
              className="featured-card"
              key={product.id}
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <div className="featured-info">

                <p>{product.category}</p>

                <h3>{product.name}</h3>

                <h4>
                  ₦{product.price.toLocaleString()}
                </h4>

                <div className="featured-buttons">

                  <Link
                    to="/products"
                    className="view-btn"
                  >
                    View Product
                  </Link>

                  <button className="cart-btn">
                    Add To Cart
                  </button>

                  <a
                    href={`https://wa.me/2347035742676?text=I'm interested in ${product.name}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-card"
                  >
                    <FaWhatsapp />
                  </a>

                </div>

              </div>

            </div>

        ))}

      </div>

    </section>

  );

}