import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

import "./Reviews.css";

export default function Reviews() {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {

    const { data, error } = await supabase
  .from("reviews")
  .select("*")
  .order("approved", { ascending: true })
  .order("created_at", { ascending: false });

   if (error) {
  console.log("Supabase Error:", error);
  return;
}

console.log("Rows Returned:", data);

    console.log("Fetched Reviews:", data);
setReviews(data || []);

  }

  async function approveReview(id) {

    const { error } = await supabase
      .from("reviews")
      .update({
        approved: true,
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchReviews();

  }

  async function deleteReview(id) {

    if (!window.confirm("Delete review?")) return;

    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchReviews();

  }

  return (

    <Layout>

      <div className="admin-reviews">

        <h1>Customer Reviews</h1>

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Approve</th>
              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr key={review.id}>

                <td>{review.name}</td>

                <td>{"⭐".repeat(review.rating)}</td>

                <td>{review.review}</td>

                <td>

                 <span
  style={{
    color: review.approved
      ? "#22c55e"
      : "#f59e0b",
    fontWeight: "bold",
  }}
>
  {review.approved
    ? "Approved"
    : "Pending"}
</span>

                </td>

                <td>

                  {!review.approved && (

                    <button
                      className="approve-btn"
                      onClick={() =>
                        approveReview(review.id)
                      }
                    >
                      Approve
                    </button>

                  )}

                </td>

                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteReview(review.id)
                    }
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