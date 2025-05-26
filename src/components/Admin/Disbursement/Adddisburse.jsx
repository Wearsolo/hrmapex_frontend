import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';
import SideMenu from '../SideMenu/Side_menu';
import Topbar from '../Topbar/Topbar';
import './Adddisburse.css';

const Adddisburse = () => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: '',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0], // Set current date as default
    details: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...files]
      }));
    }
  };

  const handleRemoveFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email notification
      const notificationResponse = await fetch('http://localhost:3001/api/disbursement/new-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeName: formData.employeeName,
          category: formData.category,
          amount: parseFloat(formData.amount),
          date: formData.date,
          details: formData.details
        })
      });

      if (!notificationResponse.ok) {
        throw new Error('Failed to send notification');
      }

      console.log('Form submitted:', formData);
      navigate('/disbursement');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to truncate long file names
  const truncateFileName = (fileName) => {
    if (fileName.length > 25) {
      return fileName.substring(0, 20) + '...' + fileName.substring(fileName.lastIndexOf('.'));
    }
    return fileName;
  };

  return (
    <div className="dashboard-container">
      <SideMenu 
        isMinimized={isMinimized} 
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />
      <div className={`dashboard-main ${isMinimized ? 'expanded' : ''}`}>
        <Topbar pageTitle="Create Disbursement" pageSubtitle="Add new disbursement record" />
        
        <div className="form-content-wrapper">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className="circles-bottom">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div className="adddisburse-form-container">
            <div className="form-header">
              <button 
                className="back-button"
                onClick={() => navigate('/disbursement')}
              >
                ← Back
              </button>
            </div>

            <form onSubmit={handleSubmit} className="adddisburse-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Employee Name</label>
                  <input
                    type="text"
                    name="employeeName"
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select category</option>
                    <option value="ค่าเดินทาง">ค่าเดินทาง</option>
                    <option value="ค่าอาหาร">ค่าอาหาร</option>
                    <option value="ค่าอุปกรณ์">ค่าอุปกรณ์</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Details</label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Enter disbursement details"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Attachments</label>
                  <div className="upload-area-doc">
                    <input
                      type="file"
                      id="file-attachments"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      hidden
                      multiple
                    />
                    <label htmlFor="file-attachments" className="upload-label">
                      <div className="upload-icon">
                        <FiUpload />
                      </div>                      <p>Drag and drop or <span className="choose-text">choose files</span> to upload</p>
                      <p className="supported-text">Supported files: PDF, DOC, DOCX, JPG, JPEG, PNG</p>
                    </label>
                  </div>
                  {formData.attachments.length > 0 && (
                    <div className="uploaded-files">
                      {formData.attachments.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <FiFile />
                          <span title={file.name}>{truncateFileName(file.name)}</span>
                          <button 
                            type="button" 
                            className="remove-file"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <button type="submit" className="save-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adddisburse;