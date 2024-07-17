import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">Your Orders</h1>
            {orders?.map((order, index) => (
              <div key={order._id} className="card mb-3">
                <div className="card-header">
                  <h5 className="card-title mb-0">Order #{index + 1}</h5>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${order.products[0]._id}`}
                        className="img-thumbnail"
                        alt={order.products[0].name}
                      />
                    </div>
                    <div className="col-md-9">
                      <p>
                        <strong>Status:</strong> {order.status}
                      </p>
                      <p>
                        <strong>Buyer:</strong> {order.buyer.name}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {moment(order.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </p>
                      <p>
                        <strong>Payment:</strong>{" "}
                        {order.payment.success ? "Success" : "Failed"}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {order.products.length}
                      </p>
                      <p>
                        <strong>Product Name:</strong> {order.products[0].name}
                      </p>
                      <p>
                        <strong>Product Description:</strong>{" "}
                        {order.products[0].description.substring(0, 30)}
                      </p>
                      <p>
                        <strong>Product Price:</strong>{" "}
                        {order.products[0].price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
