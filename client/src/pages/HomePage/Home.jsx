import "./home.css";
import Banner from "../../components/banner/Banner";
import Posts from "../../components/posts/Posts";

const Home = () => {

  return (
    <div className="home">
      <Banner/>
      <Posts/>
    </div>
  );
};

export default Home;
