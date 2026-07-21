import { useState } from "react";

import "./Products.css";

import products from "../../data/products";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Products() {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = products.filter((item) => {

    const matchesSearch =
      item.title
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      item.category === category;

    return matchesSearch && matchesCategory;

  });

  return (

    <section className="products">

      <div className="products-title">

        <span>OUR PRODUCTS</span>

        <h2>Browse Our Collection</h2>

      </div>

      <div className="products-filter">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          {categories.map((item) => (

            <option
              key={item}
              value={item}
            >
              {item}
            </option>

          ))}

        </select>

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