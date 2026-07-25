import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import supabase from "../../lib/supabase";

import "./MyOrders.css";

export default function MyOrders() {

  const { user } = useAuth();

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    if (user) {

      loadOrders();

    }

  }, [user]);

  const loadOrders = async () => {

    const { data, error } = await supabase

      .from("orders")

      .select("*")

      .eq("user_id", user.id)

      .order("created_at", {
        ascending: false,
      });

    if (error) {

      console.log(error);

      return;

    }

    setOrders(data);

  };

  return (

    <section className="my-orders">

      <div className="container">

        <h1>

          My Orders

        </h1>

        {

          orders.length === 0 ? (

            <div className="empty-orders">

              <h2>

                No Orders Yet

              </h2>

              <p>

                Your orders will appear here.

              </p>

            </div>

          ) : (

            orders.map(order => (

              <div
                key={order.id}
                className="order-card"
              >

                <div className="order-header">

                  <h3>

                    {order.order_number}

                  </h3>

                  <span>

                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}

                  </span>

                </div>

                <p>

                  <strong>

                    Total:

                  </strong>

                  ₦

                  {Number(order.total).toLocaleString()}

                </p>

                <p>

                  <strong>

                    Payment:

                  </strong>

                  {order.payment_status}

                </p>

                <p>

                  <strong>

                    Order Status:

                  </strong>

                  {order.order_status}

                </p>

                {

                  order.receipt && (

                    <a
                      href={order.receipt}
                      target="_blank"
                      rel="noreferrer"
                    >

                      View Receipt

                    </a>

                  )

                }

              </div>

            ))

          )

        }

      </div>

    </section>

  );

}