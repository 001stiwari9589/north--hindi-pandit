import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
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
  const [copiedEmail, setCopiedEmail] = useState(false);
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

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('Northhindipandit.hyd80@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div style={{ background: '#FAF7F0', minHeight: '100vh', color: '#17243B' }}>
      
      {/* SECTION 1: HERO HEADER (Royal Navy Blue with Clean Single Arrow) */}
      <section style={{
        background: 'linear-gradient(180deg, #07152B 0%, #0B1930 100%)',
        color: '#FFFFFF',
        padding: '30px 20px 38px',
        borderBottom: '3px solid #D4A640',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          
          {/* Top Bar with Single Arrow Back Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <button
              onClick={handleReturnHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#FAF7F0',
                padding: '7px 16px',
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
              <ArrowLeft style={{ width: '15px', height: '15px', color: '#D4A640' }} />
              <span>{t.contactBackHome || 'Back to Home'}</span>
            </button>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(250, 247, 240, 0.85)', fontWeight: '500' }}>
              <span style={{ color: '#D4A640' }}>ॐ</span>
              <span style={{ cursor: 'pointer' }} onClick={handleReturnHome}>{t.contactBreadcrumbHome || 'Home'}</span>
              <span>/</span>
              <span style={{ color: '#D4A640', fontWeight: '700' }}>{t.contactBreadcrumbCurrent || 'Contact Us'}</span>
            </div>
          </div>

          {/* Center Heading (Subtext removed as requested) */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(26px, 3.8vw, 38px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: 0
            }}>
              {t.contactHeroTitle || 'Get in Touch With Our Acharyas'}
            </h1>
          </div>

        </div>
      </section>

      {/* SECTION 2: MAIN CONTACT SECTION (50-50 Equal Width: 3 Cards on Left, Compact Form on Right) */}
      <section className="contact-main-section">
        <div className="contact-two-column-grid">
          
          {/* LEFT COLUMN: EXACTLY 3 CLEAN LUXURY CARDS (No raw number text) */}
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

            {/* CARD 1: Direct Calling & WhatsApp (No raw phone numbers displayed) */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 4px 18px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(230, 138, 0, 0.28)'
                }}>
                  <Phone style={{ width: '22px', height: '22px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                    {currentLang === 'hi' ? 'तत्काल कॉल व व्हाट्सएप' : 'Instant Call & WhatsApp'}
                  </div>
                  <div style={{ fontSize: '16px', color: '#17243B', fontWeight: '800', marginTop: '2px' }}>
                    {currentLang === 'hi' ? 'आचार्य जी से सीधी बातचीत' : 'Direct Acharya Consultation'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>
                    {currentLang === 'hi' ? '24×7 उपलब्ध • तत्काल मुहूर्त परामर्श' : '24×7 Available • Instant Shubh Muhurat'}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Call Pandit Ji & WhatsApp */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="tel:+919589018011"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
                    color: '#FAF7F0',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(7, 21, 43, 0.15)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <Phone style={{ width: '14px', height: '14px', color: '#D4A640' }} />
                  <span>{currentLang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
                </a>
                <a
                  href="https://wa.me/919589018011?text=Namaste%20Pandit%20Ji,%20I%20would%20like%20to%20consult%20about%20puja%20booking%20and%20shubh%20muhurat."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: '#25D366',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(37, 211, 102, 0.25)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <MessageCircle style={{ width: '14px', height: '14px' }} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* CARD 2: Support Email (Fully Functional with Mailto, Web Gmail & Copy) */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid rgba(212, 166, 64, 0.45)',
              borderRadius: '18px',
              padding: '20px',
              boxShadow: '0 4px 18px rgba(7, 21, 43, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
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
                    {currentLang === 'hi' ? 'आधिकारिक ईमेल' : 'Official Support Email'}
                  </div>
                  <strong style={{ fontSize: '14.5px', color: '#17243B', display: 'block', margin: '2px 0', fontWeight: '700', wordBreak: 'break-all' }}>
                    Northhindipandit.hyd80@gmail.com
                  </strong>
                </div>
              </div>

              {/* Action Buttons: Send Email, Open in Gmail & Copy Email */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a
                  href="mailto:Northhindipandit.hyd80@gmail.com?subject=Puja%20Consultation%20Inquiry%20-%20North%20Hindi%20Pandit"
                  style={{
                    flex: '1 1 120px',
                    textAlign: 'center',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
                    color: '#FAF7F0',
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <Mail style={{ width: '13px', height: '13px', color: '#D4A640' }} />
                  <span>{currentLang === 'hi' ? 'ईमेल भेजें' : 'Send Mail'}</span>
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=Northhindipandit.hyd80@gmail.com&su=Puja+Consultation+Inquiry+-+North+Hindi+Pandit"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: '1 1 120px',
                    textAlign: 'center',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(230, 138, 0, 0.12)',
                    border: '1px solid rgba(230, 138, 0, 0.4)',
                    color: '#E68A00',
                    fontSize: '12px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px'
                  }}
                >
                  <ExternalLink style={{ width: '13px', height: '13px' }} />
                  <span>Gmail</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    background: copiedEmail ? '#10B981' : '#F1F5F9',
                    border: '1px solid',
                    borderColor: copiedEmail ? '#10B981' : '#CBD5E1',
                    color: copiedEmail ? '#FFFFFF' : '#475569',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    transition: 'all 0.2s'
                  }}
                >
                  {copiedEmail ? <Check style={{ width: '13px', height: '13px' }} /> : <Copy style={{ width: '13px', height: '13px' }} />}
                  <span>{copiedEmail ? (currentLang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (currentLang === 'hi' ? 'कॉपी' : 'Copy')}</span>
                </button>
              </div>
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
                width: '48px',
                height: '48px',
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

          {/* RIGHT COLUMN: COMPACT CONSULTATION FORM (Height and padding tuned) */}
          <div className="contact-form-box">
            
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '22px',
                fontWeight: '800',
                color: '#17243B',
                margin: 0
              }}>
                {t.contactFormHeading || 'Send Us a Message'}
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
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
                        padding: '9px 12px',
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
                          padding: '9px 12px',
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
                        style={{ padding: '9px 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Two column: Puja Selection & Preferred Date */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                    
                    {/* Select Puja Ceremony Dropdown */}
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
                          padding: '9px 12px',
                          fontSize: '13px',
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
                            maxHeight: '220px',
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
                                  padding: '8px 12px',
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
                                <span>{puja}</span>
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
                        style={{ padding: '8px 12px', fontSize: '13px' }}
                      />
                    </div>
                  </div>

                  {/* Requirements / Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.6px', color: '#17243B', marginBottom: '4px' }}>
                      {t.contactLabelMessage || 'Requirements / Message'}
                    </label>
                    <textarea
                      rows="2"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder={t.contactPlaceholderMessage || 'Preferred time, gotra, or custom puja requirements...'}
                      className="contact-input-field"
                      style={{ padding: '8px 12px', fontSize: '13px', resize: 'vertical' }}
                    />
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
                      marginTop: '4px'
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
