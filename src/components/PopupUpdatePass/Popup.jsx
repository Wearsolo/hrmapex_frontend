import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Popup.css'

const PopupUpdatePass = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const [isClosing, setIsClosing] = useState(false)

  const handleBackToLogin = () => {
    setIsClosing(true)
    setTimeout(() => {
      onClose()
      navigate('/login')
    }, 300) // Match animation duration
  }

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {isOpen && (
        <div className={`popup-overlay ${isClosing ? 'closing' : ''}`}>          <div className={`popup-content ${isClosing ? 'closing' : ''}`}>
            <div className="success-animation">
              <div className="checkmark-circle">
                <div className="checkmark-check"></div>
              </div>
            </div>
            <h2 className="popup-title">Password Updated Successfully!</h2>
            <p className="popup-message">
              Your password has been changed successfully. Please use your new password to login.
            </p>
            <button 
              className="back-to-login-button"
              onClick={handleBackToLogin}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default PopupUpdatePass