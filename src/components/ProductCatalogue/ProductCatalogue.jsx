import "./ProductCatalogue.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase";

export default function ProductCatalogue() {

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  useEffect(() => {

    fetchProducts();

    fetchCategories();

  }, []);

  async function fetchProducts() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data || []);

  }

  async function fetchCategories() {

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {

      console.log(error);

      return;

    }

    setCategories(data || []);

  }

  const filteredProducts =

    activeCategory === "All"

      ? products

      : products.filter(

          product =>
            product.category === activeCategory

        );

  return (

    <section className="catalogue">

      <div className="catalogue-title">

        <span>OUR PRODUCTS</span>

        <h2>Browse Our Products</h2>

      </div>

      <div className="category-tabs">

        <button
          className={
            activeCategory === "All"
              ? "tab active-tab"
              : "tab"
          }
          onClick={() =>
            setActiveCategory("All")
          }
        >
          All
        </button>

        {categories.map((category) => (

          <button

            key={category.id}

            className={
              activeCategory === category.name
                ? "tab active-tab"
                : "tab"
            }

            onClick={() =>
              setActiveCategory(category.name)
            }

          >

            {category.name}

          </button>

        ))}

      </div>

      <div className="catalogue-grid">

        {filteredProducts.length === 0 ? (

          <div className="no-products">

            No Products Found

          </div>

        ) : (

          filteredProducts.map((product) => (

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

                  ₦
                  {Number(
                    product.price
                  ).toLocaleString()}

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

          ))

        )}

      </div>

    </section>

  );

}