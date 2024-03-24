import { useState } from "react";
import "./otp.css";
import { useDispatch } from "react-redux";
import { validationAsync } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function OTPPage() {
  const [firstDigit, setFirstDigit] = useState('');
  const [secondDigit, setSecondDigit] = useState('');
  const [thirdDigit, setThirdDigit] = useState('');
  const [fourthDigit, setFourthDigit] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
    console.log(otp);
    event.preventDefault();
    const data = {
      activation_Code: otp
    }
    if(!data){
      console.log("we don't get otp");
      return;
    }
    const res = await dispatch(validationAsync(data))
    if(res.meta.requestStatus === "fulfilled"){
      setFirstDigit("");
      setSecondDigit("");
      setThirdDigit("");
      setFourthDigit('/otp')
      navigate('/login')
    }
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
    </div>
  );
}

export default OTPPage;
