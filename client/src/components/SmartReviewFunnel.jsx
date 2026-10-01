import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, RefreshCw, Info, ExternalLink, ArrowLeft, Check, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';

const REVIEW_PARTS = {
  openers: [
    "We booked North Hindi Pandit for our auspicious puja at our home in Hyderabad.",
    "Had a truly divine and peaceful experience with Pandit Prashant ji in Hyderabad.",
    "We had the privilege of performing our family Vedic rituals with North Hindi Pandit.",
    "Booked Pandit ji for our home ceremony in Hyderabad, and everything was conducted with utmost devotion."
  ],
  details: [
    "He arrived punctually with 100% pure samagri and chanted every Sanskrit Vedic mantra with crystal clear pronunciation. The positive divine energy during the Hawan made our entire home feel blessed.",
    "The Hawan, Navagraha pujan, Kalash sthapana, and Aarti were performed strictly according to sacred scriptures. Pandit ji explained every vidhi and its spiritual significance so patiently.",
    "All sacred shlokas and rituals were conducted with complete authenticity. Our entire family and elders were deeply satisfied with his Vedic knowledge and devotion."
  ],
  praises: [
    "Pandit ji is extremely knowledgeable, polite, and humble.",
    "Finding such an authentic and experienced North Indian Pandit in Hyderabad is truly a blessing.",
    "All our family members were impressed by his punctuality and devotion."
  ],
  closers: [
    "Highly recommended! 5 stars!",
    "Will definitely book Pandit ji for all future family pujas. Highly recommended!",
    "Grateful for his divine blessings and seamless puja service. Thank you Pandit ji!"
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicReviews() {
  const list = [];
  const used = new Set();

  for (let i = 0; i < 10 && list.length < 4; i++) {
    const opener = getRandomItem(REVIEW_PARTS.openers);
    const detail = getRandomItem(REVIEW_PARTS.details);
    const praise = getRandomItem(REVIEW_PARTS.praises);
    const closer = getRandomItem(REVIEW_PARTS.closers);
    const full = `${opener} ${detail} ${praise} ${closer}`;

    if (!used.has(full)) {
      used.add(full);
      list.push(full);
    }
  }

  return list;
}

export default function SmartReviewFunnel({ onGoHome }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [textareaContent, setTextareaContent] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const recs = generateDynamicReviews();
    setRecommendations(recs);
  }, []);

  // When rating star is touched, show recommendation texts and refresh them
  const handleRatingClick = (stars) => {
    setRating(stars);
    const recs = generateDynamicReviews();
    setRecommendations(recs);
    setExpandedIndex(-1);
    setShowRecommendations(true);

    if (stars >= 4) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.35 }
        });
      } catch {}
    }
  };

  const handleShuffle = () => {
    const recs = generateDynamicReviews();
    setRecommendations(recs);
    setExpandedIndex(-1);
  };

  // When a recommended text is selected:
  // 1. Paste into textarea
  // 2. Hide recommendation texts
  const handleSelectRecommendation = (text) => {
    setTextareaContent(text);
    setShowRecommendations(false);
    setExpandedIndex(-1);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.45 }
      });
    } catch {}
  };

  const toggleReadMore = (e, idx) => {
    e.stopPropagation();
    setExpandedIndex((prev) => (prev === idx ? -1 : idx));
  };

  const handlePostReview = () => {
    const textToCopy = textareaContent.trim() || recommendations[0] || "Exceptional Vedic Puja service by North Hindi Pandit. Highly recommended!";
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }
    setCopied(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}

    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return 'Exceptional (5.0 ★★★★★)';
      case 4: return 'Very Good (4.0 ★★★★☆)';
      case 3: return 'Average (3.0 ★★★☆☆)';
      case 2: return 'Poor (2.0 ★★☆☆☆)';
      case 1: return 'Terrible (1.0 ★☆☆☆☆)';
      default: return 'Exceptional (5.0 ★★★★★)';
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#ffffff] flex flex-col justify-center items-center p-4 sm:p-6 font-['Poppins',sans-serif]">
      
      {/* Outer Card Div (Matching notebook sketch) */}
      <div className="bg-[#1e222d] text-white w-full max-w-[500px] rounded-2xl p-5 sm:p-6 shadow-[0_20px_45px_rgba(0,0,0,0.65)] flex flex-col border border-[#2e3545] animate-in fade-in duration-300">
        
        {/* 1. Header: Logo (Om) + Website Name in 'Philosopher' Font */}
        <div className="flex items-center justify-center gap-2.5 mb-3 text-center">
          {/* Om Sun Logo */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d97706] to-[#f59e0b] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full rounded-full bg-[#1e222d] flex items-center justify-center">
              <span className="text-[#fbbf24] text-base font-bold leading-none select-none">ॐ</span>
            </div>
          </div>
          {/* Website Name with Philosopher Font */}
          <h1 
            style={{ fontFamily: "'Philosopher', serif" }}
            className="text-xl sm:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] via-[#f8fafc] to-[#f59e0b]"
          >
            Northhindipandit.in
          </h1>
        </div>

        {/* 2. Reviewer Name Section: 10-12px margin, left-right padding */}
        <div className="w-full my-[11px] px-3.5 py-2.5 bg-[#171b24] border border-[#2b3242] rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#9333ea] to-[#6366f1] text-white rounded-full flex items-center justify-center font-bold text-sm shadow shrink-0">
              Y
            </div>
            <div className="text-left">
              <span className="block font-semibold text-[0.92rem] text-[#f1f5f9] leading-tight">
                Devotee / Yajman
              </span>
              <span className="text-[0.74rem] text-[#94a3b8] flex items-center gap-1 mt-0.5">
                <span>Posting publicly across Google Reviews</span>
                <Info className="w-3 h-3 text-[#64748b]" />
              </span>
            </div>
          </div>
          <span className="text-[0.72rem] bg-[#222938] text-[#38bdf8] font-medium px-2 py-0.5 rounded-full border border-[#334155]">
            Verified
          </span>
        </div>

        {/* 3. Rating Stars Section */}
        <div className="my-[11px] text-center w-full">
          <div className="flex gap-2 justify-center text-3xl sm:text-4xl cursor-pointer text-[#fbbf24]">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = currentDisplayRating >= star;
              return (
                <span
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="transition-transform duration-150 hover:scale-125 select-none active:scale-95"
                  title={`${star} Star`}
                >
                  {isFilled ? '★' : '☆'}
                </span>
              );
            })}
          </div>
          <div className="mt-1.5 text-[0.82rem] text-[#cbd5e1] font-medium">
            {getRatingLabel(currentDisplayRating)}
          </div>
        </div>

        {/* 4. Textarea Div (Directly below Stars - empty for typing or receiving selected text) */}
        <div className="w-full my-[11px]">
          <label className="block text-[0.78rem] text-[#94a3b8] mb-1.5 text-left font-medium">
            Share details of your puja experience (Type or select recommended text below):
          </label>
          <textarea
            rows={3}
            value={textareaContent}
            onChange={(e) => setTextareaContent(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] focus:border-[#fbbf24] focus:ring-1 focus:ring-[#fbbf24] rounded-xl p-3 text-white text-[0.85rem] resize-none outline-none leading-relaxed transition-all placeholder:text-[#64748b]"
            placeholder="Type your review details here, or tap any star above to view 1-tap recommended text..."
          />
          
          {/* Helper bar under textarea */}
          <div className="flex items-center justify-between mt-1 text-[0.75rem] px-1">
            <span className="text-[#94a3b8]">
              {textareaContent ? `${textareaContent.length} characters` : 'Empty (Tap a star or suggestions below)'}
            </span>
            <button
              type="button"
              onClick={() => setShowRecommendations((prev) => !prev)}
              className="text-[#38bdf8] hover:text-[#7dd3fc] cursor-pointer bg-transparent border-none flex items-center gap-1 font-medium transition-colors"
            >
              <Sparkles className="w-3 h-3 text-[#fbbf24]" />
              <span>{showRecommendations ? 'Hide Suggestions' : 'Show Suggestions (3-4 Texts)'}</span>
              {showRecommendations ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 5. Recommended Texts Section (Visible on rating click or toggle) */}
        {showRecommendations && (
          <div className="w-full my-[11px] p-3 bg-[#151922] border border-[#2b3344] rounded-xl animate-in slide-in-from-top-2 duration-200">
            {/* Header with Shuffle */}
            <div className="flex justify-between items-center text-[0.78rem] text-[#94a3b8] mb-2 px-1">
              <span className="font-semibold text-[#e2e8f0]">
                Recommended Texts (Tap to Auto-Fill &amp; Hide):
              </span>
              <button
                type="button"
                onClick={handleShuffle}
                className="bg-transparent border-none text-[#60a5fa] hover:text-[#93c5fd] cursor-pointer text-[0.76rem] flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Shuffle</span>
              </button>
            </div>

            {/* List of 3-4 Recommended Texts */}
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
              {recommendations.map((recText, idx) => {
                const isExpanded = expandedIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border border-[#2b3548] hover:border-[#60a5fa] bg-[#1e2432] hover:bg-[#252d3e] rounded-lg p-2.5 transition-all text-left group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#2a3449] text-[#fbbf24] text-[0.72rem] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      
                      {/* Text content with 1-line clamp and smooth scale on expand */}
                      <div className="flex-1 min-w-0">
                        <p 
                          className={`text-[0.82rem] leading-snug text-[#cbd5e1] m-0 transition-all duration-200 ${
                            isExpanded ? 'scale-100 whitespace-normal' : 'truncate'
                          }`}
                        >
                          {recText}
                        </p>

                        <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-[#2a3449]">
                          <button
                            type="button"
                            onClick={(e) => toggleReadMore(e, idx)}
                            className="text-[#38bdf8] hover:text-[#7dd3fc] text-[0.74rem] font-medium bg-transparent border-none cursor-pointer p-0"
                          >
                            {isExpanded ? '▲ Read Less' : '▼ Read More'}
                          </button>

                          {/* Select / Book button: pastes into textarea and hides recommendations */}
                          <button
                            type="button"
                            onClick={() => handleSelectRecommendation(recText)}
                            className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[0.74rem] font-semibold px-2.5 py-1 rounded-md cursor-pointer border-none flex items-center gap-1 transition-all shadow-sm active:scale-95"
                          >
                            <Check className="w-3 h-3" />
                            <span>Select &amp; Use</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Bottom Action Button (Post) */}
        <div className="w-full mt-3 pt-3 border-t border-[#2b3548] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (onGoHome) onGoHome();
              else window.location.href = '/';
            }}
            className="px-4 py-2.5 rounded-xl text-[0.82rem] font-medium cursor-pointer border-none transition-all bg-transparent text-[#94a3b8] hover:bg-[#2b3548] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePostReview}
            className="flex-1 max-w-[220px] bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white font-bold py-2.5 px-5 rounded-xl shadow-[0_4px_16px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] transition-all cursor-pointer border-none flex items-center justify-center gap-2 active:scale-95"
          >
            <span className="tracking-wide">Post Review</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* Copy helper status */}
        {copied && (
          <div className="mt-2 text-center text-[0.76rem] text-[#4ade80] animate-in fade-in">
            ✓ Review copied to clipboard! Opening Google Reviews to paste and post.
          </div>
        )}

        {/* Return to Homepage Link */}
        <div className="mt-3.5 text-center">
          <button
            type="button"
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="text-[#64748b] hover:text-[#94a3b8] text-[0.76rem] transition-colors cursor-pointer bg-transparent border-none inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to North Hindi Pandit Homepage</span>
          </button>
        </div>

      </div>

    </div>
  );
}

