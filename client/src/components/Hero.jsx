import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Phone, AlertCircle, Copy, Check, ChevronDown } from 'lucide-react';

export default function Hero({ onBookingSuccess, currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    puja_type: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    puja_type: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    puja_type: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);

  // Custom Dropdown State & Ref
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef(null);

  const pujaOptions = [
    'Satyanarayan Puja & Katha',
    'Grihapravesh Vastu Puja',
    'Maha Rudrabhishek',
    'Marriage / Vivah Sanskar',
    'Ganesh Puja & Hawan',
    'Maha Lakshmi & Kuber Puja',
    'Office / Shop Opening Puja',
    'Navagraha Shanti Puja',
    'Namkaran Sanskar',
    'Maha Mrityunjaya Jaap & Hawan',
    'Chandi Hawan & Durga Puja',
    'Any Other Custom Puja & Hawan'
  ];

  // Smart toggle: Check viewport space below to open upwards if close to bottom
  const toggleDropdown = () => {
    if (!dropdownOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 230px available below, flip upwards
      setDropUp(spaceBelow < 230);
    }
    setDropdownOpen((prev) => !prev);
    setTouched((prev) => ({ ...prev, puja_type: true }));
  };

  // Close dropdown on click outside & re-evaluate on scroll/resize
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    const handleScrollOrResize = () => {
      if (dropdownOpen && dropdownRef.current) {
        const rect = dropdownRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        setDropUp(spaceBelow < 230);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [dropdownOpen]);

  // Validation functions (silent until touched / submitted)
  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return isHindi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your full name.';
    }
    if (/\d/.test(val)) {
      return isHindi
        ? 'नाम में केवल अक्षर होने चाहिए, संख्या नहीं!'
        : 'Name cannot contain numbers.';
    }
    if (!/^[a-zA-Z\s\u0900-\u097F'.]{2,50}$/.test(trimmed)) {
      return isHindi
        ? 'कृपया मान्य नाम दर्ज करें।'
        : 'Please enter a valid name (letters only).';
    }
    return '';
  };

  const validatePhone = (val) => {
    const digits = (val || '').replace(/\D/g, '');
    if (!digits) {
      return isHindi ? 'कृपया मोबाइल नंबर दर्ज करें।' : 'Please enter mobile number.';
    }
    if (digits.length !== 10) {
      return isHindi
        ? `कृपया 10-अंकों का नंबर दर्ज करें (${digits.length}/10 अंक दर्ज)।`
        : `Please enter 10-digit number (${digits.length}/10 entered).`;
    }
    if (!/^[6-9]/.test(digits)) {
      return isHindi
        ? 'नंबर 6, 7, 8 या 9 से शुरू होना चाहिए।'
        : 'Mobile number must start with 6, 7, 8, or 9.';
    }
    return '';
  };

  const validatePuja = (val) => {
    if (!val || !val.trim()) {
      return isHindi ? 'कृपया पूजा का प्रकार चुनें।' : 'Please select a puja type.';
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
        name: isHindi ? 'नाम में केवल अक्षर होने चाहिए!' : 'Letters only, numbers not allowed!'
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

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'name') {
      setErrors((prev) => ({ ...prev, name: validateName(formData.name) }));
    } else if (field === 'phone') {
      setErrors((prev) => ({ ...prev, phone: validatePhone(formData.phone) }));
    } else if (field === 'puja_type') {
      setErrors((prev) => ({ ...prev, puja_type: validatePuja(formData.puja_type) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      puja_type: true
    });

    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const pujaErr = validatePuja(formData.puja_type);

    if (nameErr || phoneErr || pujaErr) {
      setErrors({
        name: nameErr,
        phone: phoneErr,
        puja_type: pujaErr
      });
      return;
    }

    setLoading(true);

    const chosenPuja = formData.puja_type || 'Satyanarayan Puja';
    const message =
      `Namaste Acharya Ji! I want to book a verified North Indian Hindi Pandit for Puja.\n\n` +
      `*Name:* ${formData.name.trim()}\n` +
      `*Phone:* ${formData.phone.trim()}\n` +
      `*Puja Type:* ${chosenPuja}\n` +
      `*Preferred Date:* Earliest Shubh Muhurat`;

    const waUrl = `https://wa.me/919589018011?text=${encodeURIComponent(message)}`;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName: formData.name.trim(),
          phoneNumber: formData.phone.trim(),
          pujaType: chosenPuja,
          pujaDate: new Date().toISOString().split('T')[0],
          cityArea: 'Bangalore / Local Area',
          notes: 'Hero Consultation Form'
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

      // Automatically launch WhatsApp with pre-filled message (just like Tathastu Puja)
      const autoWaMsg =
        `*जय सिया राम! New Puja Booking Request*\n\n` +
        `*Devotee Name:* ${formData.name.trim()}\n` +
        `*Phone:* ${formData.phone.trim()}\n` +
        `*Puja Type:* ${chosenPuja}\n` +
        `*Booking ID:* ${ref}\n\n` +
        `Kripya pandit ji availability aur shubh muhurat confirm karein. Dhanyawad!`;
      const autoWaUrl = `https://wa.me/919589018011?text=${encodeURIComponent(autoWaMsg)}`;

      try {
        window.open(autoWaUrl, '_blank');
      } catch (popupErr) {
        // Fallback if browser blocks popups
      }
    } catch (err) {
      const fallbackRef = 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(fallbackRef);

      const fallbackMsg =
        `*जय सिया राम! New Puja Booking Request*\n\n` +
        `*Devotee Name:* ${formData.name.trim()}\n` +
        `*Phone:* ${formData.phone.trim()}\n` +
        `*Puja Type:* ${chosenPuja}\n` +
        `*Booking ID:* ${fallbackRef}\n\n` +
        `Kripya pandit ji availability aur shubh muhurat confirm karein. Dhanyawad!`;
      try {
        window.open(`https://wa.me/919589018011?text=${encodeURIComponent(fallbackMsg)}`, '_blank');
      } catch (e) {}
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
      puja_type: ''
    });
    setErrors({
      name: '',
      phone: '',
      puja_type: ''
    });
    setTouched({
      name: false,
      phone: false,
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
            <circle r="380" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle r="330" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="6 4" fill="none" />
            <circle r="270" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle r="210" stroke="#D4AF37" strokeWidth="0.5" fill="none" />
            <circle r="150" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <circle r="90" stroke="#D4AF37" strokeWidth="0.5" fill="none" />

            {/* 16 Sacred Lotus Petals */}
            <g id="mandala-petals">
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle) => (
                <ellipse
                  key={angle}
                  cx="0"
                  cy="-300"
                  rx="18"
                  ry="55"
                  fill="#D4AF37"
                  opacity="0.38"
                  transform={`rotate(${angle})`}
                />
              ))}
            </g>

            {/* Ashtakon (Sacred Octagram Interlocking Squares) */}
            <rect x="-180" y="-180" width="360" height="360" stroke="#D4AF37" strokeWidth="0.75" fill="none" opacity="0.4" />
            <rect x="-180" y="-180" width="360" height="360" stroke="#D4AF37" strokeWidth="0.75" fill="none" opacity="0.4" transform="rotate(45)" />

            <circle r="24" fill="#D4AF37" opacity="0.65" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="26" fill="#2A040C" fontWeight="bold" fontFamily="serif">
              ॐ
            </text>
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

      {/* Left Column: Hero Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <div className="badge-dot"></div>
          <span>• Serving All Major Cities Since 2015</span>
        </div>

        <h1 className="hero-h1">
          Book Experienced<br />
          <span className="accent">North Indian Hindi Pandit</span><br />
          For Authentic Vedic Pujas
        </h1>

        <p className="hero-sub">
          For Grihapravesh, Satyanarayan Puja, Rudrabhishek, Ganesh Puja,<br />
          Marriage Puja &amp; all Hindu rituals — performed with authentic Vedic tradition.
        </p>

        {/* 2 Neat Trust Rows matching reference */}
        <div className="hero-trust-rows">
          <div className="trust-row">
            <span>⭐ 4.9/5 Rating</span>
            <span>🙏 15,000+ Happy Families</span>
            <span>📅 20+ Years Experience</span>
          </div>
          <div className="trust-row">
            <span>✅ 30+ Verified Pandits</span>
            <span>🎁 Samagri Included</span>
          </div>
        </div>
      </div>

      {/* Right Column: Clean & Stylish Luxury Glass Consultation Form */}
      <div className="hero-form-wrap">
        <div className="form-card">
          <div className="form-header">
            <div className="form-om">ॐ</div>
            <div className="form-title">Get Free Puja Consultation</div>
            <div className="form-sub">We'll call you back within 15 minutes</div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: 'white' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>🙏</div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#F7DC6F',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  marginBottom: '6px'
                }}
              >
                ॐ शुभम् करोति कल्याणम्
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '21px',
                  color: 'white',
                  marginBottom: '8px',
                  fontWeight: 700
                }}
              >
                {isHindi ? 'अनुरोध सफलतापूर्वक प्राप्त हुआ!' : 'Request Successfully Received!'}
              </h3>
              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.88)',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                  maxWidth: '340px',
                  margin: '0 auto 16px'
                }}
              >
                धन्यवाद, <strong>{formData.name}</strong>! हमारी वरिष्ठ आचार्य टीम 15 मिनट के अंदर आपसे संपर्क करेगी।
              </p>

              {/* Clean Booking Reference Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(247,220,111,0.35)',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}
              >
                <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)' }}>Booking ID:</span>
                <strong style={{ fontSize: '13px', color: '#F7DC6F', letterSpacing: '0.5px' }}>{bookingRef}</strong>
                <button
                  type="button"
                  onClick={copyBookingId}
                  title="Copy ID"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: copied ? '#10B981' : '#F7DC6F',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '2px'
                  }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>

              {/* Clean WhatsApp Chat Action */}
              <a
                href={`https://wa.me/919589018011?text=${encodeURIComponent(
                  `Namaste Acharya Ji! Mera booking ID ${bookingRef} hai. Kripya ${formData.puja_type || 'Puja'} ke shubh mahurat aur pandit ji ke liye sampark karein.`
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
                💬 Chat on WhatsApp (+91 95890 18011)
              </a>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginTop: '14px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'block',
                  width: '100%'
                }}
              >
                ← {isHindi ? 'दूसरा अनुरोध दर्ज करें' : 'Submit another inquiry'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              {/* Field 1: YOUR NAME */}
              <div className={`form-group ${errors.name && touched.name ? 'has-error' : ''}`}>
                <label>YOUR NAME</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
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
                <label>PHONE NUMBER</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
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

              {/* Field 3: TYPE OF PUJA - Custom Responsive Dropdown */}
              <div className={`form-group ${errors.puja_type && touched.puja_type ? 'has-error' : ''}`} ref={dropdownRef}>
                <label>TYPE OF PUJA</label>
                {/* Hidden native select for cross-component compatibility */}
                <select
                  style={{ display: 'none' }}
                  value={formData.puja_type}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, puja_type: e.target.value }));
                    setErrors((prev) => ({ ...prev, puja_type: '' }));
                  }}
                >
                  <option value="">Select puja type</option>
                  {pujaOptions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>

                <div
                  className="custom-select-trigger"
                  onClick={toggleDropdown}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.38)',
                    border: errors.puja_type && touched.puja_type
                      ? '1.5px solid #EF4444'
                      : dropdownOpen
                      ? '1.5px solid #FFA000'
                      : '1.5px solid rgba(255, 255, 255, 0.18)',
                    color: formData.puja_type ? 'white' : 'rgba(255, 255, 255, 0.48)',
                    padding: '12px 16px',
                    height: '48px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: dropdownOpen ? '0 0 0 3px rgba(255, 160, 0, 0.24)' : 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {formData.puja_type || 'Select puja type'}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      color: '#F7DC6F',
                      transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      flexShrink: 0,
                      marginLeft: '8px'
                    }}
                  />
                </div>

                {/* Responsive Dropdown Menu - Smart auto-flip (drops up or down based on screen space) */}
                {dropdownOpen && (
                  <div
                    className="custom-dropdown-menu"
                    style={{
                      position: 'absolute',
                      top: dropUp ? 'auto' : 'calc(100% + 6px)',
                      bottom: dropUp ? 'calc(100% + 6px)' : 'auto',
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(180deg, #320612 0%, #1A0309 100%)',
                      border: '1.5px solid rgba(212, 175, 55, 0.45)',
                      borderRadius: '12px',
                      maxHeight: '210px',
                      overflowY: 'auto',
                      zIndex: 100,
                      boxShadow: dropUp
                        ? '0 -16px 44px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.18)'
                        : '0 16px 44px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.15)',
                      padding: '6px'
                    }}
                  >
                    {pujaOptions.map((puja) => {
                      const isSelected = formData.puja_type === puja;
                      return (
                        <div
                          key={puja}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, puja_type: puja }));
                            setErrors((prev) => ({ ...prev, puja_type: '' }));
                            setDropdownOpen(false);
                          }}
                          style={{
                            padding: '10px 14px',
                            fontSize: '13.5px',
                            color: isSelected ? '#F7DC6F' : 'rgba(255, 255, 255, 0.92)',
                            background: isSelected ? 'rgba(255, 160, 0, 0.2)' : 'transparent',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease',
                            marginBottom: '2px',
                            fontWeight: isSelected ? 600 : 400
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                              e.currentTarget.style.color = '#FFE082';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.92)';
                            }
                          }}
                        >
                          <span>{puja}</span>
                          {isSelected && <Check size={15} style={{ color: '#10B981', flexShrink: 0 }} />}
                        </div>
                      );
                    })}
                  </div>
                )}

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
                    {isHindi ? 'कृपया प्रतीक्षा करें...' : 'Booking Pandit Ji...'}
                  </span>
                ) : (
                  <span>🔥 {isHindi ? 'निशुल्क परामर्श प्राप्त करें' : 'Get Free Consultation'}</span>
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
    </section>
  );
}
