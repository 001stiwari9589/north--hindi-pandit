import React from 'react';
import { translations } from '../translations';

export default function Footer({ onOpenBooking, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const scrollToHero = (e) => {
    e.preventDefault();
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#081220', color: '#FFF8EC', borderTop: '2px solid rgba(200, 146, 42, 0.3)', padding: '60px 5% 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(200, 146, 42, 0.15)' }}>
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '28px', color: 'var(--gold-light)' }}>ॐ</span>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: '700', color: 'white' }}>
              North Hindi Pandit
            </span>
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', marginBottom: '18px' }}>
            {t.footerDesc || 'Authentic North Indian Hindi & Vedic rituals performed with devotion, precise Sanskrit uccharan, and complete shastra-sammat Vidhi & Samagri.'}
          </p>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="tel:+917772035222"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(200, 146, 42, 0.2)',
                border: '1px solid rgba(200, 146, 42, 0.4)',
                color: 'var(--gold-light)',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              📞 +91 77720 35222
            </a>
            <a
              href="https://wa.me/917772035222"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(37, 211, 102, 0.2)',
                border: '1px solid rgba(37, 211, 102, 0.4)',
                color: '#4ADE80',
                padding: '6px 14px',
                borderRadius: '100px',
                fontSize: '12px',
                textDecoration: 'none'
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

        {/* Popular Pujas Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', marginBottom: '16px' }}>
            {t.footerServices || 'Popular Vedic Pujas'}
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '14px', lineHeight: '2', color: 'rgba(255, 255, 255, 0.75)' }}>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Grihapravesh Vastu Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Satyanarayan Katha &amp; Hawan</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Rudrabhishek Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Marriage / Vivah Sanskar</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Office &amp; Business Opening Puja</a></li>
            <li><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>Maha Mrityunjaya Jaap</a></li>
          </ul>
        </div>

        {/* Areas Covered Column */}
        <div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', color: 'var(--gold-light)', marginBottom: '16px' }}>
            📍 {t.footerCoverage || 'Prime Locations Covered'}
          </h4>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8', marginBottom: '8px' }}>
            <strong style={{ color: 'var(--gold-light)' }}>Hyderabad: </strong>
            Gachibowli, Hitec City, Madhapur, Kondapur, Kukatpally, Jubilee Hills, Banjara Hills, Secunderabad, Miyapur, Manikonda, Tellapur &amp; Begumpet.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.8' }}>
            <strong style={{ color: 'var(--gold-light)' }}>Bangalore &amp; Pan-India: </strong>
            Whitefield, Electronic City, HSR Layout, Koramangala, Indiranagar, Bellandur, Pune, Mumbai, Delhi-NCR &amp; all Tier-1 Metros.
          </p>
          <div style={{ marginTop: '16px' }}>
            <a
              href="#hero"
              onClick={scrollToHero}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, var(--gold), var(--saffron))',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                textDecoration: 'none'
              }}
            >
              🙏 {t.btnCtaBook || 'Book Consultation Now'}
            </a>
          </div>
        </div>
      </div>

      {/* SEO Keyword Index Matrix for Search Engines */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0', padding: '16px 0', borderTop: '1px solid rgba(200, 146, 42, 0.12)', borderBottom: '1px solid rgba(200, 146, 42, 0.12)' }}>
        <div style={{ fontSize: '11.5px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: '1.9' }}>
          <strong style={{ color: 'var(--gold-light)' }}>Popular Search Terms: </strong>
          Best Hindi Pandit Near Me • Best Hindi Pandit in Hyderabad • North Indian Hindi Pandit in Hyderabad • Best Acharya for Puja in Hyderabad • Hindi Pandit in Gachibowli • Hindi Pandit in Hitec City • Hindi Pandit in Madhapur • Hindi Pandit in Kondapur • Hindi Pandit in Kukatpally • North Indian Pandit in Banjara Hills &amp; Jubilee Hills • Secunderabad Hindi Pandit • Bihari Pandit for Puja in Hyderabad • UP Pandit Ji for Hawan • Grihapravesh Pandit in Hyderabad • Satyanarayan Puja Pandit Near Me • Maha Rudrabhishek Pandit Ji • Vivah Sanskar North Indian Pandit • Online Pandit Booking Hyderabad &amp; Bangalore • Best Vedic Acharya Pan-India
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
        <div>
          <div>© 2026 North Hindi Pandit. All Rights Reserved.</div>
          <div style={{ marginTop: '4px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '12px', letterSpacing: '0.3px' }}>
            Founder: Satyam Tiwari
          </div>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>Vedic Tradition</span>
          <span>•</span>
          <span>100% Shastra Sammat</span>
          <span>•</span>
          <span>Pure Samagri</span>
        </div>
      </div>
    </footer>
  );
}
