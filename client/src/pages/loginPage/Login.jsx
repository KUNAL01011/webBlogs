import { Link } from "react-router-dom";
import "./login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../features/auth/authSlice";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
      password: password
    };

    try {
      if(!userData){
        console.log("data is not get");
      }

      const response = await dispatch(loginAsync(userData));

      console.log(response);
      
    }catch(error){
      console.log(error);
    }
     // For demonstration, you can replace this with your API call
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Email</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={handleEmailChange}
          required
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="loginButton">Login</button>
        <p className="register-link">
          Do not have account{" "}
          <Link to="/register" className="link-rg">
            register
          </Link>
        </p>
      </form>
    </div>
  );
}
