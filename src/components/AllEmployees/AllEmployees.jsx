import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiPlus, FiFilter } from 'react-icons/fi'
import axios from 'axios'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import FilterModal from '../FilterModal/FilterModal'
import './AllEmployees.css'

const AllEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    departments: [],
    type: ''
  })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const departments = ['Design', 'Development', 'Sales', 'HR', 'PM', 'BA']
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await axios.get('http://localhost:3001/api/employees')
        setEmployees(response.data)
        setFilteredEmployees(response.data)
      } catch (error) {
        console.error('Error fetching employees:', error)
        setError('Failed to fetch employees. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEmployees()
  }, [navigate])

  useEffect(() => {
    const filtered = employees.filter(employee => {
      const searchTerm = search.toLowerCase().trim();
      
      if (!searchTerm) return true;

      const searchableFields = [
        `${employee.FName} ${employee.LName}`,
        employee.Nickname,
        employee.MobileNumber,
        employee.Email,
        employee.Age?.toString(),
        employee.Department,
        employee.Position,
        employee.Type,
        employee.Status,
        // Bank information
        employee.BankName,
        employee.AccountNumber,
        employee.AccountType,
        employee.AccountHolderName
      ].map(field => (field || '').toString().toLowerCase());

      return searchableFields.some(field => field.includes(searchTerm));
    });

    const departmentFiltered = filters.departments.length === 0 
      ? filtered 
      : filtered.filter(emp => filters.departments.includes(emp.Department));

    const typeFiltered = !filters.type 
      ? departmentFiltered 
      : departmentFiltered.filter(emp => emp.Type === filters.type);

    setFilteredEmployees(typeFiltered);
    setCurrentPage(1);
  }, [search, employees, filters])

  // Get current employees
  const indexOfLastEmployee = currentPage * itemsPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setDeleteModalOpen(true)
  }

  // Handle delete employee
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${employeeToDelete.EmployeeId}`)
      const updatedEmployees = employees.filter(
        emp => emp.EmployeeId !== employeeToDelete.EmployeeId
      )
      setEmployees(updatedEmployees)
      setFilteredEmployees(updatedEmployees)
      setDeleteModalOpen(false)
      setEmployeeToDelete(null)
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('Failed to delete employee')
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setEmployeeToDelete(null)
  }

  const toggleDepartment = (dep) => {
    setSelectedDepartments(prev => 
      prev.includes(dep) 
        ? prev.filter(d => d !== dep)
        : [...prev, dep]
    )
  }

  const handleReset = () => {
    setSelectedDepartments([])  // reset department
    setFilters({ departments: [], type: '' })  // reset type
  }

  return (
    <div className={`dashboard-container ${deleteModalOpen || isFilterModalOpen ? 'has-popup' : ''}`}>
      <SideMenu 
        isMinimized={isMinimized} 
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
      <div className="dashboard-main">
        <Topbar pageTitle="All Employees" pageSubtitle="All Employees Information" />
        <motion.div 
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="search-actions">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button className="add-employee-btn" onClick={() => navigate('/new-employee')}>
                <FiPlus className="btn-icon" />
                <span>Add New Employee</span>
              </button>
              <button className="filter-btn" onClick={() => setIsFilterModalOpen(true)}>
                <FiFilter className="btn-icon" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              <div className="employees-table">
                <table>
                  <thead>
                    <tr>
                      <th>Employee Name (Nickname)</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Position</th>
                      <th>Start Date</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEmployees.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="no-data">
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      currentEmployees.map((employee, index) => (
                        <tr key={employee.EmployeeId || index}>
                          <td className="employee-name">
                            <img 
                              src={employee.ImageUrl || '/src/assets/profile.png'} 
                              alt={employee.Name} 
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/src/assets/profile.png';
                              }}
                            />
                            <div className="name-info">
                              <span>{`${employee.FName} ${employee.LName}`}</span>
                              <span className="nickname">({employee.Nickname || '-'})</span>
                            </div>
                          </td>
                          <td>{employee.Email}</td>
                          <td>{employee.Department}</td>
                          <td>{employee.Position}</td>
                          <td>{formatDate(employee.StartDate)}</td>
                          <td>{employee.Type}</td>
                          <td>
                            <span className={`status ${(employee.Status || '').toLowerCase()}`}>
                              {employee.Status}
                            </span>
                          </td>
                          <td className="actions">
                            <button title="View" onClick={() => navigate(`/employee/${employee.EmployeeId}`)}>
                              <FiEye />
                            </button>
                            <button title="Edit" onClick={() => navigate(`/employee/${employee.EmployeeId}?edit=true`)}>
                              <FiEdit2 />
                            </button>
                            <button title="Delete" onClick={() => handleDeleteClick(employee)} className="delete-btn">
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-footer">
                <div className="items-per-page">
                  <span>Showing</span>
                  <select 
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    /* Add more options as needed */
                  </select>
                  <span>out of {filteredEmployees.length} records</span>
                </div>
                <div className="pagination">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}

          {isFilterModalOpen && (
            <FilterModal 
              isOpen={isFilterModalOpen}
              onClose={() => setIsFilterModalOpen(false)}
              onApply={handleApplyFilters}
            />
          )}

          {deleteModalOpen && (
            <div className="modal-overlay">
              <div className="delete-modal">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete employee "{employeeToDelete ? `${employeeToDelete.FName} ${employeeToDelete.LName}` : ''}"?</p>
                <p>This action cannot be undone.</p>
                <div className="modal-actions">
                  <button className="cancel-btn" onClick={handleCancelDelete}>Cancel</button>
                  <button className="delete-btn" onClick={handleConfirmDelete}>Delete</button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default AllEmployees