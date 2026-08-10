import React from 'react';
import { Phone } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export default function FloatingDialButton() {
  return (
    <a
      href={`tel:${RESTAURANT_INFO.phone}`}
      className="floating-dial-btn"
      aria-label={`Call Cafe Ertugrul at ${RESTAURANT_INFO.phone}`}
      title={`Call Cafe Ertugrul (${RESTAURANT_INFO.phone})`}
    >
      <div className="pulse-ring"></div>
      <Phone size={24} />
      <span className="dial-text">Call {RESTAURANT_INFO.phone}</span>
    </a>
  );
}
