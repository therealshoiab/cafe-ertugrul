import React, { useState, useMemo, useEffect } from 'react';
import { dbService } from '../services/db';
import { RESTAURANT_INFO } from '../data/menuData';
import { 
  Search, Star, Utensils, ShoppingBag, X, Phone, Check, Flame, Gift, 
  Filter, AlertCircle, MessageSquare, Plus, Minus, ArrowRight, ShoppingCart, Edit3
} from 'lucide-react';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState(dbService.getMenuItems());
  const [categories, setCategories] = useState(dbService.getCategories());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg', 'cart-only'
  const [searchQuery, setSearchQuery] = useState('');
  const [orderList, setOrderList] = useState([]);
  const [orderNotes, setOrderNotes] = useState('');
  const [showOrderDrawer, setShowOrderDrawer] = useState(false);

  // Fetch live menu items across all devices on load
  useEffect(() => {
    const loadLiveMenu = async () => {
      const liveItems = await dbService.fetchFromCloudflareD1();
      setMenuItems(liveItems);
      setCategories(dbService.getCategories());
    };
    loadLiveMenu();
  }, []);

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Cart only filter
      if (dietFilter === 'cart-only') {
        return orderList.some(i => i.id === item.id);
      }
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
  }, [menuItems, selectedCategory, dietFilter, searchQuery, orderList]);

  const addToOrder = (item) => {
    if (item.isAvailable === false) return;
    setOrderList((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
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

  const getItemQty = (id) => {
    const item = orderList.find(i => i.id === id);
    return item ? item.qty : 0;
  };

  const totalItemCount = orderList.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = orderList.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Send Order via WhatsApp (Number: 7780938743)
  const handleWhatsAppOrder = () => {
    if (orderList.length === 0) return;
    let message = `*NEW TAKEAWAY ORDER - CAFE ERTUGRUL*\n`;
    message += `📍 *Location:* Solina Bazar, Airport Rd, Srinagar\n`;
    message += `-----------------------------------\n\n`;
    
    orderList.forEach((item, index) => {
      message += `${index + 1}. *${item.name}* x ${item.qty} = ₹${item.price * item.qty}\n`;
    });

    message += `\n-----------------------------------\n`;
    message += `💰 *TOTAL AMOUNT:* ₹${totalPrice}\n`;
    if (orderNotes.trim()) {
      message += `📝 *Special Notes:* ${orderNotes.trim()}\n`;
    }
    message += `\n*Customer Request:* Please prepare my order for takeaway collection. Thank you!`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/917780938743?text=${encodedText}`, '_blank');
  };

  return (
    <div className="menu-page section-padding container" style={{ paddingBottom: totalItemCount > 0 ? '100px' : '4rem' }}>
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">Authentic Taste of Srinagar</span>
        <h2 className="section-title">CAFE ERTUGRUL <span className="gold-text">MENU</span></h2>
        <p className="section-desc">Explore handcrafted dishes across 16 categories — from Biryani to Tandoor, Kathi Rolls, Pizzas & Shakes.</p>
      </div>

      {/* Search Bar */}
      <div className="menu-search-bar">
        <Search size={20} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search by dish name, biryani, pizza, kanti, shake..."
          className="menu-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ color: 'var(--text-muted)' }}>
            <X size={18} />
          </button>
        )}
      </div>

      {/* Segmented Diet Control Row */}
      <div className="diet-filter-container">
        <div className="segmented-diet-control">
          <button
            onClick={() => setDietFilter('all')}
            className={`diet-btn ${dietFilter === 'all' ? 'active-all' : ''}`}
          >
            All Foods
          </button>
          <button
            onClick={() => setDietFilter('veg')}
            className={`diet-btn ${dietFilter === 'veg' ? 'active-veg' : ''}`}
          >
            <span className="diet-tag veg" style={{ width: '8px', height: '8px' }} /> Veg
          </button>
          <button
            onClick={() => setDietFilter('non-veg')}
            className={`diet-btn ${dietFilter === 'non-veg' ? 'active-nonveg' : ''}`}
          >
            <span className="diet-tag non-veg" style={{ width: '8px', height: '8px' }} /> Non-Veg
          </button>

          {totalItemCount > 0 && (
            <button
              onClick={() => setDietFilter('cart-only')}
              className={`diet-btn ${dietFilter === 'cart-only' ? 'active-cart' : ''}`}
            >
              <ShoppingCart size={13} /> In Order ({totalItemCount})
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Bar (16 Categories) */}
      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              if (dietFilter === 'cart-only') setDietFilter('all');
            }}
            className={`category-pill ${selectedCategory === cat.id && dietFilter !== 'cart-only' ? 'active' : ''}`}
          >
            {cat.special && <Gift size={15} style={{ color: '#ffd700' }} />}
            {cat.name}
            <span className="category-badge-count">{cat.count}</span>
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredItems.map((item) => {
          const qty = getItemQty(item.id);
          const isAdded = qty > 0;

          return (
            <div 
              key={item.id} 
              className={`glass-card menu-card ${isAdded ? 'item-added-card' : ''}`}
              style={{ 
                opacity: item.isAvailable === false ? 0.65 : 1,
                border: isAdded ? '2px solid #ffd700' : '1px solid var(--border-gold)',
                boxShadow: isAdded ? '0 0 20px rgba(229, 183, 87, 0.35)' : 'none'
              }}
            >
              {isAdded && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  background: 'var(--gold-gradient)',
                  color: '#0f0a07',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '3px 9px',
                  borderRadius: '12px',
                  zIndex: 10,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  IN ORDER: {qty}
                </div>
              )}

              {item.category === 'combos' && item.originalPrice && !isAdded && (
                <div className="discount-tag">SAVE 30% OFF</div>
              )}

              {item.image && (
                <img src={item.image} alt={item.name} className="menu-card-image" />
              )}

              <div className="menu-item-header">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flexGrow: 1 }}>
                  <span className={`diet-tag ${item.isVeg ? 'veg' : 'non-veg'}`} title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'} style={{ marginTop: '3px' }} />
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

                {item.isAvailable === false ? (
                  <span style={{ color: '#e63946', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <AlertCircle size={14} /> Out of Stock
                  </span>
                ) : isAdded ? (
                  /* Quantity Selector Right on Card */
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(229, 183, 87, 0.15)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-gold)' }}>
                    <button 
                      onClick={() => updateQty(item.id, -1)} 
                      style={{ color: 'var(--primary-gold)', fontWeight: 800, padding: '2px 6px', fontSize: '1rem' }}
                    >
                      <Minus size={14} />
                    </button>
                    <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem', minWidth: '18px', textAlign: 'center' }}>
                      {qty}
                    </span>
                    <button 
                      onClick={() => updateQty(item.id, 1)} 
                      style={{ color: 'var(--primary-gold)', fontWeight: 800, padding: '2px 6px', fontSize: '1rem' }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToOrder(item)}
                    className="btn-secondary"
                    style={{ padding: '7px 14px', fontSize: '0.82rem' }}
                  >
                    + Add To Order
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* STICKY FLOATING CART BUTTON WHEN ITEMS ADDED */}
      {totalItemCount > 0 && (
        <div className="sticky-mobile-cart-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="cart-badge-icon">
              <ShoppingBag size={20} />
              <span className="cart-badge-count">{totalItemCount}</span>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem' }}>₹{totalPrice}</div>
              <div style={{ color: 'var(--primary-gold)', fontSize: '0.75rem' }}>{totalItemCount} Dish{totalItemCount > 1 ? 'es' : ''} Selected</div>
            </div>
          </div>

          <button onClick={() => setShowOrderDrawer(true)} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.88rem' }}>
            View Order <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* Takeaway Order Modal Drawer */}
      {showOrderDrawer && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 2500,
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <div className="order-drawer-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-gold)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src="./images/logo.png" alt="Cafe Ertugrul Logo" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                <h3 className="font-heading gold-text" style={{ fontSize: '1.3rem' }}>YOUR TAKEAWAY ORDER</h3>
              </div>
              <button onClick={() => setShowOrderDrawer(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={24} />
              </button>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1rem 0' }}>
              {orderList.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                  <Utensils size={44} style={{ color: 'var(--primary-gold)', marginBottom: '1rem', opacity: 0.5 }} />
                  <p>Your order tray is currently empty.</p>
                  <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Add items from the menu to build your takeaway list.</p>
                </div>
              ) : (
                <>
                  {orderList.map((item) => (
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
                  ))}

                  {/* Customer Order Notes Input Field */}
                  <div style={{ marginTop: '1.25rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary-gold)', fontSize: '0.88rem', fontWeight: 600, marginBottom: '6px' }}>
                      <Edit3 size={15} /> Add Message / Special Instructions:
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      placeholder="e.g. Extra spicy, less oil, delivery address, no onions..."
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>
                </>
              )}
            </div>

            {orderList.length > 0 && (
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1rem' }}>
                  <span>Total Amount:</span>
                  <span className="gold-text">₹{totalPrice}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                  <button
                    onClick={handleWhatsAppOrder}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff' }}
                  >
                    <MessageSquare size={18} /> Send Order via WhatsApp
                  </button>

                  <a
                    href={`tel:${RESTAURANT_INFO.phone}`}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem' }}
                  >
                    <Phone size={16} /> Direct Call
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
