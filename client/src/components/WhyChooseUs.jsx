import React from 'react';
import { translations } from '../translations';

export default function WhyChooseUs({ currentLang = 'en' }) {
  const t = translations[currentLang] || translations.en;
  const reasons = t.reasons || [];

  return (
    <section id="why">
      <div className="section-header center">
        <div className="section-eyebrow">
          {t.whyEyebrow || 'Authentic Vedic Heritage'}
        </div>
        <h2 className="section-title">
          {t.whyTitle || 'Why 15,000+ North Indian Families Trust North Hindi Pandit'}
        </h2>
        <p className="section-sub">
          {t.whySub || 'We bring the sacred traditions of Kashi and Ayodhya to your living room with absolute Vedic purity, devotion, and family warmth.'}
        </p>
      </div>

      <div className="cards-grid">
        {reasons.map((item, idx) => (
          <div key={idx} className="why-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div className="why-icon-wrap">{item.icon}</div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--crimson-royal)',
                  background: 'var(--gold-pale)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  padding: '3px 10px',
                  borderRadius: '100px'
                }}
              >
                {item.badge}
              </span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
