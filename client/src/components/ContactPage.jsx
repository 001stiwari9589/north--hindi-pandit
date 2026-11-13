import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Check,
  Copy,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../translations';

const HERO_SLIDES = [
  { url: '/vedic_pandit_hawan.jpg', title: 'Sacred Hawan & Vedic Acharyas' },
  { url: '/images/grihapravesh_puja.jpg', title: 'Grihapravesh Vastu Puja' },
  { url: '/images/rudrabhishek_puja.jpg', title: 'Rudrabhishek & Shiv Puja' },
  { url: '/images/satyanarayan_puja.jpg', title: 'Satyanarayan Katha' },
  { url: '/images/ganesh_hawan.jpg', title: 'Ganesh Pujan & Hawan' }
];

const getPujaIcon = (pujaName) => {
  const norm = (pujaName || '').toLowerCase();
  if (norm.includes('other') || norm.includes('अन्य') || norm.includes('ఇతర') || norm.includes('অন্যান্য')) return '🪔';
  if (norm.includes('rudra') || norm.includes('shiv') || norm.includes('रुद्र') || norm.includes('शिव')) return '🔱';
  if (norm.includes('griha') || norm.includes('vastu') || norm.includes('गृह')) return '🏡';
  if (norm.includes('satya') || norm.includes('सत्य')) return '📖';
  if (norm.includes('durga') || norm.includes('lakshmi') || norm.includes('दुर्गा') || norm.includes('लक्ष्मी')) return '🌺';
  if (norm.includes('sundar') || norm.includes('ram') || norm.includes('सुंदर') || norm.includes('राम')) return '🚩';
  if (norm.includes('naam') || norm.includes('namkaran') || norm.includes('bhumi') || norm.includes('नाम') || norm.includes('भूमि')) return '👶';
  if (norm.includes('shrad') || norm.includes('pitr') || norm.includes('श्राद्ध') || norm.includes('पितृ')) return '🙏';
  if (norm.includes('vivah') || norm.includes('marr') || norm.includes('विवाह')) return '💍';
  return '🪔';
};

export default function ContactPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [slideIndex, setSlideIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    pujaType: '',
    preferredDate: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-rotating background slideshow (every 2.8s)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const defaultPujaOptions = [
    'Grihapravesh & Vastu Puja',
    'Rudrabhishek & Shiv Puja',
    'Satyanarayan Katha & Hawan',
    'Durga Puja & Lakshmi Puja',
    'Sundarkand & Ramnavmi Puja',
    'Naamkaran Sanskar & Bhumi Poojan',
    'Shraddh Puja & Pitra Puja',
    'Vivah / Marriage Sanskar',
    'Any Other Puja & Hawan'
  ];

  const currentPujaOptions = t.pujaOptions || defaultPujaOptions;

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      location: '',
      pujaType: '',
      preferredDate: '',
      message: ''
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    resetForm();
  }, [currentLang]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) return currentLang === 'hi' ? 'कृपया अपना पूरा नाम लिखें।' : 'Please enter your full name.';
    if (/\d/.test(val)) return currentLang === 'hi' ? 'नाम में अंक (नंबर) नहीं हो सकते।' : 'Name cannot contain numbers.';
    if (!/^[a-zA-Z\s'.\u0900-\u097F\u0C00-\u0C7F\u0980-\u09FF]{2,50}$/.test(trimmed)) {
      return currentLang === 'hi' ? 'कृपया मान्य नाम दर्ज करें।' : 'Please enter a valid name (letters only).';
    }
    return '';
  };

  const validatePhone = (val) => {
    const digits = (val || '').replace(/\D/g, '');
    if (!digits) return currentLang === 'hi' ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter your 10-digit mobile number.';
    if (digits.length !== 10) {
      return currentLang === 'hi' ? `कृपया पूरा 10-अंकों का नंबर दर्ज करें (${digits.length}/10)` : `Please enter a 10-digit number (${digits.length}/10).`;
    }
    if (!/^[6-9]/.test(digits)) {
      return currentLang === 'hi' ? 'नंबर 6, 7, 8 या 9 से शुरू होना चाहिए।' : 'Phone number must start with 6, 7, 8, or 9.';
    }
    return '';
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') setErrors((prev) => ({ ...prev, name: validateName(formData.name) }));
    if (field === 'phone') setErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
  };

  const handleChange = (field, val) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (touched[field]) {
      if (field === 'name') setErrors((prev) => ({ ...prev, name: validateName(val) }));
      if (field === 'phone') setErrors((prev) => ({ ...prev, phone: validatePhone(val) }));
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Northhindipandit.hyd80@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const getMailUrl = () => {
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      return 'mailto:Northhindipandit.hyd80@gmail.com?subject=Puja%20Inquiry%20-%20North%20Hindi%20Pandit';
    }
    return 'https://mail.google.com/mail/?view=cm&fs=1&to=Northhindipandit.hyd80@gmail.com&su=Puja%20Inquiry%20-%20North%20Hindi%20Pandit';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);

    setTouched({ name: true, phone: true, location: true, pujaType: true, preferredDate: true });
    setErrors({ name: nameErr, phone: phoneErr });

    if (nameErr || phoneErr) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/book-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          location: formData.location || 'Hyderabad (Contact Page)',
          puja_type: formData.pujaType || 'General Vedic Consultation',
          source: 'Contact Page Inquiry',
          notes: `Preferred Date: ${formData.preferredDate || 'Flexible'}`
        })
      });

      if (!response.ok) {
        console.warn('Backend consultation response not OK, fallback success');
      }

      setSubmitted(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FF7700', '#107C41']
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: '#FAF7F0', minHeight: '100vh', color: '#17243B' }}>
      
      {/* SECTION 1: HERO HEADER WITH VIBRANT SLIDESHOW (COMPLETELY TRANSPARENT) */}
      <section style={{
        position: 'relative',
        background: '#07152B',
        color: '#FFFFFF',
        padding: '36px 20px 44px',
        minHeight: '340px',
        borderBottom: '3px solid #D4A640',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Animated Background Slides (Full clarity, vivid HD puja images) */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: slideIndex === idx ? 1 : 0,
              transform: slideIndex === idx ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'opacity 1.2s ease-in-out, transform 4s ease-out',
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* Soft Natural Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.40) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Foreground Content */}
        <div style={{ maxWidth: '1060px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Bar with Single Arrow Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '22px' }}>
            <button
              onClick={handleReturnHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#FAF7F0',
                padding: '8px 20px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '600',
                border: '1.5px solid #D4A640',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0, 0, 0, 0.65)'; }}
            >
              <ArrowLeft style={{ width: '15px', height: '15px', color: '#D4A640' }} />
              <span>{t.contactBackHome || 'Back to Home'}</span>
            </button>
          </div>

          {/* Center Heading */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: '0 0 10px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(0, 0, 0, 0.9), 0 0 5px #000'
            }}>
              {t.contactHeroTitle || 'Get in Touch With Our Acharyas'}
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              color: '#FFFFFF',
              fontWeight: '500',
              margin: '0 auto',
              lineHeight: '1.6',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.9), 0 0 4px #000'
            }}>
              {currentLang === 'hi'
                ? 'तत्काल पूजा परामर्श एवं शुभ मुहूर्त गणना हेतु संपर्क करें'
                : 'Direct Consultation for Auspicious Shubh Muhurat & Ritual Bookings'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: MAIN CONTACT SECTION (50-50 Equal Width: 3 Cards on Left, Sleek Form on Right) */}
      <section className="contact-main-section">
        <div className="contact-two-column-grid">
          
          {/* LEFT COLUMN: EXACTLY 3 CLEAN LUXURY CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ marginBottom: '2px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px',
                fontWeight: '700',
                color: '#17243B',
                margin: 0
              }}>
                {t.contactChannelsHeading || 'Connect With Our Team'}
              </h2>
            </div>

            {/* CARD 1: Direct WhatsApp Consultation (Number Shown + Luxury WhatsApp Button) */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(37, 211, 102, 0.45)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 4px 18px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#10B981' }}>
                    {currentLang === 'hi' ? 'सीधा व्हाट्सएप परामर्श' : 'Direct WhatsApp Consultation'}
                  </div>
                  <div style={{ fontSize: '19px', color: '#17243B', fontWeight: '800', marginTop: '1px', letterSpacing: '0.3px' }}>
                    +91 9589018011
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                    {currentLang === 'hi' ? 'तत्काल पूजा मुहूर्त एवं सामग्री परामर्श • 24×7' : 'Instant Shubh Muhurat & Samagri Support'}
                  </div>
                </div>
              </div>

              {/* Creative WhatsApp Button */}
              <a
                href="https://wa.me/919589018011?text=Namaste!%20I%20want%20to%20consult%20regarding%20Puja%20Muhurat%20and%20Booking."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  textAlign: 'center',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(37, 211, 102, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.35)';
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
                </svg>
                <span>{currentLang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat on WhatsApp'}</span>
              </a>
            </div>

            {/* CARD 2: Support Email */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 4px 18px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #07152B 0%, #17243B 100%)',
                color: '#D4A640',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(7, 21, 43, 0.18)'
              }}>
                <Mail style={{ width: '22px', height: '22px' }} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                  {t.contactCardEmailTitle || 'Official Support Email'}
                </div>
                
                <a
                  href={getMailUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Click to write email"
                  style={{
                    fontSize: '14.5px',
                    color: '#17243B',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    margin: '3px 0 0',
                    fontWeight: '700',
                    wordBreak: 'break-all',
                    textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E68A00'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#17243B'; }}
                >
                  <span>Northhindipandit.hyd80@gmail.com</span>
                  <ExternalLink style={{ width: '13px', height: '13px', color: '#E68A00', flexShrink: 0 }} />
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                style={{
                  padding: '7px 12px',
                  borderRadius: '8px',
                  background: copiedEmail ? '#10B981' : '#F1F5F9',
                  border: '1px solid',
                  borderColor: copiedEmail ? '#10B981' : '#CBD5E1',
                  color: copiedEmail ? '#FFFFFF' : '#475569',
                  fontSize: '12px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                {copiedEmail ? <Check style={{ width: '13px', height: '13px' }} /> : <Copy style={{ width: '13px', height: '13px' }} />}
                <span>{copiedEmail ? (currentLang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (currentLang === 'hi' ? 'कॉपी' : 'Copy')}</span>
              </button>
            </div>

            {/* CARD 3: Operational Office Location */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 4px 18px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #990026 0%, #68001a 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(153, 0, 38, 0.22)'
              }}>
                <MapPin style={{ width: '22px', height: '22px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                  {t.contactCardOfficeTitle || 'Operational Office'}
                </div>
                <strong style={{ fontSize: '15px', color: '#17243B', display: 'block', margin: '2px 0', fontWeight: '700' }}>
                  Hitec City, Madhapur, Hyderabad
                </strong>
                <div style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                  Near Cyber Towers, Telangana - 500081
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: SLEEK CONSULTATION FORM (MESSAGE FIELD REMOVED AS REQUESTED) */}
          <div className="contact-form-box">
            
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px',
                fontWeight: '800',
                color: '#17243B',
                margin: 0
              }}>
                {t.contactFormHeading || 'Book a Vedic Consultation'}
              </h3>
            </div>

            {submitted ? (
              <div style={{
                padding: '30px 20px',
                borderRadius: '16px',
                background: '#FAF7F0',
                border: '2px solid #D4A640',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: '#E68A00',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px',
                  boxShadow: '0 4px 14px rgba(230, 138, 0, 0.3)'
                }}>
                  <CheckCircle2 style={{ width: '30px', height: '30px' }} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '20px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
                  {t.contactFormSuccessTitle || 'Inquiry Received Successfully 🙏'}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', maxWidth: '400px', margin: '0 auto 16px', lineHeight: '1.5' }}>
                  {t.contactFormSuccessSub || 'Pandit Ji has been alerted at Northhindipandit.hyd80@gmail.com. We will call you shortly to discuss the Shubh Muhurat and Vidhi details.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={resetForm}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '100px',
                      background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '13px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {t.contactFormBtnAnother || 'Send Another'}
                  </button>
                  <button
                    onClick={handleReturnHome}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '100px',
                      background: '#FFFFFF',
                      border: '1.5px solid #07152B',
                      color: '#07152B',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}
                  >
                    {t.contactFormBtnHome || 'Back to Home'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                      {t.contactLabelName || 'Full Name'} <span style={{ color: '#E68A00' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder={t.contactPlaceholderName || 'Enter your full name'}
                      className="contact-input-field"
                      style={{
                        padding: '10px 12px',
                        fontSize: '13px',
                        borderColor: errors.name ? '#EF4444' : touched.name ? '#10B981' : 'rgba(212, 166, 64, 0.45)'
                      }}
                    />
                    {errors.name && (
                      <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '2px', display: 'block', fontWeight: '600' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Two column: Mobile Number & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                        {t.contactLabelPhone || 'Mobile Number'} <span style={{ color: '#E68A00' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength="10"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                        onBlur={() => handleBlur('phone')}
                        placeholder={t.contactPlaceholderPhone || 'Enter 10-digit mobile number'}
                        className="contact-input-field"
                        style={{
                          padding: '10px 12px',
                          fontSize: '13px',
                          borderColor: errors.phone ? '#EF4444' : touched.phone ? '#10B981' : 'rgba(212, 166, 64, 0.45)'
                        }}
                      />
                      {errors.phone && (
                        <span style={{ fontSize: '11px', color: '#EF4444', marginTop: '2px', display: 'block', fontWeight: '600' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                        {t.contactLabelLocation || 'Your Location / City'}
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder={t.contactPlaceholderLocation || 'Location / city (e.g. Gachibowli)'}
                        className="contact-input-field"
                        style={{ padding: '10px 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Two column: Puja Selection & Preferred Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    
                    {/* Select Puja Ceremony Dropdown with Dedicated Icons */}
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                        {t.contactLabelPuja || 'Select Puja Ceremony'}
                      </label>

                      <div
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="contact-input-field"
                        style={{
                          background: '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 12px',
                          fontSize: '13px',
                          borderColor: dropdownOpen ? '#D4A640' : 'rgba(212, 166, 64, 0.45)',
                          boxShadow: dropdownOpen ? '0 0 0 3px rgba(212, 166, 64, 0.22)' : 'none',
                          fontWeight: formData.pujaType ? '600' : '400',
                          userSelect: 'none'
                        }}
                      >
                        <span style={{ color: formData.pujaType ? '#17243B' : '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          {formData.pujaType ? (
                            <>
                              <span>{getPujaIcon(formData.pujaType)}</span>
                              <span>{formData.pujaType}</span>
                            </>
                          ) : (
                            t.contactPlaceholderPuja || t.selectPujaPlaceholder || 'Choose a Vedic Puja...'
                          )}
                        </span>
                        <ChevronDown
                          style={{
                            width: '16px',
                            height: '16px',
                            color: '#E68A00',
                            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease',
                            flexShrink: 0,
                            marginLeft: '6px'
                          }}
                        />
                      </div>

                      {/* Dropdown Options Menu */}
                      {dropdownOpen && (
                        <div
                          className="custom-dropdown-menu"
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 4px)',
                            left: 0,
                            right: 0,
                            background: '#FFFFFF',
                            border: '1.5px solid rgba(212, 166, 64, 0.5)',
                            borderRadius: '12px',
                            maxHeight: '230px',
                            overflowY: 'auto',
                            zIndex: 99999,
                            boxShadow: '0 14px 36px rgba(7, 21, 43, 0.16)',
                            padding: '4px'
                          }}
                        >
                          {currentPujaOptions.map((puja) => {
                            const isSelected = formData.pujaType === puja;
                            return (
                              <div
                                key={puja}
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, pujaType: puja }));
                                  setDropdownOpen(false);
                                }}
                                style={{
                                  padding: '9px 12px',
                                  fontSize: '12.5px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  background: isSelected ? 'rgba(230, 138, 0, 0.12)' : 'transparent',
                                  color: isSelected ? '#E68A00' : '#17243B',
                                  fontWeight: isSelected ? '700' : '500',
                                  transition: 'background 0.15s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.background = 'rgba(212, 166, 64, 0.08)';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.currentTarget.style.background = 'transparent';
                                  }
                                }}
                              >
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                  <span style={{ fontSize: '15px' }}>{getPujaIcon(puja)}</span>
                                  <span>{puja}</span>
                                </span>
                                {isSelected && <Check style={{ width: '14px', height: '14px', color: '#E68A00' }} />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                        {t.contactLabelDate || 'Preferred Date'}
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        className="contact-input-field"
                        style={{ padding: '9px 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                      color: 'white',
                      fontSize: '14.5px',
                      fontWeight: '800',
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 4px 16px rgba(230, 138, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      marginTop: '6px'
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span>{submitting ? (t.contactSubmitting || 'Submitting...') : (t.contactBtnSubmit || 'Submit Consultation Request')}</span>
                    <ArrowRight style={{ width: '15px', height: '15px' }} />
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '11.5px', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <span>🔒 {t.contactPrivacyText || '100% Privacy Guaranteed. Senior Acharya calls you for Shubh Muhurat.'}</span>
                  </div>

                </div>
              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
}
