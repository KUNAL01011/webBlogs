import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserDetailAsync } from "../features/auth/authSlice.js";

const EditProfile = ({setEditWindow}) => {
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user)
  console.log(user);

  const handleClick = ()=>{
    setEditWindow('hidden')
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [username, setUsername] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      fullName,
      email,
      about,
      username
    }

    if(!userData){
      console.log("soory data is requierd ");
      return ;
    }

    await dispatch(updateUserDetailAsync(userData))

  
  } 
  return (
    <div className="border w-[50%] m-auto mt-8 text-black bg-[#e6e7ee] rounded-lg">
      <div className="flex justify-between px-2 pt-3 border-b-2 border-gray-500 pb-3">
        <h2>Edit Profile</h2>
        <CloseIcon onClick = {handleClick}/>
      </div>
      {/* avatar updatation */}
      <div className="flex border-b-2 border-gray-600 px-10 py-10 justify-center flex-col">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload avatar</label>
          <input
            className="mt-1  rounded-lg px-4 py-1 bg-[#242535]"
            type="file"
            name=""
            id=""
          />
        </div>
        <button className="border mt-4 mb-4 w-[50%] m-auto rounded-lg bg-blue-600 border-gray-600">
          upload
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col w-[80%] m-auto mt-4">
        <label>FullName</label>
        <input
          className="mt-1 rounded-lg px-4 py-1 bg-[#242535] "
          type="text"
          placeholder="Enter your fullname..."
          onChange={handleFullNameChange}
          value={fullName}
          required
        />
        <label className="mt-2">Username</label>
        <input
          className="mt-1  rounded-lg px-4 py-1 bg-[#242535]"
          type="password"
          placeholder="Enter your username..."
          onChange={handleUsernameChange}
          value={username}
        />
        <label className="mt-2">Email</label>
        <input
          className="mt-1  rounded-lg px-4 py-1 bg-[#242535]"
          type="password"
          placeholder="Enter your email..."
          onChange={handleEmailChange}
          value={email}
        />
        <label className="mt-2">About</label>
        <textarea
          className="mt-1  rounded-lg px-4 py-1 bg-[#242535]"
          type="text"
          placeholder="about yourself..."
          onChange={handleAboutChange}
          value={about}
        />
        <button
          type="submit"
          className="border mt-4 mb-4 w-[50%] m-auto rounded-lg bg-blue-600 border-gray-600"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
