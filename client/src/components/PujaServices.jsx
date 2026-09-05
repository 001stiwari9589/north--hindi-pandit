import React from 'react';

export default function PujaServices({ onSelectPuja, currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const services = [
    {
      title: isHindi ? 'गृहप्रवेश पूजा एवं वास्तु शांति' : 'Grihapravesh Puja',
      deity: isHindi ? 'गृह शांति एवं वास्तु दोष निवारण' : 'House Warming & Vastu Peace',
      duration: '3.5 - 4.5 Hrs',
      desc: isHindi
        ? 'नए घर में सकारात्मक ऊर्जा, सुख, शांति एवं समृद्धि हेतु वैदिक विधि से वास्तु शांति, नवग्रह होम एवं मंगल कलश स्थापना।'
        : 'Sacred house warming ceremony with Vastu Shanti, Navagraha Homa, and Hawan to sanctify your new home with divine energy, health, and prosperity.',
      icon: '🏠',
      image: '/vedic_pandit_hawan.jpg'
    },
    {
      title: isHindi ? 'सत्यनारायण पूजा एवं कथा' : 'Satyanarayan Puja & Katha',
      deity: isHindi ? 'श्री हरि विष्णु कृपा' : 'Lord Vishnu Katha & Blessings',
      duration: '2.0 - 2.5 Hrs',
      desc: isHindi
        ? 'पारिवारिक सुख, शांति, मनोकामना पूर्ति एवं शुभ प्रसंगों पर भगवान विष्णु की पावन कथा, पंचामृत स्नान एवं चरणामृत विधान।'
        : 'Lord Vishnu katha, panchamrit snan, and prasad vidhi for family wellbeing, mental peace, milestone celebrations, and fulfillment of heartfelt wishes.',
      icon: '✨',
      image: null
    },
    {
      title: isHindi ? 'महा रुद्राभिषेक' : 'Maha Rudrabhishek',
      deity: isHindi ? 'भगवान शिव लिंगार्चन' : 'Lord Shiva Abhishek Ritual',
      duration: '2.5 - 3.0 Hrs',
      desc: isHindi
        ? 'दूध, शहद, गंगाजल, गन्ने के रस एवं बेलपत्र से शिवलिंग का पावन अभिषेक और नमकम्-चमकम् स्तोत्र का दिव्य पाठ।'
        : 'Potent Vedic abhishek of Shivling with milk, honey, sugarcane juice, and sacred bel patra while chanting Namakam & Chamakam stotrams.',
      icon: '🔱',
      image: null
    },
    {
      title: isHindi ? 'विवाह संस्कार' : 'Marriage / Vivah Sanskar',
      deity: isHindi ? 'संपूर्ण वैदिक विवाह विधि' : 'Vedic Wedding Rituals',
      duration: 'Full Ceremony',
      desc: isHindi
        ? 'सप्तपदी, कन्यादान, सिंदूरदान एवं मंगलाष्टक के साथ संपूर्ण उत्तर भारतीय कुल-परंपरानुसार विवाह अनुष्ठान।'
        : 'Authentic North Indian vivah ceremony with saptapadi, kanyadaan, sindoor daan, and mangalashtak by respected senior wedding pandits.',
      icon: '💍',
      image: null
    },
    {
      title: isHindi ? 'गणेश पूजा एवं हवन' : 'Ganesh Puja & Hawan',
      deity: isHindi ? 'विघ्नहर्ता श्री गणेश' : 'Obstacle Removal & Blessings',
      duration: '1.5 - 2.0 Hrs',
      desc: isHindi
        ? 'किसी भी नए कार्य, वाहन क्रय, गृह आगमन या परीक्षा में सफलता हेतु विघ्नहर्ता भगवान श्री गणेश का पूजन एवं हवन।'
        : 'Invoking Lord Ganesha to dissolve obstacles, bless new vehicles, academic endeavors, and bring auspicious beginnings to every venture.',
      icon: '🐘',
      image: null
    },
    {
      title: isHindi ? 'कार्यालय एवं व्यापार उद्घाटन' : 'Office & Business Opening',
      deity: isHindi ? 'व्यापार वृद्धि एवं लक्ष्मी वास' : 'Business Wealth & Prosperity',
      duration: '2.5 - 3.0 Hrs',
      desc: isHindi
        ? 'दुकान, ऑफिस या नई फर्म के सफल संचालन, ग्राहक वृद्धि एवं आर्थिक प्रगति हेतु वास्तु शुद्धि, गणपति होम एवं लक्ष्मी पूजा।'
        : 'Vastu archana, Ganapati homa, and Lakshmi puja to purify commercial spaces, attract positive footfall, and ensure prosperous business growth.',
      icon: '🏢',
      image: null
    },
    {
      title: isHindi ? 'नवग्रह शांति पूजा' : 'Navagraha Shanti Puja',
      deity: isHindi ? 'नवग्रह दोष शमन' : 'Planetary Harmony & Dosha Shanti',
      duration: '2.5 - 3.0 Hrs',
      desc: isHindi
        ? 'कुंडली में अशुभ ग्रहों के दुष्प्रभाव को शांत करने और अनुकूल ग्रह कृपा पाने हेतु विशिष्ट समिधाओं से नवग्रह हवन।'
        : 'Calm malefic planetary afflictions (doshas) and invoke favorable celestial blessings through specialized herb ahutis and navagraha homa.',
      icon: '🪐',
      image: null
    },
    {
      title: isHindi ? 'महालक्ष्मी एवं कुबेर पूजा' : 'Maha Lakshmi & Kuber Puja',
      deity: isHindi ? 'धन, वैभव एवं ऐश्वर्य' : 'Goddess Lakshmi Archana',
      duration: '2.0 - 2.5 Hrs',
      desc: isHindi
        ? 'स्थायी धन लाभ, कर्ज मुक्ति एवं व्यापार में बरकत हेतु श्री सूक्तम्, कनकधारा स्तोत्र एवं कमल पुष्पों से विशेष अर्चन।'
        : 'Special Vedic archana with Shree Suktam path, lotus offerings, and Kuber mantra chanting for persistent financial abundance and business wealth.',
      icon: '🪙',
      image: null
    },
    {
      title: isHindi ? 'नामकरण संस्कार' : 'Namkaran Sanskar',
      deity: isHindi ? 'शिशु नामकरण एवं रक्षा विधान' : 'Sacred Baby Naming Ceremony',
      duration: '1.5 - 2.0 Hrs',
      desc: isHindi
        ? 'नवजात शिशु के नक्षत्र चरण की गणना अनुसार शुभ नामकरण, आयुष्य हवन एवं दीर्घायु, आरोग्यता का मंगल आशीर्वाद।'
        : 'Auspicious newborn naming ceremony with astrological nakshatra calculation, ayushya hawan, and divine blessings for a vibrant future.',
      icon: '👶',
      image: null
    },
    {
      title: isHindi ? 'महामृत्युंजय जाप एवं हवन' : 'Maha Mrityunjaya Jaap & Hawan',
      deity: isHindi ? 'आरोग्य एवं अकाल मृत्यु रक्षा' : 'Longevity & Health Protection',
      duration: '3.0 - 4.0 Hrs',
      desc: isHindi
        ? 'गंभीर रोग निवारण, पारिवारिक सुरक्षा, अकाल भय मुक्ति एवं स्वास्थ्य लाभ हेतु संजीवनी महामृत्युंजय मंत्र का सवा लाख / ग्यारह हजार जाप व हवन।'
        : 'Potent Vedic chant and sacred hawan for rapid recovery from prolonged illness, negative energies, and long, healthy life protection.',
      icon: '🕉️',
      image: null
    },
    {
      title: isHindi ? 'चंडी हवन एवं दुर्गा सप्तशती' : 'Chandi Hawan & Durga Saptashati',
      deity: isHindi ? 'मां दुर्गा शक्ति अनुष्ठान' : 'Divine Victory & Harmony',
      duration: '4.0 - 5.0 Hrs',
      desc: isHindi
        ? 'कोर्ट-कचहरी, शत्रु बाधा, नकारात्मक ऊर्जा निवारण एवं संपूर्ण कुल की सुरक्षा हेतु मां जगदंबा का भव्य चंडी महायज्ञ।'
        : 'Grand Shakti yagya for overcoming complex obstacles, legal matters, family harmony, and enveloping your family in divine protection.',
      icon: '🔥',
      image: null
    },
    {
      title: isHindi ? 'पारंपरिक उत्तर भारतीय पूजा' : 'Custom North Indian Rituals',
      deity: isHindi ? 'कुल-परंपरा अनुसार पूजा' : 'Traditional Family Ceremonies',
      duration: 'Flexible',
      desc: isHindi
        ? 'मुंडन संस्कार, जनेऊ, सुंदरकांड पाठ, एकादशी व्रत, पितृ तर्पण एवं सभी प्रांतीय पारंपरिक अनुष्ठान हेतु सुयोग्य पंडित उपलब्ध हैं।'
        : 'Looking for a specific ritual? We conduct Mundan, Janeu, Shradh, Sundarkand Path, and all regional UP/Bihar/Rajasthan family anushthans.',
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
          {isHindi ? 'वैदिक अनुष्ठान' : 'Sacred Vedic Offerings'}
        </div>
        <h2 className="section-title">
          {isHindi ? 'हमारी प्रमुख पूजा सेवाएं' : 'Popular Puja Services We Offer'}
        </h2>
        <p className="section-sub">
          {isHindi
            ? 'शुद्ध देसी गाय का घी, प्रामाणिक हवन सामग्री एवं पूर्ण वैदिक विधि-विधान के साथ अनुष्ठान संपन्न कराएं।'
            : 'Performed with strict adherence to authentic North Indian Vedic scriptures, pure Desi cow ghee, and complete samagri.'}
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
              📞 {isHindi ? 'पंडित जी बुक करें' : 'Book Pandit Ji'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
