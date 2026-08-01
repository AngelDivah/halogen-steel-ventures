import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import "./AddProduct.css";
import supabase from "../../lib/supabase";

export default function AddProduct() {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    title: "",
    category: "",
    subCategory: "",
    price: "",
    measurement: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

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

  function handleChange(e) {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleImages(e) {
    setProduct((prev) => ({
      ...prev,
      images: Array.from(e.target.files),
    }));
  }

  async function uploadImage(file) {
    const fileName = `${Date.now()}-${Math.random()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const imageUrls = await Promise.all(
        product.images.map(uploadImage)
      );

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

      if (error) throw error;

      alert("✅ Product Added Successfully!");

      await fetchCategories();

      setProduct({
        title: "",
        category: "",
        subCategory: "",
        price: "",
        measurement: "",
        description: "",
        images: [],
      });
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="add-product-page">
        <h1>Add Product</h1>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Product Name</label>

            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Premium Stainless Gate"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <input
              list="category-list"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Select or type category"
              required
            />

            <datalist id="category-list">
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.name}
                />
              ))}
            </datalist>
          </div>

          <div className="form-group">
            <label>Sub Category</label>

            <input
              type="text"
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
              type="text"
              name="measurement"
              value={product.measurement}
              onChange={handleChange}
              placeholder="12ft × 8ft"
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
            <label>Product Images</label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImages}
            />
          </div>

          <button
            className="save-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save Product"}
          </button>
        </form>
      </div>
    </Layout>
  );
}