import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideMenu from '../SideMenu/Side_menu';
import Topbar from '../Topbar/Topbar';
import { FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import './Account.css';
import '../AnimationCircles/AnimationCircles.css';

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3001/api/employees');
        // Transform employee data to account format using username from database
        const accountData = response.data.map(emp => ({
          id: emp.EmployeeId,
          fullName: `${emp.FName} ${emp.LName}`,
          nickname: emp.Nickname || '-',
          username: emp.username || '-', // Use username field from database
          email: emp.Email || '-',
          phone: emp.MobileNumber || '-',
          status: emp.Status || 'Inactive'
        }));
        setAccounts(accountData);
        setError(null);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Failed to load accounts. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleEdit = async (id) => {
    // Will be implemented later
    console.log('Edit account:', id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${id}`);
      setAccounts(accounts.filter(account => account.id !== id));
    } catch (err) {
      console.error('Error deleting account:', err);
      alert('Failed to delete account');
    }
  };

  const filteredAccounts = accounts.filter(account =>
    Object.values(account).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="account dashboard-container">
      <ul className="circles">
        {[...Array(25)].map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
      <ul className="circles-bottom">
        {[...Array(25)].map((_, i) => (
          <li key={`bottom-${i}`}></li>
        ))}
      </ul>
      <SideMenu 
        isMinimized={isMinimized} 
        onToggleMinimize={() => setIsMinimized(!isMinimized)} 
      />
      <div className="account dashboard-main">
        <div className="account dashboard-content">
          <Topbar pageTitle="Account Management" pageSubtitle="Manage user accounts" />
          <div className="account-container">
            <div className="account-header">
              <div className="account-search-bar">
                <FaSearch className="account-search-icon" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="account-table-container">
              <table className="account-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAccounts.map((account) => (
                    <tr key={account.id}>
                      <td>
                        {account.fullName}
                        {account.nickname !== '-' && ` (${account.nickname})`}
                      </td>
                      <td>{account.username}</td>
                      <td>{account.email}</td>
                      <td>{account.phone}</td>
                      <td>
                        <span className={`account-status-badge ${account.status.toLowerCase()}`}>
                          {account.status}
                        </span>
                      </td>
                      <td className="account-actions">
                        <button
                          className="account-edit-btn"
                          onClick={() => handleEdit(account.id)}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="account-delete-btn"
                          onClick={() => handleDelete(account.id)}
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;