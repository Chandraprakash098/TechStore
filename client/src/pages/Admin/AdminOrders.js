import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import "../../styles/AdminOrders.css"; // Assuming you create a separate CSS file for styling
const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled", // Fixed typo in "Delivered" and "Canceled"
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      getOrders();
      toast.success("Order status updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="admin-orders-container">
        <AdminMenu />

        <div className="admin-orders-content">
          <h1 className="admin-orders-title">All Orders</h1>

          {orders.length === 0 ? (
            <p className="admin-orders-empty">No orders found.</p>
          ) : (
            orders.map((o, index) => (
              <div key={o._id} className="admin-order-item">
                <div className="admin-order-header">
                  <h3>Order #{index + 1}</h3>
                  <Select
                    className="admin-order-status"
                    onChange={(value) => handleChange(o._id, value)}
                    defaultValue={o?.status}
                  >
                    {status.map((s, i) => (
                      <Option key={i} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="admin-order-details">
                  <p>
                    <strong>Buyer:</strong> {o?.buyer?.name}
                  </p>
                  <p>
                    <strong>Date:</strong> {moment(o?.createdAt).format("lll")}
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    {o?.payment.success ? "Success" : "Failed"}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {o?.products?.length}
                  </p>
                </div>

                <div className="admin-order-products">
                  {o?.products?.map((p) => (
                    <div key={p._id} className="admin-order-product">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                      />
                      <div className="admin-order-product-details">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price: {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
