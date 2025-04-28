import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUsers, FaUserPlus, FaRegCalendarCheck, FaProjectDiagram } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import './Dashboard.css'
import axios from 'axios'

// Mock data for attendance
const attendanceData = {
  today: [
    { day: 'Mon', office: 75, remote: 15, absent: 10 },
    { day: 'Tue', office: 80, remote: 12, absent: 8 },
    { day: 'Wed', office: 70, remote: 20, absent: 10 },
    { day: 'Thu', office: 85, remote: 10, absent: 5 },
    { day: 'Fri', office: 65, remote: 25, absent: 10 },
    { day: 'Sat', office: 40, remote: 10, absent: 50 },
    { day: 'Sun', office: 30, remote: 5, absent: 65 }
  ],
  week: [
    { day: 'Week 1', office: 82, remote: 12, absent: 6 },
    { day: 'Week 2', office: 78, remote: 15, absent: 7 },
    { day: 'Week 3', office: 75, remote: 18, absent: 7 },
    { day: 'Week 4', office: 80, remote: 14, absent: 6 }
  ],
  month: [
    { day: 'Jan', office: 85, remote: 10, absent: 5 },
    { day: 'Feb', office: 82, remote: 13, absent: 5 },
    { day: 'Mar', office: 78, remote: 15, absent: 7 },
    { day: 'Apr', office: 75, remote: 18, absent: 7 },
    { day: 'May', office: 80, remote: 12, absent: 8 },
    { day: 'Jun', office: 77, remote: 15, absent: 8 },
    { day: 'Jul', office: 82, remote: 13, absent: 5 },
    { day: 'Aug', office: 85, remote: 10, absent: 5 },
    { day: 'Sep', office: 80, remote: 15, absent: 5 },
    { day: 'Oct', office: 78, remote: 17, absent: 5 },
    { day: 'Nov', office: 75, remote: 20, absent: 5 },
    { day: 'Dec', office: 70, remote: 25, absent: 5 }
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
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [isChartVisible, setIsChartVisible] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [scheduleItems, setScheduleItems] = useState(scheduleData)
  const [dashboardCounts, setDashboardCounts] = useState({
    totalEmployees: 0,
    totalProjects: 0,
    todayAttendance: 0
  });
  const userInfo = {
    name: 'Admin'
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
    }
    // Trigger chart animation after component mount
    setTimeout(() => setIsChartVisible(true), 800)

    // Fetch dashboard counts
    const fetchDashboardCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/dashboard/counts')
        setDashboardCounts(response.data)
      } catch (error) {
        console.error('Error fetching dashboard counts:', error)
      }
    }

    fetchDashboardCounts()
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
    <motion.div 
      className="dashboard-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <SideMenu />
      <div className="dashboard-main">
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
                <span className="trend positive">Up to date</span>
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
                <span className="trend positive">+4%</span>
                <span className="update-time">Update: July 14, 2023</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="stat-header">
                <span className="stat-label">Today Attendance</span>
                <FaRegCalendarCheck className="stat-icon" />
              </div>
              <div className="stat-value">{dashboardCounts.todayAttendance}</div>
              <div className="stat-footer">
                <span className="trend positive">Up to date</span>
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
                <span className="stat-label">Total Projects</span>
                <FaProjectDiagram className="stat-icon" />
              </div>
              <div className="stat-value">{dashboardCounts.totalProjects}</div>
              <div className="stat-footer">
                <span className="trend positive">Up to date</span>
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
            >
              <div className="section-header">
                <div className="header-left">
                  <h2>Attendance Overview</h2>
                  <div className="chart-legend">
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color office"></div>
                      <span>Office</span>
                    </motion.div>
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color remote"></div>
                      <span>Remote</span>
                    </motion.div>
                    <motion.div 
                      className="legend-item"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="legend-color absent"></div>
                      <span>Absent</span>
                    </motion.div>
                  </div>
                </div>
                <select 
                  className="period-select"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                </select>
              </div>
              <div className="attendance-chart">
                <AnimatePresence>
                  {attendanceData[selectedPeriod].map((data, index) => (
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
                    >
                      <div className="bars">
                        <motion.div 
                          className="bar office" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${data.office}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1,
                              ease: "easeOut"
                            }
                          }}
                          title={`Office: ${data.office}%`}
                        />
                        <motion.div 
                          className="bar remote" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${data.remote}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1 + 0.2,
                              ease: "easeOut"
                            }
                          }}
                          title={`Remote: ${data.remote}%`}
                        />
                        <motion.div 
                          className="bar absent" 
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${data.absent}%`,
                            transition: { 
                              duration: 0.8,
                              delay: index * 0.1 + 0.4,
                              ease: "easeOut"
                            }
                          }}
                          title={`Absent: ${data.absent}%`}
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
                    </div>
                    <motion.div
                      whileHover={{ rotate: 90 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BsThreeDots className="more-icon" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard