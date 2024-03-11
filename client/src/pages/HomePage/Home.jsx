import Card from "../../components/card/Card";
import { useSelector } from "react-redux";
import { getData } from "../../features/blogs/blogSlice";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const data = useSelector(getData);

  return (
    <div className="home">
      <div className="main">
        {data.map((blog) => (
          <Link key={blog._id} to={`/blog/${blog._id}`}>
            <Card blog={blog}></Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
