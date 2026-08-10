import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Utensils, Star, Award, ShieldCheck, MapPin, Clock, Phone, ArrowRight, Heart, Coffee, Flame } from 'lucide-react';

export default function HomeAbout({ setActivePage }) {
  return (
    <div className="home-about-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Award size={16} /> Solina Bazar, Airport Rd, Srinagar
          </div>
          <h1 className="hero-title">
            ROYAL KASHMIRI FLAVORS & <span className="gold-text">OTTOMAN ELEGANCE</span>
          </h1>
          <p className="hero-subtitle">
            Welcome to <strong>Cafe Ertugrul</strong> — Srinagar's premier destination for authentic Kashmiri Wazwan, sizzling Tandoori delicacies, succulent Kanti & Kebabs, artisanal pizzas, and refreshing mocktails.
          </p>
          <div className="hero-buttons">
            <button onClick={() => setActivePage('menu')} className="btn-primary">
              <Utensils size={18} /> Explore Menu (91 Items)
            </button>
            <button onClick={() => setActivePage('contact')} className="btn-secondary">
              <MapPin size={18} /> Find Us / Contact
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <div style={{ background: 'rgba(24, 17, 13, 0.95)', borderBottom: '1px solid var(--border-gold)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', textAlign: 'center' }}>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>16+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Menu Categories</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>91+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Delectable Items</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>4.9★</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customer Rating</div>
          </div>
          <div>
            <div className="font-heading gold-text" style={{ fontSize: '2.2rem', fontWeight: 800 }}>30%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Max Combo Savings</div>
          </div>
        </div>
      </div>

      {/* About Us & Our Story Section */}
      <section className="section-padding container">
        <div className="about-grid">
          <div>
            <span className="section-tag">Our Heritage & Passion</span>
            <h2 className="section-title">The Story of <span className="gold-text">Cafe Ertugrul</span></h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
              Nestled along <strong>Airport Road in Solina Bazar, Srinagar</strong>, Cafe Ertugrul was born out of a deep reverence for rich culinary heritage and warm royal hospitality. Inspired by timeless traditions, our kitchen blends ancient Kashmiri spice secrets with modern dining finesse.
            </p>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
              From slow-cooked dum biryanis infused with genuine saffron to sizzling mutton kanti, hand-tossed artisanal pizzas, and refreshing handcrafted mocktails — every dish is cooked with love, fresh local ingredients, and uncompromised quality.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="info-icon" style={{ width: '40px', height: '40px' }}><ShieldCheck size={20} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>100% Fresh Ingredients</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sourced daily from local markets</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div className="info-icon" style={{ width: '40px', height: '40px' }}><Heart size={20} /></div>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '0.95rem' }}>Royal Ambiance</h4>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Comfortable seating & decor</span>
                </div>
              </div>
            </div>

            <button onClick={() => setActivePage('menu')} className="btn-primary">
              Discover Our Menu <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '2px solid var(--border-gold)', boxShadow: 'var(--shadow-main)' }}>
              <img src="./images/hero.png" alt="Cafe Ertugrul Dining Experience" style={{ width: '100%', height: '450px', objectFit: 'cover', display: 'block' }} />
            </div>
            <div className="hero-float-badge">
              <div className="logo-badge" style={{ width: '42px', height: '42px', fontSize: '1.1rem' }}>★</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>Authentic Flavors</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Solina Bazar, Srinagar</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Showcase */}
      <section className="section-padding" style={{ background: 'rgba(20, 14, 10, 0.6)', borderTop: '1px solid var(--border-gold)', borderBottom: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Chef's Recommendations</span>
            <h2 className="section-title">Signature <span className="gold-text">Specialties</span></h2>
            <p className="section-desc">Sample a few of our most loved Kashmiri and global culinary masterpieces.</p>
          </div>

          <div className="features-grid">
            <div className="glass-card menu-card" style={{ padding: '1.25rem' }}>
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

            <div className="glass-card menu-card" style={{ padding: '1.25rem' }}>
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

            <div className="glass-card menu-card" style={{ padding: '1.25rem' }}>
              <img src="./images/drinks.png" alt="Kashmiri Saffron Almond Shake" className="menu-card-image" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="diet-tag veg" />
                <span style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>₹220</span>
              </div>
              <h3 className="menu-item-title" style={{ marginBottom: '8px' }}>Saffron Almond Royal Shake</h3>
              <p className="menu-item-desc">Pure saffron infused cold milk blended with soaked almonds, pistachio & ice cream.</p>
              <button onClick={() => setActivePage('menu')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                Order In Menu
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-tag">Experience The Difference</span>
          <h2 className="section-title">Why Guests Love <span className="gold-text">Cafe Ertugrul</span></h2>
        </div>

        <div className="features-grid">
          <div className="glass-card feature-card">
            <div className="feature-icon"><Flame size={32} /></div>
            <h3 className="feature-title">Authentic Tandoor</h3>
            <p className="feature-text">Traditional charcoal tandoor grilling yields irresistible smokiness for our kebabs and naans.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon"><Utensils size={32} /></div>
            <h3 className="feature-title">16 Menu Categories</h3>
            <p className="feature-text">From traditional Wazwan and Biryanis to Momos, Pizzas, Kathi Rolls, and Shakes.</p>
          </div>

          <div className="glass-card feature-card">
            <div className="feature-icon"><Coffee size={32} /></div>
            <h3 className="feature-title">Handcrafted Beverages</h3>
            <p className="feature-text">Signature mocktails, saffron coolers, and thick creamy milkshakes for every mood.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding" style={{ background: 'rgba(24, 17, 13, 0.8)', borderTop: '1px solid var(--border-gold)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Customer Reviews</span>
            <h2 className="section-title">Loved By <span className="gold-text">Srinagar Locals & Visitors</span></h2>
          </div>

          <div className="features-grid">
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', color: '#ffd700', gap: '4px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#ffd700" />)}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                "The Kashmiri Mutton Kanti and Biryani at Cafe Ertugrul are hands down the best on Airport Road! Beautiful ambience and super friendly staff."
              </p>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>- Tariq Ahmad, Srinagar</div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', color: '#ffd700', gap: '4px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#ffd700" />)}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                "Their Non-Veg Pizza and Saffron Almond Shake are extraordinary! Plus the Combo offers save you real money. Highly recommended!"
              </p>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>- Mehreen K., Solina</div>
            </div>

            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', color: '#ffd700', gap: '4px', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#ffd700" />)}
              </div>
              <p style={{ color: 'var(--text-main)', fontStyle: 'italic', marginBottom: '1.25rem' }}>
                "Great spot for family dinners. Kurkure momos, Butter chicken, and Garlic Naan were cooked to absolute perfection."
              </p>
              <div style={{ color: 'var(--primary-gold)', fontWeight: 700 }}>- Aadil Shah, Tourist</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="container" style={{ padding: '4rem 1.5rem' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(36, 25, 19, 0.95), rgba(15, 10, 7, 0.98))',
          border: '2px solid var(--primary-gold)',
          padding: '3.5rem 2rem',
          textAlign: 'center',
          borderRadius: 'var(--radius-lg)'
        }}>
          <h2 className="font-heading gold-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            READY TO TASTE THE ROYAL FLAVORS?
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Visit us today at Solina Bazar, Airport Rd, Srinagar or place a direct takeaway phone order.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a href={`tel:${RESTAURANT_INFO.phone}`} className="btn-primary">
              <Phone size={18} /> Call {RESTAURANT_INFO.phone}
            </a>
            <button onClick={() => setActivePage('menu')} className="btn-secondary">
              <Utensils size={18} /> View All 91 Menu Items
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
