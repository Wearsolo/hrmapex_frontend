import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi'
import './Topbar.css'
import userImage from '../../../assets/profile.png'

function Topbar({ pageTitle = "Dashboard", pageSubtitle = "" }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const currentHour = new Date().getHours()
  
  const userInfo = {
    name: 'Admin',
    role: 'Administrator',
    avatar: userImage,
    employeeId: 'EMP2025044861'
  }
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/login')
  }

  const handleProfileClick = () => {
    setIsDropdownOpen(false)
    navigate(`/employee/${userInfo.employeeId}`)
  }

  return (
    <>
      <div className="topbar">
        <div className="left-section">
          <h1 className="greeting">{pageTitle}</h1>
          <p className="sub-greeting">{pageSubtitle || getGreeting()}</p>  
        </div>

        <div className="right-section">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="notification-btn">
            <FiBell className="bell-icon" />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-dropdown">
            <button 
              className="profile-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={userInfo.avatar} alt="User" className="user-avatar" />
              <div className="user-info">
                <h3 className="user-name">{userInfo.name}</h3>
                <p className="user-role">{userInfo.role}</p>
              </div>
              <FiChevronDown className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={handleProfileClick}>
                    <FiUser />
                    My Profile
                  </button>
                  <button onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

export default Topbar