import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, Camera, Check, Sparkles, RefreshCw, Info, ExternalLink, MessageCircle, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';

// Dynamic authentic review generator with rich combinations
const REVIEW_PARTS = {
  openers: [
    "We booked North Hindi Pandit for our family puja in Hyderabad, and it was a truly divine experience.",
    "Had an exceptional experience with Pandit Prashant ji for our sacred Vedic ceremony in Hyderabad.",
    "Booked Pandit ji for our family rituals in Hyderabad, and everything was performed with complete devotion.",
    "Outstanding Vedic ceremony conducted by North Hindi Pandit. Very peaceful and divine atmosphere.",
    "We had the privilege of having Pandit ji at our home in Hyderabad for our auspicious puja."
  ],
  ceremonyDetails: {
    5: [
      "He arrived punctually with 100% pure samagri and chanted every Sanskrit Vedic mantra with crystal clear pronunciation. The Hawan, Navagraha pujan, and Aarti were conducted flawlessly according to authentic North Indian tradition. Every single vidhi was explained patiently with its spiritual significance, making our entire family deeply happy and satisfied.",
      "Pandit ji conducted our Griha Pravesh and Vastu Shanti with immense patience and Vedic discipline. All sacred shlokas, kalash sthapana, and hawan ahutis were performed strictly according to scriptures. The divine aura created in our home brought great peace to all family members.",
      "Exceptional service by North Hindi Pandit. From the initial sankalp to the final purnahuti and aarti, everything was handled with complete sincerity. He brought pure samagri and guided us through every ritual with deep knowledge."
    ],
    4: [
      "Pandit ji arrived on time and conducted all rituals with devotion and patience. The Sanskrit chanting was clear and all family members felt satisfied with the pure North Indian parampara.",
      "Good experience with authentic North Indian customs, punctual arrival, and pure puja samagri. The entire family appreciated his polite nature and spiritual dedication."
    ],
    3: [
      "The puja was completed as per Vedic tradition. Pandit ji conducted the rituals in a respectful and disciplined manner.",
      "A satisfactory experience with the puja ceremonies. Pandit ji explained the main rituals clearly."
    ]
  },
  praise: [
    "Pandit ji is extremely polite, knowledgeable, and humble.",
    "All our family elders were deeply impressed with his mastery over Vedic shlokas.",
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
  const [rating, setRating] = useState(0); // 0 = unrated initial view
  const [hoverRating, setHoverRating] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1); // For "Read more" toggle
  const [copied, setCopied] = useState(false);
  const [photosAdded, setPhotosAdded] = useState(0);
  const fileInputRef = useRef(null);

  // Generate dynamic reviews whenever rating changes
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
    setExpandedIndex(-1); // Reset read more
    if (stars >= 4) {
      if (recs.length > 0) {
        setSelectedReviewText(recs[0]);
      }
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.35 }
        });
      } catch {}
    } else {
      setSelectedReviewText('');
    }
  };

  const handleShuffle = () => {
    const recs = generateDynamicReviews(rating || 5);
    setRecommendations(recs);
    setExpandedIndex(-1);
    if (recs.length > 0) {
      setSelectedReviewText(recs[0]);
    }
  };

  const handleSelectRecommendation = (text) => {
    setSelectedReviewText(text);
  };

  const toggleReadMore = (e, idx) => {
    e.stopPropagation(); // Don't trigger select
    setExpandedIndex((prev) => (prev === idx ? -1 : idx));
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
    // 1. Copy review text to clipboard
    if (navigator.clipboard && selectedReviewText) {
      navigator.clipboard.writeText(selectedReviewText).catch(() => {});
    }
    setCopied(true);

    // 2. Confetti celebration
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}

    // 3. Open official Google Maps Review dialog
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
      
      {/* Background Dimmed Map Texture */}
      <div 
        className="fixed inset-0 opacity-15 pointer-events-none bg-cover bg-center filter grayscale contrast-125"
        style={{ backgroundImage: `url('/vedic_pandit_hawan.jpg')` }}
      />
      <div className="fixed inset-0 bg-[#121314]/85 pointer-events-none" />

      {/* Main Review Modal Card (Spacious height, centered, all text contained) */}
      <div className="w-full max-w-[580px] min-h-[520px] max-h-[92vh] bg-[#202124] rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.85)] border border-[#3C4043]/80 relative z-10 p-6 sm:p-9 flex flex-col overflow-y-auto transition-all duration-300">
        
        {/* Top Header: Logo on left, Center brand title */}
        <div className="flex items-center justify-between mb-6 pb-3.5 border-b border-[#303134] shrink-0">
          <div className="flex items-center gap-3">
            <img 
              src="/favicon-96x96.png" 
              alt="Logo" 
              className="w-8 h-8 rounded-full shadow-sm border border-amber-400/50 shrink-0"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="text-sm sm:text-base font-semibold text-[#E8EAED] tracking-wide">
              North Hindi Pandit
            </span>
          </div>

          <span className="text-[11px] font-medium text-[#9AA0A6] bg-[#303134] px-2.5 py-1 rounded-full">
            Vedic Puja Services
          </span>
        </div>

        {/* User Identity Row */}
        <div className="flex items-center gap-3.5 mb-6 shrink-0">
          <div className="w-11 h-11 rounded-full bg-[#7E22CE] text-white font-bold flex items-center justify-center text-lg shadow-sm shrink-0">
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

        {/* 5 Big Golden Interactive Stars (Center Aligned) */}
        <div className="flex flex-col items-center justify-center mb-6 shrink-0">
          <div className="flex items-center justify-center gap-2.5 sm:gap-4">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = currentDisplayRating >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="p-1 focus:outline-hidden transition-transform hover:scale-130 active:scale-110 cursor-pointer"
                  aria-label={`Rate ${star} Star`}
                >
                  <Star
                    className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-150 ${
                      isFilled
                        ? 'fill-[#FBBC04] text-[#FBBC04] filter drop-shadow-[0_2px_10px_rgba(251,188,4,0.6)]'
                        : 'text-[#5F6368] hover:text-[#FBBC04]/70'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic Google Rating Label (Center Aligned) */}
          <div className="h-6 mt-2.5 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#E8EAED] tracking-wide">
              {currentDisplayRating > 0 ? getRatingLabel(currentDisplayRating) : 'Tap a star to rate experience'}
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INITIAL UNRATED STATE: SPACIOUS HELPER & PLACEHOLDER                     */}
        {/* ========================================================================= */}
        {rating === 0 && (
          <div className="flex-1 flex flex-col justify-between pt-2">
            <div className="p-5 rounded-2xl bg-[#17181A] border border-[#3C4043] text-center space-y-2">
              <p className="text-xs text-[#BDC1C6] font-medium leading-relaxed">
                Thank you for choosing North Hindi Pandit for your sacred puja & hawan in Hyderabad.
              </p>
              <p className="text-[11px] text-[#9AA0A6]">
                Please rate your experience above. Authentic reviews will automatically appear to assist your submission.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#303134] text-center text-xs text-[#9AA0A6]">
              Helpline: +91 7772035222 • www.northhindipandit.in
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* POSITIVE FLOW (4 OR 5 STARS): 2-3 LINE REVIEWS WITH 'READ MORE'          */}
        {/* ========================================================================= */}
        {rating >= 4 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            
            {/* Recommendations Header */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8AB4F8]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Suggested Reviews (Tap to Apply):</span>
              </div>

              <button
                type="button"
                onClick={handleShuffle}
                className="text-xs text-[#8AB4F8] hover:text-[#A8C7FA] flex items-center gap-1 transition cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Shuffle</span>
              </button>
            </div>

            {/* Recommendation Cards: 2-3 lines with Read More toggle */}
            <div className="space-y-3">
              {recommendations.map((recText, idx) => {
                const isSelected = selectedReviewText === recText;
                const isExpanded = expandedIndex === idx;

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectRecommendation(recText)}
                    className={`p-4 rounded-2xl border text-xs sm:text-[13px] leading-relaxed cursor-pointer transition-all duration-200 flex flex-col gap-2 ${
                      isSelected
                        ? 'bg-[#2A2B2E] border-[#FBBC04] text-white shadow-[0_4px_16px_rgba(251,188,4,0.15)] ring-1 ring-[#FBBC04]/50'
                        : 'bg-[#1E1F20] hover:bg-[#282A2D] border-[#3C4043] text-[#BDC1C6] hover:border-[#5F6368]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-[#FBBC04] bg-[#FBBC04] text-[#202124]' : 'border-[#5F6368]'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>

                      {/* 2 to 3 lines clamp when not expanded */}
                      <p className={`flex-1 font-normal ${isExpanded ? '' : 'line-clamp-3'}`}>
                        "{recText}"
                      </p>
                    </div>

                    {/* Read more / Show less button */}
                    <div className="flex items-center justify-between pl-7 pt-1 text-[11px]">
                      <button
                        type="button"
                        onClick={(e) => toggleReadMore(e, idx)}
                        className="text-[#8AB4F8] hover:text-[#A8C7FA] font-medium flex items-center gap-0.5 transition cursor-pointer"
                      >
                        {isExpanded ? (
                          <><span>Show less</span><ChevronUp className="w-3 h-3" /></>
                        ) : (
                          <><span>Read more</span><ChevronDown className="w-3 h-3" /></>
                        )}
                      </button>

                      {isSelected && (
                        <span className="text-[11px] text-[#FBBC04] font-medium">
                          ✓ Applied to text box below
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dedicated Text Area (Exact Google Maps Dark Style) */}
            <div className="mt-1">
              <label className="block text-xs font-medium text-[#9AA0A6] mb-2">
                Your Review (Edit or add details):
              </label>
              <textarea
                rows={4}
                value={selectedReviewText}
                onChange={(e) => setSelectedReviewText(e.target.value)}
                placeholder="Share details of your own experience at this place..."
                className="w-full p-4 rounded-xl bg-[#17181A] border border-[#5F6368] focus:border-[#8AB4F8] focus:outline-hidden text-[#E8EAED] text-sm leading-relaxed resize-none transition shadow-inner font-['Poppins',sans-serif]"
              />
            </div>

            {/* Add Photos & Videos Button */}
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
                className="w-full py-3.5 px-5 rounded-full bg-[#282A2D] hover:bg-[#303134] text-[#E8EAED] hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#3C4043]/50 transition cursor-pointer"
              >
                <Camera className="w-4 h-4 text-[#8AB4F8]" />
                <span>{photosAdded > 0 ? `${photosAdded} photo(s) selected` : 'Add photos & videos'}</span>
              </button>
            </div>

            {/* Bottom Actions: Cancel & Post with generous inner padding */}
            <div className="flex items-center justify-end gap-3.5 pt-4 border-t border-[#303134]">
              <button
                type="button"
                onClick={() => setRating(0)}
                className="px-8 py-3.5 rounded-xl border border-[#5F6368] hover:bg-[#303134] text-[#8AB4F8] font-semibold text-sm transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePostReview}
                className="px-9 py-3.5 rounded-xl bg-[#8AB4F8] hover:bg-[#A8C7FA] active:scale-95 text-[#1E1F20] font-bold text-sm transition cursor-pointer shadow-lg shadow-[#8AB4F8]/25 flex items-center gap-2"
              >
                <span>Post</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* 1, 2, or 3 STARS: PRIVATE SUPPORT DIALOG */}
        {rating > 0 && rating <= 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300 pt-3 border-t border-[#303134]">
            <p className="text-xs text-[#BDC1C6] leading-relaxed">
              We are dedicated to providing authentic and flawless Vedic rituals. Please share how we can improve so Pandit Ji can resolve it immediately.
            </p>

            <textarea
              rows={4}
              value={selectedReviewText}
              onChange={(e) => setSelectedReviewText(e.target.value)}
              placeholder="Please describe how we can improve our services for you..."
              className="w-full p-4 rounded-xl bg-[#17181A] border border-[#5F6368] focus:border-[#8AB4F8] focus:outline-hidden text-[#E8EAED] text-xs sm:text-sm leading-relaxed resize-none transition font-['Poppins',sans-serif]"
            />

            <div className="flex items-center justify-end gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => setRating(0)}
                className="px-6 py-3 rounded-xl border border-[#5F6368] hover:bg-[#303134] text-[#8AB4F8] font-medium text-xs transition cursor-pointer"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSendWhatsAppPrivate}
                className="px-7 py-3 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send to Pandit Ji on WhatsApp</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Return to Website link at bottom */}
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
