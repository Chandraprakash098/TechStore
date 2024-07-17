import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete item
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.log(error);
    }
  };

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  // handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="cart-page">
        <div className="cart-header">
          <p>
            {cart?.length ? ` Cart - ${cart.length} Items` : "cart is empty"}
            {auth?.token ? "" : " please login to checkout!"}
          </p>
        </div>
        <div className="cart-content">
          <div className="cart-items">
            {cart?.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-img">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                    alt={item.name}
                  />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.description.substring(0, 50)}</p>
                  <p>Price: {item.price}</p>
                </div>
                <button
                  className="cart-remove-btn"
                  onClick={() => removeCartItem(item._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total Price: {totalPrice()}</p>
            <hr />
            {auth?.user?.address ? (
              <div className="cart-address">
                <h4>Shipping Address</h4>
                <p>{auth?.user?.address}</p>
                <button
                  className="btn-update-address"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="cart-address">
                {auth?.token ? (
                  <button
                    className="btn-update-address"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn-login"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
            <div className="payment-section">
              {clientToken && auth?.token && cart?.length > 0 && (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn-pay"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
