import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Copy, ExternalLink, MessageCircle, RefreshCw, CheckCircle2, ArrowLeft, Sparkles, ShieldCheck, Check, RotateCcw } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';

const PUJA_CATEGORIES = [
  { id: 'griha_pravesh', name: 'Griha Pravesh & Vastu', icon: '🏠' },
  { id: 'satyanarayan', name: 'Satyanarayan Katha', icon: '🪔' },
  { id: 'rudrabhishek', name: 'Maha Rudrabhishek', icon: '🔱' },
  { id: 'vivah', name: 'Wedding & Vivah Sanskar', icon: '💍' },
  { id: 'navchandi', name: 'Navchandi & Hawan', icon: '🌺' },
  { id: 'other', name: 'Vedic Puja & Hawan', icon: '🕉️' }
];

const REVIEW_VARIATIONS = {
  griha_pravesh: [
    "We booked Pandit ji for our new flat Griha Pravesh and Vastu Shanti in Hyderabad. He arrived punctually with pure puja samagri and performed every ritual with authentic Vedic mantras. Truly a divine and peaceful experience for our whole family. Highly recommended!",
    "Outstanding Griha Pravesh puja in Hyderabad! Pandit ji conducted the Navagraha puja and Hawan according to pure North Indian traditions, explaining the spiritual significance of each vidhi. Extremely satisfied with his services!",
    "Best North Indian Hindi Pandit in Hyderabad. Pandit ji conducted the entire Griha Pravesh ceremony with immense patience and devotion. The energy in the house felt positive and sanctified. 5 stars!"
  ],
  satyanarayan: [
    "Pandit ji performed the Sri Satyanarayan Katha and Hawan with pure devotion. His Hindi katha narration was melodious, clear, and engaging for everyone in the family. Truly blessed!",
    "Wonderful experience with Pandit ji for Satyanarayan puja in Hyderabad. Punctual, polite, and very knowledgeable. Performed the entire ritual as per North Indian Vedic vidhi. 5 stars!",
    "Very authentic Satyanarayan Katha and Hawan. Pandit ji explained the katha beautifully and performed all rituals patiently without any rush. Highly recommended!"
  ],
  rudrabhishek: [
    "Maha Rudrabhishek and Hawan conducted with authentic Vedic chanting. Pandit ji created a deeply divine and peaceful atmosphere at home. Truly the best Hindi pandit in Hyderabad.",
    "Exceptional Rudrabhishek experience! Pandit ji performed the Shiva abhishek and chants with utmost purity and Vedic pronunciation. Felt spiritually recharged. Har Har Mahadev!",
    "Highly recommend Pandit ji for Rudrabhishek in Hyderabad. Complete dedication, pure samagri, and authentic Vedic rituals."
  ],
  vivah: [
    "Pandit ji conducted our complete North Indian wedding ceremony and sacred pheras with profound Vedic grace. He explained the sacred vows clearly in Hindi. Highly recommend for Hindu weddings in Hyderabad!",
    "Outstanding marriage rituals and pheras. Pandit ji made our special day memorable and spiritually rich. Thank you for your blessings!",
    "Authentic North Indian Vivah Sanskar performed with great dignity and traditional rituals. All guests and elders praised Pandit ji's knowledge."
  ],
  navchandi: [
    "Navchandi Hawan and Durga Puja conducted with pure Vedic precision. Pandit ji's spiritual energy and Sanskrit chanting were remarkable. Jai Mata Di!",
    "Wonderful Navchandi hawan experience in Hyderabad. Punctual, respectful, and authentic North Indian vidhi. Highly recommended!",
    "Deeply spiritual Durga Saptashati paath and Hawan. Pandit ji brought pure samagri and performed everything with great reverence."
  ],
  other: [
    "Highly impressed with Pandit ji's Vedic puja services in Hyderabad. Punctual, respectful, and brought pure samagri. Performed all rituals with complete peace and devotion.",
    "Best Hindi Pandit in Hyderabad. Authentic North Indian vidhi, clear mantras, and very affordable dakshina. Truly satisfied!",
    "A truly authentic and peaceful puja experience. Pandit ji explained every step with patience and positivity. 5 stars!"
  ]
};

export default function SmartReviewFunnel({ onGoHome }) {
  const [rating, setRating] = useState(0); // 0 = initial rating screen
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState('griha_pravesh');
  const [optionsList, setOptionsList] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');

  // Update reviews when puja changes
  useEffect(() => {
    const list = REVIEW_VARIATIONS[selectedPuja] || REVIEW_VARIATIONS.other;
    setOptionsList(list);
    if (list.length > 0) {
      setCurrentText(list[0]);
    }
  }, [selectedPuja]);

  // Handle rating click
  const handleRatingClick = (stars) => {
    setRating(stars);
    if (stars >= 4) {
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.35 }
        });
      } catch {}
    }
  };

  const handleShuffleReviews = () => {
    const list = REVIEW_VARIATIONS[selectedPuja] || REVIEW_VARIATIONS.other;
    const rotated = [...list.slice(1), list[0]];
    setOptionsList(rotated);
    setCurrentText(rotated[0]);
  };

  const handleCopyAndRedirect = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentText).catch(() => {});
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
    }, 600);
  };

  const handleSendPrivateWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Pandit Ji, I would like to share feedback regarding our puja ceremony (Rating: ${rating}/5 Stars):\n\n${privateFeedback || 'Please contact me regarding our experience.'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#2D2A26] font-sans antialiased py-8 px-4 sm:px-6 flex flex-col items-center justify-center">
      
      {/* Container with ample breathing space */}
      <div className="w-full max-w-xl mx-auto flex flex-col items-center">
        
        {/* Top Navigation Bar with generous margin */}
        <div className="w-full flex items-center justify-between mb-6">
          <button
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-2 text-stone-700 hover:text-amber-800 bg-white px-4 py-2 rounded-full border border-stone-200/90 shadow-xs text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Main Website
          </button>

          <span className="text-[11px] font-bold tracking-wider text-amber-800 uppercase bg-amber-100/70 border border-amber-200 px-3 py-1.5 rounded-full">
            Official Review Portal
          </span>
        </div>

        {/* ========================================================================= */}
        {/* STEP 1: INITIAL CLEAN RATING CARD (Shown before user taps any rating)    */}
        {/* ========================================================================= */}
        {rating === 0 && (
          <div className="w-full bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-amber-950/5 border border-amber-200/80 text-center relative overflow-hidden transition-all duration-300">
            
            {/* Top Golden Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
            
            {/* Sacred Om Medallion */}
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 text-white font-serif text-3xl font-bold border border-amber-300">
              ॐ
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-serif mb-2">
              Rate Your Experience
            </h1>
            <p className="text-amber-900/80 text-sm max-w-md mx-auto mb-8 font-medium">
              North Hindi Pandit • Authentic Vedic Puja & Hawan Services in Hyderabad
            </p>

            {/* Interactive Stars Div with ample padding and margins */}
            <div className="bg-amber-50/60 rounded-2xl p-6 sm:p-7 border border-amber-200/70 shadow-xs mb-6">
              <p className="text-xs uppercase tracking-widest font-bold text-stone-600 mb-5">
                Tap a Star to Rate Pandit Ji
              </p>

              <div className="flex justify-center items-center gap-3 sm:gap-4">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isHovered = (hoverRating || 0) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => handleRatingClick(star)}
                      className="p-1 transition-transform hover:scale-125 active:scale-110 focus:outline-hidden cursor-pointer"
                      aria-label={`Rate ${star} Star`}
                    >
                      <Star
                        className={`w-11 h-11 sm:w-14 sm:h-14 transition-all duration-150 ${
                          isHovered
                            ? 'fill-amber-400 text-amber-500 filter drop-shadow-[0_4px_14px_rgba(245,158,11,0.6)]'
                            : 'text-stone-300 hover:text-amber-400'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 text-sm sm:text-base font-bold text-amber-950">
                {hoverRating === 5 && '⭐⭐⭐⭐⭐ Excellent & Divinely Blessed!'}
                {hoverRating === 4 && '⭐⭐⭐⭐ Very Good Experience'}
                {hoverRating === 3 && '⭐⭐⭐ Satisfactory Experience'}
                {hoverRating > 0 && hoverRating <= 2 && 'Needs Improvement'}
                {hoverRating === 0 && 'Select your rating above'}
              </div>
            </div>

            <p className="text-stone-500 text-xs">
              Takes only 10 seconds • Your review helps devotees find authentic Vedic rituals
            </p>
          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2A: POSITIVE FLOW (4 OR 5 STARS) -> EXPANDS NATURALLY ON CLICK     */}
        {/* ========================================================================= */}
        {rating >= 4 && (
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-950/5 border border-amber-200/80 relative transition-all duration-300">
            
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-t-3xl" />

            {/* Rating Banner with Change button */}
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center text-amber-500">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <span className="text-sm font-bold text-amber-950">
                  {rating === 5 ? '5/5 Divine Experience!' : '4/5 Great Experience!'}
                </span>
              </div>

              <button
                onClick={() => setRating(0)}
                className="text-xs font-semibold text-stone-500 hover:text-amber-800 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Change Rating
              </button>
            </div>

            {/* Ceremony Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2.5">
                Select Ceremony Performed:
              </label>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {PUJA_CATEGORIES.map((cat) => {
                  const isActive = selectedPuja === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedPuja(cat.id)}
                      className={`p-3 rounded-xl text-xs font-semibold transition text-left border cursor-pointer flex items-center gap-2 ${
                        isActive
                          ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25 ring-1 ring-amber-500'
                          : 'bg-stone-50 hover:bg-amber-50/70 text-stone-700 border-stone-200'
                      }`}
                    >
                      <span className="text-sm">{cat.icon}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AI Review Suggestions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Tap to Select a Recommended Review:</span>
                </div>

                <button
                  type="button"
                  onClick={handleShuffleReviews}
                  className="text-xs font-semibold text-amber-900 hover:text-amber-950 flex items-center gap-1 bg-amber-100/70 hover:bg-amber-100 px-3 py-1 rounded-full border border-amber-200 transition cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-amber-700" />
                  Shuffle
                </button>
              </div>

              <div className="space-y-3">
                {optionsList.map((opt, idx) => {
                  const isSelected = currentText === opt;
                  return (
                    <div
                      key={idx}
                      onClick={() => setCurrentText(opt)}
                      className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed cursor-pointer transition flex items-start gap-3 ${
                        isSelected
                          ? 'bg-amber-50/90 border-amber-500 text-amber-950 shadow-sm ring-1 ring-amber-400'
                          : 'bg-stone-50/70 hover:bg-stone-100/80 border-stone-200 text-stone-700'
                      }`}
                    >
                      <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-amber-600 bg-amber-600 text-white' : 'border-stone-400'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <p className="flex-1 font-medium">"{opt}"</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editable Review Textarea */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Your Review (Feel free to customize):
                </label>
                {copied && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                  </span>
                )}
              </div>

              <textarea
                rows={4}
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-amber-50/30 border border-amber-300 focus:border-amber-500 focus:bg-white focus:outline-hidden text-stone-800 text-xs sm:text-sm leading-relaxed resize-none shadow-inner transition"
              />
            </div>

            {/* Main Primary Action Button */}
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleCopyAndRedirect}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Review & Post on Google ⭐⭐⭐⭐⭐</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              {copied && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Review copied! Opening Google Maps — tap 5-Stars and Paste!
                </div>
              )}

              {/* 3 Step Instruction Card */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                <p className="font-bold text-stone-800">Quick 3-Step Guide:</p>
                <p>1. Tap the orange button above (your review is copied automatically).</p>
                <p>2. Google Reviews will open directly on your screen.</p>
                <p>3. Select <span className="text-amber-700 font-bold">5 Stars</span> and paste your review!</p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2B: NEGATIVE FLOW (1-3 STARS) -> PRIVATE WHATSAPP                   */}
        {/* ========================================================================= */}
        {rating > 0 && rating <= 3 && (
          <div className="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-200 relative transition-all duration-300">
            
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-bold bg-rose-50 px-3 py-1.5 rounded-full border border-rose-200">
                <ShieldCheck className="w-4 h-4 text-rose-600" />
                Private Devotee Support
              </div>

              <button
                onClick={() => setRating(0)}
                className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Change Rating
              </button>
            </div>

            <h2 className="text-xl font-bold text-stone-900 mb-2 font-serif">
              We Value Your Experience
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-5">
              We are dedicated to providing the most authentic and serene Vedic rituals. Please let Pandit Ji know how we can improve our services for you.
            </p>

            <textarea
              rows={4}
              value={privateFeedback}
              onChange={(e) => setPrivateFeedback(e.target.value)}
              placeholder="Please describe your experience or how we can improve..."
              className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:bg-white focus:outline-hidden text-stone-800 text-xs sm:text-sm leading-relaxed resize-none mb-5 transition"
            />

            <button
              type="button"
              onClick={handleSendPrivateWhatsApp}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Send Private Feedback to Pandit Ji on WhatsApp
            </button>
            <p className="text-center text-stone-400 text-xs mt-3">
              Your feedback is 100% confidential and handled personally.
            </p>
          </div>
        )}

        {/* Footer Helpline */}
        <div className="text-center mt-8 pb-4 text-xs text-stone-500 space-y-1">
          <p className="font-semibold text-stone-700">North Hindi Pandit • Vedic Puja Services Hyderabad</p>
          <p>Helpline: +91 7772035222 • www.northhindipandit.in</p>
        </div>

      </div>
    </div>
  );
}
