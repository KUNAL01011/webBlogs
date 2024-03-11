import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { getAllBlogsAsync } from "./features/blogs/blogSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogsAsync());
    console.log("renader app");
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
