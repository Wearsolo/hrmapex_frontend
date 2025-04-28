import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiPaperclip, FiSearch, FiClock, FiFile, FiDownload, FiStar } from 'react-icons/fi';
import './New.css';
import SideMenu from "../SideMenu/Side_menu";
import Topbar from "../Topbar/Topbar";

const API_URL = 'http://localhost:3001/api/news';

function New() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    title: '',
    category: '',
    content: '',
    attachment: null
  });
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { value: 'Announcement', label: 'Announcement' },
    { value: 'Activity', label: 'Activity' },
    { value: 'IT', label: 'IT' }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const res = await axios.get(API_URL);
    // Sort news with pinned items first, then by date
    const sortedNews = res.data.sort((a, b) => {
      if (a.isPinned !== b.isPinned) {
        return b.isPinned - a.isPinned; // Pinned items first
      }
      // If both items have same pin status, sort by date
      return new Date(b.CreatedAt) - new Date(a.CreatedAt);
    });
    setNews(sortedNews);
  };

  const handleTogglePin = async (newsId, currentPinned) => {
    try {
      await axios.put(`${API_URL}/${newsId}/toggle-pin`, {
        isPinned: !currentPinned
      });
      // Refresh the news list after toggling pin
      await fetchNews();
    } catch (error) {
      console.error('Error toggling pin status:', error);
      alert('Failed to update pin status. Please try again.');
    }
  };

  const handleOpenModal = (item = null) => {
    setEditItem(item);
    if (item) {
      setForm({
        title: item.Title,
        category: item.Category,
        content: item.Content,
        attachment: null
      });
      setPreview(item.Attachment ? `/uploads/${item.Attachment}` : null);
    } else {
      setForm({ title: '', category: '', content: '', attachment: null });
      setPreview(null);
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditItem(null);
    setForm({ title: '', category: '', content: '', attachment: null });
    setPreview(null);
  };

  const handleChange = e => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm(f => ({ ...f, attachment: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('category', form.category);
    formData.append('content', form.content);
    if (form.attachment) {
      formData.append('attachment', form.attachment);
    }
    
    try {
      if (editItem) {
        const response = await axios.put(`${API_URL}/${editItem.NewsId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data) {
          await fetchNews(); // Refresh the news list
          handleCloseModal();
        }
      } else {
        await axios.post(API_URL, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        await fetchNews();
        handleCloseModal();
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert(error.response?.data?.error || 'Failed to save news. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    setSelectedNews(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_URL}/${selectedNews}`);
      if (response.data) {
        // Remove the deleted news from the state
        setNews(prevNews => prevNews.filter(item => item.NewsId !== selectedNews));
        // Close modal and clear selection
        setDeleteModalOpen(false);
        setSelectedNews(null);
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news. Please try again.');
    }
  };

  const filteredNews = news.filter(item =>
    item.Title?.toLowerCase().includes(search.toLowerCase()) ||
    item.Category?.toLowerCase().includes(search.toLowerCase()) ||
    item.Content?.toLowerCase().includes(search.toLowerCase())
  );

  // Add this function
  const handleAddNews = () => {
    navigate('/addnews'); // Navigate to the Add News page
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  return (
    <div className="addnews-bg dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        {/* วงกลมพื้นหลังอนิเมชั่น */}
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
        <Topbar pageTitle="News" pageSubtitle="All News" />
        <div className="dashboard-content">
          <div className="news-card">
            <div className="news-toolbar">
              <div className="news-search-wrap">
                <FiSearch className="news-search-icon" />
                <input
                  className="news-search"
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              {/* Modify the Add News button to use the new handler */}
              <button className="btn-add-news" onClick={handleAddNews}>
                <FiPlus /> Add News
              </button>
            </div>
            <div className="news-list-table">
              <table className="news-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Created</th>
                    <th className="action-col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNews.length === 0 ? (
                    <tr><td colSpan="4" className="no-news">No news found</td></tr>
                  ) : filteredNews.map(item => (
                    <tr key={item.NewsId} className={item.isPinned ? 'pinned' : ''}>
                      <td>{item.Title}</td>
                      <td>{item.Category}</td>
                      <td>{item.CreatedAt ? new Date(item.CreatedAt).toLocaleDateString() : '-'}</td>
                      <td className="action-col">
                        <button 
                          className={`icon-btn action-pin ${item.isPinned ? 'pinned' : ''}`} 
                          title={item.isPinned ? "Unpin" : "Pin"}
                          onClick={() => handleTogglePin(item.NewsId, item.isPinned)}
                        >
                          <FiStar />
                        </button>
                        <button className="icon-btn action-view" title="View" onClick={() => handleView(item)}><FiEye /></button>
                        <button className="icon-btn action-edit" title="Edit" onClick={() => handleOpenModal(item)}><FiEdit /></button>
                        <button className="icon-btn action-delete" title="Delete" onClick={() => handleDelete(item.NewsId)}><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editItem ? 'Edit News' : 'Add News'}</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="news-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter news title"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="category-select"
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  name="content" 
                  value={form.content} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter news content"
                  rows="6"
                />
              </div>
              <div className="form-group">
                <label>Attachment</label>
                <div className="file-input-wrapper">
                  <input 
                    type="file" 
                    name="attachment" 
                    onChange={handleChange} 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="file-upload-label">
                    <FiPaperclip /> Choose a file
                  </label>
                </div>
                {preview && (
                  <div className="file-preview">
                    <a href={preview} target="_blank" rel="noopener noreferrer">
                      {form.attachment ? form.attachment.name : 'View file'}
                    </a>
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal} className="modal-btn btn-cancel">
                  Cancel
                </button> 
                <button type="submit" className="modal-btn btn-save">
                  {editItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="modal-overlay">
          <div className="delete-confirm-modal">
            <div className="modal-header">
              <h3>Delete News</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedNews(null);
                }}
              >×</button>
            </div>
            <p>Are you sure you want to delete this news? This action cannot be undone.</p>
            <div className="modal-actions">
              <button 
                className="modal-btn btn-cancel"
                onClick={() => {
                  setDeleteModalOpen(false);
                  setSelectedNews(null);
                }}
              >
                Cancel
              </button>
              <button 
                className="modal-btn btn-delete"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>View News</h3>
              <button 
                className="close-btn" 
                onClick={() => {
                  setViewModalOpen(false);
                  setSelectedItem(null);
                }}
              >×</button>
            </div>
            <div className="news-form view-only">
              <div className="form-group">
                <label>Title</label>
                <input 
                  value={selectedItem.Title} 
                  readOnly
                  className="view-input"
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  value={selectedItem.Category}
                  readOnly
                  className="view-input"
                />
              </div>
              <div className="form-group">
                <label>Content</label>
                <textarea 
                  value={selectedItem.Content} 
                  readOnly
                  className="view-input"
                  rows="6"
                />
              </div>
              {selectedItem.Attachment && (
                <div className="form-group">
                  <label>Attachment</label>
                  <div className="file-preview">
                    <a href={`/uploads/${selectedItem.Attachment}`} target="_blank" rel="noopener noreferrer">
                      <FiPaperclip />
                      <span>{selectedItem.Attachment}</span>
                    </a>
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Created At</label>
                <input
                  value={new Date(selectedItem.CreatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  readOnly
                  className="view-input"
                />
              </div>
              <div className="modal-actions">
                <button 
                  className="modal-btn btn-cancel" 
                  onClick={() => {
                    setViewModalOpen(false);
                    setSelectedItem(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default New;
