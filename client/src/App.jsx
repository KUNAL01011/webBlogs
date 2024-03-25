import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { getAllBlogsAsync } from "./features/blogs/blogSlice";
import { useEffect } from "react";
import { getUserAsync } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlogsAsync());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(getUserAsync());
  },[dispatch]);
  return (
    <>
      <Header />
      <Outlet />
      {/* <Sidebar/> */}
    </>
  );
}

export default App;
