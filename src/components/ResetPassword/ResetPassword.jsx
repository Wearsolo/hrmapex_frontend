import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import Popup from '../PopupUpdatePass/Popup'
import bgDashboard from '../../assets/bgdashboard.png'
import './ResetPassword.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = () => {
    setIsPopupOpen(true)
  }

  return (
    <>
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
          <img src={bgDashboard} alt="bg" className="dashboard-preview" />
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="back-button" onClick={() => window.history.back()}>
              <IoArrowBack className="back-icon" />
              <span>Back</span>
            </div>

            <h2 className="reset-title">Reset Password</h2>
            <p className="reset-subtitle">
              Please enter your new password
            </p>

            {/* New Password input with icon */}
            <div className="group">
              <svg className="icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
              />
            </div>

            {/* Confirm New Password input with icon */}
            <div className="group">
              <svg className="icon" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" strokeLinejoin="round" strokeLinecap="round"></path>
              </svg>
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
              />
            </div>

            <button className="login-button" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}

export default ResetPassword