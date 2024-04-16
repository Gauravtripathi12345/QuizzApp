import React, { useState } from 'react';
import './ForgotPassword.css';
import axios from 'axios'; 

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const sendOTP = () => {
    const requestData = { email: email }; // Wrap email inside an object
    axios.post('https://localhost:5112/api/password/sendotp', requestData.email)
      .then(response => {
        setSuccessMessage(response.data); // Display success message
        setShowOtpForm(true); // Show OTP form
      })
      .catch(error => {
        setErrorMessage(error.response.data); // Display error message
      });
  };

  const verifyOTP = () => {
    axios.post('https://localhost:5112/api/password/verifyotp', { email, otp }) // Verify OTP with backend API
      .then(response => {
        if (response.data.isVerified) {
          setSuccessMessage('OTP verified successfully!');
          setShowPasswordForm(true); // Show password form
        } else {
          setErrorMessage('Invalid OTP');
        }
      })
      .catch(error => {
        setErrorMessage(error.response.data); // Display error message
      });
  };

  const updatePassword = () => {
    axios.post('https://localhost:5112/api/password/updatepassword', { email, newPassword }) // Update password with backend API
      .then(response => {
        setSuccessMessage(response.data); // Display success message
        setErrorMessage(''); // Clear error message
      })
      .catch(error => {
        setErrorMessage(error.response.data); // Display error message
      });
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <div className="forgot-password-form">
          <label htmlFor="email">Enter registered Email Id:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {!showOtpForm && <button onClick={sendOTP}>Send OTP</button>}

          {showOtpForm && (
            <>
              <label htmlFor="otp">Enter OTP:</label>
              <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} />
              <button onClick={verifyOTP}>Verify OTP</button>
            </>
          )}

          {showPasswordForm && (
            <>
              <label htmlFor="new-password">New Password:</label>
              <input type="password" id="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

              <label htmlFor="confirm-password">Confirm Password:</label>
              <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

              <button onClick={updatePassword}>Update Password</button>
            </>
          )}
        </div>

        {successMessage && !errorMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && !successMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}

export default ForgotPassword;
