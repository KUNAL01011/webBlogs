import "../global.css";
import {
  FacebookOutlined,
  WbTwilightOutlined,
  Instagram,
  YouTube,
} from "@mui/icons-material";
import Card from "../components/Card";
import EditProfile from "./EditProfile";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserByUsernameAsync } from "../features/auth/authSlice";

const Profile = () => {

  const [editWindow, setEditWindow] = useState("hidden");

  const handleClick = () => {
    setEditWindow("block");
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const profileDatail = useSelector((state) => state.user.authorProfile);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserByUsernameAsync(id));
  }, []);

  return (
    <>
      {profileDatail ? (
        <div>
          <div className="flex flex-col gap-16">
            <div className="text-white  rounded-lg mt-8 bg-[#242535] py-5 text-center shadow-lg relative">
              <div className="flex justify-center flex-col items-center">
                <img className="w-20" src="./logo.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-xl opacity-[0.7]">{profileDatail?.fullName}</span>
                  <span className="text-sm opacity-[0.7]">{profileDatail?.username}</span>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-3">
                <div className="flex gap-4 opacity-[0.7]">
                  {" "}
                  <span>{profileDatail?.followers}</span>
                  <span>{profileDatail?.following}</span>
                </div>
                <div className="border py-1 rounded-full bg-blue-700 px-4 ">
                  <span>{profileDatail?.followers.find(user._id) ? "following" : "follow"}</span>
                </div>
              </div>
              <div className="w-[50%] m-auto mt-2">
                <p className="opacity-[0.8]">
                 {profileDatail?.about}
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <span className="border p-1 rounded-lg">
                  <FacebookOutlined />
                </span>
                <span className="border p-1 rounded-lg">
                  <WbTwilightOutlined />
                </span>
                <span className="border p-1 rounded-lg">
                  <Instagram />
                </span>
                <span className="border p-1 rounded-lg">
                  <YouTube />
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {profileDatail?.posts?.map((item)=>(
                <Card key={item._id} blogData={item} />
              ))}
            </div>
          </div>
          
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-16">
            <div className="text-white  rounded-lg mt-8 bg-[#242535] py-5 text-center shadow-lg relative">
              <button
                className="absolute top-5 right-5 border px-4 rounded-lg bg-blue-500"
                onClick={handleClick}
              >
                Edit
              </button>
              <div className="flex justify-center flex-col items-center">
                <img className="w-20" src="./logo.png" alt="" />
                <div className="flex flex-col">
                  <span className="text-xl opacity-[0.7]">{user.fullName}</span>
                  <span className="text-sm opacity-[0.7]">{user.username}</span>
                </div>
              </div>
              <div className="flex items-center justify-center flex-col gap-3">
                <div className="flex gap-4 opacity-[0.7]">
                  {" "}
                  <span>{user.followers}</span>
                  <span>{user.following}</span>
                </div>
              </div>
              <div className="w-[50%] m-auto mt-2">
                <p className="opacity-[0.8]">
                  {user.about}
                </p>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <span className="border p-1 rounded-lg">
                  <FacebookOutlined />
                </span>
                <span className="border p-1 rounded-lg">
                  <WbTwilightOutlined />
                </span>
                <span className="border p-1 rounded-lg">
                  <Instagram />
                </span>
                <span className="border p-1 rounded-lg">
                  <YouTube />
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
             {user.posts.map((itme)=>(
              <Card key={itme._id} blogData={itme}/>
             ))}
            </div>
          </div>
          <div
            className={`fixed top-0 right-0 left-0 bottom-0 custom ${editWindow}`}
          >
            <EditProfile setEditWindow={setEditWindow} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
