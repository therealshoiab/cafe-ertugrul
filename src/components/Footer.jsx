import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { MapPin, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './Icons';

export default function Footer({ setActivePage }) {
  const handleNav = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div className="logo-badge-container" style={{ width: '40px', height: '40px' }}>
                <img src="./images/logo.png" alt="Cafe Ertugrul Logo" className="brand-logo-img" />
              </div>
              <span className="font-heading" style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
                CAFE <span style={{ color: 'var(--primary-gold)' }}>ERTUGRUL</span>
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', maxWidth: '320px' }}>
              Premier dining destination in Srinagar serving authentic Kashmiri Wazwan, Tandoori delicacies, Kanti & Kebabs, artisanal pizzas, and beverages.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href={RESTAURANT_INFO.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(220, 39, 67, 0.4)'
                }}
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href={RESTAURANT_INFO.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#1877F2',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(24, 119, 242, 0.4)'
                }}
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              <li><button onClick={() => handleNav('home')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Home & Story</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Explore Menu</button></li>
              <li><button onClick={() => handleNav('contact')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Location & Map</button></li>
              <li><button onClick={() => handleNav('admin')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Owner Admin Portal 🔐</button></li>
              <li><a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', font: 'inherit' }}>Get Directions <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>

          {/* Popular Menu */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Popular Dishes</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Kashmiri Mutton Biryani</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>House of Tandoor</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Authentic Mutton Kanti</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Non-Veg Pizzas</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer' }}>Saffron Almond Shake</button></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <MapPin size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Clock size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Cafe Ertugrul, Srinagar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
