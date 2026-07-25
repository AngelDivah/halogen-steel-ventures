import { useState, useEffect } from "react";
import "./Checkout.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../lib/supabase";

export default function Checkout() {

  const { cart, clearCart } = useCart();

  const { user } = useAuth();

  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(false);

  const [receipt, setReceipt] = useState(null);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {

    getSettings();

    if (user) {

      getProfile();

    }

  }, [user]);

  const getSettings = async () => {

    const { data } = await supabase
      .from("settings")
      .select("*")
      .eq("id", 1)
      .single();

    if (data) {

      setSettings(data);

    }

  };

  const getProfile = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {

      console.log(error);

      return;

    }

    setCustomer({

      name: data.full_name || "",

      email: user.email || "",

      phone: data.phone || "",

      address: data.address || "",

    });

  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {

    setCustomer({

      ...customer,

      [e.target.name]: e.target.value,

    });

  };

  const handleReceipt = (e) => {

    if (e.target.files.length > 0) {

      setReceipt(e.target.files[0]);

    }

  };

  const placeOrder = async () => {

    if (!user) {

      alert("Please login before placing an order.");

      return;

    }

    if (cart.length === 0) {

      alert("Your cart is empty.");

      return;

    }

    if (!receipt) {

      alert("Please upload your payment receipt.");

      return;

    }

    setLoading(true);

    const orderNumber =
      "HSV-" + Date.now().toString().slice(-8);

    const fileName =
      `${Date.now()}-${receipt.name}`;

    const { error: uploadError } =
      await supabase.storage
        .from("receipts")
        .upload(fileName, receipt);

    if (uploadError) {

      alert(uploadError.message);

      setLoading(false);

      return;

    }

    const { data: receiptData } =
      supabase.storage
        .from("receipts")
        .getPublicUrl(fileName);

    const receiptUrl =
      receiptData.publicUrl;

    const { error } =
      await supabase
        .from("orders")
        .insert([
          {

            user_id: user.id,

            order_number: orderNumber,

            customer_name: customer.name,

            customer_email: customer.email,

            customer_phone: customer.phone,

            delivery_address: customer.address,

            products: cart,

            total,

            receipt: receiptUrl,

            payment_status: "Pending",

            order_status: "Pending Payment",

          },
        ]);

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert(`

✅ Order Submitted Successfully

Order Number:

${orderNumber}

Save this number.

`);

    clearCart();

    setReceipt(null);

  };

  return (

    <section className="checkout-page">

      <div className="checkout-container">

        <h1>Checkout</h1>

        <div className="checkout-grid">

          <div className="customer-info">

            <h2>

              Customer Information

            </h2>

            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
            />

            <input
              type="email"
              value={customer.email}
              readOnly
            />

            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
            />

            <textarea
              rows="5"
              name="address"
              value={customer.address}
              onChange={handleChange}
            />

          </div>

          <div className="order-summary">

            <h2>

              Order Summary

            </h2>

            {

              cart.map(item => (

                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "15px",
                  }}
                >

                  <div>

                    <strong>

                      {item.title}

                    </strong>

                    <p>

                      Qty: {item.quantity}

                    </p>

                  </div>

                  <strong>

                    ₦

                    {(item.price * item.quantity).toLocaleString()}

                  </strong>

                </div>

              ))

            }

            <h3>

              Total:

              ₦

              {total.toLocaleString()}

            </h3>

            <hr />

            <h2>

              Bank Details

            </h2>

            <p>

              <strong>

                Bank:

              </strong>

              {" "}

              {settings?.bank_name}

            </p>

            <p>

              <strong>

                Account Name:

              </strong>

              {" "}

              {settings?.account_name}

            </p>

            <p>

              <strong>

                Account Number:

              </strong>

              {" "}

              {settings?.account_number}

            </p>

            <hr />

            <label>

              Upload Payment Receipt

            </label>

            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleReceipt}
            />

            <button
              className="checkout-btn"
              onClick={placeOrder}
              disabled={loading}
            >

              {

                loading

                  ? "Submitting..."

                  : "Submit Order"

              }

            </button>

          </div>

        </div>

      </div>

    </section>

  );

}