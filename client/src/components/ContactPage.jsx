import React, { useState, useEffect } from 'react';
import {
  Mail,
  MapPin,
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
      {/* SECTION 1: HERO HEADER (TRANSPARENT, NO BLUE BOX) */}
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
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'url(' + slide.url + ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: slideIndex === idx ? 1 : 0,
              transform: slideIndex === idx ? 'scale(1.05)' : 'scale(1.0)',
              transition: 'opacity 1.2s ease-in-out, transform 4s ease-out',
              pointerEvents: 'none'
            }}
          />
        ))}

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(7, 21, 43, 0.45) 0%, rgba(7, 21, 43, 0.25) 50%, rgba(7, 21, 43, 0.65) 100%)',
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
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
            <button
              onClick={handleReturnHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '100px',
                background: 'rgba(0, 0, 0, 0.75)',
                color: '#FFF8E7',
                border: '1.5px solid #D4A640',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#D4A640';
                e.currentTarget.style.color = '#07152B';
                e.currentTarget.style.transform = 'translateX(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.75)';
                e.currentTarget.style.color = '#FFF8E7';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <ArrowLeft style={{ width: '15px', height: '15px' }} />
              <span>{t.contactBackHome || 'Back to Home'}</span>
            </button>
          </div>

          {/* Title Area: Completely Transparent with Crisp Text Shadow */}
          <div style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
            padding: '10px 16px',
            maxWidth: '820px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 16px',
              borderRadius: '100px',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #D4A640',
              color: '#FDE68A',
              fontSize: '12px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
            }}>
              <Sparkles style={{ width: '13px', height: '13px', color: '#D4A640' }} />
              <span>{currentLang === 'hi' ? 'सनातन वैदिक सेवा एवं संपर्क' : 'Sanatan Vedic Rituals & Contact'}</span>
            </div>

            <h1 className='contact-hero-title' style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(24px, 4.2vw, 40px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: '0 0 10px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(0, 0, 0, 0.9), 0 0 5px #000'
            }}>
              {t.contactHeroTitle || 'Get in Touch With Our Acharyas'}
            </h1>

            <p className='contact-hero-sub' style={{
              fontSize: 'clamp(13px, 1.8vw, 16.5px)',
              color: '#FFFFFF',
              fontWeight: '500',
              maxWidth: '620px',
              margin: '0 auto 16px',
              lineHeight: '1.5',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.9), 0 0 4px #000'
            }}>
              {currentLang === 'hi'
                ? 'तत्काल पूजा परामर्श, शुभ मुहूर्त एवं वैदिक पंडित बुकिंग हेतु संपर्क करें'
                : 'Direct Consultation for Auspicious Shubh Muhurat & Ritual Bookings'}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  title={slide.title}
                  style={{
                    width: slideIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '100px',
                    background: slideIndex === idx ? '#D4A640' : 'rgba(255, 255, 255, 0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    boxShadow: slideIndex === idx ? '0 0 10px #D4A640' : '0 1px 4px rgba(0,0,0,0.6)'
                  }}
                  aria-label={'Go to slide ' + (idx + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: EXACTLY 3 MANAGED CONTACT CARDS (WIDTH CONTROLLED, NO FILLER PARAGRAPHS) */}
      <section style={{ maxWidth: '680px', margin: '0 auto', padding: '36px 16px 50px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(20px, 3vw, 26px)',
            fontWeight: '800',
            color: '#17243B',
            margin: 0
          }}>
            {t.contactChannelsHeading || 'Connect With Our Team'}
          </h2>
        </div>

        {/* 3 CONTROLLED CARDS STACKED VERTICALLY */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
          {/* CARD 1: Direct WhatsApp Consultation */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(37, 211, 102, 0.45)',
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '200px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '13px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)'
              }}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='currentColor'>
                  <path d='M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z' />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#10B981' }}>
                  {currentLang === 'hi' ? 'सीधा व्हाट्सएप • 24×7' : 'Direct WhatsApp • 24×7'}
                </div>
                <div style={{ fontSize: '15.5px', color: '#17243B', fontWeight: '800', marginTop: '2px' }}>
                  {currentLang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat & Book on WhatsApp'}
                </div>
              </div>
            </div>

            <a
              href='https://wa.me/919589018011?text=Namaste!%20I%20want%20to%20consult%20regarding%20Puja%20Muhurat%20and%20Booking.'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                padding: '10px 20px',
                borderRadius: '11px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#FFFFFF',
                fontSize: '13.5px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                transition: 'all 0.2s ease',
                flexGrow: 1,
                maxWidth: '220px'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width='17' height='17' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z' />
              </svg>
              <span>{currentLang === 'hi' ? 'मैसेज भेजें' : 'Send Message'}</span>
            </a>
          </div>

          {/* CARD 2: Support Email (Direct clickable email link, no separate button) */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.45)',
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: '220px', flex: 1 }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '13px',
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
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
                  {t.contactCardEmailTitle || 'Official Support Email'}
                </div>
                <a
                  href={getMailUrl()}
                  target='_blank'
                  rel='noopener noreferrer'
                  title='Click to send email directly'
                  style={{
                    fontSize: '14.5px',
                    color: '#17243B',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '2px',
                    fontWeight: '800',
                    wordBreak: 'break-all',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E68A00'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#17243B'; }}
                >
                  <span>Northhindipandit.hyd80@gmail.com</span>
                  <ExternalLink style={{ width: '13px', height: '13px', color: '#E68A00', flexShrink: 0 }} />
                </a>
              </div>
            </div>

            <button
              type='button'
              onClick={handleCopyEmail}
              title='Copy email to clipboard'
              style={{
                padding: '8px 14px',
                borderRadius: '9px',
                background: copiedEmail ? '#10B981' : '#F8FAFC',
                border: '1.5px solid',
                borderColor: copiedEmail ? '#10B981' : '#CBD5E1',
                color: copiedEmail ? '#FFFFFF' : '#334155',
                fontSize: '12.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
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
            borderRadius: '16px',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '13px',
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
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#D4A640' }}>
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

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFBEB',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #FDE68A',
              fontSize: '11.5px',
              fontWeight: '700',
              color: '#92400E'
            }}>
              <Clock style={{ width: '12px', height: '12px' }} />
              <span>Doorstep Pandit Across Hyderabad</span>
            </div>
          </div>
        </div>

        {/* BOTTOM: Quick Home Page Lead Form Link */}
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <button
            onClick={() => {
              if (onBookNow) onBookNow();
              else handleReturnHome();
            }}
            style={{
              padding: '10px 24px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #07152B 0%, #17243B 100%)',
              color: '#FFF8E7',
              border: '1.5px solid #D4A640',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              boxShadow: '0 4px 14px rgba(7, 21, 43, 0.2)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D4A640';
              e.currentTarget.style.color = '#07152B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #07152B 0%, #17243B 100%)';
              e.currentTarget.style.color = '#FFF8E7';
            }}
          >
            <span>{currentLang === 'hi' ? 'होम पेज पूजा बुकिंग फॉर्म पर जाएं' : 'Go to Home Page Booking Form'}</span>
            <ArrowRight style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </section>
    </div>
  );
}
