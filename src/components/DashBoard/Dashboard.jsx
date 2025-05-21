import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUsers, FaUserPlus, FaRegCalendarCheck, FaLeaf } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import './Dashboard.css'
import axios from 'axios'
import '../AnimationCircles/AnimationCircles.css'

// Mock data for payroll
const payrollData = {
  today: [
    { day: 'Mon', base: 150000, bonus: 25000, overtime: 10000 },
    { day: 'Tue', base: 155000, bonus: 22000, overtime: 8000 },
    { day: 'Wed', base: 148000, bonus: 20000, overtime: 12000 },
    { day: 'Thu', base: 152000, bonus: 18000, overtime: 9000 },
    { day: 'Fri', base: 151000, bonus: 21000, overtime: 11000 },
    { day: 'Sat', base: 145000, bonus: 15000, overtime: 5000 },
    { day: 'Sun', base: 142000, bonus: 12000, overtime: 4000 }
  ],
  week: [
    { day: 'Week 1', base: 750000, bonus: 120000, overtime: 45000 },
    { day: 'Week 2', base: 780000, bonus: 125000, overtime: 48000 },
    { day: 'Week 3', base: 760000, bonus: 118000, overtime: 42000 },
    { day: 'Week 4', base: 770000, bonus: 122000, overtime: 46000 }
  ],
  month: [
    { day: 'Jan', base: 3200000, bonus: 480000, overtime: 180000 },
    { day: 'Feb', base: 3180000, bonus: 475000, overtime: 178000 },
    { day: 'Mar', base: 3220000, bonus: 485000, overtime: 182000 },
    { day: 'Apr', base: 3150000, bonus: 470000, overtime: 175000 },
    { day: 'May', base: 3250000, bonus: 490000, overtime: 185000 },
    { day: 'Jun', base: 3180000, bonus: 475000, overtime: 178000 },
    { day: 'Jul', base: 3200000, bonus: 480000, overtime: 180000 },
    { day: 'Aug', base: 3220000, bonus: 485000, overtime: 182000 },
    { day: 'Sep', base: 3190000, bonus: 478000, overtime: 179000 },
    { day: 'Oct', base: 3210000, bonus: 482000, overtime: 181000 },
    { day: 'Nov', base: 3230000, bonus: 486000, overtime: 183000 },
    { day: 'Dec', base: 3250000, bonus: 490000, overtime: 185000 }
  ]
}

// Mock data for schedule
const scheduleData = [
  {
    time: '09:30',
    title: 'UI/UX Design Practical Task Review',
    type: 'Team Lead - Design',
    status: 'On Time'
  },
  {
    time: '11:00',
    title: 'Team Leader Meeting',
    type: 'All Department Heads',
    status: 'Upcoming'
  },
  {
    time: '12:00',
    title: 'Backend Developer Resume Review',
    type: 'HR Department',
    status: 'On Time'
  },
  {
    time: '13:30',
    title: 'Sales Manager Final HR Round',
    type: 'HR Department',
    status: 'Late'
  },
  {
    time: '15:00',
    title: 'Frontend Developer Technical Test',
    type: 'Development Team',
    status: 'Upcoming'
  }
]

function Dashboard() {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduleItems, setScheduleItems] = useState(scheduleData)
  const [isLoading, setIsLoading] = useState(true)
  const [dashboardCounts, setDashboardCounts] = useState({
    totalEmployees: 0,
    totalApplicants: 1050,
    totalDisbursement: 0,
    totalLeaves: 0,
    employeeChange: '0%',
    applicantChange: '0%',
    disbursementChange: '0%',
    leavesChange: '0%'
  });

  const userInfo = {
    name: localStorage.getItem('userName') || 'Admin'
  }

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      // Simulate fetching data for the new month
      setScheduleItems(generateMockSchedule(newDate))
      return newDate
    })
  }

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      // Simulate fetching data for the new month
      setScheduleItems(generateMockSchedule(newDate))
      return newDate
    })
  }

  // Function to generate mock schedule data for different months
  const generateMockSchedule = (date) => {
    const month = date.toLocaleString('default', { month: 'long' })
    return [
      {
        time: '09:30',
        title: `${month} Planning Meeting`,
        type: 'Team Lead - Design',
        status: 'Upcoming'
      },
      {
        time: '11:00',
        title: 'Department Sync',
        type: 'All Department Heads',
        status: 'Upcoming'
      },
      {
        time: '13:30',
        title: `${month} Performance Review`,
        type: 'HR Department',
        status: 'Upcoming'
      },
      {
        time: '15:00',
        title: 'Project Status Update',
        type: 'Development Team',
        status: 'Upcoming'
      }
    ]
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const fetchDashboardData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/counts')
        if (response.data) {
          setDashboardCounts(prev => ({
            ...prev,
            ...response.data,
            employeeChange: response.data.employeeChange || '+4%',
            applicantChange: response.data.applicantChange || '-2%',
            attendanceChange: response.data.attendanceChange || '+6%',
            projectChange: response.data.projectChange || '-5%'
          }))
        }
      } catch (error) {
        console.error('Error fetching dashboard counts:', error)
      } finally {
        setIsLoading(false)
        setTimeout(() => setIsChartVisible(true), 800)
      }
    }

    fetchDashboardData()
  }, [navigate])

  // Animation variants for components
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 0.8
      }
    }
  }

  const chartVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        mass: 0.8,
        duration: 0.6
      }
    }
  }

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        {/* Add circles animation */}
        <ul className="circles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
        <ul className="circles-bottom">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>

        <Topbar 
          pageTitle={`Hello ${userInfo.name} 👋`}
          pageSubtitle="Good morning"
        />
        
        <div className="dashboard-content">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
          >
            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="stat-header">
                <span className="stat-label">Total Employee</span>
                <FaUsers className="stat-icon" />
              </div>
              <div className="stat-value">{dashboardCounts.totalEmployees}</div>
              <div className="stat-footer">
                <span className={`trend ${dashboardCounts.employeeChange.startsWith('+') ? 'positive' : 'negative'}`}>
                  {dashboardCounts.employeeChange}
                </span>
                <span className="update-time">Update: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="stat-header">
                <span className="stat-label">Total Applicant</span>
                <FaUserPlus className="stat-icon" />
              </div>
              <div className="stat-value">1050</div>
              <div className="stat-footer">
                <span className={`trend ${dashboardCounts.applicantChange.startsWith('+') ? 'positive' : 'negative'}`}>
                  {dashboardCounts.applicantChange}
                </span>
                <span className="update-time">Update: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >              <div className="stat-header">
                <span className="stat-label">Total Disbursement</span>
                <FaRegCalendarCheck className="stat-icon" />
              </div>
              <div className="stat-value">{dashboardCounts.totalDisbursement || 0}</div>
              <div className="stat-footer">
                <span className={`trend ${dashboardCounts.disbursementChange?.startsWith('+') ? 'positive' : 'negative'}`}>
                  {dashboardCounts.disbursementChange || '0%'}
                </span>
                <span className="update-time">Update: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >              <div className="stat-header">
                <span className="stat-label">Total Leaves</span>
                <FaLeaf className="stat-icon" />
              </div>
              <div className="stat-value">{dashboardCounts.totalLeaves || 0}</div>
              <div className="stat-footer">
                <span className={`trend ${dashboardCounts.leavesChange?.startsWith('+') ? 'positive' : 'negative'}`}>
                  {dashboardCounts.leavesChange || '0%'}
                </span>
                <span className="update-time">Update: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="content-grid">
            <motion.div 
              className="chart-section"
              variants={chartVariants}
              initial="hidden"
              animate={isChartVisible ? "visible" : "hidden"}
            >              <div className="section-header">
                <div className="header-left">
                  <h2>Payroll Overview</h2>
                  <div className="chart-legend">
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color office"></div>
                      <span>Base Salary</span>
                    </motion.div>
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color remote"></div>
                      <span>Bonus</span>
                    </motion.div>
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color absent"></div>
                      <span>Overtime</span>
                    </motion.div>
                  </div>
                </div>                <select 
                  className="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="attendance-chart">
                <AnimatePresence>
                  {payrollData[selectedPeriod].map((data, index) => (
                    <motion.div 
                      key={index} 
                      className="chart-column"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.1 }
                      }}
                      exit={{ opacity: 0, y: -20 }}
                    >                      <div className="bars">                        <motion.div 
                          className="bar office" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(data.base / (selectedPeriod === 'month' ? 50000 : 20000))}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1,
                              ease: "easeOut"
                            }
                          }}
                          title={`Base Salary: ฿${data.base.toLocaleString()}`}
                        />
                        <motion.div 
                          className="bar remote" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(data.bonus / (selectedPeriod === 'month' ? 50000 : 20000))}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1 + 0.2,
                              ease: "easeOut"
                            }
                          }}
                          title={`Bonus: ฿${data.bonus.toLocaleString()}`}
                        />
                        <motion.div 
                          className="bar absent" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(data.overtime / (selectedPeriod === 'month' ? 50000 : 20000))}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1 + 0.4,
                              ease: "easeOut"
                            }
                          }}
                          title={`Overtime: ฿${data.overtime.toLocaleString()}`}
                        />
                      </div>
                      <div className="day-label">{data.day}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              className="schedule-section"
              variants={itemVariants}
            >
              <div className="section-header">
                <h2>My Schedule</h2>
                <div className="calendar-nav">
                  <motion.button 
                    className="nav-btn prev"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevMonth}
                  >
                    ‹
                  </motion.button>
                  <span>March 2026</span>
                  <motion.button 
                    className="nav-btn next"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNextMonth}
                  >
                    ›
                  </motion.button>
                </div>
              </div>
              <div className="schedule-list">
                {scheduleItems.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`schedule-item ${item.status.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ 
                      x: 0, 
                      opacity: 1,
                      transition: { delay: index * 0.1 }
                    }}
                    whileHover={{ 
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="time">{item.time}</div>
                    <div className="event">
                      <h4>{item.title}</h4>
                      <p>{item.type}</p>
                      <span className={`status ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {item.status}
                      </span>
                    </div>                    <div>
                      <BsThreeDots className="more-icon" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard