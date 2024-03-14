import  { useState } from 'react';
import './otp.css';

function OTPPage() {
  const [otp, setOtp] = useState('');

  const handleChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can handle OTP verification or further actions here
    console.log('Entered OTP:', otp);
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Enter OTP</h2>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            maxLength="6"
            autoFocus
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default OTPPage;
