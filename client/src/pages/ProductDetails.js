import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.products || {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="product-details-container">
        <div className="product-main">
          <div className="product-image">
            {product._id ? (
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
              />
            ) : (
              <p>Loading product image...</p>
            )}
          </div>
          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>
              Price:{" "}
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </p>
            <p>Category: {product?.category?.name}</p>
            <button className="add-to-cart-btn">ADD TO CART</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
