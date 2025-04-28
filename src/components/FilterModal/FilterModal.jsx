import { useState } from 'react'
import './FilterModal.css'

function FilterModal({ isOpen, onClose, onApply }) {
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [selectedType, setSelectedType] = useState('')

  const departments = [
    'Design', 'HR', 'Sales', 'Business Analyst', 'Account',
    'Java', 'Python', 'React JS', 'Node JS', 'Project Manager'
  ]

  const types = ['Office', 'Work from Home']

  const handleDepartmentToggle = (dept) => {
    setSelectedDepartments(prev => 
      prev.includes(dept)
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    )
  }

  const handleTypeToggle = (type) => {
    setSelectedType(prev => prev === type ? '' : type)
  }

  const handleReset = () => {
    setSelectedDepartments([])
    setSelectedType('')
  }

  const handleApply = () => {
    onApply({
      departments: selectedDepartments,
      type: selectedType
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        <h3>Filter</h3>
        
        <div className="filter-section">
          <h4>Department</h4>
          <div className="department-grid">
            {departments.map(dept => (
              <div key={dept} className="department-item">
                <input
                  type="checkbox"
                  id={dept}
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => handleDepartmentToggle(dept)}
                />
                <label htmlFor={dept}>{dept}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="filter-section select-type">
          <h4>Select Type</h4>
          <div className="type-options">
            {types.map(type => (
              <div key={type} className="type-item">
                <input
                  type="radio"
                  id={type}
                  name="type"
                  value={type}
                  checked={selectedType === type}
                  onChange={() => handleTypeToggle(type)}
                />
                <label htmlFor={type}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="reset-button">
          <button onClick={handleReset}>Reset</button>
        </div>

        <div className="filter-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterModal