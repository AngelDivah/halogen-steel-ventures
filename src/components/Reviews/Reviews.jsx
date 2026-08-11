import "./Reviews.css";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabase";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    review: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setReviews(data || []);
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      form.name.trim() === "" ||
      form.review.trim() === ""
    ) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("reviews")
      .insert([
        {
          name: form.name,
          rating: Number(form.rating),
          review: form.review,
          approved: false,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Thank you! Your review has been submitted and is awaiting approval."
    );

    setForm({
      name: "",
      rating: 5,
      review: "",
    });
  }

  return (
    <section className="reviews">

      <div className="reviews-title">
        <span>TESTIMONIALS</span>
        <h2>What Our Customers Say</h2>
      </div>

      <form
        className="review-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="rating"
          value={form.rating}
          onChange={handleChange}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea
          rows="5"
          name="review"
          placeholder="Write your review..."
          value={form.review}
          onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </form>

      <div className="reviews-grid">

        {reviews.map((item) => (

          <div
            className="review-card"
            key={item.id}
          >

            <div className="review-stars">
              {"⭐".repeat(item.rating)}
            </div>

            <p>{item.review}</p>

            <h4>— {item.name}</h4>

          </div>

        ))}

      </div>

    </section>
  );
}