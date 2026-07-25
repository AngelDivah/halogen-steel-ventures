import "./ProductShowcase.css";

import { useState, useEffect } from "react";

import supabase from "../../lib/supabase";

import ProductCard from "../ProductCard/ProductCard";

export default function ProductShowcase() {

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState("");

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

    const uniqueCategories = [
      ...new Set(data.map(item => item.category))
    ];

    setCategories(uniqueCategories);

    if (uniqueCategories.length > 0) {

      setActiveCategory(uniqueCategories[0]);

    }

  };

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

            key={category}

            className={
              activeCategory === category
                ? "active-category"
                : ""
            }

            onClick={() => setActiveCategory(category)}

          >

            {category}

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