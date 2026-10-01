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
  // Stars have NO color fill initially (unfilled outline stars)
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Textarea is EMPTY initially
  const [textareaContent, setTextareaContent] = useState('');
  
  // Reviewer name (editable on click)
  const [reviewerName, setReviewerName] = useState('Satyam Tiwari');
  const [isEditingName, setIsEditingName] = useState(false);
  
  // Photos: EMPTY by default (as requested: "Photo pehle se add nahi hona chahiye, add karne ka option aana chahiye")
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  // Recommendations state
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedRecId, setSelectedRecId] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const scrollRef = useRef(null);

  // When star is clicked/touched:
  // 1. Color fills the stars
  // 2. Recommendations section reveals below textarea with smooth animation
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
    // Outer centered layout: centers on desktop and mobile perfectly!
    <div className="min-h-screen bg-[#f1f3f4] sm:bg-[#e5e7eb] flex items-center justify-center p-0 sm:p-6 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]">
      
      {/* Centered Card (480px width, centered on screen, white background, shadow on desktop) */}
      <div className="w-full max-w-[480px] bg-white min-h-screen sm:min-h-0 sm:rounded-2xl sm:shadow-[0_10px_35px_rgba(0,0,0,0.12)] border-0 sm:border sm:border-[#dadce0] flex flex-col justify-between overflow-hidden">
        
        {/* 1. Top Bar: Back Arrow + Page Title */}
        <header className="w-full px-4 py-3.5 flex items-center gap-3.5 border-b border-[#f1f3f4] bg-white sticky top-0 z-20">
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
          <h1 className="text-[1.02rem] font-medium text-[#1f1f1f] tracking-tight truncate">
            North Hindi Pandit - Vedic Puja Services
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="w-full px-5 py-4 flex-1 flex flex-col">
          
          {/* 2. Reviewer Profile Info (Purple circle avatar + Name + Google subtitle) */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-10 h-10 rounded-full bg-[#7e22ce] text-white flex items-center justify-center font-bold text-lg select-none shadow-xs shrink-0">
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
                    className="border border-[#1a73e8] rounded px-2 py-0.5 text-[0.92rem] font-medium text-[#1f1f1f] outline-none"
                  />
                ) : (
                  <span 
                    onClick={() => setIsEditingName(true)}
                    className="font-medium text-[0.95rem] text-[#1f1f1f] cursor-pointer hover:underline flex items-center gap-1.5"
                    title="Click to edit your name"
                  >
                    {reviewerName}
                    <Edit2 className="w-3.5 h-3.5 text-[#747775]" />
                  </span>
                )}
              </div>
              
              <p className="text-[0.8rem] text-[#747775] flex items-center gap-1 mt-0.5">
                <span>Posting publicly across Google</span>
                <Info className="w-3.5 h-3.5 text-[#747775]" />
              </p>
            </div>
          </div>

          {/* 3. Rating Stars Section (Initially UNFILLED, fills on click) */}
          <div className="mb-5 text-center">
            <div className="flex items-center justify-center gap-2.5">
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
                      className={`w-9 h-9 transition-colors ${
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

            {/* Rating label under stars */}
            <div className="h-6 mt-1 flex items-center justify-center">
              {currentDisplayRating > 0 ? (
                <span className="text-[0.92rem] font-medium text-[#444746] animate-in fade-in">
                  {getRatingLabel(currentDisplayRating)}
                </span>
              ) : (
                <span className="text-[0.8rem] text-[#747775]">
                  Tap a star to rate
                </span>
              )}
            </div>
          </div>

          {/* 4. Textarea Div (Clean rectangular box, empty initially) */}
          <div className="mb-4">
            <div className="border border-[#747775] hover:border-[#1a73e8] focus-within:border-[#1a73e8] focus-within:ring-1 focus-within:ring-[#1a73e8] rounded-lg p-3.5 transition-all bg-white shadow-2xs">
              <textarea
                rows={4}
                value={textareaContent}
                onChange={(e) => setTextareaContent(e.target.value)}
                placeholder="Share details of your own experience at this place"
                className="w-full bg-transparent border-none text-[#1f1f1f] text-[0.88rem] leading-relaxed resize-none outline-none placeholder:text-[#747775]"
              />
            </div>
          </div>

          {/* 5. Horizontal Scrollable Recommendations (Revealed when star is tapped or toggled) */}
          {showRecommendations && (
            <div className="mt-5 mb-5 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between mb-2.5 px-0.5">
                <span className="text-[0.82rem] font-semibold text-[#1a73e8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Suggested Reviews (Swipe ⇄ &amp; Tap to Auto-Fill):</span>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => scrollRecommendations('left')}
                    className="p-1 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] border-none bg-transparent cursor-pointer"
                    title="Scroll left"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRecommendations('right')}
                    className="p-1 rounded-full text-[#5f6368] hover:bg-[#f1f3f4] border-none bg-transparent cursor-pointer"
                    title="Scroll right"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Cards Container with Generous Padding */}
              <div 
                ref={scrollRef}
                className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {RECOMMENDED_REVIEWS.map((rec) => {
                  const isSelected = selectedRecId === rec.id || textareaContent === rec.text;

                  return (
                    <div
                      key={rec.id}
                      onClick={() => handleSelectRecommendation(rec)}
                      className={`min-w-[275px] max-w-[290px] p-4 rounded-xl border transition-all cursor-pointer snap-start flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#e8f0fe] border-[#1a73e8] shadow-sm'
                          : 'bg-[#f8f9fa] hover:bg-[#f1f3f4] border-[#e0e2e5]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
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
                        className={`mt-3 w-full py-1.5 px-3 rounded-lg text-[0.78rem] font-medium flex items-center justify-center gap-1.5 border-none cursor-pointer transition-colors ${
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

          {/* 6. Add Photos Button (Photos EMPTY initially) */}
          <div className="mb-4">
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
              <span>{photos.length > 0 ? `Add more photos (${photos.length} selected)` : 'Add photos'}</span>
            </button>

            {/* Photo Previews (shown ONLY when user selects photos) */}
            {photos.length > 0 && (
              <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1">
                {photos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="relative w-18 h-18 rounded-lg overflow-hidden border border-[#dadce0] shrink-0 bg-[#f1f3f4]"
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

        {/* 7. Bottom Post Button */}
        <footer className="w-full px-5 pb-5 pt-2 bg-white border-t border-[#f1f3f4] sm:rounded-b-2xl">
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

    </div>
  );
}
