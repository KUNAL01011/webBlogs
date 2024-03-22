import { useState } from "react";
import "./otp.css";
// import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

function OTPPage() {
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setSecondDigit] = useState('');
  const [thirdDigit, setThirdDigit] = useState('');
  const [fourthDigit, setFourthDigit] = useState('');
  const [mesg , setMesg] = useState('');
  
  const handleFirstDigit = (event) => {
    setFirstDigit(event.target.value);
  };
  const handleSecondDigit = (event) => {
    setSecondDigit(event.target.value);
  };
  const handleThirdDigit = (event) => {
    setThirdDigit(event.target.value);
  };
  const handleFourthDigit = (event) => {
    setFourthDigit(event.target.value);
  };

  // const token = useSelector((state) => state.token.token);
  const otp = firstDigit + secondDigit + thirdDigit + fourthDigit;

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can handle OTP verification or further actions here
    // console.log(token)
    console.log(otp)
    const data = {
      activation_Code: "",
    };

    if (otp) {
      // data.activation_Token = token;
      data.activation_Code = otp;
    }

    const response = await axios.post(
      "http://localhost:8000/api/v1/user/activate_user",
      data
    );

    setMesg(response.data);
  };

  return (
    <div className="body">
      <div className="otp-card">
        <h1>OTP Verification</h1>
        <p>Code has been send to your mail</p>
        <div className="otp-card-inputs">
          <input type="text" onChange={handleFirstDigit} value={firstDigit} maxLength="1" autoFocus />
          <input type="text" onChange={handleSecondDigit} value={secondDigit} maxLength="1" />
          <input type="text" onChange={handleThirdDigit} value={thirdDigit} maxLength="1" />
          <input type="text" onChange={handleFourthDigit} value={fourthDigit} maxLength="1" />
        </div>
        <p>
          Did not get the otp <a href="#">Resend</a>
        </p>
        <button onClick={handleSubmit}>Verify</button>
      </div>
      <p>{mesg &&<span>{mesg} <Link to = "/login"> login </Link></span>}</p>
    </div>
  );
}

export default OTPPage;
