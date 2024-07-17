import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { useCart } from "../context/cart";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart() || [[], () => {}];
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  useEffect(() => {
    if (!checked.length) getAllProducts();
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) filterProduct();
  }, [checked]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products || []);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-count`
      );
      setTotal(data.total || 0);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...(data.products || [])]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    const all = value ? [...checked, id] : checked.filter((c) => c !== id);
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked }
      );
      setProducts(data.products || []);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Detailed error message from server
        console.log(error.response.status); // HTTP status code
        console.log(error.response.headers); // Response headers
      } else if (error.request) {
        console.log(error.request); // The request was made but no response was received
      } else {
        console.log("Error", error.message); // Something else happened while setting up the request
      }
    }
  };

  return (
    <Layout title={"Home Page"}>
      <div className="homepage-container">
        <div className="products-section">
          <h1 className="head" style={{color:"black"}}>TECH  -  PRODUCTS</h1>
          <div className="products-grid">
            {products.map((p) => (
              <div className="product-card" key={p._id}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h5>{p.name}</h5>
                  <h5 className="product-price">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </h5>
                  <p>{p.description.substring(0, 60)}...</p>
                  <div className="product-actions">
                    <button
                      className="details-btn"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => {
                        const updatedCart = [...(cart || []), p];
                        setCart(updatedCart);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify(updatedCart)
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {products.length < total && (
            <button className="load-more-btn" onClick={() => setPage(page + 1)}>
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  Load More <AiOutlineReload />
                </>
              )}
            </button>
          )}
        </div>

        <div className="filters-section">
          <h4>CHOOSE CATEGORY</h4>
          <div className="category-filters">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <button
            className="reset-filters-btn"
            onClick={() => window.location.reload()}
          >
            RESET FILTERS
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
