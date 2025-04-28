import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Popup.css'
import partyPopper from '../../assets/party-popper.png'

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
        <div className={`popup-overlay ${isClosing ? 'closing' : ''}`}>
          <div className={`popup-content ${isClosing ? 'closing' : ''}`}>
            <img 
              src={partyPopper} 
              alt="Success" 
              className="success-icon"
            />
            <h2 className="popup-title">Password Update Successfully</h2>
            <p className="popup-message">
              Your password has been update successfully
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