import React from 'react';

export default function Footer({ onOpenBooking }) {
  const scrollToHero = (e) => {
    e.preventDefault();
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ background: '#2B0606', color: '#FFF8EC', borderTop: '2px solid rgba(200, 146, 42, 0.3)', padding: '60px 5% 40px' }}>
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
            Authentic North Indian Hindi &amp; Vedic rituals performed with devotion, precise Sanskrit uccharan, and complete shastra-sammat Vidhi &amp; Samagri.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href="tel:+919589018011"
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
              📞 9589018011
            </a>
            <a
              href="https://wa.me/919589018011"
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
            Popular Vedic Pujas
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
            City Coverage
          </h4>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.8' }}>
            Serving Whitefield, Electronic City, HSR Layout, Koramangala, Indiranagar, Marathahalli, Bellandur, Sarjapur, Yelahanka, BTM Layout, Malleshwaram, and all surrounding localities.
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
              🙏 Book Consultation Now
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ maxWidth: '1200px', margin: '24px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: 'rgba(255, 255, 255, 0.5)' }}>
        <div>© 2026 North Hindi Pandit. All Rights Reserved.</div>
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
