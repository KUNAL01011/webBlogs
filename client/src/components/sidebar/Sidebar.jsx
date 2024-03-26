import { NavLink } from "react-router-dom";
import "./sidebar.css";
import data from "../../../data.js";
const Sidebar = () => {
  const user = data.user;

  return (
    <div className="main_box">
      <div>
        <ul className="sidebar_menu">
          <NavLink
            className={({ isActive }) => `${isActive ? "col" : "black"} `}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "col" : "black"} `}
            to="/about"
          >
            ABOUT
          </NavLink>

          {user ? (
            <>
            <NavLink
              className={({ isActive }) => `${isActive ? "col" : "black"} `}
              to="/profile"
            >
              PROFILE
            </NavLink>
            <NavLink
              className={({ isActive }) => `${isActive ? "col" : "black"} `}
              to="/create-blog"
            >
              WRITE
            </NavLink>
            </>
          ) : (
            <>
              {" "}
              <NavLink
                className={({ isActive }) => `${isActive ? "col" : "black"} `}
                to="/login"
              >
                LOGIN
              </NavLink>
              <NavLink
                className={({ isActive }) => `${isActive ? "col" : "black"} `}
                to="/register"
              >
                REGISTER
              </NavLink>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
