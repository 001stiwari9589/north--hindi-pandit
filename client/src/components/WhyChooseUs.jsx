import React from 'react';

export default function WhyChooseUs({ currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const reasons = [
    {
      icon: '🎓',
      badge: isHindi ? 'काशी एवं अयोध्या विद्वान' : 'Varanasi & Ayodhya Scholars',
      title: isHindi ? 'गुरुकुल प्रमाणित पंडित' : 'Gurukul Certified Pandits',
      desc: isHindi
        ? 'हमारे सभी पुरोहित काशी, अयोध्या एवं हरिद्वार की प्रतिष्ठित वेद-पाठशालाओं से विधिवत प्रशिक्षित एवं २०+ वर्ष अनुभवी हैं।'
        : 'All our purohits are certified scholars from revered Ved-Pathshalas of Kashi, Ayodhya, and Haridwar with 20+ years of dedicated ritual mastery.'
    },
    {
      icon: '📖',
      badge: isHindi ? 'स्पष्ट मंत्र एवं भावार्थ' : 'Clear Meaning Explained',
      title: isHindi ? 'सुस्पष्ट संस्कृत एवं हिंदी व्याख्या' : 'Sanskrit & Hindi Vyakhya',
      desc: isHindi
        ? 'बिना किसी जल्दबाजी के शुद्ध वैदिक स्वर में मंत्रोच्चार और सरल हिंदी में प्रत्येक विधि का अर्थ समझाया जाता है।'
        : 'No hurried chanting. Every mantra is recited with authentic Vedic swara uccharan and explained in graceful Hindi & English so your entire family understands.'
    },
    {
      icon: '🌿',
      badge: isHindi ? 'बाजार की कोई चिंता नहीं' : 'Zero Shopping Hassle',
      title: isHindi ? '१००% शुद्ध पूजन सामग्री' : '100% Pure Puja Samagri',
      desc: isHindi
        ? 'शुद्ध देसी गाय का घी, दुर्लभ जड़ी-बूटियां, गंगाजल, हवन समिधा, रोली एवं कलावा — सभी सामग्री हम स्वयं लाते हैं।'
        : 'We bring everything needed: pure Desi cow ghee, authentic herbs, Gangajal, hawan samidha, rolis, and kalash. You don’t need to spend hours shopping.'
    },
    {
      icon: '⚡',
      badge: isHindi ? '३६५ दिन सेवा उपलब्ध' : 'Available 365 Days',
      title: isHindi ? 'तत्काल उसी दिन बुकिंग' : 'Express Same-Day Booking',
      desc: isHindi
        ? 'अचानक बने शुभ मुहूर्त या आवश्यक गृह शांति हेतु हम २ से ३ घंटे के भीतर शहरभर में सुयोग्य पंडित उपलब्ध कराते हैं।'
        : 'Have an urgent auspicious muhurat or immediate ritual requirement? We deploy verified North Indian pandits across the city within 2 to 3 hours.'
    },
    {
      icon: '💰',
      badge: isHindi ? 'कोई अतिरिक्त मांग नहीं' : 'Zero Hidden Charges',
      title: isHindi ? 'पारदर्शी एवं निश्चित दक्षिणा' : 'Fixed Transparent Packages',
      desc: isHindi
        ? 'पूर्व निर्धारित उचित दक्षिणा पैकेज। पूजा के दिन किसी भी प्रकार की असुविधाजनक मांग या मोलभाव से पूरी तरह मुक्त।'
        : 'Clear, honest pricing established upfront. Complete peace of mind with zero unexpected demands or uncomfortable discussions on your sacred day.'
    },
    {
      icon: '🏡',
      badge: isHindi ? 'समय के पाबंद एवं शालीन' : 'Punctual & Respectful',
      title: isHindi ? 'घर-घर समय पर सेवा' : 'Doorstep Service Across City',
      desc: isHindi
        ? 'पारंपरिक वेशभूषा में पंडित जी समय से पूर्व उपस्थित होकर शुद्धता एवं मर्यादा के साथ पूजा स्थल तैयार करते हैं।'
        : 'Pandits arrive punctually at your apartment or villa in traditional attire, setting up a sanctified mandap and hawan kund with pristine cleanliness.'
    }
  ];

  return (
    <section id="why">
      <div className="section-header center">
        <div className="section-eyebrow">
          {isHindi ? 'प्रामाणिक वैदिक परंपरा' : 'Authentic Vedic Heritage'}
        </div>
        <h2 className="section-title">
          {isHindi ? (
            <>१५,०००+ उत्तर भारतीय परिवारों का विश्वास<br />नॉर्थ हिंदी पंडित</>
          ) : (
            <>Why 15,000+ North Indian Families<br />Trust North Hindi Pandit</>
          )}
        </h2>
        <p className="section-sub">
          {isHindi
            ? 'हम काशी और अयोध्या की पवित्र आध्यात्मिक परंपरा को आपके घर तक पूर्ण वैदिक शुद्धि एवं आत्मीयता के साथ पहुंचाते हैं।'
            : 'We bring the sacred traditions of Kashi and Ayodhya to your living room with absolute Vedic purity, devotion, and family warmth.'}
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
