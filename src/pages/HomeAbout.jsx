import React, { useState, useEffect } from 'react';
import { 
  Utensils, MapPin, Award, Star, Clock, Phone, ArrowRight, 
  Sparkles, CheckCircle2, ChevronLeft, ChevronRight, HeartHandshake, ShieldCheck
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

const SLIDESHOW_IMAGES = [
  './images/slideshow/slide1.jpg',
  './images/slideshow/slide2.jpg',
  './images/slideshow/slide3.jpg',
  './images/slideshow/slide4.jpg',
  './images/slideshow/slide5.jpg'
];

export default function HomeAbout({ setActivePage }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play hero background slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % SLIDESHOW_IMAGES.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + SLIDESHOW_IMAGES.length) % SLIDESHOW_IMAGES.length);

  return (
    <div className="home-about-page">
      {/* HERO SECTION WITH BACKGROUND SLIDESHOW */}
      <section className="hero">
        {/* Slideshow Background Images */}
        <div className="hero-slideshow-container">
          {SLIDESHOW_IMAGES.map((imgSrc, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${imgSrc})` }}
            />
          ))}
          <div className="hero-slide-overlay" />
        </div>

        {/* Hero Text Content */}
        <div className="container hero-content">
          <div className="hero-badge">
            <MapPin size={14} /> Solina Bazar, Airport Rd, Srinagar
          </div>

          <h1 className="hero-title font-heading gold-text">
            ROYAL KASHMIRI FLAVORS & OTTOMAN ELEGANCE
          </h1>

          <p className="hero-subtitle">
            Welcome to Cafe Ertugrul — Srinagar's premier destination for authentic Kashmiri Wazwan, sizzling Tandoori delicacies, succulent Kanti & Kebabs, artisanal pizzas, and refreshing mocktails.
          </p>

          <div className="hero-buttons">
            <button onClick={() => setActivePage('menu')} className="btn-primary">
              <Utensils size={18} /> Explore Menu (91 Items)
            </button>
            <button onClick={() => setActivePage('contact')} className="btn-secondary">
              <MapPin size={18} /> Find Us / Contact
            </button>
          </div>

          {/* Slideshow Controls & Indicators */}
          <div className="slideshow-controls">
            <button onClick={prevSlide} className="slideshow-btn" aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <div className="slideshow-dots">
              {SLIDESHOW_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className="slideshow-btn" aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* QUICK STATS BAR */}
      <div style={{ background: 'rgba(20, 14, 10, 0.95)', borderBottom: '1px solid var(--border-gold)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1.5rem', textAlign: 'center' }}>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>16+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Menu Categories</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>91+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Handcrafted Items</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>100%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Authentic Spices</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '1.8rem', fontWeight: 800 }}>4.9 ★</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Customer Rating</div>
          </div>
        </div>
      </div>

      {/* STORY SECTION (Cleaned Up - Image Next to Story Removed) */}
      <section className="section-padding container">
        <div className="story-section-card glass-card">
          <div className="section-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span className="section-tag">Our Heritage & Passion</span>
            <h2 className="section-title">THE STORY OF <span className="gold-text">CAFE ERTUGRUL</span></h2>
          </div>

          <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.25rem' }}>
            Nestled in the bustling heart of Solina Bazar along Airport Road in Srinagar, <strong>Cafe Ertugrul</strong> was born out of a deep reverence for two legendary culinary traditions — the rich, aromatic heritage of Kashmiri Wazwan and the warm, opulent hospitality of Ottoman dining culture.
          </p>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.8', marginBottom: '1.75rem' }}>
            Every dish served at Cafe Ertugrul tells a story of craftsmanship. From slow-simmered Kashmiri Mutton Biryani infused with pure saffron to hand-skewered Mutton Kanti cooked over hot coals, we select only the finest local ingredients and authentic Kashmiri spices to ensure an unforgettable dining experience.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
            <div style={{ background: 'rgba(15, 10, 7, 0.6)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={20} /> Authentic Ingredients
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Pure saffron, hand-ground Kashmiri chilies, and fresh local produce every morning.</div>
            </div>

            <div style={{ background: 'rgba(15, 10, 7, 0.6)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HeartHandshake size={20} /> Royal Ambiance
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Warm wooden interiors, traditional seating, and polite hospitality for families & guests.</div>
            </div>

            <div style={{ background: 'rgba(15, 10, 7, 0.6)', border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-sm)', padding: '1.25rem' }}>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} /> Master Chefs
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Experienced Kashmiri chefs specializing in Tandoor, Wazwan, Kebabs, and fusion rolls.</div>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE DISHES SHOWCASE */}
      <section className="section-padding" style={{ background: 'rgba(20, 14, 10, 0.6)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Chef's Recommendations</span>
            <h2 className="section-title">SIGNATURE <span className="gold-text">DELICACIES</span></h2>
            <p className="section-desc">Handpicked customer favorites prepared fresh daily at Cafe Ertugrul.</p>
          </div>

          <div className="menu-grid">
            <div className="glass-card menu-card">
              <img src="./images/biryani.png" alt="Special Kashmiri Biryani" className="menu-card-image" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="diet-tag non-veg" />
                <span style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>₹380</span>
              </div>
              <h3 className="menu-item-title" style={{ marginBottom: '8px' }}>Special Kashmiri Mutton Biryani</h3>
              <p className="menu-item-desc">Slow-cooked tender mutton layered with saffron basmati rice and aromatic spices.</p>
              <button onClick={() => setActivePage('menu')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Order In Menu
              </button>
            </div>

            <div className="glass-card menu-card">
              <img src="./images/kebabs.png" alt="Authentic Mutton Kanti" className="menu-card-image" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="diet-tag non-veg" />
                <span style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>₹420</span>
              </div>
              <h3 className="menu-item-title" style={{ marginBottom: '8px' }}>Authentic Kashmiri Mutton Kanti</h3>
              <p className="menu-item-desc">Boneless mutton pieces pan-fried with onions, fresh tomatoes, and green chillies.</p>
              <button onClick={() => setActivePage('menu')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Order In Menu
              </button>
            </div>

            <div className="glass-card menu-card">
              <img src="./images/drinks.png" alt="Kashmiri Saffron Almond Shake" className="menu-card-image" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="diet-tag veg" />
                <span style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>₹220</span>
              </div>
              <h3 className="menu-item-title" style={{ marginBottom: '8px' }}>Kashmiri Saffron Almond Shake</h3>
              <p className="menu-item-desc">Pure saffron cold milk blended with soaked almonds, pistachio & ice cream.</p>
              <button onClick={() => setActivePage('menu')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Order In Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="section-padding container text-center">
        <div className="glass-card" style={{ padding: '3rem 1.5rem', background: 'var(--gold-gradient)', color: '#0f0a07' }}>
          <h2 className="font-heading" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '1rem', color: '#0f0a07' }}>
            READY TO EXPERIENCE CAFE ERTUGRUL?
          </h2>
          <p style={{ fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 2rem', opacity: 0.95, fontWeight: 500 }}>
            Visit us at Solina Bazar, Airport Rd, Srinagar or order takeaway directly via WhatsApp!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setActivePage('menu')} className="btn-primary" style={{ background: '#0f0a07', color: 'var(--primary-gold)' }}>
              <Utensils size={18} /> View Menu
            </button>
            <a href="https://wa.me/917780938743" target="_blank" rel="noreferrer" className="btn-primary" style={{ background: '#25D366', color: '#ffffff', boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)' }}>
              <MessageSquare size={18} /> Order via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
