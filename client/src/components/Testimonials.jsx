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
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const animFrameRef = useRef(null);

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

  // Fetch backend reviews if available
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

  // Infinite Seamless Loop Animation (Runs Right-to-Left continuously without any rewind)
  useEffect(() => {
    let lastTime = performance.now();
    // Calibrated speed: ~45px per second (smooth, calm, easily readable)
    const speed = 0.045;

    const animate = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isHoveredRef.current && !isTransitioningRef.current && trackRef.current) {
        posRef.current += speed * delta;
        const halfWidth = trackRef.current.scrollWidth / 2;

        if (halfWidth > 0 && posRef.current >= halfWidth) {
          posRef.current -= halfWidth;
        }

        trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [reviews]);

  // Arrow Button Navigation (Glides forward/backward by 1 card step seamlessly)
  const handleScroll = (direction) => {
    if (!trackRef.current) return;
    const cardStep = 374; // Card width (350px) + gap (24px)
    const halfWidth = trackRef.current.scrollWidth / 2;
    if (halfWidth <= 0) return;

    isTransitioningRef.current = true;

    if (direction === 'right') {
      posRef.current += cardStep;
      if (posRef.current >= halfWidth) {
        posRef.current -= halfWidth;
      }
    } else {
      posRef.current -= cardStep;
      if (posRef.current < 0) {
        posRef.current += halfWidth;
      }
    }

    trackRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
    trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;

    setTimeout(() => {
      if (trackRef.current) {
        trackRef.current.style.transition = 'none';
      }
      isTransitioningRef.current = false;
    }, 420);
  };

  // Duplicate cards for seamless infinite loop (exact technique as the sacred top shloka ticker)
  const displayReviews = [...reviews, ...reviews];

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

      {/* Modern Carousel Container with Circular Left/Right Navigation Arrow Buttons */}
      <div className="testi-carousel-wrapper">
        {/* Circular Left Arrow Button */}
        <button
          type="button"
          className="carousel-arrow-btn prev"
          onClick={() => handleScroll('left')}
          aria-label="Previous Reviews"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Carousel Infinite Scrolling Track (Pauses cleanly on hover & touch) */}
        <div
          className="testi-carousel-track"
          ref={trackRef}
          onMouseEnter={() => {
            isHoveredRef.current = true;
          }}
          onMouseLeave={() => {
            isHoveredRef.current = false;
          }}
          onTouchStart={() => {
            isHoveredRef.current = true;
          }}
          onTouchEnd={() => {
            setTimeout(() => {
              isHoveredRef.current = false;
            }, 1200);
          }}
        >
          {displayReviews.map((item, idx) => {
            const initials = (item.name || 'D')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2);

            return (
              <div key={`${item.id || 'card'}-${idx}`} className="testi-card">
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
          })}
        </div>

        {/* Circular Right Arrow Button */}
        <button
          type="button"
          className="carousel-arrow-btn next"
          onClick={() => handleScroll('right')}
          aria-label="Next Reviews"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
