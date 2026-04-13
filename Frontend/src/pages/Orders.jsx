import React, { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch {
      toast.error("Failed to fetch orders!");
    }
  };

  const cancelOrder = async (id) => {
    try {
      await API.delete(`/orders/${id}`);
      toast.success("Order cancelled!");
      fetchOrders();
    } catch {
      toast.error("Cancel failed!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h3>Your Orders</h3>
      {orders.map((o) => (
        <div key={o.id} className="card p-3 mb-2">
          <b>Order #{o.id}</b> - Product ID: {o.product_id}
          <button className="btn btn-danger btn-sm float-end"
            onClick={() => cancelOrder(o.id)}>Cancel</button>
        </div>
      ))}
    </div>
  );
}
