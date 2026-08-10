import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { MapPin, Phone, Clock, Send, CheckCircle2, Navigation, MessageCircle } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/Icons';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:00',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="contact-page section-padding container">
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">Reach Out & Visit Us</span>
        <h2 className="section-title">CONTACT <span className="gold-text">CAFE ERTUGRUL</span></h2>
        <p className="section-desc">Located at Solina Bazar, Airport Road, Srinagar. Call us directly or book a table below.</p>
      </div>

      <div className="contact-grid">
        {/* Left Column: Info & Interactive Google Maps */}
        <div>
          <div className="glass-card" style={{ marginBottom: '2rem' }}>
            <h3 className="font-heading gold-text" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Restaurant Location & Info</h3>

            <div className="info-item">
              <div className="info-icon"><MapPin size={22} /></div>
              <div>
                <div className="info-title">Address</div>
                <div className="info-text">{RESTAURANT_INFO.address}</div>
                <a 
                  href={RESTAURANT_INFO.googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--primary-gold)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}
                >
                  <Navigation size={14} /> Open In Google Maps App
                </a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Phone size={22} /></div>
              <div>
                <div className="info-title">Phone Number / Takeaway Orders</div>
                <div className="info-text">
                  <a href={`tel:${RESTAURANT_INFO.phone}`} style={{ color: 'var(--primary-gold)', fontWeight: 700, fontSize: '1.1rem' }}>
                    {RESTAURANT_INFO.phone}
                  </a> ({RESTAURANT_INFO.formattedPhone})
                </div>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon"><Clock size={22} /></div>
              <div>
                <div className="info-title">Working Hours</div>
                <div className="info-text">{RESTAURANT_INFO.hours} (Open All 7 Days)</div>
              </div>
            </div>
          </div>

          {/* Map Embed */}
          <div className="map-container">
            <iframe
              title="Cafe Ertugrul Location Map"
              src={RESTAURANT_INFO.mapsEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Column: Table Reservation Form */}
        <div>
          <div className="glass-card">
            <h3 className="font-heading gold-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Table Reservation & Inquiry</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Reserve a table for your family dinner or private celebration in advance.
            </p>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={54} style={{ color: 'var(--primary-gold)', marginBottom: '1rem' }} />
                <h4 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Reservation Request Sent!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                  Thank you, <strong>{formData.name}</strong>! We look forward to welcoming you to Cafe Ertugrul. Our team will contact you shortly at <strong>{formData.phone}</strong> to confirm your table.
                </p>
                <button 
                  onClick={() => setFormSubmitted(false)} 
                  className="btn-secondary" 
                  style={{ marginTop: '1.5rem' }}
                >
                  Make Another Booking
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="07006609580 or your phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label className="form-label">Guests</label>
                    <select
                      className="form-control"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Guests (Family)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time</label>
                    <select
                      className="form-control"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="19:00">07:00 PM</option>
                      <option value="20:30">08:30 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests / Seating Notes</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="e.g. High chair needed, anniversary dinner, preference for quiet booth..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Send size={18} /> Submit Table Booking
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Social Media Embedments Section */}
      <section style={{ marginTop: '4rem' }}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
          <span className="section-tag">Stay Connected</span>
          <h2 className="section-title">FOLLOW <span className="gold-text">CAFE ERTUGRUL</span> ONLINE</h2>
          <p className="section-desc">Join our online community on Instagram & Facebook for live updates, mouthwatering reels, and special discount announcements.</p>
        </div>

        <div className="social-cards-grid">
          {/* Instagram Embed Card */}
          <div className="social-embed-card">
            <div className="social-header">
              <div className="social-avatar" style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)', color: '#fff' }}>
                <InstagramIcon size={24} />
              </div>
              <div className="social-meta">
                <div className="social-username">Cafe Ertugrul</div>
                <div className="social-handle">@cafe.ertugrul</div>
              </div>
              <a 
                href={RESTAURANT_INFO.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Follow
              </a>
            </div>

            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '220px', position: 'relative' }}>
              <img src="./images/biryani.png" alt="Instagram post preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                padding: '12px',
                color: '#fff',
                fontSize: '0.85rem'
              }}>
                "Savoring genuine Kashmiri saffron biryani at Cafe Ertugrul! 👑✨ #CafeErtugrul #SrinagarEats #SolinaBazar"
              </div>
            </div>

            <a 
              href={RESTAURANT_INFO.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--primary-gold)', fontWeight: 600, textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              View Official Instagram Profile <InstagramIcon size={16} />
            </a>
          </div>

          {/* Facebook Embed Card */}
          <div className="social-embed-card">
            <div className="social-header">
              <div className="social-avatar" style={{ background: '#1877f2', color: '#fff' }}>
                <FacebookIcon size={24} />
              </div>
              <div className="social-meta">
                <div className="social-username">Cafe Ertugrul Official Page</div>
                <div className="social-handle">facebook.com/cafe.ertugrul</div>
              </div>
              <a 
                href={RESTAURANT_INFO.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-secondary" 
                style={{ padding: '6px 14px', fontSize: '0.8rem' }}
              >
                Like Page
              </a>
            </div>

            <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '220px', position: 'relative' }}>
              <img src="./images/kebabs.png" alt="Facebook post preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                padding: '12px',
                color: '#fff',
                fontSize: '0.85rem'
              }}>
                "Fresh sizzlers, Kanti & Tandoori chicken live from our charcoal grill at Solina Bazar, Srinagar!"
              </div>
            </div>

            <a 
              href={RESTAURANT_INFO.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: 'var(--primary-gold)', fontWeight: 600, textAlign: 'center', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              View Official Facebook Page <FacebookIcon size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
