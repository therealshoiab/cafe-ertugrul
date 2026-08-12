import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Phone, Menu, X, MessageSquare } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button onClick={() => handleNavClick('home')} className="brand-logo">
          <div className="logo-badge-container">
            <img src="./images/logo.png" alt="Cafe Ertugrul Brand Logo" className="brand-logo-img" />
          </div>
          <div>
            <div className="brand-name">
              CAFE <span>ERTUGRUL</span>
            </div>
          </div>
        </button>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li>
            <button 
              onClick={() => handleNavClick('home')} 
              className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            >
              Home & Story
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('menu')} 
              className={`nav-link ${activePage === 'menu' ? 'active' : ''}`}
            >
              Explore Menu
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('contact')} 
              className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            >
              Contact & Location
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('admin')} 
              className={`nav-link ${activePage === 'admin' ? 'active' : ''}`}
            >
              Owner Admin 🔐
            </button>
          </li>
        </ul>

        {/* Action Button: Desktop Call & Mobile Hamburger Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a href={`tel:${RESTAURANT_INFO.phone}`} className="btn-primary desktop-call-btn" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            <Phone size={15} /> Call {RESTAURANT_INFO.phone}
          </a>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            style={{ padding: '10px 12px', border: '1px solid var(--border-gold)', color: 'var(--primary-gold)' }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.1rem', padding: '10px 0' }}
          >
            🏠 Home & Story
          </button>
          <button 
            onClick={() => handleNavClick('menu')} 
            className={`nav-link ${activePage === 'menu' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.1rem', padding: '10px 0' }}
          >
            📜 Explore Full Menu (91 Items)
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.1rem', padding: '10px 0' }}
          >
            📍 Contact & Map Location
          </button>
          <button 
            onClick={() => handleNavClick('admin')} 
            className={`nav-link ${activePage === 'admin' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.1rem', padding: '10px 0' }}
          >
            🔐 Owner Admin Portal
          </button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
            <a href="https://wa.me/917780938743" target="_blank" rel="noreferrer" className="btn-primary" style={{ justifyContent: 'center', background: '#25D366', color: '#fff', fontSize: '0.85rem' }}>
              <MessageSquare size={16} /> WhatsApp
            </a>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="btn-secondary" style={{ justifyContent: 'center', fontSize: '0.85rem' }}>
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
