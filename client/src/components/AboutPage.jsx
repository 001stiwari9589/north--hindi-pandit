import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Mail,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  Flame,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { translations } from '../translations';

const HERO_SLIDES = [
  { url: '/vedic_pandit_hawan.jpg', title: 'Sacred Hawan & Vedic Acharyas' },
  { url: '/images/grihapravesh_puja.jpg', title: 'Grihapravesh Vastu Puja' },
  { url: '/images/rudrabhishek_puja.jpg', title: 'Maha Rudrabhishek' },
  { url: '/images/satyanarayan_puja.jpg', title: 'Satyanarayan Katha' },
  { url: '/images/ganesh_hawan.jpg', title: 'Ganesh Pujan & Hawan' }
];

export default function AboutPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-rotating background slideshow (every 2.8 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleReturnHome = () => {
    if (onGoHome) {
      onGoHome();
    } else {
      window.location.hash = '';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBooking = () => {
    if (onBookNow) {
      onBookNow();
    } else {
      handleReturnHome();
    }
  };

  return (
    <div style={{ background: '#FAF7F0', minHeight: '100vh', color: '#17243B' }}>
      
      {/* SECTION 1: HERO HEADER WITH FULL-VIEW SLIDESHOW (COMPLETELY TRANSPARENT DIV) */}
      <section style={{
        position: 'relative',
        background: '#07152B',
        color: '#FFFFFF',
        padding: '36px 20px 48px',
        minHeight: '380px',
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

        {/* Soft Natural Vignette (Keeps the background completely visible while making text easy to read) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.40) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Hero Foreground Content */}
        <div style={{ maxWidth: '1060px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          
          {/* Top Bar with Single Arrow Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
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

          {/* Center Heading & Subtitle (100% TRANSPARENT - NO BLUE BOX AT ALL) */}
          <div style={{
            textAlign: 'center',
            maxWidth: '740px',
            margin: '0 auto',
            background: 'transparent',
            padding: '8px 12px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0, 0, 0, 0.65)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid #D4A640',
              padding: '5px 16px',
              borderRadius: '100px',
              fontSize: '12px',
              color: '#FDE68A',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '12px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
            }}>
              <Sparkles style={{ width: '13px', height: '13px', color: '#D4A640' }} />
              <span>{currentLang === 'hi' ? 'वैदिक परंपरा एवं पवित्र अनुष्ठान' : 'Sanatan Vedic Rituals & Heritage'}</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(28px, 4.5vw, 42px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: '0 0 12px',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.95), 0 4px 24px rgba(0, 0, 0, 0.9), 0 0 5px #000'
            }}>
              {currentLang === 'hi' ? 'नॉर्थ हिंदी पंडित के बारे में' : 'About North Hindi Pandit'}
            </h1>

            <p style={{
              fontSize: 'clamp(14px, 1.8vw, 17px)',
              color: '#FFFFFF',
              fontWeight: '500',
              margin: '0 auto 18px',
              lineHeight: '1.6',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.95), 0 4px 18px rgba(0, 0, 0, 0.9), 0 0 4px #000'
            }}>
              {currentLang === 'hi'
                ? 'काशी एवं अयोध्या की पावन वैदिक परंपरा, अब सीधे आपके द्वार'
                : 'Preserving Sacred Vedic Sanatan Traditions with Reverence and Purity'}
            </p>

            {/* Slide Navigation Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              {HERO_SLIDES.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  title={slide.title}
                  style={{
                    width: slideIndex === idx ? '26px' : '9px',
                    height: '9px',
                    borderRadius: '100px',
                    background: slideIndex === idx ? '#D4A640' : 'rgba(255, 255, 255, 0.6)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.3s ease',
                    boxShadow: slideIndex === idx ? '0 0 10px #D4A640' : '0 1px 4px rgba(0,0,0,0.6)'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: MAIN ABOUT CONTENT */}
      <section style={{ maxWidth: '1060px', margin: '0 auto', padding: '36px 20px 50px' }}>
        
        {/* Intro Mission Card with Side-by-Side Vedic Ritual Image */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid rgba(212, 166, 64, 0.45)',
          borderRadius: '20px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(7, 21, 43, 0.05)',
          marginBottom: '32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '26px',
          alignItems: 'center'
        }}>
          {/* Left Text Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A640', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              <ShieldCheck style={{ width: '14px', height: '14px' }} />
              <span>{currentLang === 'hi' ? 'हमारी पावन परंपरा' : 'Our Sacred Heritage'}</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(20px, 2.5vw, 25px)',
              fontWeight: '800',
              color: '#17243B',
              lineHeight: '1.35',
              margin: '0 0 12px'
            }}>
              {currentLang === 'hi'
                ? 'हैदराबाद एवं संपूर्ण भारत में सर्वश्रेष्ठ उत्तर भारतीय हिंदी व बनारसी वैदिक पंडित'
                : 'Authentic North Indian Hindi & Banarasi Vedic Pandits at Your Doorstep'}
            </h2>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7', margin: '0 0 16px' }}>
              {currentLang === 'hi'
                ? 'North Hindi Pandit काशी विद्वत परिषद एवं अयोध्या वेद-पाठशाला के वरिष्ठ आचार्यों द्वारा संचालित सेवा है। हम गृहप्रवेश, सत्यनारायण कथा, महारुद्राभिषेक, विवाह संस्कार, नवग्रह शांति एवं संपूर्ण पारिवारिक अनुष्ठान पूर्ण विधि-विधान व 100% शुद्ध वैदिक सामग्री के साथ संपन्न कराते हैं।'
                : 'North Hindi Pandit is a dedicated Sanatan Vedic ritual organization led by senior certified Acharyas from Kashi Vidwath Parishad and Ayodhya Ved-Pathshalas. With 20+ years of dedicated ritual mastery, we perform Grihapravesh, Satyanarayan Katha, Vivah Sanskar, Maha Rudrabhishek, Hawan, and family anushthans with exact Sanskrit uccharan and 100% pure authentic samagri.'}
            </p>

            {/* Quick Highlights list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#17243B', fontWeight: '600' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#D4A640', flexShrink: 0 }} />
                <span>{currentLang === 'hi' ? '100% शास्त्र-सम्मत विधि एवं शुद्ध संस्कृत उच्चारण' : '100% Shastra Sammat Vidhi & Pure Sanskrit Recitation'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#17243B', fontWeight: '600' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#D4A640', flexShrink: 0 }} />
                <span>{currentLang === 'hi' ? 'देशी गाय का घी, गंगाजल एवं संपूर्ण हवन सामग्री' : 'Pure Desi Cow Ghee, Gangajal & Complete Samagri'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#17243B', fontWeight: '600' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#D4A640', flexShrink: 0 }} />
                <span>{currentLang === 'hi' ? 'हैदराबाद, सिकंदराबाद एवं पैन-इंडिया ई-पूजा सेवा' : 'Hyderabad, Secunderabad & Live Pan-India E-Puja'}</span>
              </div>
            </div>
          </div>

          {/* Right Image Column (Fitted High-Resolution Ritual Showcase) */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(7, 21, 43, 0.12)',
              border: '2px solid rgba(212, 166, 64, 0.45)'
            }}>
              <img
                src="/vedic_pandit_hawan.jpg"
                alt="North Hindi Pandit Sacred Rituals"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1.0)'; }}
              />
              <div style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                right: '12px',
                background: 'rgba(7, 21, 43, 0.85)',
                backdropFilter: 'blur(6px)',
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(212, 166, 64, 0.4)',
                color: '#FAF7F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '12px', fontWeight: '700', color: '#FDE68A' }}>
                  {currentLang === 'hi' ? 'काशी विद्वत परिषद परंपरा' : 'Vedic Kashi Vidwath Tradition'}
                </span>
                <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  ★ 4.98/5 Rated
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          
          {/* Pillar 1 */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            padding: '22px 20px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
              color: '#D4A640',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <Award style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
              {currentLang === 'hi' ? '20+ वर्ष वैदिक अनुभव' : '20+ Years Vedic Legacy'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              {currentLang === 'hi'
                ? 'काशी व अयोध्या के दीक्षित ब्राह्मण विद्वान पूर्ण शुद्ध संस्कृत मंत्रोच्चारण के साथ पूजा संपन्न कराते हैं।'
                : 'Scholars from sacred Ved-Pathshalas of Kashi and Ayodhya with precise Sanskrit uccharan.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            padding: '22px 20px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <Flame style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
              {currentLang === 'hi' ? '100% शुद्ध पूजा सामग्री' : '100% Pure Vedic Samagri'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              {currentLang === 'hi'
                ? 'देशी गाय का घी, पवित्र हवन समिधा, गंगाजल व संपूर्ण कलश सामग्री पंडित जी स्वयं लाते हैं।'
                : 'Pure Desi cow ghee, sacred hawan herbs, Gangajal, and all ritual items arranged with zero hassle.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            padding: '22px 20px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #07152B 0%, #17243B 100%)',
              color: '#D4A640',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <Clock style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
              {currentLang === 'hi' ? 'समयबद्ध घर-पहुंच सेवा' : 'Punctual Doorstep Arrival'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              {currentLang === 'hi'
                ? 'हैदराबाद व सिकंदराबाद में 2 से 3 घंटे में त्वरित पंडित जी की उपलब्धता तथा पैन-इंडिया ई-पूजा।'
                : 'Rapid 2-3 hour deployment across Hyderabad & Secunderabad, plus live Pan-India online e-pujas.'}
            </p>
          </div>

          {/* Pillar 4 */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            padding: '22px 20px',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.04)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #990026 0%, #68001a 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px'
            }}>
              <HeartHandshake style={{ width: '22px', height: '22px' }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '17px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
              {currentLang === 'hi' ? '15,000+ संतुष्ट परिवार' : '15,000+ Happy Families'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
              {currentLang === 'hi'
                ? 'Google पर 4.98/5 स्टार रेटिंग और 10+ वर्षों से परिवारों का अटूट विश्वास।'
                : 'Rated 4.98/5 on Google Reviews with enduring trust across thousands of households.'}
            </p>
          </div>

        </div>

        {/* SECTION: DUAL LEFT & RIGHT PHOTO CARDS (Visual Elegance) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Left Ritual Showcase Image Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '175px', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/images/rudrabhishek_puja.jpg"
                alt="Rudrabhishek & Shiva Aradhana"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(7, 21, 43, 0.85)',
                color: '#FDE68A',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(212, 166, 64, 0.4)'
              }}>
                🔱 {currentLang === 'hi' ? 'शिव आराधना' : 'Maha Rudrabhishek'}
              </span>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
                {currentLang === 'hi' ? 'महारुद्राभिषेक एवं शिव पूजन' : 'Maha Rudrabhishek & Hawan'}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
                {currentLang === 'hi'
                  ? 'काशी के आचार्यों द्वारा द्वादश ज्योतिर्लिंग व नमक-चमक रुद्राष्टाध्यायी पाठ।'
                  : 'Sacred Rudri path by verified Kashi scholars for family peace and health.'}
              </p>
            </div>
          </div>

          {/* Right Ritual Showcase Image Card */}
          <div style={{
            background: '#FFFFFF',
            border: '1.5px solid rgba(212, 166, 64, 0.35)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(7, 21, 43, 0.05)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ height: '175px', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/images/satyanarayan_puja.jpg"
                alt="Satyanarayan Katha & Puja"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
              <span style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(7, 21, 43, 0.85)',
                color: '#FDE68A',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(212, 166, 64, 0.4)'
              }}>
                ✨ {currentLang === 'hi' ? 'सत्यनारायण कथा' : 'Satyanarayan Katha'}
              </span>
            </div>
            <div style={{ padding: '16px 18px' }}>
              <h4 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '16px', fontWeight: '700', color: '#17243B', margin: '0 0 6px' }}>
                {currentLang === 'hi' ? 'सत्यनारायण कथा एवं हवन' : 'Shree Satyanarayan Katha'}
              </h4>
              <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.6', margin: 0 }}>
                {currentLang === 'hi'
                  ? 'संपूर्ण पंच-अध्याय सरल हिंदी व्याख्या, आरती एवं महाप्रसाद विधान।'
                  : 'Complete 5-chapter Katha recitation with authentic vidhi and hawan.'}
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION CARD (NO CALL BUTTONS - CLEAN CONSULTATION & BOOKING ONLY) */}
        <div style={{
          background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
          border: '1.5px solid rgba(212, 166, 64, 0.45)',
          borderRadius: '20px',
          padding: '26px 30px',
          boxShadow: '0 10px 30px rgba(7, 21, 43, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4A640', marginBottom: '6px' }}>
              {currentLang === 'hi' ? 'मुहूर्त एवं वैदिक परामर्श' : 'Shubh Muhurat & Consultation'}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#FAF7F0', marginBottom: '4px' }}>
              <Mail style={{ width: '15px', height: '15px', color: '#D4A640' }} />
              <span>Northhindipandit.hyd80@gmail.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'rgba(250, 247, 240, 0.75)' }}>
              <MapPin style={{ width: '14px', height: '14px', color: '#D4A640' }} />
              <span>Hitec City, Madhapur, Hyderabad, Telangana</span>
            </div>
          </div>

          <div>
            <button
              onClick={handleBooking}
              style={{
                padding: '12px 26px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: 'none',
                boxShadow: '0 4px 16px rgba(230, 138, 0, 0.35)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(230, 138, 0, 0.45)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(230, 138, 0, 0.35)'; }}
            >
              <Calendar style={{ width: '16px', height: '16px' }} />
              <span>{currentLang === 'hi' ? 'पूजा व परामर्श बुक करें' : 'Book a Vedic Puja'}</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
