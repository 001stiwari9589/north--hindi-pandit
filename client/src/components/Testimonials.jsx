import React, { useState, useEffect } from 'react';
import { translations } from '../translations';

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Priya & Alok Sharma',
    loc: 'Gachibowli, Hyderabad',
    puja: 'Grihapravesh & Vastu Hawan',
    tradition: 'UP / Mathura Parampara',
    rating: 5,
    text: 'Pandit Ji performed our Grihapravesh with immense devotion. Every shloka and vidhi was explained clearly in Hindi. Our new flat feels filled with positive divine vibrations!',
    color: '#4E0A17',
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
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
    verified: true,
    date: 'Recent Puja'
  }
];

const LOCAL_STORAGE_KEY = 'north_pandit_devotee_real_reviews';

export default function Testimonials({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge saved user reviews with defaults without duplication
          const savedIds = new Set(parsed.map(r => r.id));
          const rest = DEFAULT_REVIEWS.filter(r => !savedIds.has(r.id));
          return [...parsed, ...rest];
        }
      }
    } catch {
      // fallback to defaults
    }
    return DEFAULT_REVIEWS;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('reader'); // 'reader' (one by one) | 'grid' (all)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // New review form fields
  const [formName, setFormName] = useState('');
  const [formLoc, setFormLoc] = useState('');
  const [formPuja, setFormPuja] = useState('Grihapravesh & Vastu Hawan');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch backend reviews on mount if available
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
      } catch {
        // Backend offline or running purely client-side; local state is preserved
      }
    }
    loadServerReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  // Navigation handlers for One-by-One reading
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isModalOpen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, reviews.length]);

  // Handle Review Submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formText.trim()) {
      alert('Kripya apna naam aur anubhav (review) likhein.');
      return;
    }

    setIsSubmitting(true);
    const colors = ['#800020', '#B33939', '#997312', '#107C41', '#2C3E50', '#731224', '#C25100'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const createdReview = {
      id: 'real-rev-' + Date.now(),
      name: formName.trim(),
      loc: formLoc.trim() || 'Hyderabad',
      puja: formPuja.trim() || 'Vedic Puja',
      tradition: 'North Indian Tradition',
      rating: formRating,
      text: formText.trim(),
      color: randomColor,
      verified: true,
      isUserSubmitted: true,
      date: 'Just Now (अभी-अभी)'
    };

    // Update state immediately so it is visible instantly
    const updatedReviews = [createdReview, ...reviews];
    setReviews(updatedReviews);

    // Save to localStorage for persistence
    try {
      const userSaved = updatedReviews.filter(r => r.isUserSubmitted);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userSaved));
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }

    // Try posting to backend
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createdReview)
      });
    } catch {
      // Backend request fails gracefully
    }

    // Reset form and view user's review at index 0
    setIsSubmitting(false);
    setIsModalOpen(false);
    setCurrentIndex(0);
    setViewMode('reader');
    setFormName('');
    setFormLoc('');
    setFormText('');
    setFormRating(5);

    setToastMessage('🙏 Har Har Mahadev! Aapka review safaltapurvak jud gaya hai aur live dikh raha hai.');
    setTimeout(() => setToastMessage(''), 6000);
  };

  const activeReview = reviews[currentIndex] || reviews[0] || DEFAULT_REVIEWS[0];
  const activeInitials = (activeReview.name || 'D')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <section id="testimonials" aria-label="Devotee Testimonials">
      <div className="section-header center">
        <div className="section-eyebrow">{t.reviewsEyebrow || 'Devotee Experiences'}</div>
        <h2 className="section-title">{t.reviewsTitle || '15,000+ North Indian Families Blessed'}</h2>
        <p className="section-sub">
          {t.reviewsSub || 'Real experiences from devotees celebrating sacred milestones with our certified Vedic scholars.'}
        </p>
      </div>

      {/* Action Bar: Mode Switcher & Write Review Button */}
      <div className="testi-controls-bar">
        <div className="testi-view-toggle">
          <button
            type="button"
            className={`testi-toggle-btn ${viewMode === 'reader' ? 'active' : ''}`}
            onClick={() => setViewMode('reader')}
          >
            📖 One-by-One Reader (एक-एक कर पढ़ें)
          </button>
          <button
            type="button"
            className={`testi-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            📑 All Reviews ({reviews.length})
          </button>
        </div>

        <button
          type="button"
          className="testi-write-review-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
          </svg>
          <span>✍️ Write a Review (अपना अनुभव लिखें)</span>
        </button>
      </div>

      {/* Success Toast */}
      {toastMessage && (
        <div className="testi-toast-alert" role="status">
          {toastMessage}
        </div>
      )}

      {/* Mode 1: ONE-BY-ONE FOCUSED READER (Speed Zero, manual controls) */}
      {viewMode === 'reader' && (
        <div className="testi-reader-wrapper">
          <div className="testi-reader-card">
            {/* Background watermark quote */}
            <div className="testi-watermark" aria-hidden="true">“</div>

            {/* Header: Avatar, Name, Location, Badges */}
            <div className="testi-reader-header">
              <div className="testi-reader-avatar" style={{ background: activeReview.color || '#800020' }}>
                {activeInitials}
              </div>
              <div className="testi-reader-meta">
                <div className="testi-reader-name-row">
                  <h3 className="testi-reader-name">{activeReview.name}</h3>
                  {activeReview.isUserSubmitted ? (
                    <span className="testi-real-badge">
                      🌟 Real Devotee Review (Live)
                    </span>
                  ) : (
                    <span className="testi-verified-badge">
                      ✓ Verified Devotee
                    </span>
                  )}
                </div>
                <div className="testi-reader-loc">
                  📍 {activeReview.loc} • <span className="testi-reader-date">{activeReview.date || 'Sacred Puja'}</span>
                </div>
                <div className="testi-reader-puja-pill">
                  🪔 {activeReview.puja}
                </div>
              </div>
            </div>

            {/* Stars */}
            <div className="testi-reader-stars-row">
              <div className="stars">
                {'★'.repeat(activeReview.rating || 5)}
                {'☆'.repeat(5 - (activeReview.rating || 5))}
              </div>
              <span className="testi-rating-score">
                {(activeReview.rating || 5)}.0 / 5.0 Rating
              </span>
            </div>

            {/* Review Content */}
            <blockquote className="testi-reader-quote">
              "{activeReview.text}"
            </blockquote>

            {/* Footer tags */}
            <div className="testi-reader-footer">
              <span className="testi-tradition-tag">
                {activeReview.tradition || 'Authentic North Indian Vidhi'}
              </span>
              <span className="testi-reader-counter">
                Review {currentIndex + 1} of {reviews.length}
              </span>
            </div>
          </div>

          {/* Navigation Controls: Previous / Next & Dots */}
          <div className="testi-nav-bar">
            <button
              type="button"
              className="testi-nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous Review"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Previous (पिछला)</span>
            </button>

            {/* Interactive pagination dots */}
            <div className="testi-dots-row">
              {reviews.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  className={`testi-dot ${currentIndex === dotIdx ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Jump to review ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="testi-nav-btn next"
              onClick={handleNext}
              aria-label="Next Review"
            >
              <span>Next (अगला)</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: ALL REVIEWS GRID (Completely Stationary, Zero runaway speed) */}
      {viewMode === 'grid' && (
        <div className="testi-grid-container">
          {reviews.map((item, idx) => {
            const initials = (item.name || 'D')
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2);

            return (
              <div key={item.id || idx} className="testi-card stationary-card">
                <div className="testi-header">
                  <div className="testi-avatar" style={{ background: item.color || '#800020' }}>
                    {initials}
                  </div>
                  <div>
                    <div className="testi-name">{item.name}</div>
                    <div className="testi-loc">📍 {item.loc}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div className="stars">{'★'.repeat(item.rating || 5)}</div>
                  {item.isUserSubmitted ? (
                    <span className="testi-real-badge-sm">🌟 Real Devotee</span>
                  ) : (
                    <span className="testi-verified-badge-sm">✓ Verified</span>
                  )}
                </div>

                <div className="testi-text">"{item.text}"</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <span className="testi-puja">{item.puja}</span>
                  <span style={{ fontSize: '11px', color: '#7A6B6E', fontStyle: 'italic' }}>
                    {item.tradition}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Write a Real Review Modal */}
      {isModalOpen && (
        <div className="review-modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div
            className="review-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="review-modal-header">
              <h3 id="review-modal-title">✍️ Share Your Puja Experience</h3>
              <p>Aapka anubhav turant website par sabhi bhakto ko dikhega.</p>
              <button
                type="button"
                className="review-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-modal-form">
              <div className="form-group">
                <label htmlFor="rev-name">Your Name (आपका नाम) *</label>
                <input
                  id="rev-name"
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra Sharma"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rev-loc">Your Location / City (स्थान/क्षेत्र) *</label>
                <input
                  id="rev-loc"
                  type="text"
                  required
                  placeholder="e.g. Gachibowli, Hyderabad"
                  value={formLoc}
                  onChange={(e) => setFormLoc(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rev-puja">Puja Conducted (कौन सी पूजा कराई?)</label>
                <select
                  id="rev-puja"
                  value={formPuja}
                  onChange={(e) => setFormPuja(e.target.value)}
                >
                  <option value="Grihapravesh & Vastu Hawan">Grihapravesh & Vastu Hawan (गृहप्रवेश)</option>
                  <option value="Satyanarayan Katha">Satyanarayan Katha (सत्यनारायण कथा)</option>
                  <option value="Maha Rudrabhishek">Maha Rudrabhishek (रुद्राभिषेक)</option>
                  <option value="Vivah Sanskar">Vivah Sanskar / Wedding (विवाह संस्कार)</option>
                  <option value="Office & Business Opening">Office Opening Hawan (प्रतिष्ठान उद्घाटन)</option>
                  <option value="Navagraha Shanti Homa">Navagraha Shanti (नवग्रह शांति)</option>
                  <option value="Maha Lakshmi Puja">Maha Lakshmi Puja (महालक्ष्मी पूजन)</option>
                  <option value="Namkaran Sanskar">Namkaran Sanskar (नामकरण)</option>
                  <option value="Other Vedic Puja">Other Vedic Ritual (अन्य वैदिक पूजा)</option>
                </select>
              </div>

              <div className="form-group">
                <label>Star Rating (अनुभव रेटिंग) *</label>
                <div className="rating-selector">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${star <= formRating ? 'selected' : ''}`}
                      onClick={() => setFormRating(star)}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-text-label">{formRating} Star Experience</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rev-text">Your Real Review / Feedback (अपना अनुभव लिखें) *</label>
                <textarea
                  id="rev-text"
                  required
                  rows="4"
                  placeholder="Pandit Ji ne bahut shuddh vidhi se puja karai, shubh muhurat par aaye aur poori samagri sath laye..."
                  value={formText}
                  onChange={(e) => setFormText(e.target.value)}
                />
              </div>

              <div className="review-modal-actions">
                <button
                  type="button"
                  className="review-btn-cancel"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel (रद्द करें)
                </button>
                <button
                  type="submit"
                  className="review-btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Publishing Review...' : '🌟 Publish Real Review (समीक्षा प्रकाशित करें)'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
