import React, { useState, useEffect } from 'react';
import { dbService } from '../services/db';
import { MENU_CATEGORIES } from '../data/menuData';
import { 
  Lock, Key, LogOut, Plus, Edit3, Trash2, Eye, EyeOff, 
  Check, AlertTriangle, Image as ImageIcon, Upload, Search, 
  RefreshCw, Utensils, Shield, Sparkles, Filter, ToggleLeft, ToggleRight, Radio
} from 'lucide-react';

export default function AdminPage({ onMenuUpdate }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard States
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // 'add', 'manage', 'broadcast', 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Form State for Add Dish
  const [formData, setFormData] = useState({
    name: '',
    category: 'biryani-rice',
    price: '',
    isVeg: false,
    description: '',
    image: '',
    popular: false
  });
  const [imagePreview, setImagePreview] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formError, setFormError] = useState('');

  // Broadcast Message State
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState('');

  // Quick Edit State
  const [editingItem, setEditingItem] = useState(null);
  const [newPasscode, setNewPasscode] = useState('');
  const [passcodeChangedMessage, setPasscodeChangedMessage] = useState('');

  const refreshData = async () => {
    // Fetch live from Cloudflare D1 across devices
    const list = await dbService.fetchFromCloudflareD1();
    const liveBroadcast = await dbService.fetchGlobalBroadcast();
    setItems(list);
    setCategories(dbService.getCategories());
    setBroadcastText(liveBroadcast);
    if (onMenuUpdate) onMenuUpdate();
  };

  useEffect(() => {
    dbService.fetchGlobalPasscode();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dbService.fetchGlobalPasscode(); // Always check latest passcode from D1
    if (dbService.verifyPasscode(passcode)) {
      setIsAuthenticated(true);
      setLoginError('');
      refreshData();
    } else {
      setLoginError('Incorrect Admin Passcode! Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
  };

  // Image Upload File Handlers
  const handleAddImageFileChange = (e) => {
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

  const handleEditImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file && editingItem) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setFormSuccess('');
    setFormError('');

    if (!formData.name || !formData.price || !formData.category) {
      setFormError('Please fill in Dish Name, Price, and Category.');
      return;
    }

    const result = await dbService.addMenuItem(formData, passcode);
    if (result && result.success) {
      setFormSuccess(`"${formData.name}" has been published live!`);
      setFormData({
        name: '',
        category: 'biryani-rice',
        price: '',
        isVeg: false,
        description: '',
        image: '',
        popular: false
      });
      setImagePreview('');
      refreshData();
      setTimeout(() => setFormSuccess(''), 4000);
    } else {
      setFormError('Failed to add dish: ' + (result?.error || 'Unknown error'));
    }
  };

  const handleStockToggle = async (id) => {
    await dbService.toggleStock(id, passcode);
    refreshData();
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      await dbService.deleteMenuItem(id, passcode);
      refreshData();
    }
  };

  const handleQuickEditSave = async (e) => {
    e.preventDefault();
    if (!editingItem) return;

    await dbService.updateMenuItem(editingItem.id, {
      name: editingItem.name,
      category: editingItem.category,
      price: editingItem.price,
      isVeg: editingItem.isVeg,
      description: editingItem.description,
      image: editingItem.image
    }, passcode);

    setEditingItem(null);
    refreshData();
  };

  const handleBroadcastSubmit = async (e) => {
    e.preventDefault();
    await dbService.updateBroadcastMessage(broadcastText);
    setBroadcastSuccess('Home page ticker broadcast message published live globally!');
    refreshData();
    setTimeout(() => setBroadcastSuccess(''), 4000);
  };

  const handleClearBroadcast = async () => {
    await dbService.updateBroadcastMessage('');
    setBroadcastText('');
    setBroadcastSuccess('Live Home Page Broadcast Ticker stopped / cleared globally.');
    refreshData();
    setTimeout(() => setBroadcastSuccess(''), 4000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all menu items to original 91 items? Any custom added items will be reset.')) {
      dbService.resetToDefaults();
      refreshData();
    }
  };

  const handlePasscodeChangeSubmit = async (e) => {
    e.preventDefault();
    if (newPasscode.length < 4) {
      alert('Passcode must be at least 4 characters long.');
      return;
    }
    await dbService.updatePasscode(newPasscode);
    setPasscode(newPasscode);
    setPasscodeChangedMessage(`Passcode updated to "${newPasscode}" globally! Only this new passcode will work on mobile & laptop.`);
    setNewPasscode('');
    setTimeout(() => setPasscodeChangedMessage(''), 5000);
  };

  // Filtered items in admin manage tab
  const filteredAdminItems = items.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || (item.description && item.description.toLowerCase().includes(q));
    }
    return true;
  });

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="section-padding container" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem 2rem', border: '2px solid var(--primary-gold)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div className="logo-badge-container" style={{ margin: '0 auto 1rem', width: '56px', height: '56px' }}>
              <img src="./images/logo.png" alt="Cafe Ertugrul Logo" className="brand-logo-img" />
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
                  placeholder="Enter Admin Passcode"
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

  // ADMIN DASHBOARD
  return (
    <div className="admin-page section-padding container">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-gold)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="font-heading gold-text" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)' }}>CAFE ERTUGRUL ADMIN</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>Add new dishes, update prices, upload photos, broadcast offers, and manage stock live.</p>
        </div>

        <button onClick={handleLogout} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
          <LogOut size={16} /> Exit Admin
        </button>
      </div>

      {/* Stats Summary Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{items.length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Total Dishes</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{items.filter(i => i.isAvailable !== false).length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Active Dishes</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="font-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e63946' }}>{items.filter(i => i.isAvailable === false).length}</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Out of Stock</div>
        </div>
        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>16</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Active Categories</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '2rem', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        <button
          onClick={() => setActiveTab('add')}
          className={`category-pill ${activeTab === 'add' ? 'active' : ''}`}
          style={{ padding: '9px 18px', fontSize: '0.88rem', flexShrink: 0 }}
        >
          <Plus size={16} /> Add New Dish
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`category-pill ${activeTab === 'manage' ? 'active' : ''}`}
          style={{ padding: '9px 18px', fontSize: '0.88rem', flexShrink: 0 }}
        >
          <Utensils size={16} /> Manage Menu & Prices ({items.length})
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`category-pill ${activeTab === 'broadcast' ? 'active' : ''}`}
          style={{ padding: '9px 18px', fontSize: '0.88rem', flexShrink: 0 }}
        >
          <Radio size={16} /> Live Home Ticker Broadcast
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`category-pill ${activeTab === 'settings' ? 'active' : ''}`}
          style={{ padding: '9px 18px', fontSize: '0.88rem', flexShrink: 0 }}
        >
          <Key size={16} /> Passcode
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="form-row-3">
              <div className="form-group">
                <label className="form-label">Price (₹) *</label>
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

            {/* Photo Selection (Optional) */}
            <div className="form-group" style={{ background: 'rgba(15, 10, 7, 0.5)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-gold)' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ImageIcon size={18} style={{ color: 'var(--primary-gold)' }} /> Dish Photo (Optional)
              </label>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '10px' }} className="form-row-3">
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Option A: Upload Photo File</span>
                  <label className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <Upload size={16} /> Choose Photo File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddImageFileChange}
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
                placeholder="Search dish to edit price, details, photo..."
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
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  ) : (
                    <div style={{ width: '70px', height: '70px', background: 'rgba(229,183,87,0.1)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-gold)' }}>
                      <Utensils size={24} />
                    </div>
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
                  <button
                    onClick={() => handleStockToggle(item.id)}
                    className="btn-secondary"
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.78rem',
                      borderColor: item.isAvailable === false ? '#e63946' : '#2a9d8f',
                      color: item.isAvailable === false ? '#ff6b6b' : '#2a9d8f'
                    }}
                  >
                    {item.isAvailable === false ? <ToggleLeft size={14} /> : <ToggleRight size={14} />}
                    {item.isAvailable === false ? 'Out of Stock' : 'In Stock'}
                  </button>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => setEditingItem(item)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                      title="Edit All Dish Details"
                    >
                      <Edit3 size={14} /> Edit Dish
                    </button>

                    <button
                      onClick={() => handleDelete(item.id, item.name)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.78rem', color: '#e63946', borderColor: '#e63946' }}
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

      {/* TAB 3: LIVE HOME TICKER BROADCAST */}
      {activeTab === 'broadcast' && (
        <div className="glass-card" style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h3 className="font-heading gold-text" style={{ fontSize: '1.4rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={22} style={{ color: '#25D366' }} /> Broadcast Announcement Ticker On Home Page
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Type a promotional announcement, weekend discount offer, or event message. It will scroll live from right to left across the top of the Home Page!
          </p>

          {broadcastSuccess && (
            <div style={{ background: 'rgba(42, 157, 143, 0.2)', border: '1px solid #2a9d8f', color: '#2a9d8f', padding: '12px 16px', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Check size={20} /> <strong>{broadcastSuccess}</strong>
            </div>
          )}

          <form onSubmit={handleBroadcastSubmit}>
            <div className="form-group">
              <label className="form-label">Broadcast Announcement Text</label>
              <textarea
                rows={3}
                required
                className="form-control"
                placeholder="e.g. 🎉 Weekend Special Offer! 15% OFF on all Wazwan Combos & Free Saffron Almond Shake with orders above ₹999!"
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <button type="submit" className="btn-primary" style={{ flexGrow: 1, justifyContent: 'center', background: '#25D366', color: '#fff' }}>
                <Radio size={18} /> Publish Live Broadcast
              </button>

              {broadcastText && (
                <button type="button" onClick={handleClearBroadcast} className="btn-secondary" style={{ color: '#e63946', borderColor: '#e63946' }}>
                  <Trash2 size={16} /> Stop / Clear Broadcast
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: PASSCODE */}
      {activeTab === 'settings' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="glass-card">
            <h3 className="font-heading gold-text" style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Change Admin Passcode</h3>
            {passcodeChangedMessage && (
              <div style={{ background: 'rgba(42, 157, 143, 0.2)', border: '1px solid #2a9d8f', color: '#2a9d8f', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                {passcodeChangedMessage}
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
        </div>
      )}

      {/* FULL EDIT DISH MODAL */}
      {editingItem && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          overflowY: 'auto'
        }}>
          <div className="glass-card" style={{ maxWidth: '600px', width: '100%', border: '2px solid var(--primary-gold)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="font-heading gold-text" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
              Edit Dish: "{editingItem.name}"
            </h3>

            <form onSubmit={handleQuickEditSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }} className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Dish Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  >
                    {MENU_CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row-3">
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    className="form-control"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Diet Type</label>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                    <button
                      type="button"
                      className={`category-pill ${!editingItem.isVeg ? 'active' : ''}`}
                      onClick={() => setEditingItem({ ...editingItem, isVeg: false })}
                      style={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                      <span className="diet-tag non-veg" /> Non-Veg
                    </button>
                    <button
                      type="button"
                      className={`category-pill ${editingItem.isVeg ? 'active' : ''}`}
                      onClick={() => setEditingItem({ ...editingItem, isVeg: true })}
                      style={{ flexGrow: 1, justifyContent: 'center' }}
                    >
                      <span className="diet-tag veg" /> Veg
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  className="form-control"
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                />
              </div>

              {/* Photo Upload / Web URL in Edit Modal */}
              <div className="form-group" style={{ background: 'rgba(15, 10, 7, 0.5)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-gold)' }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ImageIcon size={18} style={{ color: 'var(--primary-gold)' }} /> Dish Photo (Upload File or Paste Web URL)
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '8px' }} className="form-row-3">
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Option A: Upload File</span>
                    <label className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', cursor: 'pointer', padding: '8px' }}>
                      <Upload size={14} /> Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEditImageFileChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Option B: Paste Web URL</span>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="https://example.com/photo.jpg"
                      value={editingItem.image || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                      style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                {editingItem.image && (
                  <div style={{ marginTop: '0.85rem', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--primary-gold)', display: 'block', marginBottom: '4px' }}>Photo Preview:</span>
                    <img src={editingItem.image} alt="Preview" style={{ width: '100px', height: '80px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-gold)' }} />
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '1.25rem' }}>
                <button type="button" onClick={() => setEditingItem(null)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Dish Changes Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
