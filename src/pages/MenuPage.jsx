import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import { Search, Star, Utensils, ShoppingBag, X, Phone, Check, Flame, Gift, Filter } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderList, setOrderList] = useState([]);
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet filter
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, dietFilter, searchQuery]);

  const addToOrder = (item) => {
    setOrderList((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromOrder = (id) => {
    setOrderList((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, delta) => {
    setOrderList((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const totalPrice = orderList.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="menu-page section-padding container">
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">Authentic Taste of Srinagar</span>
        <h2 className="section-title">CAFE ERTUGRUL <span className="gold-text">MENU</span></h2>
        <p className="section-desc">Explore all 91 handcrafted dishes across 16 categories — from Biryani to Tandoor, Kathi Rolls, Pizzas & Shakes.</p>
      </div>

      {/* Search & Diet Filter */}
      <div className="menu-search-bar">
        <Search size={22} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search by dish name, biryani, pizza, kanti, shake..."
          className="menu-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Diet Filters & Order Cart Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Filter size={16} /> Filter:
          </span>
          <button
            onClick={() => setDietFilter('all')}
            className={`category-pill ${dietFilter === 'all' ? 'active' : ''}`}
            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
          >
            All Foods
          </button>
          <button
            onClick={() => setDietFilter('veg')}
            className={`category-pill ${dietFilter === 'veg' ? 'active' : ''}`}
            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
          >
            <span className="diet-tag veg" style={{ width: '12px', height: '12px' }} /> Veg Only
          </button>
          <button
            onClick={() => setDietFilter('non-veg')}
            className={`category-pill ${dietFilter === 'non-veg' ? 'active' : ''}`}
            style={{ padding: '6px 16px', fontSize: '0.85rem' }}
          >
            <span className="diet-tag non-veg" style={{ width: '12px', height: '12px' }} /> Non-Veg Only
          </button>
        </div>

        {/* Floating Cart Button */}
        <button
          onClick={() => setShowOrderDrawer(true)}
          className="btn-primary"
          style={{ padding: '10px 22px', fontSize: '0.88rem' }}
        >
          <ShoppingBag size={18} /> My Order ({orderList.reduce((acc, i) => acc + i.qty, 0)}) - ₹{totalPrice}
        </button>
      </div>

      {/* Category Pills Bar (16 Categories) */}
      <div className="category-pills">
        {MENU_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`category-pill ${selectedCategory === cat.id ? 'active' : ''}`}
          >
            {cat.special && <Gift size={16} style={{ color: '#ffd700' }} />}
            {cat.name}
            <span className="category-badge-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Results Info */}
      <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Showing <strong style={{ color: 'var(--primary-gold)' }}>{filteredItems.length}</strong> items in menu
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="glass-card menu-card">
            {item.category === 'combos' && item.originalPrice && (
              <div className="discount-tag">SAVE 30% OFF</div>
            )}
            {item.image && (
              <img src={item.image} alt={item.name} className="menu-card-image" />
            )}
            <div className="menu-item-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className={`diet-tag ${item.isVeg ? 'veg' : 'non-veg'}`} title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'} />
                <h3 className="menu-item-title">{item.name}</h3>
              </div>
              <div className="menu-item-price">
                {item.originalPrice && <span className="original-price">₹{item.originalPrice}</span>}
                ₹{item.price}
              </div>
            </div>

            <p className="menu-item-desc">{item.description}</p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px' }}>
              <span style={{ color: '#ffd700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#ffd700" /> {item.rating || '4.8'}
              </span>
              <button
                onClick={() => addToOrder(item)}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                + Add To Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Drawer Modal */}
      {showOrderDrawer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 2000,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            background: '#120c0a',
            borderLeft: '1px solid var(--border-gold)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-gold)' }}>
              <h3 className="font-heading gold-text" style={{ fontSize: '1.4rem' }}>YOUR TAKEAWAY ORDER</h3>
              <button onClick={() => setShowOrderDrawer(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem 0' }}>
              {orderList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Utensils size={48} style={{ color: 'var(--primary-gold)', marginBottom: '1rem', opacity: 0.5 }} />
                  <p>Your order tray is currently empty.</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Add items from the menu to build your takeaway or table order list.</p>
                </div>
              ) : (
                orderList.map((item) => (
                  <div key={item.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 0',
                    borderBottom: '1px solid var(--border-light)'
                  }}>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                      <div style={{ color: 'var(--primary-gold)', fontSize: '0.85rem' }}>₹{item.price} x {item.qty} = ₹{item.price * item.qty}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}>-</button>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ width: '28px', height: '28px', background: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '4px' }}>+</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {orderList.length > 0 && (
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.25rem' }}>
                  <span>Total Amount:</span>
                  <span className="gold-text">₹{totalPrice}</span>
                </div>
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Phone size={18} /> Direct Call To Place Order ({RESTAURANT_INFO.phone})
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
