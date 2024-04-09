import { SearchOffOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between text-white py-4">
      <div className="text-2xl">
        <NavLink to="/">
          <span>
            Web<span className="font-extrabold pl-1">Blogs</span>
          </span>
        </NavLink>
      </div>
      <div className="">
        <ul className="flex gap-4 font-medium text-lg">
          <NavLink to="/">
            <li>Home</li>
          </NavLink>
          <NavLink to="/write">
            <li>Write</li>
          </NavLink>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-4">
          <div className="bg-[#242535] flex p-1 rounded-md px-2 shadow-lg">
            <input
              className="bg-inherit outline-none"
              type="text"
              placeholder="Search"
            />
            <SearchOffOutlined />
          </div>
          <NavLink to="/profile">
            <div className="border rounded-full">
              <img src="./logo.png" className="w-9 h-9 rounded-full" alt="" />
            </div>
          </NavLink>
        </div>
        {/* <NavLink to="/login">
          <span className="border p-1 rounded-lg px-3 flex items-center justify-center">Login</span>
        </NavLink>
        <NavLink to="/login">
          <span className="border p-1 rounded-lg px-3 flex items-center justify-center">Register</span>
        </NavLink> */}
      </div>
    </div>
  );
};

export default Header;
