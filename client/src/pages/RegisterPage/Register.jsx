import axios from 'axios';
import { Link } from "react-router-dom";
import "./register.css";
import { useState } from "react";
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {addToken} from '../../features/blogs/tokenSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      fullName,
      email,
      password,
    };


    if (userData) {
      const response = await axios.post(
        "http://localhost:8000/api/v1/user/register",
        userData
      );

      if (response.data.success) {
        dispatch(addToken(response.data.activationToken));
        navigate("/otp", { replace: true });
      }
      setFullName("");
      setEmail("");
      setPassword("");
    } else {
      console.log("all filed are required");
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form onSubmit={handleSubmit} className="registerForm">
        <label>Full Name</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your fullname..."
          value={fullName}
          onChange={handleFullNameChange}
          required
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={handleEmailChange}
          value={email}
          required
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="registerButton">
          Register
        </button>
        <p className="register-link">
          already have account{" "}
          <Link to="/login" className="link-rg">
            login
          </Link>
        </p>
      </form>
    </div>
  );
}
