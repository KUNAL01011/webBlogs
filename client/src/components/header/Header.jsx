import { NavLink } from "react-router-dom";
import "./header.css";
import { useState } from "react";

//header component for all pages
const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="header">
      <div className="left">
        <span className="logo-text">WebBlogs</span>
      </div>
      <div className="right">
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "col" : "black"} `}
        >
          <span className="route">Home</span>
        </NavLink>
        <NavLink
          to="/create-blog"
          className={({ isActive }) => `${isActive ? "col" : "black"} `}
        >
          <span className="route">CreateBlog</span>
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => `${isActive ? "col" : "black"} `}
        >
          <span className="pro-sec">
            {isLogin ? (
              <img className="profile" src="./logo.png" alt="" />
            ) : (
              <button className="lg-btn">Login</button>
            )}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
