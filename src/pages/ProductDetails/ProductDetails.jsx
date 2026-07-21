import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";

import products from "../../data/products";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  const imagePath = (image) =>
    `/images/${product.folder}/${image}`;

  return (
    <>

      <section className="product-details">

        <div className="details-left">

          <div className="details-image">
            <img
              src={imagePath(mainImage)}
              alt={product.title}
            />
          </div>

          <div className="thumbnail-images">

            {product.images.map((image, index) => (

              <img
                key={index}
                src={imagePath(image)}
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
            ₦{product.price.toLocaleString()}
          </h2>

          <p>
            <strong>Measurement:</strong>{" "}
            {product.measurement}
          </p>

          {product.material && (
            <p>
              <strong>Material:</strong>{" "}
              {product.material}
            </p>
          )}

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
              href={`https://wa.me/2347035742676?text=Hello Halogen Steel Ventures, I am interested in ${product.title}`}
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

          <p>
            You may also like these products
          </p>

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