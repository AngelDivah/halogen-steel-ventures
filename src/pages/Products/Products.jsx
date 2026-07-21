import { useState } from "react";
import products from "../../data/products";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Products.css";

export default function Products() {

  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Carports",
    "Stainless Gates",
    "Stainless Steel Railings",
    "Tempered Glass"
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (product) => product.category === category
        );

  return (

    <section className="products-page">

      <div className="products-header">

        <h1>Our Products</h1>

        <p>
          Browse all available products.
        </p>

      </div>

      <div className="category-filter">

        {

          categories.map((item) => (

            <button

              key={item}

              className={
                category === item
                  ? "active-category"
                  : ""
              }

              onClick={() => setCategory(item)}

            >

              {item}

            </button>

          ))

        }

      </div>

      <div className="products-grid">

        {

          filteredProducts.map((product) => (

            <ProductCard

              key={product.id}

              product={product}

            />

          ))

        }

      </div>

    </section>

  );

}