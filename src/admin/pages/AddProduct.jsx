import { useState } from "react";
import Layout from "../layout/Layout";
import "./AddProduct.css";
import supabase from "../../lib/supabase";
import categories from "../data/categories";

export default function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    category: "",
    subCategory: "",
    price: "",
    measurement: "",
    description: "",
    images: [],
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (e) => {
    setProduct({
      ...product,
      images: [...e.target.files],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrls = [];

    if (product.images.length > 0) {
      for (const image of product.images) {
        const fileName = `${Date.now()}-${image.name}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(fileName, image);

        if (uploadError) {
          console.log("UPLOAD ERROR:", uploadError);
          alert(uploadError.message);
          return;
        }

        const { data } = supabase.storage
          .from("products")
          .getPublicUrl(fileName);

        imageUrls.push(data.publicUrl);
      }
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          title: product.title,
          category: product.category,
          subcategory: product.subCategory,
          price: Number(product.price),
          measurement: product.measurement,
          description: product.description,
          cover: imageUrls[0] || "",
          images: imageUrls,
        },
      ]);

    if (error) {
      console.log("DATABASE ERROR:", error);
      alert(error.message);
      return;
    }

    alert("✅ Product Added Successfully!");

    setProduct({
      title: "",
      category: "",
      subCategory: "",
      price: "",
      measurement: "",
      description: "",
      images: [],
    });
  };

  return (
    <Layout>
      <div className="add-product-page">
        <h1>Add Product</h1>

        <form className="product-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>

            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Premium Stainless Gate"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
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
              placeholder="Sliding Gate"
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Measurement</label>

            <input
              name="measurement"
              value={product.measurement}
              onChange={handleChange}
              placeholder="12ft x 8ft"
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

          <div className="form-group full">
            <label>Images</label>

            <input
              type="file"
              multiple
              onChange={handleImages}
            />
          </div>

          <button
            type="submit"
            className="save-btn"
          >
            Save Product
          </button>
        </form>
      </div>
    </Layout>
  );
}