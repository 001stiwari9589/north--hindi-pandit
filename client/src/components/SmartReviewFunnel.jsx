import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Star, Camera, RefreshCw, Info, ExternalLink, ArrowLeft } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';

const REVIEW_PARTS = {
  openers: [
    "We had the privilege of having Pandit ji at our home in Hyderabad for our auspicious puja.",
    "Had an exceptional experience with Pandit Prashant ji for our sacred Vedic ceremony in Hyderabad.",
    "We booked North Hindi Pandit for our family puja in Hyderabad, and it was a truly divine experience.",
    "Booked Pandit ji for our family rituals in Hyderabad, and everything was performed with utter devotion."
  ],
  details: [
    "The positive divine energy during the Hawan and mantras made our home feel blessed and serene. He arrived punctually with 100% pure samagri and chanted every Sanskrit Vedic mantra with crystal clear pronunciation.",
    "He arrived punctually with 100% pure samagri and chanted every Sanskrit Vedic mantra with crystal clear pronunciation. The Hawan, Navagraha pujan, and Aarti were conducted flawlessly according to authentic North Indian tradition.",
    "Every single vidhi was explained patiently with its spiritual significance, making our entire family deeply happy and satisfied. All sacred shlokas, kalash sthapana, and hawan ahutis were performed strictly according to scriptures."
  ],
  praises: [
    "Pandit ji is extremely polite, knowledgeable, and humble.",
    "All our family elders were deeply impressed with his mastery over Vedic shlokas.",
    "Finding such an authentic and experienced North Indian Pandit in Hyderabad is truly a blessing."
  ],
  closers: [
    "Highly recommended! 5 stars!",
    "Will definitely book Pandit ji for all future family rituals. Highly recommended!",
    "Grateful for his blessings and seamless service. Thank you Pandit ji!"
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateDynamicReviews() {
  const list = [];
  const used = new Set();

  for (let i = 0; i < 8 && list.length < 3; i++) {
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
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [photosAdded, setPhotosAdded] = useState(0);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const recs = generateDynamicReviews();
    setRecommendations(recs);
    if (recs.length > 0) {
      setSelectedReviewText(recs[0]);
    }
  }, []);

  const handleRatingClick = (stars) => {
    setRating(stars);
    const recs = generateDynamicReviews();
    setRecommendations(recs);
    setExpandedIndex(-1);
    if (recs.length > 0) {
      setSelectedReviewText(recs[0]);
    }
    if (stars >= 4) {
      try {
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.4 }
        });
      } catch {}
    }
  };

  const handleShuffle = () => {
    const recs = generateDynamicReviews();
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
    e.stopPropagation();
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
    if (navigator.clipboard && selectedReviewText) {
      navigator.clipboard.writeText(selectedReviewText).catch(() => {});
    }
    setCopied(true);

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {}

    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return 'Exceptional';
      case 4: return 'Very Good';
      case 3: return 'Average';
      case 2: return 'Poor';
      case 1: return 'Terrible';
      default: return 'Exceptional';
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#ffffff] flex flex-col justify-center items-center p-5 font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      
      {/* Review Card Layout (Exact HTML match converted to Tailwind) */}
      <div className="bg-[#1e222d] text-white w-full max-w-[480px] min-h-[540px] rounded-2xl p-6 shadow-[0_20px_40px_rgba(0,0,0,0.6)] flex flex-col items-center border border-[#2e3545] animate-in fade-in duration-300">
        
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#e2e8f0] flex items-center justify-center text-xs overflow-hidden shrink-0">
            <img 
              src="/favicon-96x96.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h2 className="text-base font-semibold text-[#f1f5f9]">
            North Hindi Pandit - Vedic Puja Services
          </h2>
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 mb-5 w-full justify-start pl-2.5">
          <div className="w-10 h-10 bg-[#9333ea] text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
            S
          </div>
          <div className="text-left">
            <span className="block font-semibold text-[0.95rem] text-white">
              Devotee / Yajman
            </span>
            <span className="text-[0.78rem] text-[#94a3b8] flex items-center gap-1">
              <span>Posting publicly across Google</span>
              <Info className="w-3 h-3 text-[#94a3b8]" />
            </span>
          </div>
        </div>

        {/* Star Rating Section */}
        <div className="mb-5 text-center w-full">
          <div className="flex gap-2.5 justify-center text-3xl cursor-pointer text-[#fbbf24]">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = currentDisplayRating >= star;
              return (
                <span
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="transition-transform duration-200 hover:scale-125 select-none"
                >
                  {isFilled ? '★' : '☆'}
                </span>
              );
            })}
          </div>
          <div className="mt-1.5 text-[0.9rem] text-[#cbd5e1] font-medium">
            {getRatingLabel(currentDisplayRating)}
          </div>
        </div>

        {/* Recommendations Container */}
        <div className="w-full max-h-[220px] overflow-y-auto mb-4 flex flex-col gap-2.5 pr-1">
          <div className="flex justify-between items-center text-[0.8rem] text-[#94a3b8] mb-0.5">
            <span>Recommended Reviews (Tap to Apply):</span>
            <button
              type="button"
              onClick={handleShuffle}
              className="bg-transparent border-none text-[#60a5fa] hover:text-[#93c5fd] cursor-pointer text-[0.8rem] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>New Suggestions</span>
            </button>
          </div>

          {recommendations.map((recText, idx) => {
            const isSelected = selectedReviewText === recText;
            const isExpanded = expandedIndex === idx;

            return (
              <div
                key={idx}
                onClick={() => handleSelectRecommendation(recText)}
                className={`border rounded-lg p-2.5 sm:px-3 sm:py-2.5 text-left transition-colors cursor-pointer ${
                  isSelected 
                    ? 'bg-[#2e374a] border-[#60a5fa]' 
                    : 'bg-[#262c3a] hover:bg-[#2e374a] border-[#334155]'
                }`}
              >
                <p className={`text-[0.85rem] leading-[1.4] text-[#e2e8f0] m-0 ${isExpanded ? '' : 'line-clamp-2'}`}>
                  {recText}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span
                    onClick={(e) => toggleReadMore(e, idx)}
                    className="inline-block text-[#38bdf8] hover:underline text-[0.78rem] cursor-pointer font-medium"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </span>
                  {isSelected && (
                    <span className="text-[0.75rem] text-[#fbbf24] font-medium">
                      ✓ Selected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Text Area / Input Section */}
        <div className="w-full mb-4">
          <textarea
            rows={3}
            value={selectedReviewText}
            onChange={(e) => setSelectedReviewText(e.target.value)}
            className="w-full bg-[#0f172a] border border-[#334155] focus:border-[#38bdf8] rounded-lg p-2.5 text-white text-[0.85rem] resize-none outline-none leading-relaxed transition-colors"
            placeholder="Share details of your own experience at this place..."
          />
          
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
            className="bg-transparent border border-[#334155] hover:bg-[#334155] text-[#cbd5e1] hover:text-white px-3.5 py-1.5 rounded-full text-[0.8rem] cursor-pointer mt-2 transition-all block mx-auto flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>{photosAdded > 0 ? `${photosAdded} photo(s) selected` : 'Add photos & videos'}</span>
          </button>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex justify-end gap-3 w-full mt-auto pt-3 border-t border-[#334155]">
          <button
            type="button"
            onClick={() => {
              if (onGoHome) onGoHome();
              else window.location.href = '/';
            }}
            className="px-5 py-2 rounded-full text-[0.85rem] font-semibold cursor-pointer border-none transition-all bg-transparent text-[#94a3b8] hover:bg-[#334155] hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handlePostReview}
            className="px-5 py-2 rounded-full text-[0.85rem] font-semibold cursor-pointer border-none transition-all bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 flex items-center gap-1.5"
          >
            <span>Post</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Return to Homepage Link */}
        <div className="mt-3 text-center">
          <button
            type="button"
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="text-[#64748b] hover:text-[#94a3b8] text-[0.78rem] transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Return to North Hindi Pandit Homepage</span>
          </button>
        </div>

      </div>

    </div>
  );
}
