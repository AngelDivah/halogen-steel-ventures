import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Categories.css";

export default function Categories() {

  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    getCategories();

  }, []);

  const getCategories = async () => {

    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      console.log(error);
      return;
    }

    setCategories(data);

  };

  const addCategory = async () => {

    if (category.trim() === "") return;

    const { error } = await supabase
      .from("categories")
      .insert([
        {
          name: category,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setCategory("");

    getCategories();

  };

  const deleteCategory = async (id) => {

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    getCategories();

  };

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
            onChange={(e) => setCategory(e.target.value)}
          />

          <button onClick={addCategory}>

            Add Category

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

            {categories.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() => deleteCategory(item.id)}
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