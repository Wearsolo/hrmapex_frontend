import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  FaUsers, 
  FaSitemap, 
  FaRegClock,
  FaMoneyBillWave,
  FaBriefcase,
  FaEnvelope, // เพิ่มไอคอนกล่องจดหมาย
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaCog,
} from 'react-icons/fa'
import { BsGrid } from 'react-icons/bs'
import { BiSun, BiMoon } from 'react-icons/bi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import './Side_menu.css'

const SideMenu = ({ isMinimized, onToggleMinimize, hasPopup }) => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  
  const menuItems = [
    { icon: <BsGrid />, text: 'Dashboard', path: '/dashboard' },
    { icon: <FaUsers />, text: 'All Employees', path: '/employees' },
    { icon: <FaSitemap />, text: 'All Departments', path: '/departments' },
    { icon: <FaRegClock />, text: 'Attendance', path: '/attendance' },
    { icon: <FaMoneyBillWave />, text: 'Payroll', path: '/payroll' },
    { icon: <FaBriefcase />, text: 'Jobs', path: '/jobs' },
    { icon: <FaEnvelope />, text: 'News', path: '/news' }, // เปลี่ยนเป็น FaEnvelope
    { icon: <FaCalendarAlt />, text: 'Leaves', path: '/leaves' },
    { icon: <FaRegCalendarCheck />, text: 'Holidays', path: '/holidays' },
    { icon: <FaCog />, text: 'Settings', path: '/settings' },
  ]

  const isActive = (path) => {
    // Check if current path is Add New Employee or Employee Profile and path is All Employees
    if ((location.pathname === '/new-employee' || location.pathname.startsWith('/employee/')) && path === '/employees') {
      return true;
    }
    // Check if current path is Add News and path is News
    if (location.pathname === '/addnews' && path === '/news') {
      return true;
    }
    return location.pathname === path;
  }

  return (
    <motion.div 
      className={`side-menu ${isMinimized ? 'minimized' : ''} ${hasPopup ? 'has-popup' : ''} ${isDark ? 'dark' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-container">
        <motion.h1 
          className="logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onToggleMinimize}
          role="button"
          tabIndex={0}
        >
          <span className="logo-icon">∞</span>
          {!isMinimized && 'HRMS'}
        </motion.h1>
      </div>

      <nav className="menu-items">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link 
              to={item.path} 
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              title={isMinimized ? item.text : ''}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isMinimized && <span className="menu-text">{item.text}</span>}
            </Link>
          </motion.div>
        ))}
      </nav>

      {!isMinimized && (
        <motion.div 
          className="theme-toggle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <label className="theme-switch">
            <span className="theme-sun">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="#ffd43b"><circle r="5" cy="12" cx="12"></circle><path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z"></path></g></svg>
            </span>
            <span className="theme-moon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path></svg>
            </span>
            <input
              type="checkbox"
              className="theme-input"
              checked={isDark}
              onChange={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            />
            <span className="theme-slider"></span>
          </label>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SideMenu