import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { getAllBlogsAsync } from "./features/blogs/blogSlice";
import { useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogsAsync());
    // console.log("renader app");
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
      {/* <Sidebar/> */}
    </>
  );
}

export default App;
