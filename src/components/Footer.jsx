import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './Icons';

export default function Footer({ setActivePage }) {
  const handleNav = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="logo-badge">CE</div>
              <div className="brand-name">
                CAFE <span>ERTUGRUL</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '340px' }}>
              {RESTAURANT_INFO.tagline}. Located in the heart of Srinagar on Airport Road, Solina Bazar.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a 
                href={RESTAURANT_INFO.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="info-icon" 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
              <a 
                href={RESTAURANT_INFO.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="info-icon" 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleNav('home')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Home & Story</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Explore Menu</button></li>
              <li><button onClick={() => handleNav('contact')} style={{ color: 'inherit', background: 'none', border: 'none' }}>Location & Map</button></li>
              <li><a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--primary-gold)' }}>Get Directions <ArrowUpRight size={14} /></a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Popular Menu</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', color: 'var(--text-muted)' }}>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit' }}>Kashmiri Biryani</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit' }}>House of Tandoor</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit' }}>Mutton Kanti</button></li>
              <li><button onClick={() => handleNav('menu')} style={{ color: 'inherit' }}>Mocktails & Shakes</button></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '1.25rem', fontSize: '1.1rem' }}>Visit Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: 'var(--primary-gold)', fontWeight: 600 }}>{RESTAURANT_INFO.phone}</a>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={18} style={{ color: 'var(--primary-gold)', flexShrink: 0 }} />
                <span>{RESTAURANT_INFO.hours}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Cafe Ertugrul. All rights reserved. Solina Bazar, Airport Rd, Srinagar.</p>
        </div>
      </div>
    </footer>
  );
}
