// import { Link } from "react-router-dom";
import './header.css'

//header component for all pages
const Header = () => {
  return (
    <div className="header">
      <div className="left">
        <span className='logo-text'>WebBlogs</span>
      </div>
      <div className="right">
       <span className='route'>Home</span>
       <span className='route'>CreateBlog</span>
       <span className='pro-sec'>
        <img className = 'profile' src="./logo.png" alt="" />
        <button className='lg-btn'>Login</button>
       </span>
      </div>
    </div>
  );
};

export default Header;
