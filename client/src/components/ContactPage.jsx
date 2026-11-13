import React, { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { translations } from '../translations';

const HERO_SLIDES = [
  { url: '/vedic_pandit_hawan.jpg', title: 'Sacred Hawan & Vedic Acharyas' },
  { url: '/images/grihapravesh_puja.jpg', title: 'Grihapravesh Vastu Puja' },
  { url: '/images/rudrabhishek_puja.jpg', title: 'Rudrabhishek & Shiv Puja' },
  { url: '/images/satyanarayan_puja.jpg', title: 'Satyanarayan Katha' },
  { url: '/images/ganesh_hawan.jpg', title: 'Ganesh Pujan & Hawan' }
];

export default function ContactPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [slideIndex, setSlideIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Auto-rotating background slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLang]);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
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
      
      {/* SECTION 1: HERO HEADER WITH VIBRANT SLIDESHOW */}
      <section style={{
        position: 'relative',
        background: '#07152B',
        color: '#FFFFFF',
        padding: '40px 20px 48px',
        minHeight: '320px',
        borderBottom: '3px solid #D4A640',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        {/* Animated Background Slides */}
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

        {/* Soft Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 21, 43, 0.55) 0%, rgba(7, 21, 43, 0.40) 50%, rgba(7, 21, 43, 0.75) 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1080px',
          margin: '0 auto',
          width: '100%',
          textAlign: 'center'
        }}>
          
          {/* Back to Home Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <button
              onClick={handleReturnHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '100px',
                background: 'rgba(7, 21, 43, 0.85)',
                color: '#FFF8E7',
                border: '1.5px solid #D4A640',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D4A640';
                e.currentTarget.style.color = '#07152B';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(7, 21, 43, 0.85)';
                e.currentTarget.style.color = '#FFF8E7';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft style={{ width: '15px', height: '15px' }} />
              <span>{t.contactBackHome || 'Back to Home'}</span>
            </button>
          </div>

          <div style={{
            background: 'rgba(7, 21, 43, 0.72)',
            backdropFilter: 'blur(10px)',
            border: '1.5px solid rgba(212, 166, 64, 0.65)',
            borderRadius: '22px',
            padding: '24px 28px',
            maxWidth: '740px',
            margin: '0 auto',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 14px',
              borderRadius: '100px',
              background: 'rgba(212, 166, 64, 0.25)',
              border: '1px solid #D4A640',
              color: '#FDE68A',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '10px'
            }}>
              <Sparkles style={{ width: '13px', height: '13px', color: '#FDE68A' }} />
              <span>{currentLang === 'hi' ? 'सनातन वैदिक सेवा एवं संपर्क' : 'Sanatan Vedic Rituals & Contact'}</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: '800',
              color: '#FFFFFF',
              margin: '0 0 8px',
              lineHeight: '1.2'
            }}>
              {t.contactHeroTitle || 'Get in Touch With Our Acharyas'}
            </h1>

            <p style={{
              fontSize: 'clamp(13px, 1.8vw, 15px)',
              color: '#E2E8F0',
              maxWidth: '580px',
              margin: '0 auto',
              lineHeight: '1.5'
            }}>
              {currentLang === 'hi'
                ? 'तत्काल पूजा परामर्श, शुभ मुहूर्त एवं वैदिक पंडित बुकिंग हेतु संपर्क करें'
                : 'Direct Consultation for Auspicious Shubh Muhurat & Pandit Bookings'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: MANAGED CONTACT CARDS (2-COLUMN BALANCED GRID) */}
      <section className="contact-main-section" style={{ maxWidth: '1080px', margin: '0 auto', padding: '42px 20px 60px' }}>
        
        {/* Section Heading */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(22px, 3.2vw, 30px)',
            fontWeight: '800',
            color: '#17243B',
            margin: '0 0 8px'
          }}>
            {t.contactChannelsHeading || 'Connect Directly With Our Acharyas'}
          </h2>
          <p style={{ fontSize: '14.5px', color: '#64748B', maxWidth: '620px', margin: '0 auto', lineHeight: '1.5' }}>
            {currentLang === 'hi'
              ? 'व्हाट्सएप, कॉल या ईमेल के माध्यम से हमारे वरिष्ठ आचार्यों से सीधे संपर्क करें। 15 मिनट के अंदर त्वरित उत्तर।'
              : 'Choose your preferred channel below for instant Shubh Muhurat guidance and ritual arrangements across Hyderabad.'}
          </p>
        </div>

        {/* 4 BALANCED LUXURY CONTACT CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '22px',
          alignItems: 'stretch'
        }}>
          
          {/* CARD 1: Direct WhatsApp Consultation */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(37, 211, 102, 0.45)',
            borderRadius: '20px',
            padding: '24px 22px',
            boxShadow: '0 6px 20px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px',
            transition: 'all 0.25s ease'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(37, 211, 102, 0.35)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#10B981' }}>
                    {currentLang === 'hi' ? 'सीधा व्हाट्सएप • 24×7' : 'DIRECT WHATSAPP • 24×7'}
                  </div>
                  <h3 style={{ fontSize: '18px', color: '#17243B', fontWeight: '800', margin: '2px 0 0' }}>
                    {currentLang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat & Book on WhatsApp'}
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                {currentLang === 'hi'
                  ? 'तत्काल शुभ मुहूर्त, संपूर्ण पूजा सामग्री लिस्ट एवं त्वरित बुकिंग हेतु सीधे मैसेज भेजें।'
                  : 'Get instant Shubh Muhurat guidance, samagri checklist, and express pandit confirmation.'}
              </p>
            </div>

            <a
              href="https://wa.me/919589018011?text=Namaste!%20I%20want%20to%20consult%20regarding%20Puja%20Muhurat%20and%20Booking."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#FFFFFF',
                fontSize: '14.5px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '9px',
                boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 211, 102, 0.35)';
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z" />
              </svg>
              <span>{currentLang === 'hi' ? 'व्हाट्सएप पर मैसेज भेजें' : 'Send WhatsApp Message'}</span>
            </a>
          </div>

          {/* CARD 2: Direct Phone Call Helpline */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.45)',
            borderRadius: '20px',
            padding: '24px 22px',
            boxShadow: '0 6px 20px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px',
            transition: 'all 0.25s ease'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #990026 0%, #D97706 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(153, 0, 38, 0.3)'
                }}>
                  <Phone style={{ width: '26px', height: '26px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D97706' }}>
                    {currentLang === 'hi' ? 'सीधा कॉल हेल्पलाइन • 24×7' : 'DIRECT CALL HELPLINE • 24×7'}
                  </div>
                  <h3 style={{ fontSize: '18px', color: '#17243B', fontWeight: '800', margin: '2px 0 0' }}>
                    +91 91830 89880
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                {currentLang === 'hi'
                  ? 'वरिष्ठ बनारसी एवं उत्तर भारतीय आचार्यों से सीधे फोन पर बात करें एवं पूजा विधि समझें।'
                  : 'Speak directly with our senior Banarasi Pandit Ji for immediate muhurat calculation and vidhi.'}
              </p>
            </div>

            <a
              href="tel:+919183089880"
              style={{
                width: '100%',
                padding: '13px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #990026 0%, #B91C1C 100%)',
                color: '#FFFFFF',
                fontSize: '14.5px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '9px',
                boxShadow: '0 4px 16px rgba(153, 0, 38, 0.35)',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(153, 0, 38, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(153, 0, 38, 0.35)';
              }}
            >
              <Phone style={{ width: '18px', height: '18px' }} />
              <span>{currentLang === 'hi' ? 'पंडित जी को अभी कॉल करें' : 'Call Pandit Ji Now'}</span>
            </a>
          </div>

          {/* CARD 3: Official Support Email */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.45)',
            borderRadius: '20px',
            padding: '24px 22px',
            boxShadow: '0 6px 20px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px',
            transition: 'all 0.25s ease'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
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
                  boxShadow: '0 6px 18px rgba(7, 21, 43, 0.22)'
                }}>
                  <Mail style={{ width: '26px', height: '26px' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                    {t.contactCardEmailTitle || 'OFFICIAL SUPPORT EMAIL'}
                  </div>
                  <h3 style={{ fontSize: '15.5px', color: '#17243B', fontWeight: '800', margin: '2px 0 0', wordBreak: 'break-all' }}>
                    Northhindipandit.hyd80@gmail.com
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                {currentLang === 'hi'
                  ? 'विवाह निमंत्रण, बड़े अनुष्ठान अथवा विशिष्ट पूजा विवरण ईमेल पर भेजें।'
                  : 'Send puja schedule, wedding invitation cards, or corporate hawan requirements directly.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={getMailUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: '#07152B',
                  color: '#FFF8E7',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '7px',
                  boxShadow: '0 4px 14px rgba(7, 21, 43, 0.25)',
                  transition: 'all 0.2s ease',
                  border: '1px solid #D4A640'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#17243B'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#07152B'; }}
              >
                <span>{currentLang === 'hi' ? 'ईमेल भेजें' : 'Send Email'}</span>
                <ExternalLink style={{ width: '13px', height: '13px', color: '#D4A640' }} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email to clipboard"
                style={{
                  padding: '12px 18px',
                  borderRadius: '12px',
                  background: copiedEmail ? '#10B981' : '#F8FAFC',
                  border: '1.5px solid',
                  borderColor: copiedEmail ? '#10B981' : '#CBD5E1',
                  color: copiedEmail ? '#FFFFFF' : '#334155',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                {copiedEmail ? <Check style={{ width: '15px', height: '15px' }} /> : <Copy style={{ width: '15px', height: '15px' }} />}
                <span>{copiedEmail ? (currentLang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (currentLang === 'hi' ? 'कॉपी' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* CARD 4: Operational Office & Service Area */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.45)',
            borderRadius: '20px',
            padding: '24px 22px',
            boxShadow: '0 6px 20px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '18px',
            transition: 'all 0.25s ease'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(217, 119, 6, 0.3)'
                }}>
                  <MapPin style={{ width: '26px', height: '26px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D97706' }}>
                    {t.contactCardOfficeTitle || 'OPERATIONAL OFFICE & SERVICE AREA'}
                  </div>
                  <h3 style={{ fontSize: '17px', color: '#17243B', fontWeight: '800', margin: '2px 0 0' }}>
                    Hitec City, Madhapur, Hyderabad
                  </h3>
                </div>
              </div>
              <p style={{ fontSize: '13.5px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                Near Cyber Towers, Telangana - 500081. Serving Gachibowli, Kondapur, Kukatpally, Miyapur & all Hyderabad-Secunderabad.
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
              background: '#FFFBEB',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid #FDE68A'
            }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock style={{ width: '13px', height: '13px' }} /> 2-3 Hrs Quick Arrival
              </span>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#92400E', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck style={{ width: '13px', height: '13px' }} /> Doorstep Pandit
              </span>
            </div>
          </div>

        </div>

        {/* BOTTOM PROMPT: Quick Return to Home Page Form */}
        <div style={{
          marginTop: '40px',
          background: 'linear-gradient(135deg, #07152B 0%, #17243B 100%)',
          borderRadius: '22px',
          border: '2px solid #D4A640',
          padding: '28px 24px',
          textAlign: 'center',
          color: '#FFFFFF',
          boxShadow: '0 8px 30px rgba(7, 21, 43, 0.2)'
        }}>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: '700',
            color: '#FDE68A',
            margin: '0 0 8px'
          }}>
            {currentLang === 'hi' ? 'क्या आप ऑनलाइन पूजा बुकिंग फॉर्म भरना चाहते हैं?' : 'Prefer to fill out the online puja booking form?'}
          </h3>
          <p style={{ fontSize: '14px', color: '#E2E8F0', maxWidth: '560px', margin: '0 auto 18px', lineHeight: '1.5' }}>
            {currentLang === 'hi'
              ? 'हमारे होम पेज पर जाएं जहां आप नाम, नंबर, पूजा और स्थान भरकर तुरंत कॉल बैक प्राप्त कर सकते हैं।'
              : 'Jump over to our Home Page lead form to choose your exact ritual and request an instant callback.'}
          </p>

          <button
            onClick={() => {
              if (onBookNow) onBookNow();
              else handleReturnHome();
            }}
            style={{
              padding: '12px 28px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 18px rgba(230, 138, 0, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(230, 138, 0, 0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 18px rgba(230, 138, 0, 0.4)';
            }}
          >
            <span>{currentLang === 'hi' ? 'होम पेज पूजा बुकिंग फॉर्म पर जाएं' : 'Go to Home Page Booking Form'}</span>
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </button>
        </div>

      </section>

    </div>
  );
}
