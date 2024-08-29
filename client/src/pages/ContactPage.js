import React from 'react'
import Layout from '../components/Layout/Layout'
import { FaPhone, FaEnvelope, FaLinkedin, FaInstagram } from "react-icons/fa";

const ContactPage = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-description">
          Feel free to reach out to us through any of the following methods:
        </p>
        <div className="contact-info">
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <h2>Phone</h2>
            <p>6204421804</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <h2>Email</h2>
            <p>chandraprakash96386@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaLinkedin className="contact-icon" />
            <h2>LinkedIn</h2>
            <p>
              <a
                href="https://www.linkedin.com/in/chandra-prakash-062541248"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com
              </a>
            </p>
          </div>
          <div className="contact-item">
            <FaInstagram className="contact-icon" />
            <h2>Instagram</h2>
            <p>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContactPage