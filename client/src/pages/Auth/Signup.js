import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyle.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/register`, {
        name,
        email,
        password,
        mobile,
        address,
        secretQuestion,
        secretAnswer,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SignUp Fail");
    }
  };

  return (
    <Layout title={"SignUp"}>
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="form-control"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              id="mobile"
              className="form-control"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              className="form-control"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="secretQuestion">Secret Question</label>
            <input
              type="text"
              value={secretQuestion}
              onChange={(e) => setSecretQuestion(e.target.value)}
              id="secretQuestion"
              className="form-control"
              placeholder="Enter a secret question"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="secretAnswer">Answer to Secret Question</label>
            <input
              type="text"
              value={secretAnswer}
              onChange={(e) => setSecretAnswer(e.target.value)}
              id="secretAnswer"
              className="form-control"
              placeholder="Enter your answer"
              required
            />
          </div>
          <button type="submit" className="btn signup-btn">
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
