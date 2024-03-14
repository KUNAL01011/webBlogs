import { useState } from 'react';
import './register.css';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoImg, setLogoImg] = useState('');
  const [previewLogo, setPreviewLogo] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogoImgChange = (event) => {
    const imageFile = event.target.files[0];
    setLogoImg(imageFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewLogo(reader.result);
    };
    reader.readAsDataURL(imageFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send data to API
    const userData = {
      fullName: fullName,
      email: email,
      password: password,
      logoImg: logoImg
    };
    console.log(userData); // For demonstration, you can replace this with your API call
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={handleFullNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Logo Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoImgChange}
            required
          />
        </div>
        {previewLogo && (
          <div className="logo-preview">
            <img src={previewLogo} alt="Logo Preview" />
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
