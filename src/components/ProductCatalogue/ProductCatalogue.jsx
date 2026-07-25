import "./ProductCatalogue.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase";

export default function ProductCatalogue() {

  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {

    getProducts();

  }, []);

  const getProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data);

  };

  const categories = [

    "All",

    ...new Set(products.map(product => product.category))

  ];

  const filteredProducts =

    activeCategory === "All"

      ? products

      : products.filter(

          product => product.category === activeCategory

        );

  return (

    <section className="catalogue">

      <div className="catalogue-title">

        <span>OUR PRODUCTS</span>

        <h2>Browse Our Products</h2>

      </div>

      <div className="category-tabs">

        {categories.map(category => (

          <button

            key={category}

            className={

              activeCategory === category

                ? "tab active-tab"

                : "tab"

            }

            onClick={() => setActiveCategory(category)}

          >

            {category}

          </button>

        ))}

      </div>

      <div className="catalogue-grid">

        {filteredProducts.map(product => (

          <div

            className="catalogue-card"

            key={product.id}

          >

            <img

              src={product.cover}

              alt={product.title}

            />

            <div className="catalogue-info">

              <span>

                {product.category}

                {product.subcategory &&
                  ` • ${product.subcategory}`}

              </span>

              <h3>

                {product.title}

              </h3>

              <p className="price">

                ₦{Number(product.price).toLocaleString()}

              </p>

              <p className="measurement">

                {product.measurement}

              </p>

              <Link

                to={`/products/${product.id}`}

                className="view-btn"

              >

                View Product

              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}