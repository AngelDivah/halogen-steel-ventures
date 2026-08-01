import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Categories.css";

export default function Categories() {

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

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

  async function addCategory() {

    const name = category.trim();

    if (!name) {

      alert("Please enter a category.");

      return;

    }

    setLoading(true);

    try {

      // Check if category already exists
      const { data: existing, error: checkError } =
        await supabase
          .from("categories")
          .select("id")
          .ilike("name", name);

      if (checkError) throw checkError;

      if (existing.length > 0) {

        alert("Category already exists.");

        setLoading(false);

        return;

      }

      const { error } = await supabase
        .from("categories")
        .insert([
          {
            name,
          },
        ]);

      if (error) throw error;

      setCategory("");

      await fetchCategories();

      alert("✅ Category Added Successfully");

    }

    catch (error) {

      console.log(error);

      alert(error.message);

    }

    finally {

      setLoading(false);

    }

  }

  async function deleteCategory(id) {

    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {

      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchCategories();

      alert("Category Deleted");

    }

    catch (error) {

      console.log(error);

      alert(error.message);

    }

  }

  return (

    <Layout>

      <div className="categories-page">

        <div className="categories-header">

          <h1>Categories</h1>

        </div>

        <div className="add-category">

          <input
            type="text"
            placeholder="New Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            onKeyDown={(e) => {

              if (e.key === "Enter") {

                e.preventDefault();

                addCategory();

              }

            }}
          />

          <button
            onClick={addCategory}
            disabled={loading}
          >

            {loading ? "Adding..." : "Add Category"}

          </button>

        </div>

        <table>

          <thead>

            <tr>

              <th>Category</th>

              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {categories.length === 0 ? (

              <tr>

                <td
                  colSpan="2"
                  style={{ textAlign: "center" }}
                >

                  No Categories Found

                </td>

              </tr>

            ) : (

              categories.map((item) => (

                <tr key={item.id}>

                  <td>{item.name}</td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteCategory(item.id)
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

      </div>

    </Layout>

  );

}