import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { translations } from '../translations';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';

const PERMANENT_REVIEWS = [
  {
    id: 'google-real-kuldev',
    name: 'Kuldev Deshwal',
    loc: 'Hyderabad',
    puja: 'Ganesh Chaturthi Mahapujan & Hawan',
    tradition: 'North Indian Vedic Vidhi',
    rating: 5,
    text: 'We had a wonderful experience with Pandit Ji during our Ganesh Chaturthi Puja. He was very knowledgeable, respectful, and conducted the entire puja with great devotion and proper rituals. He explained the significance of the different rituals patiently and made sure everything was performed correctly.\nHis calm and positive nature made the entire atmosphere feel very peaceful and spiritual. He was punctual, well-organized, and very professional throughout.\nHighly recommended for anyone looking for a knowledgeable and dedicated Pandit Ji for Ganesh Puja and other religious ceremonies. 🙏🕉️\nThank you, Pandit Ji, for making our Ganesh Chaturthi celebration so special and auspicious! 🌺🙏',
    color: '#1E3A8A',
    source: 'Google Review',
    verified: true,
    date: 'Latest Google Review',
    badge: 'Verified Devotee',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmPsJAQgnqj6LjUSh1NKuWs0gL45_sOaXHXmPKCDNTWDsTbBfDDConcCdzQgJX1FXVb2__31Y_opk4qbE6xglg4THcvcN_Xtj5rJTleg4i6gjJkefUG0VcGBhe5AGM07pUQCjz_MPzO51DpV=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-vikram',
    name: 'Vikram Sinha',
    loc: 'Hyderabad',
    puja: 'Vedic Hawan & Anushthan',
    tradition: 'Kashi Gurukul Parampara',
    rating: 5,
    text: "Panditji's knowledge and experience are excellent. He performs all the rituals of worship in a precise and systematic manner. His demeanor is extremely polite, easygoing, and respectful.\n\nThe best part is that he conducts the worship with complete devotion, faith, and pure feelings. His method of conducting the worship reflects true faith and dedication. The experience of conducting the worship with him was very positive and satisfying. 🙏",
    color: '#065F46',
    source: 'Google Review',
    verified: true,
    date: 'Latest Google Review',
    badge: 'Verified Devotee',
    photos: []
  },
  {
    id: 'google-real-sameer',
    name: 'Sameer H Shah',
    loc: 'Hyderabad (Secunderabad)',
    puja: 'Home Puja & Vastu Hawan',
    tradition: 'North Indian Parampara',
    rating: 5,
    text: 'It was a good experience as it was our first time that we had booked a Panditji online. Both Prashant and Rahul were good speaking. Rahul Panditji came on time, did all the necessary arrangements for the puja. He was very soft spoken, explained very nicely and did the puja. There was no hurry burry from him to finish the puja. We really enjoyed listening to him and the puja got done. We would like to have them again for our next puja. We from Shah family would sincerely appreciate them and thank them for their timely support in doing the puja. Thanks, Sameer H Shah',
    color: '#800020',
    source: 'Google Review',
    verified: true,
    date: 'Recent Google Review',
    badge: 'Verified Family',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmOK59f_NaExgwA2Bo_NZB5GI0bgngbMJJ7wrSISv4RjrXMbvxwkvESec7LRjGOZ2qMikaupNTy5l0D7pzW20Kfk1zg5KxoHQnKoAZXc36NDlK-QtbwJkzbogNH3rBIqnZ1eXtOJ55k09ng=w600-h450-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmMJvvfd6N12z1H7q9DCcZ3z0zIXllJApLwBB4r-h13QZqR1DlfZi2l7pCEKNLqjnzRsPFkaJUegbruASNruF6MAB3pswFdkYvHJ-KhkwWyDntQwnF9taflw9jd-UwjB7u5HzVv8g5kEGmY=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-sarla',
    name: 'Sarla Tiwari',
    loc: 'Hyderabad',
    puja: 'Grihapravesh & Vastu Shanti Puja',
    tradition: 'Vedic Grihapravesh Vidhi',
    rating: 5,
    text: "Our home's housewarming ceremony was beautifully and ritually conducted by Panditji. Panditji performed all the rituals and chanting of mantras with utmost devotion and explained the significance of each ritual simply.\nHeartfelt thanks to Panditji for making our new home's housewarming ceremony so auspicious, happy, and memorable. 🙏🏻🌸\nMay God's grace and blessings always remain with us. 🏡✨🙏🏻",
    color: '#B33939',
    source: 'Google Review',
    verified: true,
    date: 'Recent Google Review',
    badge: 'Verified Devotee',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmMhKCE_uUSfK1rTC5GddR1jkYCjHw6oDyt_EGOWEelK0fmG_2Rb7tgI120BkKevSAnU5PCKxUAPGM8C3hh8MNIjPlKNQ5LLeMZIBJwNj-QpI527T--O3ARnQuOfW3EhV38vSIIzqiCusOo=w600-h450-p-k-no',
      'https://lh3.googleusercontent.com/grass-cs/ACvplmPP36OhAJljV6iczNgwuAfufez07JlceNR-Q_TnHt-qlk5DYVQq_I_WvCmTvlWJZKkDs6NQFSukB2oUel1eYjd25xbLEwWymvm4jqlx88N8PaoRmK9Ig61WknIYxEzW44VHPdSCJTdF3yg=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-roshani',
    name: 'ROSHANI TIWARI',
    loc: 'Hyderabad',
    puja: 'Shri Krishna Janmashtami Puja',
    tradition: 'Mathura-Vrindavan Parampara',
    rating: 5,
    text: 'On the auspicious occasion of Shri Krishna Janmashtami, a puja was conducted at our home by Panditji. Panditji performed the puja with complete rituals, devotion, and in a very beautiful manner. His chanting of mantras, the method of worship, and his way of explaining it were very charming and positive.\nThank you from the bottom of my heart, Panditji, for making the puja at our home so beautiful and memorable. 🙏🏻💙\nMay the blessings of Shri Radhe Krishna always be upon you. 🌸🙏🏻',
    color: '#1E3A8A',
    source: 'Google Review',
    verified: true,
    date: 'Recent Google Review',
    badge: 'Verified Devotee',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmMNLE4I6_7zb2qvp8KITVM5HcuJSNq3KiKfERLstPUCCxfkU1vw2KBcwrD-DbNgVOr2u67uOztWIEAe9hLC07vu2Ndpl-hx1U_bjFXCDCtZJGDPcN3abscaR5di0XJm0Z6WUG6QEI6FT08=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-prashant',
    name: 'PRASHANT TIWARI',
    loc: 'Hyderabad',
    puja: 'Satyanarayan Katha & Hawan',
    tradition: 'Kashi Vedic Vidhi',
    rating: 5,
    text: 'Satyanarayan Katha is very good and Pandit ji conducted a good puja with complete devotion, sacred shlokas and pure samagri.',
    color: '#991B1B',
    source: 'Google Review',
    verified: true,
    date: 'Recent Google Review',
    badge: 'Local Guide',
    photos: [
      'https://lh3.googleusercontent.com/grass-cs/ACvplmNRBJH9fuhNBrbthkCztk9pRAqwk_xPJACBfZJ0H5-V_k5QEZzvRTWGGsqI_CLEYPat19-UtjLcaDko6VsxVoZ4udaKPDJ18x7Q9xoH01OMHrHX7bmPv5FfAkXg6H4uXSFw8FMVwAK_aEMn=w600-h450-p-k-no'
    ]
  },
  {
    id: 'google-real-amit',
    name: 'Amit Aryan',
    loc: 'Gachibowli, Hyderabad',
    puja: 'Vedic Puja Services',
    tradition: 'North Indian Parampara',
    rating: 5,
    text: 'Great puja services and very knowledgeable Pandit ji. Conducted the rituals strictly as per our customs with complete peace of mind.',
    color: '#065F46',
    source: 'Google Review',
    verified: true,
    date: 'Recent Google Review',
    badge: 'Verified Devotee',
    photos: []
  }
];

const CACHE_KEY = 'north_pandit_google_reviews_v4';

export default function Testimonials({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const [reviews, setReviews] = useState(() => {
    try {
      localStorage.removeItem('north_pandit_devotee_real_reviews'); // clear stale cache
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const permanentIds = new Set(PERMANENT_REVIEWS.map((r) => r.id));
          const newApiItems = parsed.filter((r) => !permanentIds.has(r.id));
          return [...PERMANENT_REVIEWS, ...newApiItems];
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
                  localStorage.setItem(CACHE_KEY, JSON.stringify(updated));
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

  // All verified real Google Business Profile devotee reviews
  const activeReviews = reviews;

  // Duplicate cards for desktop marquee infinite loop
  const displayReviews = [...activeReviews, ...activeReviews];

  // ==========================================
  // MOBILE: Centered 1-Card Focus with Peeking Sides
  // and Circular Infinite Next/Prev Arrow Buttons (Preserved 100%)
  // ==========================================
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [selectedReviewModal, setSelectedReviewModal] = useState(null);
  const backdropTouchMoveRef = useRef(false);

  // Bulletproof background scroll lock: stops gestures without collapsing page height or resetting scroll
  useEffect(() => {
    if (!selectedReviewModal) return;

    const savedScrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length === 1) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      // Multi-touch gestures (pinch zoom etc.) blocked while modal is open
      if (e.touches && e.touches.length > 1) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Check if the touch target is inside the modal's internal scroll container
      const scrollBody = e.target.closest('.review-modal-scroll-body');
      if (!scrollBody) {
        // Any drag on overlay backdrop, header, footer, or background -> 100% block
        if (e.cancelable) e.preventDefault();
        return;
      }

      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchCurrentY - touchStartY;
      const { scrollTop, scrollHeight, clientHeight } = scrollBody;

      // If content doesn't need scrolling, block gesture entirely
      if (scrollHeight <= clientHeight) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Top boundary: pulling down when at top -> block to prevent iOS rubber-band background scroll
      if (scrollTop <= 0 && deltaY > 0) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Bottom boundary: pushing up when at bottom -> block to prevent iOS rubber-band background scroll
      if (scrollTop + clientHeight >= scrollHeight - 1 && deltaY < 0) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      // Inside boundaries: allow smooth native scrolling inside the modal
      e.stopPropagation();
    };

    const handleWheel = (e) => {
      const scrollBody = e.target.closest('.review-modal-scroll-body');
      if (!scrollBody) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = scrollBody;
      if (scrollTop <= 0 && e.deltaY < 0) {
        if (e.cancelable) e.preventDefault();
        return;
      }
      if (scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0) {
        if (e.cancelable) e.preventDefault();
        return;
      }
    };

    // Native non-passive listeners (critical for iOS Safari and mobile Chrome)
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('wheel', handleWheel, { passive: false });

    // Add root locking classes
    document.documentElement.classList.add('review-modal-active');
    document.body.classList.add('review-modal-active');

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('wheel', handleWheel);

      // Disable smooth scroll temporarily so no auto-scroll animation can ever occur
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      document.documentElement.classList.remove('review-modal-active');
      document.body.classList.remove('review-modal-active');

      // Instant restore if position drifted, with ZERO animation
      window.scrollTo({ top: savedScrollY, left: 0, behavior: 'instant' });

      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      });
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
          onTouchStart={(e) => {
            if (e.target === e.currentTarget) {
              backdropTouchMoveRef.current = false;
            }
          }}
          onTouchMove={(e) => {
            if (e.target === e.currentTarget) {
              backdropTouchMoveRef.current = true;
            }
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // If user was attempting to drag on background, do not close modal!
              if (!backdropTouchMoveRef.current) {
                setSelectedReviewModal(null);
              }
            }
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="review-modal-card"
            onClick={(e) => e.stopPropagation()}
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
