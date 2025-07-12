import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchOrders = async () => {
  return (await axios.get("http://localhost:3000/orders")).data;
};

const Orders = () => {
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({ queryKey: ["orders"], queryFn: fetchOrders });

  const sortedOrders = orders
    ? [...orders].sort((a, b) =>
        sortNewestFirst
          ? new Date(b.timestamp) - new Date(a.timestamp)
          : new Date(a.timestamp) - new Date(b.timestamp)
      )
    : [];



  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return (
    <div className="orders-container">
      <div className="sort-controls">
        <button
          onClick={() => setSortNewestFirst(!sortNewestFirst)}
          className="sort-button"
        >
          {sortNewestFirst ? "Show Oldest First" : "Show Newest First"}
        </button>
      </div>
      <h2>Orders</h2>
      <div className="orders-grid">
      {sortedOrders.map((order) => (
        <div key={order.orderId} className="order-card">
          <div className="order-header">
            <span>Order ID: {order.orderId.substring(0, 10)}</span>
            <span>{new Date(order.timestamp).toLocaleString()}</span>
          </div>
          <div className="order-items">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.drink.name}</span>
                <span>
                  {item.quantity} x ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="order-total">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Orders;
