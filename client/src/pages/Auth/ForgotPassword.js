import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import "../../styles/AuthStyle.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, secretAnswer, newPassword }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Forgot Password"}>
      <div className="forgot-password-container">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <h1>Reset Password</h1>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="secretAnswer">Answer to your secret question</label>
            <input
              type="text"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              id="secretAnswer"
              placeholder="Enter your answer"
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              id="newPassword"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
