import React from 'react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: '🎓',
      badge: 'Varanasi & Ayodhya Scholars',
      title: 'Gurukul Certified Pandits',
      desc: 'All our purohits are certified scholars from revered Ved-Pathshalas of Kashi, Ayodhya, and Haridwar with 20+ years of dedicated ritual mastery.'
    },
    {
      icon: '📖',
      badge: 'Clear Meaning Explained',
      title: 'Sanskrit & Hindi Vyakhya',
      desc: 'No hurried chanting. Every mantra is recited with authentic Vedic swara uccharan and explained in graceful Hindi & English so your entire family understands.'
    },
    {
      icon: '🌿',
      badge: 'Zero Shopping Hassle',
      title: '100% Pure Puja Samagri',
      desc: 'We bring everything needed: pure Desi cow ghee, authentic herbs, Gangajal, hawan samidha, rolis, and kalash. You don’t need to spend hours shopping.'
    },
    {
      icon: '⚡',
      badge: 'Available 365 Days',
      title: 'Express Same-Day Booking',
      desc: 'Have an urgent auspicious muhurat or immediate ritual requirement? We deploy verified North Indian pandits across the city within 2 to 3 hours.'
    },
    {
      icon: '💰',
      badge: 'Zero Hidden Charges',
      title: 'Fixed Transparent Packages',
      desc: 'Clear, honest pricing established upfront. Complete peace of mind with zero unexpected demands or uncomfortable discussions on your sacred day.'
    },
    {
      icon: '🏡',
      badge: 'Punctual & Respectful',
      title: 'Doorstep Service Across City',
      desc: 'Pandits arrive punctually at your apartment or villa in traditional attire, setting up a sanctified mandap and hawan kund with pristine cleanliness.'
    }
  ];

  return (
    <section id="why">
      <div className="section-header center">
        <div className="section-eyebrow">
          Authentic Vedic Heritage
        </div>
        <h2 className="section-title">
          Why 15,000+ North Indian Families<br />Trust North Hindi Pandit
        </h2>
        <p className="section-sub">
          We bring the sacred traditions of Kashi and Ayodhya to your living room with absolute Vedic purity, devotion, and family warmth.
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
