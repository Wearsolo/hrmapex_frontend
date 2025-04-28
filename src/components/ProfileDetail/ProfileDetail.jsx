import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideMenu from '../SideMenu/Side_menu';
import Topbar from '../Topbar/Topbar';
import { FiEdit2, FiUser, FiBriefcase, FiFileText, FiLock, FiUserCheck, FiCalendar, FiFolder, FiFile, FiCreditCard, FiEye, FiDownload } from 'react-icons/fi';
import { getEmployees } from '../../database/employeeData';
import axios from 'axios';
import './ProfileDetail.css';

const mainTabs = [
  { key: 'profile', label: 'Profile', icon: <FiUserCheck /> },
  { key: 'attendance', label: 'Attendance', icon: <FiCalendar /> },
  { key: 'projects', label: 'Projects', icon: <FiFolder /> },
  { key: 'leave', label: 'Leave', icon: <FiFile /> },
];

const subTabs = [
  { key: 'personal', label: 'Personal Information', icon: <FiUser /> },
  { key: 'professional', label: 'Professional Information', icon: <FiBriefcase /> },
  { key: 'documents', label: 'Documents', icon: <FiFileText /> },
  { key: 'bank', label: 'Bank Information', icon: <FiCreditCard /> },
  { key: 'account', label: 'Account Access', icon: <FiLock /> },
];

const ProfileDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeMainTab, setActiveMainTab] = useState('profile');
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [employeeData, setEmployeeData] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/employees/${id}`);
        if (response.data) {
          setEmployeeData(response.data);
        } else {
          console.error('Employee not found with ID:', id);
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    const fetchProjectData = async () => {
      try {
        console.log('Fetching projects for employee ID:', id);
        const response = await axios.get(`http://localhost:3001/api/projects/${id}`);
        console.log('Project data received:', response.data);
        setProjectData(response.data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjectData([]);
      }
    };

    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/leave/${id}`);
        setLeaveData(response.data || []);
      } catch (error) {
        console.error('Error fetching leave data:', error);
        setLeaveData([]);
      }
    };

    fetchEmployeeData();
    fetchProjectData();
    fetchLeaveData();
  }, [id]);

  useEffect(() => {
    if (employeeData) setEditData(employeeData);
  }, [employeeData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3001/api/attendance/${id}`)
        .then(res => {
          console.log('Attendance data:', res.data);
          setAttendanceData(res.data);
        })
        .catch(error => {
          console.error('Error fetching attendance:', error);
          setAttendanceData([]);
        });
    }
  }, [id]);

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setEditData(employeeData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/employees/${id}`, editData);
      if (response.data) {
        setEmployeeData(editData);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee. Please try again.');
    }
  };

  // Personal Information
  const renderPersonalInformation = () => {
    return (
      <div className="info-section personal-info-section">
        <div className="info-row">
          <div className="info-item">
            <label>First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="FName"
                value={editData.FName || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.FName || '-'}</span>
            )}
          </div>
          <div className="info-item">
            <label>Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="LName"
                value={editData.LName || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.LName || '-'}</span>
            )}
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>Mobile Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="MobileNumber"
                value={editData.MobileNumber || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.MobileNumber || '-'}</span>
            )}
          </div>
          <div className="info-item">
            <label>Age</label>
            {isEditing ? (
              <input
                type="number"
                name="Age"
                value={editData.Age || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.Age || '-'}</span>
            )}
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="DateOfBirth"
                value={editData.DateOfBirth || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">
                {employeeData?.DateOfBirth
                  ? (new Date(employeeData.DateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))
                  : '-'}
              </span>
            )}
          </div>
          <div className="info-item">
            <label>Marital Status</label>
            {isEditing ? (
              <select
                name="MaritalStatus"
                value={editData.MaritalStatus || ''}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="">Select Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
              </select>
            ) : (
              <span className="info-value">{employeeData?.MaritalStatus || '-'}</span>
            )}
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>Gender</label>
            {isEditing ? (
              <select
                name="Gender"
                value={editData.Gender || ''}
                onChange={handleInputChange}
                className="edit-input"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <span className="info-value">{employeeData?.Gender || '-'}</span>
            )}
          </div>
          <div className="info-item">
            <label>Nationality</label>
            {isEditing ? (
              <input
                type="text"
                name="Nationality"
                value={editData.Nationality || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.Nationality || '-'}</span>
            )}
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>Address</label>
            {isEditing ? (
              <input
                type="text"
                name="Address"
                value={editData.Address || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.Address || '-'}</span>
            )}
          </div>
          <div className="info-item">
            <label>City</label>
            {isEditing ? (
              <input
                type="text"
                name="City"
                value={editData.City || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.City || '-'}</span>
            )}
          </div>
        </div>
        <div className="info-row">
          <div className="info-item">
            <label>State</label>
            {isEditing ? (
              <input
                type="text"
                name="State"
                value={editData.State || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.State || '-'}</span>
            )}
          </div>
          <div className="info-item">
            <label>Zip Code</label>
            {isEditing ? (
              <input
                type="text"
                name="ZIPCode"
                value={editData.ZIPCode || ''}
                onChange={handleInputChange}
                className="edit-input"
              />
            ) : (
              <span className="info-value">{employeeData?.ZIPCode || '-'}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Professional Information
  const renderProfessionalInfo = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Employee ID</label>
          {isEditing ? (
            <input
              type="text"
              name="EmployeeId"
              value={editData.EmployeeId || ''}
              onChange={handleInputChange}
              className="edit-input"
              disabled
            />
          ) : (
            <p>{employeeData.EmployeeId || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Department</label>
          {isEditing ? (
            <input
              type="text"
              name="Department"
              value={editData.Department || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Department || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Position</label>
          {isEditing ? (
            <input
              type="text"
              name="Position"
              value={editData.Position || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Position || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Employee Status</label>
          {isEditing ? (
            <input
              type="text"
              name="Status" 
              value={editData.Status || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Status || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Type</label>
          {isEditing ? (
            <input
              type="text"
              name="Type"
              value={editData.Type || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Type || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Salary</label>
          {isEditing ? (
            <input
              type="number"
              name="Salary"
              value={editData.Salary || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Salary ? `฿${employeeData.Salary.toLocaleString()}` : '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="documents-container">
      <div className="document-row">
        <div className="document-item">
          <span>Job application form.pdf</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>Employment contract.jpg</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>Certificate.pdf</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>Copy of ID Card.pdf</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>House Registration.png</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>Bank Account Book.pdf</span>
          <div className="document-actions">
            <button className="button-view">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-view__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <span>View</span>
            </button>
            <button className="button-download">
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="button-download__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankInfo = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Bank Name</label>
          {isEditing ? (
            <input
              type="text"
              name="BankName"
              value={editData.BankName || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.BankName || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Account Holder Name</label>
          {isEditing ? (
            <input
              type="text"
              name="AccountHolderName"
              value={editData.AccountHolderName || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.AccountHolderName || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Account Number</label>
          {isEditing ? (
            <input
              type="text"
              name="AccountNumber"
              value={editData.AccountNumber || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.AccountNumber || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Account Type</label>
          {isEditing ? (
            <input
              type="text"
              name="AccountType"
              value={editData.AccountType || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.AccountType || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Bank Code</label>
          {isEditing ? (
            <input
              type="text"
              name="BankCode"
              value={editData.BankCode || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.BankCode || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Status</label>
          {isEditing ? (
            <input
              type="text"
              name="BankStatus"
              value={editData.BankStatus || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.BankStatus || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Last Updated</label>
          <p>{employeeData.BankLastUpdated || '-'}</p>
        </div>
      </div>
    </div>
  );

  const renderAccountAccess = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              name="Email"
              value={editData.Email || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.Email || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Slack ID</label>
          {isEditing ? (
            <input
              type="text"
              name="SlackID"
              value={editData.SlackID || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.SlackID || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Skype ID</label>
          {isEditing ? (
            <input
              type="text"
              name="SkypeID"
              value={editData.SkypeID || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.SkypeID || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Github ID</label>
          {isEditing ? (
            <input
              type="text"
              name="GithubID"
              value={editData.GithubID || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.GithubID || '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAttendanceTable = () => (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Break</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((row, idx) => (
              <tr key={idx}>
                <td>{new Date(row.Date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}</td>
                <td>{row.CheckInTime}</td>
                <td>{row.CheckOutTime}</td>
                <td>{row.Break || '00:00'} Hrs</td>
                <td>{row.WorkingHours || '00:00'} Hrs</td>
                <td>
                  <span
                    className={`status-badge ${
                      row.Status && row.Status.toLowerCase() === 'ontime'
                        ? 'on-time'
                        : 'late'
                    }`}
                  >
                    {row.Status && row.Status.toLowerCase() === 'ontime' ? 'On Time' : row.Status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '1rem', color: '#666' }}>
                No attendance records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderProjectsTable = () => (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Finish Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectData.length > 0 ? projectData.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{row.ProjectName}</td>
              <td>{row.StartDate ? new Date(row.StartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '-'}</td>
              <td>{row.EndDate ? new Date(row.EndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '-'}</td>
              <td>
                <span
                  className={`status-badge ${row.Status === 'Completed' ? 'on-time' : 'late'}`}
                  style={row.Status === 'Completed'
                    ? { background: '#d1fae5', color: '#10b981' }
                    : { background: '#fff7e6', color: '#eab308' }
                  }
                >
                  {row.Status}
                </span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#aaa' }}>No project data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderLeaveTable = () => {
    const calculateDays = (startDate, endDate) => {
      if (!startDate || !endDate) return 0;
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 เพื่อรวมวันเริ่มต้น
    };

    return (
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Duration</th>
              <th>Days</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.length > 0 ? leaveData.map((row, idx) => (
              <tr key={idx}>
                <td>{new Date(row.StartDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit'
                })}</td>
                <td>{`${new Date(row.StartDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
                })} - ${new Date(row.EndDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit'
                })}`}</td>
                <td>{calculateDays(row.StartDate, row.EndDate)} Days</td>
                <td>{row.Reason || '-'}</td>
                <td>
                  <span
                    className={`status-badge ${
                      row.Status === 'Approved'
                        ? 'on-time'
                        : row.Status === 'Pending'
                        ? 'late'
                        : 'rejected'
                    }`}
                    style={
                      row.Status === 'Approved'
                        ? { background: '#d1fae5', color: '#10b981' }
                        : row.Status === 'Pending'
                        ? { background: '#fff7e6', color: '#eab308' }
                        : { background: '#fee2e2', color: '#ef4444' }
                    }
                  >
                    {row.Status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: '#aaa' }}>No leave data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderActiveSubTabContent = () => {
    switch (activeSubTab) {
      case 'personal':
        return renderPersonalInformation();
      case 'professional':
        return renderProfessionalInfo();
      case 'documents':
        return renderDocuments();
      case 'bank':
        return renderBankInfo();
      case 'account':
        return renderAccountAccess();
      default:
        return null;
    }
  };

  const renderMainTabContent = () => {
    if (activeMainTab === 'profile') {
      return (
        <>
          <div className="profile-tabs">
            {subTabs.map(tab => (
              <button
                key={tab.key}
                className={`tab ${activeSubTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveSubTab(tab.key)}
              >
                {tab.icon}
                <span style={{ marginLeft: 8 }}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="profile-content">
            {renderActiveSubTabContent()}
          </div>
        </>
      );
    }
    if (activeMainTab === 'attendance') {
      return renderAttendanceTable();
    }
    if (activeMainTab === 'projects') {
      return renderProjectsTable();
    }
    if (activeMainTab === 'leave') {
      return renderLeaveTable();
    }
    return (
      <div className="profile-content">
        <div style={{ padding: 40, textAlign: 'center', color: '#7c3aed', fontSize: 20 }}>
          Coming Soon...
        </div>
      </div>
    );
  };

  if (!employeeData) {
    return (
      <div className="dashboard-container">
        <SideMenu isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
        <div className="dashboard-main">
          <Topbar pageTitle="Employee Profile" pageSubtitle="Loading..." />
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <SideMenu isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
      <div className={`dashboard-main ${isMinimized ? 'expanded' : ''}`}>
        <Topbar 
          pageTitle={`All Employees > ${employeeData.FName || ''} ${employeeData.LName || ''}`} 
          pageSubtitle="" 
        />
        <div className="profile-header-section">
          <div className="profile-header-info">
            <img 
              src={employeeData.ImageUrl || '/src/assets/profile.png'} 
              alt="Profile" 
              className="profile-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/src/assets/profile.png';
              }}
            />
            <div>
              <h2 className="profile-name">{`${employeeData.FName} ${employeeData.LName}` || '-'}</h2>
              <span className="profile-role">
                <svg width="18" height="18" style={{verticalAlign: 'middle', marginRight: 4}} fill="none" stroke="#22223b" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                {employeeData.Position || '-'}
              </span>
              <span className="profile-email">
                <svg width="18" height="18" style={{verticalAlign: 'middle', marginRight: 4}} fill="none" stroke="#22223b" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
                {employeeData.Email || '-'}
              </span>
            </div>
          </div>
          {isEditing ? (
            <div className="edit-action-group">
              <button className="edit-profile-btn save" onClick={handleSave}>
                Save
              </button>
              <button className="edit-profile-btn cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-profile-btn" onClick={handleEditClick} disabled={isEditing}>
              <FiEdit2 className="edit-icon" />
              Edit Profile
            </button>
          )}
        </div>
        <div className="profile-main-content">
          <div className="profile-navigation">
            {mainTabs.map(tab => (
              <button
                key={tab.key}
                className={`nav-item ${activeMainTab === tab.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveMainTab(tab.key);
                  if (tab.key === 'profile') setActiveSubTab('personal');
                }}
              >
                {tab.icon}
                <span style={{ marginLeft: 8 }}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="profile-tab-content">
            {renderMainTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateWorkingHours = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return '00:00';
  
  const [checkInHour, checkInMin] = checkIn.split(':');
  const [checkOutHour, checkOutMin] = checkOut.split(':');
  
  const checkInDate = new Date(2000, 0, 1, parseInt(checkInHour), parseInt(checkInMin));
  const checkOutDate = new Date(2000, 0, 1, parseInt(checkOutHour), parseInt(checkOutMin));
  
  const diff = checkOutDate - checkInDate;
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} Hrs`;
};

export default ProfileDetail;