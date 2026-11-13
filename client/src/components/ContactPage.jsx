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

      {/* SECTION 2: MANAGED 3 CONTACT CARDS */}
      <section className='contact-main-section' style={{ maxWidth: '1100px', margin: '0 auto', padding: '36px 18px 54px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 className='contact-channels-title' style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontWeight: '800',
            color: '#17243B',
            margin: '0 0 6px'
          }}>
            {t.contactChannelsHeading || 'Connect With Our Team'}
          </h2>
          <p className='contact-channels-sub' style={{ fontSize: '14px', color: '#64748B', maxWidth: '580px', margin: '0 auto', lineHeight: '1.45' }}>
            {currentLang === 'hi'
              ? 'व्हाट्सएप अथवा ईमेल के माध्यम से हमारे आचार्यों से सीधे संपर्क करें। 15 मिनट में त्वरित परामर्श।'
              : 'Choose your preferred channel below for instant Shubh Muhurat guidance and ritual bookings across Hyderabad.'}
          </p>
        </div>

        <div className='contact-cards-container'>
          {/* CARD 1: Direct WhatsApp Consultation */}
          <div className='contact-card-box whatsapp-box'>
            <div>
              <div className='contact-card-header'>
                <div className='contact-card-icon-wrap icon-green'>
                  <svg width='26' height='26' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z' />
                  </svg>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className='contact-badge-label' style={{ color: '#10B981' }}>
                    {currentLang === 'hi' ? 'सीधा व्हाट्सएप • 24×7' : 'DIRECT WHATSAPP • 24×7'}
                  </div>
                  <h3 className='contact-card-title'>
                    {currentLang === 'hi' ? 'व्हाट्सएप पर चैट करें' : 'Chat & Book on WhatsApp'}
                  </h3>
                </div>
              </div>
              <p className='contact-card-desc'>
                {currentLang === 'hi'
                  ? 'तत्काल शुभ मुहूर्त, संपूर्ण पूजा सामग्री लिस्ट एवं त्वरित बुकिंग हेतु सीधे मैसेज भेजें।'
                  : 'Get instant Shubh Muhurat guidance, samagri checklist, and express pandit confirmation.'}
              </p>
            </div>

            <a
              href='https://wa.me/919589018011?text=Namaste!%20I%20want%20to%20consult%20regarding%20Puja%20Muhurat%20and%20Booking.'
              target='_blank'
              rel='noopener noreferrer'
              className='contact-btn-action btn-green'
            >
              <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.25-1.66 1.33-.42.08-.96.11-2.8-.62-2.35-.93-3.86-3.32-3.98-3.48-.11-.15-.96-1.28-.96-2.45 0-1.16.61-1.74.83-1.97.21-.24.47-.3.62-.3.16 0 .31 0 .45.01.14.01.34-.05.53.41.2.48.68 1.66.74 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.32-.36.43-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.61-.71.77-.96.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.11.06.63-.18 1.31z' />
              </svg>
              <span>{currentLang === 'hi' ? 'व्हाट्सएप पर मैसेज भेजें' : 'Send WhatsApp Message'}</span>
            </a>
          </div>

          {/* CARD 2: Official Support Email */}
          <div className='contact-card-box email-box'>
            <div>
              <div className='contact-card-header'>
                <div className='contact-card-icon-wrap icon-navy'>
                  <Mail style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className='contact-badge-label' style={{ color: '#D4A640' }}>
                    {t.contactCardEmailTitle || 'OFFICIAL SUPPORT EMAIL'}
                  </div>
                  <h3 className='contact-card-title email-address-title'>
                    Northhindipandit.hyd80@gmail.com
                  </h3>
                </div>
              </div>
              <p className='contact-card-desc'>
                {currentLang === 'hi'
                  ? 'विवाह निमंत्रण, बड़े अनुष्ठान अथवा विशिष्ट पूजा विवरण ईमेल पर भेजें।'
                  : 'Send puja schedule, wedding invitation cards, or corporate hawan requirements directly.'}
              </p>
            </div>

            <div className='email-actions-row'>
              <a
                href={getMailUrl()}
                target='_blank'
                rel='noopener noreferrer'
                className='contact-btn-action btn-navy'
                style={{ flex: 1 }}
              >
                <span>{currentLang === 'hi' ? 'ईमेल भेजें' : 'Send Email'}</span>
                <ExternalLink style={{ width: '13px', height: '13px', color: '#D4A640' }} />
              </a>

              <button
                type='button'
                onClick={handleCopyEmail}
                title='Copy email to clipboard'
                className='contact-btn-action btn-copy'
              >
                {copiedEmail ? <Check style={{ width: '14px', height: '14px' }} /> : <Copy style={{ width: '14px', height: '14px' }} />}
                <span>{copiedEmail ? (currentLang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (currentLang === 'hi' ? 'कॉपी' : 'Copy')}</span>
              </button>
            </div>
          </div>

          {/* CARD 3: Operational Office & Service Area */}
          <div className='contact-card-box office-box'>
            <div>
              <div className='contact-card-header'>
                <div className='contact-card-icon-wrap icon-amber'>
                  <MapPin style={{ width: '24px', height: '24px' }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className='contact-badge-label' style={{ color: '#D97706' }}>
                    {t.contactCardOfficeTitle || 'OPERATIONAL OFFICE & SERVICE AREA'}
                  </div>
                  <h3 className='contact-card-title'>
                    Hitec City, Madhapur, Hyderabad
                  </h3>
                </div>
              </div>
              <p className='contact-card-desc'>
                Near Cyber Towers, Telangana - 500081. Serving Gachibowli, Kondapur, Kukatpally, Miyapur & all Hyderabad-Secunderabad.
              </p>
            </div>

            <div className='office-pills-row'>
              <span className='office-pill'>
                <Clock style={{ width: '12px', height: '12px' }} /> 2-3 Hrs Quick Arrival
              </span>
              <span className='office-pill'>
                <ShieldCheck style={{ width: '12px', height: '12px' }} /> Doorstep Pandit
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM PROMPT: Return to Home Page Form */}
        <div className='contact-bottom-banner'>
          <h3 className='contact-bottom-heading'>
            {currentLang === 'hi' ? 'क्या आप ऑनलाइन पूजा बुकिंग फॉर्म भरना चाहते हैं?' : 'Prefer to fill out the online puja booking form?'}
          </h3>
          <p className='contact-bottom-sub'>
            {currentLang === 'hi'
              ? 'हमारे होम पेज पर जाएं जहां आप नाम, नंबर, पूजा और स्थान भरकर तुरंत कॉल बैक प्राप्त कर सकते हैं।'
              : 'Jump over to our Home Page lead form to choose your exact ritual and request an instant callback.'}
          </p>

          <button
            onClick={() => {
              if (onBookNow) onBookNow();
              else handleReturnHome();
            }}
            className='contact-bottom-btn'
          >
            <span>{currentLang === 'hi' ? 'होम पेज पूजा बुकिंग फॉर्म पर जाएं' : 'Go to Home Page Booking Form'}</span>
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </button>
        </div>
      </section>
    </div>
  );
}
