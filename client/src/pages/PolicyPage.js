import React from 'react'
import Layout from '../components/Layout/Layout'

const PolicyPage = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="policy-container">
        <div className="policy-content">
          <h1 className="policy-title">Privacy Policy</h1>
          <div className="policy-text">
            <p>
              At TechStore, we respect your privacy and are committed to
              protecting the personal information you share with us. This
              Privacy Policy outlines how we collect, use, disclose, and
              safeguard your information when you visit our website{" "}
              <a href="">www.techstore.com</a>{" "}
              (hereinafter referred to as "website") and our services.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We may collect personal information from you when you visit our
              website, make a purchase, subscribe to our newsletter, or engage
              with us in other activities. This information may include your
              name, email address, mailing address, phone number, payment
              details, and other relevant details.
            </p>
            <h2>How We Use Your Information</h2>
            <p>
              We use the information we collect to provide and improve our
              services, process your orders, communicate with you, personalize
              your experience, send marketing communications, and comply with
              legal obligations.
            </p>
            <h2>Sharing Your Information</h2>
            <p>
              We may share your information with third-party service providers
              to facilitate our services (e.g., payment processors, shipping
              companies) or as required by law. We do not sell your personal
              information to third parties.
            </p>
            <h2>Security of Your Information</h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, use, or disclosure. However, no method
              of transmission over the internet or electronic storage is
              completely secure.
            </p>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes
              in our practices and legal requirements. We encourage you to
              review this page periodically for the latest information on our
              privacy practices.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our
              practices, please contact us at privacy@techstore.com.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PolicyPage