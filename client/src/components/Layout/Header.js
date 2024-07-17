import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart]=useCart()
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");
      toast.success("Logout Successfully");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            <FaShoppingCart className="shopping-icon" />
            TechStore
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav-items-spacing">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink to="/category" className="nav-link">
                Category
              </NavLink>
            </li> */}
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                </li>
              </>
            ) : null}
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link">
                Cart {cart?.length}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/policy" className="nav-link">
                Privacy Policy
              </NavLink>
            </li>
            {auth.user && (
              <li className="nav-item dropdown ms-auto">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item">
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
