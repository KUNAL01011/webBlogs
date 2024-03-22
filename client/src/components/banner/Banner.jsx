
import "./banner.css";

export default function Banner() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg">Welcome to webBlog</span>
        <span className="headerTitleSm">Let's create something</span>
      </div>
      <img
        className="headerImg"
        src="./bannerImg.jpg"
        alt=""
      />
    </div>
  );
}


// src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"