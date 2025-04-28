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
        </Routes>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
