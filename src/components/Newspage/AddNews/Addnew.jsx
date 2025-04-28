import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload } from 'react-icons/fi'
import axios from 'axios'
import SideMenu from '../../SideMenu/Side_menu'
import Topbar from '../../Topbar/Topbar'
import './Addnew.css'

const API_URL = 'http://localhost:3001/api/news'

function AddNew() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    document: null,
    createdDate: new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        document: file
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required'
    }
    if (!formData.createdDate) {
      newErrors.createdDate = 'Date is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setShowConfirmation(true)
    }
  }

  const handleConfirmSubmit = async () => {
    try {
      // Create form data to send
      const newsData = {
        title: formData.title,
        category: formData.category,
        content: formData.content,
        createdDate: formData.createdDate
      }

      // Send the data to the server
      const response = await axios.post(API_URL, newsData)

      if (response.data) {
        navigate('/news') // Navigate back to news list without alert
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error.response?.data?.message || 'Failed to add news. Please try again.')
    }
  }

  const handleCancel = () => {
    navigate('/news')
  }

  return (
    <div className="addnews-bg dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        <ul className="circles">
          {[...Array(22)].map((_, i) => <li key={i}></li>)}
        </ul>
        <Topbar 
          pageTitle="Add News" 
          pageSubtitle="News>Add News" 
        />
        
        <motion.div 
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="news-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter news title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select category</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Activity">Activity</option>
                  <option value="IT">IT</option>
                </select>
                {errors.category && <span className="error-text">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  placeholder="Enter news content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="6"
                />
                {errors.content && <span className="error-text">{errors.content}</span>}
              </div>

              <div className="form-group">
                <label>Document</label>
                <div className="upload-area-doc">
                  <input
                    type="file"
                    id="news-document"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    hidden
                  />
                  <label htmlFor="news-document" className="upload-label">
                    <div className="upload-icon">
                      <FiUpload />
                    </div>
                    <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
                    <p className="supported-text">Supported formats: .pdf, .doc, .docx, .jpg, .jpeg</p>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Created Date</label>
                <input
                  type="date"
                  name="createdDate"
                  value={formData.createdDate}
                  onChange={handleChange}
                />
                {errors.createdDate && <span className="error-text">{errors.createdDate}</span>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {showConfirmation && (
            <div className="confirmation-overlay">
              <motion.div 
                className="confirmation-modal"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
              >
                <h3>Confirm Submission</h3>
                <p>Are you sure you want to add this news?</p>
                <div className="confirmation-actions">
                  <button 
                    className="btn-cancel" 
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="btn-submit"
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

export default AddNew