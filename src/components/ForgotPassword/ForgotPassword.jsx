import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import bgDashboard from '../../assets/bgdashboard.png'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleSendOTP = () => {
    // Add any validation if needed
    navigate('/otp', { state: { email } })
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <img src={bgDashboard} alt="Dashboard Preview" className="dashboard-preview" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <div className="back-button" onClick={() => window.history.back()}>
            <IoArrowBack className="back-icon" />
            <span>Back</span>
          </div>

          <h2 className="forgot-title">Forgot Password</h2>
          <p className="forgot-subtitle">
            Enter your registered email address, we'll send you a code to reset your password.
          </p>

          <div className="input-group">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <button className="login-button" onClick={handleSendOTP}>
            Send OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword