import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';

const PERMANENT_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Priya & Alok Sharma',
    loc: 'Gachibowli, Hyderabad',
    puja: 'Grihapravesh & Vastu Hawan',
    tradition: 'UP / Mathura Parampara',
    rating: 5,
    text: 'Pandit Ji performed our Grihapravesh with immense devotion. Every shloka and vidhi was explained clearly in Hindi. Our new flat feels filled with positive divine vibrations!',
    color: '#4E0A17',
    source: 'Google Review'
  },
  {
    id: 'rev-2',
    name: 'Rajesh & Sunita Kumar',
    loc: 'Hitec City, Hyderabad',
    puja: 'Satyanarayan Katha',
    tradition: 'Bihari Kul-Vidhi',
    rating: 5,
    text: 'Outstanding experience. Pandit Ji brought 100% pure cow ghee and fresh samagri. The katha and prasad vidhi was conducted without any rush. Highly recommended to all North Indian families!',
    color: '#997312',
    source: 'Google Review'
  },
  {
    id: 'rev-3',
    name: 'Anita & Manish Verma',
    loc: 'Kondapur, Hyderabad',
    puja: 'Maha Rudrabhishek',
    tradition: 'Kashi Vidhi',
    rating: 5,
    text: 'We were deeply touched by Pandit Ji’s mastery of Rudri path. The Shiva abhishek was performed with sacred precision. Our home was enveloped in immense peace.',
    color: '#C25100',
    source: 'Google Review'
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
    source: 'Google Review'
  },
  {
    id: 'rev-5',
    name: 'Meena & Ashish Agarwal',
    loc: 'Jubilee Hills, Hyderabad',
    puja: 'Diwali Maha Lakshmi Puja',
    tradition: 'Rajasthani Parampara',
    rating: 5,
    text: 'The pandit was an authentic Vedic scholar from Varanasi. He conducted the Shree Suktam path with complete devotion and explained each step patiently.',
    color: '#3A0711',
    source: 'Google Review'
  },
  {
    id: 'rev-6',
    name: 'Vivek & Pooja Tiwari',
    loc: 'Kukatpally, Hyderabad',
    puja: 'Marriage / Vivah Sanskar',
    tradition: 'Awadhi Vivah Vidhi',
    rating: 5,
    text: 'Our wedding rituals were handled with supreme grace. Traditional North Indian rites like saptapadi and kanyadaan were performed according to our ancestors’ kul-parampara.',
    color: '#731224',
    source: 'Google Review'
  },
  {
    id: 'rev-7',
    name: 'Deepa & Sanjay Singh',
    loc: 'Banjara Hills, Hyderabad',
    puja: 'Navagraha Shanti Homa',
    tradition: 'Purvanchal Vidhi',
    rating: 5,
    text: 'Very satisfied with the transparency and punctual arrival. Pandit Ji brought pure Desi ghee and genuine herbs for the hawan. Truly divine experience for our family.',
    color: '#107C41',
    source: 'Google Review'
  },
  {
    id: 'rev-8',
    name: 'Amit & Neha Mishra',
    loc: 'Miyapur, Hyderabad',
    puja: 'Namkaran Sanskar',
    tradition: 'Vedic Nakshatra Vidhi',
    rating: 5,
    text: 'Pandit Ji checked our baby’s nakshatra accurately and conducted the naming ceremony with sacred chants. Very humble, respectful, and reasonable dakshina.',
    color: '#8C192E',
    source: 'Google Review'
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

  // Fetch backend reviews if any
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
              return [...newItems, ...prev];
            });
          }
        }
      } catch {}
    }
    loadServerReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  // ==========================================
  // DESKTOP / LAPTOP: Continuous Infinite Marquee
  // (Right to Left without rewind, no arrow buttons)
  // ==========================================
  const desktopTrackRef = useRef(null);
  const desktopPosRef = useRef(0);
  const isDesktopHovered = useRef(false);

  useEffect(() => {
    let animId;
    let lastTime = performance.now();
    const speed = 0.045; // ~45px per second

    const animateDesktop = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (window.innerWidth > 768 && !isDesktopHovered.current && desktopTrackRef.current) {
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

  // Duplicate cards for desktop marquee infinite loop
  const displayReviews = [...reviews, ...reviews];

  // ==========================================
  // MOBILE: Centered 1-Card Focus with Peeking Sides
  // and Circular Infinite Next/Prev Arrow Buttons
  // ==========================================
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const isMobilePausedRef = useRef(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleMobileNext = () => {
    setActiveMobileIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleMobilePrev = () => {
    setActiveMobileIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Mobile Auto-advance every 5 seconds (pauses on touch/interaction)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMobilePausedRef.current && window.innerWidth <= 768) {
        setActiveMobileIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews.length]);

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

  // Shared Card Body Content
  const renderCardContent = (item) => {
    const initials = (item.name || 'D')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2);

    return (
      <div className="testi-card-inner">
        <div className="testi-header">
          <div className="testi-avatar" style={{ background: item.color || '#800020' }}>
            {initials}
          </div>
          <div>
            <div className="testi-name">{item.name}</div>
            <div className="testi-loc">📍 {item.loc}</div>
          </div>
        </div>

        <div className="testi-rating-row">
          <div className="stars">{'★'.repeat(item.rating || 5)}</div>
          <span className="google-verified-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#34A853" style={{ flexShrink: 0 }}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            <span>Google Verified</span>
          </span>
        </div>

        <div className="testi-text">"{item.text}"</div>

        <div className="testi-footer-row">
          <span className="testi-puja">{item.puja}</span>
          <span className="testi-tradition-text">{item.tradition}</span>
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
          Continuous slow infinite marquee ticker (No buttons)
          =================================================== */}
      <div className="testi-desktop-marquee-wrapper">
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
          {reviews.map((item, idx) => {
            // Circular relative distance calculation (-4 to +4)
            let diff = (idx - activeMobileIndex + reviews.length) % reviews.length;
            if (diff > reviews.length / 2) {
              diff -= reviews.length;
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
        {reviews.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={`testi-dot ${idx === activeMobileIndex ? 'active' : ''}`}
            onClick={() => setActiveMobileIndex(idx)}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
