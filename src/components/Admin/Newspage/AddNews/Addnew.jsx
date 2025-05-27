import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiFile } from 'react-icons/fi'
import axios from 'axios'
import SideMenu from '../../SideMenu/Side_menu'
import Topbar from '../../Topbar/Topbar'
import './Addnew.css'

const API_URL = 'http://localhost:3001/api/news'

const truncateFileName = (fileName) => {
  if (fileName.length <= 20) return fileName;
  const extension = fileName.split('.').pop();
  const name = fileName.substring(0, fileName.lastIndexOf('.'));
  return `${name.substring(0, 10)}...${extension}`;
};

function AddNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    content: '',
    documents: [],
    createdDate: new Date().toISOString().split('T')[0]
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
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
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...files]
      }))
      setUploadedFiles(prev => [...prev, ...files])
    }
  }

  const handleRemoveFile = (index) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }))
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
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
      // Create FormData object to send multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      // createdDate is not used in backend, so skip it
      // Only send the first file as 'attachment' (backend supports one file)
      if (formData.documents && formData.documents.length > 0) {
        formDataToSend.append('attachment', formData.documents[0]);
      }
      // Send the data to the server
      const response = await axios.post(API_URL, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data) {
        navigate('/news');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.response?.data?.message || 'Failed to add news. Please try again.');
    }
  }

  const handleCancel = () => {
    navigate('/news')
  }
  const FileUploadSection = () => {
    const [isDragOver, setIsDragOver] = useState(false);
    
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = () => {
      setIsDragOver(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        setFormData(prev => ({
          ...prev,
          documents: [...prev.documents, ...files]
        }));
        setUploadedFiles(prev => [...prev, ...files]);
      }
    };

    return (
      <div className="upload-section">
        <div 
          className={`upload-area-doc ${isDragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <label className="upload-label">
            <div className="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p>Drag & Drop or <span className="choose-text">choose file</span> to upload</p>
            <span className="supported-text">Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG</span>
            <input 
              type="file" 
              style={{ display: 'none' }}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              multiple
            />
          </label>
        </div>
        {uploadedFiles.length > 0 && (
          <div className="uploaded-files-container">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-file-info">
                <div className="file-info-left">
                  <FiFile />
                  <span title={file.name}>{truncateFileName(file.name)}</span>
                </div>
                <button
                  type="button"
                  className="remove-file-btn"
                  onClick={() => handleRemoveFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        <ul className="circles">
          {[...Array(15)].map((_, i) => (
            <li key={`top-${i}`}></li>
          ))}
        </ul>
        
        <ul className="circles-bottom">
          {[...Array(15)].map((_, i) => (
            <li key={`bottom-${i}`}></li>
          ))}
        </ul>

        <Topbar pageTitle="Add News" pageSubtitle="Create a new announcement" />
        
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
                <FileUploadSection />
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