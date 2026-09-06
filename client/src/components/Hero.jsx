import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Phone, AlertCircle, Copy, Check, Calendar } from 'lucide-react';

export default function Hero({ onBookingSuccess, currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    puja_type: 'Satyanarayan Puja',
    city: 'Bangalore',
    date: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    puja_type: '',
    city: '',
    date: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    puja_type: false,
    city: false,
    date: false
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const dateEl = document.getElementById('lead-date');
    if (dateEl) {
      dateEl.min = todayStr;
    }
  }, []);

  // Validation functions
  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return isHindi ? 'कृपया अपना नाम दर्ज करें।' : 'Please enter your full name.';
    }
    // Reject any numbers or digits
    if (/\d/.test(val)) {
      return isHindi
        ? '⚠️ नाम में केवल अक्षर (Letters) होने चाहिए, संख्या नहीं!'
        : '⚠️ Name cannot contain numbers. Letters only!';
    }
    // Only letters (English + Hindi devanagari), spaces, periods, apostrophes
    if (!/^[a-zA-Z\s\u0900-\u097F'.]{2,50}$/.test(trimmed)) {
      return isHindi
        ? '⚠️ कृपया वैध नाम दर्ज करें (कम से कम 2 अक्षर, केवल वर्ण)।'
        : '⚠️ Please enter a valid name (at least 2 letters, no special characters).';
    }
    return '';
  };

  const validatePhone = (val) => {
    const digits = (val || '').replace(/\D/g, '');
    if (!digits) {
      return isHindi ? 'कृपया 10-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter 10-digit mobile number.';
    }
    if (digits.length !== 10) {
      return isHindi
        ? `कृपया पूरा 10-अंकों का मोबाइल नंबर दर्ज करें (${digits.length}/10 अंक दर्ज)।`
        : `Please enter full 10 digits (${digits.length}/10 entered).`;
    }
    if (!/^[6-9]/.test(digits)) {
      return isHindi
        ? '⚠️ मोबाइल नंबर 6, 7, 8 या 9 से शुरू होना चाहिए।'
        : '⚠️ Mobile number must start with 6, 7, 8, or 9.';
    }
    return '';
  };

  const validateDate = (val) => {
    if (!val) return '';
    const selected = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selected < today) {
      return isHindi ? '⚠️ पिछली तारीख नहीं चुन सकते।' : '⚠️ Cannot select a past date.';
    }
    return '';
  };

  const handleNameChange = (e) => {
    const rawVal = e.target.value;
    const hasDigits = /\d/.test(rawVal);
    // Automatically strip numbers so user can't type digits
    const cleaned = rawVal.replace(/[0-9]/g, '');

    setFormData((prev) => ({ ...prev, name: cleaned }));

    if (hasDigits) {
      setErrors((prev) => ({
        ...prev,
        name: isHindi
          ? '⚠️ नाम में केवल अक्षर दर्ज करें (संख्या नहीं स्वीकार की जाएगी)!'
          : '⚠️ Numbers are not allowed in Name! Only letters accepted.'
      }));
    } else if (touched.name) {
      setErrors((prev) => ({ ...prev, name: validateName(cleaned) }));
    }
  };

  const handlePhoneChange = (e) => {
    // Only digits, maximum 10
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
    } else if (field === 'date') {
      setErrors((prev) => ({ ...prev, date: validateDate(formData.date) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      puja_type: true,
      city: true,
      date: true
    });

    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);
    const dateErr = validateDate(formData.date);

    if (nameErr || phoneErr || dateErr) {
      setErrors({
        name: nameErr,
        phone: phoneErr,
        puja_type: '',
        city: '',
        date: dateErr
      });
      return;
    }

    setLoading(true);

    const message =
      `Namaste Acharya Ji! I want to book a verified North Indian Hindi Pandit for Puja.\n\n` +
      `*Name:* ${formData.name.trim()}\n` +
      `*Phone:* ${formData.phone.trim()}\n` +
      `*Puja Type:* ${formData.puja_type}\n` +
      `*City / Location:* ${formData.city}\n` +
      `*Preferred Date:* ${formData.date || 'Earliest Shubh Muhurat'}`;

    const waUrl = `https://wa.me/919589018011?text=${encodeURIComponent(message)}`;

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName: formData.name.trim(),
          phoneNumber: formData.phone.trim(),
          pujaType: formData.puja_type,
          pujaDate: formData.date || new Date().toISOString().split('T')[0],
          cityArea: formData.city,
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
    } catch (err) {
      const fallbackRef = 'NHP-' + Math.floor(100000 + Math.random() * 900000);
      setBookingRef(fallbackRef);
    } finally {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 110,
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
      puja_type: 'Satyanarayan Puja',
      city: 'Bangalore',
      date: ''
    });
    setErrors({
      name: '',
      phone: '',
      puja_type: '',
      city: '',
      date: ''
    });
    setTouched({
      name: false,
      phone: false,
      puja_type: false,
      city: false,
      date: false
    });
    setSubmitted(false);
  };

  return (
    <section id="hero">
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

      {/* Right Column: Luxury Glass Consultation Form matching reference */}
      <div className="hero-form-wrap">
        <div className="form-card">
          <div className="form-header">
            <div className="form-om">ॐ</div>
            <div className="form-title">Get Free Puja Consultation</div>
            <div className="form-sub">We'll call you back within 15 minutes</div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '16px 8px', color: 'white' }}>
              <div style={{ fontSize: '36px', marginBottom: '6px' }}>🙏</div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#F7DC6F',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  marginBottom: '4px'
                }}
              >
                ॐ शुभम् करोति कल्याणम्
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '19px',
                  color: 'white',
                  marginBottom: '6px',
                  fontWeight: 700
                }}
              >
                {isHindi ? 'परामर्श अनुरोध प्राप्त हुआ!' : 'Consultation Request Received!'}
              </h3>
              <p
                style={{
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.85)',
                  marginBottom: '10px',
                  lineHeight: '1.4'
                }}
              >
                धन्यवाद, <strong>{formData.name}</strong>! Our Senior Acharya will call you back within 15 minutes.
              </p>

              {/* Booking ID badge with copy */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(247,220,111,0.3)',
                  padding: '5px 12px',
                  borderRadius: '6px',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.7)' }}>Booking ID:</span>
                <strong style={{ fontSize: '12.5px', color: '#F7DC6F', letterSpacing: '0.5px' }}>{bookingRef}</strong>
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

              {/* Details Pill */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '6px',
                  flexWrap: 'wrap',
                  marginBottom: '14px'
                }}
              >
                <span
                  style={{
                    fontSize: '10.5px',
                    background: 'rgba(255,160,0,0.22)',
                    border: '1px solid rgba(255,160,0,0.4)',
                    color: '#FFE082',
                    padding: '3px 9px',
                    borderRadius: '12px'
                  }}
                >
                  🪔 {formData.puja_type}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    background: 'rgba(255,255,255,0.12)',
                    color: 'white',
                    padding: '3px 9px',
                    borderRadius: '12px'
                  }}
                >
                  📍 {formData.city}
                </span>
              </div>

              {/* Direct Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a
                  href={`https://wa.me/919589018011?text=${encodeURIComponent(
                    `Namaste Acharya Ji! My booking ID is ${bookingRef}. Please confirm pandit availability for ${formData.puja_type} at ${formData.city}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-form-consult"
                  style={{
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    boxShadow: '0 4px 14px rgba(37,211,102,0.4)',
                    color: 'white',
                    height: '40px',
                    fontSize: '13.5px',
                    marginTop: '0'
                  }}
                >
                  💬 Chat on WhatsApp (+91 95890 18011)
                </a>

                <a
                  href="tel:+919589018011"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  <Phone size={14} /> Call Acharya Ji: +91 95890 18011
                </a>
              </div>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginTop: '12px',
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '11px',
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
            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field: Strictly letters only, no numbers allowed */}
              <div className={`form-group ${errors.name && touched.name ? 'has-error' : touched.name && !errors.name && formData.name ? 'is-valid' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>{isHindi ? 'आपका नाम (केवल अक्षर)' : 'YOUR NAME (LETTERS ONLY) *'}</label>
                  {touched.name && !errors.name && formData.name && (
                    <span style={{ color: '#10B981', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CheckCircle2 size={10} /> Valid
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  placeholder={isHindi ? 'उदा. राहुल शर्मा' : 'Enter full name (e.g. Ramesh Sharma)'}
                  value={formData.name}
                  onChange={handleNameChange}
                  onBlur={() => handleBlur('name')}
                  maxLength={50}
                  required
                />
                {errors.name && touched.name ? (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.name}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                    * Numbers not allowed / संख्या नहीं हो सकती
                  </div>
                )}
              </div>

              {/* Phone Field: Strictly 10 digits starting with 6-9 */}
              <div className={`form-group ${errors.phone && touched.phone ? 'has-error' : touched.phone && !errors.phone && formData.phone.length === 10 ? 'is-valid' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>{isHindi ? 'मोबाइल नंबर (10 अंक)' : 'PHONE NUMBER (10 DIGITS) *'}</label>
                  {touched.phone && !errors.phone && formData.phone.length === 10 && (
                    <span style={{ color: '#10B981', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <CheckCircle2 size={10} /> Verified Format
                    </span>
                  )}
                </div>
                <div className="phone-input-wrap">
                  <span className="phone-prefix-badge">🇮🇳 +91</span>
                  <input
                    type="tel"
                    placeholder="95890 18011"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={() => handleBlur('phone')}
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phone && touched.phone ? (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.phone}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                    * Enter 10-digit mobile (starts with 6, 7, 8, 9)
                  </div>
                )}
              </div>

              {/* Type of Puja Dropdown */}
              <div className="form-group">
                <label>{isHindi ? 'पूजा का प्रकार' : 'TYPE OF PUJA *'}</label>
                <select
                  value={formData.puja_type}
                  onChange={(e) => setFormData({ ...formData, puja_type: e.target.value })}
                  required
                >
                  <option value="Satyanarayan Puja">Satyanarayan Puja &amp; Katha (श्री सत्यनारायण)</option>
                  <option value="Grihapravesh Puja">Grihapravesh Vastu Puja (गृह प्रवेश)</option>
                  <option value="Rudrabhishek Puja">Maha Rudrabhishek (महा रुद्राभिषेक)</option>
                  <option value="Marriage / Vivah Puja">Marriage / Vivah Sanskar (विवाह संस्कार)</option>
                  <option value="Ganesh Puja">Ganesh Puja &amp; Hawan (गणेश पूजन)</option>
                  <option value="Maha Lakshmi Puja">Maha Lakshmi &amp; Kuber Puja (लक्ष्मी कुबेर पूजन)</option>
                  <option value="Office Opening Puja">Office / Shop Opening Puja (व्यापार मुहूर्त)</option>
                  <option value="Navagraha Shanti Puja">Navagraha Shanti Puja (नवग्रह शांति)</option>
                  <option value="Namkaran Sanskar">Namkaran Sanskar (नामकरण संस्कार)</option>
                  <option value="Maha Mrityunjaya Jaap">Maha Mrityunjaya Jaap &amp; Hawan (मृत्युंजय जप)</option>
                  <option value="Chandi Hawan">Chandi Hawan &amp; Durga Puja (चंडी हवन)</option>
                  <option value="Any Other Custom Puja">Any Other Custom Puja &amp; Hawan (अन्य पूजा)</option>
                </select>
              </div>

              {/* City / Locality Dropdown */}
              <div className="form-group">
                <label>{isHindi ? 'शहर / स्थान' : 'CITY / LOCALITY *'}</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                >
                  <option value="Bangalore">Bangalore (All Localities - Whitefield, Bellandur, Marathahalli, Electronic City, etc.)</option>
                  <option value="Hyderabad">Hyderabad (Madhapur, Gachibowli, Kondapur, Kukatpally)</option>
                  <option value="Pune">Pune (Hinjewadi, Wakad, Kharadi, Baner)</option>
                  <option value="Mumbai">Mumbai &amp; Navi Mumbai / Thane</option>
                  <option value="Delhi-NCR">Delhi, Noida, Gurgaon, Ghaziabad, Faridabad</option>
                  <option value="Other City">Other City (All India Home Visit / Online)</option>
                </select>
              </div>

              {/* Preferred Date Field */}
              <div className={`form-group ${errors.date ? 'has-error' : ''}`}>
                <label>{isHindi ? 'पसंदीदा तिथि (वैकल्पिक)' : 'PREFERRED PUJA DATE (OPTIONAL)'}</label>
                <input
                  id="lead-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  onBlur={() => handleBlur('date')}
                />
                {errors.date && (
                  <div className="form-error-msg">
                    <AlertCircle size={12} />
                    <span>{errors.date}</span>
                  </div>
                )}
              </div>

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
                    {isHindi ? 'पंडित जी बुक हो रहे हैं...' : 'Booking Pandit Ji...'}
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
