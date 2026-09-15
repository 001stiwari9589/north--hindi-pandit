import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { translations } from '../translations';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';

const PERMANENT_REVIEWS = [
  {
    id: 'google-real-1',
    name: 'Sameer H Shah',
    loc: 'Hyderabad (Secunderabad)',
    puja: 'Home Puja & Vastu Hawan',
    tradition: 'North Indian Parampara',
    rating: 5,
    text: 'It was a good experience as it was our first time that we had booked a Panditji online. Both Prashant and Rahul were good speaking. Rahul Panditji came on time, did all the necessary arrangements for the puja. He was very soft spoken, explained very nicely and did the puja. There was no hurry burry from him to finish the puja. We really enjoyed listening to him and the puja got done. We would like to have them again for our next puja. We from Shah family would sincerely appreciate them and thank them for their timely support in doing the puja. Thanks, Sameer H Shah',
    color: '#1E3A8A',
    source: 'Google Review',
    verified: true,
    badge: 'Verified Family',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmPucROBYYBItz5p_u3t3Flp6-QhuZB_rvMV8hbZIH-oqI1qlShY3SxLioACzvYgEg38r0d6TQlxXPNslBPZDFIH7XAXyqJmSbpWWpEqC5BYWLmaPWfsLL-hWdmykQBvpvyWIqeUgFBQ2h8=w600-h450-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmNKuTXhOmDo_dhkNStrlz5lqGF6G21fJJERJUp5zvSgUtkc8HgvAoyp1iEZ7S86jcJwU7aCYnCD7Dsc4pCIxL2rTQ6aydhRpe2kPvgJhEx3ZwPi31wNrktnPxrZyzBss32x1JtfpQoFeW0=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-2',
    name: 'PRASHANT TIWARI',
    loc: 'Hyderabad',
    puja: 'Satyanarayan Katha & Hawan',
    tradition: 'Kashi Vedic Vidhi',
    rating: 5,
    text: 'Satyanarayan Katha is very good and Pandit ji conducted a good puja with complete devotion, sacred shlokas and pure samagri.',
    color: '#991B1B',
    source: 'Google Review',
    verified: true,
    badge: 'Local Guide',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmPthPBK5wNf6xL0s6EVWtFA7sAwp2KGgfohTBSGmv1Vsa98WZv_TYKpY6aJr-idR7ABzp0qmJPj5mlH7cxwzPNCAuXeDQtRcAW_SIljUdF991bGiCibOBEEhOe0H4PzWoKl7P8QAOKinHKy=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-3',
    name: 'Amit Aryan',
    loc: 'Gachibowli, Hyderabad',
    puja: 'Vedic Puja Services',
    tradition: 'North Indian Parampara',
    rating: 5,
    text: 'Great puja services and very knowledgeable Pandit ji. Conducted the rituals strictly as per our customs with complete peace of mind.',
    color: '#065F46',
    source: 'Google Review',
    verified: true,
    badge: 'Verified Devotee'
  },
  {
    id: 'google-real-4',
    name: 'Satyam Tiwari',
    loc: 'Hyderabad',
    puja: 'Vedic Hawan & Consultation',
    tradition: 'Varanasi Gurukul Vidhi',
    rating: 5,
    text: '100% authentic North Indian Pandit in Hyderabad. Pure Vedic pronunciation of mantras, timely arrival, and complete transparent arrangements.',
    color: '#800020',
    source: 'Google Review',
    verified: true,
    badge: 'Verified Devotee'
  },
  {
    id: 'rev-1',
    name: 'Priya & Alok Sharma',
    loc: 'Gachibowli, Hyderabad',
    puja: 'Grihapravesh & Vastu Hawan',
    tradition: 'UP / Mathura Parampara',
    rating: 5,
    text: 'Pandit Ji performed our Grihapravesh with immense devotion. Every shloka and vidhi was explained clearly in Hindi. Our new flat feels filled with positive divine vibrations!',
    color: '#4E0A17',
    source: 'Google Review',
    verified: true
  },
  {
    id: 'rev-4',
    name: 'Suresh & Ritu Gupta',
    loc: 'Madhapur, Hyderabad',
    puja: 'Office Opening & Ganesh Hawan',
    tradition: 'Corporate Vedic Vidhi',
    rating: 5,
    text: 'Booked for our new IT tech firm inauguration. The Ganesh archana and hawan were done flawlessly. All colleagues were appreciative of the positive energy. Truly professional!',
    color: '#107C41',
    source: 'Google Review',
    verified: true
  }
];

export default function Testimonials({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('north_pandit_devotee_real_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const savedIds = new Set(parsed.map((r) => r.id));
          const rest = PERMANENT_REVIEWS.filter((r) => !savedIds.has(r.id));
          return [...parsed, ...rest];
        }
      }
    } catch {}
    return PERMANENT_REVIEWS;
  });

  // Live Auto-Sync: Fetch backend and Google reviews dynamically so daily reviews auto-appear
  useEffect(() => {
    let isMounted = true;

    async function loadServerReviews() {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const serverReviews = await res.json();
          if (isMounted && Array.isArray(serverReviews) && serverReviews.length > 0) {
            setReviews((prev) => {
              const existingIds = new Set(prev.map((r) => r.id));
              const newItems = serverReviews.filter((r) => !existingIds.has(r.id));
              if (newItems.length > 0) {
                const updated = [...newItems, ...prev];
                try {
                  localStorage.setItem('north_pandit_devotee_real_reviews', JSON.stringify(updated));
                } catch {}
                return updated;
              }
              return prev;
            });
          }
        }
      } catch {}
    }

    loadServerReviews();

    // Auto-poll every 30 seconds for any new daily reviews
    const pollInterval = setInterval(loadServerReviews, 30000);

    // Refresh when user returns to tab
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadServerReviews();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // ==========================================
  // DESKTOP / LAPTOP: Continuous Slow Infinite Marquee
  // (Left button scrolls LEFT, Right button scrolls RIGHT)
  // ==========================================
  const desktopTrackRef = useRef(null);
  const desktopPosRef = useRef(0);
  const isDesktopHovered = useRef(false);
  const isDesktopTransitioningRef = useRef(false);

  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    // Calibrated slower speed as requested ("speed halka sa kam kar do")
    const speed = 0.026; // Peaceful, readable ~26px per second

    const animateDesktop = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (
        window.innerWidth > 768 &&
        !isDesktopHovered.current &&
        !isDesktopTransitioningRef.current &&
        desktopTrackRef.current
      ) {
        desktopPosRef.current += speed * delta;
        const halfWidth = desktopTrackRef.current.scrollWidth / 2;
        if (halfWidth > 0 && desktopPosRef.current >= halfWidth) {
          desktopPosRef.current -= halfWidth;
        }
        desktopTrackRef.current.style.transform = `translate3d(-${desktopPosRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(animateDesktop);
    };

    animId = requestAnimationFrame(animateDesktop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reviews]);

  // Desktop Scroll Handlers:
  // Left button -> scrolls cards to the LEFT
  // Right button -> scrolls cards to the RIGHT
  const handleDesktopScroll = (direction) => {
    if (!desktopTrackRef.current) return;
    const cardStep = 374; // Card width (350px) + gap (24px)
    const halfWidth = desktopTrackRef.current.scrollWidth / 2;
    if (halfWidth <= 0) return;

    isDesktopTransitioningRef.current = true;

    if (direction === 'left') {
      // Scroll LEFT: offset increases so cards translate left
      desktopPosRef.current += cardStep;
      if (desktopPosRef.current >= halfWidth) {
        desktopPosRef.current -= halfWidth;
      }
    } else {
      // Scroll RIGHT: offset decreases so cards translate right
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

  // Maximum cards to display: only 5 to 6 latest cards
  // "esme 5 se 6 hi card roj dikho jo hi new reviwe mile"
  const MAX_CARDS = 6;
  const activeReviews = reviews.slice(0, MAX_CARDS);

  // Duplicate cards for desktop marquee infinite loop
  const displayReviews = [...activeReviews, ...activeReviews];

  // ==========================================
  // MOBILE: Centered 1-Card Focus with Peeking Sides
  // and Circular Infinite Next/Prev Arrow Buttons (Preserved 100%)
  // ==========================================
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);

  // Lock body scroll strictly when modal is open so background never scrolls (iOS & Android)
  useEffect(() => {
    if (!selectedReviewModal) return;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const originalStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      document.body.style.overflow = originalStyles.overflow;
      document.body.style.position = originalStyles.position;
      document.body.style.top = originalStyles.top;
      document.body.style.width = originalStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [selectedReviewModal]);
  const isMobilePausedRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleMobileNext = () => {
    setActiveMobileIndex((prev) => (prev + 1) % activeReviews.length);
  };

  const handleMobilePrev = () => {
    setActiveMobileIndex((prev) => (prev - 1 + activeReviews.length) % activeReviews.length);
  };

  // Mobile Auto-advance every 5 seconds (pauses on touch/interaction)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobilePausedRef.current && window.innerWidth <= 768) {
        setActiveMobileIndex((prev) => (prev + 1) % activeReviews.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeReviews.length]);

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
        handleMobileNext(); // Swiped left -> next card
      } else {
        handleMobilePrev(); // Swiped right -> prev card
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    setTimeout(() => {
      isMobilePausedRef.current = false;
    }, 2500);
  };

  // Shared Card Body Content - Uniform Compact Design with Read More
  const renderCardContent = (item) => {
    const initials = (item.name || 'D')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2);

    const isLong = item.text && item.text.length > 95;
    const displayText = isLong ? item.text.slice(0, 90) + '...' : item.text;

    return (
      <div className="testi-card-inner">
        <div className="testi-card-top">
          <div className="testi-header">
            <div className="testi-avatar" style={{ background: item.color || '#800020' }}>
              {initials}
            </div>
            <div className="testi-user-info">
              <div className="testi-name">{item.name}</div>
              <div className="testi-loc">📍 {item.loc}</div>
            </div>
          </div>

          <div className="testi-rating-row">
            <div className="stars">{'★'.repeat(item.rating || 5)}</div>
            <div className="testi-badges-wrap">
              <span className="google-verified-badge" title="Google Verified Review">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="#34A853" style={{ flexShrink: 0 }}>
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Google Verified</span>
              </span>
              {item.photos && item.photos.length > 0 ? (
                <button
                  type="button"
                  className="testi-compact-photo-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedReviewModal(item);
                  }}
                  title="View verified puja photos"
                >
                  📸 {item.photos.length} Photo{item.photos.length > 1 ? 's' : ''}
                </button>
              ) : item.badge ? (
                <span className="testi-guide-badge">
                  {item.badge}
                </span>
              ) : null}
            </div>
          </div>

          <div className="testi-text">
            "{displayText}"{' '}
            {isLong && (
              <button
                type="button"
                className="testi-read-more-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedReviewModal(item);
                }}
                aria-label="Read full review"
              >
                {currentLang === 'hi' ? '...और पढ़ें' : '...Read More'}
              </button>
            )}
          </div>
        </div>

        <div className="testi-footer-row">
          <span className="testi-puja" title={item.puja}>{item.puja}</span>
          <span className="testi-tradition-text" title={item.tradition}>{item.tradition}</span>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" aria-label="Devotee Testimonials">
      <div className="section-header center">
        <div className="section-eyebrow">{t.reviewsEyebrow || 'Devotee Experiences'}</div>
        <h2 className="section-title">{t.reviewsTitle || '15,000+ North Indian Families Blessed'}</h2>
        <p className="section-sub">
          {t.reviewsSub || 'Real experiences from devotees celebrating sacred milestones with our certified Vedic scholars.'}
        </p>

        {/* Official Google Reviews Badge & CTA */}
        <div className="google-rating-bar">
          <div className="google-rating-pill">
            <svg className="google-logo-svg" width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.97 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
            </svg>
            <span className="google-score">5.0</span>
            <span className="google-stars">★★★★★</span>
            <span className="google-label">Google Reviews</span>
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="google-write-review-btn"
            title="Write a Review on Google"
          >
            <span>⭐ Review Us on Google</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>

      {/* ===================================================
          1. LAPTOP & DESKTOP VIEW (Screens > 768px):
          Continuous slow infinite marquee with direction-accurate buttons
          Left button scrolls LEFT, Right button scrolls RIGHT
          =================================================== */}
      <div className="testi-desktop-marquee-wrapper">
        {/* Left Controller Button (Scrolls Left) */}
        <button
          type="button"
          className="desktop-testi-btn prev"
          onClick={() => handleDesktopScroll('left')}
          aria-label="Scroll Left"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="testi-desktop-track"
          ref={desktopTrackRef}
          onMouseEnter={() => {
            isDesktopHovered.current = true;
          }}
          onMouseLeave={() => {
            isDesktopHovered.current = false;
          }}
        >
          {displayReviews.map((item, idx) => (
            <div key={`desk-${item.id}-${idx}`} className="testi-card">
              {renderCardContent(item)}
            </div>
          ))}
        </div>

        {/* Right Controller Button (Scrolls Right) */}
        <button
          type="button"
          className="desktop-testi-btn next"
          onClick={() => handleDesktopScroll('right')}
          aria-label="Scroll Right"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* ===================================================
          2. MOBILE VIEW (Screens <= 768px):
          1 Card in Center, Adjacent Peeking Left/Right Cards,
          and Circular Endless Controller Arrow Buttons
          =================================================== */}
      <div className="testi-mobile-carousel-wrapper">
        {/* Left Controller Button */}
        <button
          type="button"
          className="mobile-testi-btn prev"
          onClick={handleMobilePrev}
          aria-label="Previous Review"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Center Card Stage with Left & Right Peeks */}
        <div
          className="testi-mobile-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {activeReviews.map((item, idx) => {
            // Circular relative distance calculation (-3 to +3)
            let diff = (idx - activeMobileIndex + activeReviews.length) % activeReviews.length;
            if (diff > activeReviews.length / 2) {
              diff -= activeReviews.length;
            }

            let cardClass = 'testi-mobile-card';
            let cardStyle = {};

            if (diff === 0) {
              // Exact 1 Active Center Card
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
              // Peek on Left (aadha left mein rahe)
              cardClass += ' is-peek-left';
              cardStyle = {
                transform: 'translate3d(-92%, 0, 0) scale(0.9)',
                opacity: 0.52,
                zIndex: 4,
                cursor: 'pointer'
              };
            } else if (diff === 1) {
              // Peek on Right (aadha right mein rahe)
              cardClass += ' is-peek-right';
              cardStyle = {
                transform: 'translate3d(92%, 0, 0) scale(0.9)',
                opacity: 0.52,
                zIndex: 4,
                cursor: 'pointer'
              };
            } else {
              // Hidden off-stage (ready to slide in when cycled)
              cardStyle = {
                transform: `translate3d(${diff > 0 ? '180%' : '-180%'}, 0, 0) scale(0.8)`,
                opacity: 0,
                zIndex: 0,
                pointerEvents: 'none'
              };
            }

            return (
              <div
                key={`mob-${item.id}`}
                className={cardClass}
                style={cardStyle}
                onClick={() => {
                  if (diff === 1) handleMobileNext();
                  if (diff === -1) handleMobilePrev();
                }}
              >
                {renderCardContent(item)}
              </div>
            );
          })}
        </div>

        {/* Right Controller Button */}
        <button
          type="button"
          className="mobile-testi-btn next"
          onClick={handleMobileNext}
          aria-label="Next Review"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Mobile Dot Navigation */}
      <div className="testi-mobile-dots">
        {activeReviews.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`testi-dot ${idx === activeMobileIndex ? 'active' : ''}`}
            onClick={() => setActiveMobileIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>

      {/* Devotee Review Details Popup Modal (Rendered at Body Level via Portal to Prevent Any Stacking/Clipping) */}
      {selectedReviewModal && typeof document !== 'undefined' && createPortal(
        <div
          className="review-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedReviewModal(null);
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="review-modal-card"
            onClick={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {/* Pinned Header with User Info & Cross (✕) Close Button */}
            <div className="review-modal-header-row">
              <div className="review-modal-user">
                <div
                  className="testi-avatar"
                  style={{
                    background: selectedReviewModal.color || '#800020',
                    width: 44,
                    height: 44,
                    fontSize: 16
                  }}
                >
                  {(selectedReviewModal.name || 'D')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div className="review-modal-user-info">
                  <h3 className="review-modal-name">
                    {selectedReviewModal.name}
                  </h3>
                  <div className="review-modal-loc">
                    📍 {selectedReviewModal.loc}
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="review-modal-close"
                onClick={() => setSelectedReviewModal(null)}
                aria-label="Close review details"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body: Stars, Review Text, Verified Photos */}
            <div className="review-modal-scroll-body">
              <div className="review-modal-rating-row">
                <div className="stars" style={{ fontSize: 15 }}>
                  {'★'.repeat(selectedReviewModal.rating || 5)}
                </div>
                <div className="testi-badges-wrap">
                  <span className="google-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#34A853" style={{ flexShrink: 0 }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                    <span>Google Verified</span>
                  </span>
                  {selectedReviewModal.badge && (
                    <span className="testi-guide-badge">{selectedReviewModal.badge}</span>
                  )}
                </div>
              </div>

              <div className="review-modal-body">
                "{selectedReviewModal.text}"
              </div>

              {selectedReviewModal.photos && selectedReviewModal.photos.length > 0 && (
                <div className="review-modal-photos-section">
                  <div className="review-modal-photos-title">
                    📸 Verified Ceremony Photos ({selectedReviewModal.photos.length}):
                  </div>
                  <div className="review-modal-photos-grid">
                    {selectedReviewModal.photos.map((img, idx) => (
                      <a
                        key={idx}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Click to view full photo"
                      >
                        <img
                          src={img}
                          alt={`Puja ceremony photo ${idx + 1}`}
                          className="review-modal-photo-img"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pinned Footer with Puja Details & Google Reviews Link */}
            <div className="review-modal-footer">
              <span className="testi-puja">{selectedReviewModal.puja}</span>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="google-modal-cta"
              >
                View on Google Reviews ↗
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
