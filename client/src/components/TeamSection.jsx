import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

export default function TeamSection({ onSelectPandit, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const defaultPandits = [
    {
      name: 'Pt. Deepak Shukla',
      title: 'Senior Head Acharya & Karmakand Specialist',
      origin: 'Varanasi',
      stationed: 'Gachibowli & Madhapur (Varanasi Vidwath)',
      exp: '22+ Years Exp',
      avatarColor: '#4E0A17',
      languages: ['Hindi', 'English', 'Sanskrit', 'Bhojpuri'],
      pujasConducted: '880+ Pujas',
      rating: '4.99'
    },
    {
      name: 'Pt. Amit Dwivedi',
      title: 'Vedic Hawan & Chandi Path Vidwan',
      origin: 'Uttarakhand',
      stationed: 'Kondapur & Hitec City (Uttarakhand Vidwan)',
      exp: '19+ Years Exp',
      avatarColor: '#997312',
      languages: ['Hindi', 'Sanskrit', 'Garhwali', 'English'],
      pujasConducted: '720+ Pujas',
      rating: '4.97'
    },
    {
      name: 'Pt. Sri Ram Jha',
      title: 'Maithil Purohit & Shastra Vidwan',
      origin: 'Mithila',
      stationed: 'Kukatpally & Miyapur (Mithila Purohit)',
      exp: '24+ Years Exp',
      avatarColor: '#B45309',
      languages: ['Hindi', 'Sanskrit', 'Maithili', 'Bhojpuri'],
      pujasConducted: '810+ Pujas',
      rating: '4.98'
    },
    {
      name: 'Pt. Prashant Tiwari',
      title: 'Ramcharitmanas & Vedic Anushthan Acharya',
      origin: 'Chitrakoot',
      stationed: 'Secunderabad & Bowenpally (Chitrakoot Acharya)',
      exp: '18+ Years Exp',
      avatarColor: '#C2410C',
      languages: ['Hindi', 'Sanskrit', 'Bundelkhandi', 'English'],
      pujasConducted: '650+ Pujas',
      rating: '4.96'
    },
    {
      name: 'Pt. Vikas Joshi',
      title: 'Rigvedic Acharya & Ganesh Puja Specialist',
      origin: 'Maharashtra',
      stationed: 'Jubilee Hills & Banjara Hills (Maharashtra Parampara)',
      exp: '17+ Years Exp',
      avatarColor: '#1E3A8A',
      languages: ['Marathi', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '590+ Pujas',
      rating: '4.95'
    },
    {
      name: 'Pt. Durga Prashad Sharma',
      title: 'Smartha & Vedic Acharya (North & South Vidhi)',
      origin: 'Telugu (Andhra / Telangana)',
      stationed: 'Financial District & Manikonda (Telugu / Smartha)',
      exp: '21+ Years Exp',
      avatarColor: '#047857',
      languages: ['Telugu', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '760+ Pujas',
      rating: '4.98'
    },
    {
      name: 'Pt. Hemant Mishra',
      title: 'Jagannath Parampara & Vedic Hawan Scholar',
      origin: 'Odisha',
      stationed: 'Uppal, Begumpet & LB Nagar (Odisha Scholar)',
      exp: '16+ Years Exp',
      avatarColor: '#6D28D9',
      languages: ['Odia', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '530+ Pujas',
      rating: '4.94'
    }
  ];

  const pandits = t.panditsList || defaultPandits;

  // Duplicate for seamless infinite loop on desktop
  const displayPandits = [...pandits, ...pandits];

  // ==========================================
  // DESKTOP: Continuous Slow Infinite Marquee (matching Testimonials)
  // ==========================================
  const desktopTrackRef = useRef(null);
  const desktopPosRef = useRef(0);
  const isDesktopHovered = useRef(false);
  const isDesktopTransitioningRef = useRef(false);

  // Auto-scroll turned off as requested by user; manual scroll via arrows enabled
  useEffect(() => {
    if (desktopTrackRef.current) {
      desktopTrackRef.current.style.transform = `translate3d(-${desktopPosRef.current}px, 0, 0)`;
    }
  }, []);

  const handleDesktopScroll = (direction) => {
    if (!desktopTrackRef.current) return;
    const cardStep = 344; // Card width (320px) + gap (24px)
    const halfWidth = desktopTrackRef.current.scrollWidth / 2;
    if (halfWidth <= 0) return;

    isDesktopTransitioningRef.current = true;

    if (direction === 'left') {
      desktopPosRef.current += cardStep;
      if (desktopPosRef.current >= halfWidth) {
        desktopPosRef.current -= halfWidth;
      }
    } else {
      desktopPosRef.current -= cardStep;
      if (desktopPosRef.current < 0) {
        desktopPosRef.current += halfWidth;
      }
    }

    desktopTrackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    desktopTrackRef.current.style.transform = `translate3d(-${desktopPosRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (desktopTrackRef.current) {
        desktopTrackRef.current.style.transition = 'none';
      }
      isDesktopTransitioningRef.current = false;
    }, 420);
  };

  // ==========================================
  // MOBILE: 1-Card Focus with Peeking Sides (matching Testimonials)
  // ==========================================
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const isMobilePausedRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleMobileNext = () => {
    setActiveMobileIndex((prev) => (prev + 1) % pandits.length);
  };

  const handleMobilePrev = () => {
    setActiveMobileIndex((prev) => (prev - 1 + pandits.length) % pandits.length);
  };

  // Auto-scroll on mobile turned off; manual swipe and arrow controls enabled

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    isMobilePausedRef.current = true;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDist = touchStartX.current - touchEndX.current;
    if (touchEndX.current > 0 && Math.abs(swipeDist) > 40) {
      if (swipeDist > 0) {
        handleMobileNext();
      } else {
        handleMobilePrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setTimeout(() => {
      isMobilePausedRef.current = false;
    }, 2500);
  };

  const handleBook = (name) => {
    if (onSelectPandit) {
      onSelectPandit(name);
    } else {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render individual pandit card content
  const renderPanditCard = (p) => (
    <div className="pandit-card" style={{ height: '100%', boxSizing: 'border-box' }}>
      {/* Top Verified Shield */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: '700',
            color: 'var(--emerald-auspicious)',
            background: 'var(--emerald-pale)',
            padding: '3px 10px',
            borderRadius: '100px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>✓</span> Verified Scholar
        </span>

        <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>
          ⭐ {p.rating} {p.pujasConducted ? `(${p.pujasConducted})` : ''}
        </span>
      </div>

      {/* Pandit Avatar with Tilak */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div
          style={{
            width: '74px',
            height: '74px',
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${p.avatarColor || '#4E0A17'} 0%, #1F0408 100%)`,
            border: '3px solid var(--gold)',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '26px',
            fontWeight: '700',
            boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)',
            position: 'relative'
          }}
        >
          <span>ॐ</span>
          <span
            style={{
              position: 'absolute',
              top: '-6px',
              fontSize: '12px'
            }}
          >
            🪔
          </span>
        </div>

        <h3>{p.name}</h3>
        <p className="pandit-title">{p.title}</p>
        <p className="pandit-origin">
          📍 {p.origin} • <strong>{p.exp}</strong>
        </p>
      </div>

      {/* Stationed Location & Coverage Area (Replaced Core Expertise) */}
      <div className="pandit-location-box" style={{
        minHeight: '62px',
        background: 'rgba(212, 166, 64, 0.08)',
        border: '1px solid rgba(212, 166, 64, 0.3)',
        borderRadius: '10px',
        padding: '10px 12px',
        marginBottom: '14px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', fontWeight: '800', color: '#997312', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '3px' }}>
          <span>📍</span>
          <span>{currentLang === 'hi' ? 'सेवा क्षेत्र / लोकेशन' : 'Stationed Location & Coverage'}</span>
        </div>
        <div style={{ fontSize: '12.5px', color: '#17243B', fontWeight: '700', lineHeight: '1.4' }}>
          {p.stationed || `${p.origin} • Hyderabad & Pan-India`}
        </div>
      </div>

      {/* Languages Spoken */}
      {p.languages && (
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
            Languages Spoken:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {p.languages.map((lang, lIdx) => (
              <span
                key={lIdx}
                style={{
                  fontSize: '11.5px',
                  fontWeight: '600',
                  color: 'var(--crimson-royal)',
                  background: 'white',
                  border: '1px solid var(--border-gold)',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        type="button"
        onClick={() => handleBook(p.name)}
        className="btn-service"
        style={{ width: '100%', marginTop: 'auto', padding: '10px 16px', fontSize: '13.5px', fontWeight: '600' }}
      >
        📞 {t.btnBookPandit || 'Book Pandit Ji'}
      </button>
    </div>
  );

  return (
    <section id="team" style={{ background: '#FAF7F2' }}>
      <div className="section-header center">
        <div className="section-eyebrow">{t.teamEyebrow || 'Revered Vedic Scholars'}</div>
        <h2 className="section-title">{t.teamTitle || 'Meet Our Senior Verified Acharyas & Pandits'}</h2>
        <p className="section-sub">
          {t.teamSub || 'Learned Brahmins from Kashi Vidwath Parishad, Ayodhya & Haridwar stationed across Hyderabad & Secunderabad.'}
        </p>
      </div>

      {/* ===================================================
          1. LAPTOP & DESKTOP VIEW (> 768px): Continuous Marquee Scroll
          =================================================== */}
      <div className="team-desktop-marquee-wrapper">
        {/* Left Arrow Button */}
        <button
          type="button"
          className="desktop-team-btn prev"
          onClick={() => handleDesktopScroll('left')}
          aria-label="Scroll Left"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="team-desktop-track"
          ref={desktopTrackRef}
          onMouseEnter={() => {
            isDesktopHovered.current = true;
          }}
          onMouseLeave={() => {
            isDesktopHovered.current = false;
          }}
        >
          {displayPandits.map((p, idx) => (
            <div key={`pandit-desk-${idx}`} className="team-card-slide">
              {renderPanditCard(p)}
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          className="desktop-team-btn next"
          onClick={() => handleDesktopScroll('right')}
          aria-label="Scroll Right"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ===================================================
          2. MOBILE VIEW (<= 768px): 1-Card Focus with Peeking Sides
          =================================================== */}
      <div className="team-mobile-carousel-wrapper">
        {/* Left Mobile Arrow */}
        <button
          type="button"
          className="mobile-testi-btn prev"
          onClick={handleMobilePrev}
          aria-label="Previous Pandit"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Center Card Stage with Left & Right Peeks */}
        <div
          className="team-mobile-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {pandits.map((item, idx) => {
            let diff = (idx - activeMobileIndex + pandits.length) % pandits.length;
            if (diff > pandits.length / 2) {
              diff -= pandits.length;
            }

            let cardClass = 'team-mobile-card';
            let cardStyle = {};

            if (diff === 0) {
              cardClass += ' is-active';
              cardStyle = {
                transform: 'translate3d(0, 0, 0) scale(1)',
                opacity: 1,
                zIndex: 10,
                pointerEvents: 'auto',
                boxShadow: '0 12px 32px rgba(128, 0, 32, 0.16)',
                borderColor: '#D4AF37'
              };
            } else if (diff === -1) {
              cardClass += ' is-peek-left';
              cardStyle = {
                transform: 'translate3d(-92%, 0, 0) scale(0.9)',
                opacity: 0.52,
                zIndex: 4,
                cursor: 'pointer'
              };
            } else if (diff === 1) {
              cardClass += ' is-peek-right';
              cardStyle = {
                transform: 'translate3d(92%, 0, 0) scale(0.9)',
                opacity: 0.52,
                zIndex: 4,
                cursor: 'pointer'
              };
            } else {
              cardStyle = {
                transform: `translate3d(${diff > 0 ? '180%' : '-180%'}, 0, 0) scale(0.8)`,
                opacity: 0,
                zIndex: 0,
                pointerEvents: 'none'
              };
            }

            return (
              <div
                key={`pandit-mob-${idx}`}
                className={cardClass}
                style={cardStyle}
                onClick={() => {
                  if (diff === 1) handleMobileNext();
                  if (diff === -1) handleMobilePrev();
                }}
              >
                {renderPanditCard(item)}
              </div>
            );
          })}
        </div>

        {/* Right Mobile Arrow */}
        <button
          type="button"
          className="mobile-testi-btn next"
          onClick={handleMobileNext}
          aria-label="Next Pandit"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Mobile Dot Navigation */}
      <div className="team-mobile-dots">
        {pandits.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`team-dot ${idx === activeMobileIndex ? 'active' : ''}`}
            onClick={() => setActiveMobileIndex(idx)}
            aria-label={`Go to pandit ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
