import "./profile.css";
// import Banner from '../../components/banner/Banner.jsx'
import data from '../../../data.js'
import { useSelector } from "react-redux";
const Profile = () => {

  // const user = data.user;
  const user = useSelector((state) => state.user.user);
  const blog = data.blog;

  return (
    <div className="profile">
      <div className="header">
        <img className="headerImg" src="./bannerImg.jpg" alt="" />
      </div>
      <div className="profileCard">
      <i className="fa-solid fa-pen DetailEditButton"></i>
        <div className="logo_wrapper"><i className="fa-solid fa-pen editButton"></i></div>
        <div className="content__avatar">
          <img className="profileImg" src={user.avatar} alt="" />
        </div>
        <div className="content__title">
          <h1 className="highlight">{user.fullName}</h1>
          <span className="email">{user.email}</span>
        </div>
        <p className="tPost">Total Post : {!user.postId ? 0 : user.postId.length}</p>
      </div>
      <div className="totalPost">
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        <div className="totalPostCard">
          <img className="cardImage" src={blog.mainImage} alt="" />
          <div className="title">
            <p>{blog.summary}</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
