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
  const [rating, setRating] = useState(0); // 0 means unselected (Step 1)
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState('griha_pravesh');
  const [optionsList, setOptionsList] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');

  // Update reviews when puja category changes
  useEffect(() => {
    const list = REVIEW_VARIATIONS[selectedPuja] || REVIEW_VARIATIONS.other;
    setOptionsList(list);
    if (list.length > 0) {
      setCurrentText(list[0]);
    }
  }, [selectedPuja]);

  // When rating is selected
  const handleRatingClick = (stars) => {
    setRating(stars);
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

  const handleShuffleReviews = () => {
    const list = REVIEW_VARIATIONS[selectedPuja] || REVIEW_VARIATIONS.other;
    // Rotate list
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
        particleCount: 90,
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#0C0A09] flex flex-col items-center justify-center p-4 sm:p-6 text-stone-100 font-sans antialiased">
      
      {/* Top Brand Bar */}
      <div className="w-full max-w-lg flex items-center justify-between mb-4">
        <button
          onClick={onGoHome || (() => { window.location.href = '/'; })}
          className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium transition cursor-pointer backdrop-blur-md"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Main Website
        </button>

        <span className="text-[11px] font-semibold tracking-wider text-amber-300 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
          Official Review Portal
        </span>
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: INITIAL CLEAN RATING CARD (Shown before user taps any rating)    */}
      {/* ========================================================================= */}
      {rating === 0 && (
        <div className="w-full max-w-lg bg-gradient-to-b from-[#231F1D] to-[#1A1816] rounded-3xl p-7 sm:p-10 shadow-2xl border border-amber-500/30 text-center relative overflow-hidden backdrop-blur-xl animate-fade-in">
          
          {/* Subtle Top Golden Glow Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />
          
          {/* Sacred Om Medallion */}
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30 text-white font-serif text-3xl font-bold border border-amber-400/40">
            ॐ
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Rate Your Experience
          </h1>
          <p className="text-stone-300 text-sm max-w-sm mx-auto leading-relaxed mb-6">
            North Hindi Pandit • Authentic Vedic Puja & Hawan Services in Hyderabad
          </p>

          {/* Interactive Star Rating Callout */}
          <div className="bg-stone-900/60 rounded-2xl p-5 border border-white/5 shadow-inner mb-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-amber-400 mb-4">
              Tap a Star to Rate Pandit Ji
            </p>

            <div className="flex justify-center items-center gap-2 sm:gap-4">
              {[1, 2, 3, 4, 5].map((star) => {
                const isHovered = (hoverRating || 0) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingClick(star)}
                    className="p-1 transition-transform hover:scale-130 active:scale-110 focus:outline-hidden cursor-pointer"
                    aria-label={`Rate ${star} Star`}
                  >
                    <Star
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-all duration-150 ${
                        isHovered
                          ? 'fill-amber-400 text-amber-400 filter drop-shadow-[0_4px_16px_rgba(245,158,11,0.7)]'
                          : 'text-stone-600 hover:text-amber-500/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <p className="text-stone-400 text-xs mt-4">
              {hoverRating === 5 && '⭐⭐⭐⭐⭐ Excellent & Divinely Blessed!'}
              {hoverRating === 4 && '⭐⭐⭐⭐ Very Good Experience'}
              {hoverRating === 3 && '⭐⭐⭐ Average Experience'}
              {hoverRating > 0 && hoverRating <= 2 && 'Needs Improvement'}
              {hoverRating === 0 && 'Select your rating above'}
            </p>
          </div>

          <p className="text-stone-500 text-[11px]">
            Takes only 10 seconds • Your review helps devotees find authentic Vedic rituals
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2A: POSITIVE FLOW (4 OR 5 STARS) -> AI RECOMMENDATIONS -> GOOGLE    */}
      {/* ========================================================================= */}
      {rating >= 4 && (
        <div className="w-full max-w-lg bg-gradient-to-b from-[#231F1D] to-[#1A1816] rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/40 relative overflow-hidden backdrop-blur-xl animate-fade-in">
          
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />

          {/* Header & Rating Summary */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-amber-300">
                {rating === 5 ? '5/5 Divine Experience!' : '4/5 Great Experience!'}
              </span>
            </div>

            <button
              onClick={() => setRating(0)}
              className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Change Rating
            </button>
          </div>

          {/* Ceremony Selection */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
                Select Ceremony Performed:
              </label>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PUJA_CATEGORIES.map((cat) => {
                const isActive = selectedPuja === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedPuja(cat.id)}
                    className={`p-2 rounded-xl text-xs font-medium transition text-left border cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-600/30 font-semibold'
                        : 'bg-stone-900/60 hover:bg-stone-800 text-stone-300 border-white/5'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Recommended Reviews */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-stone-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tap to Select a Review:</span>
              </div>

              <button
                type="button"
                onClick={handleShuffleReviews}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 transition cursor-pointer"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                Shuffle
              </button>
            </div>

            <div className="space-y-2">
              {optionsList.map((opt, idx) => {
                const isSelected = currentText === opt;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentText(opt)}
                    className={`p-3 rounded-xl border text-xs leading-relaxed cursor-pointer transition flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400/80 text-white shadow-sm ring-1 ring-amber-400/50'
                        : 'bg-stone-900/50 hover:bg-stone-900/80 border-white/5 text-stone-300'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-amber-400 bg-amber-400 text-stone-950 font-bold' : 'border-stone-600'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                    <p className="flex-1 text-[11.5px]">{opt}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Editable Textarea */}
          <div className="relative mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Your Review (Edit anytime):
              </label>
              {copied && (
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Copied!
                </span>
              )}
            </div>

            <textarea
              rows={3}
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
              className="w-full p-3 rounded-xl bg-stone-950/70 border border-amber-500/30 focus:border-amber-400 focus:outline-hidden text-stone-100 text-xs leading-relaxed resize-none transition"
            />
          </div>

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={handleCopyAndRedirect}
            className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Copy className="w-4 h-4" />
            <span>Copy Review & Post on Google ⭐⭐⭐⭐⭐</span>
            <ExternalLink className="w-4 h-4" />
          </button>

          {/* 3 Step Instruction */}
          <div className="mt-3 bg-stone-900/60 rounded-xl p-3 border border-white/5 text-[11px] text-stone-400 text-center space-y-1">
            <p className="font-semibold text-amber-300">How It Works:</p>
            <p>1. Tapping the button copies your review automatically.</p>
            <p>2. Google Reviews will open on your screen.</p>
            <p>3. Select <span className="text-amber-400 font-bold">5 Stars</span> and paste your review!</p>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2B: NEGATIVE FLOW (1-3 STARS) -> PRIVATE WHATSAPP (GOOGLE NEVER OPEN)*/}
      {/* ========================================================================= */}
      {rating > 0 && rating <= 3 && (
        <div className="w-full max-w-lg bg-gradient-to-b from-[#231F1D] to-[#1A1816] rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-500/30 relative overflow-hidden backdrop-blur-xl animate-fade-in">
          
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              Private Devotee Support
            </div>

            <button
              onClick={() => setRating(0)}
              className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Change Rating
            </button>
          </div>

          <h2 className="text-lg font-bold text-white mb-1.5">
            We Value Your Feedback
          </h2>
          <p className="text-stone-300 text-xs leading-relaxed mb-4">
            We are dedicated to providing the most authentic and serene Vedic rituals. Please let Pandit Ji know how we can improve our services for you.
          </p>

          <textarea
            rows={4}
            value={privateFeedback}
            onChange={(e) => setPrivateFeedback(e.target.value)}
            placeholder="Please describe your experience or how we can improve..."
            className="w-full p-3.5 rounded-xl bg-stone-950/70 border border-white/10 focus:border-rose-400 focus:outline-hidden text-stone-200 text-xs leading-relaxed resize-none mb-4 transition"
          />

          <button
            type="button"
            onClick={handleSendPrivateWhatsApp}
            className="w-full py-3.5 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Send Private Feedback to Pandit Ji on WhatsApp
          </button>
          <p className="text-center text-stone-500 text-[10px] mt-2">
            Your feedback is 100% confidential and handled personally.
          </p>
        </div>
      )}

      {/* Footer Helpline */}
      <div className="text-center mt-5 text-[11px] text-stone-500 space-y-0.5">
        <p className="font-semibold text-stone-400">North Hindi Pandit • Vedic Puja Services Hyderabad</p>
        <p>Helpline: +91 7772035222 • www.northhindipandit.in</p>
      </div>

    </div>
  );
}
