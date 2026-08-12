import React from 'react';
import { Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FloatingDialButton() {
  return (
    <a
      href={`tel:${RESTAURANT_INFO.phone}`}
      className="floating-dial-btn"
      aria-label="Direct Phone Call Cafe Ertugrul"
    >
      <span className="pulse-ring green-pulse" />
      <Phone size={20} fill="#ffffff" style={{ color: '#ffffff' }} />
      <span className="dial-text">Call {RESTAURANT_INFO.phone}</span>
    </a>
  );
}
