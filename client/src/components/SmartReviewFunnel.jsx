import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Star, Copy, ExternalLink, MessageCircle, RefreshCw, CheckCircle2, QrCode, Download, Printer, ArrowLeft, Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';
const REVIEW_PAGE_URL = 'https://www.northhindipandit.in/review';

const PUJA_OPTIONS = [
  { id: 'griha_pravesh', labelHi: 'गृहप्रवेश एवं वास्तु शांति', labelEn: 'Griha Pravesh & Vastu Puja' },
  { id: 'satyanarayan', labelHi: 'सत्यनारायण भगवान कथा', labelEn: 'Satyanarayan Vrat Katha' },
  { id: 'rudrabhishek', labelHi: 'महा रुद्राभिषेक एवं हवन', labelEn: 'Maha Rudrabhishek & Hawan' },
  { id: 'vivah', labelHi: 'विवाह / सगाई संस्कार', labelEn: 'Vivah Sanskar / Marriage Puja' },
  { id: 'navchandi', labelHi: 'नवचंडी / दुर्गा पूजन', labelEn: 'Navchandi & Durga Puja' },
  { id: 'other', labelHi: 'अन्य वैदिक पूजन एवं संस्कार', labelEn: 'Other Vedic Puja & Hawan' }
];

const REVIEW_TEMPLATES = {
  griha_pravesh: {
    hi: [
      'पंडित जी ने हमारे नए घर में गृहप्रवेश और वास्तु शांति पूजा संपूर्ण उत्तर भारतीय वैदिक विधि-विधान से संपन्न कराई। सभी मंत्रों का अर्थ बहुत ही सरलता से समझाया। पूजा की संपूर्ण सामग्री भी शुद्ध थी। हैदराबाद में सर्वश्रेष्ठ हिंदी पंडित जी!',
      'हैदराबाद में नए फ्लैट के गृहप्रवेश हेतु पंडित जी की सेवा ली। समय के अत्यंत पाबंद, विद्वान और शांत स्वभाव के हैं। हवन और नवग्रह पूजन बहुत ही श्रद्धा भाव से कराया। पूरे परिवार को बहुत आत्मिक शांति मिली। हर हर महादेव!',
      'It was a blessed and peaceful Griha Pravesh experience in Hyderabad. Pandit ji reached on time, performed all rituals according to authentic North Indian parampara, and explained every vidhi. Highly recommended!',
      'Exceptional Vedic Griha Pravesh and Vastu Puja. Pandit ji performed the hawan without rushing and brought all pure samagri. Best North Indian Hindi pandit in Hyderabad!'
    ],
    en: [
      'It was a divine experience. Pandit ji performed our Griha Pravesh puja in Hyderabad with complete Vedic rituals and pure devotion. He explained all the mantras patiently. Highly recommend his services!',
      'We booked Pandit ji for our new home Griha Pravesh and Vastu Shanti. He arrived promptly on time with all authentic samagri. Everything was done as per pure North Indian traditions. Very satisfied!',
      'Best North Indian Hindi Pandit in Hyderabad. The Griha Pravesh hawan was performed in a deeply spiritual atmosphere. All our family members were impressed by Pandit ji\'s knowledge and humility.'
    ]
  },
  satyanarayan: {
    hi: [
      'श्री सत्यनारायण भगवान की कथा और हवन अत्यंत भक्तिमय वातावरण में संपन्न हुआ। पंडित जी की वाणी में मधुरता और कथा वाचन की शैली अद्भुत है। परिवार के सभी सदस्य बहुत प्रसन्न हुए। उत्तम सेवा!',
      'हैदराबाद में सत्यनारायण व्रत कथा के लिए पंडित जी को बुलाया था। संपूर्ण पूजन विधि, संकल्प और आरती बहुत ही श्रद्धा भाव से कराई। बहुत-बहुत धन्यवाद पंडित जी!',
      'Satyanarayan Katha was performed with great devotion. Pandit ji explained the significance of each chapter very nicely. Highly recommended for any puja in Hyderabad.'
    ],
    en: [
      'Pandit ji conducted Sri Satyanarayan Katha and Hawan with complete devotion. His explanation of the katha in Hindi was clear and soothing. Excellent Vedic service in Hyderabad.',
      'Wonderful experience with Pandit ji for Satyanarayan Puja. Punctual, respectful, and deeply knowledgeable. Five stars for authentic North Indian puja!'
    ]
  },
  rudrabhishek: {
    hi: [
      'भगवान भोलेनाथ का महा रुद्राभिषेक और हवन बहुत ही अलौकिक और दिव्य रहा। पंडित जी के वैदिक मंत्रोच्चार से पूरा घर सकारात्मक ऊर्जा से भर गया। हैदराबाद में ऐसे विद्वान पंडित मिलना सौभाग्य की बात है।',
      'शिवलिंग रुद्राभिषेक और महामृत्युंजय हवन अत्यंत विधि-विधान से कराया। संपूर्ण पूजन सामग्री शुद्ध थी और पंडित जी का मार्गदर्शन श्रेष्ठ रहा। हर हर महादेव!'
    ],
    en: [
      'Maha Rudrabhishek performed by Pandit ji was truly divine. The chanting of Vedic mantras created positive energy throughout the house. Best Hindi pandit in Hyderabad.',
      'Very authentic Rudrabhishek and Hawan puja. Pandit ji explained every ritual patiently. Highly recommend his Vedic services across Hyderabad.'
    ]
  },
  vivah: {
    hi: [
      'विवाह संस्कार की संपूर्ण विधियां - मंडप, जयमाला, सात फेरे और कन्यादान अत्यंत पवित्रता और उत्तर भारतीय परंपरा के अनुसार संपन्न कराईं। पंडित जी का व्यवहार अत्यंत शालीन और आत्मीय रहा।',
      'हैदराबाद में शादी पूजन के लिए उत्तर भारतीय पंडित जी की तलाश थी। पंडित जी ने हर एक रस्म का महत्व समझाया। परिवार के सभी लोगों ने बहुत सराहना की।'
    ],
    en: [
      'Pandit ji conducted the Hindu marriage rituals flawlessly as per authentic North Indian traditions. Very professional, polite, and punctual. Thank you so much!',
      'Outstanding marriage ceremony rituals. Pandit ji made the entire wedding vidhi meaningful by explaining the vows and saptapadi in simple words.'
    ]
  },
  navchandi: {
    hi: [
      'माता रानी का नवचंडी पाठ और हवन अत्यंत भावपूर्ण और नियमपूर्वक संपन्न हुआ। आहुति और आरती के समय बहुत ही दिव्य अनुभूति हुई। धन्यवाद पंडित जी!',
      'दुर्गा सप्तशती पाठ और हवन विधि-विधान से कराया गया। पंडित जी का ज्ञान और समर्पण प्रशंसनीय है। जय माता दी!'
    ],
    en: [
      'Navchandi hawan and puja conducted with pure Vedic precision. Pandit ji\'s devotion and discipline were remarkable. Highly recommended in Hyderabad!'
    ]
  },
  other: {
    hi: [
      'पंडित जी की पूजा सेवा अत्यंत सराहनीय रही। समय पर पधार कर संपूर्ण वैदिक विधि से पूजा संपन्न कराई। बहुत ही विद्वान और विनीत स्वभाव के हैं।',
      'हैदराबाद में उत्तर भारतीय परंपरा अनुसार पूजा कराने के लिए सबसे विश्वसनीय पंडित जी। पूजा सामग्री से लेकर संकल्प तक सब कुछ उत्तम रहा।'
    ],
    en: [
      'Very satisfied with Pandit ji\'s Vedic puja services in Hyderabad. Polite, punctual, and knowledgeable. Will definitely book again for future pujas.',
      'Great experience with Pandit ji. Authentic rituals, peaceful atmosphere, and honest dakshina. 5-star recommended for all North Indian families in Hyderabad.'
    ]
  }
};

export default function SmartReviewFunnel({ onGoHome }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState('griha_pravesh');
  const [reviewLang, setReviewLang] = useState('hi');
  const [reviewText, setReviewText] = useState('');
  const [copied, setCopied] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const posterCanvasRef = useRef(null);

  // Generate initial QR code
  useEffect(() => {
    QRCode.toDataURL(REVIEW_PAGE_URL, {
      width: 320,
      margin: 2,
      color: {
        dark: '#7C2D12', // Warm saffron maroon
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Gen error:', err));
  }, []);

  // Update suggested review text when puja or language changes
  useEffect(() => {
    generateRandomReview();
  }, [selectedPuja, reviewLang]);

  const generateRandomReview = () => {
    const list = REVIEW_TEMPLATES[selectedPuja]?.[reviewLang] || REVIEW_TEMPLATES.other.hi;
    const randomItem = list[Math.floor(Math.random() * list.length)];
    setReviewText(randomItem);
    setCopied(false);
  };

  const handleRatingSelect = (star) => {
    setRating(star);
    if (star === 5) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const handleCopyAndOpenGoogle = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(reviewText).catch(() => {});
    }
    setCopied(true);
    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch {}

    // Open Google Review Link after a tiny moment so the user sees the copy confirmation
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 700);
  };

  const handleSendPrivateWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते पंडित जी, मुझे पूजा सेवा के संदर्भ में एक सुझाव/फीडबैक देना है (रेटिंग: ${rating}/5):\n\n${privateFeedback || 'कृपया मुझसे संपर्क करें।'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Draw printable poster on canvas for downloading
  const drawAndDownloadPoster = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');

    // Background gradient (warm spiritual cream/gold)
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1600);
    bgGrad.addColorStop(0, '#FFFDF9');
    bgGrad.addColorStop(0.5, '#FFF7ED');
    bgGrad.addColorStop(1, '#FEF3C7');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1600);

    // Decorative Borders
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, 1140, 1540);

    ctx.strokeStyle = '#9A3412';
    ctx.lineWidth = 4;
    ctx.strokeRect(48, 48, 1104, 1504);

    // Header Shloka
    ctx.fillStyle = '#9A3412';
    ctx.font = 'bold 36px "Noto Serif Devanagari", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('॥ ॐ श्री गणेशाय नमः ॥', 600, 110);

    // Main Brand Name
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 62px "Outfit", Arial, sans-serif';
    ctx.fillText('NORTH HINDI PANDIT', 600, 190);

    ctx.fillStyle = '#B45309';
    ctx.font = '600 34px "Outfit", Arial, sans-serif';
    ctx.fillText('Vedic Puja, Hawan & Sanskar Services | Hyderabad', 600, 240);

    // Divider Line with Om symbol
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(150, 275);
    ctx.lineTo(540, 275);
    ctx.moveTo(660, 275);
    ctx.lineTo(1050, 275);
    ctx.stroke();

    ctx.font = 'bold 44px serif';
    ctx.fillStyle = '#D97706';
    ctx.fillText('ॐ', 600, 288);

    // Callout Box
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(100, 330, 1000, 140, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#9A3412';
    ctx.font = 'bold 36px "Noto Serif Devanagari", Arial, sans-serif';
    ctx.fillText('पूजा उपरांत अपने अनुभव व आशीर्वाद साझा करें', 600, 390);

    ctx.fillStyle = '#4B5563';
    ctx.font = '500 26px Arial, sans-serif';
    ctx.fillText('Scan this QR with your phone camera to review in 10 seconds', 600, 435);

    // Draw QR Code
    if (qrDataUrl) {
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.onload = () => {
        // QR Code Container Card
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 10;
        ctx.beginPath();
        ctx.roundRect(320, 520, 560, 560, 24);
        ctx.fill();
        ctx.shadowColor = 'transparent';

        ctx.strokeStyle = '#F59E0B';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.drawImage(qrImg, 350, 550, 500, 500);

        // 3 Simple Steps below QR
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.fillText('⭐⭐⭐⭐⭐ 3 आसान चरण (Easy Steps)', 600, 1140);

        ctx.font = '500 26px Arial, sans-serif';
        ctx.fillStyle = '#374151';
        ctx.fillText('1. कैमरा से QR कोड स्कैन करें (Scan QR Code)', 600, 1200);
        ctx.fillText('2. अपनी पसंद का सुंदर रिव्यू चुनें (Select AI Review)', 600, 1250);
        ctx.fillText('3. Google पर 5-Star के साथ पोस्ट करें (Post on Google)', 600, 1300);

        // Footer banner
        ctx.fillStyle = '#7C2D12';
        ctx.beginPath();
        ctx.roundRect(80, 1370, 1040, 150, 16);
        ctx.fill();

        ctx.fillStyle = '#FEF3C7';
        ctx.font = 'bold 34px Arial, sans-serif';
        ctx.fillText('📞 Booking & Inquiries: +91 7772035222', 600, 1430);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '500 26px Arial, sans-serif';
        ctx.fillText('🌐 Official Website: www.northhindipandit.in', 600, 1480);

        // Trigger Download
        const a = document.createElement('a');
        a.download = 'North_Hindi_Pandit_Review_QR_Poster.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
      };
      qrImg.src = qrDataUrl;
    }
  };

  const isPositiveRating = rating >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F5EBE1] text-[#2D2A26] py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-white/80 hover:bg-white px-4 py-2 rounded-full border border-amber-200 shadow-xs text-sm font-medium transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य वेबसाइट (Home)
          </button>

          <button
            onClick={() => setShowPosterModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-full shadow-md text-sm font-semibold transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            QR पोस्टर डाउनलोड करें
          </button>
        </div>

        {/* Header Card */}
        <div className="text-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
          
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-serif text-3xl font-bold">
            ॐ
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mb-2">
            यजमान अनुभव एवं आशीर्वाद
          </h1>
          <p className="text-amber-800/80 text-sm sm:text-base max-w-xl mx-auto">
            North Hindi Pandit - Vedic Puja Services Hyderabad. पूजा उपरांत अपना अमूल्य अनुभव साझा कर हमें अनुगृहीत करें।
          </p>

          {/* Interactive Star Rating */}
          <div className="mt-6 pt-5 border-t border-amber-100">
            <p className="text-xs uppercase tracking-wider font-semibold text-amber-900/70 mb-3">
              पंडित जी की पूजा सेवा आपको कैसी लगी? (रेटिंग दें)
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
                    onClick={() => handleRatingSelect(star)}
                    className="p-1 sm:p-2 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                  >
                    <Star
                      className={`w-9 h-9 sm:w-11 sm:h-11 transition-colors ${
                        isFilled
                          ? 'fill-amber-400 text-amber-500 filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-sm font-semibold text-amber-900">
              {rating === 5 && '⭐⭐⭐⭐⭐ परम संतुष्ट एवं दिव्य अनुभव!'}
              {rating === 4 && '⭐⭐⭐⭐ बहुत अच्छा अनुभव!'}
              {rating === 3 && '⭐⭐⭐ सामान्य अनुभव'}
              {rating <= 2 && 'सुधार की आवश्यकता'}
            </div>
          </div>
        </div>

        {/* 4 or 5 STAR FLOW: POSITIVE AI ASSISTANT -> GOOGLE */}
        {isPositiveRating ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-100 relative">
            <div className="flex items-center gap-2 mb-4 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full w-fit text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              AI स्मार्ट रिव्यू रेकमेंडेशन
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-4">
              कौन सी पूजा संपन्न हुई? (चुनें)
            </h2>

            {/* Puja Selection Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-6">
              {PUJA_OPTIONS.map((puja) => {
                const isSelected = selectedPuja === puja.id;
                return (
                  <button
                    key={puja.id}
                    type="button"
                    onClick={() => setSelectedPuja(puja.id)}
                    className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition text-left border cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {reviewLang === 'hi' ? puja.labelHi : puja.labelEn}
                  </button>
                );
              })}
            </div>

            {/* Language & Regenerate Bar */}
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold uppercase text-stone-500 tracking-wider">
                सुझाया गया रिव्यू (आप इसे बदल भी सकते हैं)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReviewLang(reviewLang === 'hi' ? 'en' : 'hi')}
                  className="text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition cursor-pointer"
                >
                  {reviewLang === 'hi' ? 'Switch to English' : 'हिंदी में बदलें'}
                </button>
                <button
                  type="button"
                  onClick={generateRandomReview}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  दूसरा दिखाएं
                </button>
              </div>
            </div>

            {/* Editable Review Textarea */}
            <div className="relative mb-6">
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-amber-50/50 border-2 border-amber-200 focus:border-amber-500 focus:bg-white focus:outline-hidden text-stone-800 text-sm sm:text-base leading-relaxed resize-none transition shadow-inner"
                placeholder="अपना अनुभव यहाँ लिखें..."
              />
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) navigator.clipboard.writeText(reviewText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 bg-white/80 hover:bg-white p-1.5 rounded-lg border border-stone-200 shadow-xs text-xs font-medium inline-flex items-center gap-1 transition cursor-pointer"
                title="टेक्स्ट कॉपी करें"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="text-[11px]">{copied ? 'कॉपी हुआ' : 'कॉपी'}</span>
              </button>
            </div>

            {/* Main Action Button to Post on Google */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCopyAndOpenGoogle}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base sm:text-lg shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Copy className="w-5 h-5" />
                रिव्यू कॉपी करें और Google पर 5-Star दें
                <ExternalLink className="w-5 h-5 ml-1" />
              </button>

              {copied && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs sm:text-sm font-semibold text-emerald-800 animate-fade-in flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  रिव्यू कॉपी हो गया! अब Google Maps पर 5-स्टार दबाकर Paste कर दें।
                </div>
              )}

              <p className="text-center text-stone-500 text-xs mt-2">
                बटन दबाते ही रिव्यू कॉपी होकर सीधे Google Business Profile खुल जाएगा।
              </p>
            </div>
          </div>
        ) : (
          /* 1, 2, 3 STAR FLOW: PRIVATE FEEDBACK FILTER -> WHATSAPP (GOOGLE PROTECTED) */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100">
            <div className="flex items-center gap-2 text-rose-800 bg-rose-50 px-3 py-1.5 rounded-full w-fit text-xs font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              निजी सहायता एवं समाधान
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
              हर हर महादेव! हमें खेद है कि आपको पूर्ण संतुष्टि नहीं मिली।
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              हम अपनी वैदिक पूजा सेवा को सर्वोत्तम बनाने के लिए सदैव प्रयासरत हैं। कृपया अपना सुझाव या जो भी असुविधा हुई, वह सीधे पंडित जी व संचालक को भेजें ताकि हम तुरंत इस पर सुधार कर सकें।
            </p>

            <textarea
              rows={4}
              value={privateFeedback}
              onChange={(e) => setPrivateFeedback(e.target.value)}
              placeholder="कृपया बताएं कि क्या सुधार किया जा सकता था या क्या कमी रही..."
              className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:bg-white focus:outline-hidden text-stone-800 text-sm leading-relaxed resize-none mb-4 transition"
            />

            <button
              type="button"
              onClick={handleSendPrivateWhatsApp}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              सीधे WhatsApp पर पंडित जी को सुझाव भेजें
            </button>
            <p className="text-center text-stone-400 text-xs mt-2">
              आपकी प्रतिक्रिया गोपनीय रखी जाएगी और संचालक तुरंत संपर्क करेंगे।
            </p>
          </div>
        )}

        {/* Footer Support Info */}
        <div className="text-center mt-8 text-xs text-stone-500 space-y-1">
          <p className="font-semibold text-stone-700">North Hindi Pandit - Vedic Puja Services Hyderabad</p>
          <p>Helpline: +91 7772035222 | Website: www.northhindipandit.in</p>
        </div>

      </div>

      {/* QR CODE POSTER MODAL (FOR PRINTING / DOWNLOADING) */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-amber-200">
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-2xl font-serif text-amber-600">ॐ</span>
              <h3 className="text-xl font-bold text-amber-950 font-serif">
                रिव्यू QR कोड पोस्टर
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                इसे डाउनलोड करके प्रिंट करवा लें या फोन में सेव करके यजमानों से स्कैन कराएं।
              </p>
            </div>

            {/* Poster Card Preview */}
            <div className="bg-gradient-to-b from-[#FFFDF9] to-[#FEF3C7] p-6 rounded-2xl border-2 border-amber-300 shadow-inner text-center">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-1">
                NORTH HINDI PANDIT HYDERABAD
              </p>
              <p className="text-sm font-serif font-bold text-stone-900 mb-4">
                पूजा उपरांत आशीर्वाद व अनुभव साझा करें
              </p>

              {/* QR Image */}
              <div className="bg-white p-4 rounded-xl shadow-md inline-block mx-auto mb-3 border border-amber-200">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Review QR Code" className="w-48 h-48 mx-auto" />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center text-xs text-stone-400">QR Loading...</div>
                )}
              </div>

              <div className="flex justify-center items-center gap-1 text-amber-500 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>

              <p className="text-[11px] text-stone-600 font-medium">
                फोन कैमरा से स्कैन करें ➔ रिव्यू चुनें ➔ Google पर 5-Star दें
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={drawAndDownloadPoster}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                पोस्टर डाउनलोड करें (High Quality Image)
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                सीधा प्रिंट करें (Print)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
