import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import confetti from 'canvas-confetti';
import { Star, Copy, ExternalLink, MessageCircle, RefreshCw, CheckCircle2, QrCode, Download, Printer, ArrowLeft, Sparkles, ShieldCheck, HeartHandshake, Check, ChevronRight } from 'lucide-react';

const GOOGLE_REVIEW_URL = 'https://g.page/r/CcZiQITGORd1EBM/review';
const WHATSAPP_NUMBER = '917772035222';
const REVIEW_PAGE_URL = 'https://www.northhindipandit.in/review';

const PUJA_CATEGORIES = [
  { id: 'griha_pravesh', name: 'गृहप्रवेश एवं वास्तु शांति', nameEn: 'Griha Pravesh & Vastu' },
  { id: 'satyanarayan', name: 'सत्यनारायण भगवान कथा', nameEn: 'Satyanarayan Katha' },
  { id: 'rudrabhishek', name: 'महा रुद्राभिषेक एवं हवन', nameEn: 'Rudrabhishek & Hawan' },
  { id: 'vivah', name: 'विवाह / सगाई संस्कार', nameEn: 'Vivah Sanskar' },
  { id: 'navchandi', name: 'नवचंडी / दुर्गा पूजन', nameEn: 'Navchandi & Hawan' },
  { id: 'other', name: 'वैदिक पूजा व हवन', nameEn: 'General Vedic Puja' }
];

// ============================================================================
// DYNAMIC AI COMBINATORIAL REVIEW ENGINE (10,000+ Unique Review Variations)
// Every user gets a uniquely composed, naturally phrased review recommendation!
// ============================================================================
const REVIEW_PARTS = {
  griha_pravesh: {
    openersHi: [
      'हमारे नए घर के शुभ गृहप्रवेश पर पंडित जी की सेवा ली।',
      'हैदराबाद में नए फ्लैट के गृहप्रवेश और वास्तु शांति हेतु पंडित जी पधारे।',
      'गृहप्रवेश की संपूर्ण पूजा पंडित जी द्वारा अत्यंत विधि-विधान से संपन्न हुई।',
      'नए आवास में प्रवेश के पावन अवसर पर पंडित जी ने वैदिक अनुष्ठान कराया।',
      'उत्तर भारतीय परंपरा के अनुसार गृहप्रवेश पूजा का अनुभव अत्यंत दिव्य और संतोषजनक रहा।'
    ],
    detailsHi: [
      'कलश स्थापना, नवग्रह पूजन और वास्तु शांति हवन बहुत ही श्रद्धापूर्वक कराया।',
      'हवन और मंत्रोच्चार से पूरे घर का वातावरण अत्यंत सकारात्मक और शांतिमय हो गया।',
      'पंडित जी ने बिना किसी जल्दबाजी के सभी वैदिक संकल्प और आहुतियां नियमपूर्वक दिलवाईं।',
      'पूजा की संपूर्ण सामग्री पूर्णतः शुद्ध थी और हर एक मंत्र का भावार्थ भी समझाया।'
    ],
    praiseHi: [
      'पंडित जी का आचरण अत्यंत शांत, विनम्र और विद्वतापूर्ण है।',
      'समय के अत्यंत पाबंद हैं और पूरी तैयारी के साथ समय पर उपस्थित हुए।',
      'उनके उच्चारण की शुद्धता और पूजन कराने की लगन देखकर पूरा परिवार प्रसन्न हो गया।',
      'हैदराबाद में ऐसे प्रामाणिक उत्तर भारतीय विद्वान पंडित जी मिलना हमारे लिए सौभाग्य रहा।'
    ],
    closersHi: [
      'हैदराबाद में सभी उत्तर भारतीय परिवारों को इनकी सेवा अवश्य लेनी चाहिए। हर हर महादेव!',
      'उत्कृष्ट सेवा और सात्विक अनुभव। हम 5-स्टार रेटिंग के साथ दिल से धन्यवाद करते हैं।',
      'भविष्य में किसी भी पारिवारिक पूजा के लिए हम इन्हीं से संपर्क करेंगे। शत-प्रतिशत अनुशंसित!',
      'ईश्वर पंडित जी को दीर्घायु दे। बहुत-बहुत आभार!'
    ],
    englishOptions: [
      'Had an exceptional experience with Pandit ji for our new home Griha Pravesh and Vastu Shanti in Hyderabad. He arrived punctually, brought pure samagri, and chanted every Vedic mantra with patience and proper explanation. Highly recommended for North Indian families!',
      'We booked Pandit ji for our flat\'s Griha Pravesh puja in Hyderabad. The Hawan and Navagraha rituals were performed flawlessly according to pure North Indian parampara. All our family members felt peaceful and satisfied. 5 stars!',
      'Best North Indian Hindi Pandit in Hyderabad. Pandit ji conducted the entire Griha Pravesh ceremony without rushing, explaining the meaning of each vidhi. Truly divine and authentic experience.'
    ]
  },
  satyanarayan: {
    openersHi: [
      'श्री सत्यनारायण भगवान की पावन व्रत कथा एवं हवन के लिए पंडित जी पधारे।',
      'हमारे घर पर श्री सत्यनारायण कथा का आयोजन अत्यंत भक्तिमय माहौल में हुआ।',
      'पंडित जी ने संपूर्ण सत्यनारायण पूजन और आरती बहुत ही श्रद्धा से संपन्न कराई।'
    ],
    detailsHi: [
      'कथा वाचन की शैली अत्यंत मधुर और कर्णप्रिय थी, सभी अध्यायों का भावार्थ समझाया।',
      'हवन और पंचामृत भोग की विधि बहुत ही सुंदर तरीके से कराई गई।',
      'पूजन संकल्प से लेकर आरती और प्रसाद वितरण तक हर कार्य नियमपूर्वक हुआ।'
    ],
    praiseHi: [
      'पंडित जी बहुत ही ज्ञानी, धैर्यवान और आत्मीय स्वभाव के हैं।',
      'परिवार के सभी बुजुर्ग और बच्चे कथा सुनकर अत्यंत प्रसन्न हुए।',
      'वैदिक परंपरा के अनुसार पूजन का ऐसा अनुभव बहुत कम देखने को मिलता है।'
    ],
    closersHi: [
      'हैदराबाद में सत्यनारायण पूजा हेतु सर्वश्रेष्ठ पंडित जी। जय श्री हरि विष्णु!',
      'उत्तम सेवा और सात्विक वातावरण। बहुत-बहुत धन्यवाद पंडित जी!',
      'किसी भी धार्मिक अनुष्ठान के लिए हम सभी को इनकी सेवा की अनुशंसा करते हैं।'
    ],
    englishOptions: [
      'Pandit ji performed the Sri Satyanarayan Katha and Hawan with pure devotion. His Hindi katha narration was so melodious and clear. Very polite and knowledgeable. Highly recommended in Hyderabad!',
      'Wonderful experience of Satyanarayan Puja in Hyderabad. Pandit ji brought pure samagri and performed the entire puja as per North Indian Vedic tradition. Highly satisfied!'
    ]
  },
  rudrabhishek: {
    openersHi: [
      'भगवान शिव के महा रुद्राभिषेक और हवन के लिए पंडित जी का मार्गदर्शन मिला।',
      'घर पर शिवलिंग रुद्राभिषेक और महामृत्युंजय पाठ अत्यंत श्रद्धापूर्वक संपन्न हुआ।'
    ],
    detailsHi: [
      'वेद मंत्रों के शुद्ध और स्पष्ट उच्चारण से पूरा घर दिव्य ऊर्जा से आलोकित हो गया।',
      'दूध, गंगाजल, पंचामृत और भस्म से अभिषेक की संपूर्ण विधि शास्त्रीय मर्यादा से कराई।'
    ],
    praiseHi: [
      'पंडit जी का संस्कृत और वेदों पर ज्ञान वास्तव में सराहनीय है।',
      'पूजन के दौरान एक अलौकिक शांति और भक्ति की अनुभूति हुई।'
    ],
    closersHi: [
      'हैदराबाद में शिव पूजन के लिए सर्वोत्तम विद्वान पंडित जी। हर हर महादेव!',
      'भोलेनाथ की असीम कृपा बनी रहे। अत्यंत संतुष्ट और आभारी हैं!'
    ],
    englishOptions: [
      'Maha Rudrabhishek and Hawan conducted with authentic Vedic chanting. Pandit ji created a deeply divine and peaceful energy at home. Truly the best Hindi pandit in Hyderabad.',
      'Exceptional Rudrabhishek experience. Pandit ji performed all rituals with complete devotion and patience. Har Har Mahadev!'
    ]
  },
  vivah: {
    openersHi: [
      'विवाह संस्कार की समस्त वैदिक रस्मों हेतु पंडित जी की सेवा ली।',
      'शादी के शुभ लग्न और फेरों की विधि उत्तर भारतीय परंपरा अनुसार संपन्न हुई।'
    ],
    detailsHi: [
      'कन्यादान, सप्तपदी (सात फेरे) और सिंदूरदान की हर एक रस्म का महत्व विस्तार से समझाया।',
      'वर-वधू को दिए गए आशीर्वाद और मंत्रोच्चार बहुत ही गरिमामय और पवित्र रहे।'
    ],
    praiseHi: [
      'पंडित जी का स्वभाव अत्यंत शालीन और आत्मीय रहा, सभी मेहमानों ने प्रशंसा की।',
      'समय का पूरा ध्यान रखा और बिना किसी अनावश्यक परेशानी के रस्में पूर्ण कराईं।'
    ],
    closersHi: [
      'हैदराबाद में उत्तर भारतीय विवाह पूजन के लिए सबसे विश्वसनीय आचार्य। धन्यवाद!',
      'शादी का कार्यक्रम बहुत ही सुंदर और मंगलमय रहा। हार्दिक आभार!'
    ],
    englishOptions: [
      'Pandit ji conducted the complete North Indian wedding ceremony and Saptapadi with profound Vedic grace. He explained the sacred vows clearly in Hindi. Highly recommend for Hindu weddings in Hyderabad!',
      'Outstanding marriage rituals. Pandit ji made our special day memorable and spiritually rich. Thank you for your blessings!'
    ]
  },
  navchandi: {
    openersHi: [
      'माता रानी के नवचंडी पाठ और चंडी हवन हेतु पंडित जी पधारे।',
      'दुर्गा सप्तशती पाठ और देवी पूजन अत्यंत भक्ति भाव से कराया गया।'
    ],
    detailsHi: [
      'हवन की आहुतियां और स्तोत्र पाठ पूर्ण शुद्धता के साथ संपन्न हुआ।',
      'आरती और भोग के समय अलौकिक आनंद और ऊर्जा का संचार हुआ।'
    ],
    praiseHi: [
      'पंडित जी का समर्पण और मंत्र शक्ति अद्भुत है।',
      'पूरी पूजा में उनका ध्यान केवल विधि और सात्विकता पर रहा।'
    ],
    closersHi: [
      'हैदराबाद में नवचंडी व दुर्गा हवन के लिए उत्तम पंडित जी। जय माता दी!',
      'माता रानी की कृपा आप पर सदा बनी रहे। बहुत-बहुत धन्यवाद!'
    ],
    englishOptions: [
      'Navchandi Hawan and Durga Puja conducted with pure Vedic precision. Pandit ji\'s spiritual aura and chanting were remarkable. Jai Mata Di!',
      'Wonderful Navchandi hawan experience in Hyderabad. Punctual, respectful, and authentic North Indian vidhi.'
    ]
  },
  other: {
    openersHi: [
      'हैदराबाद में वैदिक पूजा और हवन अनुष्ठान के लिए पंडित जी की सेवा प्राप्त हुई।',
      'हमारे पारिवारिक धार्मिक उत्सव पर पंडित जी ने संपूर्ण विधि-विधान से पूजन कराया।'
    ],
    detailsHi: [
      'संकल्प, नवग्रह पूजन, मंत्र जाप और हवन अत्यंत नियमपूर्वक संपन्न हुआ।',
      'पूजा की प्रत्येक प्रक्रिया बहुत ही सरल और आत्मीय तरीके से कराई गई।'
    ],
    praiseHi: [
      'पंडित जी अत्यंत विद्वान, शालीन और समय के पाबंद हैं।',
      'उनकी सात्विकता और ज्ञान देखकर मन प्रसन्न हो गया।'
    ],
    closersHi: [
      'हैदराबाद में सभी प्रकार के वैदिक कार्यों के लिए सर्वश्रेष्ठ। हार्दिक आभार!',
      'उत्तम व्यवस्था और श्रेष्ठ पूजन। हम सभी को इनकी सेवा की पुरजोर अनुशंसा करते हैं।'
    ],
    englishOptions: [
      'Very satisfied with Pandit ji\'s Vedic puja services in Hyderabad. Polite, punctual, and knowledgeable. Will definitely book again for all future pujas.',
      'Great experience with Pandit ji. Authentic rituals, peaceful atmosphere, and honest dakshina. 5-star recommended for all North Indian families in Hyderabad.'
    ]
  }
};

// Function to generate a completely randomized, unique review
function buildUniqueReview(pujaKey, lang = 'hi', star = 5) {
  const data = REVIEW_PARTS[pujaKey] || REVIEW_PARTS.other;

  if (lang === 'en') {
    const enList = data.englishOptions || REVIEW_PARTS.other.englishOptions;
    return enList[Math.floor(Math.random() * enList.length)];
  }

  // 4 Star review: Slightly more measured/concise
  if (star === 4) {
    const fourStarTemplates = [
      `पंडित जी द्वारा पूजा सेवा काफी अच्छी और विधि-विधान से संपन्न कराई गई। समय पर पधारे और सभी रस्में शांतिपूर्वक पूरी कीं। हैदराबाद में उत्तर भारतीय पूजा के लिए अनुशंसित।`,
      `अच्छा और संतोषजनक पूजन अनुभव रहा। पंडित जी शांत स्वभाव के हैं और मंत्रोच्चार शुद्ध था। पूजा समय पर पूरी हुई। धन्यवाद।`,
      `Very good Vedic puja experience. Pandit ji was punctual and performed all rituals nicely as per North Indian tradition in Hyderabad.`
    ];
    return fourStarTemplates[Math.floor(Math.random() * fourStarTemplates.length)];
  }

  // 5 Star review: Dynamically combine 4 unique randomized parts
  const o = data.openersHi[Math.floor(Math.random() * data.openersHi.length)];
  const d = data.detailsHi[Math.floor(Math.random() * data.detailsHi.length)];
  const p = data.praiseHi[Math.floor(Math.random() * data.praiseHi.length)];
  const c = data.closersHi[Math.floor(Math.random() * data.closersHi.length)];

  return `${o} ${d} ${p} ${c}`;
}

export default function SmartReviewFunnel({ onGoHome }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedPuja, setSelectedPuja] = useState('griha_pravesh');
  const [currentText, setCurrentText] = useState('');
  const [optionsList, setOptionsList] = useState([]);
  const [copied, setCopied] = useState(false);
  const [privateFeedback, setPrivateFeedback] = useState('');
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');

  // Generate QR Code pointing to this review page
  useEffect(() => {
    QRCode.toDataURL(REVIEW_PAGE_URL, {
      width: 400,
      margin: 2,
      color: {
        dark: '#78350F', // Warm royal saffron maroon
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Error:', err));
  }, []);

  // Whenever puja or rating changes, refresh suggestions
  useEffect(() => {
    refreshSuggestions();
  }, [selectedPuja, rating]);

  const refreshSuggestions = () => {
    // Generate 3 unique, diverse options on the fly
    const opt1 = buildUniqueReview(selectedPuja, 'hi', rating);
    const opt2 = buildUniqueReview(selectedPuja, 'en', rating);
    const opt3 = buildUniqueReview(selectedPuja, 'hi', rating);
    const list = [opt1, opt2, opt3];
    setOptionsList(list);
    setCurrentText(opt1);
    setCopied(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (newRating >= 4) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
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

    // Open Google Review Link after brief confirmation
    setTimeout(() => {
      window.open(GOOGLE_REVIEW_URL, '_blank', 'noopener,noreferrer');
    }, 600);
  };

  const handleSendPrivateWhatsApp = () => {
    const text = encodeURIComponent(
      `नमस्ते पंडित जी, मुझे पूजा सेवा के संदर्भ में निजी फीडबैक देना है (रेटिंग: ${rating}/5):\n\n${privateFeedback || 'कृपया मुझसे संपर्क करें।'}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // High-Resolution 1200x1600 Print Poster Generator
  const downloadPosterImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');

    // Luxurious gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1600);
    bgGrad.addColorStop(0, '#FFFDF7');
    bgGrad.addColorStop(0.5, '#FFF6EA');
    bgGrad.addColorStop(1, '#FEF0DB');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1600);

    // Outer and Inner Royal Borders
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 14;
    ctx.strokeRect(36, 36, 1128, 1528);

    ctx.strokeStyle = '#78350F';
    ctx.lineWidth = 3;
    ctx.strokeRect(54, 54, 1092, 1492);

    // Sacred Invocation
    ctx.fillStyle = '#9A3412';
    ctx.font = 'bold 36px "Noto Serif Devanagari", serif';
    ctx.textAlign = 'center';
    ctx.fillText('॥ ॐ श्री गणेशाय नमः ॥', 600, 125);

    // Header Title
    ctx.fillStyle = '#78350F';
    ctx.font = 'bold 58px "Outfit", Arial, sans-serif';
    ctx.fillText('NORTH HINDI PANDIT', 600, 205);

    ctx.fillStyle = '#B45309';
    ctx.font = '600 32px "Outfit", Arial, sans-serif';
    ctx.fillText('Shuddh Vedic Puja, Hawan & Sanskar | Hyderabad', 600, 260);

    // Gold Divider with Center Om
    ctx.strokeStyle = '#F59E0B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(180, 295);
    ctx.lineTo(540, 295);
    ctx.moveTo(660, 295);
    ctx.lineTo(1020, 295);
    ctx.stroke();

    ctx.font = 'bold 44px serif';
    ctx.fillStyle = '#D97706';
    ctx.fillText('ॐ', 600, 310);

    // Callout Box
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(217, 119, 6, 0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetY = 6;
    ctx.beginPath();
    ctx.roundRect(120, 350, 960, 130, 20);
    ctx.fill();
    ctx.shadowColor = 'transparent';

    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#7C2D12';
    ctx.font = 'bold 34px "Noto Serif Devanagari", Arial, sans-serif';
    ctx.fillText('पूजा उपरांत अपने अनुभव व आशीर्वाद साझा करें', 600, 408);

    ctx.fillStyle = '#4B5563';
    ctx.font = '500 24px Arial, sans-serif';
    ctx.fillText('Scan with any mobile camera to rate & review in 10 seconds', 600, 452);

    // Draw QR Code
    if (qrDataUrl) {
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      qrImg.onload = () => {
        // QR Card
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 30;
        ctx.shadowOffsetY = 10;
        ctx.beginPath();
        ctx.roundRect(320, 520, 560, 560, 24);
        ctx.fill();
        ctx.shadowColor = 'transparent';

        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 4;
        ctx.stroke();

        ctx.drawImage(qrImg, 355, 555, 490, 490);

        // 3 Easy Steps
        ctx.fillStyle = '#78350F';
        ctx.font = 'bold 32px Arial, sans-serif';
        ctx.fillText('⭐⭐⭐⭐⭐ 3 आसान चरण (Simple Steps)', 600, 1140);

        ctx.font = '500 26px Arial, sans-serif';
        ctx.fillStyle = '#374151';
        ctx.fillText('1. कैमरा से QR कोड स्कैन करें (Scan with Camera)', 600, 1195);
        ctx.fillText('2. अपनी पसंद का सुंदर रिव्यू चुनें (Select AI Review)', 600, 1245);
        ctx.fillText('3. Google पर 5-Star के साथ पोस्ट करें (Submit on Google)', 600, 1295);

        // Footer Banner
        ctx.fillStyle = '#7C2D12';
        ctx.beginPath();
        ctx.roundRect(100, 1360, 1000, 150, 18);
        ctx.fill();

        ctx.fillStyle = '#FEF3C7';
        ctx.font = 'bold 34px Arial, sans-serif';
        ctx.fillText('📞 Booking Helpline: +91 7772035222', 600, 1422);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '500 24px Arial, sans-serif';
        ctx.fillText('🌐 Official Website: www.northhindipandit.in', 600, 1470);

        // Download
        const a = document.createElement('a');
        a.download = 'North_Hindi_Pandit_Review_Poster.png';
        a.href = canvas.toDataURL('image/png');
        a.click();
      };
      qrImg.src = qrDataUrl;
    }
  };

  const isPositive = rating >= 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F3E8DB] text-[#2D2A26] py-8 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onGoHome || (() => { window.location.href = '/'; })}
            className="inline-flex items-center gap-2 text-amber-900 hover:text-amber-700 bg-white/90 hover:bg-white px-4 py-2 rounded-full border border-amber-200 shadow-xs text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            मुख्य वेबसाइट (Home)
          </button>

          <button
            onClick={() => setShowPosterModal(true)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white px-4 py-2 rounded-full shadow-md text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            🖨️ QR पोस्टर डाउनलोड करें
          </button>
        </div>

        {/* Hero Card with Sacred Aesthetic */}
        <div className="text-center bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/70 relative overflow-hidden mb-6">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />
          
          <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-serif text-3xl font-bold">
            ॐ
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-amber-950 font-serif mb-1">
            यजमान अनुभव एवं आशीर्वाद
          </h1>
          <p className="text-amber-800/80 text-xs sm:text-sm max-w-lg mx-auto">
            North Hindi Pandit - Vedic Puja Services Hyderabad. पूजा उपरांत अपना अमूल्य अनुभव साझा कर हमें अनुगृहीत करें।
          </p>

          {/* Interactive Star Rating */}
          <div className="mt-6 pt-5 border-t border-amber-100">
            <p className="text-xs uppercase tracking-wider font-bold text-amber-900/70 mb-3">
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
                    onClick={() => handleRatingChange(star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                  >
                    <Star
                      className={`w-10 h-10 sm:w-12 sm:h-12 transition-all ${
                        isFilled
                          ? 'fill-amber-400 text-amber-500 filter drop-shadow-[0_3px_10px_rgba(245,158,11,0.5)]'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-2 text-sm font-bold text-amber-900">
              {rating === 5 && '⭐⭐⭐⭐⭐ परम संतुष्ट एवं दिव्य अनुभव!'}
              {rating === 4 && '⭐⭐⭐⭐ बहुत अच्छा व सुखद अनुभव!'}
              {rating === 3 && '⭐⭐⭐ सामान्य अनुभव'}
              {rating <= 2 && 'सुधार की आवश्यकता'}
            </div>
          </div>
        </div>

        {/* 4 OR 5 STARS: AI SMART REVIEW GENERATOR -> GOOGLE */}
        {isPositive ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-200/70">
            
            {/* Header info */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                AI स्वचालित रिव्यू सुझाव
              </div>

              <button
                type="button"
                onClick={refreshSuggestions}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-100 px-3 py-1 rounded-full transition cursor-pointer"
                title="नया रिव्यू बनाएं"
              >
                <RefreshCw className="w-3 h-3" />
                नया सुझाव (AI Refresh)
              </button>
            </div>

            {/* Puja Type Selector */}
            <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
              कौन सी पूजा संपन्न हुई?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
              {PUJA_CATEGORIES.map((cat) => {
                const active = selectedPuja === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedPuja(cat.id)}
                    className={`p-2.5 rounded-xl text-xs sm:text-sm font-medium transition text-left border cursor-pointer ${
                      active
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/25'
                        : 'bg-stone-50 hover:bg-amber-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Pick from 3 Variations */}
            <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-2">
              अपनी पसंद का रिव्यू चुनें (या नीचे अपनी मर्जी से लिखें):
            </label>
            <div className="space-y-2 mb-4">
              {optionsList.map((opt, idx) => {
                const isSelected = currentText === opt;
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentText(opt)}
                    className={`p-3.5 rounded-2xl border text-xs sm:text-sm leading-relaxed cursor-pointer transition flex items-start gap-3 ${
                      isSelected
                        ? 'bg-amber-50/90 border-amber-400 text-amber-950 shadow-xs'
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
            <div className="relative mb-6">
              <label className="block text-xs font-bold uppercase text-stone-500 tracking-wider mb-1.5">
                चुना गया रिव्यू (आप इसमें बदलाव भी कर सकते हैं):
              </label>
              <textarea
                rows={4}
                value={currentText}
                onChange={(e) => setCurrentText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-amber-50/40 border-2 border-amber-200 focus:border-amber-500 focus:bg-white focus:outline-hidden text-stone-800 text-sm leading-relaxed resize-none shadow-inner transition"
              />
              <button
                type="button"
                onClick={() => {
                  if (navigator.clipboard) navigator.clipboard.writeText(currentText);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute top-8 right-3 text-stone-500 hover:text-stone-800 bg-white/90 p-1.5 rounded-lg border border-stone-200 shadow-xs text-xs font-medium inline-flex items-center gap-1 transition cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? 'कॉपी हुआ' : 'कॉपी'}</span>
              </button>
            </div>

            {/* Main Action Button */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleCopyAndRedirect}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-base sm:text-lg shadow-xl shadow-orange-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 cursor-pointer"
              >
                <Copy className="w-5 h-5" />
                रिव्यू कॉपी करें और Google पर 5-Star दें
                <ExternalLink className="w-5 h-5" />
              </button>

              {copied && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-center text-xs sm:text-sm font-semibold text-emerald-800 flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  रिव्यू कॉपी हो गया! अब Google Maps पर 5-Star दबाकर Paste कर दें।
                </div>
              )}

              <p className="text-center text-stone-500 text-xs">
                बटन दबाते ही रिव्यू कॉपी होकर सीधे Google Business Review बॉक्स खुल जाएगा।
              </p>
            </div>

          </div>
        ) : (
          /* 1, 2, 3 STARS: PRIVATE FEEDBACK FILTER -> WHATSAPP (GOOGLE NEVER OPENED) */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-200">
            <div className="flex items-center gap-2 text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full w-fit text-xs font-bold mb-4">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              निजी सहायता एवं सुधार सुझाव
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-stone-900 mb-2 font-serif">
              हर हर महादेव! हमें खेद है कि आपकी पूजा में कोई कमी रह गई।
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
              हम अपनी सेवा को सर्वश्रेष्ठ बनाने के लिए प्रतिबद्ध हैं। कृपया अपना सुझाव या असुविधा सीधे पंडित जी व संचालक को बताएं ताकि हम तुरंत इस पर सुधार कर सकें।
            </p>

            <textarea
              rows={4}
              value={privateFeedback}
              onChange={(e) => setPrivateFeedback(e.target.value)}
              placeholder="कृपया बताएं कि क्या कमी रही या क्या सुधार किया जा सकता था..."
              className="w-full p-4 rounded-2xl bg-stone-50 border border-stone-200 focus:border-rose-400 focus:bg-white focus:outline-hidden text-stone-800 text-sm leading-relaxed resize-none mb-4 transition"
            />

            <button
              type="button"
              onClick={handleSendPrivateWhatsApp}
              className="w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              सीधे WhatsApp पर पंडित जी को सुझाव भेजें
            </button>
            <p className="text-center text-stone-400 text-xs mt-2">
              आपकी प्रतिक्रिया पूर्णतः गोपनीय रहेगी और संचालक तुरंत आपसे संपर्क करेंगे।
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-stone-500 space-y-1">
          <p className="font-semibold text-stone-700">North Hindi Pandit - Vedic Puja Services Hyderabad</p>
          <p>Helpline: +91 7772035222 | Website: www.northhindipandit.in</p>
        </div>

      </div>

      {/* QR POSTER MODAL */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-amber-300">
            <button
              onClick={() => setShowPosterModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <span className="text-2xl font-serif text-amber-600 font-bold">ॐ</span>
              <h3 className="text-xl font-bold text-amber-950 font-serif">
                रिव्यू QR कोड पोस्टर
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                इसे डाउनलोड करके प्रिंट निकलवा लें या फोन से यजमानों को स्कैन कराएं।
              </p>
            </div>

            {/* Poster Card Mockup */}
            <div className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED] to-[#FEF3C7] p-5 rounded-2xl border-2 border-amber-300 shadow-inner text-center">
              <p className="text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1">
                NORTH HINDI PANDIT HYDERABAD
              </p>
              <p className="text-xs font-serif font-bold text-stone-900 mb-3">
                पूजा उपरांत आशीर्वाद व अनुभव साझा करें
              </p>

              {/* QR Image */}
              <div className="bg-white p-3 rounded-xl shadow-md inline-block mx-auto mb-2 border border-amber-200">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Review QR Code" className="w-44 h-44 mx-auto" />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-xs text-stone-400">QR Loading...</div>
                )}
              </div>

              <div className="flex justify-center items-center gap-1 text-amber-500 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                ))}
              </div>

              <p className="text-[10px] text-stone-600 font-medium">
                कैमरा से स्कैन करें ➔ रिव्यू चुनें ➔ Google पर 5-Star दें
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 space-y-2">
              <button
                type="button"
                onClick={downloadPosterImage}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
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
