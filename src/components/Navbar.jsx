import React, { useState, useEffect } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Phone, Menu, X, Utensils, MapPin, Smartphone, Tablet, Monitor } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w <= 576) {
        setDeviceType('mobile');
      } else if (w <= 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <button onClick={() => handleNavClick('home')} className="brand-logo">
          <div className="logo-badge">CE</div>
          <div>
            <div className="brand-name">
              CAFE <span>ERTUGRUL</span>
            </div>
            <div className="device-tag">
              {deviceType === 'mobile' && <><Smartphone size={12} /> Mobile View</>}
              {deviceType === 'tablet' && <><Tablet size={12} /> Tablet View</>}
              {deviceType === 'desktop' && <><Monitor size={12} /> Desktop View</>}
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
              Home & About
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavClick('menu')} 
              className={`nav-link ${activePage === 'menu' ? 'active' : ''}`}
            >
              Full Menu
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
        </ul>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a href={`tel:${RESTAURANT_INFO.phone}`} className="btn-primary" style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
            <Phone size={15} /> <span className="hide-on-mobile">Call</span> {RESTAURANT_INFO.phone}
          </a>

          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <button 
            onClick={() => handleNavClick('home')} 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.15rem' }}
          >
            Home & Story
          </button>
          <button 
            onClick={() => handleNavClick('menu')} 
            className={`nav-link ${activePage === 'menu' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.15rem' }}
          >
            Explore Menu (91 Items)
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className={`nav-link ${activePage === 'contact' ? 'active' : ''}`}
            style={{ textAlign: 'left', fontSize: '1.15rem' }}
          >
            Contact & Map Location
          </button>
        </div>
      )}
    </nav>
  );
}
