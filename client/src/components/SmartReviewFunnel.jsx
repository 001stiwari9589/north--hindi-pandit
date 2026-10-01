import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, Camera, Check, Sparkles, RefreshCw, Info, ExternalLink, MessageCircle, RotateCcw, ArrowLeft } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';

// Dynamic combinatorial review generator for infinite natural variations
const REVIEW_PARTS = {
  openers: [
    "We booked North Hindi Pandit for our family puja in Hyderabad, and it was a wonderful experience.",
    "Had an exceptional experience with Pandit Prashant ji for our sacred Vedic ceremony in Hyderabad.",
    "Booked Pandit ji for our family rituals in Hyderabad, and everything was performed with utter devotion.",
    "Outstanding Vedic ceremony conducted by North Hindi Pandit. Very peaceful and divine atmosphere.",
    "We had the privilege of having Pandit ji at our home in Hyderabad for our auspicious puja."
  ],
  ceremonyDetails: {
    5: [
      "He arrived punctually with 100% pure samagri and chanted every Sanskrit Vedic mantra with crystal clear pronunciation.",
      "The Hawan, Navagraha pujan, and Aarti were conducted flawlessly according to authentic North Indian tradition.",
      "Every single vidhi was explained patiently with its spiritual significance, making our entire family deeply happy.",
      "The positive divine energy during the Hawan and mantras made our home feel blessed and serene."
    ],
    4: [
      "Pandit ji arrived on time and conducted all rituals with devotion and patience.",
      "The chanting was clear and all family members were satisfied with the vidhi.",
      "Good experience with authentic North Indian customs and pure puja items."
    ],
    3: [
      "The puja was completed as per tradition.",
      "Pandit ji conducted the rituals in a respectful manner."
    ]
  },
  praise: [
    "Pandit ji is extremely polite, knowledgeable, and humble.",
    "All our family elders were very impressed with his mastery over Vedic shlokas.",
    "Finding such an authentic and experienced North Indian Pandit in Hyderabad is truly a blessing."
  ],
  closers: [
    "Highly recommended for all North Indian families in Hyderabad! 5 Stars!",
    "Will definitely book Pandit ji for all our future family pujas and occasions. Highly recommended!",
    "Grateful for his blessings and seamless service. Thank you Pandit ji!"
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicReviews(starRating) {
  const detailsPool = REVIEW_PARTS.ceremonyDetails[starRating] || REVIEW_PARTS.ceremonyDetails[5];
  const list = [];
  const used = new Set();

  for (let i = 0; i < 8 && list.length < 3; i++) {
    const opener = getRandomItem(REVIEW_PARTS.openers);
    const detail = getRandomItem(detailsPool);
    const praise = getRandomItem(REVIEW_PARTS.praise);
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
  const [rating, setRating] = useState(0); // 0 = initial rating step (like Google Maps unrated modal)
  const [hoverRating, setHoverRating] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [copied, setCopied] = useState(false);
  const [photosAdded, setPhotosAdded] = useState(0);
  const fileInputRef = useRef(null);

  // Generate dynamic unique reviews when rating is selected
  useEffect(() => {
    if (rating >= 4) {
      const recs = generateDynamicReviews(rating);
      setRecommendations(recs);
      if (recs.length > 0 && !selectedReviewText) {
        setSelectedReviewText(recs[0]);
      }
    }
  }, [rating]);

  const handleRatingClick = (stars) => {
    setRating(stars);
    const recs = generateDynamicReviews(stars);
    setRecommendations(recs);
    if (stars >= 4) {
      if (recs.length > 0) {
        setSelectedReviewText(recs[0]);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.4 }
        });
      } catch {}
    } else {
      setSelectedReviewText('');
    }
  };

  const handleShuffle = () => {
    const recs = generateDynamicReviews(rating);
    setRecommendations(recs);
    if (recs.length > 0) {
      setSelectedReviewText(recs[0]);
    }
  };

  const handleSelectRecommendation = (text) => {
    setSelectedReviewText(text);
  };

  const handlePhotoUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotosAdded(e.target.files.length);
    }
  };

  const handlePostReview = () => {
    // 1. Copy the review text to clipboard
    if (navigator.clipboard && selectedReviewText) {
      navigator.clipboard.writeText(selectedReviewText).catch(() => {});
    }
    setCopied(true);

    // 2. Celebrate
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}

    // 3. Direct redirect to official Google Review Box
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  const handleSendWhatsAppPrivate = () => {
    const text = encodeURIComponent(
      `Hello Pandit Ji, I would like to share feedback regarding our puja ceremony (Rating: ${rating}/5 Stars):\n\n${selectedReviewText || 'Please contact me regarding our experience.'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Google Review Rating Labels matching Google Maps
  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return 'Exceptional';
      case 4: return 'Very Good';
      case 3: return 'Average';
      case 2: return 'Poor';
      case 1: return 'Terrible';
      default: return '';
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen w-full bg-[#121314] text-[#E8EAED] font-['Poppins',sans-serif] antialiased flex flex-col items-center justify-center p-3 sm:p-6 relative overflow-x-hidden">
      
      {/* Background Map Texture Effect (matching Google Maps backdrop in user screenshot) */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none bg-cover bg-center filter grayscale contrast-125"
        style={{ backgroundImage: `url('/vedic_pandit_hawan.jpg')` }}
      />
      <div className="fixed inset-0 bg-[#121314]/85 pointer-events-none" />

      {/* Main Google-Themed Review Modal Card */}
      <div className="w-full max-w-[540px] bg-[#202124] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] border border-[#3C4043]/70 relative z-10 p-6 sm:p-8 flex flex-col transition-all duration-300">
        
        {/* Top Header: Website Logo & Brand Title (Centered) */}
        <div className="flex items-center justify-center gap-2.5 mb-5 pb-3 border-b border-[#303134]">
          <img 
            src="/favicon-96x96.png" 
            alt="North Hindi Pandit Logo" 
            className="w-7 h-7 rounded-full shadow-sm border border-amber-400/40"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="text-sm sm:text-base font-semibold text-[#E8EAED] tracking-wide text-center">
            North Hindi Pandit - Vedic Puja Services
          </span>
        </div>

        {/* User Identity Row (Google Review Profile Row) */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#7E22CE] text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0">
            S
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#E8EAED] leading-tight">
              Devotee / Yajman
            </span>
            <div className="flex items-center gap-1 text-xs text-[#9AA0A6] mt-0.5">
              <span>Posting publicly across Google</span>
              <Info className="w-3.5 h-3.5 text-[#9AA0A6]" />
            </div>
          </div>
        </div>

        {/* 5 Big Golden Interactive Stars (Exact Google Maps Style) */}
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = currentDisplayRating >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="p-1 focus:outline-hidden transition-transform hover:scale-125 active:scale-110 cursor-pointer"
                  aria-label={`Rate ${star} Star`}
                >
                  <Star
                    className={`w-9 h-9 sm:w-11 sm:h-11 transition-all duration-150 ${
                      isFilled
                        ? 'fill-[#FBBC04] text-[#FBBC04] filter drop-shadow-[0_2px_8px_rgba(251,188,4,0.5)]'
                        : 'text-[#5F6368] hover:text-[#FBBC04]/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic Google Rating Label */}
          <div className="h-6 mt-2 flex items-center justify-center">
            <span className="text-sm font-medium text-[#E8EAED] tracking-wide">
              {currentDisplayRating > 0 ? getRatingLabel(currentDisplayRating) : 'Select rating to review'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* REVEAL ON RATING CLICK: FAQ-STYLED RECOMMENDATIONS & TEXT AREA            */}
        {/* ========================================================================= */}
        {rating >= 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            
            {/* FAQ-Style Recommendation Cards Header */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8AB4F8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Reviews (Tap to Apply):</span>
              </div>

              <button
                type="button"
                onClick={handleShuffle}
                className="text-xs text-[#8AB4F8] hover:text-[#A8C7FA] flex items-center gap-1 transition cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>New Suggestions</span>
              </button>
            </div>

            {/* FAQ-Style Review Cards (Styled with exact margin, padding, rounded-2xl as FAQ) */}
            <div className="space-y-2.5">
              {recommendations.map((recText, idx) => {
                const isSelected = selectedReviewText === recText;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectRecommendation(recText)}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-xs sm:text-[13px] leading-relaxed cursor-pointer transition-all duration-200 flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#2A2B2E] border-[#FBBC04] text-white shadow-[0_4px_16px_rgba(251,188,4,0.15)] ring-1 ring-[#FBBC04]/50'
                        : 'bg-[#1E1F20] hover:bg-[#282A2D] border-[#3C4043] text-[#BDC1C6] hover:border-[#5F6368]'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#FBBC04] bg-[#FBBC04] text-[#202124]' : 'border-[#5F6368]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                    <p className="flex-1 font-normal">"{recText}"</p>
                  </div>
                );
              })}
            </div>

            {/* Text Area (Exact Google Maps Dark Style) */}
            <div className="mt-1">
              <textarea
                rows={4}
                value={selectedReviewText}
                onChange={(e) => setSelectedReviewText(e.target.value)}
                placeholder="Share details of your own experience at this place..."
                className="w-full p-4 rounded-xl bg-[#17181A] border border-[#5F6368] focus:border-[#8AB4F8] focus:outline-hidden text-[#E8EAED] text-sm leading-relaxed resize-none transition shadow-inner font-['Poppins',sans-serif]"
              />
            </div>

            {/* Add Photos & Videos Button (Exact Pill Button from User Screenshot) */}
            <div className="flex items-center">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                multiple 
                accept="image/*,video/*" 
                className="hidden" 
              />
              <button
                type="button"
                onClick={handlePhotoUploadClick}
                className="w-full py-3 px-4 rounded-full bg-[#282A2D] hover:bg-[#303134] text-[#E8EAED] hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#3C4043]/50 transition cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#8AB4F8]" />
                <span>{photosAdded > 0 ? `${photosAdded} photo(s) selected` : 'Add photos & videos'}</span>
              </button>
            </div>

            {/* Bottom Action Buttons (Cancel & Post - Google Review Modal Layout) */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#303134]">
              <button
                type="button"
                onClick={() => setRating(0)}
                className="px-5 py-2.5 rounded-lg border border-[#3C4043] hover:bg-[#303134] text-[#8AB4F8] font-medium text-sm transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePostReview}
                className="px-6 py-2.5 rounded-lg bg-[#8AB4F8] hover:bg-[#A8C7FA] active:bg-[#7BA7F7] text-[#1E1F20] font-semibold text-sm transition cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <span>Post</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

        {/* 1, 2, or 3 STARS: PRIVATE SUPPORT DIALOG */}
        {rating > 0 && rating <= 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300 pt-2 border-t border-[#303134]">
            <p className="text-xs text-[#BDC1C6] leading-relaxed">
              We are dedicated to providing sacred, flawless Vedic ceremonies. Please share what could be improved so Pandit Ji can resolve it immediately.
            </p>

            <textarea
              rows={3}
              value={selectedReviewText}
              onChange={(e) => setSelectedReviewText(e.target.value)}
              placeholder="Please describe how we can improve our Vedic services for you..."
              className="w-full p-3.5 rounded-xl bg-[#17181A] border border-[#5F6368] focus:border-[#8AB4F8] focus:outline-hidden text-[#E8EAED] text-xs sm:text-sm leading-relaxed resize-none transition font-['Poppins',sans-serif]"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setRating(0)}
                className="px-4 py-2 rounded-lg border border-[#3C4043] hover:bg-[#303134] text-[#8AB4F8] font-medium text-xs transition cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppPrivate}
                className="px-5 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to Pandit Ji on WhatsApp</span>
              </button>
            </div>
          </div>
        )}

        {/* Initial Helper (When rating === 0) */}
        {rating === 0 && (
          <div className="text-center text-xs text-[#9AA0A6] pt-2 border-t border-[#303134]">
            <p>Scan with any mobile camera to rate & share your sacred experience</p>
          </div>
        )}

      </div>

      {/* Back to Website Link */}
      <button
        onClick={onGoHome || (() => { window.location.href = '/'; })}
        className="mt-5 text-xs text-[#9AA0A6] hover:text-[#8AB4F8] flex items-center gap-1.5 transition cursor-pointer relative z-10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to North Hindi Pandit Homepage</span>
      </button>

    </div>
  );
}
