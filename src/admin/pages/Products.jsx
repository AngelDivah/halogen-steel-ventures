import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link } from "react-router-dom";
import supabase from "../../lib/supabase";

import "./Products.css";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data);

  };

  useEffect(() => {

    getProducts();

  }, []);

  const deleteProduct = async (id) => {

    if (!confirm("Delete this product?")) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getProducts();

  };

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

            {products.map((product) => (

              <tr key={product.id}>

                <td>

                  <img
                    src={product.cover}
                    alt={product.title}
                    width="70"
                  />

                </td>

                <td>{product.title}</td>

                <td>{product.category}</td>

                <td>
                  ₦{Number(product.price).toLocaleString()}
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
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}