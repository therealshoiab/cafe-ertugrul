import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import { MENU_CATEGORIES } from '../data/menuData';
import { 
  Lock, Key, LogOut, Plus, Edit3, Trash2, Eye, EyeOff, 
  Check, AlertTriangle, Image as ImageIcon, Upload, Search, 
  RefreshCw, Utensils, Shield, Sparkles, Filter, ToggleLeft, ToggleRight
} from 'lucide-react';

export default function AdminPage({ onMenuUpdate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard States
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'manage', 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Form States for Adding New Dish
  const [formData, setFormData] = useState({
    name: '',
    category: 'biryani-rice',
    price: '',
    originalPrice: '',
    isVeg: false,
    description: '',
    image: '',
    popular: false
  });
  const [imagePreview, setImagePreview] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Edit Item Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeChangedMessage, setPasscodeChangedMessage] = useState('');

  // Load items on mount
  const refreshData = () => {
    const allItems = dbService.getMenuItems();
    setItems(allItems);
    setCategories(dbService.getCategories());
    if (onMenuUpdate) onMenuUpdate();
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (dbService.verifyPasscode(passcode)) {
      setIsAuthenticated(true);
      setLoginError('');
      refreshData();
    } else {
      setLoginError('Incorrect Passcode! Hint: Default passcode is ertugrul2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Image Upload File Handler
  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    setFormSuccess('');
    setFormError('');

    if (!formData.name || !formData.price || !formData.category) {
      setFormError('Please fill in Dish Name, Price, and Category.');
      return;
    }

    const result = dbService.addMenuItem(formData);
    if (result.success) {
      setFormSuccess(`"${formData.name}" has been added to the menu!`);
      setFormData({
        name: '',
        category: 'biryani-rice',
        price: '',
        originalPrice: '',
        isVeg: false,
        description: '',
        image: '',
        popular: false
      });
      setImagePreview('');
      refreshData();
      setTimeout(() => setFormSuccess(''), 4000);
    } else {
      setFormError('Failed to add dish: ' + result.error);
    }
  };

  const handleStockToggle = (id) => {
    dbService.toggleStock(id);
    refreshData();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      dbService.deleteMenuItem(id);
      refreshData();
    }
  };

  const handleQuickEditSave = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    dbService.updateMenuItem(editingItem.id, {
      name: editingItem.name,
      price: editingItem.price,
      description: editingItem.description,
      category: editingItem.category,
      isVeg: editingItem.isVeg
    });

    setEditingItem(null);
    refreshData();
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all menu items to original 91 items? Any custom added items will be reset.')) {
      dbService.resetToDefaults();
      refreshData();
    }
  };

  const handlePasscodeChangeSubmit = (e) => {
    e.preventDefault();
    if (newPasscode.length < 4) {
      alert('Passcode must be at least 4 characters long.');
      return;
    }
    dbService.updatePasscode(newPasscode);
    setPasscodeChangedMessage('Passcode updated successfully!');
    setNewPasscode('');
    setTimeout(() => setPasscodeChangedMessage(''), 4000);
  };

  // Filtered items in admin manage tab
  const filteredAdminItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    }
    return true;
  });

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="section-padding container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem', border: '2px solid var(--primary-gold)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="logo-badge" style={{ margin: '0 auto 1rem', width: '56px', height: '56px', fontSize: '1.8rem' }}>
              <Shield size={28} />
            </div>
            <h2 className="font-heading gold-text" style={{ fontSize: '1.8rem' }}>OWNER ADMIN LOGIN</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              Enter passcode to manage Cafe Ertugrul menu & prices.
            </p>
          </div>

          {loginError && (
            <div style={{
              background: 'rgba(200, 75, 49, 0.2)',
              border: '1px solid var(--accent-red)',
              color: '#ff6b6b',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <AlertTriangle size={18} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                <span>Admin Passcode</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPasscode ? 'text' : 'password'}
                  required
                  className="form-control"
                  placeholder="Enter passcode (ertugrul2026)"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  style={{ paddingRight: '45px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasscode(!showPasscode)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                >
                  {showPasscode ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}>
              <Lock size={18} /> Unlock Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="admin-page section-padding container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-gold)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="font-heading gold-text" style={{ fontSize: '2rem' }}>CAFE ERTUGRUL ADMIN</h2>
            <span className="device-tag">Master Control</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Add new dishes, update prices, toggle stock availability, and upload food photos live.</p>
        </div>

        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
          <LogOut size={16} /> Exit Admin
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '2rem', fontWeight: 800 }}>{items.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Menu Dishes</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '2rem', fontWeight: 800 }}>{items.filter(i => i.isAvailable !== false).length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Dishes</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div className="font-heading" style={{ fontSize: '2rem', fontWeight: 800, color: '#e63946' }}>{items.filter(i => i.isAvailable === false).length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Out of Stock</div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '2rem', fontWeight: 800 }}>16</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Categories</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('add')}
          className={`category-pill ${activeTab === 'add' ? 'active' : ''}`}
          style={{ padding: '10px 22px', fontSize: '0.95rem' }}
        >
          <Plus size={18} /> Add New Dish
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`category-pill ${activeTab === 'manage' ? 'active' : ''}`}
          style={{ padding: '10px 22px', fontSize: '0.95rem' }}
        >
          <Utensils size={18} /> Manage Menu & Prices ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`category-pill ${activeTab === 'settings' ? 'active' : ''}`}
          style={{ padding: '10px 22px', fontSize: '0.95rem' }}
        >
          <Key size={18} /> Settings & Passcode
        </button>
      </div>

      {/* TAB 1: ADD NEW DISH */}
      {activeTab === 'add' && (
        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 className="font-heading gold-text" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>
            Add New Dish To Restaurant Menu
          </h3>

          {formSuccess && (
            <div style={{ background: 'rgba(42, 157, 143, 0.2)', border: '1px solid #2a9d8f', color: '#2a9d8f', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Check size={20} /> <strong>{formSuccess}</strong>
            </div>
          )}

          {formError && (
            <div style={{ background: 'rgba(200, 75, 49, 0.2)', border: '1px solid var(--accent-red)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} /> <strong>{formError}</strong>
            </div>
          )}

          <form onSubmit={handleAddSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }} className="form-row-3">
              <div className="form-group">
                <label className="form-label">Dish Name *</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="e.g. Kashmiri Wazwan Tabak Maaz"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {MENU_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }} className="form-row-3">
              <div className="form-group">
                <label className="form-label">Selling Price (₹) *</label>
                <input
                  type="number"
                  required
                  min="0"
                  className="form-control"
                  placeholder="e.g. 350"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Original Price (₹) (Optional)</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  placeholder="e.g. 500 (for discount badge)"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Diet Type</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    type="button"
                    className={`category-pill ${!formData.isVeg ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, isVeg: false })}
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <span className="diet-tag non-veg" /> Non-Veg
                  </button>
                  <button
                    type="button"
                    className={`category-pill ${formData.isVeg ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, isVeg: true })}
                    style={{ flexGrow: 1, justifyContent: 'center' }}
                  >
                    <span className="diet-tag veg" /> Veg
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Dish Description</label>
              <textarea
                rows={2}
                className="form-control"
                placeholder="Describe spices, ingredients, and preparation style..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Photo Selection */}
            <div className="form-group" style={{ background: 'rgba(15, 10, 7, 0.5)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-gold)' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={18} style={{ color: 'var(--primary-gold)' }} /> Dish Photo (Pick From Phone / Laptop Gallery or Paste Image URL)
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '10px' }} className="form-row-3">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Option A: Upload Photo File</span>
                  <label className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <Upload size={16} /> Choose Photo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Option B: Or Paste Image Web URL</span>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://example.com/food-photo.jpg"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData({ ...formData, image: e.target.value });
                      setImagePreview(e.target.value);
                    }}
                  />
                </div>
              </div>

              {imagePreview && (
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--primary-gold)', display: 'block', marginBottom: '6px' }}>Photo Preview:</span>
                  <img src={imagePreview} alt="Preview" style={{ width: '120px', height: '100px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-gold)' }} />
                </div>
              )}
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', padding: '14px' }}>
              <Plus size={20} /> Publish Dish To Menu Live
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: MANAGE MENU & PRICES */}
      {activeTab === 'manage' && (
        <div>
          {/* Search & Category Filter */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '1.5rem' }}>
            <div className="menu-search-bar" style={{ flexGrow: 1, maxWidth: '450px', marginBottom: 0 }}>
              <Search size={20} style={{ color: 'var(--primary-gold)' }} />
              <input
                type="text"
                placeholder="Search dish to edit price or toggle stock..."
                className="menu-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="form-control"
              style={{ width: 'auto', minWidth: '200px' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories ({items.length})</option>
              {MENU_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Dish Management Cards Grid */}
          <div className="menu-grid">
            {filteredAdminItems.map((item) => (
              <div 
                key={item.id} 
                className="glass-card menu-card" 
                style={{ 
                  opacity: item.isAvailable === false ? 0.6 : 1,
                  border: item.isAvailable === false ? '1px dashed #e63946' : '1px solid var(--border-gold)'
                }}
              >
                <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
                  {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  )}
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`diet-tag ${item.isVeg ? 'veg' : 'non-veg'}`} />
                      <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{item.name}</h4>
                    </div>
                    <div style={{ color: 'var(--primary-gold)', fontWeight: 800, fontSize: '1.1rem', marginTop: '4px' }}>
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>{item.description}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-light)' }}>
                  {/* Stock Toggle Button */}
                  <button
                    onClick={() => handleStockToggle(item.id)}
                    style={{ 
                      fontSize: '0.8rem', 
                      fontWeight: 700, 
                      color: item.isAvailable === false ? '#e63946' : '#2a9d8f',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    {item.isAvailable === false ? (
                      <><ToggleLeft size={20} /> Out of Stock</>
                    ) : (
                      <><ToggleRight size={20} /> In Stock</>
                    )}
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                      title="Quick Edit Dish"
                    >
                      <Edit3 size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      style={{ color: '#e63946', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(230, 57, 70, 0.3)', background: 'rgba(230, 57, 70, 0.1)' }}
                      title="Delete Dish"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: SETTINGS & SECURITY */}
      {activeTab === 'settings' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="contact-grid">
          <div className="glass-card">
            <h3 className="font-heading gold-text" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Change Admin Passcode</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>Update passcode used to access this Admin Panel.</p>

            {passcodeChangedMessage && (
              <div style={{ color: '#2a9d8f', marginBottom: '1rem', fontWeight: 600, fontSize: '0.9rem' }}>
                ✓ {passcodeChangedMessage}
              </div>
            )}

            <form onSubmit={handlePasscodeChangeSubmit}>
              <div className="form-group">
                <label className="form-label">New Passcode</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter new admin passcode"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-primary">
                Update Passcode
              </button>
            </form>
          </div>

          <div className="glass-card">
            <h3 className="font-heading gold-text" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Reset To Original Defaults</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
              Restore original 91 dishes dataset. Useful if you want to clear test dishes.
            </p>
            <button onClick={handleResetDefaults} className="btn-secondary" style={{ color: '#e63946', borderColor: '#e63946' }}>
              <RefreshCw size={16} /> Restore Default Menu (91 Items)
            </button>
          </div>
        </div>
      )}

      {/* QUICK EDIT MODAL */}
      {editingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', border: '2px solid var(--primary-gold)' }}>
            <h3 className="font-heading gold-text" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>
              Edit "{editingItem.name}"
            </h3>

            <form onSubmit={handleQuickEditSave}>
              <div className="form-group">
                <label className="form-label">Dish Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  required
                  className="form-control"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={3}
                  className="form-control"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setEditingItem(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
