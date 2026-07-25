import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Products.css";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [category, setCategory] = useState("All");

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
    ...new Set(products.map((item) => item.category)),
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

        {categories.map((item) => (

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

        ))}

      </div>

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <ProductCard
            key={product.id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}