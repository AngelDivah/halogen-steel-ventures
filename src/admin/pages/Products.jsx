import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Products.css";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  // Extract filename from a Supabase public URL
  function getFilePath(url) {
    if (!url) return null;

    const marker = "/storage/v1/object/public/products/";

    const index = url.indexOf(marker);

    if (index === -1) return null;

    return decodeURIComponent(
      url.substring(index + marker.length)
    );
  }

  async function deleteProduct(id) {
    const confirmed = window.confirm(
      "Delete this product permanently?"
    );

    if (!confirmed) return;

    try {
      // Get product first
      const { data: product, error: fetchError } =
        await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

      if (fetchError) throw fetchError;

      // Collect every storage file
      let files = [];

      if (product.cover) {
        const coverPath = getFilePath(product.cover);

        if (coverPath) files.push(coverPath);
      }

      if (Array.isArray(product.images)) {
        product.images.forEach((image) => {
          const path = getFilePath(image);

          if (path && !files.includes(path)) {
            files.push(path);
          }
        });
      }

      // Delete images from storage
      if (files.length > 0) {
        const { error: storageError } =
          await supabase.storage
            .from("products")
            .remove(files);

        if (storageError) {
          console.error(storageError);
        }
      }

      // Delete database row
      const { error: deleteError } =
        await supabase
          .from("products")
          .delete()
          .eq("id", id);

      if (deleteError) throw deleteError;

      // Remove from UI instantly
      setProducts((prev) =>
        prev.filter((item) => item.id !== id)
      );

      alert("✅ Product deleted successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <Layout>
      <div className="admin-products">
        <div className="admin-products-header">
          <h1>Products</h1>

          <Link
            to="/admin/add-product"
            className="add-product-btn"
          >
            + Add Product
          </Link>
        </div>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Loading Products...
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center" }}
                  >
                    No Products Found
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.cover}
                        alt={product.title}
                        width="75"
                        loading="lazy"
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                        }}
                      />
                    </td>

                    <td>{product.title}</td>

                    <td>{product.category}</td>

                    <td>
                      ₦
                      {Number(product.price).toLocaleString()}
                    </td>

                    <td>
                      <Link
                        to={`/admin/edit-product/${product.id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>
                    </td>

                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}