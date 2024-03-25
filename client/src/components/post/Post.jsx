import { Link } from "react-router-dom";
import "./post.css";
import data from "../../../data";

export default function Post({ blog }) {
  // console.log(blog.createdAt)
  const createdAt = new Date(blog.createdAt).toISOString().split("T")[0];
  const user = data.user;
  return (
    <div className="post">
      <img className="postImg" src={blog.mainImage} alt="" />
      <div className="video-bottom-section">
        <a href="#">
          <img className="channel-icon" src={user.avatar} alt="" />
        </a>
        <div className="video-details">
          <a href="#" className="video-title">
           {user.fullName}
          </a>
          <div className="video-metadata">
            <span>{createdAt}</span>
          </div>
        </div>
      </div>
      <div className="postInfo">
        <span className="postTitle">
          <Link to="/post/abc" className="link">
            {blog.title}
          </Link>
        </span>
        <hr />
      </div>
      <p className="postDesc">{blog.summary}</p>

      
    </div>
  );
}
