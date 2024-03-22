import { NavLink } from "react-router-dom";
// import "./header.css";
// import { useState } from "react";

// //header component for all pages
// const Header = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   return (
//     <div className="header">
//       <div className="left">
//         <span className="logo-text">WebBlog's</span>
//       </div>
//       <div className="right">
//         <NavLink
//           to="/"
//           className={({ isActive }) => `${isActive ? "col" : "black"} `}
//         >
//           <span className="route">Home</span>
//         </NavLink>
//         <NavLink
//           to="/create-blog"
//           className={({ isActive }) => `${isActive ? "col" : "black"} `}
//         >
//           <span className="route">About</span>
//         </NavLink>
//         <NavLink
//           to="/create-blog"
//           className={({ isActive }) => `${isActive ? "col" : "black"} `}
//         >
//           <button className="route lg-btn">Register</button>
//         </NavLink>
//         <NavLink
//           to="/create-blog"
//           className={({ isActive }) => `${isActive ? "col" : "black"} `}
//         >
//           <button className="route lg-btn">Login</button>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Header;

import { Link } from "react-router-dom";
import "./header.css";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

export default function Header() {
  const [sidebar, setSidebar] = useState(false);
  const user = false;
  return (
    <div className="top">
      <div className="topLeft">
        <img src="./logoMain.png" alt="" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <NavLink
              className={({ isActive }) => `${isActive ? "col" : "black"} `}
              to="/"
            >
              HOME
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink
              className={({ isActive }) => `${isActive ? "col" : "black"} `}
              to="/about"
            >
              ABOUT
            </NavLink>
          </li>
          <li className="topListItem">
            <NavLink
              className={({ isActive }) => `${isActive ? "col" : "black"} `}
              to="/create-blog"
            >
              WRITE
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/profile">
            <img
              className="topImg"
              src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div className="customMenu" onClick={() => setSidebar(!sidebar)}>
        <i className="fa-solid fa-bars"></i>
        {sidebar ? <Sidebar/> : ""}
      </div>
    </div>
  );
}
