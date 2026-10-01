import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ArrowLeft, Info, Camera, X, Check, Edit2, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';

const RECOMMENDED_REVIEWS = [
  {
    id: 1,
    tag: "Griha Pravesh & Hawan",
    text: "Highly recommended and truly the best North Indian Hindi Pandit Ji in Hyderabad! Pandit Ji conducted our Vedic puja ritual with complete authenticity, pure pronunciation of Sanskrit mantras, and explained the spiritual meaning of every vidhi so beautifully. They provided 100% pure puja samagri and were very punctual and humble. Whether it is Grihapravesh, Satyanarayan Katha, Rudrabhishek, Hawan or any family sanskar puja, Pandit Ji is exceptional. Best experience, 5 stars!"
  },
  {
    id: 2,
    tag: "Satyanarayan Katha & Puja",
    text: "We booked North Hindi Pandit for Shri Satyanarayan Katha at our home in Hyderabad. The experience was truly divine! Pandit Prashant ji recited all five adhyayas in pure Hindi and Sanskrit with utmost devotion. He arrived right on time with authentic hawan samagri, desi cow ghee, and fresh sacred flowers. All our family elders were deeply pleased. Highly recommended to anyone looking for an authentic North Indian Pandit in Hyderabad!"
  },
  {
    id: 3,
    tag: "Rudrabhishek & Hawan",
    text: "Exceptional Vedic Puja service in Hyderabad! Pandit ji performed Maha Rudrabhishek and Navagraha Hawan at our residence with great Vedic precision. The positive divine vibrations and clear mantra uccharan made our entire home feel blessed. Very polite, highly educated in Vedic karmakand, and 100% transparent with timings and samagri. Definite 5-star service!"
  },
  {
    id: 4,
    tag: "Vedic Wedding & Sanskar",
    text: "We had the privilege of having North Hindi Pandit conduct our family sanskar ceremony in Hyderabad. Every single shloka, kalash sthapana, and aarti was performed strictly according to sacred scriptures. Pandit ji explained the spiritual significance of each step patiently. Finding such a knowledgeable and pious Hindi pandit ji in Hyderabad is a true blessing!"
  }
];

export default function SmartReviewFunnel({ onGoHome }) {
  // Initially rating stars have NO color fill (as requested: "star me pehle color fill na rahe")
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Initially textarea is EMPTY (as requested: "pehle text ka div jo hai wo khali rahe")
  const [textareaContent, setTextareaContent] = useState('');
  
  // Reviewer Name: editable so anyone scanning can see/type their name
  const [reviewerName, setReviewerName] = useState('Satyam Tiwari');
  const [isEditingName, setIsEditingName] = useState(false);
  
  // Photos uploaded (matches screenshot layout)
  const [photos, setPhotos] = useState([
    { id: 1, src: '/vedic_pandit_hawan.jpg', name: 'Puja 1' }
  ]);
  const fileInputRef = useRef(null);

  // Recommendations visibility and selected index
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedRecId, setSelectedRecId] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const scrollRef = useRef(null);

  // When rating star is touched/clicked:
  // 1. Color fills the stars
  // 2. Recommendations section reveals below textarea (horizontal scrollable)
  const handleRatingClick = (stars) => {
    setRating(stars);
    setShowRecommendations(true);

    if (stars >= 4) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.3 }
        });
      } catch {}
    }
  };

  // When user taps a recommended review card:
  // Fills into textarea directly!
  const handleSelectRecommendation = (rec) => {
    setTextareaContent(rec.text);
    setSelectedRecId(rec.id);

    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.45 }
      });
    } catch {}
  };

  const scrollRecommendations = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handlePhotoUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newPhotos = Array.from(e.target.files).map((file, idx) => ({
        id: Date.now() + idx,
        src: URL.createObjectURL(file),
        name: file.name
      }));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handlePostReview = () => {
    const textToCopy = textareaContent.trim() || RECOMMENDED_REVIEWS[0].text;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }
    setCopiedToast(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {}

    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 450);
  };

  const getRatingLabel = (stars) => {
    switch (stars) {
      case 5: return 'Exceptional';
      case 4: return 'Very good';
      case 3: return 'Average';
      case 2: return 'Poor';
      case 1: return 'Terrible';
      default: return '';
    }
  };

  const currentDisplayRating = hoverRating || rating;

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1f1f1f] flex flex-col justify-between font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      
      {/* 1. Top Bar: Back Arrow + Page Title (Exact match to screenshot) */}
      <header className="w-full max-w-[540px] mx-auto px-4 py-3.5 flex items-center gap-4 border-b border-[#f1f3f4] bg-white sticky top-0 z-20">
        <button
          type="button"
          onClick={() => {
            if (onGoHome) onGoHome();
            else window.location.href = '/';
          }}
          className="p-1 -ml-1 text-[#444746] hover:text-[#1f1f1f] hover:bg-[#f1f3f4] rounded-full transition-colors cursor-pointer border-none bg-transparent"
          title="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[1.05rem] font-medium text-[#1f1f1f] tracking-tight truncate">
          North Hindi Pandit - Vedic Puja Services
        </h1>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-[540px] mx-auto px-5 py-4 flex-1 flex flex-col">
        
        {/* 2. Reviewer Profile Info (Purple circle avatar + Name + Google subtitle) */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-11 h-11 rounded-full bg-[#7e22ce] text-white flex items-center justify-center font-bold text-lg select-none shadow-sm shrink-0">
            {reviewerName ? reviewerName.charAt(0).toUpperCase() : 'S'}
          </div>
          
          <div className="flex-1 text-left">
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  onBlur={() => setIsEditingName(false)}
                  autoFocus
                  className="border border-[#1a73e8] rounded px-2 py-0.5 text-[0.95rem] font-medium text-[#1f1f1f] outline-none"
                />
              ) : (
                <span 
                  onClick={() => setIsEditingName(true)}
                  className="font-medium text-[0.98rem] text-[#1f1f1f] cursor-pointer hover:underline flex items-center gap-1.5"
                  title="Click to edit your name"
                >
                  {reviewerName}
                  <Edit2 className="w-3.5 h-3.5 text-[#747775]" />
                </span>
              )}
            </div>
            
            <p className="text-[0.82rem] text-[#747775] flex items-center gap-1 mt-0.5">
              <span>Posting publicly across Google</span>
              <Info className="w-3.5 h-3.5 text-[#747775]" />
            </p>
          </div>
        </div>

        {/* 3. Rating Stars Section (Initially UNFILLED, fills on click) */}
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-3">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = currentDisplayRating >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(star)}
                  className="p-1 cursor-pointer bg-transparent border-none transition-transform hover:scale-115 active:scale-95"
                  title={`${star} Star`}
                >
                  <svg
                    className={`w-9 h-9 sm:w-10 sm:h-10 transition-colors ${
                      isFilled 
                        ? 'fill-[#fbbc04] text-[#fbbc04]' 
                        : 'fill-transparent text-[#dadce0] stroke-[1.5]'
                    }`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </button>
              );
            })}
          </div>

          {/* Rating label under stars (Exceptional / Very good / etc.) */}
          <div className="h-6 mt-1 flex items-center justify-center">
            {currentDisplayRating > 0 ? (
              <span className="text-[0.95rem] font-medium text-[#444746] animate-in fade-in">
                {getRatingLabel(currentDisplayRating)}
              </span>
            ) : (
              <span className="text-[0.82rem] text-[#747775]">
                Tap a star to rate
              </span>
            )}
          </div>
        </div>

        {/* 4. Textarea Div (Clean rectangular box with border, empty initially) */}
        <div className="mb-4">
          <div className="border border-[#747775] hover:border-[#1a73e8] focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] rounded-lg p-3.5 transition-all bg-white shadow-xs">
            <textarea
              rows={5}
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
              placeholder="Share details of your own experience at this place"
              className="w-full bg-transparent border-none text-[#1f1f1f] text-[0.92rem] leading-relaxed resize-none outline-none placeholder:text-[#747775]"
            />
          </div>
        </div>

        {/* 5. Horizontal Scrollable Recommendations (Reveals when star is tapped or toggled) */}
        {showRecommendations && (
          <div className="mb-5 animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[0.82rem] font-semibold text-[#1a73e8] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Suggested Reviews (Swipe ⇄ &amp; Tap to Auto-Fill):</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollRecommendations('left')}
                  className="p-1 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] border-none bg-transparent cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRecommendations('right')}
                  className="p-1 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] border-none bg-transparent cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Cards Container (Left to Right / Right to Left) */}
            <div 
              ref={scrollRef}
              className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {RECOMMENDED_REVIEWS.map((rec) => {
                const isSelected = selectedRecId === rec.id || textareaContent === rec.text;

                return (
                  <div
                    key={rec.id}
                    onClick={() => handleSelectRecommendation(rec)}
                    className={`min-w-[270px] max-w-[290px] p-3 rounded-xl border transition-all cursor-pointer snap-start flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#e8f0fe] border-[#1a73e8] shadow-sm'
                        : 'bg-[#f8f9fa] hover:bg-[#f1f3f4] border-[#e0e2e5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-[#1a73e8] bg-white px-2 py-0.5 rounded-md border border-[#d2e3fc]">
                          {rec.tag}
                        </span>
                        <div className="flex text-[#fbbc04] text-xs">
                          ★★★★★
                        </div>
                      </div>
                      <p className="text-[0.8rem] text-[#3c4043] leading-relaxed line-clamp-4 text-left">
                        "{rec.text}"
                      </p>
                    </div>

                    <button
                      type="button"
                      className={`mt-2.5 w-full py-1.5 px-3 rounded-lg text-[0.78rem] font-medium flex items-center justify-center gap-1.5 border-none cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#1a73e8] text-white'
                          : 'bg-white hover:bg-[#e8f0fe] text-[#1a73e8] border border-[#d2e3fc]'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Applied to Review</span>
                        </>
                      ) : (
                        <span>Tap to Use This Review</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. Add Photos Button & Preview Row (Exact match to screenshot) */}
        <div className="mb-6">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={handlePhotoUploadClick}
            className="w-full bg-[#e8f0fe] hover:bg-[#d2e3fc] text-[#1a73e8] font-medium py-2.5 px-4 rounded-full text-[0.88rem] flex items-center justify-center gap-2 border-none cursor-pointer transition-colors"
          >
            <Camera className="w-4 h-4 text-[#1a73e8]" />
            <span>Add photos</span>
          </button>

          {/* Photo Previews with (X) remove buttons (matching screenshot) */}
          {photos.length > 0 && (
            <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-1">
              {photos.map((photo) => (
                <div 
                  key={photo.id}
                  className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#dadce0] shrink-0 bg-[#f1f3f4]"
                >
                  <img
                    src={photo.src}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(photo.id);
                    }}
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border-none cursor-pointer p-0"
                    title="Remove photo"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>

      {/* 7. Bottom Post Button (Full width Google Blue button, exact match to screenshot) */}
      <footer className="w-full max-w-[540px] mx-auto px-5 pb-5 pt-2 bg-white sticky bottom-0 border-t border-[#f1f3f4]">
        {copiedToast && (
          <div className="mb-2 text-center text-[0.8rem] text-[#137333] font-medium bg-[#e6f4ea] py-1.5 px-3 rounded-lg animate-in fade-in">
            ✓ Review text copied! Opening Google Reviews to paste and submit...
          </div>
        )}

        <button
          type="button"
          onClick={handlePostReview}
          className="w-full bg-[#1a73e8] hover:bg-[#1557b0] active:scale-[0.99] text-white font-medium text-[0.95rem] py-3 rounded-full border-none cursor-pointer shadow-sm transition-all flex items-center justify-center"
        >
          Post
        </button>
      </footer>

    </div>
  );
}
