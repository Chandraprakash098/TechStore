import React from 'react'
import { Link } from "react-router-dom";
import Layout from '../components/Layout/Layout'

const PageNotFound = () => {
  return (
    <Layout title={'Page not Found'}>
      <div className="page-not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="home-link">
          Go to Home
        </Link>
      </div>
    </Layout>
  );
}

export default PageNotFound