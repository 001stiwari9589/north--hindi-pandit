import React from 'react';

export default function FinalCTA() {
  const scrollToHero = (e) => {
    e.preventDefault();
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cta-final">
      {/* Background mandala subtle geometry */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0.06,
          pointerEvents: 'none'
        }}
      >
        <svg width="600" height="600" viewBox="0 0 600 600">
          <g transform="translate(300,300)">
            <circle r="280" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <circle r="220" stroke="#D4AF37" strokeWidth="1" strokeDasharray="6 4" fill="none" />
            <circle r="160" stroke="#D4AF37" strokeWidth="2" fill="none" />
            <circle r="100" stroke="#D4AF37" strokeWidth="1" fill="none" />
            <line x1="-280" y1="0" x2="280" y2="0" stroke="#D4AF37" strokeWidth="1" />
            <line x1="0" y1="-280" x2="0" y2="280" stroke="#D4AF37" strokeWidth="1" />
            <line x1="-198" y1="-198" x2="198" y2="198" stroke="#D4AF37" strokeWidth="0.5" />
            <line x1="198" y1="-198" x2="-198" y2="198" stroke="#D4AF37" strokeWidth="0.5" />
          </g>
        </svg>
      </div>

      <div className="section-header center" style={{ marginBottom: '28px', position: 'relative', zIndex: 1 }}>
        <div className="section-eyebrow" style={{ color: 'var(--gold-light)', justifyContent: 'center' }}>
          Invoke Divine Auspiciousness
        </div>
        <h2 className="section-title" style={{ color: 'white' }}>
          Bring Divine Blessings &amp; Peace<br />To Your Home Today
        </h2>
        <p className="section-sub">
          Book an experienced Gurukul-trained North Indian Pandit Ji today. Pure Vedic chanting, complete samagri, and 100% devotion guaranteed.
        </p>
      </div>

      <div className="cta-btns" style={{ position: 'relative', zIndex: 1 }}>
        <a href="tel:+919019690392" className="btn-cta-call">
          📞 Call Pandit Ji Directly
        </a>
        <a
          href="https://wa.me/919019690392?text=Namaste!%20I%20want%20to%20book%20a%20North%20Indian%20Hindi%20Pandit%20for%20Puja.%20Please%20share%20details."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-cta-wa"
        >
          💬 WhatsApp Consultation
        </a>
        <a href="#hero" onClick={scrollToHero} className="btn-cta-book">
          🙏 Check Muhurat &amp; Book
        </a>
      </div>
    </section>
  );
}
