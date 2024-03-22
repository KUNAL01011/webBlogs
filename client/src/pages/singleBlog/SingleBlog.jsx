import "./singleBlog.css";

const SingleBlog = () => {
  return (
    <div className="singleBlog">
      <div className="sigleContainer">
        <h1 className="blog-title">
          Ios/Swift -- Interviwn Question for Intermediate devs 2023
        </h1>
        <div className="userData">
          <img src="./logo.png" className="profile-pic" alt="" />
          <div className="detaile">
            <p className="name">Kunal Kumar</p>
            <span className="data">
              Published by <span className="highlight">Kunal Kumar</span>- Nov
              30, 2023
            </span>
          </div>
        </div>

        <div className="content"></div>
      </div>
    </div>
  );
};

export default SingleBlog;
