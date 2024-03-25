import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import "./header.css";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";
import {useSelector} from 'react-redux'
// import data from "../../../data";



export default function Header() {

  const [sidebar, setSidebar] = useState(false);

  const user = useSelector((state) => state.user.user);
 
  // const user = data.user;




  // const user = true;
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
          {user ? (
            <li className="topListItem">
              <NavLink
                className={({ isActive }) => `${isActive ? "col" : "black"} `}
                to="/about"
              >
                ABOUT
              </NavLink>
            </li>
          ) : ""}
          {user ? (
            <li className="topListItem">
              <NavLink
                className={({ isActive }) => `${isActive ? "col" : "black"} `}
                to="/create-blog"
              >
                WRITE
              </NavLink>
            </li>
          ) : ""}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/profile">
            <img
              className="topImg"
              src={user.avatar}
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
        {sidebar ? <Sidebar /> : ""}
      </div>
    </div>
  );
}
