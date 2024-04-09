import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync } from "../features/auth/authSlice";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      if (!userData) {
        console.log("data is not get");
      }

      await dispatch(loginAsync(userData));
    } catch (error) {
      console.log(error);
    }
  };


  const registerStatus = useSelector((state) => state.user.status);

  if(registerStatus){
    setEmail("");
    setPassword("");
    navigate('/');
  }

  return (
    <div className="border w-[50%] m-auto mt-10 text-white rounded-lg border-gray-600 shadow-xl">
      <h3 className="text-center text-lg font-extrabold mt-3">Login</h3>
      <form onSubmit={handleSubmit} className="flex flex-col w-[80%] m-auto">
        <label>Email</label>
        <input
          className="mt-1 mb-6 rounded-lg px-4 py-1 bg-[#242535]"
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Password</label>
        <input
          className="mt-1  rounded-lg px-4 py-1 bg-[#242535]"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <div className="text-sm text-blue-600 text-end mb-6"><span>Forget Password?</span></div>
        <button type="submit" className="border mb-1 w-[50%] m-auto rounded-lg bg-blue-600 border-gray-600">
          Login
        </button>
        <p className="text-[14px] opacity-[0.7] text-center mb-6">
          Dont have an account? 
          <Link to="/register" className="ml-2 text-blue-600 opacity-[1]">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
