import { useState } from "react";
import supabase from "../../lib/supabase";
import "./TrackOrder.css";

export default function TrackOrder() {

  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");

  const [order, setOrder] = useState(null);

  const searchOrder = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber)
      .eq("customer_phone", phone)
      .single();

    if (error) {

      alert("Order not found.");

      return;

    }

    setOrder(data);

  };

  return (

    <section className="track-page">

      <div className="track-box">

        <h1>Track Your Order</h1>

        <p>

          Enter your Order Number and Phone Number.

        </p>

        <input
          placeholder="Order Number"
          value={orderNumber}
          onChange={(e)=>setOrderNumber(e.target.value)}
        />

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
        />

        <button onClick={searchOrder}>

          Track Order

        </button>

        {order && (

          <div className="result">

            <h2>{order.order_number}</h2>

            <p>

              <strong>Payment:</strong>

              {" "}

              {order.payment_status}

            </p>

            <p>

              <strong>Status:</strong>

              {" "}

              {order.order_status}

            </p>

          </div>

        )}

      </div>

    </section>

  );

}