import React from 'react';

export default function PujaServices({ onSelectPuja }) {
  const services = [
    {
      title: 'Grihapravesh & Vastu Shanti Puja',
      deity: 'House Warming & Vastu Peace',
      duration: '3.5 - 4.5 Hrs',
      desc: 'Sacred house warming ceremony with Vastu Shanti, Navagraha Homa, and Hawan to sanctify your new home with divine energy, health, and prosperity.',
      icon: '🏠',
      image: '/vedic_pandit_hawan.jpg'
    },
    {
      title: 'Satyanarayan Puja & Katha',
      deity: 'Lord Vishnu Katha & Blessings',
      duration: '2.0 - 2.5 Hrs',
      desc: 'Lord Vishnu katha, panchamrit snan, and prasad vidhi for family wellbeing, mental peace, milestone celebrations, and fulfillment of heartfelt wishes.',
      icon: '✨',
      image: null
    },
    {
      title: 'Maha Rudrabhishek Puja',
      deity: 'Lord Shiva Abhishek Ritual',
      duration: '2.5 - 3.0 Hrs',
      desc: 'Potent Vedic abhishek of Shivling with milk, honey, sugarcane juice, and sacred bel patra while chanting Namakam & Chamakam stotrams.',
      icon: '🔱',
      image: null
    },
    {
      title: 'Marriage / Vivah Sanskar',
      deity: 'Vedic Wedding Rituals',
      duration: 'Full Ceremony',
      desc: 'Authentic North Indian vivah ceremony with saptapadi, kanyadaan, sindoor daan, and mangalashtak by respected senior wedding pandits.',
      icon: '💍',
      image: null
    },
    {
      title: 'Ganesh Puja & Hawan',
      deity: 'Obstacle Removal & Blessings',
      duration: '1.5 - 2.0 Hrs',
      desc: 'Invoking Lord Ganesha to dissolve obstacles, bless new vehicles, academic endeavors, and bring auspicious beginnings to every venture.',
      icon: '🐘',
      image: null
    },
    {
      title: 'Office & Business Opening Puja',
      deity: 'Business Wealth & Prosperity',
      duration: '2.5 - 3.0 Hrs',
      desc: 'Vastu archana, Ganapati homa, and Lakshmi puja to purify commercial spaces, attract positive footfall, and ensure prosperous business growth.',
      icon: '🏢',
      image: null
    },
    {
      title: 'Navagraha Shanti Puja',
      deity: 'Planetary Harmony & Dosha Shanti',
      duration: '2.5 - 3.0 Hrs',
      desc: 'Calm malefic planetary afflictions (doshas) and invoke favorable celestial blessings through specialized herb ahutis and navagraha homa.',
      icon: '🪐',
      image: null
    },
    {
      title: 'Maha Lakshmi & Kuber Puja',
      deity: 'Goddess Lakshmi Archana',
      duration: '2.0 - 2.5 Hrs',
      desc: 'Special Vedic archana with Shree Suktam path, lotus offerings, and Kuber mantra chanting for persistent financial abundance and business wealth.',
      icon: '🪙',
      image: null
    },
    {
      title: 'Namkaran Sanskar (Baby Naming)',
      deity: 'Sacred Baby Naming Ceremony',
      duration: '1.5 - 2.0 Hrs',
      desc: 'Auspicious newborn naming ceremony with astrological nakshatra calculation, ayushya hawan, and divine blessings for a vibrant future.',
      icon: '👶',
      image: null
    },
    {
      title: 'Maha Mrityunjaya Jaap & Hawan',
      deity: 'Longevity & Health Protection',
      duration: '3.0 - 4.0 Hrs',
      desc: 'Potent Vedic chant and sacred hawan for rapid recovery from prolonged illness, negative energies, and long, healthy life protection.',
      icon: '🕉️',
      image: null
    },
    {
      title: 'Chandi Hawan & Durga Puja',
      deity: 'Divine Victory & Harmony',
      duration: '4.0 - 5.0 Hrs',
      desc: 'Grand Shakti yagya for overcoming complex obstacles, legal matters, family harmony, and enveloping your family in divine protection.',
      icon: '🔥',
      image: null
    },
    {
      title: 'Custom North Indian Rituals',
      deity: 'Traditional Family Ceremonies',
      duration: 'Flexible',
      desc: 'Looking for a specific ritual? We conduct Mundan, Janeu, Shradh, Sundarkand Path, and all regional UP/Bihar/Rajasthan family anushthans.',
      icon: '🪔',
      image: null
    }
  ];

  const handleBook = (pujaName) => {
    if (onSelectPuja) {
      onSelectPuja({ name: pujaName });
    } else {
      const hero = document.getElementById('hero');
      if (hero) hero.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services">
      <div className="section-header center">
        <div className="section-eyebrow">
          Sacred Vedic Offerings
        </div>
        <h2 className="section-title">
          Popular Puja Services We Offer
        </h2>
        <p className="section-sub">
          Performed with strict adherence to authentic North Indian Vedic scriptures, pure Desi cow ghee, and complete samagri.
        </p>
      </div>

      <div className="services-grid">
        {services.map((item, idx) => (
          <div key={idx} className="service-card" onClick={() => handleBook(item.title)}>
            {/* Top Deity & Duration Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '700',
                  color: 'var(--crimson-royal)',
                  background: 'var(--gold-pale)',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  border: '1px solid rgba(212, 175, 55, 0.3)'
                }}
              >
                {item.deity}
              </span>
              <span
                style={{
                  fontSize: '10.5px',
                  fontWeight: '600',
                  color: 'var(--text-light)',
                  background: '#F6EFE5',
                  padding: '2px 7px',
                  borderRadius: '4px'
                }}
              >
                ⏱️ {item.duration}
              </span>
            </div>

            <div className={`service-img-placeholder ${!item.image ? 'no-img' : ''}`}>
              {item.image ? (
                <img src={item.image} alt={item.title} loading="lazy" />
              ) : (
                <>
                  <span className="service-img-icon">{item.icon}</span>
                  <span className="service-img-label">100% Shastra Sammat</span>
                </>
              )}
            </div>

            <h3>{item.title}</h3>
            <p>{item.desc}</p>

            <button
              type="button"
              className="btn-service"
              onClick={(e) => {
                e.stopPropagation();
                handleBook(item.title);
              }}
            >
              📞 Book Pandit Ji
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
