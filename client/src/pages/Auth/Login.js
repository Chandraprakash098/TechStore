import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/AuthStyle.css";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate(
            res.data.user.role === 1 ? "/dashboard/admin" : "/dashboard/user"
          );
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login Failed");
    }
  };

  return (
    <Layout title="Login - Ecommer App">
      <div className="login-container">
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <h1>LOGIN FORM</h1>
            <div className="form-control">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="form-control">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
            <Link
              to="/forgot-password"
              className="btn btn-primary forgot-password-link"
            >
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
