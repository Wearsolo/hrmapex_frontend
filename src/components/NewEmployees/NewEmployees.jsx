import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiBriefcase, FiFile, FiLock, FiUpload, FiDollarSign } from 'react-icons/fi'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import './NewEmployees.css'
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion'
import { createEmployee } from '../../services/employeeService';

const statusOptions = [
  'Permanent',
  'Probation', 
  'Contract',
  'Intern'
];

const typeOptions = [
  'Office',
  'WorkFromHome',
  'Hybrid'
];

// เพิ่มฟังก์ชันสำหรับจัดรูปแบบวันที่และเวลา
const formatDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function NewEmployees() {
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({
    profileImage: null,
    firstName: '',
    lastName: '',
    nickname: '',      // เพิ่มตรงนี้
    age: '',           // เพิ่มตรงนี้
    email: '',
    phone: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    employeeId: '',
    userName: '',
    department: '',
    position: '',
    status: '',
    type: '',
    startDate: '',
    salary: '',
    employeeType: '',
    designation: '',
    supervisor: '',
    employeeStatus: '',
    workingDays: '',
    joiningDate: '',
    officeLocation: '',
    bankName: '',
    accountHolderName: '',
    accountNumber: '',
    accountType: '',
    bankCode: '',
    bankStatus: '',
    lastUpdated: '',
    slackId: '',
    skypeId: '',
    githubId: '',
    workHistory: [
      { company: '', position: '', start: '', end: '' }
    ]
  })

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate()

  // เพิ่ม state สำหรับ confirmation popup
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [fieldName]: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleWorkHistoryChange = (idx, field, value) => {
    setFormData(prev => {
      const updated = [...prev.workHistory];
      updated[idx][field] = value;
      return { ...prev, workHistory: updated };
    });
  };

  const handleAddWorkHistory = () => {
    setFormData(prev => ({
      ...prev,
      workHistory: [...prev.workHistory, { company: '', position: '', start: '', end: '' }]
    }));
  };

  const handleRemoveWorkHistory = (idx) => {
    setFormData(prev => ({
      ...prev,
      workHistory: prev.workHistory.filter((_, i) => i !== idx)
    }));
  };

  const handleCancel = () => {
    navigate('/employees')
  }

  const handleBack = () => {
    switch (activeTab) {
      case 'professional':
        setActiveTab('personal')
        break
      case 'documents':
        setActiveTab('professional')
        break
      case 'bank':
        setActiveTab('documents')
        break
      case 'account':
        setActiveTab('bank')
        break
      default:
        setActiveTab('personal')
    }
  }

  const handleTabChange = (newTab) => {
    if (!validateTab(activeTab)) {
      // Scroll to the first error field
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstError)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    // ตรวจสอบลำดับของ tab
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    const newIndex = tabs.findIndex(tab => tab.id === newTab);

    // อนุญาตให้ย้อนกลับไปยัง tab ก่อนหน้าได้เสมอ
    if (newIndex < currentIndex) {
      setActiveTab(newTab);
      return;
    }

    // สำหรับการไปข้างหน้า ต้องไปทีละ tab
    if (newIndex === currentIndex + 1) {
      setActiveTab(newTab);
    }
  };

  const validateTab = (tabName) => {
    const newErrors = {};
    
    switch (tabName) {
      case 'personal':
        if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Mobile Number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.zipCode) newErrors.zipCode = 'ZIP Code is required';
        break;

      case 'professional':
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.status) newErrors.status = 'Employee Status is required';
        if (!formData.type) newErrors.type = 'Type is required';
        if (!formData.startDate) newErrors.startDate = 'Start Date is required';
        if (!formData.salary) newErrors.salary = 'Salary is required';
        break;

      case 'bank':
        if (!formData.bankName) newErrors.bankName = 'Bank Name is required';
        if (!formData.accountHolderName) newErrors.accountHolderName = 'Account Holder Name is required';
        if (!formData.accountNumber) newErrors.accountNumber = 'Account Number is required';
        if (!formData.accountType) newErrors.accountType = 'Account Type is required';
        if (!formData.bankCode) newErrors.bankCode = 'Bank Code is required';
        if (!formData.bankStatus) newErrors.bankStatus = 'Status is required';
        
        // ตรวจสอบรูปแบบเลขบัญชี (ตัวเลข 10-12 หลัก)
        if (formData.accountNumber && !/^\d{10,12}$/.test(formData.accountNumber)) {
          newErrors.accountNumber = 'Account Number must be 10-12 digits';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateTab(activeTab)) {
      // Scroll to the first error field
      const firstError = Object.keys(errors)[0];
      const errorElement = document.getElementsByName(firstError)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    switch (activeTab) {
      case 'personal':
        setActiveTab('professional');
        break;
      case 'professional':
        setActiveTab('documents');
        break;
      case 'documents':
        setActiveTab('bank');
        break;
      case 'bank':
        setActiveTab('account');
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  // เพิ่มฟังก์ชันสำหรับ confirm การเพิ่มข้อมูล
  const handleConfirmSubmit = async () => {
    try {
      const employeeData = {
        // Personal Information
        firstName: formData.firstName,
        lastName: formData.lastName,
        nickname: formData.nickname,
        age: parseInt(formData.age),
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        nationality: formData.nationality,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        profileImage: formData.profileImage,

        // Professional Information
        department: formData.department,
        position: formData.position,
        type: formData.type,
        status: formData.status,
        startDate: formData.startDate,
        salary: parseFloat(formData.salary),

        // Bank Information
        bankName: formData.bankName,
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        accountType: formData.accountType,
        bankCode: formData.bankCode,
        bankStatus: formData.bankStatus,

        // Account Access
        slackId: formData.slackId,
        skypeId: formData.skypeId,
        githubId: formData.githubId
      };

      // Save to database
      const response = await axios.post('http://localhost:3001/api/employees', employeeData);
      
      if (response.data.employeeId) {
        // Redirect without showing alert
        setShowConfirmation(false);
        navigate('/employees');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add employee. Please try again.');
    }
  };

  const handleSalaryChange = (operation) => {
    const currentSalary = Number(formData.salary || 0);
    const newSalary = operation === '+' ? currentSalary + 1000 : currentSalary - 1000;
    if (newSalary >= 0) {
      setFormData(prev => ({ ...prev, salary: newSalary }));
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="form-container">
            <div className="profile-upload">
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                onChange={handleImageUpload}
                hidden
              />
              <label htmlFor="profile-image" className="upload-area">
                {formData.profileImage ? (
                  <img src={formData.profileImage} alt="Profile" />
                ) : (
                  <FiUser />
                )}
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
              {/* เพิ่มช่องกรอกชื่อเล่น */}
              <div className="form-group">
                <label>Nickname</label>
                <input
                  type="text"
                  name="nickname"
                  placeholder="Enter nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </div>
              {/* เพิ่มช่องกรอกอายุ */}
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Enter age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <span className="error-text">{errors.dob}</span>}
              </div>
              <div className="form-group">
                <label>Marital Status</label>
                <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                  <option value="">Select marital status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
              <div className="form-group">
                <label>Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  placeholder="Enter nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                />
                {errors.nationality && <span className="error-text">{errors.nationality}</span>}
              </div>
            </div>

            <div className="form-group full-width">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Enter street address"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-grid three-columns">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
                {errors.state && <span className="error-text">{errors.state}</span>}
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Enter ZIP code"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
                {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
              </div>
            </div>
          </div>
        )
      case 'professional':
        return (
          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR</option>
                </select>
                {errors.department && <span className="error-text">{errors.department}</span>}
              </div>
              <div className="form-group">
                <label>Position</label>
                <input
                  type="text"
                  name="position"
                  placeholder="Enter Position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                />
                {errors.position && <span className="error-text">{errors.position}</span>}
              </div>
              <div className="form-group">
                <label>Employee Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                {errors.status && <span className="error-text">{errors.status}</span>}
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.type && <span className="error-text">{errors.type}</span>}
              </div>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                {errors.startDate && <span className="error-text">{errors.startDate}</span>}
              </div>
              <div className="form-group">
                <label>Salary</label>
                <div className="salary-input-group">
                  <button type="button" className="salary-btn decrease" onClick={() => handleSalaryChange('-')}>-</button>
                  <input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter Salary"
                    min="0"
                    required
                  />
                  <button type="button" className="salary-btn increase" onClick={() => handleSalaryChange('+')}>+</button>
                </div>
                {errors.salary && <span className="error-text">{errors.salary}</span>}
              </div>
            </div>

            <div className="work-history-section">
              <h4 style={{ margin: '1.5rem 0 0.5rem 0' }}>Work History</h4>
              <table className="work-history-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Position</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.workHistory.map((row, idx) => (
                    <tr key={idx}>
                      <td>
                        <input
                          type="text"
                          name={`company-${idx}`}
                          placeholder="Company"
                          value={row.company}
                          onChange={e => handleWorkHistoryChange(idx, 'company', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          name={`position-${idx}`}
                          placeholder="Position"
                          value={row.position}
                          onChange={e => handleWorkHistoryChange(idx, 'position', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name={`start-${idx}`}
                          value={row.start}
                          onChange={e => handleWorkHistoryChange(idx, 'start', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          name={`end-${idx}`}
                          value={row.end}
                          onChange={e => handleWorkHistoryChange(idx, 'end', e.target.value)}
                        />
                      </td>
                      <td>
                        {formData.workHistory.length > 1 && (
                          <button
                            type="button"
                            className="btn-remove-row"
                            onClick={() => handleRemoveWorkHistory(idx)}
                            style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                            title="Remove"
                          >
                            &times;
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn-add-row"
                onClick={handleAddWorkHistory}
                style={{
                  marginTop: '0.75rem',
                  background: '#7152f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.4rem 1.2rem',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                + Add more
              </button>
            </div>
          </div>
        );
      case 'documents':
        return (
          <div className="form-container">
            <div className="documents-grid">
              {/* Upload Job Application Form */}
              <div className="document-upload">
                <h3>Job Application Form</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="job-application"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'jobApplication')}
                    hidden
                  />
                  <label htmlFor="job-application" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>

              {/* Upload Employment Contract */}
              <div className="document-upload">
                <h3>Employment Contract</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="employment-contract"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'employmentContract')}
                    hidden
                  />
                  <label htmlFor="employment-contract" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>

              {/* Upload Certificate of Qualification */}
              <div className="document-upload">
                <h3>Certificate of Qualification</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="certificate"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'certificate')}
                    hidden
                  />
                  <label htmlFor="certificate" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>

              {/* Upload National ID Card */}
              <div className="document-upload">
                <h3>Copy of National ID Card</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="national-id"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'nationalId')}
                    hidden
                  />
                  <label htmlFor="national-id" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>

              {/* Upload Household Registration */}
              <div className="document-upload">
                <h3>Household Registration Document</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="household-registration"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'householdRegistration')}
                    hidden
                  />
                  <label htmlFor="household-registration" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>

              {/* Upload Bank Account Book */}
              <div className="document-upload">
                <h3>Bank Account Book</h3>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="bank-book"
                    accept=".pdf,.jpg,.jpeg"
                    onChange={(e) => handleFileUpload(e, 'bankBook')}
                    hidden
                  />
                  <label htmlFor="bank-book" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats : .jpeg, .pdf</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )
      case 'account':
        return (
          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Slack ID</label>
                <input
                  type="text"
                  name="slackId"
                  placeholder="Enter Slack ID"
                  value={formData.slackId}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Skype ID</label>
                <input
                  type="text"
                  name="skypeId"
                  placeholder="Enter Skype ID"
                  value={formData.skypeId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Github ID</label>
                <input
                  type="text"
                  name="githubId"
                  placeholder="Enter Github ID"
                  value={formData.githubId}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )
      case 'bank':
        return (
          <div className="form-container">
            <div className="form-grid">
              <div className="form-group">
                <label>Bank Name</label>
                <select 
                  name="bankName" 
                  value={formData.bankName} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Bank</option>
                  <option value="bangkok-bank">Bangkok Bank</option>
                  <option value="kasikorn-bank">Kasikorn Bank</option>
                  <option value="scb">Siam Commercial Bank</option>
                  <option value="ktb">Krung Thai Bank</option>
                </select>
                {errors.bankName && <span className="error-text">{errors.bankName}</span>}
              </div>
              <div className="form-group">
                <label>Account Holder Name</label>
                <input
                  type="text"
                  name="accountHolderName"
                  placeholder="Enter Account Holder Name"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  required
                />
                {errors.accountHolderName && <span className="error-text">{errors.accountHolderName}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Enter Account Number"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  pattern="\d{10,12}"
                  required
                />
                {errors.accountNumber && <span className="error-text">{errors.accountNumber}</span>}
              </div>
              <div className="form-group">
                <label>Account Type</label>
                <select 
                  name="accountType" 
                  value={formData.accountType} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
                {errors.accountType && <span className="error-text">{errors.accountType}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Bank Code</label>
                <input
                  type="text"
                  name="bankCode"
                  placeholder="Enter Bank Code"
                  value={formData.bankCode}
                  onChange={handleChange}
                  required
                />
                {errors.bankCode && <span className="error-text">{errors.bankCode}</span>}
              </div>
              <div className="form-group">
                <label>Status</label>
                <select 
                  name="bankStatus" 
                  value={formData.bankStatus} 
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                {errors.bankStatus && <span className="error-text">{errors.bankStatus}</span>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Last Updated</label>
                <input
                  type="datetime-local"
                  name="lastUpdated"
                  value={formatDateTime()}
                  readOnly
                  disabled
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    cursor: 'not-allowed',
                    opacity: 0.7 
                  }}
                />
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const tabs = [
    { id: 'personal', label: 'Personal Information', icon: <FiUser /> },
    { id: 'professional', label: 'Professional Information', icon: <FiBriefcase /> },
    { id: 'documents', label: 'Documents', icon: <FiFile /> },
    { id: 'bank', label: 'Bank Information', icon: <FiDollarSign /> },
    { id: 'account', label: 'Account Access', icon: <FiLock /> }
  ];

  // เพิ่ม CSS สำหรับปุ่มและ popup
  const styles = {
    submitButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
    },
    confirmationOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    confirmationModal: {
      backgroundColor: 'var(--bg-primary)',
      padding: '2rem',
      borderRadius: '12px',
      width: '400px',
      textAlign: 'center',
    }
  };

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        <Topbar 
          pageTitle="Add New Employee" 
          pageSubtitle="All Employee>Add New Employee" 
        />
        
        <motion.div 
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={
                    // ปิดการคลิก tab ที่อยู่ห่างเกินกว่า 1 ลำดับ
                    tabs.findIndex(t => t.id === tab.id) > 
                    tabs.findIndex(t => t.id === activeTab) + 1
                  }
                >
                  {tab.icon}
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>

          <div className="form-actions">
            {activeTab === 'personal' ? (
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            ) : (
              <button type="button" className="btn-back" onClick={handleBack}>
                Back
              </button>
            )}
            {activeTab !== 'account' ? (
              <button type="button" className="btn-next" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-submit"
                style={styles.submitButton}
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>

          {/* Confirmation Popup */}
          {showConfirmation && (
            <div style={styles.confirmationOverlay}>
              <motion.div 
                style={styles.confirmationModal}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <h3>Confirm Submission</h3>
                <p>Are you sure you want to add this employee?</p>
                <div style={{ marginTop: '2rem', gap: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <button 
                    className="btn-cancel" 
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-submit"
                    style={styles.submitButton}
                    onClick={handleConfirmSubmit}
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default NewEmployees