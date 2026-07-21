import "./CartDrawer.css";

import { useCart } from "../../context/CartContext";

import { FaTimes, FaTrash } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function CartDrawer({ open, close }) {

  const {

    cart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

  } = useCart();

  const total = cart.reduce(

    (sum, item) => sum + item.price * item.quantity,

    0

  );

  return (

    <div className={open ? "cart-overlay show" : "cart-overlay"}>

      <div className="cart-drawer">

        <div className="cart-header">

          <h2>Shopping Cart</h2>

          <button onClick={close}>
            <FaTimes />
          </button>

        </div>

        {cart.length === 0 ? (

          <div className="empty-cart">

            <h3>Your cart is empty.</h3>

            <p>Add some products to begin.</p>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <img
                    src={`/images/${item.folder}/${item.cover}`}
                    alt={item.title}
                  />

                  <div className="cart-info">

                    <h4>{item.title}</h4>

                    <p>
                      ₦{item.price.toLocaleString()}
                    </p>

                    <div className="qty">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >

                    <FaTrash />

                  </button>

                </div>

              ))}

            </div>

            <div className="cart-footer">

              <h3>

                Total

                <span>

                  ₦{total.toLocaleString()}

                </span>

              </h3>

              <Link
                to="/checkout"
                className="checkout-btn"
                onClick={close}
              >

                Proceed To Checkout

              </Link>

            </div>

          </>

        )}

      </div>

    </div>

  );

}