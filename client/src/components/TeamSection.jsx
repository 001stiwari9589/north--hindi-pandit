import React from 'react';
import { translations } from '../translations';

export default function TeamSection({ onSelectPandit, currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;

  const defaultPandits = [
    {
      name: 'Pt. Deepak Shukla',
      title: 'Senior Head Acharya & Karmakand Specialist',
      origin: 'Varanasi',
      exp: '22+ Years Exp',
      avatarColor: '#4E0A17',
      specialty: 'Grihapravesh, Maha Rudrabhishek, Vastu Shanti, Vivah Sanskar',
      languages: ['Hindi', 'English', 'Sanskrit', 'Bhojpuri'],
      pujasConducted: '880+ Pujas',
      rating: '4.99'
    },
    {
      name: 'Pt. Amit Dwivedi',
      title: 'Vedic Hawan & Chandi Path Vidwan',
      origin: 'Uttarakhand',
      exp: '19+ Years Exp',
      avatarColor: '#997312',
      specialty: 'Satyanarayan Katha, Navchandi, Mahamrityunjaya Jaap',
      languages: ['Hindi', 'Sanskrit', 'Garhwali', 'English'],
      pujasConducted: '720+ Pujas',
      rating: '4.97'
    },
    {
      name: 'Pt. Sri Ram Jha',
      title: 'Maithil Purohit & Shastra Vidwan',
      origin: 'Mithila',
      exp: '24+ Years Exp',
      avatarColor: '#B45309',
      specialty: 'Vivah Sanskar, Upanayan / Janeu, Vastu Puja, Durga Saptashati',
      languages: ['Hindi', 'Sanskrit', 'Maithili', 'Bhojpuri'],
      pujasConducted: '810+ Pujas',
      rating: '4.98'
    },
    {
      name: 'Pt. Prashant Tiwari',
      title: 'Ramcharitmanas & Vedic Anushthan Acharya',
      origin: 'Chitrakoot',
      exp: '18+ Years Exp',
      avatarColor: '#C2410C',
      specialty: 'Akhand Ramayan Path, Sundarkand, Grihapravesh, Hawan',
      languages: ['Hindi', 'Sanskrit', 'Bundelkhandi', 'English'],
      pujasConducted: '650+ Pujas',
      rating: '4.96'
    },
    {
      name: 'Pt. Vikas Joshi',
      title: 'Rigvedic Acharya & Ganesh Puja Specialist',
      origin: 'Maharashtra',
      exp: '17+ Years Exp',
      avatarColor: '#1E3A8A',
      specialty: 'Ganesh Atharvashirsha, Satyanarayan, Vastu Shanti, Rudrabhishek',
      languages: ['Marathi', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '590+ Pujas',
      rating: '4.95'
    },
    {
      name: 'Pt. Durga Prashad Sharma',
      title: 'Smartha & Vedic Acharya (North & South Vidhi)',
      origin: 'Telugu (Andhra / Telangana)',
      exp: '21+ Years Exp',
      avatarColor: '#047857',
      specialty: 'Grihapravesh, Satyanarayan, Navagraha Homam, Vivah Sanskar',
      languages: ['Telugu', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '760+ Pujas',
      rating: '4.98'
    },
    {
      name: 'Pt. Hemant Mishra',
      title: 'Jagannath Parampara & Vedic Hawan Scholar',
      origin: 'Odisha',
      exp: '16+ Years Exp',
      avatarColor: '#6D28D9',
      specialty: 'Jagannath Puja, Rudrabhishek, Lakshmi Kuber Puja, Shradh Vidhi',
      languages: ['Odia', 'Hindi', 'Sanskrit', 'English'],
      pujasConducted: '530+ Pujas',
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
          {t.teamSub || 'Learned Brahmins from Kashi Vidwath Parishad, Ayodhya & Haridwar stationed across Hyderabad & Secunderabad.'}
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
          <div key={idx} className="pandit-card">
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

              <h3>{p.name}</h3>
              <p className="pandit-title">{p.title}</p>
              <p className="pandit-origin">
                📍 {p.origin} • <strong>{p.exp}</strong>
              </p>
            </div>

            {/* Specialty */}
            <div className="pandit-expertise">
              <strong style={{ color: 'var(--crimson-royal)', display: 'block', marginBottom: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', fontWeight: '700' }}>
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
                        fontSize: '11.5px',
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
              style={{ width: '100%', marginTop: 'auto', padding: '10px 16px', fontSize: '13.5px', fontWeight: '600' }}
            >
              📞 {t.btnBookPandit || 'Book Pandit Ji'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
