import "./FeaturedProducts.css";

import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

import supabase from "../../lib/supabase";

export default function FeaturedProducts() {

  const slider = useRef();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    getProducts();

  }, []);

  const getProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(8);

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data);

  };

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

        {products.map((product) => (

          <div
            className="featured-card"
            key={product.id}
          >

            <img
              src={product.cover}
              alt={product.title}
            />

            <div className="featured-info">

              <p>{product.category}</p>

              <h3>{product.title}</h3>

              <h4>

                ₦{Number(product.price).toLocaleString()}

              </h4>

              <div className="featured-buttons">

                <Link
                  to={`/products/${product.id}`}
                  className="view-btn"
                >

                  View Product

                </Link>

                <button className="cart-btn">

                  Add To Cart

                </button>

                <a
                  href={`https://wa.me/2347035742676?text=I'm interested in ${encodeURIComponent(product.title)}`}
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