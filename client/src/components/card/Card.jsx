import parse from "html-react-parser";
import "./card.css";

// card component here we just accept the data as prop
// data has a {} object and object have a blog property and in the blog have a {}
// that have all the content;
const Card = (data) => {
  return (
    <div className="card">
      <div className="card__header">
        <img
          src={data.blog.mainImage}
          alt="card__image"
          className="card__image"
          width="600"
        />
      </div>
      <div className="card__body">
        <h4>{data.blog.title}</h4>
        <p>{parse(data.blog.summary)}</p>
      </div>
      <div className="card__footer">
        <div className="user">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="user__image"
            className="user__image"
          />
          <div className="user__info">
            <h5>Jane Doe</h5>
            <small>03-03-2024</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
