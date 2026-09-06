import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      num: '1',
      emoji: '🔍',
      title: 'Select Your Ceremony',
      desc: 'Choose your puja, preferred auspicious date, and location through our form, direct call, or WhatsApp.'
    },
    {
      num: '2',
      emoji: '📞',
      title: 'Free Muhurat Consultation',
      desc: 'Our senior Acharya calls you within 15 minutes to check shubh tithi, nakshatra, and custom ritual requirements.'
    },
    {
      num: '3',
      emoji: '📜',
      title: 'Instant Confirmation',
      desc: 'Receive instant confirmation with assigned Pandit Ji credentials, ritual timing, and complete samagri details.'
    },
    {
      num: '4',
      emoji: '🪔',
      title: 'Divine Doorstep Arrival',
      desc: 'Pandit Ji arrives on time with all fresh samagri and conducts sacred rituals with heartfelt devotion.'
    }
  ];

  return (
    <section id="how">
      <div className="section-header center">
        <div className="section-eyebrow">
          Seamless &amp; Sacred Journey
        </div>
        <h2 className="section-title">
          How to Book in 4 Simple Steps
        </h2>
        <p className="section-sub">
          From shubh muhurat checking to the final aarti and prasad — we handle everything with reverence.
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
