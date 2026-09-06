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
    <>
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
          {/* Brand Crest Logo with Clockwise Rotating Emblem */}
          <a href="#hero" className="header-logo" onClick={() => setMobileMenuOpen(false)}>
            <div className="logo-crest" title="Sacred Vedic Om Crest">
              <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="crestGrad" cx="50%" cy="50%">
                    <stop offset="0%" stopColor="#1C386A" />
                    <stop offset="100%" stopColor="#0B172E" />
                  </radialGradient>
                  <linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7DC6F" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#997312" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="56" fill="url(#crestGrad)" />
                <circle cx="60" cy="60" r="53" fill="none" stroke="url(#goldRim)" strokeWidth="2.5" />
                <circle cx="60" cy="60" r="48" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="3 2" />

                {/* 12 Lotus Petals */}
                <g transform="translate(60,60)">
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                    <ellipse
                      key={deg}
                      cx="0"
                      cy="-44"
                      rx="3"
                      ry="6"
                      fill="#D4AF37"
                      opacity="0.85"
                      transform={`rotate(${deg})`}
                    />
                  ))}

                  {/* Central Sacred OM */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    y="2"
                    fontFamily="'Cormorant Garamond', serif"
                    fontSize="32"
                    fontWeight="900"
                    fill="#F7DC6F"
                    style={{ filter: 'drop-shadow(0 0 6px rgba(247, 220, 111, 0.6))' }}
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

          {/* Right Actions: Bookings Badge + Direct Call + Mobile Menu Toggle */}
          <div className="header-actions-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Subtle Bookings Pill */}
            <button
              onClick={onOpenAdmin}
              className="header-bookings-btn"
              style={{
                background: 'rgba(78, 10, 23, 0.05)',
                border: '1px solid rgba(78, 10, 23, 0.22)',
                color: 'var(--crimson-royal)',
                fontSize: '11.5px',
                fontWeight: '700',
                padding: '6px 11px',
                borderRadius: '100px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap'
              }}
              title="View Bookings Database"
            >
              <span>📋</span>
              <span className="bookings-text">Bookings</span>
              {bookingCount > 0 && (
                <span
                  style={{
                    background: 'var(--crimson-royal)',
                    color: 'white',
                    fontSize: '9.5px',
                    fontWeight: '800',
                    padding: '1px 5px',
                    borderRadius: '10px'
                  }}
                >
                  {bookingCount}
                </span>
              )}
            </button>

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
      </header>
    </>
  );
}
