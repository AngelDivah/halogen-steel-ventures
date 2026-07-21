import "./GetPrice.css";
import { useState } from "react";

export default function GetPrice() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    const whatsappMessage = `Hello Halogen Steel Venture,

My Name: ${name}

Phone: ${phone}

Product Needed: ${product}

Project Details:
${message}

Please send me the price.`;

    window.open(
      `https://wa.me/2347035742676?text=${encodeURIComponent(whatsappMessage)}`,
      "_blank"
    );

  };

  return (

    <section
      className="get-price"
      id="quote"
    >

      <div className="price-container">

        <span>GET PRICE</span>

        <h2>Need a Price?</h2>

        <p>

          Tell us what you need and we'll reply instantly on WhatsApp.

        </p>

        <input
          type="text"
          placeholder="Your Name"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e)=>setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Product Needed"
          onChange={(e)=>setProduct(e.target.value)}
        />

        <textarea
          placeholder="Describe your project..."
          rows="6"
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Get Price on WhatsApp
        </button>

      </div>

    </section>

  );

}