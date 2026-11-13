import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
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

export default function AboutPage({ onGoHome, onBookNow, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      
      {/* SECTION 1: HERO HEADER (Royal Navy #07152B with Single Arrow Back Button) */}
      <section style={{
        background: 'linear-gradient(180deg, #07152B 0%, #0B1930 100%)',
        color: '#FFFFFF',
        padding: '28px 20px 34px',
        borderBottom: '3px solid #D4A640',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1060px', margin: '0 auto' }}>
          
          {/* Top Bar with Single Arrow Back Button */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
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
          </div>

          {/* Center Heading */}
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(26px, 3.8vw, 36px)',
              fontWeight: '800',
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              lineHeight: '1.25',
              margin: '0 0 8px'
            }}>
              {currentLang === 'hi' ? 'नॉर्थ हिंदी पंडित के बारे में' : 'About North Hindi Pandit'}
            </h1>
            <p style={{
              fontSize: 'clamp(13px, 1.6vw, 15px)',
              color: 'rgba(250, 247, 240, 0.88)',
              maxWidth: '620px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              {currentLang === 'hi'
                ? 'काशी एवं अयोध्या की पावन वैदिक परंपरा, अब सीधे आपके द्वार'
                : 'Preserving Sacred Vedic Sanatan Traditions with Reverence and Purity'}
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 2: MAIN ABOUT CONTENT */}
      <section style={{ maxWidth: '1060px', margin: '0 auto', padding: '36px 20px 50px' }}>
        
        {/* Intro Mission Card */}
        <div style={{
          background: '#FFFFFF',
          border: '1.5px solid rgba(212, 166, 64, 0.45)',
          borderRadius: '20px',
          padding: '28px 30px',
          boxShadow: '0 8px 24px rgba(7, 21, 43, 0.05)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A640', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            <Sparkles style={{ width: '14px', height: '14px' }} />
            <span>{currentLang === 'hi' ? 'हमारी पावन परंपरा' : 'Our Sacred Heritage'}</span>
          </div>

          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(20px, 2.5vw, 24px)',
            fontWeight: '800',
            color: '#17243B',
            lineHeight: '1.35',
            margin: '0 0 12px'
          }}>
            {currentLang === 'hi'
              ? 'हैदराबाद एवं संपूर्ण भारत में सर्वश्रेष्ठ उत्तर भारतीय हिंदी व बनारसी वैदिक पंडित'
              : 'Authentic North Indian Hindi & Banarasi Vedic Pandits at Your Doorstep'}
          </h2>

          <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
            {currentLang === 'hi'
              ? 'North Hindi Pandit काशी विद्वत परिषद एवं अयोध्या वेद-पाठशाला के वरिष्ठ आचार्यों द्वारा संचालित सेवा है। हम गृहप्रवेश, सत्यनारायण कथा, महारुद्राभिषेक, विवाह संस्कार, नवग्रह शांति एवं संपूर्ण पारिवारिक अनुष्ठान पूर्ण विधि-विधान व 100% शुद्ध वैदिक सामग्री के साथ संपन्न कराते हैं।'
              : 'North Hindi Pandit is a dedicated Sanatan Vedic ritual organization led by senior certified Acharyas from Kashi Vidwath Parishad and Ayodhya Ved-Pathshalas. With 20+ years of dedicated ritual mastery, we perform Grihapravesh, Satyanarayan Katha, Vivah Sanskar, Maha Rudrabhishek, Hawan, and family anushthans with exact Sanskrit uccharan and 100% pure authentic samagri.'}
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
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

        {/* Quick Contact & Action Card */}
        <div style={{
          background: 'linear-gradient(135deg, #07152B 0%, #0B1930 100%)',
          border: '1.5px solid rgba(212, 166, 64, 0.45)',
          borderRadius: '20px',
          padding: '28px 30px',
          boxShadow: '0 10px 30px rgba(7, 21, 43, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4A640', marginBottom: '4px' }}>
              {currentLang === 'hi' ? 'सीधा संपर्क सूत्र' : 'Direct Helpline & Support'}
            </div>
            <div style={{ fontSize: '18px', color: '#FFFFFF', fontWeight: '700', marginBottom: '4px' }}>
              📞 +91 9589018011
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(250, 247, 240, 0.85)' }}>
              ✉️ Northhindipandit.hyd80@gmail.com
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="tel:+919589018011"
              style={{
                padding: '11px 22px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #D4A640 0%, #E68A00 100%)',
                color: 'white',
                fontSize: '13.5px',
                fontWeight: '700',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(230, 138, 0, 0.3)'
              }}
            >
              <Phone style={{ width: '15px', height: '15px' }} />
              <span>{currentLang === 'hi' ? 'कॉल करें' : 'Call Now'}</span>
            </a>

            <button
              onClick={handleBooking}
              style={{
                padding: '11px 22px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1.5px solid rgba(212, 166, 64, 0.5)',
                color: '#FAF7F0',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.22)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'; }}
            >
              <Calendar style={{ width: '15px', height: '15px', color: '#D4A640' }} />
              <span>{currentLang === 'hi' ? 'पूजा बुक करें' : 'Book a Puja'}</span>
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
