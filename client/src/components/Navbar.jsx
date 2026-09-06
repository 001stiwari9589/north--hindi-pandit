import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBooking, onOpenAdmin, bookingCount = 0 }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
          height: '54px',
          background: scrolled ? 'rgba(255, 253, 248, 0.98)' : 'rgba(255, 253, 248, 0.95)',
          padding: '0 5%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-gold)',
          boxShadow: '0 2px 14px rgba(42, 4, 12, 0.06)'
        }}
      >
        {/* Brand Crest Logo */}
        <a href="#hero" className="header-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="logo-crest">
            <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '38px', height: '38px' }}>
              <defs>
                <radialGradient id="crestGrad" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#4E0A17" />
                  <stop offset="100%" stopColor="#2A040C" />
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
          <div className="logo-text-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="logo-name" style={{ fontFamily: "var(--font-serif)", fontSize: '18px', fontWeight: '700', color: 'var(--crimson-royal)', lineHeight: '1.1' }}>
              North Hindi Pandit
            </div>
            <div className="logo-tagline" style={{ fontSize: '8.5px', fontWeight: '600', color: 'var(--gold-dark)', letterSpacing: '1.2px', textTransform: 'uppercase' }}>
              Authentic North Indian Vedic Rituals
            </div>
            <div className="logo-underline" style={{ height: '1.5px', background: 'linear-gradient(90deg, var(--gold), transparent)', marginTop: '1px' }}></div>
          </div>
        </a>

        {/* Navigation Links (shifted towards right) */}
        <nav className="header-nav" style={{ marginLeft: 'auto', marginRight: '28px' }}>
          <a href="#services">Services</a>
          <a href="#why">Why Us</a>
          <a href="#how">Process</a>
          <a href="#testimonials">Reviews</a>
          <a href="#coverage">Coverage</a>
        </nav>

        {/* Clean Right Actions: Bookings Badge + Direct Call */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Subtle Bookings Pill */}
          <button
            onClick={onOpenAdmin}
            style={{
              background: 'rgba(78, 10, 23, 0.05)',
              border: '1px solid rgba(78, 10, 23, 0.22)',
              color: 'var(--crimson-royal)',
              fontSize: '11.5px',
              fontWeight: '700',
              padding: '6px 12px',
              borderRadius: '100px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.2s'
            }}
            title="View Bookings Database"
          >
            <span>📋</span>
            <span>Bookings</span>
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

          {/* Direct Call CTA Button in Dark Maroon Capsule */}
          <a
            href="tel:+919589018011"
            className="header-call-btn"
            style={{
              padding: '8px 18px',
              fontSize: '13px'
            }}
          >
            <svg
              className="call-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span>+91 95890 18011</span>
          </a>
        </div>
      </header>
    </>
  );
}
