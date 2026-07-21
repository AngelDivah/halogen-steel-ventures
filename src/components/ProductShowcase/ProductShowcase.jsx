import "./ProductShowcase.css";

import { useState } from "react";

import categories from "../../data/categories";
import products from "../../data/products";

import ProductCard from "../ProductCard/ProductCard";

export default function ProductShowcase() {

  const [activeCategory, setActiveCategory] = useState("Carports");

  const filteredProducts = products.filter(
    product => product.category === activeCategory
  );

  return (

    <section className="showcase">

      <div className="showcase-header">

        <h2>Featured Products</h2>

        <p>
          Browse our premium stainless steel and aluminium products.
        </p>

      </div>

      <div className="category-navigation">

        {categories.map(category => (

          <button

            key={category.id}

            className={
              activeCategory === category.name
                ? "active-category"
                : ""
            }

            onClick={() =>
              setActiveCategory(category.name)
            }

          >

            {category.name}

          </button>

        ))}

      </div>

      <div className="products-grid">

        {filteredProducts.map(product => (

          <ProductCard

            key={product.id}

            product={product}

          />

        ))}

      </div>

    </section>

  );

}