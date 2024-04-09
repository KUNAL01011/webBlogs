import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserAsync } from "./features/auth/authSlice";
function App() {
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getUserAsync());
    },[dispatch])

  return (
    <div className="bg-[#181a2a]">
      <div className="w-[80%] m-auto h-full mb-14">
        <Header />
        <Outlet />
      </div>
      <div className="bg-[#141624]">
        <Footer />
      </div>
    </div>
  );
}

export default App;
