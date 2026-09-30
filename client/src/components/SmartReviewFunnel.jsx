import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Copy, ExternalLink, MessageCircle, RefreshCw, CheckCircle2, ArrowLeft, Sparkles, ShieldCheck, Check, HeartHandshake, Share2 } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';

const PUJA_CATEGORIES = [
  { id: 'griha_pravesh', name: 'Griha Pravesh & Vastu', icon: '🏠' },
  { id: 'satyanarayan', name: 'Satyanarayan Katha', icon: '🪔' },
  { id: 'rudrabhishek', name: 'Maha Rudrabhishek', icon: '🔱' },
  { id: 'vivah', name: 'Wedding & Vivah Sanskar', icon: '💍' },
  { id: 'navchandi', name: 'Navchandi & Durga Hawan', icon: '🌺' },
  { id: 'other', name: 'Vedic Hawan & Puja', icon: '🕉️' }
];

// Rich, authentic, and naturally phrased 5-star English review combinations
const REVIEW_PARTS = {
  griha_pravesh: {
    openers: [
      'We booked Pandit ji for our new flat Griha Pravesh and Vastu Shanti in Hyderabad.',
      'Had an exceptional experience with Pandit ji for our new home housewarming ceremony.',
      'Pandit ji conducted our Griha Pravesh and Vastu puja with complete Vedic vidhi.',
      'Booked North Hindi Pandit for our family Griha Pravesh in Hyderabad, and it was truly wonderful.'
    ],
    details: [
      'He arrived on time with pure samagri and performed the Hawan and Navagraha rituals with utter devotion.',
      'The sacred Sanskrit mantras and their clear explanation made the atmosphere peaceful and positive.',
      'Every ritual was conducted patiently without any rush, explaining the spiritual significance of each step.',
      'The Hawan, Kalash Sthapana, and Vastu Shanti created a deeply divine vibe throughout the house.'
    ],
    praise: [
      'Pandit ji is extremely polite, humble, and punctual.',
      'All our family members and elders were deeply satisfied with his authentic Vedic knowledge.',
      'Finding such a genuine North Indian Hindi Pandit in Hyderabad was a real blessing.'
    ],
    closers: [
      'Highly recommended for all North Indian families in Hyderabad! 5 Stars!',
      'Will definitely book Pandit ji for all future family rituals. Truly divine experience!',
      'Grateful for his blessings and seamless service. Highly recommended!'
    ]
  },
  satyanarayan: {
    openers: [
      'Pandit ji performed the Sri Satyanarayan Katha and Hawan with pure devotion.',
      'We organized a Satyanarayan Puja at home and Pandit ji conducted it beautifully.',
      'Booked Pandit ji for Satyanarayan Vrat Katha in Hyderabad, and the experience was divine.'
    ],
    details: [
      'His Hindi katha narration was so melodious, clear, and engaging for all family members.',
      'He brought pure puja samagri and carried out the Hawan, Aarti, and Panchamrit bhog with complete purity.',
      'All five chapters were explained with great patience and spiritual insight.'
    ],
    praise: [
      'Pandit ji is very knowledgeable, soft-spoken, and respectful.',
      'The entire house felt spiritually recharged with sacred peace and positivity.',
      'His dedication to Vedic traditions is truly commendable.'
    ],
    closers: [
      'Best Pandit for Satyanarayan Puja in Hyderabad. Jai Sri Hari Vishnu!',
      'Highly satisfied with the service and highly recommend him to everyone.',
      'Truly a five-star divine experience. Thank you Pandit ji!'
    ]
  },
  rudrabhishek: {
    openers: [
      'Had the privilege of performing Maha Rudrabhishek and Shiva Hawan with Pandit ji.',
      'Booked Pandit ji for home Rudrabhishek and Mahamrityunjaya chanting in Hyderabad.',
      'Pandit ji conducted our Shivling Rudrabhishek with authentic Vedic vidhi.'
    ],
    details: [
      'The Vedic chanting of Rudri Path was crisp, powerful, and resonated with pure divine energy.',
      'The Panchamrit abhishek, Bhasma offering, and Hawan were completed with utmost discipline.',
      'He patiently guided us through every sankalp and mantra with great reverence.'
    ],
    praise: [
      'His mastery over Sanskrit Vedic shlokas is truly exceptional.',
      'Created a deeply serene and sanctified atmosphere in our home.'
    ],
    closers: [
      'Best North Indian Pandit in Hyderabad for Shiva Puja. Har Har Mahadev!',
      'Deeply blessed and grateful for his sacred guidance. 5 Stars!',
      'Outstanding experience, unconditionally recommended!'
    ]
  },
  vivah: {
    openers: [
      'Pandit ji conducted our complete North Indian wedding ceremony and sacred pheras.',
      'We engaged Pandit ji for our wedding rituals in Hyderabad as per pure Vedic parampara.'
    ],
    details: [
      'He explained the significance of Kanyadaan, Saptapadi (7 vows), and Sindoor ritual with great clarity.',
      'Everything was conducted strictly according to auspicious muhurat without any unnecessary delays.',
      'His Vedic chanting and blessings added immense dignity and grace to our wedding day.'
    ],
    praise: [
      'Very gentle, punctual, and highly respected by both families and all guests.',
      'Made our special milestone memorable and spiritually rich.'
    ],
    closers: [
      'Most trusted North Indian wedding priest in Hyderabad. Thank you Pandit ji!',
      'A blessed and memorable wedding ceremony. 100% recommended!'
    ]
  },
  navchandi: {
    openers: [
      'Pandit ji performed our Navchandi Paath and Durga Hawan with complete devotion.',
      'Had an uplifting experience conducting Durga Saptashati and Hawan at home.'
    ],
    details: [
      'The Hawan ahutis, shlokas, and Durga Aarti filled the house with immense positive energy.',
      'He took care of every single Vedic detail and ensured pure rituals.'
    ],
    praise: [
      'His spiritual presence and knowledge of Devi mantras are remarkable.',
      'Punctual, polite, and deeply dedicated to authentic traditions.'
    ],
    closers: [
      'Jai Mata Di! Best Hindi Pandit in Hyderabad for Devi puja and hawan.',
      'Truly satisfied and blessed. Highly recommended!'
    ]
  },
  other: {
    openers: [
      'Booked North Hindi Pandit for our family Vedic puja and Hawan in Hyderabad.',
      'Pandit ji conducted our family prayer ceremony with pure devotion and dedication.',
      'Had an authentic North Indian puja experience with Pandit ji in Hyderabad.'
    ],
    details: [
      'He arrived right on time with pure puja items and performed every ritual as per tradition.',
      'Chanted Sanskrit mantras with clear pronunciation and explained their sacred meanings.',
      'Created a serene, auspicious, and peaceful spiritual vibe at our home.'
    ],
    praise: [
      'Very humble, punctual, and strictly follows authentic Vedic customs.',
      'Our entire family felt completely satisfied and at peace.'
    ],
    closers: [
      'Best North Indian Hindi Pandit in Hyderabad! Highly recommended.',
      'Will certainly contact Pandit ji for all future occasions. 5 Stars!',
      'A truly divine and memorable puja experience. Thank you!'
    ]
  }
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEnglishReviews(pujaId) {
  const data = REVIEW_PARTS[pujaId] || REVIEW_PARTS.other;
  const list = [];
  const used = new Set();

  for (let i = 0; i < 6 && list.length < 3; i++) {
    const opener = getRandomItem(data.openers);
    const detail = getRandomItem(data.details);
    const praise = getRandomItem(data.praise);
    const closer = getRandomItem(data.closers);
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
  const [selectedPuja, setSelectedPuja] = useState('griha_pravesh');
  const [optionsList, setOptionsList] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [copied, setCopied] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');

  // Generate initial reviews
  useEffect(() => {
    const list = generateEnglishReviews(selectedPuja);
    setOptionsList(list);
    if (list.length > 0) {
      setCurrentText(list[0]);
    }
  }, [selectedPuja]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (newRating >= 4) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.3 }
        });
      } catch {}
    }
  };

  const refreshSuggestions = () => {
    const list = generateEnglishReviews(selectedPuja);
    setOptionsList(list);
    if (list.length > 0) {
      setCurrentText(list[0]);
    }
  };

  const handleCopyAndRedirect = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentText).catch(() => {});
    }
    setCopied(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {}

    // Open Google Review Link directly
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleSendPrivateWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Pandit Ji, I would like to share private feedback regarding our puja ceremony (Rating: ${rating}/5 Stars):\n\n${privateFeedback || 'Please get in touch with me.'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const isPositive = rating >= 4;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-sans antialiased py-6 px-4 sm:px-6">
      <div className="max-w-xl mx-auto">
        
        {/* Top Minimal Navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-1.5 text-amber-950 hover:text-amber-700 bg-white px-3.5 py-1.5 rounded-full border border-amber-200/80 shadow-xs text-xs font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Website
          </button>

          <span className="text-[11px] font-semibold tracking-wider text-amber-800 uppercase bg-amber-100/60 px-2.5 py-1 rounded-full">
            Official Review Portal
          </span>
        </div>

        {/* Hero Card */}
        <div className="text-center bg-white rounded-3xl p-6 sm:p-7 shadow-xl shadow-amber-950/5 border border-amber-200/70 relative overflow-hidden mb-5">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
          
          {/* Sacred Om Badge */}
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/25 text-white font-serif text-3xl font-bold">
            ॐ
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif mb-1.5">
            Share Your Experience
          </h1>
          <p className="text-amber-900/80 text-xs sm:text-sm font-medium max-w-md mx-auto">
            North Hindi Pandit • Authentic Vedic Puja Services Hyderabad
          </p>

          {/* Interactive Star Rating */}
          <div className="mt-5 pt-4 border-t border-amber-100/80">
            <p className="text-xs uppercase tracking-wider font-bold text-stone-600 mb-2.5">
              How was your Puja experience with Pandit Ji?
            </p>
            
            <div className="flex justify-center items-center gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleRatingChange(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                    aria-label={`Rate ${star} Stars`}
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-all ${
                        isFilled
                          ? 'fill-amber-400 text-amber-500 filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]'
                          : 'text-stone-200 hover:text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 text-xs sm:text-sm font-bold text-amber-900">
              {rating === 5 && '⭐⭐⭐⭐⭐ Divine, Blessed & Highly Satisfied!'}
              {rating === 4 && '⭐⭐⭐⭐ Wonderful Spiritual Experience!'}
              {rating === 3 && '⭐⭐⭐ Satisfactory Experience'}
              {rating <= 2 && 'Needs Improvement'}
            </div>
          </div>
        </div>

        {/* 4 OR 5 STARS: AI REVIEW GENERATOR -> DIRECT TO GOOGLE */}
        {isPositive ? (
          <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-amber-950/5 border border-amber-200/70">
            
            {/* Header info */}
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-1.5 text-amber-900 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                AI Suggested Reviews
              </div>

              <button
                type="button"
                onClick={refreshSuggestions}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-100/60 hover:bg-amber-100 px-3 py-1 rounded-full transition cursor-pointer"
                title="Shuffle New Variations"
              >
                <RefreshCw className="w-3 h-3 text-amber-700" />
                Shuffle Reviews
              </button>
            </div>

            {/* Puja Ceremony Selector */}
            <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
              Select Ceremony Performed:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-5">
              {PUJA_CATEGORIES.map((cat) => {
                const active = selectedPuja === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedPuja(cat.id)}
                    className={`p-2 sm:p-2.5 rounded-xl text-xs font-semibold transition text-left border cursor-pointer flex items-center gap-1.5 ${
                      active
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25'
                        : 'bg-stone-50 hover:bg-amber-50/60 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Pick from 3 AI Suggestions */}
            <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
              Tap to choose a review (or edit below):
            </label>
            <div className="space-y-2.5 mb-4">
              {optionsList.map((opt, idx) => {
                const isSelected = currentText === opt;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentText(opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed cursor-pointer transition flex items-start gap-3 ${
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
                    <p className="flex-1">"{opt}"</p>
                  </div>
                );
              })}
            </div>

            {/* Editable Selected Review Box */}
            <div className="relative mb-5">
              <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-1.5">
                Your Review (Feel free to customize):
              </label>
              <textarea
                rows={4}
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-amber-50/30 border border-amber-300 focus:border-amber-500 focus:bg-white focus:outline-hidden text-stone-800 text-xs sm:text-sm leading-relaxed resize-none shadow-inner transition"
              />
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) navigator.clipboard.writeText(currentText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-8 right-2.5 text-stone-600 hover:text-stone-900 bg-white/95 px-2.5 py-1 rounded-lg border border-stone-200 shadow-xs text-xs font-medium inline-flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-amber-600" />}
                <span className="text-[11px]">{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Main Action Button */}
            <div className="space-y-3">
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
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs font-semibold text-emerald-800 flex items-center justify-center gap-2 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Review copied! Opening Google Maps — tap 5-Stars and Paste!
                </div>
              )}

              {/* 3 Simple Steps Guide */}
              <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 text-[11px] text-stone-600 space-y-1">
                <div className="font-bold text-stone-700">How to Post in 10 Seconds:</div>
                <div>1. Tap the orange button above (your review is automatically copied).</div>
                <div>2. Google Reviews will open directly on your screen.</div>
                <div>3. Select <span className="font-bold text-amber-700">5 Stars</span> and paste your review!</div>
              </div>
            </div>

          </div>
        ) : (
          /* 1, 2, 3 STARS: PRIVATE FEEDBACK FILTER -> WHATSAPP (GOOGLE NEVER OPENED) */
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-rose-200">
            <div className="flex items-center gap-2 text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full w-fit text-xs font-bold mb-3">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              Private Feedback & Support
            </div>

            <h2 className="text-lg font-bold text-stone-900 mb-1 font-serif">
              We Value Your Experience
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
              We are dedicated to providing the most authentic and serene Vedic rituals. Please let Pandit Ji know how we can improve our services for you.
            </p>

            <textarea
              rows={4}
              value={privateFeedback}
              onChange={(e) => setPrivateFeedback(e.target.value)}
              placeholder="Please describe your experience or how we can improve..."
              className="w-full p-3.5 rounded-2xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:bg-white focus:outline-hidden text-stone-800 text-xs sm:text-sm leading-relaxed resize-none mb-4 transition"
            />

            <button
              type="button"
              onClick={handleSendPrivateWhatsApp}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              Send Private Feedback to Pandit Ji on WhatsApp
            </button>
            <p className="text-center text-stone-400 text-[11px] mt-2">
              Your feedback is 100% confidential and handled personally.
            </p>
          </div>
        )}

        {/* Clean Footer */}
        <div className="text-center mt-6 text-[11px] text-stone-500 space-y-0.5">
          <p className="font-semibold text-stone-700">North Hindi Pandit • Hyderabad Vedic Priest Services</p>
          <p>Helpline: +91 7772035222 • www.northhindipandit.in</p>
        </div>

      </div>
    </div>
  );
}
