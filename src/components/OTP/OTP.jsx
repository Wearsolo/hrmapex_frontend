import { useState, useRef } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import bgDashboard from '../../assets/bgdashboard.png'
import './OTP.css'

function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', ''])
  const [error, setError] = useState('')
  const email = "admin@example.com"
  const navigate = useNavigate()
  const backspacePressed = useRef(false)

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto focus next input
    if (value !== '' && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const newOtp = [...otp]

      if (backspacePressed.current) {
        setOtp(['', '', '', '', ''])
        const firstInput = document.getElementById('otp-0')
        if (firstInput) firstInput.focus()
      } else {
        newOtp[index] = ''
        setOtp(newOtp)

        if (index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`)
          if (prevInput) prevInput.focus()
        }
      }
      backspacePressed.current = true
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Backspace') {
      backspacePressed.current = false
    }
  }

  const handleVerify = () => {
    const enteredOTP = otp.join('')
    if (enteredOTP === '11111') {
      setError('Invalid OTP code')
      return
    }
    setError('')
    navigate('/reset-password')
  }

  return (
    <div className="login-container">      <div className="login-left">
        <img src={bgDashboard} alt="Dashboard Preview" className="dashboard-preview" />
      </div>
      <div className="login-right">
        <div className="login-form">
          <div className="back-button" onClick={() => window.history.back()}>
            <IoArrowBack className="back-icon" />
            <span>Back</span>
          </div>

          <h2 className="otp-title">Enter OTP</h2>
          <p className="otp-subtitle">
            We have sent a code to your registered email address
            <br />
            <span className="user-email">{email}</span>
          </p>

          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onKeyUp={handleKeyUp}
                className={`otp-input ${error ? 'error' : ''}`}
              />
            ))}
          </div>
          {error && <p className="error-message">{error}</p>}

          <button className="login-button" onClick={handleVerify}>
            Verify
          </button>
        </div>
      </div>
    </div>
  )
}

export default OTP