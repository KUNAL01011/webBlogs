import Header from "../../components/header/Header";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogsAsync, getData } from "../../features/blogs/blogSlice";
import { useEffect } from "react";
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const data = useSelector(getData);

  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, [dispatch]);
  return (
    <div className="home">
      <Header></Header>
      <div className="main">
        {data.map((blog) => (
          <Card key={blog._id} blog={blog}></Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
