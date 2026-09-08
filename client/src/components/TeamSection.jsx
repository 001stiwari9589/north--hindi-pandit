import React from 'react';
import { translations } from '../translations';

export default function TeamSection({ onSelectPandit, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const defaultPandits = [
    {
      name: 'Acharya Radheshyam Shastri',
      title: 'Senior Head Purohit & Karmakand Specialist',
      origin: 'Varanasi (Kashi Vidwath Parishad)',
      exp: '25+ Years Exp',
      avatarColor: '#4E0A17',
      specialty: 'Grihapravesh, Vastu Shanti, Maha Yagya, Vivah',
      languages: ['Hindi', 'English', 'Sanskrit', 'Awadhi'],
      pujasConducted: '850+ Pujas',
      rating: '4.98'
    },
    {
      name: 'Pt. Devendra Tiwari',
      title: 'Vedic Katha & Hawan Acharya',
      origin: 'Ayodhya Ved Pathshala',
      exp: '18+ Years Exp',
      avatarColor: '#997312',
      specialty: 'Satyanarayan Katha, Ganesh Hawan, Lakshmi Puja',
      languages: ['Hindi', 'Sanskrit', 'Bhojpuri'],
      pujasConducted: '620+ Pujas',
      rating: '4.95'
    },
    {
      name: 'Pt. Akhilesh Mishra',
      title: 'Rudri Path & Shiva Aradhana Scholar',
      origin: 'Haridwar Gurukul Sanskrit Sansthan',
      exp: '22+ Years Exp',
      avatarColor: '#FF7700',
      specialty: 'Maha Rudrabhishek, Maha Mrityunjaya, Chandi Hawan',
      languages: ['Hindi', 'English', 'Sanskrit'],
      pujasConducted: '740+ Pujas',
      rating: '4.97'
    },
    {
      name: 'Pt. Brajesh Pandey',
      title: 'Jyotish & Sanskar Acharya',
      origin: 'Sampurnanand Sanskrit Univ., Varanasi',
      exp: '16+ Years Exp',
      avatarColor: '#107C41',
      specialty: 'Navagraha Shanti, Kundali Muhurat, Namkaran',
      languages: ['Hindi', 'Sanskrit', 'Maithili'],
      pujasConducted: '510+ Pujas',
      rating: '4.94'
    }
  ];

  const pandits = t.panditsList || defaultPandits;

  const handleBook = (name) => {
    if (onSelectPandit) {
      onSelectPandit(name);
    } else {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="team" style={{ background: '#FAF7F2' }}>
      <div className="section-header center">
        <div className="section-eyebrow">{t.teamEyebrow || 'Revered Vedic Scholars'}</div>
        <h2 className="section-title">{t.teamTitle || 'Meet Our Senior Verified Acharyas & Pandits'}</h2>
        <p className="section-sub">
          {t.teamSub || 'Learned Brahmins from Kashi Vidwath Parishad, Ayodhya & Haridwar stationed across Hyderabad & Bangalore.'}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: '24px',
          maxWidth: '1240px',
          margin: '0 auto'
        }}
      >
        {pandits.map((p, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              borderRadius: '20px',
              border: '1px solid var(--border-gold)',
              padding: '26px 22px',
              boxShadow: '0 4px 20px rgba(42, 4, 12, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 16px 40px rgba(78, 10, 23, 0.12)';
              e.currentTarget.style.borderColor = 'var(--gold)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(42, 4, 12, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border-gold)';
            }}
          >
            {/* Top Verified Shield */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--emerald-auspicious)',
                  background: 'var(--emerald-pale)',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>✓</span> Verified Scholar
              </span>

              <span style={{ fontSize: '12px', fontWeight: '700', color: '#B45309' }}>
                ⭐ {p.rating} {p.pujasConducted ? `(${p.pujasConducted})` : ''}
              </span>
            </div>

            {/* Pandit Avatar with Tilak */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${p.avatarColor || '#4E0A17'} 0%, #1F0408 100%)`,
                  border: '3px solid var(--gold)',
                  margin: '0 auto 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '26px',
                  fontWeight: '700',
                  boxShadow: '0 4px 16px rgba(212, 175, 55, 0.35)',
                  position: 'relative'
                }}
              >
                <span>ॐ</span>
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    fontSize: '12px'
                  }}
                >
                  🪔
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '20px',
                  fontWeight: '700',
                  color: 'var(--crimson-royal)',
                  margin: '0 0 4px'
                }}
              >
                {p.name}
              </h3>
              <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gold-dark)', margin: 0 }}>
                {p.title}
              </p>
              <p style={{ fontSize: '11.5px', color: 'var(--text-light)', margin: '4px 0 0' }}>
                📍 {p.origin} • <strong>{p.exp}</strong>
              </p>
            </div>

            {/* Specialty */}
            <div
              style={{
                background: 'var(--gold-pale)',
                borderRadius: '10px',
                padding: '10px 12px',
                fontSize: '12px',
                color: 'var(--text-mid)',
                lineHeight: '1.5',
                marginBottom: '14px',
                border: '1px solid rgba(212, 175, 55, 0.2)'
              }}
            >
              <strong style={{ color: 'var(--crimson-royal)', display: 'block', marginBottom: '2px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Core Expertise:
              </strong>
              {p.specialty}
            </div>

            {/* Languages Spoken */}
            {p.languages && (
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-light)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Languages Spoken:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.languages.map((lang, lIdx) => (
                    <span
                      key={lIdx}
                      style={{
                        fontSize: '11px',
                        fontWeight: '600',
                        color: 'var(--crimson-royal)',
                        background: 'white',
                        border: '1px solid var(--border-gold)',
                        padding: '2px 8px',
                        borderRadius: '6px'
                      }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <button
              type="button"
              onClick={() => handleBook(p.name)}
              className="btn-service"
              style={{ width: '100%', marginTop: 'auto', padding: '10px 16px', fontSize: '13px' }}
            >
              📞 {t.btnBookPandit || 'Book Pandit Ji'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
