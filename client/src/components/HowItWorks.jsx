import React from 'react';

export default function HowItWorks({ currentLang = 'en' }) {
  const isHindi = currentLang === 'hi';

  const steps = [
    {
      num: isHindi ? '१' : '1',
      emoji: '🔍',
      title: isHindi ? 'पूजा का चयन करें' : 'Select Your Ceremony',
      desc: isHindi
        ? 'वेबसाइट फॉर्म, कॉल या व्हाट्सएप द्वारा अपनी मनपसंद पूजा एवं संभावित शुभ तिथि बताएं।'
        : 'Choose your puja, preferred auspicious date, and location through our form, direct call, or WhatsApp.'
    },
    {
      num: isHindi ? '२' : '2',
      emoji: '📞',
      title: isHindi ? 'मुफ्त मुहूर्त परामर्श' : 'Free Muhurat Consultation',
      desc: isHindi
        ? 'हमारे वरिष्ठ आचार्य जी १५ मिनट में कॉल कर आपकी राशि एवं पंचांग अनुसार सर्वश्रेष्ठ शुभ मुहूर्त तय करेंगे।'
        : 'Our senior Acharya calls you within 15 minutes to check shubh tithi, nakshatra, and custom ritual requirements.'
    },
    {
      num: isHindi ? '३' : '3',
      emoji: '📜',
      title: isHindi ? 'बुकिंग की पुष्टि' : 'Instant Confirmation',
      desc: isHindi
        ? 'पंडित जी का विवरण, पूजा समय एवं संपूर्ण सामग्री सूची का विवरण तुरंत अपने फोन पर प्राप्त करें।'
        : 'Receive instant confirmation with assigned Pandit Ji credentials, ritual timing, and complete samagri details.'
    },
    {
      num: isHindi ? '४' : '4',
      emoji: '🪔',
      title: isHindi ? 'घर पर मंगल आगमन' : 'Divine Doorstep Arrival',
      desc: isHindi
        ? 'पंडित जी सभी आवश्यक शुद्ध पूजन सामग्री के साथ समय पर आपके घर पधारकर श्रद्धापूर्वक पूजा संपन्न कराएंगे।'
        : 'Pandit Ji arrives on time with all fresh samagri and conducts sacred rituals with heartfelt devotion.'
    }
  ];

  return (
    <section id="how">
      <div className="section-header center">
        <div className="section-eyebrow">
          {isHindi ? 'सुगम एवं पावन प्रक्रिया' : 'Seamless & Sacred Journey'}
        </div>
        <h2 className="section-title">
          {isHindi ? '४ आसान चरणों में पंडित जी बुक करें' : 'How to Book in 4 Simple Steps'}
        </h2>
        <p className="section-sub">
          {isHindi
            ? 'शुभ मुहूर्त निर्धारण से लेकर आरती एवं प्रसाद वितरण तक — हम हर व्यवस्था अत्यंत आदर के साथ करते हैं।'
            : 'From shubh muhurat checking to the final aarti and prasad — we handle everything with reverence.'}
        </p>
      </div>

      <div className="steps-row">
        {steps.map((step, idx) => (
          <div key={idx} className="step-item">
            <div className="step-num">{step.num}</div>
            <div className="step-emoji">{step.emoji}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
