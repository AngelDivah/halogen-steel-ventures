import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";
import categories from "../data/categories";

import "./AddProduct.css";

export default function EditProduct() {

  const { id } = useParams();

  console.log("Route ID:", id);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    subCategory: "",
    price: "",
    measurement: "",
    description: "",
  });

  useEffect(() => {

    getProduct();

  }, [id]);

  const getProduct = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.log("GET ERROR:", error);
      return;
    }

    console.log("Loaded Product:", data);

    setProduct({
      title: data.title,
      category: data.category,
      subCategory: data.subcategory,
      price: data.price,
      measurement: data.measurement,
      description: data.description,
    });

  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("Updating Product:", id);

    const { data, error } = await supabase
      .from("products")
      .update({
        title: product.title,
        category: product.category,
        subcategory: product.subCategory,
        price: Number(product.price),
        measurement: product.measurement,
        description: product.description,
      })
      .eq("id", id)
      .select();

    console.log("UPDATE RESULT:", data);

    if (error) {
      console.log("UPDATE ERROR:", error);
      alert(error.message);
      return;
    }

    alert("✅ Product Updated Successfully");

  };

  return (

    <Layout>

      <div className="add-product-page">

        <h1>Edit Product</h1>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Product Name</label>

            <input
              name="title"
              value={product.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Sub Category</label>

            <input
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Measurement</label>

            <input
              name="measurement"
              value={product.measurement}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>

          <button
            className="save-btn"
            type="submit"
          >
            Update Product
          </button>

        </form>

      </div>

    </Layout>

  );

}