import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBooking, onOpenAdmin, bookingCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 150) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky-header-master">
      {/* Sacred Top Shloka Ticker Banner */}
      <div className="shloka-ticker">
        <div className="shloka-track">
          <span style={{ margin: '0 24px' }}>॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥</span>
          <span style={{ margin: '0 24px', color: 'var(--gold-light)' }}>॥ ॐ श्री गणेशाय नमः ॥</span>
          <span style={{ margin: '0 24px' }}>॥ ॐ नमः शिवाय ॥</span>
          <span style={{ margin: '0 24px', color: 'var(--gold-light)' }}>॥ हरे राम हरे राम राम राम हरे हरे, हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे ॥</span>
          <span style={{ margin: '0 24px' }}>॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥</span>
          <span style={{ margin: '0 24px', color: 'var(--gold-light)' }}>॥ ॐ नमो भगवते वासुदेवाय ॥</span>
        </div>
      </div>

      <header
        id="siteHeader"
        style={{
          background: scrolled ? 'rgba(255, 253, 248, 0.98)' : 'rgba(255, 253, 248, 0.95)'
        }}
      >
        <div className="header-container">
          <a
            href="/"
            className="header-logo"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (window.location.hash) {
                window.history.replaceState(null, '', window.location.pathname);
              }
            }}
          >
            <div className="logo-crest" title="Sacred Vedic Om Crest with Rotating Surya Chakra">
              {/* 1. Outer Rotating Surya / Sun Chakra Circle */}
              <svg
                className="logo-chakra-sun"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="sunGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF4A3" />
                    <stop offset="30%" stopColor="#F59E0B" />
                    <stop offset="70%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#92400E" />
                  </linearGradient>
                </defs>

                {/* 24 Radiating Sun Rays (Surya Kiran Mandala) */}
                <g transform="translate(60,60)">
                  {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg, i) => {
                    const isMajor = i % 2 === 0;
                    return isMajor ? (
                      <path
                        key={deg}
                        d="M -3.5 -38 Q -1 -48 0 -57 Q 1 -48 3.5 -38 Z"
                        fill="url(#sunGoldGrad)"
                        transform={`rotate(${deg})`}
                      />
                    ) : (
                      <path
                        key={deg}
                        d="M -2.2 -38 L 0 -49 L 2.2 -38 Z"
                        fill="url(#sunGoldGrad)"
                        opacity="0.88"
                        transform={`rotate(${deg})`}
                      />
                    );
                  })}

                  {/* Outer Circular Ring connecting rays */}
                  <circle cx="0" cy="0" r="38" fill="none" stroke="url(#sunGoldGrad)" strokeWidth="2" />
                  <circle cx="0" cy="0" r="39.8" fill="none" stroke="#FFF4A3" strokeWidth="0.8" strokeDasharray="2 3" opacity="0.9" />

                  {/* 24 Golden Solar Beads */}
                  {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => (
                    <circle
                      key={`bead-${deg}`}
                      cx="0"
                      cy="-38"
                      r="1.2"
                      fill="#FFF4A3"
                      transform={`rotate(${deg})`}
                    />
                  ))}
                </g>
              </svg>

              {/* 2. Fixed Inner Sacred Om Crest (Stationary - Does NOT rotate) */}
              <svg
                className="logo-crest-inner"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="innerCrestGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="65%" stopColor="#172554" />
                    <stop offset="100%" stopColor="#0B132B" />
                  </radialGradient>
                  <linearGradient id="innerGoldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="50%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#92400E" />
                  </linearGradient>
                </defs>

                {/* Central Royal Vedic Blue Disc */}
                <circle cx="50" cy="50" r="46" fill="url(#innerCrestGrad)" />
                {/* Rich Gold Rim */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="url(#innerGoldRim)" strokeWidth="3" />
                <circle cx="50" cy="50" r="39" fill="none" stroke="#FDE68A" strokeWidth="1" strokeDasharray="2.5 2.5" opacity="0.85" />

                {/* 12 Inner Sacred Lotus Petals */}
                <g transform="translate(50,50)">
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <ellipse
                      key={deg}
                      cx="0"
                      cy="-33"
                      rx="2.4"
                      ry="4.2"
                      fill="#FDE68A"
                      opacity="0.85"
                      transform={`rotate(${deg})`}
                    />
                  ))}

                  {/* Central Sacred Divine OM (Stationary, Always Upright & Luminous) */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    y="1.5"
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="33"
                    fontWeight="900"
                    fill="#FEF08A"
                    style={{ filter: 'drop-shadow(0 0 5px rgba(254, 240, 138, 0.8))' }}
                  >
                    ॐ
                  </text>
                </g>
              </svg>
            </div>
            <div className="logo-text-wrap">
              <div className="logo-name">
                North Hindi Pandit
              </div>
              <div className="logo-tagline">
                Authentic North Indian Vedic Rituals
              </div>
              <div className="logo-underline"></div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="header-nav">
            <a href="#services">Services</a>
            <a href="#why">Why Us</a>
            <a href="#team">Pandits</a>
            <a href="#how">Process</a>
            <a href="#testimonials">Reviews</a>
            <a href="#coverage">Coverage</a>
          </nav>

          {/* Right Actions: Direct Call + Mobile Menu Toggle */}
          <div className="header-actions-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

            {/* Direct Call CTA Button in Dark Capsule */}
            <a
              href="tel:+919589018011"
              className="header-call-btn"
            >
              <svg
                className="call-icon"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span className="call-btn-text">+91 95890 18011</span>
            </a>

            {/* Mobile Hamburger Menu Toggle Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Dimmed Backdrop for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <nav className="mobile-nav-drawer">
          <a href="#services" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>🔱 Popular Puja Services</span>
            <span>→</span>
          </a>
          <a href="#why" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>✨ Why Choose Us</span>
            <span>→</span>
          </a>
          <a href="#team" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>🙏 Verified Senior Pandits</span>
            <span>→</span>
          </a>
          <a href="#how" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>📜 4-Step Booking Process</span>
            <span>→</span>
          </a>
          <a href="#testimonials" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>⭐ Devotee Testimonials</span>
            <span>→</span>
          </a>
          <a href="#coverage" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
            <span>📍 Coverage Localities</span>
            <span>→</span>
          </a>
          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <a
              href="tel:+919589018011"
              style={{
                flex: 1,
                background: 'var(--crimson-royal)',
                color: 'white',
                textAlign: 'center',
                padding: '11px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              📞 Call Pandit Ji
            </a>
            <a
              href="https://wa.me/919589018011"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                background: '#25D366',
                color: 'white',
                textAlign: 'center',
                padding: '11px',
                borderRadius: '100px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              💬 WhatsApp
            </a>
          </div>
        </nav>
      )}
    </div>
  );
}
