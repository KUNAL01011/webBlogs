import data from "../../../data";
import "./singleBlog.css";
import parse from 'html-react-parser';

const SingleBlog = () => {
  const blog = data.blog;
  const createdAt = new Date(blog.createdAt).toISOString().split("T")[0];
  const user = data.user;

  return (
    <div className="singleBlog">
      <div className="sigleContainer">
        <h1 className="blog-title">{blog.title}</h1>
        <div className="userData">
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
        </div>
        <div className="mainImage">
          <img src={blog.mainImage} alt="" />
        </div>

        <div className="content">
          {parse(blog.content)}
        </div>

        <div className="conclusion">
          <h1>Conclusion</h1>
          <p>{blog.conclusion}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
