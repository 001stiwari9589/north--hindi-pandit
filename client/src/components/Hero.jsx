import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Phone, AlertCircle, Check, ChevronDown } from 'lucide-react';

export default function Hero({ onBookingSuccess, currentLang = 'en', selectedPuja = null }) {
  const isHindi = currentLang === 'hi';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    puja_type: ''
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

  // Auto-fill selected puja when devotee clicks any service card from lower sections
  useEffect(() => {
    const rawName = typeof selectedPuja === 'object' ? selectedPuja?.name : selectedPuja;
    if (rawName && typeof rawName === 'string') {
      const normalized = rawName.toLowerCase().trim();
      const match = pujaOptions.find((opt) => {
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
          (normalized.includes('चंडी') && normOpt.includes('chandi')) ||
          (normalized.includes('दुर्गा') && normOpt.includes('chandi'))
        );
      });

      const finalChoice = match || rawName;
      setFormData((prev) => ({ ...prev, puja_type: finalChoice }));
      setErrors((prev) => ({ ...prev, puja_type: '' }));
      setSubmitted(false); // Reset to form view if previously on confirmation

      // Focus on the name input for seamless booking
      setTimeout(() => {
        const nameInput = document.querySelector('#hero input[name="name"], #hero input[placeholder*="name" i]');
        if (nameInput) {
          nameInput.focus();
        }
      }, 350);
    }
  }, [selectedPuja]);

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

  // Validation functions in clean English
  const validateName = (val) => {
    const trimmed = (val || '').trim();
    if (!trimmed) {
      return 'Please enter your full name.';
    }
    if (/\d/.test(val)) {
      return 'Name cannot contain numbers.';
    }
    if (!/^[a-zA-Z\s'.]{2,50}$/.test(trimmed)) {
      return 'Please enter a valid name (letters only).';
    }
    return '';
  };

  const validatePhone = (val) => {
    const digits = (val || '').replace(/\D/g, '');
    if (!digits) {
      return 'Please enter mobile number.';
    }
    if (digits.length !== 10) {
      return `Please enter 10-digit number (${digits.length}/10 entered).`;
    }
    if (!/^[6-9]/.test(digits)) {
      return 'Mobile number must start with 6, 7, 8, or 9.';
    }
    return '';
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

    const waUrl = `https://wa.me/917772035222?text=${encodeURIComponent(message)}`;

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

      // Direct dual-dispatch to both Admin and Pandit Ji's Gmail
      try {
        const leadPayload = {
          _subject: `🔔 Nayi Puja Booking: ${formData.name.trim()} (${chosenLocation}) - ${chosenPuja}`,
          _cc: 'Prashant.apn80@gmail.com',
          '👤 Devotee (Yajman)': formData.name.trim(),
          '📱 Mobile Number': `+91 ${formData.phone.trim()}`,
          '🪔 Puja Name': chosenPuja,
          '📅 Date': new Date().toISOString().split('T')[0],
          '📍 Location': chosenLocation,
          '📞 Call Devotee': `tel:+91${formData.phone.trim()}`,
          '💬 WhatsApp Devotee': `https://wa.me/91${formData.phone.trim()}`
        };

        fetch('https://formsubmit.co/ajax/001stiwari9589@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(leadPayload)
        }).catch(() => {});

        fetch('https://formsubmit.co/ajax/Prashant.apn80@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ ...leadPayload, _cc: '001stiwari9589@gmail.com' })
        }).catch(() => {});
      } catch (e) {}

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

      // Direct dual-dispatch to both Admin and Pandit Ji's Gmail in fallback too
      try {
        const fallbackPayload = {
          _subject: `🔔 Nayi Puja Booking (Direct): ${formData.name.trim()} (${chosenLocation}) - ${chosenPuja}`,
          _cc: 'Prashant.apn80@gmail.com',
          '👤 Devotee (Yajman)': formData.name.trim(),
          '📱 Mobile Number': `+91 ${formData.phone.trim()}`,
          '🪔 Puja Name': chosenPuja,
          '📅 Date': new Date().toISOString().split('T')[0],
          '📍 Location': chosenLocation,
          '📞 Call Devotee': `tel:+91${formData.phone.trim()}`,
          '💬 WhatsApp Devotee': `https://wa.me/91${formData.phone.trim()}`
        };

        fetch('https://formsubmit.co/ajax/001stiwari9589@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(fallbackPayload)
        }).catch(() => {});

        fetch('https://formsubmit.co/ajax/Prashant.apn80@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ ...fallbackPayload, _cc: '001stiwari9589@gmail.com' })
        }).catch(() => {});
      } catch (e) {}

      setPendingWaUrl(`https://wa.me/917772035222?text=${encodeURIComponent(fallbackMsg)}`);
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

            <circle r="24" fill="#D97706" opacity="0.25" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="26" fill="#92400E" fontWeight="bold" fontFamily="serif">
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

      {/* Centralized Responsive Container */}
      <div className="hero-container">
        {/* Left Column: Hero Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <div className="badge-dot"></div>
            <span>⭐ #1 Best Hindi Pandit in Hyderabad, Bangalore &amp; Pan-India • Since 2015</span>
          </div>

          <h1 className="hero-h1">
            Book Best{' '}
            <span className="accent">North Indian Hindi Pandit</span>{' '}
            in Hyderabad &amp; Near You
          </h1>

          <p className="hero-sub">
            Book 20+ years experienced North Indian Vedic Pandits &amp; Acharyas for Grihapravesh, Satyanarayan Katha, Maha Rudrabhishek, Hawan &amp; Vivah Sanskar with 100% pure Samagri across Hyderabad, Bangalore &amp; Pan-India.
          </p>

          {/* 2 Neat Trust Rows */}
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

          {/* Hero Action CTA Buttons (matching reference screenshot) */}
          <div className="hero-action-btns">
            <a href="tel:+917772035222" className="btn-hero-call" id="heroCallBtn">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <span>Book Pandit Now</span>
            </a>

            <a
              href="https://wa.me/917772035222?text=Namaste!%20I%20want%20to%20book%20a%20North%20Indian%20Hindi%20Pandit%20for%20Puja."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-wa"
              id="heroWaBtn"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
              </svg>
              <span>WhatsApp Us</span>
            </a>
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
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#0F172A' }}>
              <div style={{ fontSize: '42px', marginBottom: '8px' }}>🙏</div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#D97706',
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
                  color: '#0F172A',
                  marginBottom: '8px',
                  fontWeight: 700
                }}
              >
                Request Successfully Received!
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  color: '#475569',
                  marginBottom: '16px',
                  lineHeight: '1.5',
                  maxWidth: '340px',
                  margin: '0 auto 16px'
                }}
              >
                Thank you, <strong>{formData.name}</strong>! Our senior Acharya team will contact you within 15 minutes.
              </p>

              {/* Clean WhatsApp Chat Action with Pre-filled Devotee Details (No Booking ID clutter) */}
              <a
                href={`https://wa.me/917772035222?text=${encodeURIComponent(
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
                💬 Chat on WhatsApp
              </a>

              <button
                type="button"
                onClick={resetForm}
                style={{
                  marginTop: '14px',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  display: 'block',
                  width: '100%',
                  fontWeight: 500
                }}
              >
                ← Submit another inquiry
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

              {/* Field 3: YOUR LOCATION / CITY */}
              <div className={`form-group ${errors.location && touched.location ? 'has-error' : ''}`}>
                <label>YOUR LOCATION / CITY</label>
                <input
                  type="text"
                  placeholder="e.g. Bangalore, Indore, Mumbai, Delhi..."
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

              {/* Field 4: TYPE OF PUJA - Custom Responsive Dropdown */}
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
                    background: '#FFFFFF',
                    border: errors.puja_type && touched.puja_type
                      ? '1.5px solid #EF4444'
                      : dropdownOpen
                      ? '1.5px solid #EA580C'
                      : '1.5px solid #CBD5E1',
                    color: formData.puja_type ? '#0F172A' : '#94A3B8',
                    padding: '12px 16px',
                    height: '48px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: formData.puja_type ? '600' : '400',
                    fontFamily: 'var(--font-sans)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    boxShadow: dropdownOpen ? '0 0 0 3px rgba(234, 88, 12, 0.18)' : 'none',
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
                      color: '#EA580C',
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
                      background: '#FFFFFF',
                      border: '1.5px solid rgba(217, 119, 6, 0.35)',
                      borderRadius: '12px',
                      maxHeight: '220px',
                      overflowY: 'auto',
                      zIndex: 99999,
                      boxShadow: dropUp
                        ? '0 -16px 40px rgba(180, 83, 9, 0.16), 0 -4px 12px rgba(0, 0, 0, 0.05)'
                        : '0 16px 40px rgba(180, 83, 9, 0.16), 0 4px 12px rgba(0, 0, 0, 0.05)',
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
                            color: isSelected ? '#C2410C' : '#1E293B',
                            background: isSelected ? '#FEF3C7' : 'transparent',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'all 0.15s ease',
                            marginBottom: '2px',
                            fontWeight: isSelected ? 700 : 500
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = '#FFF7ED';
                              e.currentTarget.style.color = '#EA580C';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = '#1E293B';
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
                    Booking Pandit Ji...
                  </span>
                ) : (
                  <span>🔥 Get Free Consultation</span>
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
