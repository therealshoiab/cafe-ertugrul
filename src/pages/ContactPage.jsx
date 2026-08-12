import React, { useState } from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { MapPin, Phone, Clock, Navigation, Calendar, Users, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '../components/Icons';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: new Date().toISOString().split('T')[0],
    time: '13:00',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Format WhatsApp Reservation Message
    const message = `*TABLE RESERVATION REQUEST - CAFE ERTUGRUL*\n` +
      `📍 *Location:* Solina Bazar, Airport Rd, Srinagar\n\n` +
      `👤 *Customer Name:* ${formData.name}\n` +
      `📞 *Phone Number:* ${formData.phone}\n` +
      `👥 *Number of Guests:* ${formData.guests}\n` +
      `📅 *Date:* ${formData.date}\n` +
      `⏰ *Time:* ${formData.time}\n` +
      `📝 *Notes:* ${formData.notes || 'None'}\n\n` +
      `Please confirm table availability for us. Thank you!`;

    const encodedText = encodeURIComponent(message);
    window.open(`https://wa.me/917780938743?text=${encodedText}`, '_blank');
  };

  return (
    <div className="contact-page section-padding container">
      {/* Header */}
      <div className="section-header">
        <span className="section-tag">Solina Bazar, Srinagar</span>
        <h2 className="section-title">CONTACT & <span className="gold-text">RESERVATIONS</span></h2>
        <p className="section-desc">Reserve a table for your family, book private seating, or visit us directly on Airport Road.</p>
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

          {/* Map Container */}
          <div className="map-container">
            <iframe
              title="Cafe Ertugrul Google Maps Location"
              src={RESTAURANT_INFO.mapsEmbedSrc}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Column: Table Reservation Form */}
        <div>
          <div className="glass-card">
            <h3 className="font-heading gold-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Reserve A Table</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select any time during working hours (11:30 AM to 10:30 PM). Your request will automatically open on WhatsApp for instant confirmation.
            </p>

            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={54} style={{ color: '#25D366', marginBottom: '1rem' }} />
                <h4 className="font-heading gold-text" style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>RESERVATION SENT!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
                  Your reservation request was generated for <strong>{formData.name}</strong> on {formData.date} at {formData.time}.
                </p>
                <button onClick={() => setFormSubmitted(false)} className="btn-secondary">
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder="e.g. Shoiab Mushtaq"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="e.g. 7006609580"
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
                      <option value="8+">8+ Family Guests</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Date *</label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time (Anytime 11:30AM-10:30PM) *</label>
                    <input
                      type="time"
                      required
                      min="11:30"
                      max="22:30"
                      className="form-control"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Special Requests / Seating Notes</label>
                  <textarea
                    rows={3}
                    className="form-control"
                    placeholder="e.g. Anniversary dinner, high chair required, quiet booth preference..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#25D366', color: '#fff' }}>
                  <MessageSquare size={18} /> Send Table Booking via WhatsApp
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
