import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2, FiEye, FiPlus, FiPaperclip, FiSearch, FiClock, FiFile, FiDownload, FiStar, FiBell, FiActivity, FiTerminal, FiLock, FiUnlock } from 'react-icons/fi';
import './New.css';
import './EditNewsModal.css';
import SideMenu from "../SideMenu/Side_menu";
import Topbar from "../Topbar/Topbar";

const API_URL = `${import.meta.env.VITE_API_URL}/api/news`;

function mapApiNewsData(apiData) {
  // Map API fields to UI fields
  return apiData.map(item => ({
    NewsId: item.newsId,
    Title: item.title,
    Category: item.category,
    Content: item.content,
    CreatedAt: item.created_at,
    Attachment: item.attachment,
    isPinned: item.isPinned === true || item.isPinned === 1 ? 1 : 0, // Ensure isPinned is always 0 or 1
    Hidenews: item.Hidenews === true || item.Hidenews === 1 ? 1 : 0
  }));
}

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
  const [hiddenNews, setHiddenNews] = useState(new Set());
  const [pinnedNews, setPinnedNews] = useState(new Set()); // Add pinnedNews state

  const categories = [
    { value: 'Announcement', label: 'Announcement' },
    { value: 'Activity', label: 'Activity' },
    { value: 'IT', label: 'IT' }
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      const apiNews = response.data;
      const sortedNews = mapApiNewsData(apiNews).sort((a, b) => {
        if (a.isPinned !== b.isPinned) {
          return b.isPinned - a.isPinned;
        }
        return new Date(b.CreatedAt) - new Date(a.CreatedAt);
      });
      setNews(sortedNews);
      // Initialize pinned and hidden states
      const hiddenSet = new Set(
        sortedNews.filter(item => item.Hidenews === 1).map(item => item.NewsId)
      );
      const pinnedSet = new Set(
        sortedNews.filter(item => item.isPinned === 1).map(item => item.NewsId)
      );
      setHiddenNews(hiddenSet);
      setPinnedNews(pinnedSet);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleTogglePin = async (newsId) => {
    try {
      const isCurrentlyPinned = pinnedNews.has(newsId);
      const response = await axios.put(`${API_URL}/${newsId}/toggle-pin`, {
        isPinned: !isCurrentlyPinned ? 1 : 0
      });
      if (response.data.success) {
        // Always refetch news to sync state with DB
        await fetchNews();
      } else {
        throw new Error(response.data.message || 'Failed to update pin status');
      }
    } catch (error) {
      console.error('Error toggling pin status:', error);
      alert(error.response?.data?.error || error.message || 'Failed to update pin status. Please try again.');
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

  // Add this function to handle visibility toggle
  const handleToggleVisibility = async (newsId) => {
    try {
      // Get the current hidden state
      const isCurrentlyHidden = hiddenNews.has(newsId);
      
      // Update the database
      await axios.put(`${API_URL}/${newsId}/toggle-visibility`, {
        Hidenews: !isCurrentlyHidden ? 1 : 0
      });

      // Update local state
      setHiddenNews(prev => {
        const newSet = new Set(prev);
        if (newSet.has(newsId)) {
          newSet.delete(newsId);
        } else {
          newSet.add(newsId);
        }
        return newSet;
      });
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Failed to update visibility status. Please try again.');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <ul className="circles">
          {[...Array(15)].map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
        
        <SideMenu />
        <div className="dashboard-content">
          <Topbar pageTitle="News" pageSubtitle="Company News & Announcements" />
          
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
                    <tr 
                      key={item.NewsId} 
                      className={`
                        ${pinnedNews.has(item.NewsId) ? 'pinned' : ''} 
                        ${hiddenNews.has(item.NewsId) ? 'hidden-row' : ''}
                      `}
                    >
                      <td>{item.Title}</td>
                      <td>
                        <div className={`button ${item.Category.toLowerCase()}`}>
                          {item.Category === 'Announcement' ? (
                            <FiBell className="category-icon" />
                          ) : item.Category === 'Activity' ? (
                            <FiActivity className="category-icon" />
                          ) : (
                            <FiTerminal className="category-icon" />
                          )}
                          <span className="lable">{item.Category}</span>
                        </div>
                      </td>
                      <td>{item.CreatedAt ? new Date(item.CreatedAt).toLocaleDateString() : '-'}</td>
                      <td className="action-col">
                        <button 
                          className={`icon-btn action-pin ${pinnedNews.has(item.NewsId) ? 'pinned' : ''}`} 
                          title={pinnedNews.has(item.NewsId) ? "Unpin" : "Pin"}
                          onClick={() => handleTogglePin(item.NewsId)}
                        >
                          <FiStar />
                        </button>
                        <button className="icon-btn action-view" title="View" onClick={() => handleView(item)}>
                          <FiEye />
                        </button>
                        <button className="icon-btn action-edit" title="Edit" onClick={() => handleOpenModal(item)}>
                          <FiEdit />
                        </button>
                        <button 
                          className={`icon-btn action-hide`} 
                          title={hiddenNews.has(item.NewsId) ? "Show" : "Hide"}
                          onClick={() => handleToggleVisibility(item.NewsId)}
                        >
                          {hiddenNews.has(item.NewsId) ? <FiUnlock /> : <FiLock />}
                        </button>
                        <button className="icon-btn action-delete" title="Delete" onClick={() => handleDelete(item.NewsId)}>
                          <FiTrash2 />
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

      {/* Edit/Add Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="edit-modal-header">
              <h3>{editItem ? 'Edit News' : 'Add News'}</h3>
              <button className="edit-close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="edit-news-form">
              <div className="edit-form-group">
                <label>Title</label>
                <input 
                  name="title" 
                  value={form.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter news title"
                />
              </div>
              <div className="edit-form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="edit-form-group">
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
              <div className="edit-form-group">
                <label>Attachment</label>
                <div className="edit-file-input-wrapper">
                  <input 
                    type="file" 
                    name="attachment" 
                    onChange={handleChange} 
                    accept=".pdf,.jpg,.jpeg,.png" 
                    id="file-upload"
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className="edit-file-upload-label">
                    <FiPaperclip /> {form.attachment ? 'Change file' : 'Choose a file'}
                  </label>
                  {form.attachment && (
                    <div className="selected-file">
                      <FiFile /> {form.attachment.name}
                    </div>
                  )}
                </div>
                {preview && (
                  <div className="edit-file-preview">
                    <a href={preview} target="_blank" rel="noopener noreferrer">
                      <FiFile />
                      <span>Current attachment - Click to preview</span>
                    </a>
                  </div>
                )}
              </div>
              <div className="edit-modal-actions">
                <button type="button" onClick={handleCloseModal} className="edit-modal-btn edit-btn-cancel">
                  Cancel
                </button> 
                <button type="submit" className="edit-modal-btn edit-btn-save">
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
          <div className="delete-modal">
            <div className="delete-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 4.44772 8.44772 4 9 4H15C15.5523 4 16 4.44772 16 5V7M8 7H16" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Delete News</h2>
            <p>This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
              <button className="delete-button" onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewModalOpen && selectedItem && (
        <div className="modal-overlay">
          <div className="modal view-modal">
            <div className="modal-header">
              <div className="modal-title">
                <h3>{selectedItem.Title}</h3>
                <div className={`button ${selectedItem.Category.toLowerCase()}`}>
                  {selectedItem.Category === 'Announcement' ? (
                    <FiBell className="category-icon" />
                  ) : selectedItem.Category === 'Activity' ? (
                    <FiActivity className="category-icon" />
                  ) : (
                    <FiTerminal className="category-icon" />
                  )}
                  <span className="lable">{selectedItem.Category}</span>
                </div>
              </div>
              <button 
                className="close-btn" 
                onClick={() => {
                  setViewModalOpen(false);
                  setSelectedItem(null);
                }}
              >×</button>
            </div>
            <div className="view-content">
              <div className="view-meta">
                <div className="created-at">
                  <FiClock className="meta-icon" />
                  {new Date(selectedItem.CreatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              
              <div className="content-section">
                <div className="content-box">
                  {selectedItem.Content}
                </div>
              </div>

              {selectedItem.Attachment && (
                <div className="attachment-section">
                  <div className="attachment-header">
                    <FiPaperclip className="attachment-icon" />
                    Attachment
                  </div>
                  <div className="attachment-preview">
                    {isImageFile(selectedItem.Attachment) ? (
                      <div className="image-preview-container">
                        <img 
                          src={`/uploads/${selectedItem.Attachment}`} 
                          alt="News attachment"
                          className="attachment-image"
                        />
                      </div>
                    ) : (
                      <a 
                        href={`/uploads/${selectedItem.Attachment}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="attachment-link"
                      >
                        <span className="filename">{selectedItem.Attachment}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default New;
