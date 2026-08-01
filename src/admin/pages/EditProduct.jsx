import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";
import "./AddProduct.css";

export default function EditProduct() {

  const { id } = useParams();

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
    existingImages: [],
  });

  useEffect(() => {

    fetchCategories();
    fetchProduct();

  }, [id]);

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

  async function fetchProduct() {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {

      console.log(error);
      return;

    }

    setProduct({
      title: data.title || "",
      category: data.category || "",
      subCategory: data.subcategory || "",
      price: data.price || "",
      measurement: data.measurement || "",
      description: data.description || "",
      images: [],
      existingImages: data.images || [],
    });

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

    const fileName =
      `${Date.now()}-${Math.random()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);

    return data.publicUrl;

  }


  async function deleteOldImages(images) {

    if (!images || images.length === 0) return;

    const files = images
      .map((url) => {

        const parts = url.split("/products/");

        return parts[1];

      })
      .filter(Boolean);

    if (files.length === 0) return;

    const { error } = await supabase.storage
      .from("products")
      .remove(files);

    if (error) {

      console.log("Delete Error:", error);

    }

  }


  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);

    try {

      // Keep old images
      const oldImages = [...product.existingImages];

      let imageUrls = [...oldImages];

      // Upload replacements if selected
      if (product.images.length > 0) {

        imageUrls = await Promise.all(
          product.images.map(uploadImage)
        );

      }

      // Update database
      const { error } = await supabase
        .from("products")
        .update({
          title: product.title,
          category: product.category,
          subcategory: product.subCategory,
          price: Number(product.price),
          measurement: product.measurement,
          description: product.description,
          cover: imageUrls[0] || "",
          images: imageUrls,
        })
        .eq("id", id);

      if (error) throw error;

      // Delete previous images ONLY after successful update
      if (
        product.images.length > 0 &&
        oldImages.length > 0
      ) {

        await deleteOldImages(oldImages);

      }

      alert("✅ Product Updated Successfully");

      fetchProduct();

    }

    catch (error) {

      console.log(error);

      alert(error.message);

    }

    finally {

      setLoading(false);

    }

  }
    return (

    <Layout>

      <div className="add-product-page">

        <h1>Edit Product</h1>

        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          {/* Product Name */}

          <div className="form-group">

            <label>Product Name</label>

            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />

          </div>

          {/* Category */}

          <div className="form-group">

            <label>Category</label>

            <input
              list="category-list"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            />

            <datalist id="category-list">

              {categories.map((cat) => (

                <option
                  key={cat.id}
                  value={cat.name}
                />

              ))}

            </datalist>

          </div>

          {/* Sub Category */}

          <div className="form-group">

            <label>Sub Category</label>

            <input
              name="subCategory"
              value={product.subCategory}
              onChange={handleChange}
            />

          </div>

          {/* Price */}

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

          {/* Measurement */}

          <div className="form-group">

            <label>Measurement</label>

            <input
              name="measurement"
              value={product.measurement}
              onChange={handleChange}
            />

          </div>

          {/* Description */}

          <div className="form-group full">

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
            />

          </div>

          {/* Current Images */}

          <div className="form-group full">

            <label>Current Images</label>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginBottom: "20px",
              }}
            >

              {product.existingImages.length > 0 ? (

                product.existingImages.map((image, index) => (

                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      border: "1px solid #ddd",
                    }}
                  />

                ))

              ) : (

                <p>No images uploaded.</p>

              )}

            </div>

          </div>

          {/* Replace Images */}

          <div className="form-group full">

            <label>Replace Images</label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
            />

            <small>

              Leave empty if you don't want to change the images.

            </small>

          </div>

          {/* Submit */}

          <button
            type="submit"
            className="save-btn"
            disabled={loading}
          >

            {loading
              ? "Updating Product..."
              : "Update Product"}

          </button>

        </form>

      </div>

    </Layout>

  );

}