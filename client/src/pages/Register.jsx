import { Link } from "react-router-dom";
import { useState } from "react";
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAsync } from '../features/auth/authSlice.js';


export default function Register() {

  const navigate = useNavigate();

  const dispatch = useDispatch();
  

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      fullName,
      username,
      email,
      password,
    };

    if (!userData) {
      console.log("all filed are required");
      return;
    } 

    dispatch(registerAsync(userData));
  };

  const registerStatus = useSelector((state) => state.user.status);

  if(registerStatus){
    setEmail("");
    setFullName("");
    setPassword("");
    setUsername("");
    navigate('/otp');
  }

  return (
    <div className="border w-[50%] m-auto mt-10 text-white rounded-lg border-gray-600 shadow-xl">
      <h3 className="text-center text-lg font-extrabold mt-3">Register</h3>
      <form onSubmit={handleSubmit} className="flex flex-col w-[80%] m-auto">
        <label>Full Name</label>
        <input
          className="mt-1 mb-6 rounded-lg px-4 py-1 bg-[#242535]"
          type="text"
          placeholder="Enter your fullname..."
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
        <label>Username</label>
        <input
          className="mt-1 mb-6 rounded-lg px-4 py-1 bg-[#242535]"
          type="text"
          placeholder="Enter your fullname..."
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <label>Email</label>
        <input
          className="mt-1 mb-6 rounded-lg px-4 py-1 bg-[#242535]"
          type="text"
          placeholder="Enter your email..."
          onChange={handleEmailChange}
          value={email}
          required
        />
        <label>Password</label>
        <input
          className="mt-1 mb-6 rounded-lg px-4 py-1 bg-[#242535]"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="border mb-1 w-[50%] m-auto rounded-lg bg-blue-600 border-gray-600">
          Register
        </button>
        <p className="text-[14px] opacity-[0.7] text-center mb-6">
          already have an account? 
          <Link to="/login" className="ml-2 text-blue-600 opacity-[1]">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
