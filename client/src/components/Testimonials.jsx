import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Priya & Alok Sharma',
      loc: 'Whitefield, Bangalore',
      puja: 'Grihapravesh & Vastu Hawan',
      tradition: 'UP / Mathura Parampara',
      text: 'Pandit Ji performed our Grihapravesh with immense devotion. Every shloka and vidhi was explained clearly in Hindi. Our new flat feels filled with positive divine vibrations!',
      color: '#4E0A17'
    },
    {
      name: 'Rajesh & Sunita Kumar',
      loc: 'HSR Layout, Bangalore',
      puja: 'Satyanarayan Katha',
      tradition: 'Bihari Kul-Vidhi',
      text: 'Outstanding experience. Pandit Ji brought 100% pure cow ghee and fresh samagri. The katha and prasad vidhi was conducted without any rush. Highly recommended to all North Indian families!',
      color: '#997312'
    },
    {
      name: 'Anita & Manish Verma',
      loc: 'Koramangala, Bangalore',
      puja: 'Maha Rudrabhishek',
      tradition: 'Kashi Vidhi',
      text: 'We were deeply touched by Pandit Ji’s mastery of Rudri path. The Shiva abhishek was performed with sacred precision. Our home was enveloped in immense peace.',
      color: '#FF7700'
    },
    {
      name: 'Suresh & Ritu Gupta',
      loc: 'Electronic City, Bangalore',
      puja: 'Office Opening & Ganesh Hawan',
      tradition: 'Corporate Vedic Vidhi',
      text: 'Booked for our new IT tech firm inauguration. The Ganesh archana and hawan were done flawlessly. All colleagues were appreciative of the positive energy. Truly professional!',
      color: '#107C41'
    },
    {
      name: 'Meena & Ashish Agarwal',
      loc: 'Indiranagar, Bangalore',
      puja: 'Diwali Maha Lakshmi Puja',
      tradition: 'Rajasthani Parampara',
      text: 'The pandit was an authentic Vedic scholar from Varanasi. He conducted the Shree Suktam path with complete devotion and explain each step patiently.',
      color: '#3A0711'
    },
    {
      name: 'Vivek & Pooja Tiwari',
      loc: 'Marathahalli, Bangalore',
      puja: 'Marriage / Vivah Sanskar',
      tradition: 'Awadhi Vivah Vidhi',
      text: 'Our wedding rituals were handled with supreme grace. Traditional North Indian rites like saptapadi and kanyadaan were performed according to our ancestors’ kul-parampara.',
      color: '#731224'
    },
    {
      name: 'Deepa & Sanjay Singh',
      loc: 'Bellandur, Bangalore',
      puja: 'Navagraha Shanti Homa',
      tradition: 'Purvanchal Vidhi',
      text: 'Very satisfied with the transparency and punctual arrival. Pandit Ji brought pure Desi ghee and genuine herbs for the hawan. Truly divine experience for our family.',
      color: '#107C41'
    },
    {
      name: 'Amit & Neha Mishra',
      loc: 'Sarjapur Road, Bangalore',
      puja: 'Namkaran Sanskar',
      tradition: 'Vedic Nakshatra Vidhi',
      text: 'Pandit Ji checked our baby’s nakshatra accurately and conducted the naming ceremony with sacred chants. Very humble, respectful, and reasonable dakshina.',
      color: '#8C192E'
    }
  ];

  const marqueeItems = [...reviews, ...reviews];

  return (
    <section id="testimonials">
      <div className="section-header center">
        <div className="section-eyebrow">Devotee Experiences</div>
        <h2 className="section-title">15,000+ North Indian Families Blessed</h2>
        <p className="section-sub">
          Read real experiences from devotees celebrating sacred milestones with our certified Vedic scholars.
        </p>
      </div>

      <div className="testimonials-track-wrap">
        <div className="testimonials-track">
          {marqueeItems.map((t, idx) => {
            const initials = t.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2);
            return (
              <div key={idx} className="testi-card">
                <div className="testi-header">
                  <div className="testi-avatar" style={{ background: t.color }}>
                    {initials}
                  </div>
                  <div>
                    <div className="testi-name">{t.name}</div>
                    <div className="testi-loc">📍 {t.loc}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div className="stars">★★★★★</div>
                  <span
                    style={{
                      fontSize: '10.5px',
                      fontWeight: '700',
                      color: 'var(--emerald-auspicious)',
                      background: 'var(--emerald-pale)',
                      padding: '2px 8px',
                      borderRadius: '100px'
                    }}
                  >
                    ✓ Verified Family
                  </span>
                </div>

                <div className="testi-text">"{t.text}"</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(212, 175, 55, 0.15)' }}>
                  <span className="testi-puja">{t.puja}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-light)', fontStyle: 'italic' }}>
                    {t.tradition}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
