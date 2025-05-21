import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login/Login'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import OTP from './components/OTP/OTP'
import ResetPassword from './components/ResetPassword/ResetPassword'
import Dashboard from './components/DashBoard/Dashboard'
import AllEmployees from './components/AllEmployees/AllEmployees'
import NewEmployees from './components/NewEmployees/NewEmployees'
import ProfileDetail from './components/ProfileDetail/ProfileDetail'
import New from './components/Newspage/New'
import AddNew from './components/Newspage/AddNews/Addnew'
import Leaves from './components/Leaves/leaves'
import Payroll from './components/Payroll/Payroll'
import PayrollDetail from './components/PayrollDetail/PayrollDetail'
import Disbursement from './components/Disbursement/disbursement'
import Adddisburse from './components/Disbursement/Adddisburse'
import LeaveDetail from './components/Leaves/leavesdetail'
import Setting from './components/Layout/setting'
import Holidays from './components/holidays/holidays'
import NewHoliday from './components/holidays/NewHoliday'
import { ThemeProvider } from './context/ThemeContext'
import './styles/global.css'

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<AllEmployees />} />
          <Route path="/new-employee" element={<NewEmployees />} />
          <Route path="/employee/:id" element={<ProfileDetail />} />
          <Route path="/news" element={<New />} />
          <Route path="/addnews" element={<AddNew />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/leaves/detail/:empId" element={<LeaveDetail />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/payroll-detail/:id" element={<PayrollDetail />} />
          <Route path="/disbursement" element={<Disbursement />} />
          <Route path="/adddisburse" element={<Adddisburse />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/holidays" element={<Holidays />} />
          <Route path="/newholiday/:monthIndex" element={<NewHoliday />} />
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
