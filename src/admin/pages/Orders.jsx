import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import supabase from "../../lib/supabase";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    getOrders();

  }, []);

  const getOrders = async () => {

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {

      console.log(error);

      return;

    }

    setOrders(data);

  };

  const updateStatus = async (id, status) => {

    const updates = {

      order_status: status,

    };

    if (status === "Payment Confirmed") {

      updates.payment_status = "Paid";

    }

    if (status === "Rejected") {

      updates.payment_status = "Rejected";

    }

    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", id);

    if (error) {

      alert(error.message);

      return;

    }

    getOrders();

  };

  return (

    <Layout>

      <div className="orders-page">

        <h1>Orders</h1>

        <table>

          <thead>

            <tr>

              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Receipt</th>
              <th>Payment</th>
              <th>Order Status</th>
              <th>Update Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.customer_name}</td>

                <td>{order.customer_phone}</td>

                <td>
                  ₦{Number(order.total).toLocaleString()}
                </td>

                <td>

                  {order.receipt ? (

                    <a
                      href={order.receipt}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Receipt
                    </a>

                  ) : (

                    "No Receipt"

                  )}

                </td>

                <td>{order.payment_status}</td>

                <td>{order.order_status}</td>

                <td>

                  <select
                    value={order.order_status}
                    onChange={(e) =>
                      updateStatus(order.id, e.target.value)
                    }
                  >

                    <option value="Pending Payment">
                      Pending Payment
                    </option>

                    <option value="Payment Confirmed">
                      Payment Confirmed
                    </option>

                    <option value="Fabrication">
                      Fabrication
                    </option>

                    <option value="Ready for Pickup">
                      Ready for Pickup
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>

                  </select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}