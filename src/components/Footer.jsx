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
                href={RESTAURANT_INFO.instagramUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-gold)'
                }}
              >
                <InstagramIcon size={18} />
              </a>
              <a 
                href={RESTAURANT_INFO.facebookUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-gold)'
                }}
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleNav('home')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Home & Story</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Explore Menu</button></li>
              <li><button onClick={() => handleNav('contact')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Location & Map</button></li>
              <li><button onClick={() => handleNav('admin')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Owner Admin Portal 🔐</button></li>
              <li><a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>Get Directions <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>

          {/* Popular Menu */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Popular Dishes</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Kashmiri Mutton Biryani</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>House of Tandoor</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Authentic Mutton Kanti</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Non-Veg Pizzas</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Saffron Almond Shake</button></li>
            </ul>
          </div>

          {/* Hours & Contact */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Contact Info</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <MapPin size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0, marginTop: '3px' }} />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Phone size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: '#fff', fontWeight: 600 }}>{RESTAURANT_INFO.phone}</a>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Clock size={16} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.hours} (All 7 Days)</span>
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
