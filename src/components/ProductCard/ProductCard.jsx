import { Link } from "react-router-dom";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";

import { useCart } from "../../context/CartContext";

import "./ProductCard.css";

export default function ProductCard({ product }) {

  const { addToCart } = useCart();

  return (

    <div className="product-card">

      <div className="product-image">

        <img
          src={product.cover}
          alt={product.title}
          loading="lazy"
        />

      </div>

      <div className="product-content">

        <span className="product-category">
          {product.category}
        </span>

        <h3>{product.title}</h3>

        {product.measurement && (

          <p className="measurement">
            <strong>Measurement:</strong> {product.measurement}
          </p>

        )}

        <h2 className="product-price">

          ₦{Number(product.price).toLocaleString()}

        </h2>

        <div className="product-buttons">

          <Link
            to={`/products/${product.id}`}
            className="view-product"
          >
            View Product
          </Link>

          <button
            className="cart-button"
            onClick={() => addToCart(product)}
          >
            <FaShoppingCart />
          </button>

          <a
            href={`https://wa.me/2347035742676?text=Hello Halogen Steel Ventures, I'm interested in ${encodeURIComponent(product.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <FaWhatsapp />
          </a>

        </div>

      </div>

    </div>

  );

}