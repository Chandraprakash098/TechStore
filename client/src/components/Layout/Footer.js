import React from "react";

const Footer = () => {
  return (
    <div className="bg-success text-dark p-3">
      <h4 className="text-center">
        &copy; {new Date().getFullYear()} Chandra Prakash. All rights
        reserved.{" "}
      </h4>
    </div>
  );
};

export default Footer;
