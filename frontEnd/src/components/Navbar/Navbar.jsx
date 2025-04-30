import "./Navbar.css";
import { assets } from "../../assets/assets";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/storeContex";
import { FaUser } from "react-icons/fa";
import { BsBagHeartFill } from "react-icons/bs";
import { RiLogoutBoxRFill } from "react-icons/ri";

export const Navbar = ({ setShowLogin }) => {

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token"); // token is key name
    setToken("");
    navigate("/");
  }
  const pathName = useLocation();

  useEffect(() => {
    if (pathName.hash) {
      const ele = document.querySelector(pathName.hash);
      // console.log(ele);
      ele.scrollIntoView();
    }
  }, [pathName]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={
            pathName.pathname === "/" && pathName.hash === "" ? "active" : ""
          }
        >
          Home
        </Link>
        <Link
          to="/#explore-menu"
          className={pathName.hash.includes("#explore-menu") ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/#app-download"
          className={pathName.hash.includes("#app-download") ? "active" : ""}
        >
          Mobile-app
        </Link>
        <Link
          to="/#footer"
          className={pathName.hash.includes("#footer") ? "active" : ""}
        >
          Contact us
        </Link>
      </ul>
      <div className="navbar-right">
       
        <div className="navbar-search-icon">
          <Link to="/cart">
            <FaCartArrowDown className="cart-icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <FaUser className="profile_icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <BsBagHeartFill  />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
              <RiLogoutBoxRFill />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
