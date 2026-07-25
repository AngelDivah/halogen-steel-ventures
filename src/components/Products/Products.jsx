import { useState, useEffect } from "react";
import supabase from "../../lib/supabase";

import "./Products.css";

import ProductCard from "../../components/ProductCard/ProductCard";

export default function Products() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

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

    ...new Set(products.map(item => item.category))

  ];

  const filteredProducts = products.filter((item) => {

    const searchTerm = search.trim().toLowerCase();

    const searchableFields = [

      item.title,

      item.category,

      item.subcategory,

      item.description,

      item.measurement,

    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesSearch =

      searchTerm === "" ||

      searchableFields.includes(searchTerm);

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
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
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

      {filteredProducts.length === 0 ? (

        <div className="no-products">

          <h3>No products found.</h3>

          <p>Try another keyword or category.</p>

        </div>

      ) : (

        <div className="products-grid">

          {filteredProducts.map((product) => (

            <ProductCard

              key={product.id}

              product={product}

            />

          ))}

        </div>

      )}

    </section>

  );

}