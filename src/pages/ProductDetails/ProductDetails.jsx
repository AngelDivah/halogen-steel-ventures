import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";

import supabase from "../../lib/supabase";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./ProductDetails.css";

export default function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [mainImage, setMainImage] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {

    loadProduct();

  }, [id]);

  const loadProduct = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {

      console.log(error);

      return;

    }

    setProduct(data);

    setMainImage(data.cover);

    const { data: related } = await supabase
      .from("products")
      .select("*")
      .eq("category", data.category);

    setRelatedProducts(
      related.filter((item) => item.id !== data.id)
    );

  };

  if (!product) {

    return (

      <div className="product-not-found">

        <h2>Loading...</h2>

      </div>

    );

  }

  return (

    <>

      <section className="product-details">

        <div className="details-left">

          <div className="details-image">

            <img
              src={mainImage}
              alt={product.title}
            />

          </div>

          <div className="thumbnail-images">

            {product.images?.map((image) => (

              <img
                key={image}
                src={image}
                alt={product.title}
                onClick={() => setMainImage(image)}
                className={
                  image === mainImage
                    ? "active-thumb"
                    : ""
                }
              />

            ))}

          </div>

        </div>

        <div className="details-info">

          <span>{product.category}</span>

          <h1>{product.title}</h1>

          <h2>

            ₦
            {Number(product.price).toLocaleString()}

          </h2>

          <p>

            <strong>Measurement:</strong>

            {" "}

            {product.measurement}

          </p>

          <p>{product.description}</p>

          <div className="quantity-box">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
            >

              -

            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >

              +

            </button>

          </div>

          <div className="details-buttons">

            <button
              className="cart-btn"
              onClick={() =>
                addToCart({
                  ...product,
                  quantity,
                })
              }
            >

              <FaShoppingCart />

              Add To Cart

            </button>

            <a
              className="whatsapp-btn"
              href={`https://wa.me/2347035742676?text=Hello Halogen Steel Ventures, I'm interested in ${encodeURIComponent(product.title)}`}
              target="_blank"
              rel="noreferrer"
            >

              <FaWhatsapp />

              WhatsApp

            </a>

          </div>

          <Link
            to="/products"
            className="back-link"
          >

            ← Back to Products

          </Link>

        </div>

      </section>

      <section className="related-products">

        <div className="section-title">

          <h2>Related Products</h2>

        </div>

        <div className="related-grid">

          {relatedProducts.map((item) => (

            <ProductCard
              key={item.id}
              product={item}
            />

          ))}

        </div>

      </section>

    </>

  );

}