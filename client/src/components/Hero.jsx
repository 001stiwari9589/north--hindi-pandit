import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Phone, AlertCircle, Check, ChevronDown, X } from 'lucide-react';
import { translations } from '../translations';
import { validateDevoteeName, validateDevoteePhone } from '../data/security';

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

// Centralized Single Source of Truth for Puja Ceremony Options (Matches iPhone reference)
const DEFAULT_PUJA_OPTIONS = [
  'Satyanarayan Puja',
  'Grihapravesh Puja',
  'Rudrabhishek Puja',
  'Ganesh Puja',
  'Lakshmi Puja',
  'Navgraha Hawan',
  'Marriage Puja & Rituals',
  'Business / Office Puja',
  'Vastu Shanti Puja',
  'Any Other Puja & Hawan'
];

export default function Hero({ onBookingSuccess, currentLang = 'en', selectedPuja = null }) {
  const t = translations[currentLang] || translations.en;
  const isHindi = currentLang === 'hi';
  const pujaOptionsList = t.pujaOptions || DEFAULT_PUJA_OPTIONS;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    puja_type: '',
    hp_trap: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    location: '',
    puja_type: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    location: false,
    puja_type: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [showWaPrompt, setShowWaPrompt] = useState(false);
  const [pendingWaUrl, setPendingWaUrl] = useState('');

  // Dropdown States: Clean separation of Touch/Mobile vs Desktop
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openUpwards, setOpenUpwards] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-placement check: dynamically flip between opening downwards vs upwards
  const checkPlacement = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const requiredHeight = 260; // estimated dropdown height
      // If bottom space is not enough and top has more available room, open upwards
      if (spaceBelow < requiredHeight && spaceAbove > spaceBelow) {
        setOpenUpwards(true);
      } else {
        setOpenUpwards(false);
      }
    }
  };

  // Toggle dropdown with dynamic viewport placement
  const toggleDropdown = () => {
    if (!dropdownOpen) {
      checkPlacement();
    }
    setDropdownOpen((prev) => !prev);
    setTouched((prev) => ({ ...prev, puja_type: true }));
  };

  // Re-check placement on scroll or resize while open
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleScrollOrResize = () => {
      checkPlacement();
    };
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [dropdownOpen]);

  // Detect touch-capable devices (iPhone, Android, iPad, Tablets)
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch = (
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia('(pointer: coarse)').matches ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
      );
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
  }, []);

  // Desktop Click-Outside Handler: Clean, lightweight, reliable
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  // Auto-fill selected puja when devotee clicks any service card from lower sections
  useEffect(() => {
    const rawName = typeof selectedPuja === 'object' ? selectedPuja?.name : selectedPuja;
    if (rawName && typeof rawName === 'string') {
      const normalized = rawName.toLowerCase().trim();
      const match = pujaOptionsList.find((opt) => {
        const normOpt = opt.toLowerCase();
        return (
          normOpt.includes(normalized) ||
          normalized.includes(normOpt) ||
          (normalized.includes('गृहप्रवेश') && normOpt.includes('grihapravesh')) ||
          (normalized.includes('सत्यनारायण') && normOpt.includes('satyanarayan')) ||
          (normalized.includes('रुद्राभिषेक') && normOpt.includes('rudrabhishek')) ||
          (normalized.includes('विवाह') && normOpt.includes('marriage')) ||
          (normalized.includes('गणेश') && normOpt.includes('ganesh')) ||
          (normalized.includes('कार्यालय') && normOpt.includes('opening')) ||
          (normalized.includes('व्यापार') && normOpt.includes('opening')) ||
          (normalized.includes('नवग्रह') && normOpt.includes('navagraha')) ||
          (normalized.includes('लक्ष्मी') && normOpt.includes('lakshmi')) ||
          (normalized.includes('नामकरण') && normOpt.includes('namkaran')) ||
          (normalized.includes('मृत्युंजय') && normOpt.includes('mrityunjaya')) ||
          (normalized.includes('चंडी') && normOpt.includes('durga')) ||
          (normalized.includes('दुर्गा') && normOpt.includes('durga')) ||
          (normalized.includes('durga') && normOpt.includes('durga')) ||
          (normalized.includes('श्राद्ध') && normOpt.includes('shraddh')) ||
          (normalized.includes('shrad') && normOpt.includes('shraddh')) ||
          (normalized.includes('pitru') && normOpt.includes('shraddh')) ||
          (normalized.includes('tarpan') && normOpt.includes('shraddh'))
        );
      });

      const finalChoice = match || rawName;
      setFormData((prev) => ({ ...prev, puja_type: finalChoice }));
      setErrors((prev) => ({ ...prev, puja_type: '' }));
      setSubmitted(false);

      // Focus on the name input for seamless booking
      setTimeout(() => {
        const nameInput = document.querySelector('#hero input[name="name"], #hero input[placeholder*="name" i]');
        if (nameInput) {
          nameInput.focus();
        }
      }, 350);
    }
  }, [selectedPuja, pujaOptionsList]);

  // Native select handler for iPhone, Android, iPad
  const handleNativeSelectChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, puja_type: val }));
    setErrors((prev) => ({ ...prev, puja_type: '' }));
    setTouched((prev) => ({ ...prev, puja_type: true }));
  };

  // Desktop custom dropdown item click
  const handleDropdownSelect = (puja) => {
    setFormData((prev) => ({ ...prev, puja_type: puja }));
    setErrors((prev) => ({ ...prev, puja_type: '' }));
    setDropdownOpen(false);
  };

  // Validation functions in clean English with anti-spam security
  const validateName = (val) => {
    return validateDevoteeName(val);
  };

  const validatePhone = (val) => {
    return validateDevoteePhone(val);
  };

  const validateLocation = (val) => {
    if (!val || !val.trim()) {
      return 'Please enter your city / locality.';
    }
    if (val.trim().length < 2) {
      return 'Location must be at least 2 characters.';
    }
    return '';
  };

  const validatePuja = (val) => {
    if (!val || !val.trim()) {
      return 'Please select a puja ceremony.';
    }
    return '';
  };

  const handleNameChange = (e) => {
    // Automatically strip digits without cluttering UI
    const rawVal = e.target.value;
    const cleaned = rawVal.replace(/[0-9]/g, '');
    setFormData((prev) => ({ ...prev, name: cleaned }));

    if (/\d/.test(rawVal)) {
      setErrors((prev) => ({
        ...prev,
        name: 'Letters only, numbers not allowed!'
      }));
    } else if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(cleaned) }));
    }
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData((prev) => ({ ...prev, phone: digits }));

    if (touched.phone) {
      setErrors((prev) => ({ ...prev, phone: validatePhone(digits) }));
    }
  };

  const handleLocationChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => ({ ...prev, location: val }));
    if (touched.location) {
      setErrors((prev) => ({ ...prev, location: validateLocation(val) }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(formData.name) }));
    } else if (field === 'phone') {
      setErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
    } else if (field === 'location') {
      setErrors((prev) => ({ ...prev, location: validateLocation(formData.location) }));
    } else if (field === 'puja_type') {
      setErrors((prev) => ({ ...prev, puja_type: validatePuja(formData.puja_type) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      location: true,
      puja_type: true
    });

    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const locErr = validateLocation(formData.location);
    const pujaErr = validatePuja(formData.puja_type);

    if (nameErr || phoneErr || locErr || pujaErr) {
      setErrors({
        name: nameErr,
        phone: phoneErr,
        location: locErr,
        puja_type: pujaErr
      });
      return;
    }

    setLoading(true);

    const chosenLocation = formData.location.trim() || 'Local Area';
    const chosenPuja = formData.puja_type || 'Satyanarayan Puja';

    const message =
      `Namaste Acharya Ji! I want to book a verified North Indian Hindi Pandit for Puja.\n\n` +
      `*Name:* ${formData.name.trim()}\n` +
      `*Phone:* ${formData.phone.trim()}\n` +
      `*Location / City:* ${chosenLocation}\n` +
      `*Puja Type:* ${chosenPuja}\n` +
      `*Preferred Date:* Earliest Shubh Muhurat`;

    const waUrl = `https://wa.me/919183089880?text=${encodeURIComponent(message)}`;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName: formData.name.trim(),
          phoneNumber: formData.phone.trim(),
          pujaType: chosenPuja,
          pujaDate: new Date().toISOString().split('T')[0],
          cityArea: chosenLocation,
          notes: 'Hero Consultation Form',
          brij_hp_check: formData.hp_trap || ''
        })
      });
      const data = await res.json();
      const ref =
        data && data.booking && data.booking.bookingId
          ? data.booking.bookingId
          : 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(ref);
      if (onBookingSuccess && data.booking) {
        onBookingSuccess(data.booking);
      }

      // Store WhatsApp URL and show prompt modal instead of abrupt auto-redirect
      setPendingWaUrl(waUrl);
      setShowWaPrompt(true);
    } catch (err) {
      const fallbackRef = 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(fallbackRef);

      const fallbackMsg =
        `*Namaste! New Puja Booking Request*\n\n` +
        `*Devotee Name:* ${formData.name.trim()}\n` +
        `*Phone:* ${formData.phone.trim()}\n` +
        `*Location / City:* ${chosenLocation}\n` +
        `*Puja Type:* ${chosenPuja}\n\n` +
        `Please confirm Pandit Ji's availability and auspicious Shubh Muhurat. Thank you!`;

      // Direct WhatsApp fallback if network disconnects
      setPendingWaUrl(`https://wa.me/919183089880?text=${encodeURIComponent(fallbackMsg)}`);
      setShowWaPrompt(true);
    } finally {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 }
        });
      } catch (err) {
        // silent
      }
    }
  };

  const copyBookingId = () => {
    if (bookingRef) {
      navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      location: '',
      puja_type: ''
    });
    setErrors({
      name: '',
      phone: '',
      location: '',
      puja_type: ''
    });
    setTouched({
      name: false,
      phone: false,
      location: false,
      puja_type: false
    });
    setSubmitted(false);
  };

  return (
    <section id="hero">
      {/* Background Canvas: Strictly bounds rotating mandala, rays & sparks */}
      <div className="hero-bg-canvas">
        {/* Bespoke Dual-Ring Sacred Mandala Yantra SVG */}
        <svg className="mandala-bg" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(400,400)">
            {/* Rotating Sacred Chakra Wheel: Circles, 16 Petals, Sacred Ashtakon Geometry */}
            <g className="mandala-rotating-wheel">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="60s"
                repeatCount="indefinite"
              />
              <circle r="380" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.25" />
              <circle r="330" stroke="#D97706" strokeWidth="0.5" strokeDasharray="6 4" fill="none" opacity="0.2" />
              <circle r="270" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.25" />
              <circle r="210" stroke="#D97706" strokeWidth="0.5" fill="none" opacity="0.2" />
              <circle r="150" stroke="#D97706" strokeWidth="1" fill="none" opacity="0.25" />
              <circle r="90" stroke="#D97706" strokeWidth="0.5" fill="none" opacity="0.2" />

              {/* 16 Sacred Lotus Petals */}
              <g id="mandala-petals">
                {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                  <ellipse
                    key={angle}
                    cx="0"
                    cy="-300"
                    rx="18"
                    ry="55"
                    fill="#D97706"
                    opacity="0.14"
                    transform={`rotate(${angle})`}
                  />
                ))}
              </g>

              {/* Ashtakon (Sacred Octagram Interlocking Squares) */}
              <rect x="-180" y="-180" width="360" height="360" stroke="#D97706" strokeWidth="0.75" fill="none" opacity="0.25" />
              <rect x="-180" y="-180" width="360" height="360" stroke="#D97706" strokeWidth="0.75" fill="none" opacity="0.25" transform="rotate(45)" />

              {/* Chakra Spokes & Rims */}
              <circle r="56" stroke="#D97706" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.3" />
            </g>

            {/* Static Central Core: Sacred ॐ Stays Upright & Stable */}
            <g className="mandala-static-core">
              <circle r="32" fill="#FEF3C7" opacity="0.25" />
              <circle r="24" fill="#D97706" opacity="0.25" />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="26"
                fill="#92400E"
                fontWeight="bold"
                fontFamily="serif"
              >
                ॐ
              </text>
            </g>
          </g>
        </svg>

        {/* Rotating Conic Gold Rays */}
        <div className="rays"></div>

        {/* Floating Golden Sparks */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${(i * 3.33 + 1.5) % 100}%`,
                bottom: `${(i * 4) % 45}%`,
                '--dur': `${6 + (i % 6)}s`,
                '--delay': `${(i * 0.35) % 4.5}s`,
                '--drift': `${((i % 5) - 2) * 22}px`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                opacity: 0.35 + (i % 4) * 0.18
              }}
            />
          ))}
        </div>

        {/* Floating Sacred Emblems */}
        <div className="float-obj" style={{ top: '16%', left: '4%', fontSize: '46px', '--bob': '4.5s' }}>🪔</div>
        <div className="float-obj" style={{ top: '68%', left: '3%', fontSize: '32px', '--bob': '5.5s', animationDelay: '1.2s' }}>🌸</div>
        <div className="float-obj" style={{ top: '15%', right: '6%', fontSize: '40px', '--bob': '5s', animationDelay: '0.6s', opacity: 0.28 }}>🔔</div>
        <div className="float-obj" style={{ top: '74%', right: '4%', fontSize: '36px', '--bob': '4.2s', animationDelay: '1.8s' }}>🪷</div>
      </div>

      {/* Centralized Responsive Container */}
      <div className="hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="hero-h1">
            {t.heroH1Prefix}
            <span className="accent">{t.heroH1Accent}</span>
            {t.heroH1Suffix}
          </h1>

          <p className="hero-sub">
            {t.heroSub}
          </p>

          {/* 2 Neat Trust Rows */}
          <div className="hero-trust-rows">
            <div className="trust-row">
              <span>{t.trustRating}</span>
              <span>{t.trustFamilies}</span>
              <span>{t.trustExp}</span>
            </div>
            <div className="trust-row">
              <span>{t.trustPandits}</span>
              <span>{t.trustSamagri}</span>
            </div>
          </div>

          {/* Hero Action CTA Buttons (matching reference screenshot) */}
          <div className="hero-action-btns">
            <a href="tel:+919183089880" className="btn-hero-call" id="heroCallBtn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>{t.btnHeroCall}</span>
            </a>

            <a
              href="https://wa.me/919183089880?text=Namaste!%20I%20want%20to%20book%20a%20North%20Indian%20Hindi%20Pandit%20for%20Puja."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-wa"
              id="heroWaBtn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
              </svg>
              <span>{t.btnHeroWa}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean & Stylish Luxury Glass Consultation Form */}
        <div className={`hero-form-wrap ${dropdownOpen ? 'dropdown-active' : ''}`} style={{ zIndex: dropdownOpen ? 2500 : undefined }}>
        <div className={`form-card ${dropdownOpen ? 'dropdown-active' : ''}`} style={{ zIndex: dropdownOpen ? 2501 : undefined }}>
          <div className="form-header">
            <div className="form-om">ॐ</div>
            <div className="form-title">{t.formTitle}</div>
            <div className="form-sub">{t.formSubtitle}</div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#FAF7F2' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>🙏</div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#E8C37D',
                  fontWeight: 700,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                ॐ DIVINE AUSPICIOUS BLESSINGS
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '21px',
                  color: '#FFFFFF',
                  marginBottom: '8px',
                  fontWeight: 700
                }}
              >
                {t.successHarHar || 'Request Successfully Received!'}
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  color: 'rgba(250, 247, 242, 0.82)',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                  maxWidth: '340px',
                  margin: '0 auto 16px'
                }}
              >
                {t.successSub || 'Our senior Acharya team will contact you within 15 minutes.'}
              </p>

              {/* Clean WhatsApp Chat Action with Pre-filled Devotee Details (No Booking ID clutter) */}
              <a
                href={`https://wa.me/919183089880?text=${encodeURIComponent(
                  `*Namaste! New Puja Booking Request*\n\n` +
                  `*Devotee Name:* ${formData.name.trim()}\n` +
                  `*Phone:* ${formData.phone.trim()}\n` +
                  `*Puja Type:* ${formData.puja_type || 'Satyanarayan Puja'}\n\n` +
                  `Please confirm Pandit Ji's availability and auspicious Shubh Muhurat. Thank you!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-form-consult"
                style={{
                  textDecoration: 'none',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.4)',
                  color: 'white',
                  height: '44px',
                  fontSize: '13.5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  fontWeight: 600,
                  marginTop: '0'
                }}
              >
                💬 {t.successWaBtn || 'Chat on WhatsApp'}
              </a>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginTop: '14px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(250, 247, 242, 0.7)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'block',
                  width: '100%',
                  fontWeight: 500
                }}
              >
                ← {t.successNewBooking || 'Submit another inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {/* Invisible Honeypot Security Field (Catches spambots) */}
              <input
                type="text"
                name="brij_hp_check"
                value={formData.hp_trap || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, hp_trap: e.target.value }))}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ display: 'none', position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />

              {/* Field 1: YOUR NAME */}
              <div className={`form-group ${errors.name && touched.name ? 'has-error' : ''}`}>
                <label>{t.labelName}</label>
                <input
                  type="text"
                  placeholder={t.placeholderName || "Enter your full name"}
                  value={formData.name}
                  onChange={handleNameChange}
                  onBlur={() => handleBlur('name')}
                  maxLength={50}
                  autoComplete="off"
                  spellCheck="false"
                />
                {errors.name && touched.name && (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Field 2: PHONE NUMBER */}
              <div className={`form-group ${errors.phone && touched.phone ? 'has-error' : ''}`}>
                <label>{t.labelPhone}</label>
                <input
                  type="tel"
                  placeholder="Enter your number"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => handleBlur('phone')}
                  maxLength={10}
                  autoComplete="off"
                />
                {errors.phone && touched.phone && (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.phone}</span>
                  </div>
                )}
              </div>

              {/* Field 3: YOUR LOCATION / CITY */}
              <div className={`form-group ${errors.location && touched.location ? 'has-error' : ''}`}>
                <label>{t.labelLocation}</label>
                <input
                  type="text"
                  placeholder={t.placeholderLocation || "Enter your location"}
                  value={formData.location}
                  onChange={handleLocationChange}
                  onBlur={() => handleBlur('location')}
                  maxLength={80}
                  autoComplete="off"
                  spellCheck="false"
                />
                {errors.location && touched.location && (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.location}</span>
                  </div>
                )}
              </div>

              {/* Field 4: TYPE OF PUJA - iPhone Popover Modal & Responsive Dropdown */}
              <div className={`form-group puja-form-group ${errors.puja_type && touched.puja_type ? 'has-error' : ''}`} ref={dropdownRef}>
                <label>{t.labelPuja}</label>

                <div className="puja-select-container">
                  {/* Visible Select Trigger (Royal Maroon & Temple Gold) */}
                  <div
                    className={`custom-select-trigger ${dropdownOpen ? 'is-open' : ''}`}
                    onClick={toggleDropdown}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleDropdown();
                      }
                    }}
                  >
                    <span className="selected-puja-label">
                      {formData.puja_type || t.selectPujaPlaceholder || 'Choose a Vedic Puja...'}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`dropdown-chevron ${dropdownOpen ? 'chevron-up' : ''}`}
                    />
                  </div>

                  {/* Dropdown / iPhone Popover Modal */}
                  {dropdownOpen && (
                    <div className="ios-modal-wrapper">
                      {/* Dimmed Blurred Backdrop on Mobile */}
                      <div
                        className="ios-modal-backdrop"
                        onClick={() => setDropdownOpen(false)}
                        aria-label="Close"
                      />

                      {/* iPhone Rounded Popover Card */}
                      <div className={`ios-modal-card ${openUpwards ? 'open-upwards' : ''}`} role="dialog" aria-modal="true">
                        {/* Dropdown Header with Close (कट) Button */}
                        <div className="ios-modal-header">
                          <span>Select puja type</span>
                          <button
                            type="button"
                            className="ios-modal-close-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownOpen(false);
                            }}
                            aria-label="Close"
                            title="Close"
                          >
                            <X size={16} strokeWidth={2.5} />
                          </button>
                        </div>

                        {/* Full Height Options List with Checkmark on the LEFT */}
                        <div className="ios-modal-list">
                          {pujaOptionsList.map((puja) => {
                            const isSelected = formData.puja_type === puja;
                            return (
                              <div
                                key={puja}
                                className={`ios-modal-item ${isSelected ? 'is-selected' : ''}`}
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, puja_type: puja }));
                                  setErrors((prev) => ({ ...prev, puja_type: '' }));
                                  setTouched((prev) => ({ ...prev, puja_type: true }));
                                  setDropdownOpen(false);
                                }}
                              >
                                <span className="ios-modal-check">
                                  {isSelected ? <Check size={18} strokeWidth={2.5} color="#FFFFFF" /> : null}
                                </span>
                                <span className="ios-modal-text">{puja}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {errors.puja_type && touched.puja_type && (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.puja_type}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-form-consult" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: '16px',
                        height: '16px',
                        border: '2.5px solid rgba(255,255,255,0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite'
                      }}
                    />
                    {t.btnSubmitting || 'Booking Pandit Ji...'}
                  </span>
                ) : (
                  <span>🔥 {t.btnBookNow || 'Confirm Booking & Call Back'}</span>
                )}
              </button>
            </form>
          )}

          <div className="form-trust-row">
            <span>🔒 100% Private</span>
            <span>⚡ Instant Callback</span>
            <span>✅ No Obligation</span>
          </div>
        </div>
      </div>
    </div>

    {/* Interactive WhatsApp Confirmation Prompt Modal */}
    {showWaPrompt && (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 12, 24, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px'
        }}
        onClick={() => setShowWaPrompt(false)}
      >
        <div
          style={{
            background: 'linear-gradient(168deg, #112547 0%, #091326 100%)',
            border: '1.5px solid rgba(212, 175, 55, 0.5)',
            borderRadius: '24px',
            maxWidth: '430px',
            width: '100%',
            padding: '32px 26px 28px',
            textAlign: 'center',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(212, 175, 55, 0.22)',
            color: 'white',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: '44px', marginBottom: '10px' }}>🪔</div>
          <div
            style={{
              fontSize: '11px',
              color: '#F7DC6F',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '6px'
            }}
          >
            ॐ Booking Request Received
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '22px',
              fontWeight: '700',
              color: 'white',
              marginBottom: '12px'
            }}
          >
            Connect on WhatsApp?
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.86)',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}
          >
            Aapki Puja Booking safaltapurvak darj ho gayi hai! Kya aap Pandit Ji se WhatsApp par baat karke Shubh Muhurat confirm karna chahte hain?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {/* OK: Open WhatsApp */}
            <button
              type="button"
              onClick={() => {
                setShowWaPrompt(false);
                if (pendingWaUrl) {
                  window.open(pendingWaUrl, '_blank');
                }
              }}
              style={{
                width: '100%',
                height: '48px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '15px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(37, 211, 102, 0.45)',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
              </svg>
              <span>Confirm</span>
            </button>

            {/* Cancel: Stay on website */}
            <button
              type="button"
              onClick={() => setShowWaPrompt(false)}
              style={{
                width: '100%',
                height: '42px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.85)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
  );
}
