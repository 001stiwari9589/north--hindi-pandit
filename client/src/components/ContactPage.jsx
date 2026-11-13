import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Calendar,
  User,
  MapPinned,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../translations';

export default function ContactPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

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
  const dropdownRef = useRef(null);

  const defaultPujaOptions = [
    'Grihapravesh Vastu Puja',
    'Satyanarayan Puja & Katha',
    'Maha Rudrabhishek',
    'Marriage / Vivah Sanskar',
    'Ganesh Puja & Hawan',
    'Maha Lakshmi & Kuber Puja',
    'Navagraha Shanti & Hawan',
    'Durga Puja & Chandi Hawan',
    'Shraddh & Tarpan Vidhi',
    'Office & Shop Opening Puja',
    'Maha Mrityunjaya Jaap',
    'Any Other Puja'
  ];

  const currentPujaOptions = t.pujaOptions || defaultPujaOptions;

  // Auto-reset form state on component mount / navigation
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

  // Close dropdown on outside click
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nameErr = validateName(formData.name);
    const phoneErr = validatePhone(formData.phone);

    if (nameErr || phoneErr) {
      setTouched({ name: true, phone: true });
      setErrors({ name: nameErr, phone: phoneErr });
      return;
    }

    setSubmitting(true);
    try {
      await fetch('https://formsubmit.co/ajax/Northhindipandit.hyd80@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          preferredPuja: formData.pujaType || 'General Vedic Consultation',
          message: `Location: ${formData.location || 'Hyderabad'} | Preferred Date: ${formData.preferredDate || 'Flexible'} | Requirements: ${formData.message || 'Consultation request'}`
        })
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setSubmitted(true);
    } catch {
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
      
      {/* SECTION 1: HERO HEADER (Royal Navy Blue #07152B with 1-Arrow Back Button) */}
      <section style={{
        background: 'linear-gradient(180deg, #07152B 0%, #0B1930 100%)',
        color: '#FFFFFF',
        padding: '36px 20px 48px',
        borderBottom: '3px solid #D4A640',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          
          {/* Top Bar with Single Arrow Back Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <button
              onClick={handleReturnHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FAF7F0',
                padding: '8px 18px',
                borderRadius: '100px',
                fontSize: '13px',
                fontWeight: '600',
                border: '1px solid rgba(212, 166, 64, 0.4)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.color = '#FAF7F0'; }}
            >
              <ArrowLeft style={{ width: '16px', height: '16px', color: '#D4A640' }} />
              <span>{t.contactBackHome || 'Back to Home'}</span>
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(250, 247, 240, 0.85)', fontWeight: '500' }}>
              <span style={{ color: '#D4A640' }}>ॐ</span>
              <span style={{ cursor: 'pointer' }} onClick={handleReturnHome}>{t.contactBreadcrumbHome || 'Home'}</span>
              <span>/</span>
              <span style={{ color: '#D4A640', fontWeight: '700' }}>{t.contactBreadcrumbCurrent || 'Contact Us'}</span>
            </div>
          </div>

          {/* Center Heading & Subtitle */}
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: '0 0 12px'
            }}>
              {t.contactHeroTitle || 'Get in Touch With Our Acharyas'}
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              color: 'rgba(250, 247, 240, 0.9)',
              fontWeight: '400',
              lineHeight: '1.65',
              maxWidth: '680px',
              margin: '0 auto'
            }}>
              {t.contactHeroSub || 'Book Experienced North Indian Pandits for Your Auspicious Ceremonies Across Hyderabad & Pan-India.'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: MAIN CONTACT SECTION (2 Columns: 3 Cards on Left, Form on Right) */}
      <section className="contact-main-section">
        <div className="contact-two-column-grid">
          
          {/* LEFT COLUMN: EXACTLY 3 CLEAN LUXURY CARDS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ marginBottom: '6px' }}>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '24px',
                fontWeight: '700',
                color: '#17243B',
                margin: '0 0 6px'
              }}>
                {t.contactChannelsHeading || 'Connect With Our Team'}
              </h2>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
                {t.contactChannelsSub || 'Direct telephone, WhatsApp & email consultation with our senior Vedic Acharyas.'}
              </p>
            </div>

            {/* CARD 1: Direct Calling & WhatsApp */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(230, 138, 0, 0.28)'
                }}>
                  <Phone style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                    {t.contactCardPhoneTitle || 'Official Contact & WhatsApp'}
                  </div>
                  <div style={{ fontSize: '19px', color: '#17243B', fontWeight: '800', marginTop: '2px', letterSpacing: '0.2px' }}>
                    +91 9589018011
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
                    +91 91830 89880 (Head Acharya)
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call Now & WhatsApp Chat */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '2px' }}>
                <a
                  href="tel:+919589018011"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
                    color: '#FAF7F0',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Phone style={{ width: '15px', height: '15px', color: '#D4A640' }} />
                  <span>{currentLang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
                </a>
                <a
                  href="https://wa.me/919589018011?text=Namaste%20Pandit%20Ji,%20I%20would%20like%20to%20consult%20about%20puja%20booking%20and%20shubh%20muhurat."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '11px 16px',
                    borderRadius: '12px',
                    background: '#25D366',
                    color: 'white',
                    fontSize: '13.5px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <MessageCircle style={{ width: '15px', height: '15px' }} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* CARD 2: Support Email */}
            <a
              href="mailto:Northhindipandit.hyd80@gmail.com?subject=Puja%20Consultation%20Inquiry%20-%20North%20Hindi%20Pandit"
              style={{
                background: '#FFFFFF',
                border: '1.5px solid rgba(212, 166, 64, 0.45)',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 4px 20px rgba(7, 21, 43, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                textDecoration: 'none',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A640';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 26px rgba(212, 166, 64, 0.16)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 166, 64, 0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(7, 21, 43, 0.05)';
              }}
            >
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #07152B 0%, #17243B 100%)',
                color: '#D4A640',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(7, 21, 43, 0.18)'
              }}>
                <Mail style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                  {t.contactCardEmailTitle || 'Official Support Email'}
                </div>
                <strong style={{ fontSize: '15.5px', color: '#17243B', display: 'block', margin: '2px 0', fontWeight: '700', wordBreak: 'break-all' }}>
                  Northhindipandit.hyd80@gmail.com
                </strong>
                <div style={{ fontSize: '12px', color: '#E68A00', fontWeight: '600' }}>
                  {currentLang === 'hi' ? '✉️ ईमेल भेजने के लिए क्लिक करें →' : '✉️ Tap to Send Email →'}
                </div>
              </div>
            </a>

            {/* CARD 3: Operational Office Location */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #990026 0%, #68001a 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(153, 0, 38, 0.22)'
              }}>
                <MapPin style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                  {t.contactCardOfficeTitle || 'Operational Office'}
                </div>
                <strong style={{ fontSize: '16px', color: '#17243B', display: 'block', margin: '2px 0', fontWeight: '700' }}>
                  Hitec City, Madhapur, Hyderabad
                </strong>
                <div style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.5' }}>
                  Near Cyber Towers, Telangana - 500081
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONSULTATION FORM */}
          <div className="contact-form-box">
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '26px',
                fontWeight: '800',
                color: '#17243B',
                margin: '0 0 6px'
              }}>
                {t.contactFormHeading || 'Send Us a Message'}
              </h3>
              <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0, lineHeight: '1.6' }}>
                {t.contactFormSub || 'Fill in your ceremony details and our senior Acharya will call you back within 15 minutes.'}
              </p>
            </div>

            {submitted ? (
              <div style={{
                padding: '40px 24px',
                borderRadius: '18px',
                background: '#FAF7F0',
                border: '2px solid #D4A640',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#E68A00',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  boxShadow: '0 4px 16px rgba(230, 138, 0, 0.3)'
                }}>
                  <CheckCircle2 style={{ width: '36px', height: '36px' }} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '24px', fontWeight: '700', color: '#17243B', margin: '0 0 8px' }}>
                  {t.contactFormSuccessTitle || 'Inquiry Received Successfully 🙏'}
                </h4>
                <p style={{ fontSize: '14px', color: '#64748B', maxWidth: '440px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                  {t.contactFormSuccessSub || 'Pandit Ji has been alerted at Northhindipandit.hyd80@gmail.com. We will call you shortly to discuss the Shubh Muhurat and Vidhi details.'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={resetForm}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '100px',
                      background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                      color: 'white',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {t.contactFormBtnAnother || 'Send Another Inquiry'}
                  </button>
                  <button
                    onClick={handleReturnHome}
                    style={{
                      padding: '10px 22px',
                      borderRadius: '100px',
                      background: '#FFFFFF',
                      border: '1.5px solid #07152B',
                      color: '#07152B',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {t.contactFormBtnHome || 'Back to Home'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  
                  {/* Full Name */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
                      {t.contactLabelName || 'Full Name'} <span style={{ color: '#E68A00' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        placeholder={t.contactPlaceholderName || 'Enter your full name'}
                        className="contact-input-field"
                        style={{
                          borderColor: errors.name ? '#EF4444' : touched.name ? '#10B981' : 'rgba(212, 166, 64, 0.45)'
                        }}
                      />
                    </div>
                    {errors.name && (
                      <span style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Two column: Mobile Number & Location */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
                        {t.contactLabelPhone || 'Mobile Number'} <span style={{ color: '#E68A00' }}>*</span>
                      </label>
                      <input
                        type="tel"
                        maxLength="10"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                        onBlur={() => handleBlur('phone')}
                        placeholder={t.contactPlaceholderPhone || 'Enter your 10-digit mobile number'}
                        className="contact-input-field"
                        style={{
                          borderColor: errors.phone ? '#EF4444' : touched.phone ? '#10B981' : 'rgba(212, 166, 64, 0.45)'
                        }}
                      />
                      {errors.phone && (
                        <span style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px', display: 'block', fontWeight: '600' }}>
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
                        {t.contactLabelLocation || 'Your Location / City'}
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder={t.contactPlaceholderLocation || 'Enter your location / city (e.g. Gachibowli, Hyderabad)'}
                        className="contact-input-field"
                      />
                    </div>
                  </div>

                  {/* Two column: Puja Selection & Preferred Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                    
                    {/* Select Puja Ceremony Dropdown */}
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
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
                          borderColor: dropdownOpen ? '#D4A640' : 'rgba(212, 166, 64, 0.45)',
                          boxShadow: dropdownOpen ? '0 0 0 3px rgba(212, 166, 64, 0.22)' : 'none',
                          fontWeight: formData.pujaType ? '600' : '400',
                          userSelect: 'none'
                        }}
                      >
                        <span style={{ color: formData.pujaType ? '#17243B' : '#64748B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {formData.pujaType || (t.contactPlaceholderPuja || t.selectPujaPlaceholder || 'Choose a Vedic Puja...')}
                        </span>
                        <ChevronDown
                          style={{
                            width: '18px',
                            height: '18px',
                            color: '#E68A00',
                            transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.25s ease',
                            flexShrink: 0,
                            marginLeft: '8px'
                          }}
                        />
                      </div>

                      {/* Dropdown Options Menu with Transparent Track Scrollbar */}
                      {dropdownOpen && (
                        <div
                          className="custom-dropdown-menu"
                          style={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: 0,
                            right: 0,
                            background: '#FFFFFF',
                            border: '1.5px solid rgba(212, 166, 64, 0.5)',
                            borderRadius: '14px',
                            maxHeight: '260px',
                            overflowY: 'auto',
                            zIndex: 99999,
                            boxShadow: '0 16px 40px rgba(7, 21, 43, 0.16), 0 4px 12px rgba(212, 166, 64, 0.15)',
                            padding: '6px'
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
                                  padding: '10px 14px',
                                  fontSize: '13px',
                                  borderRadius: '8px',
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
                                <span>{puja}</span>
                                {isSelected && <Check style={{ width: '15px', height: '15px', color: '#E68A00' }} />}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
                        {t.contactLabelDate || 'Preferred Date / Muhurat'}
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleChange('preferredDate', e.target.value)}
                        className="contact-input-field"
                      />
                    </div>
                  </div>

                  {/* Requirements / Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '6px' }}>
                      {t.contactLabelMessage || 'Requirements / Message'}
                    </label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder={t.contactPlaceholderMessage || 'Enter your preferred time, gotra, or custom puja requirements...'}
                      className="contact-input-field"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '14px 24px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                      color: 'white',
                      fontSize: '15px',
                      fontWeight: '800',
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 4px 18px rgba(230, 138, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                      marginTop: '4px'
                    }}
                    onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { if (!submitting) e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span>{submitting ? (t.contactSubmitting || 'Submitting Request...') : (t.contactBtnSubmit || 'Submit Consultation Request')}</span>
                    <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </button>

                  <div style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <ShieldCheck style={{ width: '14px', height: '14px', color: '#10B981' }} />
                    <span>{t.contactPrivacyText || '100% Privacy Guaranteed. Our senior Acharya calls you personally for Shubh Muhurat.'}</span>
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
