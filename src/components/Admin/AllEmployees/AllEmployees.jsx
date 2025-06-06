import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiFilter } from 'react-icons/fi'
import axios from 'axios'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import FilterModal from '../FilterModal/FilterModal'
import './AllEmployees.css'
import '../AnimationCircles/AnimationCircles.css'

const AllEmployees = () => {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState({ departments: [], types: [], status: '' })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    // ตรวจสอบ authentication
    const token = localStorage.getItem('token')
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    
    if (!isLoggedIn || !token) {
      navigate('/login')
      return
    }

    const fetchEmployees = async () => {      try {
        setIsLoading(true)
        setError(null)
        // Mock employee data
        const mockEmployees = [
          {
            EmployeeId: "1",
            FName: "John",
            LName: "Doe",
            Nickname: "JD",
            Email: "john.doe@company.com",
            MobileNumber: "123-456-7890",
            Position: "Programmer",
            Type: "Permanent",
            Status: "Active",
            Department: "Engineering",
            ImageUrl: "https://randomuser.me/api/portraits/men/1.jpg"
          },
          {
            EmployeeId: "2",
            FName: "Jane",
            LName: "Smith",
            Nickname: "JS",
            Email: "jane.smith@company.com",
            MobileNumber: "098-765-4321",
            Position: "HR",
            Type: "Permanent",
            Status: "Active",
            Department: "Management",
            ImageUrl: "https://randomuser.me/api/portraits/women/1.jpg"          },
          {
            EmployeeId: "3",
            FName: "Robert",
            LName: "Johnson",
            Nickname: "Rob",
            Email: "robert.j@company.com",
            MobileNumber: "555-123-4567",
            Position: "System",
            Type: "Freelance",
            Status: "Active",
            Department: "Design",
            ImageUrl: "https://randomuser.me/api/portraits/men/2.jpg"
          },
          {
            EmployeeId: "4",
            FName: "Maria",
            LName: "Garcia",
            Nickname: "Mary",
            Email: "maria.g@company.com",
            MobileNumber: "555-987-6543",
            Position: "HR",
            Type: "Permanent",
            Status: "InActive",
            Department: "Human Resources",
            ImageUrl: "https://randomuser.me/api/portraits/women/2.jpg"
          },
          {
            EmployeeId: "5",
            FName: "David",
            LName: "Brown",
            Nickname: "Dave",
            Email: "david.b@company.com",
            MobileNumber: "555-246-8135",
            Position: "Programmer",
            Type: "Intern",
            Status: "Active",
            Department: "Sales",
            ImageUrl: "https://randomuser.me/api/portraits/men/3.jpg"
          }
        ];
        
        setEmployees(mockEmployees)
        setFilteredEmployees(mockEmployees)
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

    const typeFiltered = filters.types && filters.types.length > 0
      ? departmentFiltered.filter(emp => filters.types.includes(emp.Type))
      : departmentFiltered;

    const statusFiltered = filters.status
      ? typeFiltered.filter(emp => emp.Status === filters.status)
      : typeFiltered;

    setFilteredEmployees(statusFiltered);
    setCurrentPage(1);
  }, [search, employees, filters])

  // Get current employees
  const indexOfLastEmployee = currentPage * itemsPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const totalItems = filteredEmployees.length

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
      // Mock delete - just remove from state
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
    setFilters({ departments: [], types: [], status: '' })  // reset type
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const DeleteModal = ({ isOpen, onClose, onConfirm, employeeName }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="delete-modal" onClick={e => e.stopPropagation()}>
          <div className="delete-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7M8 7H16" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Delete Employee</h2>
          <p>Are you sure you want to delete {employeeName}? This action cannot be undone.</p>
          <div className="modal-buttons">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="delete-button" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        mass: 0.5
      }
    }
  }

  return (
    <div className="dashboard-container">
      <SideMenu 
        isMinimized={isMinimized} 
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
      <motion.div 
        className="dashboard-main"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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

        <Topbar pageTitle="All Employees" pageSubtitle="Manage employee information" />

        <motion.div 
          className="content-wrapper"
          variants={itemVariants}
        >
          <motion.div 
            className="search-actions"
            variants={itemVariants}
          >
            <div className="search-box">
              <input
                type="text"
                placeholder="Search employees..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="action-buttons">
              <button className="add-employee-btn" onClick={() => navigate('/new-employee')}>
                <FiPlus />
                Add Employee
              </button>
              <button className="filter-btn" onClick={() => setIsFilterModalOpen(true)}>
                <FiFilter />
                Filter
              </button>
            </div>
          </motion.div>

          <div className="table-container">
            <motion.table 
              className="employees-table"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Position</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <motion.tr 
                    key={employee.EmployeeId}
                    variants={itemVariants}
                  >
                    <td className="employee-name">
                      <img
                        src={employee.ImageUrl || '/src/assets/profile.png'}
                        alt={employee.FName}
                        onError={(e) => {e.target.src = '/src/assets/profile.png'}}
                      />
                      <div className="name-info">
                        <span>{`${employee.FName} ${employee.LName}`}</span>
                        {employee.Nickname && <span className="nickname">({employee.Nickname})</span>}
                      </div>
                    </td>
                    <td>{employee.Email || '-'}</td>
                    <td>{employee.MobileNumber || '-'}</td>
                    <td>{employee.Position || '-'}</td>
                    <td>
                      <span className={`type-badge type-${employee.Type?.toLowerCase()}`}>
                        {employee.Type}
                      </span>
                    </td>
                    <td>
                      <span className={`status ${employee.Status?.toLowerCase()}`}>
                        {employee.Status}
                      </span>
                    </td>
                    <td className="actions">
                      <button onClick={() => navigate(`/employee/${employee.EmployeeId}`)}>
                        <FiEye />
                      </button>
                      <button onClick={() => navigate(`/employee/${employee.EmployeeId}?edit=true`)}>
                        <FiEdit2 />
                      </button>
                      <button onClick={() => handleDeleteClick(employee)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </motion.table>
          </div>

          <motion.div 
            className="table-footer"
            variants={itemVariants}
          >
            <div className="items-per-page">
              <span>Show</span>
              <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>

            <div className="pagination">
              <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                {'<<'}
              </button>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                {'<'}
              </button>
              <button className="active">{currentPage}</button>
              {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>
                  {currentPage + 1}
                </button>
              )}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                {'>'}
              </button>
              <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                {'>>'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApply={handleApplyFilters}
          initialFilters={filters}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          employeeName={`${employeeToDelete?.FName} ${employeeToDelete?.LName}`}
        />
      )}
    </div>
  );
};

export default AllEmployees;