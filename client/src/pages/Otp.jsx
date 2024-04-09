import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activateUserAsync } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function OTPPage() {

  const [firstDigit, setFirstDigit] = useState("");
  const [secondDigit, setSecondDigit] = useState("");
  const [thirdDigit, setThirdDigit] = useState("");
  const [fourthDigit, setFourthDigit] = useState("");

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


  const otp = firstDigit + secondDigit + thirdDigit + fourthDigit;

  const handleSubmit = async (event) => {
    console.log(otp);
    event.preventDefault();
    const data = {
      activation_Code: otp,
    };
    if (!data) {
      console.log("we don't get otp");
      return;
    }
    dispatch(activateUserAsync(data))
    
  };


  const userStatus = useSelector((state) => state.user.status);

  if(userStatus){
    setFirstDigit("");
    setSecondDigit("");
    setThirdDigit("");
    setFourthDigit('')
    navigate('/')
  }

  return (
    <div className="w-[30%] m-auto mt-6 text-white">
      <div className="flex flex-col border border-gray-600  rounded-lg p-2 shadow-lg">
        <h3 className="text-center text-lg font-extrabold mt-3">
          OTP Verification
        </h3>
        <p className="text-center text-sm">Code has been send to your mail</p>
        <p className="text-sm mb-4 text-center opacity-[0.7]">kunal34255@gamil.com</p>
        <div className="flex gap-4 items-center justify-center">
          <input type="text" onChange={handleFirstDigit}  className="rounded-lg bg-[#242535] w-12 h-12  text-center" value={firstDigit} maxLength="1" autoFocus />
          <input type="text" onChange={handleSecondDigit} className="rounded-lg bg-[#242535] w-12 h-12  text-center"  value={secondDigit} maxLength="1" />
          <input type="text" onChange={handleThirdDigit}  className="rounded-lg bg-[#242535] w-12 h-12  text-center" value={thirdDigit} maxLength="1" />
          <input type="text" onChange={handleFourthDigit} className="rounded-lg bg-[#242535] w-12 h-12  text-center"  value={fourthDigit} maxLength="1" />
        </div>
        <p className="text-center mt-6">
          Did not get the otp? <span className="text-blue-600">Resend</span>
        </p>
        <button onClick={handleSubmit} className="border w-[50%] m-auto mt-4 mb-4 rounded-full bg-blue-600 border-gray-600 ">Verify</button>
      </div>
    </div>
  );
}

export default OTPPage;
